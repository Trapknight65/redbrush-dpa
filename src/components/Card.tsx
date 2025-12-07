import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function Card({ children, title, className = '' }: CardProps) {
    return (
        <div className={`bg-ocean-blue/[0.04] backdrop-blur-md border border-white/[0.03] rounded-xl shadow-xl :hover-border-deep-sea/[0.1] hover:shadow-inner hover:translate-y-1 transition-all duration-300 p-8 relative overflow-hidden ${className}`}>
            {title && (
                <div className="mb-6">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                </div>
            )}

            <div className="text-ink-black">
                {children}
            </div>
        </div>
    )
}
