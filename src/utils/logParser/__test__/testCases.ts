import { LogType, type ContainerLogContent } from '@/types/log'
import type { ParsedSingleLogLine } from '../internalTypes'

export const TEST_LOGS_STACK_TRACE = `0   libbase.dylib                       0x0000000120ee78e8 base::debug::CollectStackTrace(base::span<void const*, 18446744073709551615ul, void const**>) + 84
1   libbase.dylib                       0x0000000120e877c8 base::debug::StackTrace::StackTrace(unsigned long) + 156`

export const TEST_LOGS = `
[ RUN      ] IpidTest.TestDynamicHTML

[ipid&#LOG!1][block_node.cc: BlockNode::Layout][#37 ($37)][&#msg!1]正在布局元素 #document。
开辟的空间：(800x600)[/&#msg1][&#stacktrace!1]${TEST_LOGS_STACK_TRACE}[/&#stacktrace1][/ipid&#LOG!1]

[ipid] --------------- [BEGIN READ TEST BODY] ---------------

[ipid&#LOG!9][block_node.cc: BlockNode::Layout][#37 ($37)][&#msg!9]开始执行完整的布局计算。[/&#msg9][&#stacktrace!9][/&#stacktrace9][/ipid&#LOG!9]

[ipid&#LOG!15][length_utils.h: ResolveMainInlineLength][#40 ($37-$38-$39-$40)][&#msg!15]正在将宽度值解析为像素值。
待解析的宽度为：Length(Auto, 0)[/&#msg15][&#stacktrace!15]${TEST_LOGS_STACK_TRACE}[/&#stacktrace15][/ipid&#LOG!15]

[ipid&#LOG!16][length_utils.h: ResolveMainInlineLength][#40 ($37-$38-$39-$40)][&#msg!16]接下来调用 ResolveInlineLengthInternal 来进行解析。[/&#msg16][&#stacktrace!16]${TEST_LOGS_STACK_TRACE}[/&#stacktrace16][/ipid&#LOG!16]

[ipid&#LOG!17][length_utils.cc: ResolveInlineLengthInternal][#41 ($37-$38-$39-$40-$41)][&#msg!17]正在解析宽度 Length(Auto, 0)，
上游需要解析哪种宽度：kMain[/&#msg17][&#stacktrace!17]${TEST_LOGS_STACK_TRACE}[/&#stacktrace17][/ipid&#LOG!17]

[ipid&#LOG!18][length_utils.cc: ResolveInlineLengthInternal][#41 ($37-$38-$39-$40-$41)][&#msg!18]当前要解析的宽度为 auto。[/&#msg18][&#stacktrace!18]${TEST_LOGS_STACK_TRACE}[/&#stacktrace18][/ipid&#LOG!18]

[ipid&#LOG!58][block_node.cc: BlockNode::Layout][#39 ($37-$38-$39)][&#msg!58]计算得到的元素几何信息：FragmentGeometry {
  滚动条占用空间：(上右下左) 0px, 0px, 0px, 0px
}[/&#msg58][&#stacktrace!58]${TEST_LOGS_STACK_TRACE}[/&#stacktrace58][/ipid&#LOG!58]

[ipid&#LOG!63][block_node.cc: DetermineAlgorithmAndRun][#52 ($37-$38-$39-$52)][&#msg!63]HTML 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。[/&#msg63][&#stacktrace!63]${TEST_LOGS_STACK_TRACE}[/&#stacktrace63][/ipid&#LOG!63]

[ipid&#LOG!70][length_utils.cc: ResolveInlineLengthInternal][#55 ($37-$38-$39-$52-$53-$54-$55)][&#msg!70]正在解析宽度 Length(Auto, 0)[/&#msg70][&#stacktrace!70]${TEST_LOGS_STACK_TRACE}[/&#stacktrace70][/ipid&#LOG!70]

[ipid&#LOG!78][length_utils.h: ResolveMinInlineLength][#56 ($37-$38-$39-$52-$53-$56)][&#msg!78]正在将宽度值解析为像素值。[/&#msg78][&#stacktrace!78]${TEST_LOGS_STACK_TRACE}[/&#stacktrace78][/ipid&#LOG!78]

[ipid&#LOG!79][length_utils.h: ResolveMinInlineLength][#56 ($37-$38-$39-$52-$53-$56)][&#msg!79]接下来调用 ResolveInlineLengthInternal 来进行解析。[/&#msg79][&#stacktrace!79]${TEST_LOGS_STACK_TRACE}[/&#stacktrace79][/ipid&#LOG!79]

[ipid&#LOG!80][length_utils.cc: ResolveInlineLengthInternal][#57 ($37-$38-$39-$52-$53-$56-$57)][&#msg!80]正在解析宽度 Length(Auto, 0)，
开辟的空间：ConstraintSpace {,
  available_size = (800x200),
  inline_auto_behavior = kStretchImplicit,
  block_auto_behavior = kFitContent,
}
上游需要解析哪种宽度：kMin
当前元素的 border+padding：(上右下左) 0px, 0px, 0px, 0px[/&#msg80][&#stacktrace!80]${TEST_LOGS_STACK_TRACE}[/&#stacktrace80][/ipid&#LOG!80]

[ipid&#LOG!83][length_utils.h: ResolveMinInlineLength][#56 ($37-$38-$39-$52-$53-$56)][&#msg!83]ResolveInlineLengthInternal 返回的结果为：0[/&#msg83][&#stacktrace!83]${TEST_LOGS_STACK_TRACE}[/&#stacktrace83][/ipid&#LOG!83]

[ipid&#LOG!102][block_node.cc: BlockNode::Layout][#53 ($37-$38-$39-$52-$53)][&#msg!102]开始执行完整的布局计算。[/&#msg102][&#stacktrace!102]${TEST_LOGS_STACK_TRACE}[/&#stacktrace102][/ipid&#LOG!102]

[ipid&#LOG!103][block_node.cc: DetermineAlgorithmAndRun][#62 ($37-$38-$39-$52-$53-$62)][&#msg!103]<null Node> 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。[/&#msg103][&#stacktrace!103]${TEST_LOGS_STACK_TRACE}[/&#stacktrace103][/ipid&#LOG!103]

[ipid&#LOG!1126][block_node.cc: BlockNode::Layout][#37 ($37)][&#msg!1126]开始完成布局的后续处理（FinishLayout）。[/&#msg1126][&#stacktrace!1126]${TEST_LOGS_STACK_TRACE}[/&#stacktrace1126][/ipid&#LOG!1126]

[ipid&#LOG!1127][block_node.cc: BlockNode::Layout][#37 ($37)][&#msg!1127]滚动条检查：
  布局前：(上右下左) 0px, 0px, 0px, 0px
  布局后：(上右下左) 0px, 0px, 0px, 0px[/&#msg1127][&#stacktrace!1127][/&#stacktrace1127][/ipid&#LOG!1127]

[ipid] --------------- [END READ TEST BODY] ---------------

[ipid&#LOG!1128][block_node.cc: BlockNode::Layout][#37 ($37)][&#msg!1128]元素 #document 的布局完成！
最终的布局结果：LayoutResult { 根元素大小: 800x600 }[/&#msg1128][&#stacktrace!1128]${TEST_LOGS_STACK_TRACE}[/&#stacktrace1128][/ipid&#LOG!1128]

[       OK ] IpidTest.TestDynamicHTML (468 ms)  

`.trim()

