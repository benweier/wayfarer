import { STATUS_MESSAGES } from '@/services/http'
import { render } from '@testing-library/react'
import { RouteError } from './route-error.component'

describe('RouteError', () => {
  it('renders error message for known status codes', () => {
    const { getByText } = render(
      <RouteError error={new Response(null, { status: 404, statusText: STATUS_MESSAGES.NOT_FOUND })} />,
    )

    expect(getByText(STATUS_MESSAGES.NOT_FOUND)).toBeInTheDocument()
  })

  it('renders a generic message when error is not a http response', () => {
    const { getByText } = render(<RouteError error={new Error('Not a response error')} />)

    expect(getByText(/an error occurred while displaying this content/i)).toBeInTheDocument()
  })
})
