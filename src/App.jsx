import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayouts from './Layouts/AdminLayouts';
import AdminRoutes from './Routes/AdminRoutes';
import LandingLayout from "./Layouts/LandingLayout";
import LandingRoutes from "./Routes/LandingRoutes";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<AdminLayouts><AdminRoutes /></AdminLayouts>} />

        {/* Landing Page */}
        <Route path="/*" element={<LandingLayout><LandingRoutes /></LandingLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
