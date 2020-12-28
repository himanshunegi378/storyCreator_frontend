import { useCallback, useEffect, useState } from 'react'

function useNumberRange(
  min: number,
  max: number,
  current: number | undefined = undefined
): [number, (number: number) => boolean] {
  const [currentValue, setCurrentValue] = useState<number>(current || min)

  useEffect(() => {
    if (min > max) throw new Error('min argument is greater than max argument')
    return () => {}
  }, [min, max])

  useEffect(() => {
    if (currentValue < min) setCurrentValue(min)
    return () => {}
  }, [min])

  useEffect(() => {
    if (currentValue > max) setCurrentValue(max)
    return () => {}
  }, [max])

  const changeValue = useCallback(
    (newValue: number) => {
      if (newValue < min) {
        return false
      } else if (newValue > max) {
        return false
      }

      setCurrentValue(newValue)
      return true
    },
    [min, max]
  )

  return [currentValue, changeValue]
}

export default useNumberRange
