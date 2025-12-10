'use client';

import { useState } from 'react';
import ExperienceCard from './ExperienceCard';
import { Experience } from '@/actions/profile.actions';

interface ExperienceCarouselProps {
    experiences: Experience[];
}

export default function ExperienceCarousel({ experiences }: ExperienceCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % experiences.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Experience</h2>

            {/* Desktop: Grid view */}
            <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {experiences.map((exp, index) => (
                    <ExperienceCard
                        key={index}
                        title={exp.title}
                        company={exp.company}
                        period={exp.period}
                        location={exp.location}
                        description={exp.description}
                        logo={exp.logo}
                    />
                ))}
            </div>

            {/* Mobile: Carousel view */}
            <div className="sm:hidden relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {experiences.map((exp, index) => (
                            <div key={index} className="w-full flex-shrink-0 px-2">
                                <ExperienceCard
                                    title={exp.title}
                                    company={exp.company}
                                    period={exp.period}
                                    location={exp.location}
                                    description={exp.description}
                                    logo={exp.logo}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-ocean-blue/80 backdrop-blur-sm text-canvas-white p-2 rounded-full shadow-lg hover:bg-ocean-blue transition-all z-10"
                    aria-label="Previous experience"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-ocean-blue/80 backdrop-blur-sm text-canvas-white p-2 rounded-full shadow-lg hover:bg-ocean-blue transition-all z-10"
                    aria-label="Next experience"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                    {experiences.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                ? 'bg-crimson-red w-8'
                                : 'bg-canvas-white/40 hover:bg-canvas-white/60'
                                }`}
                            aria-label={`Go to experience ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
