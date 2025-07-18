import React from "react";
import { Routes, Route } from "react-router-dom";

import ClientDashboard from "../pages/user/Dashboard";
import Mood from "../pages/user/Mood";
import Routines from "../pages/user/Routines";
import Nutrition from "../pages/user/Nutrition";
import Contact from "../pages/user/Contact";
import About from "../pages/user/About";
import Authentication from "../pages/user/Authentication";
import MoodSection from "../components/mood/MoodSection";
import Landing from "../pages/user/Landing";
import NutritionsServices from "../components/nutritions/NutritionsServices";
import NutritionsCards from "../components/nutritions/NutritionsCards";
import MealPlans from "../components/nutritions/MealsPlan";
import MealsCards from "../components/nutritions/MealsCards"; 
import Planner from "../components/nutritions/Planner";

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
      <Route path="/mood/:mood" element={<MoodSection />} />
      <Route path="/nutrition/services" element={<NutritionsServices />} />
      <Route path="/nutrition/mealsplan" element={<MealPlans />} />
      <Route path="/nutrition-guide/:mood?" element={<NutritionsCards />} />
      <Route path="/mealplans" element={<MealsCards />} />
      <Route path="/nutrition/mealplanner" element={<Planner />} />
    </Routes>
  );
};

export default UserRoutes;