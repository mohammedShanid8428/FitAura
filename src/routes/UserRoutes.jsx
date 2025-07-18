import React from "react";
import { Routes, Route } from "react-router-dom";

import ClientDashboard from "../pages/user/Dashboard";
import Mood from "../pages/user/Mood";
import Routines from "../pages/user/Routines";
import Nutrition from "../pages/user/Nutrition";
import Contact from "../pages/user/Contact";
import About from "../pages/user/About";
import Authentication from "../pages/user/Authentication";
import MoodSection from "../components/mood/MoodSection"
import Landing from "../pages/user/Landing"

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<ClientDashboard />} />
      <Route path="/" element={<Landing />} />
      <Route path="/mood" element={<Mood />} />
      <Route path="/routines" element={<Routines />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth/login" element={<Authentication />} />
      <Route path="/auth/register" element={<Authentication />} />
      <Route path="/mood/:mood" element={<MoodSection />}/>
    </Routes>
  );
};

export default UserRoutes;
