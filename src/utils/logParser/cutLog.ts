/** 只取日志中 [BEGIN READ TEST BODY] 和 [END READ TEST BODY] 之间的内容 */
export function cutLog(logs: string) {
  const START_MARK = '[BEGIN READ TEST BODY]'
  const END_MARK = '[END READ TEST BODY]'

  const startIndex = logs.indexOf(START_MARK)
  const endIndex = logs.indexOf(END_MARK)

  return logs.slice(startIndex, endIndex)
}
