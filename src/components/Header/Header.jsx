import React from 'react'
import styles from './Header.module.scss'
import bind from '../../utils/cx'
const cx = bind(styles)

import useHideOnScroll from '../../hooks/useHideOnScroll.js'

export default function Header(){
  const { hidden } = useHideOnScroll()
  return (
    <header className={cx('nav', hidden && 'hidden')}>
      <div className={cx('nav-left')}>
        <a className={cx('nav-link')} href="#">FAQ</a>
        <a className={cx('nav-link')} href="#">Wall of <span className={cx('heart')}>♥</span></a>
        <a className={cx('nav-link')} href="#">Resources <span className={cx('chev')}>▾</span></a>
      </div>

      <a className={cx('brand')} href="#">
        <span className={cx('cup')}>☕</span>
        <span className={cx('brand-text')}>Buy me a coffee</span>
        <span className={cx('r')}>®</span>
      </a>

      <div className={cx('nav-right')}>
        <div className={cx('search')}>
          <svg className={cx('search-icon')} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input placeholder="Search creators" />
        </div>
        <a className={cx('nav-link')} href="#">Log in</a>
        <a className={cx('btn','btn-yellow')} href="#">Sign up</a>
      </div>
    </header>
  )
}
