'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExperienceCardProps {
    title: string;
    company: string;
    period: string;
    location?: string;
    description: string;
    logo: string;
}

export default function ExperienceCard({ title, company, period, location, description, logo }: ExperienceCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative h-64 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div className={`relative w-full h-full transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                {/* Front of card */}
                <div className="absolute w-full h-full backface-hidden bg-ocean-blue/[0.04] hover:shadow-inner hover:translate-y-1 transition-all duration-300 backdrop-blur-md border border-white/[0.03] rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="relative w-20 h-20 mb-4">
                        <Image
                            src={logo}
                            alt={`${company} logo`}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-sm text-ocean-blue mb-1">{company}</p>
                    <p className="text-xs opacity-70">{period}</p>
                    {location && <p className="text-xs opacity-50 mt-1">{location}</p>}
                    <p className="text-xs mt-4 opacity-60">Click to see details</p>
                </div>

                {/* Back of card */}
                <div className="absolute w-full h-full backface-hidden bg-ocean-blue/[0.08] backdrop-blur-md border border-white/[0.03] rounded-xl shadow-xl p-6 overflow-y-auto" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h3 className="font-bold text-base mb-3">{title}</h3>
                    <p className="text-sm text-ocean-blue mb-2">{company}</p>
                    <p className="text-xs opacity-70 mb-4">{period}</p>
                    <p className="text-xs leading-relaxed">{description}</p>
                    <p className="text-xs mt-4 opacity-60 text-center">Click to flip back</p>
                </div>
            </div>
        </div>
    );
}
