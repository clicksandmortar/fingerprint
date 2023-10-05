import { Visitor } from '../visitors/types'

export type CollectorUpdate = {
  appId: string
  visitor: Visitor
  sessionId: string | undefined
  page: Page
  referrer: Referrer
}

export type Page = {
  url: string
  path: string
  title: string
  params?: {
    [key: string]: string
  }
}

export type Referrer = {
  url: string
  title: string
  params?: {
    [key: string]: string
  }
  utm?: {
    source?: string
    medium?: string
    campaign?: string
    content?: string
    term?: string
  }
}

export type CollectorResponse = {
  firstSeen: Date
  lastSeen: Date
  visits: number
  pageTriggers: Trigger[]
  // @todo remove this temp hack once split testing with Intently is complete
  intently: boolean
}

export type Trigger = {
  id?: string
  invocation?:
    | 'INVOCATION_UNSPECIFIED'
    | 'INVOCATION_IDLE_TIME'
    | 'INVOCATION_EXIT_INTENT'
    | 'INVOCATION_PAGE_LOAD'
  invoke?: (trigger: Trigger) => void | JSX.Element | React.ReactNode
  data?: {
    [key: string]: string
  }
  brand?: any
}

export type PageView = {
  page: Page
  referrer: Referrer
  viewedAt: Date
}
