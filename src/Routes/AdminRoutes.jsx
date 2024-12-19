import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dash-Admin/Dashboard";
import Mobil from "../Pages/Dash-Admin/mobil/Mobil";
import AddMobil from "../Pages/Dash-Admin/mobil/AddMobil";
import Reservasi from "../Pages/Dash-Admin/reservasi/Reservasi";
import Pelanggan from "../Pages/Dash-Admin/pelanggan/Pelanggan";
import AddPelanggan from "../Pages/Dash-Admin/pelanggan/AddPelanggan";
import Promosi from "../Pages/Dash-Admin/promosi/Promosi";
import AddPromosi from "../Pages/Dash-Admin/promosi/AddPromosi";
import Ulasan from "../Pages/Dash-Admin/ulasan/Ulasan";
import AddUlasan from "../Pages/Dash-Admin/ulasan/AddUlasan";
import Denda from "../Pages/Dash-Admin/denda/Denda";
import Pembayaran from "../Pages/Dash-Admin/pembayaran/Pembayaran";
import AddPembayaran from "../Pages/Dash-Admin/pembayaran/AddPembayaran";
import AddPelanggan from "../Pages/Dash-Admin/pelanggan/AddPelanggan";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="mobil" element={<Mobil />} />
      <Route path="mobil/add" element={<AddMobil />} />
      <Route path="reservasi" element={<Reservasi />} />
      <Route path="pelanggan" element={<Pelanggan />} />
      <Route path="pelanggan/add" element={<AddPelanggan />} />
      <Route path="promosi" element={<Promosi />} />
      <Route path="promosi/add" element={<AddPromosi />} />
      <Route path="ulasan" element={<Ulasan />} />
      <Route path="ulasan/add" element={<AddUlasan />} />
      <Route path="denda" element={<Denda />} />
      <Route path="pembayaran" element={<Pembayaran />} />
      <Route path="pembayaran/add" element={<AddPembayaran />} />
      <Route path="*" element={<Navigate to="/admin/" />} />
    </Routes>
  );
};

export default AdminRoutes;
