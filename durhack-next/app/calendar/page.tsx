import CalendarClient from "./CalendarClient";

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

      <CalendarClient />
    </main>
  );
}
