import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";

function Navbar() {
  const [name, setName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    console.log("Stored name from localStorage:", storedName);
    if (storedName) {
      setName(storedName);
    } else {
      setError("Admin not logged in");
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars" />
        </button>
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>
        <Dropdown>
          <Dropdown.Toggle
            id="userDropdown"
            className="nav-link dropdown-toggle text-gray-600 d-flex align-items-center"
            as="a"
            role="button"
          >
            <span className="mr-2">
              {isLoading ? "Loading..." : name || error || "Unknown Pelanggan"}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-right shadow animated--grow-in">
            <Dropdown.Item onClick={handleLogout}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
    </div>
  );
}

export default Navbar;
