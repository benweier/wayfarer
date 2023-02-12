// import { Tab } from '@headlessui/react'
// import { cx } from '@/utilities/cx'
import { QuerySuspenseBoundary } from '@/components/QuerySuspenseBoundary'
import { MyContracts } from '@/features/Contracts'

// const tabs = [
//   { title: 'My Contracts', content: <MyContracts /> },
//   { title: 'Get a Contract', content: <GetContracts /> },
// ]

// const tabs = [
//   { title: 'My Contracts', path: '/contracts' },
//   { title: 'Get a Contract', path: '/contracts/available' },
// ]

// export const Layout = () => {
//   const location = useLocation()
//   const navigate = useNavigate()

//   return (
//     <div className="grid gap-12">
//       <div>
//         <h1 className="text-title p-4">Contracts</h1>
//         <div className="py-6 px-4">
//           <Tabs.Root className="grid gap-2" value={location.pathname} onValueChange={(value) => navigate(value)}>
//             <Tabs.List className="flex gap-2 rounded-lg bg-blue-600 p-1">
//               {tabs.map((tab) => (
//                 <Tabs.Trigger
//                   key={tab.title}
//                   value={tab.path}
//                   className={cx(
//                     'rounded py-2.5 px-7 text-sm font-medium leading-5 text-blue-100 ring-blue-200/50 ring-offset-2 ring-offset-blue-400 hover:bg-white/[0.2] hover:text-white focus:outline-none focus:ring-2',
//                     'state-active:bg-white state-active:text-blue-600',
//                   )}
//                 >
//                   {tab.title}
//                 </Tabs.Trigger>
//               ))}
//             </Tabs.List>
//             <Tabs.Content
//               value={location.pathname}
//               className="rounded-lg bg-zinc-50 p-3 ring-blue-200/50 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 dark:bg-zinc-900/50"
//             >
//               <Suspense fallback={null}>
//                 <Outlet />
//               </Suspense>
//             </Tabs.Content>
//           </Tabs.Root>
//         </div>
//       </div>
//     </div>
//   )
// }

// export const Contracts = () => {
//   return (
//     <div className="grid gap-12">
//       <div>
//         <h1 className="text-title p-4">Contracts</h1>
//         <div className="my-6 px-4">
//           <Tab.Group>
//             <div className="grid gap-6">
//               <Tab.List className="isolate flex divide-x divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
//                 {tabs.map((tab) => (
//                   <Tab
//                     key={tab.title}
//                     className={
//                       ({ selected }) =>
//                         cx(
//                           'first:rounded-l-lg last:rounded-r-lg',
//                           'group relative min-w-0 flex-1 overflow-hidden py-3 px-6 text-center text-sm font-medium focus:z-10',
//                           'ring-blue-400/50 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                           {
//                             'bg-white text-zinc-900 dark:bg-zinc-700/50 dark:text-white': selected,
//                             'bg-zinc-100 text-zinc-600 hover:bg-zinc-100/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-700/25':
//                               !selected,
//                           },
//                         )
//                       // cx(
//                       //   'rounded py-2.5 px-7 text-sm font-medium leading-5 ring-blue-200/50 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                       //   {
//                       //     'border border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700  dark:bg-zinc-900 dark:text-white':
//                       //       selected,
//                       //     'border border-zinc-700 text-zinc-200 hover:bg-zinc-200/50 hover:text-white dark:bg-zinc-900/20 dark:text-zinc-300 dark:hover:bg-zinc-900/50':
//                       //       !selected,
//                       //   },
//                       // )
//                     }
//                   >
//                     {tab.title}
//                   </Tab>
//                 ))}
//               </Tab.List>
//               <Tab.Panels>
//                 {tabs.map((tab) => (
//                   <Tab.Panel
//                     key={tab.title}
//                     className="rounded-lg ring-blue-200/50 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
//                   >
//                     <Suspense fallback={null}>{tab.content}</Suspense>
//                   </Tab.Panel>
//                 ))}
//               </Tab.Panels>
//             </div>
//           </Tab.Group>
//         </div>
//       </div>
//     </div>
//   )
// }

export const Contracts = () => {
  return (
    <div>
      <h1 className="text-title p-4">Contracts</h1>
      <div className="grid gap-12 py-6 px-4">
        <QuerySuspenseBoundary>
          <MyContracts />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}
