<script lang="ts" setup>
import LogItem from './LogItem.vue'
import type { LogContent } from '../types/log'
import { onMounted, ref, watch } from 'vue'

/**
 * 日志列组件
 * 展示一列相关的日志条目，每列代表一个层级的日志
 */
const props = defineProps<{
  items: readonly LogContent[]
  title: string | null
  activeItem: LogContent | null
}>()

/**
 * 定义向上传递日志项点击事件的接口
 */
const emit = defineEmits<{
  (e: 'itemClick', item: LogContent): void
}>()

const refContainer = ref<HTMLDivElement | null>(null)

/**
 * 处理单个日志项的点击事件
 * 将被点击的日志项信息向上传递给父组件
 */
function handleItemClick(item: LogContent): void {
  emit('itemClick', item)
}

function scrollSelfToView() {
  refContainer.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
}

onMounted(scrollSelfToView)
watch(() => props.items, scrollSelfToView)
</script>

<template>
  <div ref="refContainer" class="log-col__container">
    <header v-if="title" class="log-col__header">
      <span class="log-col__header-title">{{ title }}</span>
    </header>
    <div v-if="items.length === 0" class="log-col__empty">没有日志数据</div>
    <div v-else class="log-col__items">
      <LogItem
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        :is-active="item === activeItem"
        @click="handleItemClick(item)"
        class="log-col__item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/constants.scss' as constants;

.log-col__container {
  width: constants.$log-column-width;
  border-right: 1px solid #e0e0e0;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.log-col__header {
  padding: 6px 12px;
  border-bottom: 1px solid #e0e0e0;

  .log-col__header-title {
    font-size: 14px;
    font-weight: 600;
    overflow-wrap: break-word;
    color: #303133;
  }
}

.log-col__empty {
  flex: 1 1 auto;
  min-height: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #909399;
  font-size: 14px;
}

.log-col__items {
  padding: 8px 0 16px 10px;
  overflow: hidden scroll;
  scrollbar-color: white white;
  scrollbar-width: thin;

  &:hover {
    scrollbar-color: #c7c7c7 white;
  }
}

.log-col__item {
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
