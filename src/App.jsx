import { Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Landing from "./pages/user/Landing";
import Login from "./pages/user/Auth/Login";
import Register from "./pages/user/Auth/Register";
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<AdminLogin />} />
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
