import { useEffect, useMemo, useState } from 'react'
import { useLogging } from '../context/LoggingContext'
import { getInterpolate } from './useInterpolate'

const getPositiveDateDiffInSec = (date1: Date, date2: Date) => {
  return Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 1000))
}

function formatTimeStamp(targetDate: Date): string {
  // written with help from `Cat I farted`.
  const durationInSeconds = getPositiveDateDiffInSec(new Date(), targetDate)

  const days = Math.floor(durationInSeconds / (60 * 60 * 24))
  const hours = Math.floor((durationInSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((durationInSeconds % (60 * 60)) / 60)
  const seconds = durationInSeconds % 60

  const parts = []

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`)
  }

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  }

  if (minutes > 0) {
    parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
  }

  if (seconds > 0) {
    parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`)
  }

  if (parts.length === 0) {
    return '0 sec'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  const lastPart = parts.pop()
  const formattedDuration = parts.join(' ') + ` and ${lastPart}`

  return formattedDuration
}

type InterpolateVal = {
  structure: Record<string, unknown>
  text?: string
}

type Props = {
  onZero?: () => void
  initialTimestamp?: Date
  // sadly this and interpolation have to be coupled to enable putting a timer where we like
  // in our text. Otherwise we could easily remove this caca
  interpolate?: InterpolateVal
}

const useCountdown = ({ onZero, initialTimestamp, interpolate }: Props) => {
  const { error } = useLogging()
  const [timestamp, setTimeStamp] = useState<Date | null>(
    initialTimestamp || null
  )
  const [countdown, setCountdown] = useState<string>('')
  const [intId, setIntId] = useState<any>()

  useEffect(() => {
    if (timestamp === null) return

    const id = setInterval(() => {
      const result = formatTimeStamp(new Date(timestamp))
      setCountdown(result)
    }, 1000)

    setIntId(id)
    return () => clearInterval(id)
  }, [timestamp])

  useEffect(() => {
    if (!onZero) return
    if (timestamp === null) return

    const currentDate = new Date()
    const diff = getPositiveDateDiffInSec(currentDate, new Date(timestamp))

    if (diff <= 0) {
      onZero()
      clearInterval(intId)
    }
  }, [onZero, timestamp, intId])

  const interpolatefunc = useMemo(
    () => getInterpolate(interpolate?.structure as Record<string, unknown>),
    [interpolate]
  )

  const formattedCountdown = useMemo(() => {
    if (!interpolate) {
      error('No interpolation provided to timer. Rendering just countdown.')
      return countdown
    }
    if (!interpolatefunc) {
      error("interpolatefunc couldn't be created. Rendering just countdown.")
      return countdown
    }

    if (!interpolate?.text) {
      error(
        'No text provided to timer interpolation. Rendering just countdown.'
      )
      return countdown
    }
    const formatVal = (val: string) => formatTimeStamp(new Date(val))

    const interpoaltedVal = interpolatefunc(interpolate.text, formatVal)

    return interpoaltedVal
  }, [countdown, interpolate, interpolatefunc])

  return { countdown, setTimeStamp, formattedCountdown }
}

export default useCountdown
