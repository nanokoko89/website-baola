import React from 'react'
import styles from './Card.module.scss'
import bind from '../../utils/cx'
const cx = bind(styles)

export default function Card({ className, avatar, img, logo, title, supporters, style }){
  return (
    <div className={cx('card', className)} style={style}>
      <div className={cx('avatar', img && 'img', logo && 'logo')}>
        {img ? <img src={img} alt="" /> : (logo || avatar || 'C')}
      </div>
      <div className={cx('card-title')}>{title}</div>
      <div className={cx('card-meta')}>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>
        </svg>
        <span>{supporters} supporters</span>
      </div>
    </div>
  )
}
