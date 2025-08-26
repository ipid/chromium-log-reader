/**
 * 解析后的单条日志行的数据结构
 * @example
 * [ipid&#LOG!102][block_node.cc: BlockNode::Layout][#53 ($37-$38-$39-$52-$53)] 开始执行完整的布局计算。 [/ipid&#LOG!102]
 *
 * 在该日志中：
 * - funcName 为 "block_node.cc: BlockNode::Layout"
 * - id 为 102（即 ipid&#LOG! 后面的部分）
 * - stack 为 [37, 38, 39, 52, 53]
 * - message 为 "开始执行完整的布局计算。"
 * 
 * @example
 * [ipid&#LOG!248][length_utils.cc: ResolveInlineLengthInternal][#100 ($37-$38-$39-$52-$53-$62-$63-$98-$99-$100)] 当前的可用空间（800px）是明确的，因此只要再计算元素的固有宽度，即可获取 fit-content 的解析结果。
接下来计算元素的固有宽度。 [/ipid&#LOG!248]
 *
 * 在该日志中：
 * - funcName 为 "length_utils.cc: ResolveInlineLengthInternal"
 * - id 为 248（即 ipid&#LOG! 后面的部分）
 * - stack 为 [37, 38, 39, 52, 53, 62, 63, 98, 99, 100]
 * - message 为 "当前的可用空间（800px）是明确的，因此只要再计算元素的固有宽度，即可获取 fit-content 的解析结果。\n接下来计算元素的固有宽度。"
 */
export type ParsedSingleLogLine = {
  readonly funcName: string
  readonly index: number
  readonly stack: number[]
  readonly message: string
  readonly stackTrace: string
}
