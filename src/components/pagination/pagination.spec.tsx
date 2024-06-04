import { render } from '@/test/utilities/render.helper'
import { createTestRouter, renderWithTestRouter } from '@/test/utilities/router'
import { RouterProvider } from '@tanstack/react-router'
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
    const { getAllByLabelText, getByLabelText } = await act(() =>
      renderWithTestRouter(<Pagination current={1} min={1} max={10} onChange={handleChange} />),
    )

    expect(getAllByLabelText(/go to page/i)).toHaveLength(5)

    const page1 = getByLabelText(/go to page 1/i)
    const page2 = getByLabelText(/go to page 2/i)

    expect(page1).toHaveAttribute('aria-current', 'page')

    await user.click(page2)

    expect(handleChange).toHaveBeenCalledWith(2)
  })

  test('first page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const router = await createTestRouter(<Pagination current={2} min={1} max={10} onChange={handleChange} />)
    const { getByLabelText, rerender } = await act(() => render(<RouterProvider router={router} />))
    const firstPage = getByLabelText(/first page/i)

    await user.click(firstPage)

    expect(handleChange).toHaveBeenCalledWith(1)

    {
      const router = await createTestRouter(<Pagination current={1} min={1} max={10} onChange={handleChange} />)

      act(() => rerender(<RouterProvider router={router} />))

      expect(getByLabelText(/first page/i)).toBeDisabled()
    }
  })

  test('previous page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const router = await createTestRouter(<Pagination current={2} min={1} max={10} onChange={handleChange} />)
    const { getByLabelText, rerender } = await act(() => render(<RouterProvider router={router} />))
    const previousPage = getByLabelText(/previous page/i)
    expect(previousPage).toBeEnabled()

    await user.click(previousPage)

    expect(handleChange).toHaveBeenCalledWith(1)

    {
      const router = await createTestRouter(<Pagination current={1} min={1} max={10} onChange={handleChange} />)

      act(() => rerender(<RouterProvider router={router} />))

      expect(getByLabelText(/previous page/i)).toBeDisabled()
    }
  })

  test('next page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const router = await createTestRouter(<Pagination current={1} min={1} max={10} onChange={handleChange} />)
    const { getByLabelText, rerender } = await act(() => render(<RouterProvider router={router} />))
    const nextPage = getByLabelText(/next page/i)

    expect(nextPage).toBeEnabled()

    await user.click(nextPage)

    expect(handleChange).toHaveBeenCalledWith(2)

    {
      const router = await createTestRouter(<Pagination current={10} min={1} max={10} onChange={handleChange} />)

      act(() => rerender(<RouterProvider router={router} />))

      expect(getByLabelText(/next page/i)).toBeDisabled()
    }
  })

  test('last page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const router = await createTestRouter(<Pagination current={9} min={1} max={10} onChange={handleChange} />)
    const { getByLabelText, rerender } = await act(() => render(<RouterProvider router={router} />))
    const lastPage = getByLabelText(/last page/i)

    expect(lastPage).toBeEnabled()

    await user.click(lastPage)

    expect(handleChange).toHaveBeenCalledWith(10)

    {
      const router = await createTestRouter(<Pagination current={10} min={1} max={10} onChange={handleChange} />)

      act(() => rerender(<RouterProvider router={router} />))

      expect(getByLabelText(/last page/i)).toBeDisabled()
    }
  })
})
