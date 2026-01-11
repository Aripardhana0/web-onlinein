"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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

        setIsOpen(false); // Close mobile menu if open

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
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-6 bg-transparent w-full pointer-events-none"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between pointer-events-auto">

                    {/* 1. Left: Logo */}
                    <div className="flex-shrink-0 relative z-[101]">
                        <Link
                            href="/"
                            onClick={(e) => handleScroll(e, "/")}
                            className="text-2xl md:text-3xl font-black tracking-widest hover:text-[#F4793A] transition-colors uppercase block mix-blend-difference"
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

                    {/* Mobile Menu Icon */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white relative z-[101] p-2 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>

                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-[#0a0a0f] z-[90] flex flex-col justify-center items-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {["About", "Services", "Why Onlinein?"].map((item) => {
                                let targetHref = `#${item.toLowerCase().replace(/[\s\?]/g, "-")}`;
                                if (item === "About") targetHref = "#about-onlinein";
                                if (item === "Why Onlinein?") targetHref = "#why-onlinein";

                                return (
                                    <Link
                                        key={item}
                                        href={targetHref}
                                        onClick={(e) => handleScroll(e, targetHref)}
                                        className="text-3xl font-black uppercase tracking-widest hover:text-[#F4793A] transition-colors"
                                    >
                                        {item}
                                    </Link>
                                );
                            })}
                            <a
                                href="#contact"
                                onClick={(e) => handleScroll(e, "#contact")}
                                className="text-3xl font-black uppercase tracking-widest hover:text-[#F4793A] transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
