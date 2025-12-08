'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full bg-pure-white/80 backdrop-blur-md text-dark-gray shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
                            <Image
                                src="/logo.webp"
                                alt="Redbrush Studios Logo"
                                width={50}
                                height={50}
                                className="object-contain w-12 h-12 sm:w-14 sm:h-14"
                                priority
                                unoptimized
                            />
                            <div className="flex flex-col justify-center leading-none">
                                <span className="text-xl sm:text-2xl font-bold tracking-tight text-crimson-red">
                                    Redbrush
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-charcoal uppercase" style={{ letterSpacing: '0.55em' }}>
                                    Studios
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="text-base font-medium text-charcoal hover:text-crimson-red transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-crimson-red transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            href="/contact"
                            className="px-4 lg:px-6 py-2 lg:py-2.5 bg-crimson-red text-white rounded-full font-semibold hover:bg-electric-blue transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm lg:text-base"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-charcoal hover:text-crimson-red p-2"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-pure-white border-t border-gray-200 shadow-lg">
                    <nav className="px-4 py-4 space-y-3">
                        {['Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="block py-2 text-base font-medium text-charcoal hover:text-crimson-red transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="block w-full text-center px-6 py-3 bg-crimson-red text-white rounded-full font-semibold hover:bg-electric-blue transition-all shadow-md mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
