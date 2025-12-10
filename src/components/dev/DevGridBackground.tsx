"use client";

import { motion } from "framer-motion";

export function DevGridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base Grid */}
            <div
                className="absolute inset-0 z-0 bg-transparent"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 255, 148, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 255, 148, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                }}
            />

            {/* Scanline */}
            <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 w-full h-[20px] bg-gradient-to-b from-transparent via-[#00ff94]/10 to-transparent z-10"
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)] z-10" />

            {/* Noise */}
            <div className="absolute inset-0 opacity-[0.03] z-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
