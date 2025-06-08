import type { LogContent } from '../types/log'

// 解析后的单条日志行的数据结构
interface ParsedLogLine {
  functionName: string
  id: string
  stack: string[]
  message: string
  raw: string
}

/**
 * 从日志行中提取函数名、ID、调用栈和消息内容
 */
function extractLogInfo(line: string): { functionName: string; id: string; stackStr: string; message: string } | null {
  const regex = /^\[ipid\]\[(.*?)\]\[#(\d+) \(\$(.*?)\)\] (.*)$/
  const match = line.match(regex)

  if (match === null || match.length < 5) {
    return null
  }

  return {
    functionName: match[1],
    id: match[2],
    stackStr: match[3],
    message: match[4],
  }
}

/**
 * 处理单个日志组，包含一个[ipid]开头的行及其后续行
 */
function parseLogGroup(group: string[]): ParsedLogLine | null {
  if (group.length === 0) {
    return null
  }

  const firstLine = group[0]
  const logInfo = extractLogInfo(firstLine)

  if (logInfo === null) {
    return null
  }

  const stack = logInfo.stackStr.split('-')

  // 验证ID与调用栈的一致性
  if (logInfo.id !== stack[stack.length - 1]) {
    return null
  }

  // 构建完整消息内容
  let fullMessage = logInfo.message
  for (let i = 1; i < group.length; i++) {
    fullMessage = fullMessage + '\n' + group[i]
  }

  return {
    functionName: logInfo.functionName,
    id: logInfo.id,
    stack: stack,
    message: fullMessage,
    raw: group.join('\n'),
  }
}

/**
 * 提取日志内容的第一行作为摘要
 */
function extractSummary(text: string): string {
  const lines = text.split('\n')
  if (lines.length === 0) {
    return ''
  }
  return lines[0]
}

/**
 * 从普通日志或容器中获取摘要
 */
function getSummaryFromLogItem(item: LogContent | null): string | null {
  if (item === null) {
    return null
  }

  if (item.isContainer === false) {
    return extractSummary(item.text)
  } else {
    return item.summary.first
  }
}

/**
 * 创建日志容器
 */
function createContainer(representativeLine: ParsedLogLine, children: LogContent[]): LogContent {
  let firstChild: LogContent | null = null
  let lastChild: LogContent | null = null

  if (children.length > 0) {
    firstChild = children[0]
    lastChild = children[children.length - 1]
  }

  const firstSummary = getSummaryFromLogItem(firstChild)
  const lastSummary = getSummaryFromLogItem(lastChild)

  return {
    id: representativeLine.stack.join('-'),
    isContainer: true,
    title: representativeLine.functionName,
    text: '',
    children: children,
    summary: {
      first: firstSummary,
      last: lastSummary,
    },
    isActive: false,
  }
}

/**
 * 创建简单日志条目
 */
function createSimpleLogItem(logLine: ParsedLogLine, index: number): LogContent {
  return {
    id: logLine.stack.join('-') + '::' + index.toString(),
    isContainer: false,
    text: logLine.message,
    title: '',
    children: [],
    summary: { first: null, last: null },
    isActive: false,
  }
}

/**
 * 递归处理日志行，构建日志树
 */
function processLogLines(lines: ParsedLogLine[]): LogContent[] {
  if (lines.length === 0) {
    return []
  }

  const result: LogContent[] = []
  const baseLevel: number = lines[0].stack.length
  let i: number = 0

  while (i < lines.length) {
    const currentLine: ParsedLogLine = lines[i]

    // 处理当前层级的简单日志
    if (currentLine.stack.length === baseLevel) {
      result.push(createSimpleLogItem(currentLine, i))
      i = i + 1
    }
    // 处理嵌套子日志
    else if (currentLine.stack.length > baseLevel) {
      const subGroup: ParsedLogLine[] = []
      const subGroupLevel: number = currentLine.stack.length

      // 收集所有属于此子组的日志行
      let j: number = i
      while (j < lines.length && lines[j].stack.length >= subGroupLevel) {
        subGroup.push(lines[j])
        j = j + 1
      }

      // 递归处理子组并创建容器
      const children: LogContent[] = processLogLines(subGroup)
      const container: LogContent = createContainer(currentLine, children)
      result.push(container)

      i = j // 移动索引到已处理组之后
    }
    // 处理异常情况
    else {
      i = i + 1
    }
  }

  return result
}

/**
 * 将原始日志文本按 [ipid] 分组
 */
function groupLogLines(logText: string): string[][] {
  const rawLines: string[] = logText.split('\n')
  const groups: string[][] = []
  let currentGroup: string[] = []

  for (let i = 0; i < rawLines.length; i++) {
    const line: string = rawLines[i]
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith('[ipid]')) {
      // 保存当前组并开始新组
      if (currentGroup.length > 0) {
        groups.push(currentGroup)
      }
      currentGroup = [line]
    }
    // 将非 [ipid] 开头的行添加到当前组
    else if (currentGroup.length > 0) {
      currentGroup.push(line)
    }
  }

  // 添加最后一组
  if (currentGroup.length > 0) {
    groups.push(currentGroup)
  }

  return groups
}

/**
 * 主解析函数：将日志文本转换为结构化的日志树
 */
export function parseLog(logText: string): LogContent[] {
  // 第一步：按 [ipid] 标记分组
  const groups = groupLogLines(logText)

  // 第二步：解析每个组并过滤无效日志
  const parsedLines: ParsedLogLine[] = []
  for (let i = 0; i < groups.length; i++) {
    const parsed = parseLogGroup(groups[i])
    if (parsed !== null) {
      parsedLines.push(parsed)
    }
  }

  // 第三步：处理日志行构建树状结构
  return processLogLines(parsedLines)
}
