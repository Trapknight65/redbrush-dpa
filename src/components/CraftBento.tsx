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
        <div className="flex flex-col md:flex-row gap-4 h-full w-full max-w-7xl mx-auto px-2 sm:px-0 cursor-pointer">
            {craftItems.map((item, idx) => {
                const isHovered = hoveredIndex === idx;
                const isMinored = hoveredIndex !== null && !isHovered;

                return (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "relative border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer flex flex-col min-h-[180px]",
                            "flex-1", // Default equal width
                            isHovered ? "md:flex-[3.14]" : "md:flex-1", // Bento expansion
                            isMinored ? "justify-center items-center" : "justify-between", // Minored: center icon; Default/Expanded: space between
                            item.borderColor
                        )}
                    >
                        {/* Decorative Gradient */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                            item.gradient,
                            isHovered ? "opacity-100" : "opacity-30"
                        )} />

                        <div className={cn(
                            "relative z-10 p-6 flex flex-col h-full w-full transition-all duration-500",
                            isMinored ? "items-center justify-center p-0" : ""
                        )}>

                            {/* Header / Icon Area */}
                            <div className={cn(
                                "flex items-center gap-4 transition-all duration-500",
                                isMinored ? "mb-0" : "mb-4",
                                !isHovered && !isMinored ? "flex-col items-start gap-2" : "" // Default: Icon top
                            )}>
                                {/* Icon */}
                                <div className={cn(
                                    "p-3 bg-white/10 rounded-lg backdrop-blur-md transition-all duration-500",
                                    isHovered ? "scale-110" : "scale-100",
                                    isMinored ? "scale-125 bg-transparent p-0" : "" // Minored: bigger icon, no bg? or keep bg? 'only icon'
                                )}>
                                    <span className="text-2xl">{item.icon}</span>
                                </div>

                                {/* Title/Subtitle - Hidden in Minored */}
                                <div className={cn(
                                    "transition-all duration-300",
                                    isHovered ? "opacity-100 translate-y-0" : "",
                                    isMinored ? "opacity-0 translate-y-4 absolute pointer-events-none" : "opacity-100",
                                    !isHovered && !isMinored ? "mt-auto pt-10" : "" // Push label down in default
                                )}>
                                    <h3 className={cn(
                                        "font-bold text-white leading-tight transition-all duration-300",
                                        isHovered ? "text-xl" : "text-lg"
                                    )}>{item.title}</h3>

                                    {/* Subtitle - Maybe hide in Default if requested 'shortened', or keep small */}
                                    <p className={cn(
                                        "text-xs text-crimson-red font-bold uppercase tracking-wider transition-all duration-300",
                                        !isHovered && !isMinored ? "opacity-80" : "" // Keep visible in default
                                    )}>{item.subtitle}</p>
                                </div>
                            </div>

                            {/* Description (Revealed ONLY on Hover - Expanded) */}
                            <div className={cn(
                                "mt-auto overflow-hidden transition-all duration-500",
                                isHovered ? "max-h-[200px] opacity-100 delay-100" : "max-h-0 opacity-0 md:max-h-0 md:opacity-0"
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
