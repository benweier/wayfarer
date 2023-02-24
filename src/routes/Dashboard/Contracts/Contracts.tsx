import { QuerySuspenseBoundary, withQSB } from '@/components/QuerySuspenseBoundary'
import { MyContracts } from '@/features/Contracts'

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

export const ContractsRoute = () => {
  return (
    <div className="grid gap-4 p-4">
      <h1 className="text-title">Contracts</h1>
      <div className="grid gap-12">
        <QuerySuspenseBoundary>
          <MyContracts />
        </QuerySuspenseBoundary>
      </div>
    </div>
  )
}

export const List = withQSB()(ContractsRoute)
