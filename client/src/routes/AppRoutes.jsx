import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>

      
      {/* User routes handle everything under '/' */}
      <Route path="/*" element={<UserRoutes />} />

      {/* Admin routes handle everything under '/admin' */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
