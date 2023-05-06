import { Layout } from './market.layout'

export const Fallback = () => {
  return (
    <Layout
      imports={
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        </div>
      }
      exports={
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        </div>
      }
      exchange={
        <div className="flex animate-pulse flex-col gap-2">
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
          <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        </div>
      }
    />
  )
}
