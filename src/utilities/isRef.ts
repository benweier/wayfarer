export const isRef = (ref: any) => {
  if (typeof ref === 'function') return true

  return ref !== null && typeof ref === 'object' && Object.hasOwn(ref, 'current')
}
