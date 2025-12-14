"use client";

import { useState } from "react";
import Card from "@/components/Card";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

// Helper to render icon dynamically
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore - Dynamic access
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as any;
    return Icon ? <Icon className={className} /> : <span className={className}>{name}</span>;
}

export default function ServiceBento({ services }: { services: any[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
            {/* 
               We split services into rows of 3 for the bento effect.
               If we have more, we just stack rows.
            */}
            {Array.from({ length: Math.ceil((services?.length || 0) / 3) }).map((_, rowIndex) => {
                const rowServices = services?.slice(rowIndex * 3, (rowIndex + 1) * 3);

                return (
                    <div key={rowIndex} className="flex flex-col md:flex-row gap-4 h-auto md:h-[270px] w-full cursor-pointer">
                        {rowServices.map((service: any, idx: number) => {
                            const actualIndex = rowIndex * 3 + idx;
                            const isHovered = hoveredIndex === actualIndex;
                            const isRowHovered = hoveredIndex !== null && Math.floor(hoveredIndex / 3) === rowIndex;

                            // Proportions:
                            // If nothing hovered: flex-1 (all equal)
                            // If this hovered: flex-[3.14] (Pi expansion)
                            // If row hovered but not this: flex-1

                            return (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setHoveredIndex(actualIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={cn(
                                        "relative border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer",
                                        "flex-1", // Default mobile / base
                                        isHovered ? "md:flex-[3.14]" : "md:flex-1"
                                    )}
                                >
                                    {/* Decorative Gradient */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br from-crimson-red/10 to-transparent transition-opacity duration-500",
                                        isHovered ? "opacity-100" : "opacity-0"
                                    )} />

                                    <div className={cn(
                                        "absolute inset-0 p-6 flex flex-col justify-center transition-all duration-500",
                                        isHovered ? "items-start text-left" : "items-center text-center"
                                    )}>

                                        {/* Icon - Moves based on state */}
                                        <div className={cn(
                                            "transition-all duration-500 p-4 rounded-2xl border border-white/10 bg-white/5",
                                            isHovered ? "absolute top-6 left-6 scale-90 mb-0 flex items-center gap-3 w-auto pr-6" : "scale-100 mb-4"
                                        )}>
                                            <IconRenderer name={service.icon} className="w-8 h-8 sm:w-10 sm:h-10 text-crimson-red" />
                                            {isHovered && (
                                                <span className="text-white font-bold uppercase tracking-wider text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-500">
                                                    {service.title}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title (Hidden on hover as it moves to label next to icon) */}
                                        <h3 className={cn(
                                            "text-xl font-black text-white uppercase tracking-tight transition-all duration-500",
                                            isHovered ? "opacity-0 h-0 overflow-hidden" : "opacity-100 text-lg"
                                        )}>
                                            {service.title}
                                        </h3>

                                        {/* Description + Features (Revealed on Hover) */}
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-500 flex flex-col gap-4 mt-6", // Added margin top to clear absolute icon
                                            isHovered ? "max-h-[500px] opacity-100 items-start" : "max-h-0 opacity-0 items-center"
                                        )}>
                                            <p className="text-gray-300 text-sm leading-relaxed">
                                                {service.description}
                                            </p>

                                            <div className="h-px w-24 bg-crimson-red/50" />

                                            <div className="flex flex-wrap gap-2">
                                                {service.features.map((feature: string, fIdx: number) => (
                                                    <span key={fIdx} className="text-xs font-mono text-crimson-red bg-crimson-red/10 px-2 py-1 rounded border border-crimson-red/20">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Background Number */}
                                    <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-white/5 select-none pointer-events-none transition-transform duration-700 group-hover:rotate-12">
                                        {String(actualIndex + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
