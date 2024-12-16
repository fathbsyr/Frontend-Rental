import Topbar from "./Topbar";
import Search from "./Search";
function Navbar() {
  return (
    <div>
      {/* Topbar Start */}
      <Topbar />
      {/* Topbar End */}
      {/* Navbar Start */}
      <div className="container-fluid position-relative nav-bar p-0">
        <div className="position-relative px-lg-5" style={{ zIndex: 9 }}>
          <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
            <a href className="navbar-brand">
              <h1 className="text-uppercase text-primary mb-1">El-Rental</h1>
            </a>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse justify-content-between px-3"
              id="navbarCollapse"
            >
              <div className="navbar-nav ml-auto py-0">
                <a href="/" className="nav-item nav-link">
                  Home
                </a>
                <a href="about.html" className="nav-item nav-link">
                  About
                </a>
                <a href="/cars" className="nav-item nav-link">
                  Cars
                </a>
                <a href="contact.html" className="nav-item nav-link">
                  Contact
                </a>
                <a href="contact.html" className="nav-item nav-link">
                  Login
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
      {/* Search Start */}
      <Search />
      {/* Search End */}
    </div>
  );
}
export default Navbar;
