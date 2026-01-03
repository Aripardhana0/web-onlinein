"use client";

import { motion, useScroll, useMotionValueEvent, useSpring } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [time, setTime] = useState("");

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    // Clock Logic
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });
            // Approximate timezone check (e.g. Jakarta is GMT+7)
            const timeZone = "JKT";
            setTime(`${timeString} ${timeZone}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Robust Scroll Handler (Fixed for Up/Down)
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");

        if (targetId === "/" || targetId === "") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const elem = document.getElementById(targetId);
        if (elem) {
            // Use window.scrollTo with absolute calculation for better reliability than scrollIntoView
            const y = elem.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: "smooth" });
        } else {
            console.warn("Element not found:", targetId);
        }
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-6 bg-transparent w-full"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">

                {/* 1. Left: Logo */}
                <div className="flex-shrink-0">
                    <Link
                        href="/"
                        onClick={(e) => handleScroll(e, "/")}
                        className="text-2xl md:text-3xl font-black tracking-widest hover:text-[#F4793A] transition-colors uppercase block"
                    >
                        ONLINEIN
                    </Link>
                </div>

                {/* 2. Center: Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {["About", "Services", "Why Onlinein?"].map((item) => {
                        let targetHref = `#${item.toLowerCase().replace(/[\s\?]/g, "-")}`;
                        if (item === "About") targetHref = "#about-onlinein";
                        if (item === "Why Onlinein?") targetHref = "#why-onlinein";

                        return (
                            <Link
                                key={item}
                                href={targetHref}
                                onClick={(e) => handleScroll(e, targetHref)}
                                className="relative py-2 group"
                            >
                                <span className="text-sm font-bold tracking-widest text-[#FFFFFF] opacity-80 group-hover:opacity-100 transition-opacity uppercase">
                                    {item}
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
                            </Link>
                        );
                    })}

                    {/* Contact Link */}
                    <a
                        href="#contact"
                        onClick={(e) => handleScroll(e, "#contact")}
                        className="relative py-2 group ml-4"
                    >
                        <span className="text-sm font-bold tracking-widest text-[#FFFFFF] opacity-80 group-hover:opacity-100 transition-opacity uppercase">
                            CONTACT
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
                    </a>
                </div>

                {/* 3. Right: Clock */}
                <div className="hidden md:block w-[120px] text-right font-mono text-sm font-medium opacity-70">
                    {time}
                </div>

                {/* Mobile Menu Icon (Placeholder) */}
                <div className="md:hidden text-white">
                    Menu
                </div>

            </div>
        </motion.nav>
    );
}
