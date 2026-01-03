"use client";

import { motion } from "motion/react";
import { MessageSquare, PenTool, CheckCircle, Rocket } from "lucide-react";

const steps = [
    { id: 1, title: "Tell Us Your Idea", desc: "Share your vision & goals", icon: MessageSquare },
    { id: 2, title: "We Design & Build", desc: "Trendy, clean, and functional", icon: PenTool },
    { id: 3, title: "Review & Improve", desc: "We refine it together", icon: CheckCircle },
    { id: 4, title: "Launch Online", desc: "Your business goes live", icon: Rocket },
];

export function WorkProcess() {
    return (
        <section className="min-h-screen bg-[#E5B895] py-20 flex items-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent" />

            <div className="container mx-auto px-4 md:px-12 h-full flex flex-col justify-center relative z-10">
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-[10vw] lg:text-[80px] font-black uppercase leading-none mb-6">
                        How It <span className="text-white">Works</span>
                    </h2>
                    <p className="text-xl opacity-90">Simple steps to get your brand online.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-300"
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
