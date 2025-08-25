<script lang="ts" setup>
import LogColumn from './LogColumn.vue'
import { LogType, type ContainerLogContent, type LogContent } from '../types/log'
import { computed } from 'vue'

/**
 * 日志查看器组件
 * 并排展示多列日志，实现类似于 macOS Finder 的 column view 浏览方式
 * 每列展示一个层级的日志，点击某列中的容器日志时，右侧会显示其子日志
 */
const props = defineProps<{
  rootLog: ContainerLogContent
  activePath: ContainerLogContent[]
}>()

/**
 * 定义向上传递日志项点击事件的接口
 * 携带被点击的日志项及其所在列索引
 */
const emit = defineEmits<{
  (e: 'itemClick', item: LogContent, columnIndex: number): void
}>()

const columns = computed(() => {
  return [props.rootLog, ...props.activePath]
})

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
    <LogColumn
      v-for="(column, columnIndex) in columns"
      :key="`${column.uniqueId}-${columnIndex}`"
      :items="column.subLogs"
      :title="column.title"
      :active-item="activePath[columnIndex] ?? null"
      @item-click="(item) => handleItemClick(item, columnIndex)"
      class="log-vw__column"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/constants.scss' as constants;

.log-vw__container {
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  overflow: scroll hidden;
  position: relative;
  $horizontal-padding: 16px;
  padding: 12px calc(100% - constants.$log-column-width - $horizontal-padding) 0 $horizontal-padding;
  gap: 12px;

  &::-webkit-scrollbar {
    display: none;
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
  }
}
</style>
