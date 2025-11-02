export const metadata = { title: "Donna AI - Calendar" };

export default function CalendarPage() {
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
          <a href="/calendar" className="nav-item active">
            <i className="fa-solid fa-calendar-days"></i> Calendar
          </a>
          <a href="/notifications" className="nav-item">
            <i className="fa-solid fa-bell"></i> Notifications
          </a>
        </nav>
      </header>

      <div className="page-header">
        <div>
          <h1>Executive Calendar</h1>
          <p>Manage your schedule with precision</p>
        </div>
      </div>

      <div className="calendar-grid-layout">
        <div className="card">
          <div className="card-header-flex">
            <h3 id="calendar-month-year">November 2025</h3>
            <div>
              <button className="btn-icon" id="prev-month">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="btn-icon" id="next-month">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="calendar-container">
              <div className="calendar-header">Sun</div>
              <div className="calendar-header">Mon</div>
              <div className="calendar-header">Tue</div>
              <div className="calendar-header">Wed</div>
              <div className="calendar-header">Thu</div>
              <div className="calendar-header">Fri</div>
              <div className="calendar-header">Sat</div>
            </div>
          </div>
        </div>

        <aside className="sidebar">
          <div className="card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <button
                className="btn btn-primary btn-block"
                id="new-meeting-btn"
              >
                <i className="fa-solid fa-plus"></i> New Meeting
              </button>
              <button className="btn btn-secondary btn-block">
                <i className="fa-solid fa-calendar-plus"></i> Schedule
                Appointment
              </button>
              <button className="btn btn-secondary btn-block">
                <i className="fa-solid fa-clock"></i> Block Time
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 id="schedule-title">Today's Schedule</h3>
            </div>
            <div className="card-body" id="schedule-body">
              <p className="empty-state">No events scheduled</p>
            </div>
          </div>
        </aside>
      </div>

      <script src="/js/main.js"></script>
    </main>
  );
}
