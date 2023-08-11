import { useCallback, useEffect, useRef, useState } from 'react'

export const useCopy = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isCopied, setIsCopied] = useState(false)
  const onCopy = useCallback(async (value: string) => {
    await navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)
    })
  }, [])
  const reset = useCallback(() => {
    setIsCopied(false)
  }, [])

  useEffect(() => {
    const node = ref.current
    const copyHandler = () => {
      setIsCopied(true)
    }

    node?.addEventListener('copy', copyHandler)

    return () => {
      node?.removeEventListener('copy', copyHandler)
    }
  }, [])

  return { ref, isCopied, onCopy, reset }
}
