"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const craftItems = [
    {
        icon: "⚓",
        title: "The Great Ship",
        subtitle: "Web Development",
        description: "We build robust, storm-proof digital platforms (Next.js) capable of sailing the Grand Line of the internet without faltering.",
        gradient: "from-black/0 via-black/0 to-crimson-red/10",
        borderColor: "hover:border-crimson-red/50"
    },
    {
        icon: "🏴‍☠️",
        title: "The Jolly Roger",
        subtitle: "Branding",
        description: "A symbol so powerful it strikes awe across the seas. Establish your legend.",
        gradient: "from-gold/5 to-transparent",
        borderColor: "hover:border-gold/50"
    },
    {
        icon: "🧭",
        title: "The Log Pose",
        subtitle: "Strategy & Marketing",
        description: "Navigate the chaotic waters with precision. We chart the course to the treasure.",
        gradient: "from-ocean-blue/5 to-transparent",
        borderColor: "hover:border-ocean-blue/50"
    },
    {
        icon: "💨",
        title: "Wind in the Sails",
        subtitle: "SEO & Performance",
        description: "Speed is power. Outrun the marines and the competition.",
        gradient: "from-white/5 to-transparent",
        borderColor: "hover:border-white/20"
    }
];

export default function CraftBento() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
    return (
        <div className="flex flex-col md:flex-row gap-4 h-full w-full max-w-7xl mx-auto px-2 sm:px-0 cursor-pointer">
            {craftItems.map((item, idx) => {
                const isHovered = hoveredIndex === idx;

                return (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "relative border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer flex flex-col justify-between min-h-[180px]",
                            "flex-1", // Default equal width
                            isHovered ? "md:flex-[3.14]" : "md:flex-1", // Bento expansion
                            item.borderColor
                        )}
                    >
                        {/* Decorative Gradient */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                            item.gradient,
                            isHovered ? "opacity-100" : "opacity-50"
                        )} />

                        <div className="relative z-10 p-6 flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className={cn(
                                    "p-3 bg-white/10 rounded-lg backdrop-blur-md transition-all duration-500",
                                    isHovered ? "scale-110" : "scale-100"
                                )}>
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <div className={cn("transition-all duration-300", isHovered ? "opacity-100" : "opacity-80")}>
                                    <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                                    <p className="text-xs text-crimson-red font-bold uppercase tracking-wider">{item.subtitle}</p>
                                </div>
                            </div>

                            {/* Description (Revealed on Hover) */}
                            <div className={cn(
                                "mt-auto overflow-hidden transition-all duration-500",
                                isHovered ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 md:max-h-0 md:opacity-0" // Hide on desktop when not hovered, show on mobile? Actually users prefer tap to expand on mobile usually, but keeping consistent bento logic for now. 
                                // To make it friendly for mobile without hover, maybe allow 'flex-1' to show some part? 
                                // For now adhering to 'slider' request: reveal on hover/interaction.
                            )}>
                                <p className="text-gray-300 text-sm leading-relaxed border-t border-white/10 pt-4">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
