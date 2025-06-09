import { vi, describe, expect, test } from 'vitest'
import { buildIdToFunctionMap, buildNestedStructure, extractLogInfo, getParsedLogGroups } from './logParser'
import { LogType } from '@/types/log'

describe('logParser', () => {
  const log = `[ipid][BlockNode::Layout][#1 ($1)] Layout START
  [[node]]: BlockNode: LayoutView #document
[ipid][BlockNode::Layout][#2 ($1-$2)] Layout START
  [[node]]: BlockNode: LayoutBlockFlow HTML








  
[ipid][length_utils.cc: ComputeInlineSizeForFragmentInternal][#3 ($1-$2-$3)] call ResolveMainInlineLength (length = node.style['width']) to get extent
  [[node]]: BlockNode: LayoutBlockFlow HTML
[ipid][length_utils.cc: ResolveInlineLengthInternal][#4 ($1-$2-$3-$4)] BEGIN ResolveInlineLengthInternal
  [[space]]: 1x1
[ipid][length_utils.cc: ResolveInlineLengthInternal][#4 ($1-$2-$3-$4)] stretch to Definite available_size, RETURN valid value
  [[space]]: 1x1
[ipid][length_utils.cc: ComputeInlineSizeForFragmentInternal][#13 ($1-$2-$12-$13)] call ResolveMainInlineLength (length = node.style['width']) to get extent
  [[node]]: BlockNode: LayoutBlockFlow BODY
[ipid][length_utils.cc: ResolveInlineLengthInternal][#14 ($1-$2-$12-$13-$14)] BEGIN ResolveInlineLengthInternal
  [[space]]: 1x1

NOTICE: [ipid] 200% of 0 is 0

[ipid][length_utils.cc: ResolveInlineLengthInternal][#14 ($1-$2-$12-$13-$14)] stretch to Definite available_size, RETURN valid value
  [[space]]: 1x1                                                                                                                                    
[ipid][BlockNode::Layout][#12 ($1-$2-$12)] Layout SUCCEED
  [[node]]: BlockNode: LayoutBlockFlow BODY
[ipid][BlockNode::Layout][#2 ($1-$2)] Layout SUCCEED
  [[node]]: BlockNode: LayoutBlockFlow HTML
[ipid][BlockNode::Layout][#1 ($1)] Layout SUCCEED
  [[node]]: BlockNode: LayoutView #document
[ipid][BlockNode::Layout][#1 ($1)] Begin CLEAR DATA
                                           
                     [[node]]: BlockNode: #data

[ipid][BlockNode::ClearDataInternal][#18 ($1-$15-$16-$17-$18)] cookie data is cleared
[ipid][BlockNode::ClearData][#16 ($1-$15-$16)] data cleared
      `.trim()

  test('extractLogInfo', () => {
    const result = getParsedLogGroups(log)
    expect(result).toStrictEqual([
      {
        funcName: 'BlockNode::Layout',
        id: 1,
        message: 'Layout START\n  [[node]]: BlockNode: LayoutView #document',
        stack: [1],
      },
      {
        funcName: 'BlockNode::Layout',
        id: 2,
        message: 'Layout START\n  [[node]]: BlockNode: LayoutBlockFlow HTML',
        stack: [1, 2],
      },
      {
        funcName: 'length_utils.cc: ComputeInlineSizeForFragmentInternal',
        id: 3,
        message:
          "call ResolveMainInlineLength (length = node.style['width']) to get extent\n  [[node]]: BlockNode: LayoutBlockFlow HTML",
        stack: [1, 2, 3],
      },
      {
        funcName: 'length_utils.cc: ResolveInlineLengthInternal',
        id: 4,
        message: 'BEGIN ResolveInlineLengthInternal\n  [[space]]: 1x1',
        stack: [1, 2, 3, 4],
      },
      {
        funcName: 'length_utils.cc: ResolveInlineLengthInternal',
        id: 4,
        message: 'stretch to Definite available_size, RETURN valid value\n  [[space]]: 1x1',
        stack: [1, 2, 3, 4],
      },
      {
        funcName: 'length_utils.cc: ComputeInlineSizeForFragmentInternal',
        id: 13,
        message:
          "call ResolveMainInlineLength (length = node.style['width']) to get extent\n  [[node]]: BlockNode: LayoutBlockFlow BODY",
        stack: [1, 2, 12, 13],
      },
      {
        funcName: 'length_utils.cc: ResolveInlineLengthInternal',
        id: 14,
        message: 'BEGIN ResolveInlineLengthInternal\n  [[space]]: 1x1\n\nNOTICE:',
        stack: [1, 2, 12, 13, 14],
      },
      {
        funcName: 'length_utils.cc: ResolveInlineLengthInternal',
        id: 14,
        message: 'stretch to Definite available_size, RETURN valid value\n  [[space]]: 1x1',
        stack: [1, 2, 12, 13, 14],
      },
      {
        funcName: 'BlockNode::Layout',
        id: 12,
        message: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutBlockFlow BODY',
        stack: [1, 2, 12],
      },
      {
        funcName: 'BlockNode::Layout',
        id: 2,
        message: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutBlockFlow HTML',
        stack: [1, 2],
      },
      {
        funcName: 'BlockNode::Layout',
        id: 1,
        message: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutView #document',
        stack: [1],
      },
      {
        funcName: 'BlockNode::Layout',
        id: 1,
        message:
          'Begin CLEAR DATA\n                                           \n                     [[node]]: BlockNode: #data',
        stack: [1],
      },
      {
        funcName: 'BlockNode::ClearDataInternal',
        id: 18,
        message: 'cookie data is cleared',
        stack: [1, 15, 16, 17, 18],
      },
      {
        funcName: 'BlockNode::ClearData',
        id: 16,
        message: 'data cleared',
        stack: [1, 15, 16],
      },
    ])
  })

  test('buildIdToFunctionMap', () => {
    const result = buildIdToFunctionMap(getParsedLogGroups(log))
    expect(result).toStrictEqual(
      new Map([
        [1, 'BlockNode::Layout'],
        [2, 'BlockNode::Layout'],
        [3, 'length_utils.cc: ComputeInlineSizeForFragmentInternal'],
        [4, 'length_utils.cc: ResolveInlineLengthInternal'],
        [13, 'length_utils.cc: ComputeInlineSizeForFragmentInternal'],
        [14, 'length_utils.cc: ResolveInlineLengthInternal'],
        [12, 'BlockNode::Layout'],
        [18, 'BlockNode::ClearDataInternal'],
        [16, 'BlockNode::ClearData'],
      ]),
    )
  })

  test('buildNestedStructure', () => {
    const result = buildNestedStructure(
      [
        {
          funcName: 'BlockNode::Layout',
          id: 1,
          message: 'Layout START\n  [[node]]: BlockNode: LayoutView #document',
          stack: [1],
        },
        {
          funcName: 'BlockNode::Layout',
          id: 2,
          message: 'Layout START\n  [[node]]: BlockNode: LayoutBlockFlow HTML',
          stack: [1, 2],
        },
        {
          funcName: 'length_utils.cc: ComputeInlineSizeForFragmentInternal',
          id: 3,
          message:
            "call ResolveMainInlineLength (length = node.style['width']) to get extent\n  [[node]]: BlockNode: LayoutBlockFlow HTML",
          stack: [1, 2, 3],
        },
        {
          funcName: 'length_utils.cc: ResolveInlineLengthInternal',
          id: 4,
          message: 'BEGIN ResolveInlineLengthInternal\n  [[space]]: 1x1',
          stack: [1, 2, 3, 4],
        },
        {
          funcName: 'length_utils.cc: ResolveInlineLengthInternal',
          id: 4,
          message: 'stretch to Definite available_size, RETURN valid value\n  [[space]]: 1x1',
          stack: [1, 2, 3, 4],
        },
        {
          funcName: 'length_utils.cc: ComputeInlineSizeForFragmentInternal',
          id: 13,
          message:
            "call ResolveMainInlineLength (length = node.style['width']) to get extent\n  [[node]]: BlockNode: LayoutBlockFlow BODY",
          stack: [1, 2, 12, 13],
        },
        {
          funcName: 'length_utils.cc: ResolveInlineLengthInternal',
          id: 14,
          message: 'BEGIN ResolveInlineLengthInternal\n  [[space]]: 1x1\n\nNOTICE:',
          stack: [1, 2, 12, 13, 14],
        },
        {
          funcName: 'length_utils.cc: ResolveInlineLengthInternal',
          id: 14,
          message: 'stretch to Definite available_size, RETURN valid value\n  [[space]]: 1x1',
          stack: [1, 2, 12, 13, 14],
        },
        {
          funcName: 'BlockNode::Layout',
          id: 12,
          message: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutBlockFlow BODY',
          stack: [1, 2, 12],
        },
        {
          funcName: 'BlockNode::Layout',
          id: 2,
          message: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutBlockFlow HTML',
          stack: [1, 2],
        },
        {
          funcName: 'BlockNode::Layout',
          id: 1,
          message: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutView #document',
          stack: [1],
        },
        {
          funcName: 'BlockNode::Layout',
          id: 1,
          message:
            'Begin CLEAR DATA\n                                           \n                     [[node]]: BlockNode: #data',
          stack: [1],
        },
        {
          funcName: 'BlockNode::ClearDataInternal',
          id: 18,
          message: 'cookie data is cleared',
          stack: [1, 15, 16, 17, 18],
        },
        {
          funcName: 'BlockNode::ClearData',
          id: 16,
          message: 'data cleared',
          stack: [1, 15, 16],
        },
      ],
      new Map([
        [1, 'BlockNode::Layout'],
        [2, 'BlockNode::Layout'],
        [3, 'length_utils.cc: ComputeInlineSizeForFragmentInternal'],
        [4, 'length_utils.cc: ResolveInlineLengthInternal'],
        [13, 'length_utils.cc: ComputeInlineSizeForFragmentInternal'],
        [14, 'length_utils.cc: ResolveInlineLengthInternal'],
        [12, 'BlockNode::Layout'],
        [18, 'BlockNode::ClearDataInternal'],
        [16, 'BlockNode::ClearData'],
      ]),
    )

    expect(result).toStrictEqual({
      type: LogType.Container,
      title: 'BlockNode::Layout', // 来自所有 #1 的日志的函数名。所有 #1 的日志的函数名都相同。
      subLogs: [
        {
          type: LogType.Simple,
          text: 'Layout START\n  [[node]]: BlockNode: LayoutView #document',
        },
        {
          type: LogType.Container,
          title: 'BlockNode::Layout', // 来自所有 #2 的日志的函数名。所有 #2 的日志的函数名都相同。
          subLogs: [
            {
              type: LogType.Simple,
              text: 'Layout START\n  [[node]]: BlockNode: LayoutBlockFlow HTML',
            },
            {
              type: LogType.Container,
              title: 'length_utils.cc: ComputeInlineSizeForFragmentInternal',
              subLogs: [
                {
                  type: LogType.Simple,
                  text: "call ResolveMainInlineLength (length = node.style['width']) to get extent\n  [[node]]: BlockNode: LayoutBlockFlow HTML",
                },
                {
                  type: LogType.Container,
                  title: 'length_utils.cc: ResolveInlineLengthInternal',
                  subLogs: [
                    {
                      type: LogType.Simple,
                      text: 'BEGIN ResolveInlineLengthInternal\n  [[space]]: 1x1',
                    },
                    {
                      type: LogType.Simple,
                      text: 'stretch to Definite available_size, RETURN valid value\n  [[space]]: 1x1',
                    },
                  ],
                },
              ],
            },
            {
              type: LogType.Container,
              title: 'BlockNode::Layout', // #12 的函数名
              subLogs: [
                {
                  type: LogType.Container,
                  title: 'length_utils.cc: ComputeInlineSizeForFragmentInternal', // #13 的函数名
                  subLogs: [
                    {
                      type: LogType.Simple,
                      text: "call ResolveMainInlineLength (length = node.style['width']) to get extent\n  [[node]]: BlockNode: LayoutBlockFlow BODY",
                    },
                    {
                      type: LogType.Container,
                      title: 'length_utils.cc: ResolveInlineLengthInternal',
                      subLogs: [
                        {
                          type: LogType.Simple,
                          text: 'BEGIN ResolveInlineLengthInternal\n  [[space]]: 1x1\n\nNOTICE:',
                        },
                        // 这里，不合法的 [ipid] 200% of 0 is 0 日志被忽略了（它没有函数名、标号、调用栈）
                        {
                          type: LogType.Simple,
                          text: 'stretch to Definite available_size, RETURN valid value\n  [[space]]: 1x1',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: LogType.Simple,
                  text: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutBlockFlow BODY',
                },
              ],
            },
            {
              type: LogType.Simple,
              text: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutBlockFlow HTML',
            },
          ],
        },
        {
          type: LogType.Simple,
          text: 'Layout SUCCEED\n  [[node]]: BlockNode: LayoutView #document',
        },
        {
          type: LogType.Simple,
          text: 'Begin CLEAR DATA\n                                           \n                     [[node]]: BlockNode: #data',
        },
        {
          type: LogType.Container,
          title: '', // 不知道 #15 的函数名
          subLogs: [
            {
              type: LogType.Container,
              title: 'BlockNode::ClearData', // #16 的函数名
              subLogs: [
                {
                  type: LogType.Container,
                  title: '', // 不知道 #17 的函数名
                  subLogs: [
                    {
                      type: LogType.Container,
                      title: 'BlockNode::ClearDataInternal', // #18 的函数名
                      subLogs: [
                        {
                          type: LogType.Simple,
                          text: 'cookie data is cleared',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: LogType.Simple,
                  text: 'data cleared',
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
