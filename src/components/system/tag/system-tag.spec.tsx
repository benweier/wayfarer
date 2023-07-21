import { render } from '@testing-library/react'
import { SystemTag } from './system-tag.component'

describe('waypoint-tag', () => {
  it('should render', () => {
    const { container } = render(<SystemTag type="BLACK_HOLE">Tag Content</SystemTag>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="bg- rounded-sm px-2 py-1 text-xs font-bold uppercase leading-none tracking-wide bg-gray-950 text-gray-50"
        >
          Tag Content
        </div>
      </div>
    `)
  })
})
