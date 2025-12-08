import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: ButtonProps) {

    const baseStyles = "font-semibold transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 hover:-translate-y-0.5";

    const variants = {
        primary: "bg-crimson-red text-canvas-white hover-haki border-2 border-transparent",
        secondary: "bg-transparent text-crimson-red border-2 border-crimson-red hover-haki hover:text-white",
        ghost: "bg-transparent text-canvas-white hover:text-crimson-red border-2 border-transparent hover:border-crimson-red hover-haki",
    };

    const sizes = {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-2.5",
        lg: "text-lg px-8 py-3",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
