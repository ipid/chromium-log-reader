import { describe, test, expect } from 'vitest'
import { buildStackLastNumToFunctionMap } from '../buildStackLastNumToFunctionMap'
import { TEST_LOGS_MAP_STACK_LAST_NUM_TO_FUNCTION_NAME, TEST_LOGS_PARSED_LINES } from './testCases'

describe('buildStackLastNumToFunctionMap', () => {
  test('应该正确构建出 map', () => {
    const result = buildStackLastNumToFunctionMap(TEST_LOGS_PARSED_LINES)
    expect(result).toStrictEqual(TEST_LOGS_MAP_STACK_LAST_NUM_TO_FUNCTION_NAME)
  })
})
