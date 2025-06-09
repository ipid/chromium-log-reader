<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElButton, ElDrawer, ElInput } from 'element-plus'
import LogViewer from './components/LogViewer.vue'
import { parseLog } from './services/logParser'
import type { LogContent, ContainerLogContent } from './types/log'
import { LogType } from './types/log'

const isDrawerVisible = ref(false)
const rawLog = ref('')
const rootLog = ref<ContainerLogContent | null>(null)
const activePath = ref<LogContent[]>([])

const hasLog = computed(() => {
  return rootLog.value !== null && rootLog.value.subLogs.length > 0
})

const columns = computed(() => {
  if (rootLog.value === null) {
    return []
  }

  const cols: {
    title: string | null
    items: LogContent[]
  }[] = [
    {
      title: rootLog.value.title,
      items: [...rootLog.value.subLogs],
    },
  ]

  for (const activeItem of activePath.value) {
    if (activeItem.type === LogType.Container && activeItem.subLogs.length > 0) {
      cols.push({
        title: activeItem.title,
        items: [...activeItem.subLogs],
      })
    } else {
      break
    }
  }
  return cols
})

function handleParseLog() {
  const { rootLog: parsedLog } = parseLog(rawLog.value)
  rootLog.value = parsedLog
  activePath.value = []
  isDrawerVisible.value = false
}

function handleItemClick(item: LogContent, columnIndex: number) {
  const currentActiveItem = activePath.value[columnIndex]

  if (currentActiveItem === item) {
    activePath.value.splice(columnIndex)
  } else {
    activePath.value.splice(columnIndex, activePath.value.length - columnIndex, item)
  }
}
</script>

<template>
  <div class="app__container">
    <header class="app__header">
      <h1 class="app__header-title">日志阅读器</h1>
      <ElButton @click="isDrawerVisible = true">
        {{ hasLog ? '重新输入日志' : '输入日志' }}
      </ElButton>
    </header>

    <main class="app__main">
      <LogViewer v-if="hasLog" :columns="columns" :active-path="activePath" @item-click="handleItemClick" />
      <div v-else class="app__main-placeholder">
        <span>点击右上角按钮输入日志内容开始使用</span>
      </div>
    </main>

    <ElDrawer v-model="isDrawerVisible" title="输入日志内容" direction="btt" size="60%">
      <div class="app__drawer">
        <ElInput
          v-model="rawLog"
          type="textarea"
          :rows="15"
          placeholder="请在此处粘贴日志内容"
          class="app__drawer-textarea"
        />
        <ElButton type="primary" @click="handleParseLog">开始解析</ElButton>
      </div>
    </ElDrawer>
  </div>
</template>

<style lang="scss" scoped>
.app__container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
}

.app__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  flex-shrink: 0;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;

  .app__header-title {
    font-size: 20px;
    font-weight: 600;
  }
}

.app__main {
  flex-grow: 1;
  overflow: hidden;
  padding: 16px;

  .app__main-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #909399;
  }
}

.app__drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 24px 24px;

  .app__drawer-textarea {
    flex-grow: 1;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    :deep(.el-textarea__inner) {
      flex-grow: 1;
      resize: none;
    }
  }
}
</style>
