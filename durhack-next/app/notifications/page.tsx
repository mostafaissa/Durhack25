export const metadata = { title: "Donna AI - Notifications" };

export default function NotificationsPage() {
  return (
    <main className="container">
      <header className="main-header">
        <div className="logo">
          Donna AI <span className="logo-sub">EXECUTIVE</span>
        </div>
        <nav className="main-nav">
          <a href="/" className="nav-item">
            <i className="fa-solid fa-table-cells-large"></i> Dashboard
          </a>
          <a href="/map" className="nav-item">
            <i className="fa-solid fa-map-location-dot"></i> Map
          </a>
          <a href="/calendar" className="nav-item">
            <i className="fa-solid fa-calendar-days"></i> Calendar
          </a>
          <a href="/notifications" className="nav-item active">
            <i className="fa-solid fa-bell"></i> Notifications
          </a>
        </nav>
      </header>

      <div className="page-header">
        <div>
          <h1>Executive Notifications</h1>
          <p>2 unread notifications</p>
        </div>
        <button className="btn btn-secondary" id="mark-all-read-btn">
          <i className="fa-solid fa-check-double"></i> Mark All Read
        </button>
      </div>

      <div className="notifications-grid">
        <aside className="sidebar">
          <div className="card">
            <div className="card-header">
              <h3>Filter Notifications</h3>
            </div>
            <div className="card-body">
              <ul className="filter-list">
                <li>
                  <a href="#" className="active">
                    <i className="fa-solid fa-inbox"></i> All Notifications{" "}
                    <span className="badge">5</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-triangle-exclamation"></i> Urgent{" "}
                    <span className="badge">1</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-calendar-check"></i> Meetings{" "}
                    <span className="badge">1</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa-solid fa-message"></i> Messages{" "}
                    <span className="badge">1</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <button className="btn btn-primary btn-block">
                <i className="fa-solid fa-gear"></i> Settings
              </button>
              <button className="btn btn-secondary btn-block">
                <i className="fa-solid fa-bell-slash"></i> Mute All
              </button>
            </div>
          </div>
        </aside>

        <section className="main-content">
          <div className="card">
            <div className="card-header-flex">
              <h3>All Notifications(s)</h3>
              <div>
                <button className="btn-icon">
                  <i className="fa-solid fa-search"></i>
                </button>
                <button className="btn-icon">
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <ul className="notification-list">
                <li className="notification-item">
                  <div className="item-icon urgent">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h4>Urgent: Morrison Case Update</h4>
                      <span className="timestamp">5 minutes ago</span>
                    </div>
                    <p>
                      New evidence has been submitted. Review required before 3
                      PM meeting.
                    </p>
                    <span className="tag tag-urgent">URGENT</span>
                  </div>
                  <div className="item-actions">
                    <button className="btn-icon">
                      <i className="fa-solid fa-reply"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
                <li className="notification-item">
                  <div className="item-icon meeting">
                    <i className="fa-solid fa-calendar-check"></i>
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h4>Meeting Reminder</h4>
                      <span className="timestamp">25 minutes ago</span>
                    </div>
                    <p>
                      Client presentation with Pearson Hardman in 30 minutes.
                    </p>
                    <span className="tag tag-meeting">MEETINGS</span>
                  </div>
                  <div className="item-actions">
                    <button className="btn-icon">
                      <i className="fa-solid fa-reply"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
                <li className="notification-item">
                  <div className="item-icon message">
                    <i className="fa-solid fa-message"></i>
                  </div>
                  <div className="item-content">
                    <div className="item-header">
                      <h4>Message from Harvey Specter</h4>
                      <span className="timestamp">1 hour ago</span>
                    </div>
                    <p>
                      Can you reschedule the 4 PM meeting? Something urgent came
                      up.
                    </p>
                    <span className="tag tag-message">MESSAGES</span>
                  </div>
                  <div className="item-actions">
                    <button className="btn-icon">
                      <i className="fa-solid fa-reply"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <script src="/js/main.js"></script>
    </main>
  );
}
