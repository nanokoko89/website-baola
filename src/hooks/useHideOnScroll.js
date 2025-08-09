import { useEffect, useRef, useState } from 'react'

/**
 * Returns { hidden } to control a sticky header.
 * Hides when scrolling down, shows when scrolling up a little.
 * thresholdUp / thresholdDown: px delta required to toggle.
 */
export default function useHideOnScroll({ thresholdUp = 6, thresholdDown = 6 } = {}) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset
      const dy = y - lastY.current

      // Always show near top
      if (y < 10) {
        setHidden(false)
        lastY.current = y
        return
      }

      if (dy > thresholdDown) setHidden(true)   // scrolling down -> hide
      else if (dy < -thresholdUp) setHidden(false) // scrolling up -> show

      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [thresholdUp, thresholdDown])

  return { hidden }
}
