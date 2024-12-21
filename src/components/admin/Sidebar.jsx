import { Link } from "react-router-dom";

function Sidebar() {
    return (
      <ul
        className="navbar-nav sidebar sidebar-dark accordion"
        id="accordionSidebar" style={{ backgroundColor: "#2b2e4a" }}
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/admin/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
          </div>
          <div className="sidebar-brand-text mx-3">El-Rental</div>
        </a>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item">
            <Link to="/admin" className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
            </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Nav Item - mobil */}
        <li className="nav-item">
          <Link to="/admin/mobil" className="nav-link">
            <i className="fas fa-fw fa-car"></i>
            <span>Mobil</span>
          </Link>
        </li>

        {/* Nav Item - pelanggan */}
        <li class="nav-item">
          <Link to="/admin/pelanggan" className="nav-link">
            <i class="fa-solid fa-users"></i>
            <span>Pelanggan</span>
          </Link>
        </li>

        {/* Nav Item - reservasi */}
        <li class="nav-item">
          <Link to="/admin/reservasi" className="nav-link">
            <i class="fa-solid fa-calendar"></i>
            <span>Reservasi</span>
          </Link>
        </li>

        <li class="nav-item">
          <Link to="/admin/pembayaran" className="nav-link">
            <i className="fa-solid fa-money-bill"></i>
            <span>Pembayaran</span>
          </Link>
        </li>

        {/* Nav Item - promosi */}
        <li class="nav-item">
          <Link to="/admin/promosi" className="nav-link">
            <i class="fa-solid fa-tags"></i>
            <span>Promosi</span>
          </Link>
        </li>

        {/* Nav Item - pelanggan */}
        <li class="nav-item">
          <Link className="nav-link" to="/admin/denda">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>Denda</span>
          </Link>
        </li>

        <li class="nav-item">
          <Link to="/admin/ulasan" className="nav-link">
            <i class="fa-solid fa-file-pen"></i>
            <span>Ulasan</span>
          </Link>
        </li>

        {/* Divider */}
        <hr class="sidebar-divider d-none d-md-block" />
      </ul>
    );
}

export default Sidebar;

