import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dash-Admin/Dashboard";
import Mobil from "../Pages/Dash-Admin/mobil/Mobil";
import Reservasi from "../Pages/Dash-Admin/reservasi/Reservasi";
import Pelanggan from "../Pages/Dash-Admin/pelanggan/Pelanggan";
import Promosi from "../Pages/Dash-Admin/promosi/Promosi";
import Ulasan from "../Pages/Dash-Admin/ulasan/Ulasan";
import Denda from "../Pages/Dash-Admin/denda/Denda";
import Pembayaran from "../Pages/Dash-Admin/pembayaran/Pembayaran";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="mobil" element={<Mobil />} />
      <Route path="reservasi" element={<Reservasi />} />
      <Route path="pelanggan" element={<Pelanggan />} />
      <Route path="promosi" element={<Promosi />} />
      <Route path="ulasan" element={<Ulasan />} />
      <Route path="denda" element={<Denda />} />
      <Route path="pembayaran" element={<Pembayaran />} />
      <Route path="*" element={<Navigate to="/admin/" />} />
    </Routes>
  );
};

export default AdminRoutes;
