import type { ContainerLogContent } from '@/types/log'
import { buildStackLastNumToFunctionMap } from './buildStackLastNumToFunctionMap'
import { cutLog } from './cutLog'
import { buildNestedStructure } from './buildNestedStructure'
import { splitLogIntoParsedLogLines } from './splitLogIntoParsedLogLines'

export function parseLogs(log: string): ContainerLogContent {
  // Step 1. 只读取 BEGIN 和 END 之间的部分
  const logAfterCut = cutLog(log)

  // Step 2. 将日志按条分割
  const parsedLines = splitLogIntoParsedLogLines(logAfterCut)

  // Step 3. 扫一遍，计算所有日志栈对应的函数名
  const stackLastNumToFunctionMap = buildStackLastNumToFunctionMap(parsedLines)

  // Step 4. 将日志组建为树状结构
  const logTree = buildNestedStructure(parsedLines, stackLastNumToFunctionMap)

  return logTree
}
