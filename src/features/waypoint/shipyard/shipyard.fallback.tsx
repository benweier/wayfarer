import { Layout } from './shipyard.layout'

export const Fallback = () => {
  return (
    <Layout>
      <div className="flex animate-pulse flex-col gap-2">
        <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
        <div className="h-20 rounded bg-zinc-500 bg-opacity-5 dark:bg-opacity-10"></div>
      </div>
    </Layout>
  )
}
