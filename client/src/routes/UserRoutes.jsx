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
import MealPlans from "../components/nutritions/MealsPlan";
import MealsCards from "../components/nutritions/MealsCards"; 
import Planner from "../components/nutritions/NutritionPlanner";
import RoutinesService from "../components/routines/RoutinesService";
import RoutinesYoga from "../components/routines/RoutinesYoga";
import RoutinesStrech from "../components/routines/RoutinesStrech";
import RoutinePlayer from "../components/routines/RoutinePlanner";
import RoutineComplete from "../components/routines/RoutineComplete";
import HydrationPlan from "../components/routines/HydrationPlan";
import Saved from "../components/nutritions/Saved";
import NutritionGuidePage from "../components/nutritions/NutritionGuide";

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
      <Route path="/mealplans" element={<MealsCards />} />
      <Route path="/nutrition/mealplanner" element={<Planner />} />
       <Route path="routines/service" element={<RoutinesService />} />
        <Route path="routines/hydrationplan" element={<HydrationPlan/>} />
      <Route path="/routine/complete" element={<RoutineComplete />} />
        <Route path="routines/stretch" element={<RoutinesStrech />} />
        <Route path="routines/Planner" element={<RoutinePlayer />} />
        <Route path="routines/yoga" element={<RoutinesYoga />} />
        <Route path="routines/save" element={<Saved/>} />
        <Route path="/nutrition-guide/:category" element={<NutritionGuidePage />} />
    </Routes>
  );
};

export default UserRoutes;