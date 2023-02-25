# [Wayfarer](https://wayfarer.benweier.dev/)

Wayfarer is a browser-based interface for **v2** of the [Spacetraders API](https://spacetraders.stoplight.io/docs/spacetraders). Just as the API itself is a work-in-progress under active development, Wayfarer is a work-in-progress intended for demonstration purposes of a number of key patterns and technologies.

## Tech

Wayfarer uses a number of open-source projects and is, at its core, a simple client-side rendered [React](https://reactjs.org/) application built with [Vite](https://vitejs.dev/). It uses [React Router](https://reactrouter.com/) for routing, [React Query](https://tanstack.com/query) for data fetching, [TailwindCSS](https://tailwindcss.com/) for styling, [Zustand](https://docs.pmnd.rs/zustand) and [Jotai](https://jotai.org/) for state management, and [React Hook Form](https://react-hook-form.com/) for form handling. It is tested with [Vitest](https://vitest.dev/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Primary Goal

Building on top of these libraries, is an obsessively extreme use of Suspense and Concurrent features of React. It takes inspiration and examples from Alan Alickovic's [Bulletproof React](https://github.com/alan2207/bulletproof-react), Dominic Dorfmeister's [Practical React Query](https://tkdodo.eu/blog/practical-react-query), and Tyler McGinnis' [Complete Guide to React Router](https://ui.dev/react-router-tutorial).

Wayfarer is largely a distillation of my own experiences and opinions on how to build a performant, responsive, and accessible React application. Leveraging some of the best tools of the ecosystem from the ground up, the patterns expressed within should be considered a "production-ready" reference regardless of the applications actual state of "completeness". Hopefully, it is a useful resource for others who are interested in learning about these features and how to utilise them in their own projects.
