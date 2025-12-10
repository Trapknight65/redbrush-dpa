"use client";

import { Terminal, Monitor } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function DevModeSwitch() {
    const pathname = usePathname();
    const isDevMode = pathname?.startsWith("/dev-lab");

    return (
        <Link
            href={isDevMode ? "/" : "/dev-lab"}
            className={cn(
                "relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border",
                isDevMode
                    ? "bg-[#050505] border-[#00ff94] shadow-[0_0_10px_-2px_#00ff94]"
                    : "bg-gray-100 border-gray-200 hover:border-crimson-red"
            )}
        >
            <div className="relative z-10 flex items-center gap-2">
                <AnimateIcon isActive={isDevMode} />
                <span className={cn(
                    "text-xs font-bold tracking-wider",
                    isDevMode ? "text-[#00ff94] font-mono" : "text-gray-600"
                )}>
                    {isDevMode ? "DEV_MODE" : "DEV LAB"}
                </span>
            </div>

            {/* Background Glitch effect on hover could go here, keeping it simple for now */}
        </Link>
    );
}

function AnimateIcon({ isActive }: { isActive: boolean }) {
    return (
        <div className="relative w-4 h-4">
            <motion.div
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                className="absolute inset-0 flex items-center justify-center text-[#00ff94]"
            >
                <Terminal size={14} />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.5 : 1 }}
                className="absolute inset-0 flex items-center justify-center text-gray-600"
            >
                <Monitor size={14} />
            </motion.div>
        </div>
    );
}
