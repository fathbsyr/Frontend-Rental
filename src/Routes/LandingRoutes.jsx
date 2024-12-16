import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Landing/Home";
import Cars from "../Pages/Landing/Cars"

function LandingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default LandingRoutes;
