<script lang="ts" setup>
import LogColumn from './LogColumn.vue'
import type { LogContent } from '../types/log'

/**
 * 日志查看器组件
 * 并排展示多列日志，实现类似于 macOS Finder 的 column view 浏览方式
 * 每列展示一个层级的日志，点击某列中的容器日志时，右侧会显示其子日志
 */
const props = defineProps<{
  columns: LogContent[][]
}>()

/**
 * 定义向上传递日志项点击事件的接口
 * 携带被点击的日志项及其所在列索引
 */
const emit = defineEmits<{
  (e: 'itemClick', item: LogContent, columnIndex: number): void
}>()

/**
 * 处理日志项点击事件
 * 将点击信息和列索引传递给父组件进行处理
 */
function handleItemClick(item: LogContent, columnIndex: number): void {
  emit('itemClick', item, columnIndex)
}
</script>

<template>
  <div class="log-vw__container">
    <div v-if="columns.length === 0" class="log-vw__empty">
      <span>暂无日志数据，请先输入日志内容</span>
    </div>
    <template v-else>
      <LogColumn
        v-for="(columnItems, columnIndex) in columns"
        :key="'column-' + columnIndex"
        :items="columnItems"
        @item-click="
          function (item) {
            handleItemClick(item, columnIndex)
          }
        "
        class="log-vw__column"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.log-vw__container {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow-x: auto;
  position: relative;

  // 提供滚动条样式以增强用户体验
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c0c4cc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f5f7fa;
  }
}

.log-vw__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #909399;
  font-size: 16px;
}

.log-vw__column {
  flex-shrink: 0;

  &:last-child {
    border-right: none;
  }
}
</style>
