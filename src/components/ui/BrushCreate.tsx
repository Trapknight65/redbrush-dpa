"use client";

import { motion } from "framer-motion";

interface BrushCreateProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function BrushCreate({ text, className = "", delay = 0 }: BrushCreateProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay }
        })
    };

    const child = {
        visible: {
            opacity: 1,
            pathLength: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hidden: {
            opacity: 0,
            y: 10,
            scale: 0.8,
            filter: "blur(5px)",
        }
    };

    return (
        <motion.div
            style={{ display: "inline-block", overflow: "hidden" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    style={{ display: "inline-block" }}
                    className={letter === " " ? "mr-2" : ""}
                >
                    {letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
