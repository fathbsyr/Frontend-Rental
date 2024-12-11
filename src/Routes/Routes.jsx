import { Routes, Route } from "react-router-dom";
import Mobil from "../Pages/Dash-Admin/Mobil";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/mobil" element={<Mobil />} />
      <Route path="/admin/mobil" element={<Mobil />} />
      <Route path="/admin/mobil" element={<Mobil />} />
    </Routes>
  );
};

export default AppRoutes;
