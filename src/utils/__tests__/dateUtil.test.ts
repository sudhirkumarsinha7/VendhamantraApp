import { getMinDate, getMaxDate } from '../dateUtil'

describe('getMinDate', () => {
  it('returns current date if no params provided', () => {
    const now = new Date()
    const result = getMinDate({})
    expect(result.getFullYear()).toBe(now.getFullYear())
    expect(result.getMonth()).toBe(now.getMonth())
    expect(result.getDate()).toBe(now.getDate())
  })

  it('subtracts days correctly', () => {
    const result = getMinDate({ day: 5 })
    const expected = new Date()
    expected.setDate(expected.getDate() - 5)
    expect(result.toDateString()).toBe(expected.toDateString())
  })

  it('subtracts months correctly', () => {
    const result = getMinDate({ month: 2 })
    const expected = new Date()
    expected.setMonth(expected.getMonth() - 2)
    expect(result.toDateString()).toBe(expected.toDateString())
  })

  it('subtracts years correctly', () => {
    const result = getMinDate({ year: 1 })
    const expected = new Date()
    expected.setFullYear(expected.getFullYear() - 1)
    expect(result.toDateString()).toBe(expected.toDateString())
  })

  it('subtracts day, month and year together', () => {
    const result = getMinDate({ day: 1, month: 1, year: 1 })
    const expected = new Date()
    expected.setDate(expected.getDate() - 1)
    expected.setMonth(expected.getMonth() - 1)
    expected.setFullYear(expected.getFullYear() - 1)
    expect(result.toDateString()).toBe(expected.toDateString())
  })
})

describe('getMaxDate', () => {
  it('returns current date if no params provided', () => {
    const now = new Date()
    const result = getMaxDate({})
    expect(result.getFullYear()).toBe(now.getFullYear())
    expect(result.getMonth()).toBe(now.getMonth())
    expect(result.getDate()).toBe(now.getDate())
  })

  it('adds days correctly', () => {
    const result = getMaxDate({ day: 5 })
    const expected = new Date()
    expected.setDate(expected.getDate() + 5)
    expect(result.toDateString()).toBe(expected.toDateString())
  })

  it('adds months correctly', () => {
    const result = getMaxDate({ month: 2 })
    const expected = new Date()
    expected.setMonth(expected.getMonth() + 2)
    expect(result.toDateString()).toBe(expected.toDateString())
  })

  it('adds years correctly', () => {
    const result = getMaxDate({ year: 1 })
    const expected = new Date()
    expected.setFullYear(expected.getFullYear() + 1)
    expect(result.toDateString()).toBe(expected.toDateString())
  })

  it('adds day, month and year together', () => {
    const result = getMaxDate({ day: 1, month: 1, year: 1 })
    const expected = new Date()
    expected.setDate(expected.getDate() + 1)
    expected.setMonth(expected.getMonth() + 1)
    expected.setFullYear(expected.getFullYear() + 1)
    expect(result.toDateString()).toBe(expected.toDateString())
  })
})
