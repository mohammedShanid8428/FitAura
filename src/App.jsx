import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Landing from "./pages/user/Landing";
import Authentication from "./pages/user/Authentication";
;
import AdminLogin from "./pages/admin/Login";
import Unauthorized from "./pages/Unauthorized";

// Route Groups
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
     <Route path="/auth" element={<Authentication />} />
      {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* User Routes */}
      {UserRoutes()}

      {/* Admin Routes */}
      {AdminRoutes()}

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
