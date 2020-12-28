import useNumberRange from '../../hooks/useNumberRange'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useNumberRangeHook', () => {
  it('initial value to min if current argument not given', () => {
    let min = 0
    let max = 10
    const { result } = renderHook(() => useNumberRange(min, max))
    expect(result.current[0]).toEqual(0)
  })

  it('should be able to change value using provided function', () => {
    let min = 0
    let max = 10
    const { result, rerender } = renderHook(() => useNumberRange(min, max))
    act(() => {
      result.current[1](5)
    })
    expect(result.current[0]).toEqual(5)
  })

  it('throw when min value constraint value is > max value constraint', () => {
    let min = 11
    let max = 10
    const { result,rerender } = renderHook(() => useNumberRange(min, max))
    expect(result.error).toEqual(
      Error('min argument is greater than max argument')
    )
    min = 10
    rerender()
    expect(result.error).toBeUndefined()

  })

  it('when min is updated to greater than current value than assign min value to current value', () => {
    let min = 0
    let max = 10
    const { result, rerender } = renderHook(() => useNumberRange(min, max))
    expect(result.current[0]).toEqual(0)
    min = 1
    rerender()
    expect(result.current[0]).toEqual(1)
  })

  it('when max is updated to less than current value than assign max value to current value', () => {
    let min = 0
    let max = 10
    const { result, rerender } = renderHook(() => useNumberRange(min, max))
    act(() => {
      result.current[1](9)
    })
    expect(result.current[0]).toEqual(9)
    max = 8
    rerender()
    expect(result.current[0]).toEqual(8)
  })

  it('changeValue func should return false if newvalue argment is out of number range', () => {
    let min = 0
    let max = 10
    const { result, rerender } = renderHook(() => useNumberRange(min, max))
    act(() => {
      expect(result.current[1](max + 1)).toBeFalsy()
    })
    expect(result.current[0]).toEqual(0)

    act(() => {
      expect(result.current[1](min - 1)).toBeFalsy()
    })
    expect(result.current[0]).toEqual(0)
  })

  it('changeValue func should return true and change current value if newvalue argment is in number range', () => {
    let min = 0
    let max = 10
    const { result, rerender } = renderHook(() => useNumberRange(min, max))
    act(() => {
      expect(result.current[1](max)).toBeTruthy()
    })
    expect(result.current[0]).toEqual(max)
    act(() => {
      expect(result.current[1](min)).toBeTruthy()
    })
    expect(result.current[0]).toEqual(min)
  })
})
