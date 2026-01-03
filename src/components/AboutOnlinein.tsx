"use client";

import { motion } from "motion/react";
import { Play, Star } from "lucide-react";

export function AboutOnlinein() {
    return (
        <section className="relative min-h-screen bg-[#8E9487] flex items-center justify-center py-20 overflow-hidden">

            {/* New Abstract Ornaments to fill space */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Ornament Sparkles (Replaced Stars) */}
                        <div className="absolute -top-20 -left-20 text-[#0a0a0f] opacity-20 animate-[spin_10s_linear_infinite]">
                            <span className="text-[150px]">✦</span>
                        </div>
                        <div className="absolute top-1/2 right-0 text-[#F4793A] opacity-60 animate-[spin_8s_linear_infinite] text-[80px]">
                            ✦
                        </div>

                        <h2 className="text-[10vw] lg:text-[100px] leading-[0.9] font-black uppercase mb-8 relative z-10">
                            Who <br /> <span className="text-[#0a0a0f]">We Are</span>
                        </h2>

                        <p className="text-xl lg:text-2xl font-medium leading-relaxed max-w-lg mb-8 opacity-90">
                            Onlinein is a digital IT service powered by young innovators who love creating modern websites that actually work for your business.
                        </p>

                        <p className="text-lg leading-relaxed max-w-lg mb-8 opacity-80">
                            We believe websites shouldn’t look boring or outdated. That’s why every project we build is trendy, creative, and designed to match today’s digital lifestyle.
                            <br /><br />
                            <strong>Simple design, smart strategy, real results.</strong>
                        </p>

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="text-5xl inline-block text-[#0a0a0f]"
                        >
                            ✦
                        </motion.div>
                    </motion.div>
                </div>

                {/* Video Frame */}
                <motion.div
                    className="relative perspective-[1000px]"
                    initial={{ opacity: 0, x: 50, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: -8 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1, type: "spring", stiffness: 50 }}
                >
                    <div className="relative aspect-video bg-[#1a1a2e] rounded-3xl shadow-2xl overflow-hidden border border-white/10 group cursor-pointer hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out transform rotate-y-[-8deg] rotate-x-[5deg]">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-20 h-20 bg-[#F4793A] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play className="w-8 h-8 fill-white stroke-none ml-1" />
                            </motion.div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                            <p className="text-sm font-bold uppercase tracking-widest text-white/80">Our Culture</p>
                            <h3 className="text-2xl font-bold text-white">Watch how we create</h3>
                        </div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
