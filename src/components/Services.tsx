"use client";

import { motion } from "motion/react";

const services = [
    {
        title: "Landing Page",
        tag: "One Page. Big Impact.",
        desc: "Perfect for promotions. Clean layout, strong CTA, and optimized to convert.",
        icon: "🚀"
    },
    {
        title: "Company Profile",
        tag: "Professional Presence.",
        desc: "Showcase your business identity with a modern and trustworthy website.",
        icon: "🏢"
    },
    {
        title: "Marketplace",
        tag: "Scalable Platform.",
        desc: "Custom solutions for your business needs. User-friendly and ready to grow.",
        icon: "🛍️"
    },
];

export function Services() {
    return (
        <section className="min-h-screen bg-[#8498AC] py-20 flex items-center relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-12 h-full flex flex-col justify-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 shrink-0"
                >
                    <h2 className="text-4xl md:text-[8vw] lg:text-[100px] font-black uppercase leading-none mb-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        What We <span className="text-[#0a0a0f]">Do Best</span>
                    </h2>
                    <p className="text-xl lg:text-2xl max-w-3xl leading-relaxed opacity-90">
                        Building digital experiences that matter.
                    </p>
                </motion.div>

                {/* Compact Grid to fit screen */}
                <div className="grid gap-4 lg:gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                            className="group flex flex-col sm:flex-row items-center gap-6 p-6 lg:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shadow-inner shrink-0">
                                {service.icon}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2 justify-center sm:justify-start">
                                    <h3 className="text-2xl lg:text-3xl font-bold">{service.title}</h3>
                                    <span className="px-3 py-1 rounded-full bg-[#F4793A] text-[10px] font-bold uppercase tracking-wider text-white shadow-lg whitespace-nowrap">
                                        {service.tag}
                                    </span>
                                </div>
                                <p className="text-base lg:text-lg opacity-80 leading-snug">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
