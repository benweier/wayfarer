export type BoundStoreSelector<U> = {
  (): U
  <T>(selector: (state: U) => T, equals?: (a: T, b: T) => boolean): T
}
