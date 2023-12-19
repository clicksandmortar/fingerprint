import { SupportedBrand } from '../utils/brand'
import { DeviceInfo } from '../utils/device'
import { Visitor } from '../visitors/types'

export type Interaction = {
  variantID: string
  shownAt: string
}

export type CollectorUpdate = {
  appId?: string
  visitor?: Visitor
  sessionId?: string | undefined
  page?: Page | undefined
  referrer?: Referrer | undefined
  elements?: PageElement[] | undefined
  account?: Account | undefined
  form?: Form | undefined
  button?: Button | undefined
  conversion?: { id: string }
  device?: DeviceInfo | undefined
  cta?: Interaction
  exit?: Interaction
}

export type Button = {
  id?: string
  selector?: string
  path?: string
}

export type Form = {
  data: {
    [key: string]: any
  }
}

export type Account = {
  token: string
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

// TODO: move these into a separate file. They have to do wit triggers and signals, not so much the colletor
export type Operator = 'starts_with' | 'contains' | 'ends_with' | 'eq'
export type ComparisonFunc = (comparison: string) => boolean

export type IsOnPathSignal = {
  // will have more later
  op: 'IsOnPath'
  parameters: [Operator, string]
}
export type IsOnDomainSignal = {
  // will have more later
  op: 'IsOnDomain'
  parameters: [
    string // domain
  ]
}

export type CanSeeElementOnPageSignal = {
  // will have more later
  op: 'CanSeeElementOnPage'
  parameters: [
    string, // selector
    Operator, // operator
    string // value
  ]
}
export type FESignal =
  | IsOnPathSignal
  | IsOnDomainSignal
  | CanSeeElementOnPageSignal

export type Conversion = {
  identifier: string
  signals: FESignal[]
  analyticsEvent: string
}

export type IncompleteTrigger = Trigger & {
  signals: FESignal[]
}

export type CollectorVisitorResponse = {
  firstSeen: string
  lastSeen: string
  visits: {
    host: 3
    path: 3
  }
  pageTriggers: Trigger[]
  config: Config
  incompleteTriggers?: IncompleteTrigger[]
  // @todo remove this temp hack once split testing with Intently is complete
  intently: boolean
  identifiers?: { main?: string }
  conversions: Conversion[]
}

export type Invocation =
  | 'INVOCATION_UNSPECIFIED'
  | 'INVOCATION_IDLE_TIME'
  | 'INVOCATION_EXIT_INTENT'
  | 'INVOCATION_PAGE_LOAD'
  | 'INVOCATION_ELEMENT_VISIBLE'

//TODO: this should be split into separate BannerTrigger, ModalTrigger, etc for type safety
export type Trigger = {
  id: string
  invocation?: Invocation
  // invoke:(trigger: Trigger) => void;
  // @todo: commented out, out of date?
  data?: {
    [key: string]: string
  }
  invoke?: (trigger: Trigger) => void | JSX.Element | React.ReactNode
  behaviour?:
    | 'BEHAVIOUR_MODAL'
    | 'BEHAVIOUR_YOUTUBE'
    | 'BEHAVIOUR_INVERSE_FLOW'
    | 'BEHAVIOUR_BANNER'
  brand?: any
  variantID?: string
  variantName?: string
  multipleOfSameBehaviourSupported?: boolean
}

export type PageView = {
  page: Page
  referrer: Referrer
  viewedAt: Date
}

export type FingerprintConfig = {
  exitIntentDelay?: number
  idleDelay?: number
  triggerCooldown?: number
}

type ScriptConfig = {
  debugMode: boolean
}
type TriggerConfig = {
  userIdleThresholdSecs: number
  displayTriggerAfterSecs: number
  triggerCooldownSecs: number
}
type BrandConfig = {
  name: SupportedBrand
  colors?: {
    backgroundPrimary: string
    backgroundPrimaryDimmed: string
    backgroundSecondary: string
    shadeOfGrey: string
    textPrimary: string
    greyText: string
  }
}

export type Config = {
  script: ScriptConfig
  trigger: TriggerConfig
  brand: BrandConfig
}
