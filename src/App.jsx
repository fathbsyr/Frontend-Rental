import Footer from './components/admin/Footer';
import Navbar from './components/admin/Navbar';
import Sidebar from './components/admin/Sidebar';

function App() {
  return (
    <div id="page-top">
      {/* Page Wrapper */}
      <div id="wrapper">
        {/* Sidebar */}
        <Sidebar />
        {/* End of Sidebar */}

        {/* Content Wrapper */}
        <div id="content-wrapper" class="d-flex flex-column">
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <Navbar />
            {/* End of Topbar */}

            {/* Begin Page Content */}
            <div class="container-fluid">
              {/* Tempatkan konten Anda di sini */}
              <h1>Welcome to the Admin Dashboard!</h1>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}

          {/* Footer */}
          <Footer />
          {/* End of Footer */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}

      {/* Scroll to Top Button */}
      <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
      </a>
    </div>
  );
}

export default App;
