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

                {/* Text */}
                <motion.div
                    className="order-2 lg:order-1"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Relaxed letter spacing */}
                    <h2 className="text-4xl md:text-[8vw] lg:text-[80px] font-black uppercase leading-[1] mb-8 tracking-normal">
                        Why Choose <br /> <span className="text-white">Onlinein?</span>
                    </h2>

                    <div className="space-y-6">
                        {[
                            "Built by young creatives who understand trends",
                            "Modern, clean, and Gen-Z friendly design",
                            "Fast development & responsive support",
                            "Mobile-first & user-focused",
                            "Not just websites — digital experiences"
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

                {/* Card Deck (Fan Effect) - Right/Order-2 */}
                <div className="relative h-[500px] perspective-[1000px] flex items-center justify-center order-1 lg:order-2">
                    {[
                        { icon: Zap, color: "text-orange-500", bg: "bg-orange-100", title: "Fast", desc: "Speed of culture" },
                        { icon: Smartphone, color: "text-emerald-500", bg: "bg-emerald-100", title: "Mobile", desc: "Optimized Layout" },
                        { icon: Heart, color: "text-pink-500", bg: "bg-pink-100", title: "Passion", desc: "Made with love" },
                        { icon: Shield, color: "text-blue-500", bg: "bg-blue-100", title: "Secure", desc: "Best practices" },
                        { icon: Layers, color: "text-purple-500", bg: "bg-purple-100", title: "Scale", desc: "Ready to grow" },
                    ].map((card, i) => {
                        // Fan Logic: Wider spread (-30deg to +30deg)
                        const rotation = -30 + (i * 15);
                        const xOffset = (i - 2) * 40; // Horizontal spread

                        return (
                            <motion.div
                                key={i}
                                className="absolute w-[240px] h-[320px] bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 text-center border border-black/5 origin-bottom"
                                style={{
                                    zIndex: i * 10,
                                    rotate: rotation,
                                    x: xOffset,
                                }}
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -60,
                                    scale: 1.1,
                                    rotate: 0,
                                    zIndex: 100,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
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
