import { render } from '@testing-library/react'
import { NotFound } from './not-found.component'

describe('not-found.component', () => {
  test('it renders', () => {
    const { getByText } = render(<NotFound />)

    expect(getByText('Not Found')).toBeInTheDocument()
  })
})
