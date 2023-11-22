export type MetaObject =
  | {
      title: string
    }
  | { name: string; content: string }

export type MetaProps = {
  titleTemplate: string
}
