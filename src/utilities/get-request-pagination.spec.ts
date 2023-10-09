import { getRequestPagination } from './get-request-pagination.helper'

describe('getRequestPagination', () => {
  test('should return default values when no params are passed', () => {
    const params = new URLSearchParams()

    expect(getRequestPagination(params)).toEqual({
      page: 1,
      limit: 20,
    })
  })

  test('should return number values when valid params are passed', () => {
    const params = new URLSearchParams({
      page: '2',
      limit: '10',
    })

    expect(getRequestPagination(params)).toEqual({
      page: 2,
      limit: 10,
    })
  })

  test('should return default values when non-number string params are passed', () => {
    const params = new URLSearchParams({
      page: 'foo',
      limit: 'bar',
    })

    expect(getRequestPagination(params)).toEqual({
      page: 1,
      limit: 20,
    })
  })

  test('should return integers when decimal params are passed', () => {
    const params = new URLSearchParams({
      page: '3.5',
      limit: '10.1',
    })

    expect(getRequestPagination(params)).toEqual({
      page: 3,
      limit: 10,
    })
  })

  test('should return minimum values when out-of-bounds params are passed', () => {
    const params = new URLSearchParams({
      page: -1,
      limit: 0,
    })

    expect(getRequestPagination(params)).toEqual({
      page: 1,
      limit: 1,
    })
  })

  test('should return maximum values when out-of-bounds params are passed', () => {
    const params = new URLSearchParams({
      page: -1,
      limit: 100,
    })

    expect(getRequestPagination(params)).toEqual({
      page: 1,
      limit: 20,
    })
  })

  test('should return default values when out-of-bounds params are passed', () => {
    const params = new URLSearchParams({
      page: '0',
      limit: '21',
    })

    expect(getRequestPagination(params)).toEqual({
      page: 1,
      limit: 20,
    })
  })
})
