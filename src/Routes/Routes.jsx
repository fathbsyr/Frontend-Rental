import { Routes, Route } from "react-router-dom";
import Mobil from "../Pages/Dash-Admin/Mobil";
import Reservasi from "../Pages/Dash-Admin/Reservasi";
import Pelanggan from "../Pages/Dash-Admin/Pelanggan";
import Promosi from "../Pages/Dash-Admin/Promosi";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/mobil" element={<Mobil />} />
      <Route path="/admin/reservasi" element={<Reservasi />} />
      <Route path="/admin/pelanggan" element={<Pelanggan />} />
      <Route path="/admin/promosi" element={<Promosi />} />
    </Routes>
  );
};

export default AppRoutes;
