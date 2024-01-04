import React, { memo } from 'react';
import { Trigger } from '../../../../client/types';
import CountdownFlipClock from '../../../../components/CountdownFlipClock/CountdownFlipClock';
import { getInterpolate } from '../../../../utils/getInterpolate';
import { buildTextWithPotentiallyCountdown, prependClass } from '../../helpers';

type Props = { trigger: Trigger }

// NOTE: the styles here rely on the styles useEffect in StandardModal.tsx
function Paragraph({ trigger }: Props) {
  const countdownEndTime = trigger?.data?.countdownEndTime;
  const interpolate = getInterpolate(trigger.data || {}, true);

  function StdParagraph({ text }: { text: string | undefined }) {
    return <p className={prependClass('sub-text')}>{interpolate(text || '')}</p>;
  }

  const texts = buildTextWithPotentiallyCountdown(
    trigger?.data?.paragraph || '',
  );
  if (!countdownEndTime) return <StdParagraph text={trigger?.data?.paragraph} />;
  if (!('hasCountdown' in texts)) return <StdParagraph text={trigger?.data?.paragraph} />;

  return (
    <div>
      <StdParagraph text={texts.text1} />
      <div style={{ maxWidth: 220, margin: 'auto' }}>
        <CountdownFlipClock targetDate={new Date(countdownEndTime)} />
      </div>

      {texts.text2 && <StdParagraph text={texts.text2} />}
    </div>
  );
}

export default memo(Paragraph);
