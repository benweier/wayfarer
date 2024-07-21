import * as v from 'valibot'

type Unsubscribe = () => void
type Subscribe<Value> = (key: string, callback: (value: Value) => void, initialValue: Value) => Unsubscribe

export interface SyncStorage<Value> {
  getItem: (key: string, initialValue: Value) => Value
  setItem: (key: string, newValue: Value) => void
  removeItem: (key: string) => void
  subscribe?: Subscribe<Value>
}

function parse(value?: string | null) {
  if (!value) return null

  try {
    return JSON.parse(value)
  } catch (_err) {
    return null
  }
}

function stringify(value: any) {
  return JSON.stringify(value)
}

export function createSyncStorage<T extends v.BaseSchema<any, any, any> = v.BaseSchema<any, any, any>>(
  schema: T,
  parser = parse,
  stringifier = stringify,
): SyncStorage<v.InferOutput<T>> {
  return {
    getItem(key, initialValue) {
      return v.parse(v.fallback(schema, initialValue), parser(localStorage.getItem(key)))
    },
    setItem(key, value) {
      localStorage.setItem(key, stringifier(value))
    },
    removeItem(key) {
      localStorage.removeItem(key)
    },
    subscribe(key, callback, initialValue) {
      const storageHandler = (e: StorageEvent) => {
        if (e.storageArea === localStorage && e.key === key) {
          callback(v.parse(v.fallback(schema, initialValue), e.newValue))
        }
      }

      window.addEventListener('storage', storageHandler)

      return () => {
        window.removeEventListener('storage', storageHandler)
      }
    },
  }
}
