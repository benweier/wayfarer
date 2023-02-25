# [Wayfarer](https://wayfarer.benweier.dev/)

Wayfarer is a browser-based interface for **v2** of the [Spacetraders API](https://spacetraders.stoplight.io/docs/spacetraders). Just as the API itself is a work-in-progress under active development, Wayfarer is a work-in-progress intended for demonstration purposes of a number of key patterns and technologies.

## Tech

Wayfarer depends on just a handful of open-source projects and is, at its core, a simple client-side rendered [React](https://reactjs.org/) application built with [Vite](https://vitejs.dev/). It uses [React Router](https://reactrouter.com/) for routing, [React Query](https://tanstack.com/query) for data fetching, [TailwindCSS](https://tailwindcss.com/) for styling, [Zustand](https://docs.pmnd.rs/zustand) and [Jotai](https://jotai.org/) for state management, and [React Hook Form](https://react-hook-form.com/) for form handling. It is tested with [Vitest](https://vitest.dev/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Primary Goal

Building on top of these libraries, is an obsessively extreme use of Suspense and Concurrent features of React. It takes inspiration and examples from Alan Alickovic's [Bulletproof React](https://github.com/alan2207/bulletproof-react), Dominic Dorfmeister's [Practical React Query](https://tkdodo.eu/blog/practical-react-query), and Tyler McGinnis' [Complete Guide to React Router](https://ui.dev/react-router-tutorial).

### A non-meta ~~framework~~

Wayfarer is not a framework, a library, or boilerplate. Instead, it embraces and leans into the core tenet of React:

> A JavaScript library for building User Interfaces

Next, Gatsby, Remix, et al. have (re)popularised server-side rendering and static generation of late; built and marketed as "batteries included" meta frameworks (or at the very least "batteries npm-installable") for solving the specific challenges of SSR/SSG. This is not an indictment of these tools, but rather the opposite side of the same coin where client-side rendering remains a perfectly suitable approach for many projects.

Wayfarer is not built around documentation or code snippets or app tutorials that can be worked through in a weekend. Rather, it outlines concrete real-world patterns and best practices I have come to rely on that can be applied to projects of any size - whether they are Next, Remix, Create React App, or something custom.

Because of this, Wayfarer is largely a distillation of my own experiences and opinions on how to build a performant, responsive, and accessible React application. Leveraging some of the best tools of the ecosystem from the ground up, the patterns expressed within should be considered a "production-ready" reference regardless of Wayfarers' actual state of "feature-completeness" with the Spacetraders API. Hopefully, it is a useful resource for others who are interested in learning about these features and how to utilise them in their own projects.