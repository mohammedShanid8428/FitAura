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

export default function MoodSection() {
  const { mood } = useParams();


  return (
    <>
      <Hero mood={mood} />
      <Enhance mood={mood} />
      <Nutrions mood={mood} />
      <Rountine mood={mood} />
      <Tips mood={mood} />
      <MindTips mood={mood} />
      <DailyChallenge mood={mood} />
      <Affirmation mood={mood} />
    </>
  );
}
