import React from 'react';
import { FaHome, FaRegNewspaper, FaGift, FaUsers, FaStore, FaHistory, FaCog, FaPlus } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);

/**
 * This component renders a custom dashboard inspired by modern creator platforms.
 * It includes a left‑hand navigation bar, a header with quick actions,
 * summary cards showing key metrics, and a section listing recent activities.
 *
 * The layout is responsive and uses CSS Grid and Flexbox. Adjust the SCSS in
 * Dashboard.module.scss to customize colors, spacing and typography to your liking.
 */
export default function Dashboard() {
  // Dummy data for the summary cards and recent activities. Replace with
  // real API data when integrating with your backend.
  const summary = [
    { label: 'Thu nhập', value: '$1,245', icon: <FaGift className={cx('cardIcon')} /> },
    { label: 'Người ủng hộ', value: '82', icon: <FaUsers className={cx('cardIcon')} /> },
    { label: 'Hội viên', value: '37', icon: <FaUsers className={cx('cardIcon')} /> },
    { label: 'Sản phẩm', value: '5', icon: <FaStore className={cx('cardIcon')} /> },
  ];

  const recentActivities = [
    { id: 1, supporter: 'Trần Anh', message: 'Ủng hộ 3 ly cà phê', amount: '$9', date: '08/08/2025' },
    { id: 2, supporter: 'Lê Minh', message: 'Tham gia thành viên', amount: '$25', date: '07/08/2025' },
    { id: 3, supporter: 'Nguyễn Hoa', message: 'Mua sản phẩm “Poster Digital”', amount: '$15', date: '06/08/2025' },
  ];

  return (
    <div className={cx('dashboardContainer')}>
      {/* Sidebar navigation */}
      <aside className={cx('sidebar')}>
        <div className={cx('logo')}>Creator<span>Hub</span></div>
        <nav className={cx('nav')}>        
          <a href="#" className={cx('navItem', 'active')}><FaHome className={cx('navIcon')} />Tổng quan</a>
          <a href="#" className={cx('navItem')}><FaRegNewspaper className={cx('navIcon')} />Bài viết</a>
          <a href="#" className={cx('navItem')}><FaGift className={cx('navIcon')} />Ủng hộ</a>
          <a href="#" className={cx('navItem')}><FaUsers className={cx('navIcon')} />Hội viên</a>
          <a href="#" className={cx('navItem')}><FaStore className={cx('navIcon')} />Cửa hàng</a>
          <a href="#" className={cx('navItem')}><FaHistory className={cx('navIcon')} />Lịch sử</a>
          <a href="#" className={cx('navItem')}><FaCog className={cx('navIcon')} />Cài đặt</a>
        </nav>
      </aside>

      {/* Main content area */}
      <main className={cx('main')}>        
        {/* Header with actions */}
        <header className={cx('header')}>
          <h1 className={cx('pageTitle')}>Tổng quan</h1>
          <div className={cx('actions')}>
            <button className={cx('actionButton')}><FaPlus />&nbsp;Tạo bài viết</button>
            <button className={cx('actionButton', 'secondary')}><FaGift />&nbsp;Nhận ủng hộ</button>
          </div>
        </header>

        {/* Summary cards */}
        <section className={cx('summaryGrid')}>
          {summary.map((item) => (
            <div key={item.label} className={cx('summaryCard')}>
              {item.icon}
              <div className={cx('summaryContent')}>
                <span className={cx('summaryLabel')}>{item.label}</span>
                <span className={cx('summaryValue')}>{item.value}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Recent activity */}
        <section className={cx('activitySection')}>
          <h2 className={cx('sectionTitle')}>Hoạt động gần đây</h2>
          <table className={cx('activityTable')}>
            <thead>
              <tr>
                <th>Người</th>
                <th>Nội dung</th>
                <th>Số tiền</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map(activity => (
                <tr key={activity.id}>
                  <td>{activity.supporter}</td>
                  <td>{activity.message}</td>
                  <td>{activity.amount}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}