import { LogType } from '../types/log'
import type { SimpleLogContent, ContainerLogContent } from '../types/log'

// 解析后的单条日志行的数据结构
type ParsedLogGroup = {
  funcName: string
  id: number
  stack: number[]
  message: string
}

/**
 * 从日志行中提取函数名、ID、调用栈和消息内容
 */
export function extractLogInfo(logGroup: string): ParsedLogGroup | null {
  logGroup = logGroup.trim()

  const regex = /\[(?<funcName>[^\]]+)\]\[#(?<id>\d+) \((?<stack>\$\d+(-\$\d+)*)\)\](?<message>(.|\n)*)/
  const match = logGroup.match(regex)

  if (match === null || match.length < 5) {
    return null
  }

  const { funcName: funcNameText, id: idText, stack: stackText, message: messageText } = match.groups || {}

  const funcName = funcNameText.trim()
  const id = Number(idText)
  const message = messageText.trim()

  // 解析调用栈
  const stack = stackText
    .replaceAll('$', '')
    .split('-')
    .map((segment) => Number(segment))

  // 验证ID与调用栈的一致性
  if (id !== stack[stack.length - 1]) {
    return null
  }

  return {
    funcName,
    id,
    stack,
    message,
  }
}

export function getParsedLogGroups(logText: string): ParsedLogGroup[] {
  return logText
    .split('[ipid]')
    .map((group) => extractLogInfo(group))
    .filter((x): x is ParsedLogGroup => x != null)
}

/**
 * 建立标号到函数名的映射
 */
export function buildIdToFunctionMap(parsedGroups: ParsedLogGroup[]): Map<number, string> {
  const idToFunctionMap = new Map<number, string>()

  for (const line of parsedGroups) {
    const existingFuncName = idToFunctionMap.get(line.id)

    if (existingFuncName && existingFuncName !== line.funcName) {
      throw new Error(`单个日志 id 对应多个函数名: ${line.id} 对应 ${existingFuncName} 和 ${line.funcName}`)
    }

    idToFunctionMap.set(line.id, line.funcName)
  }

  return idToFunctionMap
}

/**
 * 处理缺失的中间层级，构建完整的嵌套结构
 */
export function buildNestedStructure(
  parsedGroups: ParsedLogGroup[],
  idToFunctionMap: Map<number, string>,
): ContainerLogContent {
  // 定义可变的容器类型，用于高效构建树结构
  // 该结构与只读的 ContainerLogContent 兼容
  type MutableContainer = {
    readonly type: LogType.Container
    readonly title: string
    readonly subLogs: (SimpleLogContent | MutableContainer)[]
  }

  // 用于缓存和快速访问每个 ID 对应的容器
  const idToContainerMap = new Map<number, MutableContainer>()

  // 虚拟根节点，便于处理多入口的日志结构
  const virtualRoot: MutableContainer = {
    type: LogType.Container,
    title: 'virtual_root',
    subLogs: [],
  }

  for (const group of parsedGroups) {
    const { id, stack, message } = group

    let parentContainer: MutableContainer = virtualRoot

    // 确保当前日志的所有祖先路径在树中都已存在
    // 遍历到当前日志 ID 的父级为止
    for (let i = 0; i < stack.length; i++) {
      const currLevelId = stack[i]
      let currLevelContainer = idToContainerMap.get(currLevelId)

      // 如果某个祖先 ID 的容器不存在，则动态创建
      // 这样可以处理中间层级日志缺失的情况
      if (!currLevelContainer) {
        currLevelContainer = {
          type: LogType.Container,
          title: idToFunctionMap.get(currLevelId) || '', // 如果没有日志定义函数名，标题可能为空
          subLogs: [],
        }
        idToContainerMap.set(currLevelId, currLevelContainer)
        parentContainer.subLogs.push(currLevelContainer)
      }
      parentContainer = currLevelContainer
    }

    // 获取或创建当前日志 ID 的容器。一定存在，上面的循环已经处理过了
    const currentContainer = idToContainerMap.get(id)!

    // 将实际的日志消息作为 SimpleLog 添加到其容器中
    const simpleLog: SimpleLogContent = {
      type: LogType.Simple,
      text: message,
    }
    currentContainer.subLogs.push(simpleLog)
  }

  // 如果没有任何日志，返回一个空容器
  if (virtualRoot.subLogs.length === 0) {
    return {
      type: LogType.Container,
      title: '',
      subLogs: [],
    }
  }

  // 如果只有一个顶层日志，则直接返回该日志作为根节点
  // 这样符合单元测试的预期
  if (virtualRoot.subLogs.length === 1) {
    return virtualRoot.subLogs[0] as ContainerLogContent
  }

  // 如果有多个顶层日志，则用一个根容器包裹
  // 这样可以兼容没有单一公共祖先的日志情况
  return {
    type: LogType.Container,
    title: '', // 根部没有合适的标题
    subLogs: virtualRoot.subLogs,
  }
}

/**
 * 主解析函数：将日志文本转换为结构化的日志树
 */
export function parseLog(logText: string): { rootLog: ContainerLogContent } {
  // 解析每个分组，丢掉不符合格式的分组
  const parsedGroups = getParsedLogGroups(logText)

  const idToFunctionMap = buildIdToFunctionMap(parsedGroups)
  const rootLog = buildNestedStructure(parsedGroups, idToFunctionMap)

  return { rootLog }
}
