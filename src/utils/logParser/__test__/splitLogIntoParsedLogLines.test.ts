import { describe, test, expect } from 'vitest'
import { splitLogIntoParsedLogLines } from '../splitLogIntoParsedLogLines'
import { cutLog } from '../cutLog'
import { TEST_LOGS, TEST_LOGS_PARSED_LINES } from './testCases'

describe('splitLogIntoParsedLogLines', () => {
  test('应该正常解析', () => {
    const logAfterCut = cutLog(TEST_LOGS)
    const parsedLogLines = splitLogIntoParsedLogLines(logAfterCut)

    expect(parsedLogLines).toEqual(TEST_LOGS_PARSED_LINES)
  })
})
