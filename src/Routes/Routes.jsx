import { Routes, Route } from "react-router-dom";
import Mobil from "../Pages/Dash-Admin/Mobil";
import Reservasi from "../Pages/Dash-Admin/Reservasi";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/mobil" element={<Mobil />} />
      <Route path="/admin/reservasi" element={<Reservasi />} />
      <Route path="/admin/mobil" element={<Mobil />} />
    </Routes>
  );
};

export default AppRoutes;
