'use client';

import { useState } from 'react';

const missionPoints = [
    {
        icon: "🎨",
        title: "Great Design",
        description: "Stunning visuals that captivate",
    },
    {
        icon: "💻",
        title: "Clean Code",
        description: "Scalable & maintainable solutions",
    },
    {
        icon: "📈",
        title: "Strategic Thinking",
        description: "Data-driven decisions",
    },
];

export default function MissionSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="relative bg-gradient-to-br from-crimson-red to-electric-blue text-white rounded-lg shadow-2xl p-8 sm:p-12 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Our Mission</h3>
                <div className="w-24 h-1 bg-white mx-auto mb-6"></div>

                <p className="text-base sm:text-lg leading-relaxed mb-8 text-center max-w-2xl mx-auto opacity-95">
                    To empower businesses with cutting-edge digital solutions that not only look stunning but deliver <span className="font-bold underline decoration-wavy">measurable results</span>.
                </p>

                {/* Mission Points Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {missionPoints.map((point, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transition-all duration-300 cursor-pointer border-2 border-white/20 ${hoveredIndex === index
                                ? 'scale-105 bg-white/20 border-white shadow-xl'
                                : 'hover:bg-white/15'
                                }`}
                        >
                            <div className={`text-5xl mb-3 transition-transform duration-300 ${hoveredIndex === index ? 'scale-125 rotate-12' : ''
                                }`}>
                                {point.icon}
                            </div>
                            <h4 className="font-bold text-lg mb-2">{point.title}</h4>
                            <p className="text-sm opacity-90">{point.description}</p>
                        </div>
                    ))}
                </div>

                {/* Tagline */}
                <div className="mt-8 text-center">
                    <p className="text-sm sm:text-base font-semibold opacity-90 italic">
                        "We believe in the power of exceptional digital experiences"
                    </p>
                </div>
            </div>
        </div>
    );
}
