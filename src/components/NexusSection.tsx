"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";

export function NexusSection() {
    return (
        <section className="relative min-h-screen bg-[#8E9487] flex items-center justify-center py-20 overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="hidden lg:block absolute -left-16 top-1/2 -rotate-90 text-sm tracking-[0.2em] font-medium opacity-60 origin-center">
                            HOW FOLLOW.ART WORKS?
                        </span>

                        <h2 className="text-[10vw] lg:text-[100px] leading-[0.9] font-black uppercase mb-8">
                            Your <span className="text-[#0a0a0f]">Nexus</span>
                        </h2>

                        <p className="text-xl lg:text-2xl font-medium leading-relaxed max-w-lg mb-8 opacity-90">
                            Join Nexus of Curators & Artists, built on collaboration.
                            No gatekeeping and competition.
                        </p>

                        <motion.div
                            animate={{ rotate: 180, scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="text-4xl inline-block text-[#0a0a0f]"
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

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer pointer-events-none" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
