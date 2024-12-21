import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dash-Admin/Dashboard";
import Mobil from "../Pages/Dash-Admin/mobil/Mobil";
import AddMobil from "../Pages/Dash-Admin/mobil/AddMobil";
import Reservasi from "../Pages/Dash-Admin/reservasi/Reservasi";
import Pelanggan from "../Pages/Dash-Admin/pelanggan/Pelanggan";
import AddPelanggan from "../Pages/Dash-Admin/pelanggan/AddPelanggan";
import Promosi from "../Pages/Dash-Admin/promosi/Promosi";
import AddPromosi from "../Pages/Dash-Admin/promosi/AddPromosi";
import EditPromosi from "../Pages/Dash-Admin/promosi/EditPromosi";
import Ulasan from "../Pages/Dash-Admin/ulasan/Ulasan";
import AddUlasan from "../Pages/Dash-Admin/ulasan/AddUlasan";
import Denda from "../Pages/Dash-Admin/denda/Denda";
import EditDenda from "../Pages/Dash-Admin/denda/EditDenda";
import AddDenda from "../Pages/Dash-Admin/denda/AddDenda";
import Pembayaran from "../Pages/Dash-Admin/pembayaran/Pembayaran";
import AddReservasi from "../Pages/Dash-Admin/reservasi/AddReservasi";
import AddPembayaran from "../Pages/Dash-Admin/pembayaran/AddPembayaran";
import EditMobil from "../Pages/Dash-Admin/mobil/EditMobil";
import EditUlasan from "../Pages/Dash-Admin/ulasan/EditUlasan";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="mobil" element={<Mobil />} />
      <Route path="mobil/add" element={<AddMobil />} />
      <Route path="mobil/edit/:id" element={<EditMobil />} />
      <Route path="reservasi" element={<Reservasi />} />
      <Route path="reservasi/add" element={<AddReservasi />} />
      <Route path="pelanggan" element={<Pelanggan />} />
      <Route path="pelanggan/add" element={<AddPelanggan />} />
      <Route path="promosi" element={<Promosi />} />
      <Route path="promosi/add" element={<AddPromosi />} />
      <Route path="promosi/edit/:id" element={<EditPromosi />} />
      <Route path="ulasan" element={<Ulasan />} />
      <Route path="ulasan/add" element={<AddUlasan />} />
      <Route path="ulasan/edit/:id" element={<EditUlasan />} />
      <Route path="denda" element={<Denda />} />
      <Route path="denda/add" element={<AddDenda />} />
      <Route path="denda/edit/:id" element={<EditDenda />} />
      <Route path="pembayaran" element={<Pembayaran />} />
      <Route path="pembayaran/add" element={<AddPembayaran />} />
      <Route path="*" element={<Navigate to="/admin/" />} />
    </Routes>
  );
};

export default AdminRoutes;
