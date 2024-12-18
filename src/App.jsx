import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayouts from "./Layouts/AdminLayouts";
import AdminRoutes from "./Routes/AdminRoutes";
import PelangganRoutes from "./Routes/PelangganRoutes";
import PelangganLayouts from "./Layouts/PelangganLayouts";
import LandingLayout from "./Layouts/LandingLayout";
import LandingRoutes from "./Routes/LandingRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* Admin Dashboard */}
    //     <Route path="/admin/*" element={<AdminLayouts><AdminRoutes /></AdminLayouts>} />

    //     {/* Pelanggan Dashboard */}
    //     <Route path="/dashboard/*" element={<PelangganLayouts><PelangganRoutes /></PelangganLayouts>} />
    //     {/* Landing Page */}
    //     <Route path="/*" element={<LandingLayout><LandingRoutes /></LandingLayout>} />
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        {/* Rute Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminLayouts>
                <AdminRoutes />
              </AdminLayouts>
            </ProtectedRoutes>
          }
        />

        {/* Rute Pelanggan */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes allowedRoles={["pelanggan"]}>
              <PelangganLayouts>
                <PelangganRoutes />
              </PelangganLayouts>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <LandingLayout>
              <LandingRoutes />
            </LandingLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
