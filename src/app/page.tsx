"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { StickySection } from "@/components/StickySection";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutOnlinein } from "@/components/AboutOnlinein";
import { Services } from "@/components/Services";
import { WhyOnlinein } from "@/components/WhyOnlinein";
import { WorkProcess } from "@/components/WorkProcess";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling during loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [loading]);

  return (
    <main className="relative w-full">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />

          {/* Anchor for Home/Top */}
          <div id="home" className="absolute top-0" />

          <StickySection zIndex={1} skew="none">
            <Hero />
          </StickySection>

          {/* Anchor for About */}
          <div id="about-onlinein" className="absolute top-[100vh]" />
          <StickySection zIndex={2} skew="left">
            <AboutOnlinein />
          </StickySection>

          {/* Anchor for Services */}
          <div id="services" className="absolute top-[200vh]" />
          <StickySection zIndex={3} skew="right">
            <Services />
          </StickySection>

          {/* Anchor for Why Onlinein */}
          <div id="why-onlinein" className="absolute top-[300vh]" />
          <StickySection zIndex={4} skew="left">
            <WhyOnlinein />
          </StickySection>

          {/* Anchor for Work Process */}
          <div id="work-process" className="absolute top-[400vh]" />
          <StickySection zIndex={5} skew="right">
            <WorkProcess />
          </StickySection>

          {/* Anchor for Contact */}
          <div id="contact" className="absolute top-[500vh]" />
          <div className="relative z-[10]">
            <ContactSection />
            <Footer />
          </div>

          {/* Floating Join Button */}
          <a href="#join" className="fixed bottom-8 right-8 z-50 bg-black/80 backdrop-blur-lg px-6 py-4 rounded-full flex items-center gap-3 border border-white/10 hover:scale-110 transition-transform duration-300 group">
            <span className="font-bold text-sm">Join</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 animate-pulse" />
          </a>

        </>
      )}
    </main>
  );
}
