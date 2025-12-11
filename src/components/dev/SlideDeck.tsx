"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";

interface SlideDeckProps {
    content: string;
    repoUrl?: string | null;
    demoUrl?: string | null;
}

export default function SlideDeck({ content, repoUrl, demoUrl }: SlideDeckProps) {
    const slides = content.split("---").map(s => s.trim());
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="flex-1 flex flex-col h-full relative">
            {/* Slide Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent flex items-center justify-center">
                <div className="max-w-4xl w-full space-y-8 animate-in fade-in duration-500 key={currentSlide}"> {/* Key forces re-render/animation on slide change if desired, or remove for smooth */}
                    <article className="prose prose-sm md:prose-xl prose-invert max-w-none 
                        prose-headings:font-black prose-headings:text-white prose-headings:tracking-tighter prose-headings:leading-none
                        prose-h1:text-4xl md:prose-h1:text-6xl
                        prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:text-[var(--dev-neon-blue)]
                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg
                        prose-strong:text-[var(--dev-neon-pink)]
                        prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-300
                        prose-blockquote:border-l-4 prose-blockquote:border-[var(--dev-neon-green)] prose-blockquote:bg-[var(--dev-neon-green)]/10 prose-blockquote:p-4 prose-blockquote:rounded-r
                        ">
                        <ReactMarkdown>
                            {slides[currentSlide]}
                        </ReactMarkdown>
                    </article>
                </div>
            </div>

            {/* Navigation Bar (Bottom) */}
            <div className="p-4 border-t border-white/5 bg-black/40 backdrop-blur-md flex items-center justify-between">

                {/* External Links */}
                <div className="flex gap-4">
                    {repoUrl && (
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-widest">
                            <Github size={14} /> Repository
                        </a>
                    )}
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-[var(--dev-neon-green)] transition-colors uppercase tracking-widest">
                            <ExternalLink size={14} /> Live Demo
                        </a>
                    )}
                </div>

                {/* Slider Controls */}
                {slides.length > 1 && (
                    <div className="flex items-center gap-6">
                        <button onClick={prevSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex gap-2">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-[var(--dev-neon-blue)] w-6' : 'bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>

                        <button onClick={nextSlide} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* Counter */}
                <div className="text-xs font-mono text-gray-600">
                    SLIDE {currentSlide + 1} / {slides.length}
                </div>
            </div>
        </div>
    );
}
