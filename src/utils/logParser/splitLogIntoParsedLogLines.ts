import type { ParsedSingleLogLine } from './internalTypes'

export function splitLogIntoParsedLogLines(logs: string): ParsedSingleLogLine[] {
  // 使用 String.raw 和命名捕获组提高可读性，支持新的日志格式（包含 msg 和 stacktrace 部分）
  const RE_LOG_LINE = new RegExp(
    String.raw`\[ipid&#LOG!` +
      String.raw`(?<index>\d+)` + // 捕获日志 ID
      String.raw`\]\[` +
      String.raw`(?<funcName>[^\]]+)` + // 捕获函数名
      String.raw`\]\[#` +
      String.raw`(?<lastNumber>\d+)` + // 捕获最后的数字
      String.raw`\s+\(` +
      String.raw`(?<stackStr>\$\d+(-\$\d+)*)` + // 捕获堆栈字符串，形如 $37-$38-$39-$52-$53
      String.raw`\)\]\[&#msg!` +
      String.raw`\k<index>` + // 反向引用，确保 msg 标记的 ID 与开始标记一致
      String.raw`\]` +
      String.raw`(?<message>[\s\S]+?)` + // 捕获消息内容（支持换行）
      String.raw`\[/&#msg` +
      String.raw`\k<index>` + // 反向引用，确保结束 msg 标记的 ID 一致
      String.raw`\]\[&#stacktrace!` +
      String.raw`\k<index>` + // 反向引用，确保 stacktrace 标记的 ID 一致
      String.raw`\]` +
      String.raw`(?<stackTrace>[\s\S]*?)` + // 捕获堆栈跟踪内容（支持换行）
      String.raw`\[/&#stacktrace` +
      String.raw`\k<index>` + // 反向引用，确保结束 stacktrace 标记的 ID 一致
      String.raw`\]\[/ipid&#LOG!` +
      String.raw`\k<index>` + // 反向引用，确保结束标记的 ID 与开始标记一致
      String.raw`\]`,
    'g',
  )

  const results: ParsedSingleLogLine[] = []

  for (const match of logs.matchAll(RE_LOG_LINE)) {
    const { index: indexStr, funcName, lastNumber: lastNumberStr, stackStr, message, stackTrace } = match.groups!
    const index = Number(indexStr)
    const lastNumberOfStack = Number(lastNumberStr)

    // 解析堆栈部分：$37-$38-$39-$52-$53 -> [37, 38, 39, 52, 53]
    const stack = stackStr!.split('-').map((s) => Number(s.replace('$', '')))
    if (stack.length <= 0 || stack.at(-1) !== lastNumberOfStack) {
      continue
    }

    results.push({
      funcName: funcName!,
      index,
      stack,
      message: message!.trim(),
      stackTrace: stackTrace!.trim(),
    })
  }

  return results
}
