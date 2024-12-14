import "../assets/admin/css/sb-admin-2.min.css";
import "../assets/admin/vendor/datatables/dataTables.bootstrap4.min.css";
import Navbar from "../components/dash-pelanggan/Navbar";
import Sidebar from "../components/dash-pelanggan/Sidebar";
import Footer from "../components/dash-pelanggan/Footer";
function PelangganLayouts({ children }) {
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <div className="container-fluid">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </>
  );
}
export default PelangganLayouts;
