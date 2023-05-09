import { Layout } from './market.layout'

export const Fallback = () => {
  return (
    <Layout
      imports={<div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>}
      exports={<div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>}
      exchange={<div className="h-20 animate-pulse rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>}
    />
  )
}
