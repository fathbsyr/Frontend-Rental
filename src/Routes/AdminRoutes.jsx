import { Routes, Route, Navigate } from "react-router-dom";
import Mobil from "../Pages/Dash-Admin/Mobil";
import Reservasi from "../Pages/Dash-Admin/Reservasi";
import Pelanggan from "../Pages/Dash-Admin/Pelanggan";
import Promosi from "../Pages/Dash-Admin/Promosi";
import Dashboard from "../Pages/Dash-Admin/Dashboard";
import Ulasan from "../Pages/Dash-Admin/Ulasan";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="mobil" element={<Mobil />} />
      <Route path="reservasi" element={<Reservasi />} />
      <Route path="pelanggan" element={<Pelanggan />} />
      <Route path="promosi" element={<Promosi />} />
      <Route path="ulasan" element={<Ulasan />} />
      <Route path="*" element={<Navigate to="/admin/" />} />
    </Routes>
  );
};

export default AdminRoutes;
