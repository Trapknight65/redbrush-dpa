"use client";

import { motion } from "framer-motion";

interface BrushLoaderProps {
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string;
}

export default function BrushLoader({
    width = "100%",
    height = 100,
    color = "currentColor",
    className = ""
}: BrushLoaderProps) {
    // A complex path that looks like a rough paint brush stroke
    const brushPath = "M10,50 C30,45 40,55 60,50 C80,45 90,55 110,50 C130,45 140,55 160,50 C180,45 190,55 210,50 C230,45 240,55 260,50 C280,45 290,55 310,50";

    // Random jagged clipping to make it look like dry brush
    const dryBrushTexture = "M0,0 L320,0 L320,100 L0,100 Z M20,20 L30,25 L40,20 L50,30 L60,20 L70,35 L80,20 ..."; // Simplified for this demo

    return (
        <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
            <svg
                viewBox="0 0 320 100"
                preserveAspectRatio="none"
                style={{ width: '100%', height: '100%', overflow: 'visible' }}
            >
                {/* Background "Ghost" Stroke */}
                <motion.path
                    d={brushPath}
                    fill="none"
                    stroke={color}
                    strokeWidth="40"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.1"
                    filter="url(#roughness)"
                />

                {/* Animated "Ink" Stroke */}
                <motion.path
                    d={brushPath}
                    fill="none"
                    stroke={color}
                    strokeWidth="40"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="0 1"
                    initial={{ pathLength: 0, opacity: 0.5 }}
                    animate={{
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                            pathLength: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 },
                            opacity: { duration: 0.5 }
                        }
                    }}
                    filter="url(#roughness)"
                />

                {/* SVG Filter for Rough/Dry Brush Look */}
                <defs>
                    <filter id="roughness">
                        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" />
                    </filter>
                </defs>
            </svg>
            <span className="sr-only">Manifesting...</span>
        </div>
    );
}

// Usage Example:
// <BrushLoader color="#DC2626" height={120} />
