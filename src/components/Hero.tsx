"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { FallingText } from "@/components/FallingText";

export function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center bg-[#F4793A] overflow-hidden px-4 md:px-12 pt-24 md:pt-0">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center h-full">

                {/* Physics Animation - Left */}
                <div className="relative w-full h-[50vh] md:h-[80vh] flex items-center justify-center order-1">
                    <FallingText />
                </div>

                {/* Text Content - Right */}
                <motion.div
                    className="z-10 text-left order-2 pt-10 md:pt-0 max-w-2xl pl-0 md:pl-12"
                    style={{ y, opacity }}
                >
                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base tracking-[0.2em] uppercase mb-4 opacity-90 font-bold"
                    >
                        The Modern Way
                    </motion.p>

                    {/* Headline - Larger and Wider */}
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="text-[14vw] md:text-[90px] font-black leading-[1] tracking-[0.05em] uppercase mb-6 w-full"
                    >
                        Turn Your <br /> Business <br /> <span className="text-white">Online.</span>
                    </motion.h1>

                    {/* Subheadline - Widened */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ delay: 0.6 }}
                        className="text-lg md:text-xl md:max-w-xl mb-10 leading-relaxed font-medium"
                    >
                        We help brands grow online through trendy landing pages, company profiles, and marketplaces — built by young, creative minds who follow the latest digital trends.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <a href="#contact" className="inline-flex items-center gap-3 px-8 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all group">
                            Let’s Build Your Website
                            <div className="w-8 h-8 rounded-full bg-[#0a0a0f] text-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.5 }}
            >
                <p className="text-xs tracking-[0.2em] uppercase mb-2">Scroll to explore</p>
                <div className="w-5 h-5 border-r-2 border-b-2 border-white rotate-45 mx-auto animate-bounce" />
            </motion.div>
        </section>
    );
}
