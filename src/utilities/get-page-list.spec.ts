import { getPageList } from './get-page-list.helper'

describe('get page list', () => {
  test('it returns a list of page numbers', () => {
    const pages = getPageList(5)

    expect(pages).toEqual([1, 2, 3, 4, 5])
  })

  test('it returns a list of page numbers to the lowest whole number', () => {
    const pages = getPageList(3.5)

    expect(pages).toEqual([1, 2, 3])
  })

  test('it skips the first X number of pages', () => {
    const pages = getPageList(5, 2)

    expect(pages).toEqual([3, 4, 5])
  })

  test('it returns no pages if the length is negative', () => {
    const pages = getPageList(-5)

    expect(pages).toEqual([])
  })

  test('it returns no pages if the length is invalid', () => {
    const pages = getPageList(Number.NaN)

    expect(pages).toEqual([])
  })
})
