"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon, Sparkles } from "lucide-react";

interface TerminalProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    variant?: "neon" | "glass" | "matrix";
}

export function Terminal({ title = "bash", children, className, variant = "neon" }: TerminalProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "relative rounded-lg overflow-hidden font-mono text-sm leading-relaxed",
                "border border-[var(--dev-surface)] bg-[var(--dev-bg)]",
                variant === "neon" && "shadow-[0_0_20px_rgba(0,255,148,0.1)] border-[var(--dev-neon-green)]/30",
                variant === "glass" && "bg-opacity-60 backdrop-blur-md border-[var(--dev-neon-blue)]/30",
                className
            )}
        >
            {/* Header */}
            <div className={cn(
                "flex items-center justify-between px-4 py-2 border-b",
                "bg-[var(--dev-surface)] border-[var(--dev-surface)]"
            )}>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    {title}
                </div>
                <div className="opacity-0">...</div> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="p-4 overflow-x-auto text-gray-300 scrollbar-thin scrollbar-thumb-[var(--dev-neon-green)]/20">
                {children}
            </div>

            {/* Blinking Cursor Overlay (Optional effect) */}
            <div className="absolute bottom-4 right-4 pointer-events-none">
                <span className="animate-pulse text-[var(--dev-neon-green)]">_</span>
            </div>
        </motion.div>
    );
}

export function TerminalLine({ children, prefix = "$", color = "default" }: { children: React.ReactNode, prefix?: string, color?: "default" | "success" | "error" | "warning" | "info" }) {
    const colorClasses = {
        default: "text-gray-300",
        success: "text-[var(--dev-neon-green)]",
        error: "text-[var(--dev-neon-pink)]",
        warning: "text-[var(--dev-neon-yellow)]",
        info: "text-[var(--dev-neon-blue)]"
    };

    return (
        <div className="flex gap-3 mb-1">
            <span className="text-gray-600 select-none shrink-0">{prefix}</span>
            <span className={cn("break-all", colorClasses[color])}>{children}</span>
        </div>
    );
}
