"use client";

import { motion } from "framer-motion";

export default function Vivrecard() {
    return (
        <div className="flex items-center gap-3 group cursor-help">
            <div className="relative w-8 h-10">
                {/* Burning Effect (Pulsing Glow) */}
                <motion.div
                    className="absolute inset-0 bg-orange-500/50 rounded-sm filter blur-sm"
                    animate={{
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* The Paper (Vivrecard) */}
                {/* Using clip-path to simulate jagged burnt edges */}
                <motion.div
                    className="absolute inset-0 bg-[#ffecd1] shadow-inner border border-stone-300"
                    style={{
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 5% 40%)"
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    {/* Charred Edges Overlay */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-orange-900/40 blur-[1px] transform rotate-45 translate-y-1 translate-x-1" />

                    {/* "Life Force" Movement */}
                    <motion.div
                        className="w-full h-full bg-gradient-to-tr from-orange-200/50 to-transparent"
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"]
                        }}
                        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    />

                    {/* Initial */}
                    <div className="absolute inset-0 flex items-center justify-center font-serif text-[10px] font-bold text-stone-800 opacity-60">
                        RB
                    </div>
                </motion.div>
            </div>

            <div className="text-xs">
                <div className="text-stone-400 font-bold uppercase tracking-wider group-hover:text-gold transition-colors">
                    Vivrecard Status
                </div>
                <div className="text-gold/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Intact / Online
                </div>
            </div>
        </div>
    );
}
