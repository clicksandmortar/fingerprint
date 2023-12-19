import React, { memo } from 'react'
import { Trigger } from '../../../../client/types'
import CountdownFlipClock from '../../../../components/CountdownFlipClock/CountdownFlipClock'
import { buildTextWithPotentiallyCountdown, prependClass } from '../../helpers'

type Props = { trigger: Trigger }

// NOTE: the styles here rely on the styles useEffect in StandardModal.tsx
const Header = ({ trigger }: Props) => {
  const countdownEndTime = trigger?.data?.countdownEndTime

  const StdHeader = ({ text }: { text: string | undefined }) => (
    <h1 className={prependClass('main-text')}>{text || ''}</h1>
  )

  const texts = buildTextWithPotentiallyCountdown(trigger?.data?.heading || '')
  if (!countdownEndTime) return <StdHeader text={trigger?.data?.heading} />
  if (!('hasCountdown' in texts))
    return <StdHeader text={trigger?.data?.heading} />

  return (
    <div>
      <StdHeader text={texts.text1} />
      <div style={{ maxWidth: 220, margin: '0.4rem auto' }}>
        <CountdownFlipClock targetDate={new Date(countdownEndTime)} />
      </div>
      {texts.text2 && <StdHeader text={texts.text2} />}
    </div>
  )
}

export default memo(Header)
