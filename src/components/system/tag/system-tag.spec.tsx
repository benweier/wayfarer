import { render } from '@testing-library/react'
import { SystemTag } from './system-tag.component'

describe('waypoint-tag', () => {
  it('should render', () => {
    const { container } = render(<SystemTag type="BLACK_HOLE">Tag Content</SystemTag>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="rounded-sm px-2 py-0.5 text-xs font-bold uppercase bg-gray-950 text-gray-50"
        >
          Tag Content
        </div>
      </div>
    `)
  })
})
