"use client";

import Link from "next/link";

export function Footer() {

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");

        if (targetId === "/" || targetId === "") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const elem = document.getElementById(targetId);
        if (elem) {
            const y = elem.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-[#0a0a0f] text-white/60 py-12 text-sm border-t border-white/10 relative z-50">
            <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© 2026 Onlinein. Crafted by Future Innovators.</p>

                <div className="flex gap-6 font-medium">
                    <a href="/" onClick={(e) => handleScroll(e, "/")} className="hover:text-white transition-colors">Home</a>
                    <a href="#about-onlinein" onClick={(e) => handleScroll(e, "#about-onlinein")} className="hover:text-white transition-colors">About</a>
                    <a href="#services" onClick={(e) => handleScroll(e, "#services")} className="hover:text-white transition-colors">Services</a>
                    <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