export const TEST_LOGS_PARSED_LINES: ParsedSingleLogLine[] = [
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 9,
    stack: [37],
    message: '开始执行完整的布局计算。',
    stackTrace: '',
  },
  {
    funcName: 'length_utils.h: ResolveMainInlineLength',
    index: 15,
    stack: [37, 38, 39, 40],
    message: '正在将宽度值解析为像素值。\n待解析的宽度为：Length(Auto, 0)',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.h: ResolveMainInlineLength',
    index: 16,
    stack: [37, 38, 39, 40],
    message: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 17,
    stack: [37, 38, 39, 40, 41],
    message: '正在解析宽度 Length(Auto, 0)，\n上游需要解析哪种宽度：kMain',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 18,
    stack: [37, 38, 39, 40, 41],
    message: '当前要解析的宽度为 auto。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 58,
    stack: [37, 38, 39],
    message: '计算得到的元素几何信息：FragmentGeometry {\n  滚动条占用空间：(上右下左) 0px, 0px, 0px, 0px\n}',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'block_node.cc: DetermineAlgorithmAndRun',
    index: 63,
    stack: [37, 38, 39, 52],
    message: 'HTML 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 70,
    stack: [37, 38, 39, 52, 53, 54, 55],
    message: '正在解析宽度 Length(Auto, 0)',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.h: ResolveMinInlineLength',
    index: 78,
    stack: [37, 38, 39, 52, 53, 56],
    message: '正在将宽度值解析为像素值。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.h: ResolveMinInlineLength',
    index: 79,
    stack: [37, 38, 39, 52, 53, 56],
    message: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 80,
    stack: [37, 38, 39, 52, 53, 56, 57],
    message:
      '正在解析宽度 Length(Auto, 0)，\n开辟的空间：ConstraintSpace {,\n  available_size = (800x200),\n  inline_auto_behavior = kStretchImplicit,\n  block_auto_behavior = kFitContent,\n}\n上游需要解析哪种宽度：kMin\n当前元素的 border+padding：(上右下左) 0px, 0px, 0px, 0px',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'length_utils.h: ResolveMinInlineLength',
    index: 83,
    stack: [37, 38, 39, 52, 53, 56],
    message: 'ResolveInlineLengthInternal 返回的结果为：0',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 102,
    stack: [37, 38, 39, 52, 53],
    message: '开始执行完整的布局计算。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'block_node.cc: DetermineAlgorithmAndRun',
    index: 103,
    stack: [37, 38, 39, 52, 53, 62],
    message: '<null Node> 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 1126,
    stack: [37],
    message: '开始完成布局的后续处理（FinishLayout）。',
    stackTrace: TEST_LOGS_STACK_TRACE,
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 1127,
    stack: [37],
    message: '滚动条检查：\n  布局前：(上右下左) 0px, 0px, 0px, 0px\n  布局后：(上右下左) 0px, 0px, 0px, 0px',
    stackTrace: '',
  },
]

