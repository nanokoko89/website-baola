import { useEffect, useRef, useState } from 'react'

/**
 * Returns a scroll progress value 0 -> 1 over a given range (in px).
 * rangeStart: top px where animation starts (default 0)
 * range: total px distance to map into [0,1] (default window.innerHeight)
 */
export default function useScrollProgress(rangeStart = 0, range) {
  const [progress, setProgress] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    const targetRange = range ?? window.innerHeight * 1.2

    const onScroll = () => {
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset
        const raw = (y - rangeStart) / targetRange
        const clamped = Math.max(0, Math.min(1, raw))
        setProgress(clamped)
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
  }, [rangeStart, range])

  return progress
}
