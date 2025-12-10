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
                top: element.offsetTop - 80, // Offset for sticky header if any
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 p-2 bg-black/60 backdrop-blur-sm rounded-r-xl border-y border-r border-[#333]">
            {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;

                // Color classes based on selection
                let activeClass = "";
                if (isActive) {
                    if (item.color === "blue") activeClass = "bg-black shadow-[0_0_15px_rgba(59,130,246,0.5)] border-blue-500/50 text-blue-400";
                    if (item.color === "red") activeClass = "bg-black shadow-[0_0_15px_rgba(220,20,60,0.5)] border-red-500/50 text-red-400";
                    if (item.color === "green") activeClass = "bg-black shadow-[0_0_15px_rgba(34,197,94,0.5)] border-green-500/50 text-green-400";
                } else {
                    activeClass = "text-gray-500 hover:text-gray-300";
                }

                return (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                            "p-3 rounded-lg transition-all duration-300 border border-transparent relative group",
                            activeClass
                        )}
                        aria-label={item.label}
                    >
                        <Icon size={20} />
                        {/* Tooltip */}
                        <span className="absolute left-full ml-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
