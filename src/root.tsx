import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { PropsWithChildren } from 'react'
import type { LinksFunction } from 'react-router'

import './styles/main.css'

export const links: LinksFunction = () => [
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  },
]

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-dvh bg-bg-primary text-text-primary">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function HydrateFallback() {
  return (
    <div className="text-h1 text-foreground-quinary flex w-full flex-1 animate-pulse place-content-center items-center justify-center font-black">
      <div>Wayfarer</div>
    </div>
  )
}
