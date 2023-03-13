# [Wayfarer](https://wayfarer.benweier.dev/)

Wayfarer is a browser-based interface for **v2** of the [SpaceTraders API](https://spacetraders.stoplight.io/docs/spacetraders). Just as the API itself is a work-in-progress under active development, Wayfarer is a work-in-progress intended for demonstration purposes of a number of key patterns and technologies.

## Tech

Wayfarer depends on just a handful of open-source projects and is, at its core, a simple client-side rendered [React](https://reactjs.org/) application built with [Vite](https://vitejs.dev/). It uses [React Router](https://reactrouter.com/) for routing, [React Query](https://tanstack.com/query) for data fetching, [TailwindCSS](https://tailwindcss.com/) for styling, [Zustand](https://docs.pmnd.rs/zustand) and [Jotai](https://jotai.org/) for state management, and [React Hook Form](https://react-hook-form.com/) for form handling. It is tested with [Vitest](https://vitest.dev/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

Of course there are more libraries in use than just those above, as you can see in `package.json`, but are generally used to flesh out UI functionality or improve the development experience than form the core "architecture" (this includes Tailwind plugins, icons, validation, common UI components, etc).

## Primary Goal

Building on top of these libraries, is an obsessively extreme use of Suspense and Concurrent features of React. It lifts knowledge, inspiration, and examples from Alan Alickovic's [Bulletproof React](https://github.com/alan2207/bulletproof-react), Dominic Dorfmeister's [Practical React Query](https://tkdodo.eu/blog/practical-react-query), and Tyler McGinnis' [Complete Guide to React Router](https://ui.dev/react-router-tutorial).

### A non-meta ~~framework~~

Wayfarer is not a framework, a library, or boilerplate. Instead, it embraces and leans into the core tenet of React:

> A JavaScript library for building User Interfaces

Next, Gatsby, Remix, et al. have (re)popularised server-side rendering and static generation of late; built and marketed as "batteries included" meta frameworks (or at the very least "batteries npm-installable") for solving the specific challenges of SSR/SSG. This is not an indictment of these tools, but rather the opposite side of the same coin where React is (still/also) a client-side rendering library and remains a perfectly suitable approach for many projects.

Wayfarer is not built around documentation or theoretical app tutorials that can be worked through in a weekend. Preferring a concrete, implementation-first outline over isolated, hypothetical code snippets, it is a collection of real-world patterns and best practices I have come to rely on that can be applied to projects of any size - whether they are Next, Remix, Create React App, or something custom.

Because of this, Wayfarer is largely a distillation of my own experiences and opinions on how to build a performant, responsive, and accessible React application. Leveraging some of the best tools of the ecosystem from the ground up, the patterns expressed within should be considered a "production-ready" reference regardless of Wayfarers' actual state of "feature-completeness" with the SpaceTraders API. Hopefully, it is a useful resource for others who are interested in learning about these features and how to utilise them in their own projects.

## Architecture

At the heart of Wayfarer is an opinionated yet flexible structure that is designed to be easily extensible and maintainable. Since this isn't a framework, there are no conventions set in stone and the application itself is free to be structured in whatever way makes the most sense, but there are a few principles that should be followed (until they aren't, obviously):

**Routes (aka "pages" / "screens") are _always_ lazy-loaded**
 
**Routes _may_ have a `loader` prop that initialises data fetching**

**React Query is _always_ used to fetch/cache/manage remote server state**

**Suspense and Error Boundaries are _always_ used to handle fallback/error states**
