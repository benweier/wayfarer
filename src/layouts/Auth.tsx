export const AuthLayout = ({ children }: WithChildren) => {
  return (
    <div className="bg-zinc-200/40 dark:bg-zinc-700/20">
      <div className="mx-auto grid w-full max-w-lg items-center">{children}</div>
    </div>
  )
}
