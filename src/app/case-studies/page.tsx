"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioProjects } from "@/data/portfolio";
import Link from "next/link";

import { Search } from "lucide-react";

export default function CaseStudiesPage() {
    const [selectedTag, setSelectedTag] = useState("All");

    // Extract unique tags from all projects
    const allTags = ["All", ...Array.from(new Set(portfolioProjects.flatMap((p) => p.tags || []))).sort()];

    // Filter projects based on selected tag
    const filteredProjects = selectedTag === "All"
        ? portfolioProjects
        : portfolioProjects.filter((p) => p.tags?.includes(selectedTag));

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Cinematic Effects */}
            <div className="film-grain" />
            <div className="spotlight top-[-20%] left-[50%] opacity-60" />

            {/* Hero Section */}
            <section className="relative z-10 py-16 sm:py-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                        <span className="text-white">Case Studies</span> <span className="text-gold">Library</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-fog max-w-2xl mx-auto mb-10">
                        A curated collection of digital experiences, architectural decisions, and growth strategies.
                    </p>
                </motion.div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-gold/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
                    <div className="flex space-x-2 min-w-max justify-center">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${selectedTag === tag
                                    ? "bg-gold/20 text-gold border-gold"
                                    : "bg-transparent text-fog border-transparent hover:border-gold/30 hover:text-white"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Link href={`/portfolio/${project.id}`} className="group block h-full">
                                    <div className="wanted-poster rounded-sm p-4 h-full flex flex-col transform transition-transform duration-300 hover:rotate-1 hover:scale-105 group relative overflow-hidden">
                                        {/* Paper texture overlay is handled by CSS ::after */}

                                        <div className="wanted-header text-3xl sm:text-4xl text-[#3a2f26] mb-2 tracking-widest">
                                            WANTED
                                        </div>

                                        <div className="relative aspect-[4/3] bg-black/10 border-2 border-[#3a2f26] mb-3 overflow-hidden flex items-center justify-center">
                                            <div className="text-7xl group-hover:scale-110 transition-transform duration-500 filter sepia-[.3]">
                                                {project.image}
                                            </div>
                                            {/* Bounty Stamp Effect */}
                                            <div className="absolute bottom-2 right-2 border-4 border-red-800 text-red-800 font-bold px-2 py-1 transform -rotate-12 opacity-80 text-xs sm:text-sm uppercase tracking-wider">
                                                {project.category}
                                            </div>
                                        </div>

                                        <div className="text-center mb-1">
                                            <h3 className="text-xl sm:text-2xl font-bold text-[#3a2f26] uppercase font-serif tracking-wide m-0 leading-none">
                                                {project.title}
                                            </h3>
                                            <div className="text-xs font-bold text-[#3a2f26] mb-2 font-serif">
                                                DEAD OR ALIVE
                                            </div>
                                        </div>

                                        <div className="px-2 mb-3 flex-grow">
                                            <p className="text-[#3a2f26]/80 text-sm line-clamp-3 text-center font-serif leading-tight">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="wanted-footer text-xl sm:text-2xl flex items-center justify-center gap-2 text-[#3a2f26]">
                                            <span className="text-sm font-bold align-top mt-1">฿</span>
                                            <span className="bounty-value">
                                                {/* Generate a pseudo-bounty based on ID length or just a random large number visual */}
                                                {(project.title.length * 1_500_000).toLocaleString()}
                                            </span>
                                            <span className="text-sm font-bold align-bottom mb-1">-</span>
                                        </div>

                                        {/* Hover Overlay for clicking */}
                                        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                                            <div className="bg-black/80 text-gold px-4 py-2 rounded font-bold transform rotate-[-5deg] border border-gold">
                                                VIEW RECORD
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Search className="w-16 h-16 text-fog/30 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-fog">No projects found</h3>
                        <p className="text-fog/60">Try selecting a different filter.</p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
