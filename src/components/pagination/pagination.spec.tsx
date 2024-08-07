import { render } from '@/test/utilities/render.helper'
import { act } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Pagination } from './pagination.component'
import { getPagingRange } from './pagination.utils'

describe('pagination.utils', () => {
  test('getPagingRange', () => {
    const result1 = getPagingRange({ current: 1, max: 10, length: 5 })
    const result2 = getPagingRange({ current: 2, max: 10, length: 3 })
    const result3 = getPagingRange({ current: 4, max: 3, length: 1 })
    const result4 = getPagingRange({ current: 10, max: 20, length: 4 })

    expect(result1).toEqual([1, 2, 3, 4, 5])
    expect(result2).toEqual([1, 2, 3])
    expect(result3).toEqual([3])
    expect(result4).toEqual([8, 9, 10, 11])
  })
})

describe('pagination.component', () => {
  test('numbered page buttons', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getAllByLabelText, getByLabelText } = render(
      <Pagination current={1} min={1} max={10} onChange={handleChange} />,
    )

    expect(getAllByLabelText(/go to page/i)).toHaveLength(5)

    const page1 = getByLabelText(/go to page 1/i)
    const page2 = getByLabelText(/go to page 2/i)

    expect(page1).toHaveAttribute('aria-current', 'page')

    await act(() => user.click(page2))

    expect(handleChange).toHaveBeenCalledWith(2)
  })

  test('first page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={2} min={1} max={10} onChange={handleChange} />)
    const firstPage = getByLabelText(/first page/i)

    await act(() => user.click(firstPage))

    expect(handleChange).toHaveBeenCalledWith(1)

    act(() => rerender(<Pagination current={1} min={1} max={10} onChange={handleChange} />))

    expect(getByLabelText(/first page/i)).toBeDisabled()
  })

  test('previous page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={2} min={1} max={10} onChange={handleChange} />)
    const previousPage = getByLabelText(/previous page/i)
    expect(previousPage).toBeEnabled()

    await act(() => user.click(previousPage))

    expect(handleChange).toHaveBeenCalledWith(1)

    act(() => rerender(<Pagination current={1} min={1} max={10} onChange={handleChange} />))

    expect(getByLabelText(/previous page/i)).toBeDisabled()
  })

  test('next page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={1} min={1} max={10} onChange={handleChange} />)
    const nextPage = getByLabelText(/next page/i)

    expect(nextPage).toBeEnabled()

    await act(() => user.click(nextPage))

    expect(handleChange).toHaveBeenCalledWith(2)

    act(() => rerender(<Pagination current={10} min={1} max={10} onChange={handleChange} />))

    expect(getByLabelText(/next page/i)).toBeDisabled()
  })

  test('last page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={9} min={1} max={10} onChange={handleChange} />)
    const lastPage = getByLabelText(/last page/i)

    expect(lastPage).toBeEnabled()

    await act(() => user.click(lastPage))

    expect(handleChange).toHaveBeenCalledWith(10)

    act(() => rerender(<Pagination current={10} min={1} max={10} onChange={handleChange} />))

    expect(getByLabelText(/last page/i)).toBeDisabled()
  })
})
