"use client";

import { motion } from "motion/react";

export function ConnectorySection() {
    return (
        <section className="min-h-screen bg-[#8E9487] py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-[10vw] lg:text-[80px] font-black uppercase leading-none mb-6">
                            <span className="font-playfair font-normal italic lowercase mr-4">the</span>
                            Connectory
                        </h2>
                        <p className="text-2xl font-medium opacity-90 max-w-md">
                            A dynamic directory to find who you need and get found by those who matter.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex items-end"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <p className="text-xl leading-relaxed opacity-80">
                            Think of it as the Yellow Pages for curators and artists.
                            No algorithms, no paywalls, no limits.
                            It's an open space for organic, community-driven networking.
                        </p>
                    </motion.div>
                </div>

                {/* Platform Mockup */}
                <motion.div
                    className="relative bg-[#0a0a0f] rounded-2xl shadow-2xl overflow-hidden border border-white/10 aspect-[16/9] lg:aspect-[21/9] perspective-[1000px]"
                    initial={{ opacity: 0, y: 60, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    whileHover={{ scale: 1.01 }}
                >
                    {/* Header */}
                    <div className="h-10 bg-[#1a1a2e] border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>

                    {/* Content */}
                    <div className="flex h-full p-6 gap-6">
                        {/* Sidebar */}
                        <div className="w-64 hidden lg:flex flex-col gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                            ))}
                        </div>

                        {/* Grid */}
                        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/5" />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
