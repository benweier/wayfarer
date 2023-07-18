import { render } from '@testing-library/react'
import { Badge } from './badge.component'

describe('badge', () => {
  it('should render', () => {
    const { container } = render(<Badge>Content</Badge>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="text-primary text-inverse rounded-sm bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300"
        >
          Content
        </span>
      </div>
    `)
  })
})
