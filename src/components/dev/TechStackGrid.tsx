"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TechItem {
    name: string;
    icon?: React.ReactNode;
    category?: string; // e.g. "Frontend", "Backend"
}

interface TechStackGridProps {
    items: TechItem[];
}

export function TechStackGrid({ items }: TechStackGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={cn(
                        "relative flex flex-col items-center justify-center p-4 rounded-xl",
                        "bg-[var(--dev-surface)] border border-white/5",
                        "hover:border-[var(--dev-neon-green)]/50 hover:shadow-[0_0_15px_rgba(0,255,148,0.15)]",
                        "transition-all duration-300 cursor-default group"
                    )}
                >
                    <div className="mb-3 text-3xl group-hover:scale-110 transition-transform duration-300 text-gray-400 group-hover:text-white">
                        {/* Placeholder Icon if none provided */}
                        {item.icon || <div className="w-8 h-8 rounded bg-gray-800" />}
                    </div>
                    <span className="text-xs font-mono text-gray-400 group-hover:text-[var(--dev-neon-green)] text-center tracking-wider uppercase">
                        {item.name}
                    </span>

                    {/* Category Badge */}
                    {item.category && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[var(--dev-neon-blue)]" title={item.category} />
                    )}
                </motion.div>
            ))}
        </div>
    );
}
