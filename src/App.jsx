import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayouts from "./Layouts/AdminLayouts";
import AdminRoutes from "./Routes/AdminRoutes";
import PelangganRoutes from "./Routes/PelangganRoutes";
import PelangganLayouts from "./Layouts/PelangganLayouts";
import LandingLayout from "./Layouts/LandingLayout";
import LandingRoutes from "./Routes/LandingRoutes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import LoginAdmin from "./Pages/Login/LoginAdmin/Login";
import ForgotPasswordAdmin from "./Pages/Login/LoginAdmin/Forgot";
import ResetPasswordAdmin from "./Pages/Login/LoginAdmin/Reset";
import LoginPelanggan from "./Pages/Login/LoginPelanggan/Login";
import Registrasi from "./Pages/Login/LoginPelanggan/Registrasi";
import ForgotPassword from "./Pages/Login/LoginPelanggan/Forgot";
import ResetPassword from "./Pages/Login/LoginPelanggan/Reset";
function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoutes requiredRole="admin">
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
            <ProtectedRoutes requiredRole="pelanggan">
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
        {/* administrator */}
        <Route path="/login-admin" element={<LoginAdmin />} />
        <Route path="/forgot-password-admin" element={<ForgotPasswordAdmin />} />
        <Route path="/reset-password-admin" element={<ResetPasswordAdmin />} />
        {/* pelanggan */}
        <Route path="/login" element={<LoginPelanggan />} />
        <Route path="/registrasi" element={<Registrasi />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
