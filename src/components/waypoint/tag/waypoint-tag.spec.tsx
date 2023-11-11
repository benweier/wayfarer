import { render } from '@testing-library/react'
import { WaypointTag } from './waypoint-tag.component'

describe('waypoint-tag', () => {
  it('should render', () => {
    const { container } = render(<WaypointTag type="PLANET">Tag Content</WaypointTag>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="inline-block rounded-sm px-2 py-0.5 text-xs font-bold uppercase bg-emerald-600 text-emerald-50"
        >
          Tag Content
        </div>
      </div>
    `)
  })
})
