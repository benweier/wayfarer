import type { SVGProps } from 'react'

export const Icon = ({ id, href, ...props }: SVGProps<SVGSVGElement>) => {
  if (!id || !href) return null

  return (
    <svg {...props}>
      <use href={`${href}#${id}`} />
    </svg>
  )
}
