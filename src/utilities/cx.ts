export type ClassValue = ClassArray | ClassDictionary | string | number | null | boolean | undefined
export type ClassDictionary = Record<string, any>
export type ClassArray = ClassValue[]

function toVal(mix: ClassValue) {
  let y
  let str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      const len = mix.length
      for (let k = 0; k < len; k++) {
        if (mix[k]) {
          if ((y = toVal(mix[k]))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      for (const k in mix) {
        if (mix && mix[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

export function cx(...args: ClassValue[]) {
  let tmp
  let x
  let str = ''
  const len = args.length

  for (let i = 0; i < len; i++) {
    if ((tmp = args[i])) {
      if ((x = toVal(tmp))) {
        str && (str += ' ')
        str += x
      }
    }
  }

  return str
}
