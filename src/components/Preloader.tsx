"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
    const [index, setIndex] = useState(0);
    const word = "ONLINEIN";
    const letters = word.split("");

    useEffect(() => {
        // Sequence logic: Reveal one letter every ~150ms
        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev >= letters.length) {
                    clearInterval(interval);
                    setTimeout(onComplete, 800); // Wait a bit after completion before dismissing
                    return prev;
                }
                return prev + 1;
            });
        }, 200);

        return () => clearInterval(interval);
    }, [letters.length, onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-3xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="flex gap-4 md:gap-8 overflow-hidden">
                {letters.map((letter, i) => (
                    <motion.span
                        key={i}
                        className="text-4xl md:text-8xl font-black text-white/90"
                        initial={{ opacity: 0, y: 100, rotateX: 90 }}
                        animate={
                            i < index
                                ? { opacity: 1, y: 0, rotateX: 0 }
                                : { opacity: 0, y: 100, rotateX: 90 }
                        }
                        transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1], // Custom ease (quint-like)
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
