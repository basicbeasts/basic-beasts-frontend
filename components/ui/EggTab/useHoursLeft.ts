import { useState, useEffect } from "react"

interface HoursLeftResult {
  hoursLeft: number
  hasPassed: boolean
}

export function useHoursLeft(targetTimestamp: number): HoursLeftResult {
  const [hoursLeft, setHoursLeft] = useState<number>(0)
  const [hasPassed, setHasPassed] = useState<boolean>(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTimestamp = Math.floor(Date.now() / 1000) // convert to seconds
      const diffInSeconds = targetTimestamp - currentTimestamp

      if (diffInSeconds <= 0) {
        clearInterval(intervalId)
        setHoursLeft(0)
        setHasPassed(true)
        return
      }

      const diffInHours = Math.floor(diffInSeconds / 3600) // convert to hours
      setHoursLeft(diffInHours)
    }, 1000) // update every second

    // clear interval on component unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [targetTimestamp])

  return { hoursLeft, hasPassed }
}
