import { Visitor } from '../visitors/types'

export type CollectorUpdate = {
  appId: string
  visitor: Visitor
  sessionId: string | undefined
  page?: Page | undefined
  referrer?: Referrer | undefined
  elements?: PageElement[] | undefined
}

export type PageElement = {
  selector: string
  path: string
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
export type Invocation =
  | 'INVOCATION_UNSPECIFIED'
  | 'INVOCATION_IDLE_TIME'
  | 'INVOCATION_EXIT_INTENT'
  | 'INVOCATION_PAGE_LOAD'

export type Trigger = {
  id?: string
  invocation?: Invocation
  data?: {
    [key: string]: string
  }
  invoke?: (trigger: Trigger) => void | JSX.Element | React.ReactNode
  behaviour?: 'BEHAVIOUR_MODAL' | 'BEHAVIOUR_YOUTUBE' | 'BEHAVIOUR_INVERSE_FLOW'
  brand?: any
}

export type PageView = {
  page: Page
  referrer: Referrer
  viewedAt: Date
}
