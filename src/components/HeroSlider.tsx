'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HeroSlide } from '@/actions/profile.actions';
import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const FrogViewer = dynamic(() => import('./FrogViewer'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-black/20 animate-pulse rounded-2xl" />
});

interface HeroSliderProps {
    slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (!slides || slides.length === 0) {
        // Fallback default content if no slides
        return (
            <div className="relative brush-mask w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-black/20 rounded-2xl flex items-center justify-center">
                <FrogViewer />
            </div>
        );
    }

    const currentSlide = slides[currentIndex];

    return (
        <div className="relative w-full h-full group">
            <div className="w-full h-full relative rounded-2xl overflow-hidden brush-mask">
                {currentSlide.type === '3d' && (
                    <div className="w-full h-full">
                        <FrogViewer />
                        {/* Note: generic GLB support would involve passing currentSlide.url to a generic viewer */}
                    </div>
                )}

                {currentSlide.type === 'video' && currentSlide.url && (
                    <video
                        src={currentSlide.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                    />
                )}

                {currentSlide.type === 'image' && currentSlide.url && (
                    <div className="relative w-full h-full">
                        <Image
                            src={currentSlide.url}
                            alt={currentSlide.alt || "Hero Slide"}
                            fill
                            className="object-cover"
                            priority={currentIndex === 0}
                        />
                    </div>
                )}
            </div>

            {/* Navigation (Only show if > 1 slide) */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-crimson-red w-6' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
