import React from "react";


import NutritionsServices from "../../components/nutritions/NutritionsServices";
import NutritionHero from "../../components/nutritions/NutritionHero";
import HealthyTips from "../../components/nutritions/HealthyTips";
import HealthyBite from "../../components/nutritions/HealthyBite";
import MealPlans from "../../components/nutritions/MealsPlan";
import NutritionsExplore from "../../components/nutritions/NutritionsExplore";
import NutritionHistory from "../../components/nutritions/NutritionHistory";
import Header from "../../components/common/Header";
import Footer from '../../components/common/Footer';
import NutritionScroll from "../../components/nutritions/NutrtionScroll";

export default function NutritionCarousel() {
  return (
    <>
      <Header/>
    

      <section className="bg-gray-900 space-y-">
        <NutritionHero />
        <NutritionScroll/>
        <HealthyTips />
        <HealthyBite />
        <MealPlans />
        <NutritionsExplore />
        <NutritionsServices />
        <NutritionHistory />
      </section >

      

<Footer/>

    </>

  );
}
