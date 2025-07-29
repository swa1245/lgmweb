"use client";

import Hero from "@/components/Hero";
import History from "@/components/History";
import CarbonFiber from "@/components/CarbonFiber";
import SkateFoam from "@/components/SkateFoam";
import OnePieceConstruction from "@/components/OnePieceConstruction";
import Footer from "@/components/Footer"; // ✅ import Footer

export default function Home() {
  return (
    <main>
      <Hero />
      <History />
      <CarbonFiber />
      <SkateFoam />
      <OnePieceConstruction />
      <Footer /> 
    </main>
  );
}
