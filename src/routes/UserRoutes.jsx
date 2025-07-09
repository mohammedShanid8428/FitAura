import React from "react";

import { Route } from "react-router-dom";
import ProtectedRoute from "./AppRoutes";


// User pages
import ClientDashboard from "../pages/user/Dashboard";
import Mood from "../pages/user/Mood";
import Routines from "../pages/user/Routines";
import Nutrition from "../pages/user/Nutrition";
import Contact from "../pages/user/Contact";
import About from "../pages/user/About";


const UserRoutes = () => (
  <>
    {/* <Route
      path="/dashboard"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <ClientDashboard />
        </ProtectedRoute>
      }
    /> */}
    {/* <Route
      path="/mood"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <Mood />
        </ProtectedRoute>
      }
    /> */}
    {/* <Route
      path="/routines"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <Routines />
        </ProtectedRoute>
      }
    /> */}
    {/* <Route
      path="/nutrition"
      element={
        <ProtectedRoute allowedRoles={["user"]}>
          <Nutrition />
        </ProtectedRoute>
      }
    /> */}
    <Route path="/contact" element={<Contact />} />
    <Route path="/nutrition" element={<Nutrition />} />
    <Route path="/routines" element={<Routines />} />
    <Route path="/mood" element={<Mood />} />
    <Route path="/about" element={<About />} />
    <Route path="/dashboard" element={<ClientDashboard />} />
  
  </>
);

export default UserRoutes;
