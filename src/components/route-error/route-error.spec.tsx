import { render } from '@testing-library/react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { afterEach } from 'vitest'
import { STATUS_CODES, STATUS_MESSAGES } from '@/services/http'
import { RouteError } from './route-error.component'

vi.mock('react-router-dom', () => ({
  useRouteError: vi.fn(),
  isRouteErrorResponse: vi.fn(),
}))

describe('RouteError', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('renders error message for known status codes', () => {
    vi.mocked(useRouteError).mockReturnValue({ status: STATUS_CODES.NOT_FOUND })
    vi.mocked(isRouteErrorResponse).mockReturnValue(true)

    const { getByText } = render(<RouteError />)

    expect(getByText(STATUS_MESSAGES.NOT_FOUND)).toBeInTheDocument()
  })

  it('does not render when error is not a response error', () => {
    vi.mocked(useRouteError).mockReturnValue({ message: 'Not an error response' })

    const { container } = render(<RouteError />)

    expect(container).toBeEmptyDOMElement()
  })

  it('does not render when no error is provided', () => {
    vi.mocked(useRouteError).mockReturnValue(null)

    const { container } = render(<RouteError />)

    expect(container).toBeEmptyDOMElement()
  })
})
