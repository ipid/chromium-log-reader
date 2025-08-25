import { describe, expect, test } from 'vitest'
import { buildNestedStructure } from '../buildNestedStructure'
import { TEST_LOGS_MAP_STACK_LAST_NUM_TO_FUNCTION_NAME, TEST_LOGS_PARSED_LINES, TEST_LOGS_TREE } from './testCases'

describe('buildNestedStructure', () => {
  test('应该正确构建出树状结构', () => {
    const result = buildNestedStructure(TEST_LOGS_PARSED_LINES, TEST_LOGS_MAP_STACK_LAST_NUM_TO_FUNCTION_NAME)
    expect(result).toStrictEqual(TEST_LOGS_TREE)
  })
})
