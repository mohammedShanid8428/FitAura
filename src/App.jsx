import { Routes,Route,Navigate } from "react-router-dom";
// import {useAuth} from "./context/AuthContext";
import ProtectedRoute from "./routes/AppRoutes";


//User Pages

import Landing  from "./pages/user/Landing";
import Login from "./pages/user/Auth/Login";
import Register from "./pages/user/Auth/Register";
import ClientDashboard from "./pages/user/Dashboard";
import Mood from "./pages/user/Mood";
import Routines from "./pages/user/Routines";
import Nutrition from "./pages/user/Nutrition";
import Contact from "./pages/user/Contact";
import About from "./pages/user/About";

//Admin Pages

import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import RoutinesManager from "./pages/admin/RoutinesManager";
import NutritionManager from "./pages/admin/NutritionManager";
import MoodMonitor from "./pages/admin/MoodMonitor";
import Analytics from "./pages/admin/Analytics";

import Unauthorized from "./pages/Unauthorized";

export default function App(){
  // const {user}=useAuth();

  return(

    // public Routes

    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route path="/Unauthorized" element={<Unauthorized/>}/>

    {/* Clients Routes */}

    <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user"]}>
      <ClientDashboard/>
    </ProtectedRoute>}/>
    <Route path="/mood" element={<ProtectedRoute allowedRoles={["user"]}>
      <Mood/>
    </ProtectedRoute>}/>
    <Route path="/routines" element={<ProtectedRoute allowedRoles={["user"]}>
      <Routines/>
    </ProtectedRoute>}/>
    <Route path="/nutrition" element={<ProtectedRoute allowedRoles={["user"]}>
      <Nutrition/>
    </ProtectedRoute>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/contact" element={<Contact/>}/>

    {/* Admin Routes */}

    <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard/>
    </ProtectedRoute>}/>
    <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Users/>
    </ProtectedRoute>}/>
    <Route path="/admin/routines" element={<ProtectedRoute allowedRoles={["admin"]}>
      <RoutinesManager/>
    </ProtectedRoute>}/>
    <Route path="/admin/nutrition" element={<ProtectedRoute allowedRoles={["admin"]}>
      <NutritionManager/>
    </ProtectedRoute>}/>
    <Route path="/admin/moods" element={<ProtectedRoute allowedRoles={["admin"]}>
      <MoodMonitor/>
    </ProtectedRoute>}/>
    <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={["admin"]}>
      <Analytics/>
    </ProtectedRoute>}/>

    {/* Fallback */}

    <Route path="*" element={<Navigate to="/"/>}/>



    </Routes>


  )
}