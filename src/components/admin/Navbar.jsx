import Dropdown from "react-bootstrap/Dropdown";
function Navbar() {
  return (
    <>
      <div>
        {/* Topbar */}
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          {/* Sidebar Toggle (Topbar) */}
          <button
            id="sidebarToggleTop"
            className="btn btn-link d-md-none rounded-circle mr-3"
          >
            <i className="fa fa-bars" />
          </button>
          {/* Topbar Search */}
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
          {/* Topbar Navbar */}
          <Dropdown>
            <Dropdown.Toggle
              id="userDropdown"
              className="nav-link dropdown-toggle text-gray-600 small"
              as="a"
              role="button"
            >
              <span className="mr-2 d-none d-lg-inline">Douglas McGee</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-right shadow animated--grow-in">
              <Dropdown.Item href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </nav>
        {/* End of Topbar */}
        {/* Logout Modal*/}
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
