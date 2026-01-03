"use client";

import { motion } from "motion/react";

const testimonials = [
    {
        quote: "FOLLOW.ART has completely transformed how I connect with galleries and fellow artists. The Nexus Card is a game-changer.",
        author: "Teona Toderel",
        role: "Visual Artist, Bucharest"
    },
    {
        quote: "Finally, a platform that understands what curators actually need. The Connectory makes discovering new talent effortless.",
        author: "Sophie Wratzfeld",
        role: "Independent Curator, Vienna"
    },
    {
        quote: "The community-driven approach is refreshing. No algorithms deciding who sees my work—just genuine connections.",
        author: "Marco Benedetti",
        role: "Sculptor, Milan"
    },
];

export function TestimonialsSection() {
    return (
        <section className="relative min-h-screen bg-[#8498AC] py-32 overflow-hidden">
            {/* Background Typography */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
                <h2 className="text-[20vw] font-black uppercase text-white/5 tracking-[0.2em] whitespace-nowrap">
                    Testimonials
                </h2>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/10 flex flex-col justify-between"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.15)" }}
                        >
                            <div>
                                <div className="text-6xl font-serif opacity-30 leading-none mb-6">"</div>
                                <p className="text-lg leading-relaxed mb-8">{item.quote}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-400 to-purple-400" />
                                <div>
                                    <div className="font-bold">{item.author}</div>
                                    <div className="text-sm opacity-70">{item.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
