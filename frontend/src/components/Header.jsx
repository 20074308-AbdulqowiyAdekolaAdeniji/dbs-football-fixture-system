import './Header.css';

function Header() {
  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo-section">
          <h1>DBS Football</h1>
          <p className="tagline">Fixture Management System</p>
        </div>
        <nav className="main-nav">
          <a href="#fixtures" className="nav-link">Fixtures</a>
          <a href="#standings" className="nav-link">Standings</a>
          <a href="#stats" className="nav-link">Statistics</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;