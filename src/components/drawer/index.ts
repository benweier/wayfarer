import { Content } from './drawer-content.component'
import { Description } from './drawer-description.component'
import { Header } from './drawer-header.component'
import { Overlay } from './drawer-overlay.component'
import { Title } from './drawer-title.component'
import { Trigger } from './drawer-trigger.component'
import { Drawer as DrawerComponent } from './drawer.component'

export { useDrawerContext, useDrawerActions } from './use-drawer-store.hook'
export { useDrawerImperativeHandle } from './use-drawer-imperative-handle.hook'
export type { DrawerStore, DrawerActions, DrawerImperativeRef, DrawerProps, DrawerState } from './drawer.types'

export const Drawer = Object.assign(DrawerComponent, { Trigger, Content, Header, Title, Description, Overlay })
