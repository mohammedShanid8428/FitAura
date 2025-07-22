import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import RoutinesManager from "../pages/admin/RoutinesManager";
import NutritionManager from "../pages/admin/NutritionManager";
import MoodMonitor from "../pages/admin/MoodMonitor";
import AdminContactMessages from "../pages/admin/AdminContactPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminDashboard />} />
      <Route path="users" element={<Users />} />
      <Route path="routines" element={<RoutinesManager />} />
      <Route path="nutrition" element={<NutritionManager />} />
      <Route path="moods" element={<MoodMonitor />} />
      <Route path="contact-messages" element={<AdminContactMessages />} />
      

    </Routes>
  );
};

export default AdminRoutes;
