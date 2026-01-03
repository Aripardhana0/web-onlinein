"use client";

import { motion } from "motion/react";

const features = [
    { id: "01", title: "Professional presentation", desc: "Share your creative identity via the Nexus Card" },
    { id: "02", title: "Visibility", desc: "Get found in the Connectory by those who matter" },
    { id: "03", title: "Connection", desc: "Reach out and collaborate via the Community Board" },
    { id: "04", title: "Knowledge sharing", desc: "Insights and tools for the art world" },
];

export function AboutSection() {
    return (
        <section className="min-h-screen bg-[#8498AC] py-32">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-[8vw] lg:text-[120px] font-black uppercase leading-none mb-12 flex items-center gap-4">
                        Follow. Art <span className="text-4xl animate-pulse">✦</span>
                    </h2>
                    <p className="text-xl lg:text-2xl max-w-3xl leading-relaxed opacity-90">
                        FOLLOW.ART is the first and only network made for curators and artists,
                        combining tools for professional presentation, visibility, connection and knowledge sharing.
                    </p>
                </motion.div>

                <div className="grid gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, x: -20, y: 20 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 50 }}
                            className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <span className="text-5xl font-black text-white/20 group-hover:text-white/40 transition-colors">
                                {feature.id}
                            </span>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-lg opacity-80">{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
