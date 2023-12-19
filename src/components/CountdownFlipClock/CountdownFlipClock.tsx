import React from 'react'
import { getDiffInDHMS } from '../../utils/date'

const AnimatedCard = ({
  animation,
  digit
}: {
  animation: string
  digit: number | string
}) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  )
}

const StaticCard = ({
  position,
  digit
}: {
  position: string
  digit: number | string
}) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  )
}

const FlipUnitContainer = ({
  digit,
  shuffle,
  unit
}: {
  digit: number
  shuffle: boolean
  unit: string
}) => {
  // assign digit values
  let currentDigit: number | string = digit
  let previousDigit: number | string = digit + 1

  // to prevent a negative value
  if (unit !== 'hours') {
    previousDigit = previousDigit === -1 ? 59 : previousDigit
  } else {
    previousDigit = previousDigit === -1 ? 23 : previousDigit
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`
  }

  // shuffle digits
  const digit1 = shuffle ? previousDigit : currentDigit
  const digit2 = !shuffle ? previousDigit : currentDigit

  // shuffle animations
  const animation1 = shuffle ? 'fold' : 'unfold'
  const animation2 = !shuffle ? 'fold' : 'unfold'

  return (
    <div className={'flipUnitContainer'}>
      <StaticCard position={'upperCard'} digit={currentDigit} />
      <StaticCard position={'lowerCard'} digit={previousDigit} />
      <AnimatedCard digit={digit1} animation={animation1} />
      <AnimatedCard digit={digit2} animation={animation2} />
    </div>
  )
}

type FlipClockProps = {
  targetDate: Date
  startDate?: Date
}

type State = {
  hours: number
  hoursShuffle: boolean
  days: number
  daysShuffle: boolean
  minutes: number
  minutesShuffle: boolean
  seconds: number
  secondsShuffle: boolean

  haveStylesLoaded: boolean
}

export class CountdownFlipClock extends React.Component<FlipClockProps, State> {
  constructor(props: FlipClockProps) {
    super(props)
    this.state = {
      hours: 0,
      hoursShuffle: true,
      days: 0,
      daysShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true,
      haveStylesLoaded: false
    }
  }
  public timerID: NodeJS.Timer

  componentDidMount() {
    this.timerID = setInterval(() => this.updateTime(), 50)
    const styles = document.createElement('style')
    styles.appendChild(document.createTextNode(CSS))
    document.head.appendChild(styles)
    setTimeout(() => {
      this.setState({ haveStylesLoaded: true })
    }, 500)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  updateTime() {
    const startDate = this.props.startDate || new Date()

    const diff = getDiffInDHMS(startDate, this.props.targetDate)
    const { days, hours, minutes, seconds } = diff

    if (days !== this.state.days) {
      const daysShuffle = !this.state.daysShuffle
      this.setState({
        days,
        daysShuffle
      })
    }
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle
      this.setState({
        hours,
        hoursShuffle
      })
    }
    // on hour chanage, update hours and shuffle state
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle
      this.setState({
        hours,
        hoursShuffle
      })
    }
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle
      this.setState({
        minutes,
        minutesShuffle
      })
    }
    // on second chanage, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle
      this.setState({
        seconds,
        secondsShuffle
      })
    }
  }

  render() {
    const {
      hours,
      minutes,
      seconds,
      days,
      daysShuffle,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle
    } = this.state

    if (!this.state.haveStylesLoaded) return null

    return (
      <div className={'flipClock'}>
        <FlipUnitContainer unit={'days'} digit={days} shuffle={daysShuffle} />
        <FlipUnitContainer
          unit={'hours'}
          digit={hours}
          shuffle={hoursShuffle}
        />
        <FlipUnitContainer
          unit={'minutes'}
          digit={minutes}
          shuffle={minutesShuffle}
        />
        <FlipUnitContainer
          unit={'seconds'}
          digit={seconds}
          shuffle={secondsShuffle}
        />
      </div>
    )
  }
}

const fontSize = '2em'
const cardFontScaleFactor = 1.5

const CSS = `
@import url("https://fonts.googleapis.com/css?family=Droid+Sans+Mono");
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #FBAB7E;
  background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);
}

.flipClock {
  display: flex;
  justify-content: space-between;
}

.flipUnitContainer {
  display: block;
  position: relative;
  width: calc(${fontSize} * ${cardFontScaleFactor});
  height: calc(${fontSize} * ${cardFontScaleFactor});
  perspective-origin: 50% 50%;
  perspective: 300px;
  background-color: orange;
  border-radius: 3px;
  box-shadow: 0px 10px 10px -10px grey;
}

.upperCard, .lowerCard {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 50%;
  overflow: hidden;
  border: 1px solid whitesmoke;
}

.upperCard span, .lowerCard span {
  font-size: ${fontSize};
  font-family: "Droid Sans Mono", monospace;
  font-weight: lighter;
  color: green;
}

.upperCard {
  align-items: flex-end;
  border-bottom: 0.5px solid whitesmoke;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.upperCard span {
  transform: translateY(50%);
}

.lowerCard {
  align-items: flex-start;
  border-top: 0.5px solid whitesmoke;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
.lowerCard span {
  transform: translateY(-50%);
}

.flipCard {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50%;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
.flipCard span {
  font-family: "Droid Sans Mono", monospace;
  font-size: ${fontSize};
  font-weight: lighter;
  color: green;
}
.flipCard.unfold {
  top: 50%;
  align-items: flex-start;
  transform-origin: 50% 0%;
  transform: rotateX(180deg);
  background-color: orange;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  border: 0.5px solid whitesmoke;
  border-top: 0.5px solid whitesmoke;
}
.flipCard.unfold span {
  transform: translateY(-50%);
}
.flipCard.fold {
  top: 0%;
  align-items: flex-end;
  transform-origin: 50% 100%;
  transform: rotateX(0deg);
  background-color: orange;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 0.5px solid whitesmoke;
  border-bottom: 0.5px solid whitesmoke;
}
.flipCard.fold span {
  transform: translateY(50%);
}

.fold {
  -webkit-animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
          animation: fold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
  transform-style: preserve-3d;
}

.unfold {
  -webkit-animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
          animation: unfold 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0s 1 normal forwards;
  transform-style: preserve-3d;
}

@-webkit-keyframes fold {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-180deg);
  }
}

@keyframes fold {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-180deg);
  }
}
@-webkit-keyframes unfold {
  0% {
    transform: rotateX(180deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
@keyframes unfold {
  0% {
    transform: rotateX(180deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
`
