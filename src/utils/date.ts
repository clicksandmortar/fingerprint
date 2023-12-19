export const getDiffInDHMS = (
  targetDate: Date,
  initialDate: Date = new Date()
) => {
  const diffInSeconds = getPositiveDateDiffInSec(targetDate, initialDate)

  const days = Math.floor(diffInSeconds / (24 * 60 * 60))
  const hours = Math.floor((diffInSeconds % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60)
  const seconds = diffInSeconds % 60

  return { days, minutes, hours, seconds }
}

export function formatSimpler(targetDate: Date): string {
  const { days, hours, minutes, seconds } = getDiffInDHMS(targetDate)
  if (days > 0) {
    return `${days}d ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  } else {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`
  }
}
export const getPositiveDateDiffInSec = (date1: Date, date2: Date) => {
  return Math.abs(Math.floor((date2.getTime() - date1.getTime()) / 1000))
}

export function formatTimeStamp(targetDate: Date): string {
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
