import { LogType } from '../../types/log'
import type { SimpleLogContent, ContainerLogContent } from '../../types/log'
import type { ParsedSingleLogLine } from './internalTypes'

const UNKNOWN_TITLE = '<未知>'

// 定义可变的容器类型，用于高效构建树结构
// 该结构与只读的 ContainerLogContent 兼容
type MutableContainer = {
  readonly type: LogType.Container
  readonly stackNum: number
  readonly subLogs: (SimpleLogContent | MutableContainer)[]
}

function makeContainerLogFromMutableContainer(
  container: MutableContainer,
  stackLastNumToFunctionMap: Map<number, string>,
): ContainerLogContent {
  const subLogs = container.subLogs.map((log) => {
    if (log.type === LogType.Container) {
      return makeContainerLogFromMutableContainer(log, stackLastNumToFunctionMap)
    }
    return log
  })

  return {
    type: LogType.Container,
    uniqueId: `${container.stackNum}`,
    title: stackLastNumToFunctionMap.get(container.stackNum) || UNKNOWN_TITLE,
    subLogs,
  }
}

/**
 * 处理缺失的中间层级，构建完整的嵌套结构
 */
export function buildNestedStructure(
  parsedLines: ParsedSingleLogLine[],
  stackLastNumToFunctionMap: Map<number, string>,
): ContainerLogContent {
  // 虚拟根节点，便于处理多入口的日志结构
  const virtualRoot: MutableContainer = {
    type: LogType.Container,
    stackNum: -1,
    subLogs: [],
  }

  for (const line of parsedLines) {
    const { index, stack, message } = line
    let parentContainer: MutableContainer = virtualRoot

    // 按照 stack 沿着上一条日志的树路径前进
    for (let i = 0; i < stack.length; i++) {
      const currLevelStackNum = stack[i]!
      const lastLog = parentContainer.subLogs.at(-1)

      if (lastLog?.type === LogType.Container && lastLog.stackNum === currLevelStackNum) {
        parentContainer = lastLog
      } else {
        // 原地新建容器日志
        const newContainer: MutableContainer = {
          type: LogType.Container,
          stackNum: currLevelStackNum,
          subLogs: [],
        }

        parentContainer.subLogs.push(newContainer)
        parentContainer = newContainer
      }
    }

    parentContainer.subLogs.push({
      type: LogType.Simple,
      text: message,
      index,
    })
  }

  // 如果没有任何日志，返回一个空容器
  if (virtualRoot.subLogs.length === 0) {
    return {
      type: LogType.Container,
      title: '',
      uniqueId: '<root>',
      subLogs: [],
    }
  }

  // 如果有多个顶层日志，则用一个根容器包裹
  // 这样可以兼容没有单一公共祖先的日志情况
  return makeContainerLogFromMutableContainer(virtualRoot, stackLastNumToFunctionMap)
}
