import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'
import { Pagination } from './pagination.component'
import { getPagingRange } from './pagination.utils'

describe('pagination.utils', () => {
  test('getPagingRange', () => {
    const result1 = getPagingRange({ current: 1, total: 10, length: 5 })
    const result2 = getPagingRange({ current: 2, total: 10, length: 3 })
    const result3 = getPagingRange({ current: 4, total: 3, length: 1 })
    const result4 = getPagingRange({ current: 10, total: 20, length: 4 })

    expect(result1).toEqual([1, 2, 3, 4, 5])
    expect(result2).toEqual([1, 2, 3])
    expect(result3).toEqual([3])
    expect(result4).toEqual([8, 9, 10, 11])
  })
})

describe('pagination.component', () => {
  test('it renders', () => {
    const { container } = render(<Pagination current={1} total={10} onChange={vi.fn()} />)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex gap-2"
        >
          <button
            aria-label="First page"
            class="btn flex w-16 items-center justify-center p-1 font-bold"
            disabled=""
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z"
                fill-rule="evenodd"
              />
            </svg>
            <span
              class="sr-only"
            >
              Page 1
            </span>
          </button>
          <button
            aria-label="Previous page"
            class="btn flex w-16 items-center justify-center p-1 font-bold"
            disabled=""
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                fill-rule="evenodd"
              />
            </svg>
            <span
              class="sr-only"
            >
              Page 
              0
            </span>
          </button>
          <button
            aria-current="page"
            aria-label="Go to page 1"
            class="btn btn-primary w-16 p-1 font-bold"
          >
            1
          </button>
          <button
            aria-label="Go to page 2"
            class="btn btn-primary w-16 p-1 font-bold btn-outline"
          >
            2
          </button>
          <button
            aria-label="Go to page 3"
            class="btn btn-primary w-16 p-1 font-bold btn-outline"
          >
            3
          </button>
          <button
            aria-label="Go to page 4"
            class="btn btn-primary w-16 p-1 font-bold btn-outline"
          >
            4
          </button>
          <button
            aria-label="Go to page 5"
            class="btn btn-primary w-16 p-1 font-bold btn-outline"
          >
            5
          </button>
          <button
            aria-label="Next page"
            class="btn flex w-16 items-center justify-center p-1 font-bold"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                fill-rule="evenodd"
              />
            </svg>
            <span
              class="sr-only"
            >
              Page 
              2
            </span>
          </button>
          <button
            aria-label="Last page"
            class="btn flex w-16 items-center justify-center p-1 font-bold"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                fill-rule="evenodd"
              />
              <path
                clip-rule="evenodd"
                d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                fill-rule="evenodd"
              />
            </svg>
            <span
              class="sr-only"
            >
              Page 
              10
            </span>
          </button>
        </div>
      </div>
    `)
  })

  test('numbered page buttons', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getAllByLabelText, getByLabelText, rerender } = render(
      <Pagination current={1} total={10} onChange={handleChange} />,
    )

    expect(getAllByLabelText(/go to page/i)).toHaveLength(5)

    rerender(<Pagination length={3} current={1} total={10} onChange={handleChange} />)

    expect(getAllByLabelText(/go to page/i)).toHaveLength(3)

    const page1 = getByLabelText(/go to page 1/i)
    const page2 = getByLabelText(/go to page 2/i)

    expect(page1).toHaveAttribute('aria-current', 'page')

    await user.click(page2)

    expect(handleChange).toHaveBeenCalledWith(2)
  })

  test('first page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={1} total={10} onChange={handleChange} />)

    const firstPage = getByLabelText(/first page/i)

    expect(firstPage).toBeDisabled()

    rerender(<Pagination current={3} total={10} onChange={handleChange} />)

    expect(firstPage).toBeEnabled()

    await user.click(firstPage)

    expect(handleChange).toHaveBeenCalledWith(1)
  })

  test('previous page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={1} total={10} onChange={handleChange} />)

    const previousPage = getByLabelText(/previous page/i)

    expect(previousPage).toBeDisabled()

    rerender(<Pagination current={3} total={10} onChange={handleChange} />)

    expect(previousPage).toBeEnabled()

    await user.click(previousPage)

    expect(handleChange).toHaveBeenCalledWith(2)
  })

  test('next page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={1} total={10} onChange={handleChange} />)

    const nextPage = getByLabelText(/next page/i)

    expect(nextPage).toBeEnabled()

    await user.click(nextPage)

    expect(handleChange).toHaveBeenCalledWith(2)

    rerender(<Pagination current={3} total={3} onChange={handleChange} />)

    expect(nextPage).toBeDisabled()
  })

  test('last page button', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const { getByLabelText, rerender } = render(<Pagination current={1} total={10} onChange={handleChange} />)

    const lastPage = getByLabelText(/last page/i)

    expect(lastPage).toBeEnabled()

    await user.click(lastPage)

    expect(handleChange).toHaveBeenCalledWith(10)

    rerender(<Pagination current={3} total={3} onChange={handleChange} />)

    expect(lastPage).toBeDisabled()
  })
})
