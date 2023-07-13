# [Wayfarer](https://wayfarer.benweier.dev/)

Wayfarer is a browser-based interface for **v2** of the [SpaceTraders API](https://spacetraders.io). Just as the API itself is a work-in-progress under active development, Wayfarer is a work-in-progress intended for demonstration purposes of a number of key patterns and technologies.

## Features

Current implementation state of SpaceTraders features:

- [x] Registration and login/logout
- [x] View System and Waypoint lists
- [x] View System and Waypoint details
- [x] Buy and Sell Cargo at Waypoint Markets
- [x] View Fleet list
- [x] View Ship details
    - [x] cargo / loadout / fuel / crew / navigation state
- [x] Dock/Orbit at Waypoints
- [x] Navigate Ship between Waypoints in a System
- [x] Warp Ship to Waypoints in other Systems
- [ ] Jump Ship to other Systems
- [x] Refuel Ship
- [x] Survey Waypoints and Extract resources
- [x] Refine raw materials
- [x] Jettison cargo

## Tech

Wayfarer depends on just a handful of open-source projects and is, at its core, a standard client-side rendered [React](https://reactjs.org/) application built with [Vite](https://vitejs.dev/). It uses [React Router](https://reactrouter.com/) for routing, [React Query](https://tanstack.com/query) for data fetching, [TailwindCSS](https://tailwindcss.com/) for styling, [Zustand](https://docs.pmnd.rs/zustand) and [Jotai](https://jotai.org/) for state management, and [React Hook Form](https://react-hook-form.com/) for form handling. It is tested with [Vitest](https://vitest.dev/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

Obviously there are more libraries in use than just those above, but are generally used to flesh out UI functionality or improve the development experience than form the core "architecture" (this includes Tailwind plugins, icons, validation, headless UI components, etc).

## Primary Goal

Building on top of these libraries, is an obsessively extreme use of Suspense and Concurrent features of React. It lifts knowledge, inspiration, and examples from Alan Alickovic's [Bulletproof React](https://github.com/alan2207/bulletproof-react), Dominic Dorfmeister's [Practical React Query](https://tkdodo.eu/blog/practical-react-query), Tyler McGinnis' [Complete Guide to React Router](https://ui.dev/react-router-tutorial), and [Kent C. Dodds](https://kentcdodds.com).

### A non-meta ~~framework~~

Wayfarer is not a framework, a library, or boilerplate. Instead, it embraces and leans into the core tenet of React:

> A JavaScript library for building User Interfaces

With this in mind, Wayfarer's focus is on building a UI for the SpaceTraders API using React and the ecosystem of tools that have grown around it, and not a framework that abstracts away the underlying technologies. This is not to say that frameworks are bad, but rather that they are not the only way to build a React application. Next, Gatsby, Remix, et al. have (re)popularised server-side rendering and static generation of late; built and marketed as "batteries included" meta-frameworks (or at the very least "batteries npm-installable") for solving the specific challenges of SSR/SSG. This project, however, intentionally presents an opposing stance where React is (still/also) a client-side rendering library and remains a perfectly suitable approach.

Wayfarer is not built around documentation or theoretical app tutorials that can be worked through in a weekend. Preferring a concrete, implementation-first approach over isolated, hypothetical code snippets, or arbitrarily contrived "demo" sandboxes that skip critical tooling or standards for the sake of simplicity. It is a collection of real-world patterns/practices I have come to rely on that can be applied to projects of any size, and is largely a distillation of my own experiences and opinions on how to build a performant, responsive, and accessible React application.

Leveraging some of the best tools of the ecosystem from the ground up, the patterns expressed within may serve as a reference regardless of Wayfarers' actual state of "feature-completeness" with the SpaceTraders API. Hopefully, it is a useful resource for others who are interested in learning about these features and how to utilise them in their own projects.

## Architecture

Wayfarer's opinionated architecture is intended to be flexible and maintainable, whether or not I have succeeded probably remains to be proven. These conventions aren't set in stone and - like any application - can be structured in whatever way makes the most sense. However, there are a few guiding principles that should be followed (until they aren't):

> **Composition over Inheritance** and **Inversion of Control**

Wayfarer's most powerful features are built on top of React's composition model and general inversion of control patterns. 

> **Path Routes are _(almost always)_ lazy-loaded**

Routes are considered "pages" in a traditional sense, but they are not necessarily 1:1 with a URL. Route elements do little more than orchestrate the components inside a layout, such as passing around dynamic path segments. The page features are responsible for fetching data/consuming prefetched data, handling errors, and rendering fallback states. This is where Suspense and Error Boundaries are used to their fullest extent.

> **Routes _may_ have a `loader` prop that initiates data prefetching**  

A `loader` in React Router returns a Promise that resolves to some data. In Wayfarer, while it could use the `useLoaderData` hook, the loader doesn't handle caching or deduplication of requests so it is used simply to initiate prefetching with React Query's `ensureQueryData`. This helps to keep the interface feeling snappy and responsive during route transitions (see [perceived performance](https://en.wikipedia.org/wiki/Perceived_performance)), 

> **React Query is _always_ used to fetch/cache/mutate server state**

Although loaders/actions can achieve similar results, React Query is such an amazing library that I have a hard time letting it go. It is used for all server state and is the primary source of truth for the application. It enables [Optimistic Updates](https://tanstack.com/query/v4/docs/react/guides/optimistic-updates), makes Mutations and Query Invalidation a snap, and caches data for reasonable amounts of time.

> **Suspense and Error Boundaries are _always_ used to handle fallback/error states**

