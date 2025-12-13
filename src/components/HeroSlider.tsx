'use client';

import { useState, useCallback, useEffect } from 'react';
import { HeroSlide } from '@/actions/profile.actions';
import { ChevronUp, ChevronDown } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

interface HeroSliderProps {
    slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
    const videoSlides = slides?.filter(s => s.type === 'video') || [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onInit = useCallback((emblaApi: any) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on('reInit', onInit);
        emblaApi.on('reInit', onSelect);
        emblaApi.on('select', onSelect);
    }, [emblaApi, onInit, onSelect]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    if (videoSlides.length === 0) {
        return (
            <div className="w-full h-full bg-black/20 rounded-2xl flex items-center justify-center text-white/50 text-sm">
                No videos available
            </div>
        );
    }

    return (
        <div className="relative w-full h-full group">
            <div className="w-full h-full overflow-hidden rounded-2xl brush-mask" ref={emblaRef}>
                <div className="flex flex-col w-full h-full touch-pan-x">
                    {videoSlides.map((slide, index) => (
                        <div className="flex-[0_0_100%] min-h-0 relative w-full h-full" key={index}>
                            {slide.url && (
                                <video
                                    src={slide.url}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation (Only show if > 1 slide) */}
            {videoSlides.length > 1 && (
                <>
                    <button
                        onClick={scrollPrev}
                        className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <ChevronUp size={24} />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    >
                        <ChevronDown size={24} />
                    </button>

                    {/* Dots (Vertical on right) */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollTo(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === selectedIndex ? 'bg-crimson-red h-6' : 'bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
