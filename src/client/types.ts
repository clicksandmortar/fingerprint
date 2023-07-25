import { Visitor } from '../visitors/types'

export type CollectorUpdate = {
  appId: string
  visitor: Visitor
  page: Page
  referrer: Referrer
}

export type Page = {
  url: string
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
    source: string
    medium: string
    campaign: string
    content: string
    term: string
  }
}

export type CollectorResponse = {
  firstSeen: Date
  lastSeen: Date
  visits: number
  trigger: Trigger
}

export type Trigger = {
  [key: string]: string
}
