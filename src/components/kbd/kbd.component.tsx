const Mac: Record<string, string> = {
  Alt: '⌥',
  Ctrl: 'Ctrl',
  Shift: '⇧',
  Meta: '⌘',
}

const Win: Record<string, string> = {
  Alt: 'Alt',
  Ctrl: 'Ctrl',
  Shift: 'Shift',
  Meta: 'Win',
}

// Get OS specific shortcut keys
const getShortcutKey = (key: string) => {
  const shortcut = key.replace(/(Key|\+)/g, '')

  if (navigator.userAgent.includes('Mac')) {
    return shortcut.replace(/(Alt|Ctrl|Shift|Meta)/g, (_, k) => Mac[k])
  }

  return shortcut.replace(/(Alt|Ctrl|Shift|Meta)/g, (_, k) => Win[k])
}

export const Kbd = ({ children }: { children: string }) => {
  return (
    <kbd className="bg-background-tertiary typography-sm font-family-[unset] text-foreground-secondary border-1 border-b-3 border-border-primary rounded-sm px-1 mx-0.5">
      {getShortcutKey(children)}
    </kbd>
  )
}
