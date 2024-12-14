import { Routes, Route, Navigate } from "react-router-dom";
import Mobil from "../Pages/Dash-Pelanggan/Mobil";
import Dashboard from "../Pages/Dash-Pelanggan/Dashboard";
import Promosi from "../Pages/Dash-Pelanggan/Promosi";
import Reservasi from "../Pages/Dash-Pelanggan/Reservasi";
import Ulasan from "../Pages/Dash-Pelanggan/Ulasan";
const PelangganRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="mobil" element={<Mobil />} />
        <Route path="reservasi" element={<Reservasi />} />
        <Route path="promosi" element={<Promosi />} />
        <Route path="ulasan" element={<Ulasan />} />
        <Route path="*" element={<Navigate to="/dashboard/" />} />
      </Routes>
    </>
  );
};

export default PelangganRoutes;
