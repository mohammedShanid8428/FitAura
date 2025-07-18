import React from "react";
import { useParams } from "react-router-dom";

// Mood-based components
import Hero from "./Hero";
import Enhance from "./Enhance";
import Nutrions from "./Nutrions";
import Rountine from "./Rountine";
import Tips from "./Tips";
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
    </section>
    </>
  )
}
