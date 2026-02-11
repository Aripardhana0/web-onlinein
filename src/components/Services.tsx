"use client";

import { motion } from "motion/react";

const services = [
    {
        title: "Modern Website",
        tag: "High Conversion.",
        desc: "Stunning design that converts visitors into customers. Fast, secure, and built to sell.",
        icon: "🚀"
    },
    {
        title: "Workflow Automation",
        tag: "Cut Costs.",
        desc: "Stop manual work. We connect your apps to run your business on auto-pilot.",
        icon: "⚙️"
    },
    {
        title: "AI Chatbot",
        tag: "24/7 Sales Agent.",
        desc: "Your 24/7 sales agent. Answer queries, book meetings, and sell while you sleep.",
        icon: "🤖"
    },
];

export function Services() {
    return (
        <section className="min-h-screen bg-[#8498AC] py-20 flex flex-col justify-center relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-12 relative z-10 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8 md:mb-16 shrink-0"
                >
                    <h2 className="text-[10vw] lg:text-[100px] font-black uppercase leading-[0.9] mb-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        Services & <span className="text-[#0a0a0f]">Automation</span>
                    </h2>
                    <p className="text-xl lg:text-2xl max-w-3xl leading-relaxed opacity-90">
                        We blend stunning <strong>creative design</strong> with powerful <strong>AI automation</strong>.
                        Get a website that looks amazing, and a system that works efficiently.
                    </p>
                </motion.div>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex overflow-x-auto gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                            className="group flex flex-col items-start gap-4 p-6 lg:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors min-w-[85vw] md:min-w-0 snap-center"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shadow-inner shrink-0 mb-2">
                                {service.icon}
                            </div>
                            <div className="flex-1 w-full text-left">
                                <div className="flex flex-wrap items-center gap-3 mb-2 justify-between w-full">
                                    <h3 className="text-xl lg:text-2xl font-bold">{service.title}</h3>
                                    <span className="px-2 py-1 rounded-full bg-[#F4793A] text-[9px] font-bold uppercase tracking-wider text-white shadow-lg whitespace-nowrap">
                                        {service.tag}
                                    </span>
                                </div>
                                <p className="text-sm lg:text-base opacity-80 leading-snug">{service.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
