import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Cars from "../Pages/Landing/Cars"
import About from "../Pages/Landing/About"
import Contact from "../Pages/Landing/Contact"
function LandingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default LandingRoutes;
