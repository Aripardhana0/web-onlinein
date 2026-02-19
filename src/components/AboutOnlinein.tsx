"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";

export function AboutOnlinein() {
    return (
        <section className="relative min-h-screen bg-[#8E9487] flex items-center justify-center py-24 overflow-hidden">

            {/* Subtle background blobs */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full blur-3xl pointer-events-none" />

            {/* Ornament — top-left sparkle (subtle, fills empty space) */}
            <div className="absolute -top-10 -left-10 text-[#0a0a0f] opacity-[0.07] pointer-events-none select-none">
                <span className="text-[200px] font-thin">✦</span>
            </div>

            {/* Ornament — bottom-right sparkle */}
            <div className="absolute -bottom-16 -right-10 text-[#F4793A] opacity-[0.12] pointer-events-none select-none">
                <motion.span
                    className="text-[160px] inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    ✦
                </motion.span>
            </div>

            {/* Ornament — mid-left circle ring */}
            <div className="absolute left-[5%] top-[60%] w-24 h-24 border-2 border-white/10 rounded-full pointer-events-none" />

            {/* Ornament — top-right small dot cluster */}
            <div className="absolute right-[15%] top-[12%] flex gap-3 opacity-20 pointer-events-none">
                <div className="w-3 h-3 bg-white rounded-full" />
                <div className="w-2 h-2 bg-white rounded-full mt-1" />
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2" />
            </div>

            <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">

                {/* Text Content */}
                <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    {/* Small accent label */}
                    <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4 opacity-70">
                        Who We Are
                    </p>

                    {/* Heading */}
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] mb-6">
                        About <span className="text-[#0a0a0f]">Onlinein</span>
                    </h2>

                    {/* Main description */}
                    <p className="text-lg lg:text-xl font-medium leading-relaxed max-w-md mb-5 opacity-90">
                        We&apos;re a digital agency that combines <strong>creative design</strong> with <strong>smart automation</strong> to help businesses go online and scale faster
                    </p>

                    {/* Supporting detail */}
                    <p className="text-base leading-relaxed max-w-md mb-8 opacity-75">
                        From high-converting websites to AI chatbots that handle your customers 24/7 &mdash; we build systems that work while you sleep
                    </p>

                    {/* Tagline pill */}
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm rounded-full border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-[#F4793A] animate-pulse" />
                        <span className="text-sm font-bold tracking-wide">Pro Design &middot; Smart Automation &middot; Real Results</span>
                    </div>
                </motion.div>

                {/* Video Frame */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                >
                    <div className="relative aspect-video bg-[#1a1a2e] rounded-3xl shadow-2xl overflow-hidden border border-white/10 group cursor-pointer hover:shadow-3xl transition-shadow duration-500">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                className="w-20 h-20 bg-[#F4793A] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play className="w-8 h-8 fill-white stroke-none ml-1" />
                            </motion.div>
                        </div>

                        {/* Bottom text */}
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