export const TEST_LOGS_MAP_STACK_LAST_NUM_TO_FUNCTION_NAME = new Map<number, string>([
  [37, 'block_node.cc: BlockNode::Layout'],
  [39, 'block_node.cc: BlockNode::Layout'],
  [40, 'length_utils.h: ResolveMainInlineLength'],
  [41, 'length_utils.cc: ResolveInlineLengthInternal'],
  [52, 'block_node.cc: DetermineAlgorithmAndRun'],
  [53, 'block_node.cc: BlockNode::Layout'],
  [55, 'length_utils.cc: ResolveInlineLengthInternal'],
  [56, 'length_utils.h: ResolveMinInlineLength'],
  [57, 'length_utils.cc: ResolveInlineLengthInternal'],
  [62, 'block_node.cc: DetermineAlgorithmAndRun'],
])

export const TEST_LOGS_TREE: ContainerLogContent = {
  type: LogType.Container,
  title: '<未知>',
  uniqueId: '-1',
  subLogs: [
    {
      type: LogType.Container,
      title: 'block_node.cc: BlockNode::Layout', // 37
      uniqueId: '37',
      subLogs: [
        {
          type: LogType.Simple,
          index: 9,
          text: '开始执行完整的布局计算。',
          stackTrace: '',
        },

        {
          type: LogType.Container,
          title: '<未知>', // 38
          uniqueId: '38',
          subLogs: [
            {
              type: LogType.Container,
              title: 'block_node.cc: BlockNode::Layout', // 39
              uniqueId: '39',
              subLogs: [
                {
                  type: LogType.Container,
                  title: 'length_utils.h: ResolveMainInlineLength', // 40
                  uniqueId: '40',
                  subLogs: [
                    {
                      type: LogType.Simple,
                      index: 15,
                      text: '正在将宽度值解析为像素值。\n待解析的宽度为：Length(Auto, 0)',
                      stackTrace: TEST_LOGS_STACK_TRACE,
                    },
                    {
                      type: LogType.Simple,
                      index: 16,
                      text: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
                      stackTrace: TEST_LOGS_STACK_TRACE,
                    },
                    {
                      type: LogType.Container,
                      title: 'length_utils.cc: ResolveInlineLengthInternal', // 41
                      uniqueId: '41',
                      subLogs: [
                        {
                          type: LogType.Simple,
                          index: 17,
                          text: '正在解析宽度 Length(Auto, 0)，\n上游需要解析哪种宽度：kMain',
                          stackTrace: TEST_LOGS_STACK_TRACE,
                        },
                        {
                          type: LogType.Simple,
                          index: 18,
                          text: '当前要解析的宽度为 auto。',
                          stackTrace: TEST_LOGS_STACK_TRACE,
                        },
                      ],
                    },
                  ],
                },
                {
                  type: LogType.Simple,
                  index: 58,
                  text: '计算得到的元素几何信息：FragmentGeometry {\n  滚动条占用空间：(上右下左) 0px, 0px, 0px, 0px\n}',
                  stackTrace: TEST_LOGS_STACK_TRACE,
                },
                {
                  type: LogType.Container,
                  title: 'block_node.cc: DetermineAlgorithmAndRun', // 52
                  uniqueId: '52',
                  subLogs: [
                    {
                      type: LogType.Simple,
                      index: 63,
                      text: 'HTML 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。',
                      stackTrace: TEST_LOGS_STACK_TRACE,
                    },
                    {
                      type: LogType.Container,
                      title: 'block_node.cc: BlockNode::Layout', // 53
                      uniqueId: '53',
                      subLogs: [
                        {
                          type: LogType.Container,
                          title: '<未知>', // 54
                          uniqueId: '54',
                          subLogs: [
                            {
                              type: LogType.Container,
                              title: 'length_utils.cc: ResolveInlineLengthInternal', // 55
                              uniqueId: '55',
                              subLogs: [
                                {
                                  type: LogType.Simple,
                                  index: 70,
                                  text: '正在解析宽度 Length(Auto, 0)',
                                  stackTrace: TEST_LOGS_STACK_TRACE,
                                },
                              ],
                            },
                          ],
                        },

                        {
                          type: LogType.Container,
                          title: 'length_utils.h: ResolveMinInlineLength', // 56
                          uniqueId: '56',
                          subLogs: [
                            {
                              type: LogType.Simple,
                              index: 78,
                              text: '正在将宽度值解析为像素值。',
                              stackTrace: TEST_LOGS_STACK_TRACE,
                            },
                            {
                              type: LogType.Simple,
                              index: 79,
                              text: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
                              stackTrace: TEST_LOGS_STACK_TRACE,
                            },
                            {
                              type: LogType.Container,
                              title: 'length_utils.cc: ResolveInlineLengthInternal', // 57
                              uniqueId: '57',
                              subLogs: [
                                {
                                  type: LogType.Simple,
                                  index: 80,
                                  text: '正在解析宽度 Length(Auto, 0)，\n开辟的空间：ConstraintSpace {,\n  available_size = (800x200),\n  inline_auto_behavior = kStretchImplicit,\n  block_auto_behavior = kFitContent,\n}\n上游需要解析哪种宽度：kMin\n当前元素的 border+padding：(上右下左) 0px, 0px, 0px, 0px',
                                  stackTrace: TEST_LOGS_STACK_TRACE,
                                },
                              ],
                            },
                            {
                              type: LogType.Simple,
                              index: 83,
                              text: 'ResolveInlineLengthInternal 返回的结果为：0',
                              stackTrace: TEST_LOGS_STACK_TRACE,
                            },
                          ],
                        },

                        {
                          type: LogType.Simple,
                          index: 102,
                          text: '开始执行完整的布局计算。',
                          stackTrace: TEST_LOGS_STACK_TRACE,
                        },
                        {
                          type: LogType.Container,
                          title: 'block_node.cc: DetermineAlgorithmAndRun', // 62
                          uniqueId: '62',
                          subLogs: [
                            {
                              type: LogType.Simple,
                              index: 103,
                              text: '<null Node> 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。',
                              stackTrace: TEST_LOGS_STACK_TRACE,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          type: LogType.Simple,
          index: 1126,
          text: '开始完成布局的后续处理（FinishLayout）。',
          stackTrace: TEST_LOGS_STACK_TRACE,
        },
        {
          type: LogType.Simple,
          index: 1127,
          text: '滚动条检查：\n  布局前：(上右下左) 0px, 0px, 0px, 0px\n  布局后：(上右下左) 0px, 0px, 0px, 0px',
          stackTrace: '',
        },
      ],
    },
  ],
}
