import Footer from './components/admin/Footer';
import Navbar from './components/admin/Navbar';
import Sidebar from './components/admin/Sidebar';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from './Routes/Routes';

function App() {
  return (
    <Router>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <div className="container-fluid">
                <AppRoutes />
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </Router>
  );
}

export default App;
