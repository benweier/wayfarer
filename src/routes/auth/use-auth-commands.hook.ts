import { useNavigate } from '@tanstack/react-router'
import { type Action, useRegisterActions } from 'kbar'
import { useMemo } from 'react'

export const useAuthCommands = () => {
  const navigate = useNavigate()

  const actions = useMemo<Action[]>(() => {
    return [
      {
        id: 'login',
        name: 'Login',
        shortcut: ['Alt+KeyL'],
        keywords: 'login',
        perform: () => {
          void navigate({ to: '/login' })
        },
      },
      {
        id: 'register',
        name: 'Register',
        shortcut: ['Alt+KeyR'],
        keywords: 'register',
        perform: () => {
          void navigate({ to: '/register' })
        },
      },
    ]
  }, [navigate])

  useRegisterActions(actions)
}
