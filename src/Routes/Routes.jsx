import { Routes, Route, Navigate } from "react-router-dom";
import Mobil from "../Pages/Dash-Admin/Mobil";
import Reservasi from "../Pages/Dash-Admin/Reservasi";
import Pelanggan from "../Pages/Dash-Admin/Pelanggan";
import Promosi from "../Pages/Dash-Admin/Promosi";
import Dashboard from "../Pages/Dash-Admin/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/mobil" element={<Mobil />} />
        <Route path="/admin/reservasi" element={<Reservasi />} />
        <Route path="/admin/pelanggan" element={<Pelanggan />} />
        <Route path="/admin/promosi" element={<Promosi />} />
    </Routes>
  );
};

export default AppRoutes;
