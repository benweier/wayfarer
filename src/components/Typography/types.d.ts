export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

export type TypographyVariant = 'hero' | 'title' | 'subtitle' | 'headline' | 'body' | 'caption' | 'overline' | 'hint'

export type TypographyProps = {
  tag?: TypographyTag
  variant?: TypographyVariant
}
