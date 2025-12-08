"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioProjects } from "@/data/portfolio";
import Link from "next/link";
import Card from "@/components/Card";
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
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="bg-dark-gray text-white py-16 sm:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            Case Studies Library
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
                            Explore our comprehensive collection of projects, insights, and solutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-0 z-20 bg-pure-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
                    <div className="flex space-x-2 min-w-max">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag === tag
                                        ? "bg-crimson-red text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-charcoal hover:bg-gray-200"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link href={`/portfolio/${project.id}`} className="group block h-full">
                                    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-gray-100 hover:border-crimson-red/20 flex flex-col">
                                        <div className="bg-gray-50 h-48 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                            {project.image}
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {project.tags?.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="text-xs font-semibold text-crimson-red bg-crimson-red/5 px-2 py-1 rounded">
                                                        #{tag}
                                                    </span>
                                                ))}
                                                {(project.tags?.length || 0) > 3 && (
                                                    <span className="text-xs text-gray-400 py-1">+{(project.tags?.length || 0) - 3} more</span>
                                                )}
                                            </div>
                                            <h3 className="text-2xl font-bold text-dark-gray mb-2 group-hover:text-crimson-red transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-charcoal/80 text-sm line-clamp-3 mb-4 flex-grow">
                                                {project.description}
                                            </p>
                                            <div className="text-crimson-red font-semibold text-sm flex items-center mt-auto">
                                                Read Case Study <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
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
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">No projects found</h3>
                        <p className="text-gray-400">Try selecting a different tag.</p>
                    </motion.div>
                )}
            </section>
        </div>
    );
}
