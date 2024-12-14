import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Landing/Home";

function LandingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default LandingRoutes;
