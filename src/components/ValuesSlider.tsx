'use client';

import { useState, useEffect } from 'react';

const values = [
    {
        emoji: "✨",
        title: "Excellence",
        description: "We strive for perfection in everything we do",
    },
    {
        emoji: "🤝",
        title: "Collaboration",
        description: "Your success is our success",
    },
    {
        emoji: "💡",
        title: "Innovation",
        description: "Always pushing boundaries",
    },
    {
        emoji: "🎯",
        title: "Results",
        description: "Data-driven decisions that work",
    },
];

export default function ValuesSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % values.length);
        }, 3000); // Auto-advance every 3 seconds

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <div className="relative bg-pure-white border border-gray-200 rounded-lg shadow-lg p-8 sm:p-12 overflow-hidden">
            <h3 className="text-2xl font-bold text-dark-gray mb-6 text-center">Our Values</h3>
            <div className="w-16 h-1 bg-crimson-red mx-auto mb-8"></div>

            {/* Slider Container */}
            <div className="relative h-64 sm:h-72 flex items-center justify-center">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${index === currentSlide
                            ? 'opacity-100 scale-100 translate-x-0'
                            : index < currentSlide
                                ? 'opacity-0 scale-90 -translate-x-full'
                                : 'opacity-0 scale-90 translate-x-full'
                            }`}
                    >
                        <div className="text-8xl sm:text-9xl mb-6 animate-bounce-slow">
                            {value.emoji}
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-crimson-red mb-3">
                            {value.title}
                        </h4>
                        <p className="text-charcoal text-center max-w-md px-4 text-sm sm:text-base">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
                {values.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-crimson-red w-8'
                            : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
