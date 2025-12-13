"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProjectGalleryWrapperProps {
    children: React.ReactNode;
    gallery: string[];
}

export default function ProjectGalleryWrapper({ children, gallery }: ProjectGalleryWrapperProps) {
    const ctaRef = useRef<HTMLDivElement>(null);
    const [galleryHeight, setGalleryHeight] = useState<number>(0);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Golden Ratio calculation
    useEffect(() => {
        const updateHeight = () => {
            if (ctaRef.current) {
                const ctaHeight = ctaRef.current.offsetHeight;
                setGalleryHeight(ctaHeight * 1.618);
            }
        };

        // Initial measurement
        updateHeight();

        // Brief delay to ensure styles/fonts loaded
        const timer = setTimeout(updateHeight, 100);

        // Resize listener
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
            clearTimeout(timer);
        };
    }, [children]); // Re-run if children change

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! + 1) % gallery.length);
        }
    };
    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex]);

    if (!gallery || gallery.length === 0) {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col gap-6">
            {/* CTA Container (Measured) */}
            <div ref={ctaRef}>
                {children}
            </div>

            {/* Gallery / Slider Container */}
            <div
                className="relative w-full overflow-hidden transition-all duration-500 ease-out border border-white/5 bg-black/50 rounded-lg"
                style={{ height: galleryHeight ? `${galleryHeight}px` : '300px' }}
            >
                <AnimatePresence mode="wait">
                    {lightboxIndex === null ? (
                        // Grid View
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full grid grid-cols-3 gap-1 p-1"
                        >
                            {gallery.slice(0, 9).map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    className="relative w-full h-full cursor-pointer group overflow-hidden rounded bg-black/50"
                                    onClick={() => openLightbox(idx)}
                                >
                                    <Image
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        // Slider View (In-Sidebar)
                        <motion.div
                            key="slider"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 z-10 flex flex-col"
                        >
                            {/* Controls */}
                            <div className="absolute top-2 right-2 z-20 flex gap-2">
                                <button
                                    onClick={closeLightbox}
                                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all"
                                    title="Back to Grid"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" /><rect width="7" height="7" x="14" y="3" /><rect width="7" height="7" x="14" y="14" /><rect width="7" height="7" x="3" y="14" /></svg>
                                </button>
                            </div>

                            {/* Main Image */}
                            <div className="relative flex-1 w-full h-full group">
                                <Image
                                    src={gallery[lightboxIndex]}
                                    alt="Detail view"
                                    fill
                                    className="object-cover"
                                    quality={90}
                                />
                                {/* Nav Buttons (Overlay) */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white/50 hover:text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white/50 hover:text-white p-2 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/40 rounded-full backdrop-blur-sm">
                                {gallery.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${idx === lightboxIndex ? 'bg-white scale-125' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
