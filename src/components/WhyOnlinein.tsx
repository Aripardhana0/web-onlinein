"use client";

import { motion } from "motion/react";
import { Check, Zap, Smartphone, Heart, Shield, Layers } from "lucide-react";

export function WhyOnlinein() {
    return (
        <section className="min-h-screen bg-[#C5939D] flex items-center py-20 overflow-hidden relative">
            {/* Floating Circles */}
            <div className="absolute left-10 top-20 w-32 h-32 border-4 border-white/10 rounded-full animate-bounce delay-700" />
            <div className="absolute right-10 bottom-20 w-48 h-48 border-4 border-white/10 rounded-full animate-pulse delay-1000" />

            <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Text - Top on Mobile */}
                <motion.div
                    className="order-1 lg:order-1"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Relaxed letter spacing */}
                    <h2 className="text-[10vw] lg:text-[80px] font-black uppercase leading-[1] mb-8 tracking-normal">
                        Why Choose <br /> <span className="text-white">Onlinein?</span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            "Web design that converts visitors into customers",
                            "Automation that saves you 20+ hours every week",
                            "AI chatbots that handle leads while you sleep",
                            "Fast execution — no endless meetings",
                            "Scalable systems that grow with your business"
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                className="flex items-center gap-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-xl font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Card Deck (Fan Effect) - Bottom on Mobile */}
                <div className="relative h-[400px] md:h-[500px] perspective-[1000px] flex items-center justify-center order-2 lg:order-2 mt-10 lg:mt-0">
                    {[
                        { icon: Zap, color: "text-orange-500", bg: "bg-orange-100", title: "Fast", desc: "Built for speed" },
                        { icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-100", title: "Mobile", desc: "Responsive first" },
                        { icon: Heart, color: "text-pink-500", bg: "bg-pink-100", title: "Crafted", desc: "Pixel-perfect" },
                        { icon: Shield, color: "text-blue-500", bg: "bg-blue-100", title: "Secure", desc: "Industry standard" },
                        { icon: Layers, color: "text-purple-500", bg: "bg-purple-100", title: "Scale", desc: "Grows with you" },
                    ].map((card, i) => {
                        // Fan Logic: Wider spread (-30deg to +30deg)
                        const rotation = -30 + (i * 15);
                        const xOffset = (i - 2) * 40; // Horizontal spread

                        // Mobile Logic: Reduce spread
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                        // Note: JS window check in render might cause hydration mismatch. 
                        // Better to rely on CSS or Media Queries, but for inline framer motion styles, we can use simple constants that likely won't break heavily or just reduce values generally.

                        // Let's us standard responsive variants or just smaller hardcoded values that work for both if possible.
                        // Actually, on mobile, a fan is hard to see. 

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-[220px] h-[300px] md:w-[240px] md:h-[320px] bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 text-center border border-black/5 origin-bottom"
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    rotate: rotation, // We can keep rotation but maybe scale it down with CSS classes if needed, but Motion handles it inline.
                                    x: xOffset
                                }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -60,
                                    scale: 1.1,
                                    rotate: 0,
                                    zIndex: 100,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                }}
                                style={{
                                    zIndex: i * 10,
                                    // For mobile we might want less spread. But hard to do conditionally in map without hooks.
                                    // Let's rely on the container centering.
                                }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <div className={`w-16 h-16 ${card.bg} rounded-full flex items-center justify-center mb-4`}>
                                    <card.icon className={`w-8 h-8 ${card.color}`} />
                                </div>
                                <h3 className="text-black font-bold text-lg mb-1">{card.title}</h3>
                                <p className="text-gray-500 text-xs">{card.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
