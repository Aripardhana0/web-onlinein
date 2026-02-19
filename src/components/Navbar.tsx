"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [time, setTime] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            // Detect timezone abbreviation dynamically from user's browser
            const tzParts = new Intl.DateTimeFormat("en", { timeZoneName: "short" }).formatToParts(now);
            const tzAbbr = (tzParts.find(p => p.type === "timeZoneName")?.value || "UTC").replace("GMT", "UTC");
            setTime(`${timeString} ${tzAbbr}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Robust Scroll Handler (Fixed for Up/Down)
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");

        // Close mobile menu if open
        setIsMobileMenuOpen(false);

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

    const navLinks = ["About", "Services", "Process", "Why Us"];

    return (
        <>
            <motion.nav
                className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-12 py-6 transition-all duration-300 w-full bg-transparent"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between">

                    {/* 1. Left: Logo */}
                    <div className="flex-shrink-0 relative z-[101]">
                        <Link
                            href="/"
                            onClick={(e) => handleScroll(e, "/")}
                            className="text-2xl md:text-3xl font-black tracking-widest hover:text-[#F4793A] transition-colors uppercase block text-white"
                        >
                            ONLINEIN
                        </Link>
                    </div>

                    {/* 2. Center: Navigation (Desktop) */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((item) => {
                            let targetHref = `#${item.toLowerCase().replace(/[\s\?]/g, "-")}`;
                            if (item === "About") targetHref = "#about-onlinein";
                            if (item === "Process") targetHref = "#work-process";
                            if (item === "Why Us") targetHref = "#why-onlinein";

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

                    {/* 3. Right: Clock (Desktop) */}
                    <div className="hidden md:block w-[120px] text-right font-mono text-sm font-medium opacity-70 text-white">
                        {time}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white relative z-[101] p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[90] bg-[#0a0a0f] flex flex-col items-center justify-center gap-8 md:hidden"
                    >
                        {navLinks.map((item) => {
                            let targetHref = `#${item.toLowerCase().replace(/[\s\?]/g, "-")}`;
                            if (item === "About") targetHref = "#about-onlinein";
                            if (item === "Process") targetHref = "#work-process";
                            if (item === "Why Us") targetHref = "#why-onlinein";

                            return (
                                <Link
                                    key={item}
                                    href={targetHref}
                                    onClick={(e) => handleScroll(e, targetHref)}
                                    className="text-2xl font-bold uppercase text-white hover:text-[#F4793A] transition-colors"
                                >
                                    {item}
                                </Link>
                            );
                        })}
                        <a
                            href="#contact"
                            onClick={(e) => handleScroll(e, "#contact")}
                            className="text-2xl font-bold uppercase text-white hover:text-[#F4793A] transition-colors"
                        >
                            Contact
                        </a>

                        <div className="mt-8 font-mono text-sm font-medium opacity-50 text-white">
                            {time}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
