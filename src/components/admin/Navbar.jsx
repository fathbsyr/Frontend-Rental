function Navbar () {
    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
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
                        <i className="fas fa-search fa-sm"></i>
                    </button>
                </div>
            </div>
        </form>

        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown no-arrow mx-1">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="alertsDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                </a>
            </li>
        </ul>
        </nav>
        // <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        //  aria-hidden="true">
        //  <div class="modal-dialog" role="document">
        //      <div class="modal-content">
        //          <div class="modal-header">
        //              <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
        //              <button class="close" type="button" data-dismiss="modal" aria-label="Close">
        //                  <span aria-hidden="true">×</span>
        //              </button>
        //          </div>
        //          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        //          <div class="modal-footer">
        //              <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
        //              <a class="btn btn-primary" href="login.html">Logout</a>
        //          </div>
        //      </div>
        //  </div>
        // </div>
    );
};
export default Navbar;