import { toast as sonner } from 'sonner'
import { AppIcon } from '@/components/icons'
import { Toast } from './toast.component'
import type { ToastConf } from './toast.types'

export const toast = {
  success(props: ToastConf) {
    return sonner.custom((id) => (
      <Toast
        status="success"
        icon={<AppIcon id="toast:success" className="size-6" />}
        onDismiss={() => sonner.dismiss(id)}
        {...props}
      />
    ))
  },
  error(props: ToastConf) {
    return sonner.custom((id) => (
      <Toast
        status="error"
        icon={<AppIcon id="toast:error" className="size-6" />}
        onDismiss={() => sonner.dismiss(id)}
        {...props}
      />
    ))
  },
  warning(props: ToastConf) {
    return sonner.custom((id) => (
      <Toast
        status="warning"
        icon={<AppIcon id="toast:warning" className="size-6" />}
        onDismiss={() => sonner.dismiss(id)}
        {...props}
      />
    ))
  },
  info(props: ToastConf) {
    return sonner.custom((id) => (
      <Toast
        status="info"
        icon={<AppIcon id="toast:info" className="size-6" />}
        onDismiss={() => sonner.dismiss(id)}
        {...props}
      />
    ))
  },
  neutral(props: ToastConf) {
    return sonner.custom((id) => (
      <Toast
        status="neutral"
        icon={<AppIcon id="toast:neutral" className="size-6" />}
        onDismiss={() => sonner.dismiss(id)}
        {...props}
      />
    ))
  },
  promise<T>(promise: Promise<T>, props: { loading: ToastConf; success: ToastConf; error: ToastConf }) {
    return sonner.promise(promise, {
      loading: (
        <Toast
          status="neutral"
          icon={<AppIcon id="toast:loading" className="size-6 animate-spin" />}
          {...props.loading}
        />
      ),
      success: <Toast status="success" icon={<AppIcon id="toast:success" className="size-6" />} {...props.success} />,
      error: <Toast status="error" icon={<AppIcon id="toast:error" className="size-6" />} {...props.error} />,
    })
  },
} as const
