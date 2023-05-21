export const Badge = ({ children }: WithChildren) => {
  return (
    <span className="text-primary text-inverse my-0.5 rounded-sm bg-zinc-700 px-2.5 text-xs font-bold dark:bg-zinc-300">
      {children}
    </span>
  )
}
