"use client";

import { useState } from "react";
import { CaseStudyData } from "./FigmaCaseStudy";
import FigmaCaseStudy from "./FigmaCaseStudy";
import { motion } from "framer-motion";

interface ProjectCaseStudiesProps {
    studies: CaseStudyData[];
}

export default function ProjectCaseStudies({ studies }: ProjectCaseStudiesProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!studies || studies.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 scale-90 sm:scale-100 origin-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark-gray mb-8">Design Process & Case Studies</h2>

            {studies.length > 1 && (
                <div className="flex justify-center gap-4 mb-8 flex-wrap">
                    {studies.map((study, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeIndex === index
                                    ? "bg-crimson-red text-white shadow-lg scale-105"
                                    : "bg-white text-charcoal border border-gray-200 hover:border-crimson-red"
                                }`}
                        >
                            {study.meta.title}
                        </button>
                    ))}
                </div>
            )}

            <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <FigmaCaseStudy data={studies[activeIndex]} />
            </motion.div>
        </section>
    );
}
