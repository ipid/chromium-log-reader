import { describe, expect, test } from 'vitest'
import { parseLogs } from '../index'
import { TEST_LOGS, TEST_LOGS_TREE } from './testCases'

describe('logParser', () => {
  test('parseLogs', () => {
    const result = parseLogs(TEST_LOGS)
    expect(result).toStrictEqual(TEST_LOGS_TREE)
  })
})
