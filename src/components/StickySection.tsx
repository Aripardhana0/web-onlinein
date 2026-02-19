"use client";

import { motion, useScroll, useTransform, MotionValue } from "motion/react";
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

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "start start"],
    });

    // Scale & opacity
    const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

    // 3D Paper Fold
    const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
    const translateY = useTransform(scrollYProgress, [0, 1], [80, 0]);
    const translateZ = useTransform(scrollYProgress, [0, 1], [-120, 0]);

    // Clip-path diagonal
    const skewAmount = useTransform(scrollYProgress, [0, 1], [14, 0]);
    const clipPathLeft = useTransform(skewAmount, (v: number) => `polygon(0 ${v}vh, 100% 0, 100% 100%, 0% 100%)`);
    const clipPathRight = useTransform(skewAmount, (v: number) => `polygon(0 0, 100% ${v}vh, 100% 100%, 0% 100%)`);

    // Shadows
    const foldShadowOpacity = useTransform(scrollYProgress, [0, 0.7], [0.8, 0]);
    const innerShadow = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const highlightOpacity = useTransform(scrollYProgress, [0, 1], [0.8, 0]);

    // Corner fold — BIG dog-ear (120px), with 3D curl
    const cornerSize = useTransform(scrollYProgress, [0, 0.7], [120, 0]);
    const cornerOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const cornerRotate = useTransform(scrollYProgress, [0, 0.7], [-25, 0]);

    // Second smaller corner fold on top-right for extra realism
    const corner2Size = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
    const corner2Opacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0]);

    // Top edge wave/curl shadow — wide gradient that follows the fold
    const curlShadowHeight = useTransform(scrollYProgress, [0, 0.8], [50, 0]);

    const clipPath: MotionValue<string> | string =
        skew === "left" ? clipPathLeft :
            skew === "right" ? clipPathRight :
                "none";

    return (
        <div
            className="relative md:sticky md:top-0 w-full"
            style={{
                zIndex,
                perspective: "800px",
            }}
        >
            <motion.div
                ref={ref}
                id={id}
                className={cn("relative w-full will-change-transform", className)}
                style={{
                    scale,
                    opacity,
                    rotateX,
                    y: translateY,
                    z: translateZ,
                    clipPath,
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                }}
            >
                {/* Top fold shadow — wide crease */}
                <motion.div
                    style={{ opacity: foldShadowOpacity }}
                    className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/35 via-black/15 to-transparent z-50 pointer-events-none"
                />

                {/* Fold crease highlight line */}
                <motion.div
                    style={{ opacity: highlightOpacity }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-white/40 z-50 pointer-events-none"
                />

                {/* ===== TOP-LEFT CORNER FOLD (main dog-ear) ===== */}
                <motion.div
                    style={{
                        opacity: cornerOpacity,
                        width: cornerSize,
                        height: cornerSize,
                        rotateY: cornerRotate,
                    }}
                    className="absolute top-0 left-0 z-[60] pointer-events-none origin-top-left"
                >
                    {/* Paper backside */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(220,220,220,0.2) 40%, rgba(0,0,0,0.12) 100%)",
                            clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        }}
                    />
                    {/* Fold crease line */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.3) 50%, transparent 55%)",
                            clipPath: "polygon(0 0, 100% 0, 0 100%)",
                        }}
                    />
                    {/* Shadow underneath */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, transparent 30%, rgba(0,0,0,0.3) 100%)",
                            clipPath: "polygon(0 0, 100% 0, 0 100%)",
                            filter: "blur(4px)",
                            transform: "translate(4px, 4px)",
                        }}
                    />
                </motion.div>

                {/* ===== TOP-RIGHT CORNER FOLD (smaller, subtle) ===== */}
                <motion.div
                    style={{
                        opacity: corner2Opacity,
                        width: corner2Size,
                        height: corner2Size,
                    }}
                    className="absolute top-0 right-0 z-[60] pointer-events-none origin-top-right"
                >
                    {/* Paper backside (mirrored) */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(225deg, rgba(255,255,255,0.25) 0%, rgba(200,200,200,0.12) 40%, rgba(0,0,0,0.08) 100%)",
                            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                        }}
                    />
                    {/* Shadow */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(225deg, transparent 35%, rgba(0,0,0,0.2) 100%)",
                            clipPath: "polygon(100% 0, 100% 100%, 0 0)",
                            filter: "blur(3px)",
                            transform: "translate(-3px, 3px)",
                        }}
                    />
                </motion.div>

                {/* ===== Top edge curl shadow ===== */}
                <motion.div
                    style={{
                        opacity: foldShadowOpacity,
                        height: curlShadowHeight,
                    }}
                    className="absolute top-0 left-0 right-0 z-[55] pointer-events-none"
                >
                    <div className="w-full h-full bg-gradient-to-b from-black/20 via-transparent to-transparent" />
                </motion.div>

                {/* Inner vignette when folded */}
                <motion.div
                    style={{ opacity: innerShadow }}
                    className="absolute inset-0 shadow-[inset_0_60px_80px_-40px_rgba(0,0,0,0.3)] z-40 pointer-events-none"
                />

                {children}
            </motion.div>
        </div>
    );
}
