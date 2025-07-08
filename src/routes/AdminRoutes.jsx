import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./AppRoutes";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import RoutinesManager from "../pages/admin/RoutinesManager";
import NutritionManager from "../pages/admin/NutritionManager";
import MoodMonitor from "../pages/admin/MoodMonitor";
import Analytics from "../pages/admin/Analytics";

const AdminRoutes = () => (
  <>
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <Users />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/routines"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <RoutinesManager />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/nutrition"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <NutritionManager />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/moods"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <MoodMonitor />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/analytics"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <Analytics />
        </ProtectedRoute>
      }
    />
  </>
);

export default AdminRoutes;
