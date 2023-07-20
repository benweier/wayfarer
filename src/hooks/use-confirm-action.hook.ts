import { useState } from 'react'

export const useConfirmAction = (callback: () => void) => {
  const [confirm, setConfirm] = useState(false)

  const onClick = () => {
    if (!confirm) {
      setConfirm(true)
      return
    }

    setConfirm(false)
    callback()
  }

  const onReset = () => {
    setConfirm(false)
  }

  return { confirm, onClick, onReset }
}
