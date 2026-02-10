"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StickySectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    zIndex: number;
    skew?: "left" | "right" | "none";
}

export function StickySection({ children, className, id, zIndex, skew = "none" }: StickySectionProps) {
    const ref = useRef(null);

    // Track scroll progress of THIS section relative to viewport
    // "start end": Top of section hits Bottom of viewport (Starts entering)
    // "start start": Top of section hits Top of viewport (Fully docked/sticky)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    // Animate Depth/Scale
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

    // Dynamic Skew Logic
    // At progress 0 (Entering): Skew is MAX (e.g., 15vh or 10deg)
    // At progress 1 (Docked): Skew is 0 (Flat/Symmetrical)

    // We use percentages for polygon points to be responsive

    // Left Skew: Top-Left is lower, Top-Right is 0.
    // Polygon default: (0 0, 100% 0, 100% 100%, 0% 100%)

    // We will transform a value from 15 (max skew vh) to 0.
    const skewValue = useTransform(scrollYProgress, [0, 1], [15, 0]);

    // Since clip-path doesn't accept direct motion value variables in all browsers smoothly inside the string,
    // we might need to use a motion template or style variable.
    // Let's us standard simple templating.

    // Actually, clip-path interpolation with complex polygon strings can be tricky.
    // A simpler approach for "Miring" is using `transform: skewY`. 
    // BUT `skewY` distorts content. Clip-path is better.

    // Workaround: We can't easily interpolate the string inside the `style` prop for `clipPath` with typical React Motion 
    // without `useMotionTemplate`.

    // Let's stick to a simpler visual hack:
    // Wrapper with `overflow: hidden`. 
    // Inner container with `transform: skewY`.
    // Counter-skew inner content? Too complex.

    // Back to `useTransform` mapped to string? Motion supports this if value types match.
    // Let's try `useMotionTemplate`.

    // const clipPath = useMotionTemplate`polygon(0 ${skewValue}vh, 100% 0, 100% 100%, 0% 100%)`; // For Skew Left (Top Left clipped)
    // Wait, Skew Left means Top Left is LOWER? OR Top Right is LOWER?
    // User said "miring". 

    // Let's define:
    // Skew Left logic: Top Left starts down, goes up to 0. Top Right stays 0.
    // clipPath: polygon(0 [value]%, 100% 0, 100% 100%, 0% 100%)
    // where [value] goes from 10% -> 0%.

    // Skew Right logic: Top Left stays 0. Top Right starts down, goes up to 0.
    // clipPath: polygon(0 0, 100% [value]%, 100% 100%, 0% 100%)

    // Let's use % for responsiveness. 10% is a good "More Miring" start.

    // Increased to 50% for MEGA extreme skew as requested ("lebih miring lagi")
    const skewFactor = useTransform(scrollYProgress, [0, 1], [50, 0]);

    return (
        <motion.div
            ref={ref}
            id={id}
            className={cn("relative md:sticky md:top-0 w-full", className)}
            style={{
                zIndex,
                scale,
                opacity,
                // We handle clipPath manually via motion value update?
                // Or just passing it as style. 
                // Motion handles simple value mapping. Let's try direct implementation.
                clipPath: skew === "none" ? "none" :
                    skew === "left"
                        ? useTransform(skewFactor, (v) => `polygon(0 ${v}vh, 100% 0, 100% 100%, 0% 100%)`)
                        : useTransform(skewFactor, (v) => `polygon(0 0, 100% ${v}vh, 100% 100%, 0% 100%)`),
                boxShadow: "0px -20px 40px rgba(0,0,0,0.2)"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            {/* Top Highlight Border (Fades out as it flattens) */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 1], [1, 0]) }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-white/50 z-50 pointer-events-none mix-blend-overlay"
            />
            {children}
        </motion.div>
    );
}
