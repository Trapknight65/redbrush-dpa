"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function LogPose() {
    const { scrollYProgress } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Rotate the needle 360 degrees as the user scrolls effectively "pointing" to the next island (section)
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 20 });

    // Hide initially to avoid hydration mismatch or distraction at very top
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest > 0.05) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
        >
            {/* Outer Glass Sphere */}
            <div className="relative w-24 h-24 rounded-full bg-blue-900/20 backdrop-blur-md border border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center overflow-hidden">
                {/* Compass Markings */}
                <svg className="absolute inset-0 w-full h-full p-2 opacity-50" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold" />
                    {[0, 90, 180, 270].map((deg) => (
                        <line
                            key={deg}
                            x1="50" y1="5" x2="50" y2="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-gold"
                            transform={`rotate(${deg} 50 50)`}
                        />
                    ))}
                </svg>

                {/* The Needle */}
                <motion.div
                    style={{ rotate: smoothRotate }}
                    className="w-full h-full absolute inset-0 flex items-center justify-center"
                >
                    {/* Magnetic Needle Visual */}
                    <div className="relative w-4 h-16">
                        {/* North (Red) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[35px] border-b-crimson-red filter drop-shadow-md" />
                        {/* South (Gold/Dark) */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[35px] border-t-gold/80 filter drop-shadow-md" />

                        {/* Middle Pivot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold border border-black shadow-sm z-10" />
                    </div>
                </motion.div>

                {/* Glass Shine Reflection */}
                <div className="absolute top-2 left-4 w-6 h-3 bg-white/10 rounded-[50%] rotate-[-45deg] blur-[1px]" />

                {/* Wood/Gold Base Rim (Pseudo 3D) */}
                <div className="absolute inset-0 border-4 border-gold/30 rounded-full shadow-inner" />
            </div>

            {/* Float Label */}
            <div className="absolute -top-8 bg-black/80 text-gold text-xs px-2 py-1 rounded border border-gold/20 opacity-0 md:group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Log Pose Active
            </div>
        </motion.div>
    );
}
