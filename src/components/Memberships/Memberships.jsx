import React from 'react'
import styles from './Memberships.module.scss'
import bind from '../../utils/cx' // adjust path if your cx is elsewhere
const cx = bind(styles)

/**
 * Memberships Section
 * Props:
 *  - title, kicker, description
 *  - plans: [{name, price, features:[], image?:'basic'|'pro'|'advanced'}]
 *  - metrics: { membersCount, earnedThisMonth }
 */
export default function Memberships({
  kicker = 'MEMBERSHIPS',
  title = <>Start a membership for<br/>your biggest fans.</>,
  description = `Earn a recurring income by accepting monthly or yearly subscriptions. Share exclusive content, or just give them a way to support your work on an ongoing basis.`,
  plans = defaultPlans,
  metrics = { membersCount: 286, earnedThisMonth: '$1,500' },
}){
  return (
    <section className={cx('section')}>
      <div className={cx('panel')}>
        <header className={cx('head')}>
          <div className={cx('kicker')}>{kicker}</div>
          <h2 className={cx('title')} dangerouslySetInnerHTML={{__html: toHTML(title)}} />
          <p className={cx('desc')}>{description}</p>
        </header>

        <div className={cx('stage')}>
          {/* Floating badges */}
          <div className={cx('badge','left')}>
            <div className={cx('avatars')}>
              <img src="https://i.pravatar.cc/40?img=1" alt=""/>
              <img src="https://i.pravatar.cc/40?img=3" alt=""/>
              <img src="https://i.pravatar.cc/40?img=5" alt=""/>
            </div>
            <div className={cx('metric')}>
              <div className={cx('num')}>{metrics.membersCount}</div>
              <div className={cx('label')}>Members</div>
            </div>
          </div>

          <div className={cx('badge','right')}>
            <div className={cx('bankIcon')} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10h18M6 10v8m4-8v8m4-8v8m4-8v8M2 22h20M12 2l10 6H2l10-6z" />
              </svg>
            </div>
            <div className={cx('metric')}>
              <div className={cx('num')}>{metrics.earnedThisMonth}</div>
              <div className={cx('label')}>Earned this month</div>
            </div>
          </div>

          {/* Cards */}
          <PlanCard className={cx('card','leftCard')} plan={plans[0]} scale={0.94}/>
          <PlanCard className={cx('card','centerCard')} plan={plans[1]} highlight />
          <PlanCard className={cx('card','rightCard')} plan={plans[2]} scale={0.94}/>
        </div>
      </div>
    </section>
  )
}

function PlanCard({ className, plan, highlight=false, scale=1 }){
  return (
    <article className={className} style={{'--scale': scale}}>
      <div className={styles.illus}>
        {renderIllus(plan.image)}
      </div>
      <h3 className={styles.planName}>{plan.name}</h3>
      <div className={styles.price}>{plan.price}/<span>month</span></div>
      <ul className={styles.features}>
        {plan.features.map((f,idx)=>(
          <li key={idx}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path fill="currentColor" d="M9.55 17.54l-4.6-4.6 1.41-1.41 3.19 3.19 7.1-7.1 1.41 1.41-8.51 8.51z"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <button className={styles.cta}>Join</button>
    </article>
  )
}

function renderIllus(kind='basic'){
  if(kind==='pro'){
    return (
      <svg viewBox="0 0 200 90" className={styles.svg}>
        <rect x="0" y="20" width="200" height="54" rx="10" fill="#fdebd2"/>
        <g transform="translate(75,18)">
          <circle cx="24" cy="28" r="18" fill="#ffcc80"/>
          <circle cx="24" cy="28" r="6" fill="#ff6b6b"/>
          <rect x="46" y="18" width="36" height="22" rx="6" fill="#4ade80"/>
        </g>
      </svg>
    )
  }
  if(kind==='advanced'){
    return (
      <svg viewBox="0 0 200 90" className={styles.svg}>
        <rect x="0" y="20" width="200" height="54" rx="10" fill="#f6efe7"/>
        <g transform="translate(74,14)">
          <circle cx="28" cy="34" r="22" fill="#22c1c3"/>
          <rect x="18" y="20" width="20" height="20" fill="#0ea5e9"/>
          <circle cx="54" cy="26" r="8" fill="#ff6b6b"/>
          <circle cx="8" cy="26" r="8" fill="#ffb020"/>
        </g>
      </svg>
    )
  }
  // basic
  return (
    <svg viewBox="0 0 200 90" className={styles.svg}>
      <rect x="0" y="20" width="200" height="54" rx="10" fill="#f6efe7"/>
      <g transform="translate(64,18)">
        <rect x="12" y="10" width="46" height="36" rx="8" fill="#60a5fa"/>
        <rect x="62" y="18" width="36" height="24" rx="6" fill="#ffcc80"/>
        <rect x="0" y="30" width="18" height="8" rx="4" fill="#34d399"/>
      </g>
    </svg>
  )
}

const defaultPlans = [
  {
    name:'Basic membership',
    price:'$5',
    image:'basic',
    features:[
      '33% OFF all my eBooks & courses',
      'Access to members-only library',
      'Exclusive posts and messages',
    ]
  },
  {
    name:'Pro membership',
    price:'$15',
    image:'pro',
    features:[
      'Support me on a monthly basis',
      'Email alert for new posts',
      'Exclusive posts and messages',
    ]
  },
  {
    name:'Advanced membership',
    price:'$25',
    image:'advanced',
    features:[
      'Monthly printable journal pages',
      'Email alert for new posts',
      'Work in progress updates',
    ]
  },
]

function toHTML(node){
  return typeof node === 'string' ? node : renderToString(node)
}

// Minimal internal render for React nodes in title (avoid importing server renderer)
function renderToString(node){
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(renderToString).join('')
  if (!node || !node.type) return ''
  const { type, props } = node
  const children = renderToString(props.children)
  const tag = typeof type === 'string' ? type : 'span'
  return `<${tag}>${children}</${tag}>`
}
