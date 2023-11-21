import { type Params } from 'react-router-dom'

/* https://github.com/remix-run/react-router/discussions/9534#discussioncomment-4136166 */

type RouteWithHandle<Handle extends string, Value> = {
  id: string
  pathname: string
  params: Params
  data: unknown
  handle: Record<Handle, Value>
}

function isRecordWithKey<T extends string>(value: unknown, key: T): value is Record<T, unknown> {
  return !!value && typeof value === 'object' && key in value
}

export function hasRouteHandle<Value, Handle extends string = string>(
  handle: Handle,
  valuePredicate?: (v: unknown) => v is Value,
) {
  return (
    route:
      | {
          handle: unknown
        }
      | RouteWithHandle<Handle, Value>,
  ): route is RouteWithHandle<Handle, Value> => {
    return (
      !!route.handle &&
      isRecordWithKey(route.handle, handle) &&
      (!valuePredicate || (handle in route.handle && valuePredicate(route.handle[handle])))
    )
  }
}
