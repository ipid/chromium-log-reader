export enum LogType {
  /** 简单日志，没有子日志 */
  Simple = 'Simple',
  /** 容器日志，包含标题和子日志 */
  Container = 'Container',
}

/** 简单日志数据结构定义，为不可变对象 */
export type SimpleLogContent = {
  readonly type: LogType.Simple

  /** 日志的文本内容 */
  readonly text: string
}

/**
 * 容器日志数据结构定义，为不可变对象。
 * 一个 ContainerLogContent 负责存储属于同一个 # 标号的日志，所有具有相同 # 标号的日志会作为简单日志存储在 subLogs 中。
 */
export type ContainerLogContent = {
  readonly type: LogType.Container

  /** 容器日志的标题，从日志的函数名中获取 */
  readonly title: string

  /** 容器日志所包含的子日志，有可能是简单日志，也有可能是容器日志 */
  readonly subLogs: readonly LogContent[]
}

export type LogContent = SimpleLogContent | ContainerLogContent
