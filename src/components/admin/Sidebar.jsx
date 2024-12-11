import { Link } from "react-router-dom";

function Sidebar() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
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
          <Link to="/admin/Pelanggan" className="nav-link">
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
          <a class="nav-link" href="tables.html">
            <i className="fa-solid fa-money-bill"></i>
            <span>Pembayaran</span>
          </a>
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
          <a class="nav-link" href="tables.html">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>Denda</span>
          </a>
        </li>

        {/* Divider */}
        <hr class="sidebar-divider d-none d-md-block" />
      </ul>
    );
}

export default Sidebar;

