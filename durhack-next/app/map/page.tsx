import MapClient from "./MapClient";

export const metadata = { title: "Donna AI - Map" };

export default function MapPage() {
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
          <a href="/map" className="nav-item active">
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

      <div className="main-title">
        <h1>Executive Locations</h1>
        <p>Navigate your professional destinations</p>
      </div>

      <div className="map-grid-layout">
        <div className="card">
          <div className="card-header-flex">
            <h3>Manhattan Business District</h3>
            <div>
              <button className="btn btn-secondary">
                <i className="fa-solid fa-diamond-turn-right"></i> Navigate
              </button>
              <button className="btn-icon">
                <i className="fa-solid fa-share-nodes"></i>
              </button>
            </div>
          </div>
          <div className="card-body map-container">
            {/* Replaced iframe with a client-side Google Maps web-component */}
            <MapClient />
          </div>
        </div>

        <aside className="sidebar">
          <div className="card">
            <div className="card-header">
              <h3>Current Location</h3>
            </div>
            <div className="card-body">
              <div className="location-item-primary">
                <i className="fa-solid fa-location-crosshairs" />
                <div>
                  <h4>Manhattan Office</h4>
                  <p>200 Park Avenue</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Business Locations</h3>
            </div>
            <div className="card-body">
              <ul className="location-list">
                <li>
                  <a href="#">
                    <div>
                      <h4>Manhattan Office</h4>
                      <p>200 Park Avenue, New York, NY 10166</p>
                      <span className="tag tag-location">PRIMARY OFFICE</span>
                    </div>
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div>
                      <h4>Client Meeting - Morrison & Associates</h4>
                      <p>350 Fifth Avenue, New York, NY 10118</p>
                      <span className="tag tag-location">CLIENT LOCATION</span>
                    </div>
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div>
                      <h4>Court House</h4>
                      <p>60 Centre St, New York, NY 10007</p>
                    </div>
                    <i className="fa-solid fa-chevron-right" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <script src="/js/main.js"></script>
    </main>
  );
}
