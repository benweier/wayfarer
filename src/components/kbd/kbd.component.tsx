const Mac: Record<string, string> = {
  Alt: '⌥',
  Ctrl: '⌃',
  Shift: '⇧',
  Meta: '⌘',
}

const Win: Record<string, string> = {
  Alt: 'Alt',
  Ctrl: 'Ctrl',
  Shift: 'Shift',
  Meta: 'Win',
}

const Arrows: Record<string, string> = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→',
}

// Get OS specific shortcut keys
const getShortcutKey = (key: string) => {
  const shortcut = key.replace(/(Key)/g, '').replace(/(ArrowUp|ArrowDown|ArrowLeft|ArrowRight)/g, (_, k) => Arrows[k])

  if (navigator.userAgent.includes('Mac')) {
    return shortcut.replace(/(\+)/g, '').replace(/(Alt|Ctrl|Shift|Meta)/g, (_, k) => Mac[k])
  }

  return shortcut.replace(/(Alt|Ctrl|Shift|Meta)/g, (_, k) => Win[k])
}

export const Kbd = ({ children }: { children: string }) => {
  return (
    <kbd className="typography-sm mx-0.5 rounded-sm border-1 border-border-primary border-b-3 bg-background-tertiary px-1 font-family-[unset] text-foreground-secondary tracking-widest">
      {getShortcutKey(children)}
    </kbd>
  )
}
