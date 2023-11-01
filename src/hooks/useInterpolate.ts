import transcend from 'lodash/get'
import { useCallback } from 'react'

type NestedKeyOf<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: NestedKeyOf<T[K]>
    }
  : keyof T

const specificCasesKeys = {
  endTime: 'endTime'
}

const FT = {
  id: 'sample_id',
  invocation: 'INVOCATION_EXIT_INTENT',
  behaviour: 'BEHAVIOUR_MODAL',
  data: {
    backgroundURL: 'https://cdn.fingerprint.host/browns-three-plates-800.jpg',
    buttonText: 'Click me',
    buttonURL: 'http://www.google.com',
    heading: 'This is an EXIT_INTENT {{.countdown.endTime}}',
    paragraph: 'And so is this',
    countdown: { endTime: '2023-11-28T00:00:00' }
  }
}

/**
 * Limitation: only one timer per hook call. if you need multiple timers(whatever the hell the reason could be), do:
 * const getInterpolateFirst = useGetInterpolate();
 * const getInterpolateSecond = useGetInterpolate();
 *
 */
export const useGetInterpolate = () => {
  // const { countdown, setTimeStamp } = useCountdown({});
  const { countdown, setTimeStamp } = {
    countdown: 'bla'
    // setTimeStamp: () => "blabla",
  }

  const interpolate = (text: NestedKeyOf<T>, structure: T) => {
    const replacedText = text.replace(/\{\{\.(\w+)\}\}/g, (match, key) => {
      console.log({ match, key })
      // {{.variable}}

      const value = transcend(structure, key)
      // this is shit. Improve this we must:
      // if (key.endsWith(specificCasesKeys.endTime)) {
      //   const stamp = new Date(value as string);

      //   setTimeStamp(stamp);
      //   return countdown;
      // }

      return value !== undefined ? value : match
    })

    return replacedText
  }

  const getInterpolate = useCallback(
    <T extends Record<string, unknown>>(structure: T) => {
      return (key: NestedKeyOf<T>) => interpolate(key, structure)
    },
    [interpolate]
  )

  // const f = getInterpolate({ bla: 2 });
  // f(".bla");

  return getInterpolate
}

// function interpolateText(text: string, values: Record<string, string>): string {

// }

// const text = "Hello, {{.name}}! Today is {{.date}} and the time is {{.time}}.";
// const values = {
//   name: "John",
//   date: "2023-11-01",
//   time: "15:30",
// };

// const interpolatedText = interpolateText(text, values);
// console.log(interpolatedText);
