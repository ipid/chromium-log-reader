<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElButton, ElDrawer, ElInput, ElMessage } from 'element-plus'
import LogViewer from './components/LogViewer.vue'
import { parseLogs } from './utils/logParser'
import type { LogContent, ContainerLogContent } from './types/log'
import { LogType } from './types/log'
import { Plus, Edit } from '@element-plus/icons-vue'

const isDrawerVisible = ref(false)
const rawLog = ref('')
const rootLog = ref<ContainerLogContent>({
  // 空容器占位
  type: LogType.Container,
  title: '',
  uniqueId: '',
  subLogs: [],
})
const activePath = ref<ContainerLogContent[]>([])

const hasLog = computed(() => {
  return rootLog.value.subLogs.length > 0
})

function handleParseLog() {
  const parsedLogResult = parseLogs(rawLog.value)
  if (parsedLogResult.subLogs.length === 0) {
    ElMessage.warning('解析失败，请检查日志内容')
    return
  }

  rootLog.value = parsedLogResult
  rawLog.value = ''
  activePath.value = []
  isDrawerVisible.value = false
}

function handleItemClick(item: LogContent, columnIndex: number) {
  if (item.type !== LogType.Container) {
    return
  }

  activePath.value.splice(columnIndex)
  activePath.value.push(item)
}
</script>

<template>
  <div class="app__container">
    <header class="app__header">
      <h1 class="app__header-title">日志阅读器</h1>
      <ElButton :icon="hasLog ? Edit : Plus" @click="isDrawerVisible = true">
        {{ hasLog ? '重新输入日志' : '输入日志' }}
      </ElButton>
    </header>

    <main class="app__main">
      <LogViewer v-if="hasLog" :root-log="rootLog" :active-path="activePath" @item-click="handleItemClick" />
      <div v-else class="app__main-placeholder">
        <span>点击右上角按钮输入日志内容开始使用</span>
      </div>
    </main>

    <ElDrawer
      v-model="isDrawerVisible"
      header-class="app__drawer-header"
      title="输入日志内容"
      direction="btt"
      size="60%"
    >
      <div class="app__drawer-content">
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
  display: flex;

  .app__main-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #909399;
  }
}

:deep(.app__drawer-header) {
  margin-bottom: 0 !important;
}

.app__drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;

  .app__drawer-textarea {
    resize: none;
    flex: 1 0 0;
    min-height: 0;

    margin-bottom: 16px;
    display: flex;
    flex-direction: column;

    :deep(.el-textarea__inner) {
      flex-grow: 1;
      resize: none;
      contain: strict;
    }
  }
}
</style>
