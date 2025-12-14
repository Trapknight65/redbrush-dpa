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
        <div className="flex flex-row md:flex-row gap-2 md:gap-4 h-full w-full max-w-7xl mx-auto px-0 cursor-pointer justify-between">
            {craftItems.map((item, idx) => {
                const isHovered = hoveredIndex === idx;
                const isMinored = hoveredIndex !== null && !isHovered;
                const isFloatingState = !isHovered; // Default or Minored

                return (
                    <div
                        key={idx}
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={cn(
                            "relative rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer flex flex-col min-h-[180px]",
                            "flex-1", // Default equal width
                            isHovered ? "md:flex-[3.14] border border-white/10 bg-black/40 backdrop-blur-md justify-between" : "md:flex-1 border-transparent bg-transparent justify-center items-center", // Expand gets box, others get transparent
                            isHovered ? item.borderColor : ""
                        )}
                    >
                        {/* Decorative Gradient - Only on Expanded */}
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-br transition-opacity duration-500",
                            item.gradient,
                            isHovered ? "opacity-100" : "opacity-0"
                        )} />

                        <div className={cn(
                            "relative z-10 flex flex-col h-full w-full transition-all duration-500",
                            isHovered ? "p-6" : "p-0 items-center justify-center"
                        )}>

                            {/* Header / Icon Area */}
                            <div className={cn(
                                "flex items-center gap-4 transition-all duration-500",
                                isHovered ? "mb-4" : "mb-0 justify-center w-full"
                            )}>
                                {/* Icon */}
                                <div
                                    className={cn(
                                        "p-3 rounded-lg transition-all duration-500",
                                        // Floating Animation for Default/Minored
                                        isFloatingState ? "animate-bounce-slow bg-transparent scale-125" : "bg-white/10 backdrop-blur-md scale-110"
                                    )}
                                    style={{ animationDelay: isFloatingState ? `${idx * 0.2}s` : '0s' }} // Asynchronous float
                                >
                                    <span className={cn("text-2xl transition-all duration-500", isFloatingState ? "text-4xl" : "")}>{item.icon}</span>
                                </div>

                                {/* Title/Subtitle - Only Visible on Expanded */}
                                <div className={cn(
                                    "transition-all duration-300 overflow-hidden",
                                    isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 h-0"
                                )}>
                                    <h3 className="font-bold text-white leading-tight text-xl">{item.title}</h3>
                                    <p className="text-xs text-crimson-red font-bold uppercase tracking-wider mt-1">{item.subtitle}</p>
                                </div>
                            </div>

                            {/* Description (Revealed ONLY on Hover - Expanded) */}
                            <div className={cn(
                                "mt-auto overflow-hidden transition-all duration-500",
                                isHovered ? "max-h-[200px] opacity-100 delay-100" : "max-h-0 opacity-0"
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
