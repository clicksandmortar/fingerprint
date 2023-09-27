import { Visitor } from '../visitors/types'

export type CollectorUpdate = {
  appId: string
  visitor: Visitor
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
  type?: 'idle' | 'exit' | 'default'
  behaviour?: string
  // delay?: number
  // invoke:(trigger: Trigger) => void;
  // @todo: commented out, out of date?
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
