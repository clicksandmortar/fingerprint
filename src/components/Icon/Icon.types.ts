// manual. hacky. but better than `type: string`
// The package contains a ton of sub-packs and no nutual export,we have to do each individually:
import * as aiIcons from 'react-icons/ai'
import * as biIcons from 'react-icons/bi'
import * as bsIcons from 'react-icons/bs'
import * as cgIcons from 'react-icons/cg'
import * as ciIcons from 'react-icons/ci'
import * as diIcons from 'react-icons/di'
import * as faIcons from 'react-icons/fa'
import * as fa6Icons from 'react-icons/fa6'
import * as fcIcons from 'react-icons/fc'
import * as fiIcons from 'react-icons/fi'
import * as giIcons from 'react-icons/gi'
import * as goIcons from 'react-icons/go'
import * as grIcons from 'react-icons/gr'
import * as hiIcons from 'react-icons/hi'
import * as hi2Icons from 'react-icons/hi2'
import * as imIcons from 'react-icons/im'
import * as ioIcons from 'react-icons/io'
import * as io5Icons from 'react-icons/io5'
import * as liaIcons from 'react-icons/lia'
import * as libIcons from 'react-icons/lib'
import * as luIcons from 'react-icons/lu'
import * as mdIcons from 'react-icons/md'
import * as piIcons from 'react-icons/pi'
import * as riIcons from 'react-icons/ri'
import * as rxIcons from 'react-icons/rx'
import * as siIcons from 'react-icons/si'
import * as slIcons from 'react-icons/sl'
import * as tbIcons from 'react-icons/tb'
import * as tfiIcons from 'react-icons/tfi'
import * as tiIcons from 'react-icons/ti'
import * as vscIcons from 'react-icons/vsc'
import * as wiIcons from 'react-icons/wi'

type IaiIcons = keyof typeof aiIcons
type IbiIcons = keyof typeof biIcons
type IbsIcons = keyof typeof bsIcons
type IcgIcons = keyof typeof cgIcons
type IciIcons = keyof typeof ciIcons
type IdiIcons = keyof typeof diIcons
type IfaIcons = keyof typeof faIcons
type Ifa6Icons = keyof typeof fa6Icons
type IfcIcons = keyof typeof fcIcons
type IfiIcons = keyof typeof fiIcons
type IgiIcons = keyof typeof giIcons
type IgoIcons = keyof typeof goIcons
type IgrIcons = keyof typeof grIcons
type IhiIcons = keyof typeof hiIcons
type Ihi2Icons = keyof typeof hi2Icons
type IimIcons = keyof typeof imIcons
type IioIcons = keyof typeof ioIcons
type Iio5Icons = keyof typeof io5Icons
type IliaIcons = keyof typeof liaIcons
type IlibIcons = keyof typeof libIcons
type IluIcons = keyof typeof luIcons
type ImdIcons = keyof typeof mdIcons
type IpiIcons = keyof typeof piIcons
type IriIcons = keyof typeof riIcons
type IrxIcons = keyof typeof rxIcons
type IsiIcons = keyof typeof siIcons
type IslIcons = keyof typeof slIcons
type ItbIcons = keyof typeof tbIcons
type ItfiIcons = keyof typeof tfiIcons
type ItiIcons = keyof typeof tiIcons
type IvscIcons = keyof typeof vscIcons
type IwiIcons = keyof typeof wiIcons

const Icon = {
  aiIcons,
  biIcons,
  bsIcons,
  cgIcons,
  ciIcons,
  diIcons,
  faIcons,
  fa6Icons,
  fcIcons,
  fiIcons,
  giIcons,
  goIcons,
  grIcons,
  hiIcons,
  hi2Icons,
  imIcons,
  ioIcons,
  io5Icons,
  liaIcons,
  libIcons,
  luIcons,
  mdIcons,
  piIcons,
  riIcons,
  rxIcons,
  siIcons,
  slIcons,
  tbIcons,
  tfiIcons,
  tiIcons,
  vscIcons,
  wiIcons
}

export type IconName =
  | IaiIcons
  | IbiIcons
  | IbsIcons
  | IcgIcons
  | IciIcons
  | IdiIcons
  | IfaIcons
  | Ifa6Icons
  | IfcIcons
  | IfiIcons
  | IgiIcons
  | IgoIcons
  | IgrIcons
  | IhiIcons
  | Ihi2Icons
  | IimIcons
  | IioIcons
  | Iio5Icons
  | IliaIcons
  | IlibIcons
  | IluIcons
  | ImdIcons
  | IpiIcons
  | IriIcons
  | IrxIcons
  | IsiIcons
  | IslIcons
  | ItbIcons
  | ItfiIcons
  | ItiIcons
  | IvscIcons
  | IwiIcons
