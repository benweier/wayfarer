import { i18n } from '@/services/i18n'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/register')({
  head: () => {
    return {
      meta: [{ title: i18n.t('title_template', { title: 'auth.register.title', ns: 'meta' }) }],
    }
  },
})
