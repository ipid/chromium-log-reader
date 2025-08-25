import { LogType, type ContainerLogContent } from '@/types/log'
import type { ParsedSingleLogLine } from '../internalTypes'

export const TEST_LOGS = `
[ RUN      ] IpidTest.TestDynamicHTML

[ipid&#LOG!1][block_node.cc: BlockNode::Layout][#37 ($37)] 正在布局元素 #document。
开辟的空间：(800x600)[/ipid&#LOG!1]

[ipid] --------------- [BEGIN READ TEST BODY] ---------------

[ipid&#LOG!9][block_node.cc: BlockNode::Layout][#37 ($37)] 开始执行完整的布局计算。 [/ipid&#LOG!9]

[ipid&#LOG!15][length_utils.h: ResolveMainInlineLength][#40 ($37-$38-$39-$40)] 正在将宽度值解析为像素值。
待解析的宽度为：Length(Auto, 0) [/ipid&#LOG!15]

[ipid&#LOG!16][length_utils.h: ResolveMainInlineLength][#40 ($37-$38-$39-$40)] 接下来调用 ResolveInlineLengthInternal 来进行解析。 [/ipid&#LOG!16]

[ipid&#LOG!17][length_utils.cc: ResolveInlineLengthInternal][#41 ($37-$38-$39-$40-$41)] 正在解析宽度 Length(Auto, 0)，
上游需要解析哪种宽度：kMain [/ipid&#LOG!17]

[ipid&#LOG!18][length_utils.cc: ResolveInlineLengthInternal][#41 ($37-$38-$39-$40-$41)] 当前要解析的宽度为 auto。 [/ipid&#LOG!18]

[ipid&#LOG!58][block_node.cc: BlockNode::Layout][#39 ($37-$38-$39)] 计算得到的元素几何信息：FragmentGeometry {
  滚动条占用空间：(上右下左) 0px, 0px, 0px, 0px
} [/ipid&#LOG!58]

[ipid&#LOG!63][block_node.cc: DetermineAlgorithmAndRun][#52 ($37-$38-$39-$52)] HTML 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。 [/ipid&#LOG!63]

[ipid&#LOG!70][length_utils.cc: ResolveInlineLengthInternal][#55 ($37-$38-$39-$52-$53-$54-$55)] 正在解析宽度 Length(Auto, 0) [/ipid&#LOG!70]

[ipid&#LOG!78][length_utils.h: ResolveMinInlineLength][#56 ($37-$38-$39-$52-$53-$56)]        
                   正在将宽度值解析为像素值。  
       [/ipid&#LOG!78]

[ipid&#LOG!79][length_utils.h: ResolveMinInlineLength][#56 ($37-$38-$39-$52-$53-$56)] 接下来调用 ResolveInlineLengthInternal 来进行解析。 [/ipid&#LOG!79]

[ipid&#LOG!80][length_utils.cc: ResolveInlineLengthInternal][#57 ($37-$38-$39-$52-$53-$56-$57)] 正在解析宽度 Length(Auto, 0)，
开辟的空间：ConstraintSpace {,
  available_size = (800x200),
  inline_auto_behavior = kStretchImplicit,
  block_auto_behavior = kFitContent,
}
上游需要解析哪种宽度：kMin
当前元素的 border+padding：(上右下左) 0px, 0px, 0px, 0px [/ipid&#LOG!80]

[ipid&#LOG!83][length_utils.h: ResolveMinInlineLength][#56 ($37-$38-$39-$52-$53-$56)] ResolveInlineLengthInternal 返回的结果为：0 [/ipid&#LOG!83]

[ipid&#LOG!85][length_utils.h: ResolveMaxInlineLength][#58 ($37-$38-$39-$52-$53-$58)] 正在将宽度值解析为像素值（场景：计算最大宽度）。
【注意这条没有反括号！】

[ipid&#LOG!102][block_node.cc: BlockNode::Layout][#53 ($37-$38-$39-$52-$53)] 开始执行完整的布局计算。 [/ipid&#LOG!102]

[ipid&#LOG!103][block_node.cc: DetermineAlgorithmAndRun][#62 ($37-$38-$39-$52-$53-$62)] <null Node> 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。 [/ipid&#LOG!103]

[ipid&#LOG!1126][block_node.cc: BlockNode::Layout][#37 ($37)] 开始完成布局的后续处理（FinishLayout）。 [/ipid&#LOG!1126]

[ipid&#LOG!1127][block_node.cc: BlockNode::Layout][#37 ($37)] 滚动条检查：
  布局前：(上右下左) 0px, 0px, 0px, 0px
  布局后：(上右下左) 0px, 0px, 0px, 0px [/ipid&#LOG!1127]

[ipid] --------------- [END READ TEST BODY] ---------------

[ipid&#LOG!1128][block_node.cc: BlockNode::Layout][#37 ($37)] 元素 #document 的布局完成！
最终的布局结果：LayoutResult { 根元素大小: 800x600 } [/ipid&#LOG!1128]

[       OK ] IpidTest.TestDynamicHTML (468 ms)  

`.trim()

