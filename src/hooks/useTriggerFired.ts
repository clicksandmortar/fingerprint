import { useEffect, useState } from 'react'
import { Trigger } from '../client/types'
import { useSeenMutation } from './useSeenMutation'

type Props = {
  trigger: Trigger
}

const useActivationSeen = ({ trigger }: Props) => {
  const [open, setOpen] = useState(true)
  const [hasFired, setHasFired] = useState(false)

  const { mutate: runSeen, isSuccess, isLoading } = useSeenMutation()

  useEffect(() => {
    if (!open) return
    if (hasFired) return
    if (isSuccess) return
    if (isLoading) return

    // seen gets called multiple times since Collector currently
    // like to over-rerender componets. This timeout prevents from firing a ton
    // even with this, Banner can still re-issue the same request since all components
    // get re-rendered and unlike Modal, Banner gets to stay.
    //  @Ed to deal with at a later point
    const tId = setTimeout(() => {
      runSeen(trigger)
    }, 500)

    setHasFired(true)
    return () => {
      clearTimeout(tId)
    }
  }, [open, isSuccess, isLoading])
  return { open, setOpen }
}

export default useActivationSeen
