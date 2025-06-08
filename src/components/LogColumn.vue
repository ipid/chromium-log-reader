<script lang="ts" setup>
import LogItem from './LogItem.vue'
import type { LogContent } from '../types/log'

/**
 * 日志列组件
 * 展示一列相关的日志条目，每列代表一个层级的日志
 */
const props = defineProps<{
  items: LogContent[]
}>()

/**
 * 定义向上传递日志项点击事件的接口
 */
const emit = defineEmits<{
  (e: 'itemClick', item: LogContent): void
}>()

/**
 * 处理单个日志项的点击事件
 * 将被点击的日志项信息向上传递给父组件
 */
function handleItemClick(item: LogContent): void {
  emit('itemClick', item)
}
</script>

<template>
  <div class="log-col__container">
    <div v-if="items.length === 0" class="log-col__empty">
      <span>没有日志数据</span>
    </div>
    <LogItem v-for="item in items" :key="item.id" :item="item" @click="handleItemClick(item)" class="log-col__item" />
  </div>
</template>

<style lang="scss" scoped>
.log-col__container {
  width: 300px;
  min-width: 300px;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 8px;

  // 提供滚动条样式以增强用户体验
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c4cc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f7fa;
  }
}

.log-col__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #909399;
  font-size: 14px;
}

.log-col__item {
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