export const TEST_LOGS_PARSED_LINES: ParsedSingleLogLine[] = [
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 9,
    stack: [37],
    message: '开始执行完整的布局计算。',
  },
  {
    funcName: 'length_utils.h: ResolveMainInlineLength',
    index: 15,
    stack: [37, 38, 39, 40],
    message: '正在将宽度值解析为像素值。\n待解析的宽度为：Length(Auto, 0)',
  },
  {
    funcName: 'length_utils.h: ResolveMainInlineLength',
    index: 16,
    stack: [37, 38, 39, 40],
    message: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 17,
    stack: [37, 38, 39, 40, 41],
    message: '正在解析宽度 Length(Auto, 0)，\n上游需要解析哪种宽度：kMain',
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 18,
    stack: [37, 38, 39, 40, 41],
    message: '当前要解析的宽度为 auto。',
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 58,
    stack: [37, 38, 39],
    message: '计算得到的元素几何信息：FragmentGeometry {\n  滚动条占用空间：(上右下左) 0px, 0px, 0px, 0px\n}',
  },
  {
    funcName: 'block_node.cc: DetermineAlgorithmAndRun',
    index: 63,
    stack: [37, 38, 39, 52],
    message: 'HTML 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。',
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 70,
    stack: [37, 38, 39, 52, 53, 54, 55],
    message: '正在解析宽度 Length(Auto, 0)',
  },
  {
    funcName: 'length_utils.h: ResolveMinInlineLength',
    index: 78,
    stack: [37, 38, 39, 52, 53, 56],
    message: '正在将宽度值解析为像素值。',
  },
  {
    funcName: 'length_utils.h: ResolveMinInlineLength',
    index: 79,
    stack: [37, 38, 39, 52, 53, 56],
    message: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
  },
  {
    funcName: 'length_utils.cc: ResolveInlineLengthInternal',
    index: 80,
    stack: [37, 38, 39, 52, 53, 56, 57],
    message:
      '正在解析宽度 Length(Auto, 0)，\n开辟的空间：ConstraintSpace {,\n  available_size = (800x200),\n  inline_auto_behavior = kStretchImplicit,\n  block_auto_behavior = kFitContent,\n}\n上游需要解析哪种宽度：kMin\n当前元素的 border+padding：(上右下左) 0px, 0px, 0px, 0px',
  },
  {
    funcName: 'length_utils.h: ResolveMinInlineLength',
    index: 83,
    stack: [37, 38, 39, 52, 53, 56],
    message: 'ResolveInlineLengthInternal 返回的结果为：0',
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 102,
    stack: [37, 38, 39, 52, 53],
    message: '开始执行完整的布局计算。',
  },
  {
    funcName: 'block_node.cc: DetermineAlgorithmAndRun',
    index: 103,
    stack: [37, 38, 39, 52, 53, 62],
    message: '<null Node> 为普通 block 容器，调用 BlockLayoutAlgorithm 来完成后续操作。',
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 1126,
    stack: [37],
    message: '开始完成布局的后续处理（FinishLayout）。',
  },
  {
    funcName: 'block_node.cc: BlockNode::Layout',
    index: 1127,
    stack: [37],
    message: '滚动条检查：\n  布局前：(上右下左) 0px, 0px, 0px, 0px\n  布局后：(上右下左) 0px, 0px, 0px, 0px',
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
  uniqueId: '<root>',
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
                    },
                    {
                      type: LogType.Simple,
                      index: 16,
                      text: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
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
                        },
                        {
                          type: LogType.Simple,
                          index: 18,
                          text: '当前要解析的宽度为 auto。',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: LogType.Simple,
                  index: 58,
                  text: '计算得到的元素几何信息：FragmentGeometry {\n  滚动条占用空间：(上右下左) 0px, 0px, 0px, 0px\n}',
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
                            },
                            {
                              type: LogType.Simple,
                              index: 79,
                              text: '接下来调用 ResolveInlineLengthInternal 来进行解析。',
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
                                },
                              ],
                            },
                            {
                              type: LogType.Simple,
                              index: 83,
                              text: 'ResolveInlineLengthInternal 返回的结果为：0',
                            },
                          ],
                        },

                        {
                          type: LogType.Simple,
                          index: 102,
                          text: '开始执行完整的布局计算。',
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
        },
        {
          type: LogType.Simple,
          index: 1127,
          text: '滚动条检查：\n  布局前：(上右下左) 0px, 0px, 0px, 0px\n  布局后：(上右下左) 0px, 0px, 0px, 0px',
        },
      ],
    },
  ],
}
