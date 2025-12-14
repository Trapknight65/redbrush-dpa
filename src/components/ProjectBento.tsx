"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@prisma/client";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function ProjectBento({ projects }: { projects: Project[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
            {/* Split into rows of 3 */}
            {Array.from({ length: Math.ceil((projects?.length || 0) / 3) }).map((_, rowIndex) => {
                const rowProjects = projects?.slice(rowIndex * 3, (rowIndex + 1) * 3);

                return (
                    <div key={rowIndex} className="flex flex-col md:flex-row gap-4 h-[500px] md:h-[400px] w-full">
                        {rowProjects.map((project, idx) => {
                            const actualIndex = rowIndex * 3 + idx;
                            const isHovered = hoveredIndex === actualIndex;

                            // Proportions:
                            // Golden Ratio approx 1.618
                            // Flex values:
                            // Hovered: flex-[3.14] (Pi) for impact, neighbors flex-1

                            return (
                                <div
                                    key={project.id}
                                    onMouseEnter={() => setHoveredIndex(actualIndex)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={cn(
                                        "relative border-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group cursor-pointer rounded-2xl",
                                        "flex-1", // Default
                                        isHovered ? "md:flex-[3.14]" : "md:flex-1"
                                    )}
                                >
                                    {/* Image with zoom */}
                                    <div className="absolute inset-0 w-full h-full">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-700">No Image</div>
                                        )}
                                        <div className={cn(
                                            "absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-300",
                                            isHovered ? "opacity-90" : "opacity-60"
                                        )} />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10 transition-all duration-500">

                                        {/* Category Tag */}
                                        <div className="mb-2 w-fit">
                                            <span className="text-xs bg-crimson-red text-white px-2 py-1 rounded font-bold uppercase tracking-wider shadow-lg">
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className={cn(
                                            "font-black text-white leading-none transition-all duration-500",
                                            isHovered ? "text-4xl mb-2" : "text-2xl mb-0"
                                        )}>
                                            {project.title}
                                        </h3>

                                        {/* Description & Tags (Revealed on Hover) */}
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-500 flex flex-col gap-4",
                                            isHovered ? "max-h-[300px] opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                                        )}>
                                            <p className="text-gray-300 text-sm leading-relaxed max-w-lg">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.tags?.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="text-[10px] uppercase tracking-wider border border-white/20 text-white/70 px-2 py-1 rounded bg-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link href={`/projects/${project.slug}`} className="mt-2 w-fit">
                                                <Button variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-crimson-red hover:border-crimson-red transition-all">
                                                    View Case Study
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
