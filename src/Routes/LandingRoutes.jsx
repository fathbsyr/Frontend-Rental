import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Cars from "../Pages/Landing/Cars"
import About from "../Pages/Landing/About"
import Contact from "../Pages/Landing/Contact"
import LoginAdmin from "../Pages/Login/LoginAdmin/Login";
import LoginPelanggan from "../Pages/Login/LoginPelanggan/Login";
import Registrasi from "../Pages/Login/LoginPelanggan/Registrasi";
function LandingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/login" element={<LoginPelanggan />} />
      <Route path="/registrasi" element={<Registrasi />} />
    </Routes>
  );
}

export default LandingRoutes;
