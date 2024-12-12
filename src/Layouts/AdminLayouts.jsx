import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";
import Footer from "../components/admin/Footer";
function AdminLayouts({ children }) {
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

export default AdminLayouts;
