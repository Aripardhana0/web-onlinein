"use client";

import { motion } from "motion/react";
import { MessageSquare, PenTool, CheckCircle, Rocket } from "lucide-react";

const steps = [
    { id: 1, title: "Share Your Vision", desc: "Tell us your goals and pain points", icon: MessageSquare },
    { id: 2, title: "We Build It", desc: "High-impact design + AI workflows", icon: PenTool },
    { id: 3, title: "Optimize & Test", desc: "Fine-tuned for peak performance", icon: CheckCircle },
    { id: 4, title: "Launch & Scale", desc: "Your system runs on auto-pilot", icon: Rocket },
];

export function WorkProcess() {
    return (
        <section className="min-h-screen bg-[#E5B895] py-20 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent" />

            <div className="container mx-auto px-4 md:px-12 h-full flex flex-col justify-center relative z-10">
                <motion.div
                    className="text-center mb-12 md:mb-20 shrink-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[10vw] lg:text-[80px] font-black uppercase leading-none mb-6">
                        How It <span className="text-white">Works</span>
                    </h2>
                    <p className="text-xl opacity-90">From idea to fully automated — in 4 simple steps</p>
                </motion.div>

                {/* Mobile: Horizontal Scroll | Desktop: Grid */}
                <div className="flex overflow-x-auto gap-4 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-300 min-w-[85vw] md:min-w-0 snap-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                        >
                            {/* Bold Centered Number */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[180px] font-black text-black/5 pointer-events-none select-none z-0">
                                {step.id}
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-[#F4793A] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform mx-auto md:mx-0">
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                                <p className="opacity-70">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
