"use client";

import { useState, useEffect } from "react";
import { User, Briefcase, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutQuickNav() {
    const [activeSection, setActiveSection] = useState<string>("bio-skills");

    const navItems = [
        { id: "bio-skills", icon: User, label: "Bio", color: "blue" },
        { id: "experience", icon: Briefcase, label: "Exp", color: "red" },
        { id: "cert-lang", icon: Award, label: "Cert", color: "green" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of sections) {
                if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Offset for sticky header
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;

                // Color classes based on selection
                let activeClass = "";
                if (isActive) {
                    if (item.color === "blue") activeClass = "bg-blue-600/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]";
                    if (item.color === "red") activeClass = "bg-red-600/20 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(220,20,60,0.5)]";
                    if (item.color === "green") activeClass = "bg-green-600/20 text-green-400 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
                } else {
                    activeClass = "text-gray-500 hover:text-gray-300 border-transparent";
                }

                return (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                            "p-2 sm:p-3 rounded-full transition-all duration-300 border relative group",
                            isActive ? "scale-110" : "scale-100 hover:scale-105",
                            activeClass
                        )}
                        aria-label={item.label}
                    >
                        <Icon size={18} className="sm:w-5 sm:h-5" />

                        {/* Tooltip - Left side now */}
                        <span className="absolute right-full mr-3 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
