<script lang="ts" setup>
import { computed } from 'vue'
import type { LogContent, SimpleLogContent } from '../types/log'
import { LogType } from '../types/log'
import { ElIcon, ElButton, ElMessage } from 'element-plus'
import { MoreFilled, Document, CopyDocument } from '@element-plus/icons-vue'

/**
 * 日志项组件，用于显示单条日志或日志容器
 * 根据日志类型决定展示为简单文本消息或可展开的容器视图
 */
const props = defineProps<{
  item: LogContent
  isActive: boolean
}>()

/**
 * 提取摘要，即容器中第一条简单日志的文本
 */
const firstSummary = computed<string | null>(function () {
  if (props.item.type !== LogType.Container) {
    return null
  }
  const firstSimpleLog = props.item.subLogs.find((log): log is SimpleLogContent => log.type === LogType.Simple)
  return firstSimpleLog?.text ?? null
})

/**
 * 提取末尾摘要，即容器中最后一条简单日志的文本
 */
const lastSummary = computed<string | null>(function () {
  if (props.item.type !== LogType.Container) {
    return null
  }
  const simpleLogs = props.item.subLogs.filter((log): log is SimpleLogContent => log.type === LogType.Simple)
  if (simpleLogs.length < 2) {
    return null
  }
  return simpleLogs.at(-1)!.text
})

/**
 * 检查简单日志是否有堆栈信息
 */
const hasStackTrace = computed<boolean>(() => {
  return props.item.type === LogType.Simple && props.item.stackTrace.trim() !== ''
})

/**
 * 复制堆栈信息到剪贴板
 */
async function copyStackTrace() {
  if (props.item.type !== LogType.Simple || !props.item.stackTrace.trim()) {
    return
  }

  try {
    await navigator.clipboard.writeText(props.item.stackTrace)
    ElMessage.success('已复制堆栈信息到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage.error('复制失败，请重试')
  }
}
</script>

<template>
  <div
    class="log-itm__container"
    :class="{
      'log-itm__container--active': isActive,
      'log-itm__container--container': item.type === LogType.Container,
    }"
  >
    <!-- 简单消息视图 - 显示普通日志文本 -->
    <div v-if="item.type === LogType.Simple" class="log-itm__simple">
      <div class="log-itm__simple-aside">
        <ElIcon :size="14">
          <Document />
        </ElIcon>
        <span class="log-itm__simple-aside__index">#{{ item.index }}</span>
      </div>
      <div class="log-itm__simple-content">
        <div class="log-itm__simple-text">
          {{ item.text || '空日志' }}
        </div>
        <ElButton
          v-if="hasStackTrace"
          :icon="CopyDocument"
          size="small"
          text
          type="primary"
          class="log-itm__copy-btn"
          @click.stop="copyStackTrace"
          title="复制堆栈信息"
        />
      </div>
    </div>

    <!-- 容器视图 - 显示可展开的子日志集合 -->
    <div v-if="item.type === LogType.Container" class="log-itm__container-view">
      <header class="log-itm__container-header">
        <div class="log-itm__container-header-title">{{ item.title }}</div>
      </header>
      <main class="log-itm__container-main">
        <div
          v-if="firstSummary !== null"
          class="log-itm__container-main-summary log-itm__container-main-summary--first"
        >
          {{ firstSummary }}
        </div>
        <div class="log-itm__container-main-details">
          <span>&gt; 点击查看详情</span>
        </div>
        <div v-if="lastSummary !== null" class="log-itm__container-main-summary log-itm__container-main-summary--last">
          {{ lastSummary }}
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 日志项基础样式
.log-itm__container {
  padding: 8px 12px 8px 6px;
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
  font-size: 13px;

  .log-itm__simple-aside {
    color: #909399;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2px;
    margin-right: 6px;
    gap: 4px;
    min-width: 24px;

    .log-itm__simple-aside__index {
      font-size: 10px;
      color: #b5b5b5;
    }
  }

  .log-itm__simple-content {
    flex: 1 0 0;
    min-width: 0;
    display: flex;
    gap: 8px;

    .log-itm__simple-text {
      flex: 1 0 0;
      min-width: 0;
      color: #303133;
      white-space: pre-wrap;
      text-wrap: pretty;
      overflow-wrap: break-word;
      flex: 1;
      line-height: 1.5;
    }
  }
}

.log-itm__copy-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
  padding: 0 4px !important;
  min-width: unset !important;
  height: 20px !important;
  font-size: 12px;
  flex-shrink: 0;
  margin-top: 1px;

  &:deep(.el-button__text-content) {
    display: none;
  }

  .log-itm__container:hover & {
    opacity: 0.6;
  }

  &:hover {
    opacity: 1 !important;
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
      font-size: 13px;
      word-break: break-word;
    }

    .log-itm__container-header-menu {
      color: #909399;
      flex-shrink: 0;
    }
  }

  .log-itm__container-main {
    .log-itm__container-main-summary {
      font-size: 11px;
      color: #919397;
      white-space: pre-wrap;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;

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
      font-size: 12px;
      color: #409eff;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>
