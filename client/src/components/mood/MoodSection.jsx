import React from "react";
import { useParams } from "react-router-dom";

// Mood-based components
import Hero from "./Hero";
import EnhanceTips from "./EnhanceTips";
import NutritionsTips from "./NutritionsTips";
import RountinesTips from "./RoutinesTips";
import OurTips from "./OurTips";
import MindTips from "./MindTIps";
import DailyChallenge from "./DailyChallenge";
import Affirmation from "./Affirmation";
import Header from "../landing/Header";


export default function MoodSection(){
  const {mood}=useParams();

  return(
    <>
    <Header/>
    <section className="bg-gray-900">
      <Hero mood={mood}/>
      <EnhanceTips mood={mood}/>
      <NutritionsTips mood={mood}/>
      <RountinesTips mood={mood}/>
      <OurTips mood={mood}/>
      <MindTips mood={mood}/>
      <DailyChallenge mood={mood}/>
      <Affirmation mood={mood}/>
      
    </section>
    </>
  )
}
