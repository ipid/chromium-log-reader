<script lang="ts" setup>
import { computed } from 'vue'
import type { LogContent } from '../types/log'
import { ElIcon } from 'element-plus'
import { MoreFilled, Document } from '@element-plus/icons-vue'

/**
 * 日志项组件，用于显示单条日志或日志容器
 * 根据日志类型决定展示为简单文本消息或可展开的容器视图
 */
const props = defineProps<{
  item: LogContent
}>()

/**
 * 计算组件类名，根据日志项状态动态添加修饰符
 */
const containerClassNames = computed<string[]>(function () {
  const classNames = ['log-itm__container']

  if (props.item.isActive === true) {
    classNames.push('log-itm__container--active')
  }

  if (props.item.isContainer === true) {
    classNames.push('log-itm__container--container')
  }

  return classNames
})

/**
 * 提取摘要的前70个字符，确保摘要显示合理
 */
const firstSummary = computed<string>(function () {
  if (props.item.summary.first === null) {
    return ''
  }
  const text = props.item.summary.first
  return text.length > 70 ? text.substring(0, 70) + '...' : text
})

/**
 * 提取末尾摘要的前70个字符
 */
const lastSummary = computed<string>(function () {
  if (props.item.summary.last === null) {
    return ''
  }
  const text = props.item.summary.last
  return text.length > 70 ? text.substring(0, 70) + '...' : text
})
</script>

<template>
  <div :class="containerClassNames">
    <!-- 简单消息视图 - 显示普通日志文本 -->
    <div v-if="item.isContainer === false" class="log-itm__simple">
      <div class="log-itm__simple-icon">
        <ElIcon :size="14">
          <Document />
        </ElIcon>
      </div>
      <div class="log-itm__simple-text">
        {{ item.text || '空日志' }}
      </div>
    </div>

    <!-- 容器视图 - 显示可展开的子日志集合 -->
    <div v-if="item.isContainer === true" class="log-itm__container-view">
      <header class="log-itm__container-header">
        <div class="log-itm__container-header-title">{{ item.title }}</div>
        <div class="log-itm__container-header-menu">
          <ElIcon>
            <MoreFilled />
          </ElIcon>
        </div>
      </header>
      <main class="log-itm__container-main">
        <div
          v-if="item.summary.first !== null"
          class="log-itm__container-main-summary log-itm__container-main-summary--first"
        >
          {{ firstSummary }}
        </div>
        <div class="log-itm__container-main-details">
          <span>&gt; 点击查看详情</span>
        </div>
        <div
          v-if="item.summary.last !== null"
          class="log-itm__container-main-summary log-itm__container-main-summary--last"
        >
          {{ lastSummary }}
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 日志项基础样式
.log-itm__container {
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 4px;
  border: 1px solid #e0e0e0;

  &:hover {
    background-color: #f5f7fa;
  }

  &.log-itm__container--active {
    background-color: #ecf5ff;
    border-color: #b3d8ff;
  }
}

// 简单日志消息样式
.log-itm__simple {
  display: flex;
  align-items: flex-start;
  font-size: 14px;

  .log-itm__simple-icon {
    margin-right: 8px;
    color: #909399;
    display: flex;
    align-items: center;
    margin-top: 2px;
  }

  .log-itm__simple-text {
    color: #303133;
    white-space: pre-wrap;
    word-break: break-word;
    flex: 1;
    line-height: 1.5;
  }
}

// 容器日志视图样式
.log-itm__container-view {
  .log-itm__container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    .log-itm__container-header-title {
      font-weight: 600;
      font-size: 14px;
      word-break: break-word;
    }

    .log-itm__container-header-menu {
      color: #909399;
      flex-shrink: 0;
    }
  }

  .log-itm__container-main {
    .log-itm__container-main-summary {
      font-size: 12px;
      color: #909399;
      line-height: 1.4;
      white-space: normal;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: break-word;

      &.log-itm__container-main-summary--first {
        margin-bottom: 4px;
      }

      &.log-itm__container-main-summary--last {
        margin-top: 4px;
      }
    }

    .log-itm__container-main-details {
      padding: 8px 0;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 13px;
      color: #409eff;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
