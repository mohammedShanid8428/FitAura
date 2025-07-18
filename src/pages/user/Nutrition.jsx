import React from "react";

import Header from "../../components/Header";
import NutritionsServices from "../../components/nutritions/NutritionsServices";
import NutritionHero from "../../components/nutritions/NutritionHero";
import HealthyTips from "../../components/nutritions/HealthyTips";
import HealthyBite from "../../components/nutritions/HealthyBite";
import MealPlans from "../../components/nutritions/MealsPlan";
import NutritionsExplore from "../../components/nutritions/NutritionsExplore";
import NutritionHistory from "../../components/nutritions/NutritionHistory";


export default function NutritionCarousel() {
  return (
    <>
      <Header />

      <section className="bg-gray-900 space-y-8">
        <NutritionHero />
        <HealthyTips />
        <HealthyBite />
        <MealPlans />
        <NutritionsExplore />
        <NutritionsServices />
        <NutritionHistory />
      </section >



    </>

  );
}
