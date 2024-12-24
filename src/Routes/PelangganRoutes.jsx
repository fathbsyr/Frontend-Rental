import { Routes, Route, Navigate } from "react-router-dom";
import Mobil from "../Pages/Dash-Pelanggan/Mobil";
import Dashboard from "../Pages/Dash-Pelanggan/Dashboard";
import Promosi from "../Pages/Dash-Pelanggan/Promosi";
import Reservasi from "../Pages/Dash-Pelanggan/Reservasi/Reservasi";
import AddReservasi from "../Pages/Dash-Pelanggan/Reservasi/AddReservasi";
import Ulasan from "../Pages/Dash-Pelanggan/Ulasan/Ulasan";
import AddUlasan from "../Pages/Dash-Pelanggan/Ulasan/AddUlasan";
import Pembayaran from "../Pages/Dash-Pelanggan/Pembayaran/Pembayaran";
import Denda from "../Pages/Dash-Pelanggan/Denda";
const PelangganRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="mobil" element={<Mobil />} />
        <Route path="reservasi" element={<Reservasi />} />
        <Route path="reservasi/add" element={<AddReservasi />} />
        <Route path="promosi" element={<Promosi />} />
        <Route path="ulasan" element={<Ulasan />} />
        <Route path="ulasan/add" element={<AddUlasan />} />
        <Route path="pembayaran" element={<Pembayaran />} />
        <Route path="denda" element={<Denda />} />
        <Route path="*" element={<Navigate to="/dashboard/" />} />
      </Routes>
    </>
  );
};

export default PelangganRoutes;
