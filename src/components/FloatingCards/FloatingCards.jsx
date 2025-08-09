import React, { useMemo } from 'react'
import Card from '../Card/Card.jsx'
import styles from './FloatingCards.module.scss'
import bind from '../../utils/cx'
import useScrollProgress from '../../hooks/useScrollProgress.js'
import useFadeToY from '../../hooks/useFadeToY.js'
const cx = bind(styles)

/**
 * side: 'left' | 'right'
 * items: [{ top, sideOffset, baseRotate, small, ...cardProps }]
 * motion: { translateBase: number, translateStep: number, rotateStep: number }
 */
export default function FloatingCards({  side='left', items=[], motion, fadeAt, fadeRange=180  }){
  const p = useScrollProgress(0) // progress 0..1 over ~1 viewport height

  const m = { translateBase: 120, translateStep: 60, rotateStep: 10, ...motion }
  const fadeP = useFadeToY(fadeAt ?? -1, fadeRange)

  return (
    <div className={cx('wrap')} aria-hidden="true">
      {items.map((it, idx) => {
        const dir = side === 'left' ? -1 : 1
        const move = (m.translateBase + idx * m.translateStep) * p * dir
        const rot = (it.baseRotate + (m.rotateStep + idx * 3) * p * dir)
        const x = (it.sideOffset ?? 40) * dir

        const baseOpacity = Math.max(0, 1 - p * 2)
        const fadeOpacity = Math.max(0, 1 - fadeP)
        const opacity = Math.min(baseOpacity, fadeOpacity)
        const style = { 
          top: it.top,
          [side]: `${x}px`,
          transform: `translateX(${move}px) rotate(${rot}deg)`,
          opacity,
          pointerEvents: opacity === 0 ? 'none' : 'auto',
          visibility: opacity === 0 ? 'hidden' : 'visible',
          transition: 'opacity .2s ease'
        }
        return (
          <Card
            key={idx}
            className={cx('float', it.small && 'small')}
            style={style}
            {...it.card}
          />
        )
      })}
    </div>
  )
}
