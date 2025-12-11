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
        <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[var(--dev-bg)]">

            {/* Background Decorations (Neumorphic Emboss) */}
            <div className="absolute top-10 left-10 pointer-events-none opacity-20 z-0">
                <Github size={300} className="neu-icon-embossed rotate-12" />
            </div>
            <div className="absolute bottom-10 right-10 pointer-events-none opacity-20 z-0">
                <ExternalLink size={300} className="neu-icon-embossed -rotate-12" />
            </div>

            {/* Slide Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent flex items-center justify-center relative z-10">
                <div className="max-w-4xl w-full space-y-8 animate-in fade-in duration-500 key={currentSlide}">
                    <div className="neu-flat p-8 md:p-16 rounded-2xl relative overflow-hidden min-h-[60vh] flex flex-col justify-center">
                        {/* Inner Bevel Highlight */}
                        <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />

                        <article className="prose prose-sm md:prose-xl prose-invert max-w-none 
                            prose-headings:font-black prose-headings:text-white prose-headings:tracking-tighter prose-headings:leading-none prose-headings:mb-8 prose-headings:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]
                            prose-h1:text-4xl md:prose-h1:text-6xl
                            prose-h2:text-2xl md:prose-h2:text-4xl prose-h2:text-[var(--dev-neon-blue)]
                            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-8
                            prose-strong:text-[var(--dev-neon-pink)]
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-8 prose-li:text-gray-300 prose-li:mb-2
                            prose-blockquote:border-l-4 prose-blockquote:border-[var(--dev-neon-green)] prose-blockquote:bg-[var(--dev-neon-green)]/10 prose-blockquote:p-6 prose-blockquote:rounded-r prose-blockquote:mb-8
                            prose-a:text-[var(--dev-neon-green)] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-[var(--dev-neon-yellow)] prose-a:transition-colors
                            prose-pre:bg-[#121212] prose-pre:border prose-pre:border-white/10 prose-pre:shadow-2xl prose-pre:backdrop-blur-md prose-pre:rounded-xl prose-pre:mb-8
                            prose-code:text-[var(--dev-neon-yellow)] prose-code:font-mono prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                            prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:mb-8
                            ">
                            <ReactMarkdown>
                                {slides[currentSlide]}
                            </ReactMarkdown>
                        </article>
                    </div>
                </div>
            </div>

            {/* Navigation Bar (Bottom) */}
            <div className="p-6 md:p-8 bg-black/20 backdrop-blur-sm flex items-center justify-between relative z-20">

                {/* External Links */}
                <div className="flex gap-4">
                    {repoUrl && (
                        <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="neu-flat px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-all active:neu-pressed active:scale-95">
                            <Github size={14} /> REPO
                        </a>
                    )}
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="neu-flat px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[var(--dev-neon-green)] transition-all active:neu-pressed active:scale-95">
                            <ExternalLink size={14} /> DEMO
                        </a>
                    )}
                </div>

                {/* Slider Controls */}
                {slides.length > 1 && (
                    <div className="flex items-center gap-6">
                        <button onClick={prevSlide} className="neu-flat w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all active:neu-pressed active:scale-95">
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex gap-3">
                            {slides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-[var(--dev-neon-blue)] shadow-[0_0_10px_var(--dev-neon-blue)] scale-125' : 'bg-[#1a1515] shadow-[inset_2px_2px_4px_#050505,inset_-2px_-2px_4px_#2a2a2a]'}`}
                                />
                            ))}
                        </div>

                        <button onClick={nextSlide} className="neu-flat w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all active:neu-pressed active:scale-95">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

                {/* Counter */}
                <div className="text-xs font-mono text-gray-600 font-bold tracking-widest">
                    {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
