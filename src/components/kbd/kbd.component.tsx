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
  const shortcut = key
    .replace(/(Key)/g, '')
    .replace(/(ArrowUp|ArrowDown|ArrowLeft|ArrowRight)/g, (_, k: string) => Arrows[k])

  if (navigator.userAgent.includes('Mac')) {
    return shortcut.replace(/(\+)/g, '').replace(/(Alt|Ctrl|Shift|Meta)/g, (_, k: string) => Mac[k])
  }

  return shortcut.replace(/(Alt|Ctrl|Shift|Meta)/g, (_, k: string) => Win[k])
}

export const Kbd = ({ children }: { children: string }) => {
  return (
    <kbd className="border-border-primary bg-background-tertiary font-family-[unset] text-foreground-secondary mx-0.5 rounded-sm border-1 border-b-3 px-1 text-sm tracking-widest">
      {getShortcutKey(children)}
    </kbd>
  )
}
