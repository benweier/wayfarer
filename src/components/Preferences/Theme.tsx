import { LightBulbIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline'

export const Theme = () => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-sm font-bold">Theme</div>
      <div className="grid grid-cols-3 gap-2">
        <button
          className="btn btn-primary btn-outline flex w-full flex-col items-center justify-center gap-1"
          onClick={() => {
            const theme = window.localStorage.getItem('theme')

            if (theme) document.documentElement.classList.remove(theme)

            document.documentElement.classList.add('light')

            window.localStorage.setItem('theme', 'light')
          }}
        >
          <SunIcon className="h-5 w-5" aria-hidden />
          <span>Light</span>
        </button>
        <button
          className="btn btn-primary btn-outline flex w-full flex-col items-center justify-center gap-1"
          onClick={() => {
            const theme = window.localStorage.getItem('theme')

            if (theme) document.documentElement.classList.remove(theme)

            document.documentElement.classList.add('dark')

            window.localStorage.setItem('theme', 'dark')
          }}
        >
          <MoonIcon className="h-5 w-5" aria-hidden />
          <span>Dark</span>
        </button>
        <button
          className="btn btn-primary btn-outline flex w-full flex-col items-center justify-center gap-1"
          onClick={() => {
            const theme = window.localStorage.getItem('theme')

            if (theme) document.documentElement.classList.remove(theme)

            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.classList.add('dark')
            }

            window.localStorage.removeItem('theme')
          }}
        >
          <LightBulbIcon className="h-5 w-5" aria-hidden />
          <span>Auto</span>
        </button>
      </div>
    </div>
  )
}
