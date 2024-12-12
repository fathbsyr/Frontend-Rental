import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayouts from './Layouts/AdminLayouts';
import AdminRoutes from './Routes/AdminRoutes';
import './assets/admin/css/sb-admin-2.min.css';
import './assets/admin/vendor/datatables/dataTables.bootstrap4.min.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard */}
        <Route path="/*" element={<AdminLayouts><AdminRoutes /></AdminLayouts>} />
      </Routes>
    </Router>
  );
}

export default App;
