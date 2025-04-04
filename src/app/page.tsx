"use client"

import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import { HeroSection } from "@/components/herosection/page";
import { FeaturesSection } from "@/components/featuresection/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}

