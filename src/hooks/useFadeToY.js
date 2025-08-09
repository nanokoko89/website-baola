import { useEffect, useRef, useState } from 'react'

/**
 * Returns a progress 0..1 that reaches 1 when scrollY >= targetY.
 * If targetY is not a positive number, progress stays at 0 (disabled) but
 * the hook call order remains stable.
 */
export default function useFadeToY(targetY = -1, range = 180){
  const [p, setP] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    // Disabled state: no listeners, ensure p=0
    if (!(typeof targetY === 'number') || !isFinite(targetY) || targetY < 0){
      setP(0)
      return
    }

    const start = targetY - range

    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset
        const raw = (y - start) / range
        const clamped = Math.max(0, Math.min(1, raw))
        setP(clamped)
        raf.current = null
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [targetY, range])

  return p
}
