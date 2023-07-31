export type ClassValue = ClassArray | ClassDictionary | boolean | number | string | null | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

function toVal(mix: ClassValue) {
  let y
  let str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
    return str
  }

  if (typeof mix !== 'object') {
    return str
  }

  if (Array.isArray(mix)) {
    for (const k of mix) {
      y = toVal(mix[k])
      if (y) {
        str && (str += ' ')
        str += y
      }
    }

    return str
  }

  for (const k in mix) {
    if (mix[k]) {
      str && (str += ' ')
      str += k
    }
  }

  return str
}

export const cx = (...args: ClassValue[]) => {
  let x
  let str = ''

  for (const i of args) {
    x = toVal(i)
    if (x) {
      str && (str += ' ')
      str += x
    }
  }

  return str
}
