export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

function toVal(mix: ClassValue) {
  let k,
    y,
    str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      const len = mix.length
      for (k = 0; k < len; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix !== null && mix[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

export function cx(...args: ClassValue[]) {
  let i = 0,
    tmp,
    x,
    str = ''
  const len = args.length
  for (; i < len; i++) {
    if ((tmp = args[i++])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ')
        str += x
      }
    }
  }

  return str
}
