"use client";

import { motion } from "motion/react";
import { Mail, MessageCircle, ArrowRight, ArrowDown } from "lucide-react";

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
                    <h2 className="text-4xl md:text-[8vw] lg:text-[90px] font-black uppercase leading-none mb-6 tracking-tight">
                        Let's Build <br /> Your <span className="text-[#0a0a0f]">Website</span>
                    </h2>

                    <p className="text-xl lg:text-2xl max-w-xl mx-auto font-medium opacity-90">
                        Ready to bring your business online?
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
                           Icons are approx 80-100px wide at edges.
                           We use 5% and 95% which roughly aligns with center of icons on standard desktops.
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

                        {/* Arrow Heads - Aligned to path endpoints (6% and 94%) */}
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

                        {/* WhatsApp Icon Button */}
                        <a
                            href="https://wa.me/6287827556668"
                            title="Chat on WhatsApp"
                            className="w-20 h-20 md:w-24 md:h-24 bg-[#25D366] text-white rounded-3xl flex items-center justify-center hover:rotate-6 hover:scale-110 transition-all duration-300 shadow-xl group"
                        >
                            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white group-hover:animate-pulse">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
