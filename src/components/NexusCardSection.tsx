"use client";

import { motion } from "motion/react";

export function NexusCardSection() {
    return (
        <section className="min-h-screen bg-[#C5939D] flex items-center py-20 overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-[10vw] lg:text-[90px] font-black uppercase leading-[0.9] mb-8">
                        <span className="font-playfair font-normal italic lowercase mr-4">the</span>
                        Nexus Card
                    </h2>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-6 opacity-90">Your Digital Portfolio Evolved.</h3>
                    <p className="text-lg leading-relaxed opacity-90">
                        Comprehensive, shareable snapshot of your creative Identity.
                        No more "find me on Insta". Add it to your Wallet app and share with one click.
                        Let your Nexus Card do the talking while you focus on creating.
                    </p>
                </motion.div>

                {/* Floating Cards Demo */}
                <div className="relative h-[500px] perspective-[1000px] flex items-center justify-center">
                    {/* Card 1 */}
                    <motion.div
                        className="absolute top-10 right-20 w-[280px] h-[380px] bg-white rounded-3xl shadow-2xl z-20 overflow-hidden"
                        initial={{ opacity: 0, x: 100, rotate: 0 }}
                        whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 60 }}
                    >
                        <div className="h-32 bg-gradient-to-br from-orange-400 to-blue-400" />
                        <div className="p-6 text-center">
                            <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white -mt-16 mx-auto mb-4" />
                            <div className="font-bold text-gray-900 text-lg">Alexandra Moore</div>
                            <div className="text-gray-500 text-sm">Mixed Media Artist</div>
                        </div>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        className="absolute top-24 right-0 w-[280px] h-[380px] bg-white rounded-3xl shadow-2xl z-10 overflow-hidden"
                        initial={{ opacity: 0, x: 100, rotate: 0 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 5 }}
                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 60, delay: 0.2 }}
                    >
                        <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400" />
                        <div className="p-6 text-center">
                            <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white -mt-16 mx-auto mb-4" />
                            <div className="font-bold text-gray-900 text-lg">David Park</div>
                            <div className="text-gray-500 text-sm">Exhibition Curator</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
