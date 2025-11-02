import DateTime from "./components/DateTime";
import SmartAssistant from "./components/SmartAssistant";
import TalkChat from "./components/TalkChat";

export const metadata = {
  title: "Donna AI - Dashboard",
};

export default function Page() {
  return (
    <main className="container">
      <header className="main-header">
        <div className="logo">
          Donna AI <span className="logo-sub">EXECUTIVE</span>
        </div>
        <nav className="main-nav">
          <a href="/" className="nav-item active">
            <i className="fa-solid fa-table-cells-large"></i> Dashboard
          </a>
          <a href="/map" className="nav-item">
            <i className="fa-solid fa-map-location-dot"></i> Map
          </a>
          <a href="/calendar" className="nav-item">
            <i className="fa-solid fa-calendar-days"></i> Calendar
          </a>
          <a href="/notifications" className="nav-item">
            <i className="fa-solid fa-bell"></i> Notifications
          </a>
        </nav>
      </header>

      {/* Gemini Assistant Chat */}
      <SmartAssistant />

      <div className="main-title">
        <h1>Donna AI</h1>
        <p>Your Executive Assistant</p>
        <DateTime />
      </div>

      <div className="dashboard-grid">
        <aside className="sidebar">
          <div className="card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body">
              <button className="btn btn-secondary btn-block">
                <i className="fa-solid fa-calendar-plus"></i> Schedule Meeting
              </button>
              <button className="btn btn-secondary btn-block">
                <i className="fa-solid fa-file-lines"></i> Review Documents
              </button>
              <button className="btn btn-secondary btn-block">
                <i className="fa-solid fa-phone"></i> Call Client
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Today's Priorities</h3>
            </div>
            <div className="card-body">
              <ul className="priority-list">
                <li>
                  <span className="priority-dot" /> Morrison case review –{" "}
                  <strong>10:30 AM</strong>
                </li>
                <li>
                  <span className="priority-dot" /> Client presentation –{" "}
                  <strong>2:00 PM</strong>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* TalkJS Chat Popup */}
      <TalkChat />
    </main>
  );
}