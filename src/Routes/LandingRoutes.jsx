import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Cars from "../Pages/Landing/Cars"
import About from "../Pages/Landing/About"

function LandingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default LandingRoutes;
