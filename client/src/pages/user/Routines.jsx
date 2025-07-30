import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play,CheckCircle } from "lucide-react";
import { exerciseImg, images } from "../../assets/images"; // make sure this path is valid

import Plan from "../../components/routines/Plan";
import Templete from "../../components/routines/RoutinesChoose";
import Service from "../../components/routines/RoutinesService";

import Hydration from "../../components/routines/Hydration";

import Life from "../../components/routines/LifeRoutines"
import RoutinesHero from "../../components/routines/RoutinesHero";
import RoutinesScroll from "../../components/routines/RoutinesScroll";
import RoutinesChoose from "../../components/routines/RoutinesChoose";
import RoutinesService from "../../components/routines/RoutinesService";
import LifeRoutines from "../../components/routines/LifeRoutines";
import RoutinesHydration from "../../components/routines/RoutinesHydration";
import RoutinesHistory from "../../components/routines/RoutinesHistory";
import Header from "../../components/common/Header";
import Footer from '../../components/common/Footer';

export default function Routines() {


  return (
    <>
    <Header/>
      

      <section className="bg-black">
        <RoutinesHero/>
        <RoutinesScroll/>
        <RoutinesChoose/>
        <RoutinesService/>
        <LifeRoutines/>
        <RoutinesHydration/>
        <RoutinesHistory/>
      </section>

    
   


     <Footer/>
    </>
  );
}
