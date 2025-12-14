"use client";

import { useState, useRef } from "react";
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
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (idx: number) => {
        if (window.matchMedia('(hover: none)').matches) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHoveredIndex(idx);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHoveredIndex(null);
        }, 100); // 100ms debounce to prevent flicker
    };

    const handleInteraction = (idx: number) => {
        // Mobile tap logic remains immediate or can use same logic
        if (hoveredIndex === idx) {
            setHoveredIndex(null);
        } else {
            setHoveredIndex(idx);
            // Auto-scroll to center after a short delay to allow expansion animation to start
            setTimeout(() => {
                const element = itemRefs.current[idx];
                if (element && window.innerWidth < 768) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }

    return (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
            {/* 
               We split services into rows of 3 for the bento effect.
               If we have more, we just stack rows.
            */}
            {Array.from({ length: Math.ceil((services?.length || 0) / 3) }).map((_, rowIndex) => {
                const rowServices = services?.slice(rowIndex * 3, (rowIndex + 1) * 3);

                return (
                    <div key={rowIndex} className="flex flex-row md:flex-row gap-2 md:gap-4 h-auto md:h-[270px] w-full cursor-pointer flex-wrap md:flex-nowrap">
                        {rowServices.map((service: any, idx: number) => {
                            const actualIndex = rowIndex * 3 + idx;
                            const isHovered = hoveredIndex === actualIndex;
                            const isRowHovered = hoveredIndex !== null && Math.floor(hoveredIndex / 3) === rowIndex;
                            // On mobile, if we are hovering (tapped) one, others in row should maybe shrink? 
                            // But usually better to keep them flex-row and wrap?
                            // User request: "only (boxed) icons, all aligned. expand: full width".

                            return (
                                <div
                                    key={service.id}
                                    ref={(el) => { itemRefs.current[actualIndex] = el; }}
                                    onMouseEnter={() => handleMouseEnter(actualIndex)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleInteraction(actualIndex)}
                                    className={cn(
                                        "relative border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer min-h-[160px] md:min-h-[280px]",
                                        // Mobile: expand to full width & jump to top if hovered. 
                                        // Desktop: reset order, reset width, let flex-grow handle expansion in-place.
                                        isHovered
                                            ? "w-full basis-full order-first md:order-none md:w-auto md:basis-auto md:flex-[3.14]"
                                            : "flex-1 min-w-[30%] md:min-w-0 md:flex-1"
                                    )}
                                >
                                    {/* Decorative Gradient */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-br from-crimson-red/10 to-transparent transition-opacity duration-500",
                                        isHovered ? "opacity-100" : "opacity-0"
                                    )} />

                                    <div className={cn(
                                        "relative md:absolute inset-0 p-4 md:p-6 flex flex-col justify-center transition-all duration-500",
                                        isHovered ? "items-start text-left" : "items-center text-center"
                                    )}>

                                        {/* Icon - Moves based on state */}
                                        <div className={cn(
                                            "rounded-2xl border transition-all duration-500 z-20",
                                            // Icon Positioning Logic
                                            // Default: Relative in flow
                                            !isHovered && "relative p-3 md:p-4 border-white/10 bg-white/5 scale-100 mb-2 md:mb-4",
                                            // Hovered: Absolute Top-Left
                                            isHovered && "absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3 w-auto pr-6 border-transparent bg-transparent scale-90"
                                        )}>
                                            <IconRenderer name={service.icon} className="w-6 h-6 md:w-8 md:h-8 sm:w-10 sm:h-10 text-crimson-red" />
                                            {isHovered && (
                                                <span className="text-white font-bold uppercase tracking-wider text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-500">
                                                    {service.title}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title (Hidden on hover as it moves to label next to icon) */}
                                        <h3 className={cn(
                                            "text-sm md:text-xl font-black text-white uppercase tracking-tight transition-all duration-500 w-full text-center",
                                            isHovered ? "absolute top-6 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none" : "relative opacity-100"
                                        )}>
                                            {service.title}
                                        </h3>

                                        {/* Description + Features (Revealed on Hover) */}
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-500 flex flex-col gap-4",
                                            // Add top margin/padding to avoid overlap with absolute icon
                                            isHovered ? "max-h-[500px] opacity-100 items-start pt-2 md:pt-16" : "max-h-0 opacity-0 items-center pt-0"
                                        )}>
                                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                                                {service.description}
                                            </p>

                                            <div className="h-px w-24 bg-crimson-red/50" />

                                            <div className="flex flex-wrap gap-2">
                                                {service.features.map((feature: string, fIdx: number) => (
                                                    <span key={fIdx} className="text-[10px] md:text-xs font-mono text-crimson-red bg-crimson-red/10 px-2 py-1 rounded border border-crimson-red/20">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Background Number */}
                                    <div className="absolute -bottom-10 -right-10 text-[6rem] md:text-[10rem] font-black text-white/5 select-none pointer-events-none transition-transform duration-700 group-hover:rotate-12">
                                        {String(actualIndex + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div >
    );
}
