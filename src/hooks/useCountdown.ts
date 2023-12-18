import { useEffect, useMemo, useState } from 'react'
import { useLogging } from '../context/LoggingContext'
import { formatTimeStamp, getPositiveDateDiffInSec } from '../utils/date'
import { getInterpolate } from './useInterpolate'

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
  formatDate?: (targetDate: Date) => string
}

const useCountdown = ({
  onZero,
  initialTimestamp,
  interpolate,
  formatDate = formatTimeStamp
}: Props) => {
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
    const formatVal = (val: string) => formatDate(new Date(val))

    const interpoaltedVal = interpolatefunc(interpolate.text, formatVal)

    return interpoaltedVal
  }, [countdown, interpolate, interpolatefunc])

  return { countdown, setTimeStamp, formattedCountdown }
}

export default useCountdown
