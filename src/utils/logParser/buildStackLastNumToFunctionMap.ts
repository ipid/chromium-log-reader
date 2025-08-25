import type { ParsedSingleLogLine } from './internalTypes'

/**
 * 建立标号到函数名的映射
 */
export function buildStackLastNumToFunctionMap(parsedLines: ParsedSingleLogLine[]): Map<number, string> {
  const stackLastNumToFunctionMap = new Map<number, string>()

  for (const line of parsedLines) {
    const existingFuncName = stackLastNumToFunctionMap.get(line.stack.at(-1)!)

    if (existingFuncName && existingFuncName !== line.funcName) {
      throw new Error(`单个日志 id 对应多个函数名: ${line.stack.at(-1)} 对应 ${existingFuncName} 和 ${line.funcName}`)
    }

    stackLastNumToFunctionMap.set(line.stack.at(-1)!, line.funcName)
  }

  return stackLastNumToFunctionMap
}
