"use client";

import { motion } from "motion/react";
import { Mail, Bot, Sparkles, ArrowRight, ArrowDown } from "lucide-react";

export function ContactSection() {
    return (
        // Height adjusted: Increased to 90vh to satisfy "kurang tinggi dikit lagi"
        <section className="min-h-[90vh] bg-[#8498AC] flex flex-col items-center justify-center pt-20 pb-10 relative overflow-hidden">
            {/* Background noise/grain for texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

            <div className="container mx-auto px-4 md:px-12 text-center relative z-10 h-full flex flex-col justify-between">

                {/* Top Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                >
                    <h2 className="text-[8vw] lg:text-[70px] font-black uppercase leading-none mb-6 tracking-tight">
                        Ready to <br /> <span className="text-[#0a0a0f]">Get Started?</span>
                    </h2>

                    <p className="text-xl lg:text-2xl max-w-xl mx-auto font-medium opacity-90">
                        Chat with Oline, our AI assistant, or drop us an email
                    </p>
                </motion.div>

                {/* Center Diagram (Wide & Short) */}
                <div className="flex-grow flex flex-col items-center justify-center relative w-full">
                    {/* Diagram Container */}
                    <div className="relative w-full max-w-4xl h-[120px] mb-2">
                        {/* 
                           SVG Geometry:
                           ViewBox: 0 0 100 100
                           Targeting precise alignment with icons below.
                        */}
                        <svg
                            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none stroke-white/50 stroke-2"
                            style={{ strokeDasharray: "6 6" }}
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            {/* Center Drop */}
                            <path d="M 50 0 L 50 40" fill="none" vectorEffect="non-scaling-stroke" />

                            {/* Smooth Curves to endpoints - Adjusted for neatness */}
                            <path d="M 50 40 Q 50 70 6 90" fill="none" vectorEffect="non-scaling-stroke" />
                            <path d="M 50 40 Q 50 70 94 90" fill="none" vectorEffect="non-scaling-stroke" />
                        </svg>

                        {/* Arrow Heads */}
                        <motion.div
                            className="absolute bottom-2 left-[6%] -translate-x-1/2 rotate-[-30deg]"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <ArrowDown className="w-6 h-6 text-white" />
                        </motion.div>

                        <motion.div
                            className="absolute bottom-2 left-[94%] -translate-x-1/2 rotate-[30deg]"
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        >
                            <ArrowDown className="w-6 h-6 text-white" />
                        </motion.div>
                    </div>

                    {/* Icons (Wide Spread - Justify Between) */}
                    <div className="flex justify-between w-full max-w-4xl px-4 md:px-8 relative">
                        {/* Email Icon Button */}
                        <a
                            href="mailto:emailardhana@gmail.com"
                            title="Send Email"
                            className="w-20 h-20 md:w-24 md:h-24 bg-white text-black rounded-3xl flex items-center justify-center hover:bg-[#F4793A] hover:text-white hover:rotate-6 hover:scale-110 transition-all duration-300 shadow-xl group"
                        >
                            <Mail className="w-10 h-10 group-hover:animate-bounce" />
                        </a>

                        {/* Chat Trigger Button - AI Bot Icon */}
                        <button
                            onClick={() => window.dispatchEvent(new Event('open-onlinein-chat'))}
                            title="Chat with Oline AI"
                            className="w-20 h-20 md:w-24 md:h-24 bg-[#F4793A] text-white rounded-3xl flex items-center justify-center hover:rotate-6 hover:scale-110 transition-all duration-300 shadow-xl group cursor-pointer relative"
                        >
                            <Bot className="w-12 h-12 group-hover:animate-pulse" />
                            <Sparkles className="w-5 h-5 absolute top-2 right-2 text-yellow-300 animate-pulse" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
