"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "false");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50">
            <div className="bg-[#1a1515]/95 backdrop-blur-md border border-amber-900/30 rounded-xl shadow-2xl p-6 relative overflow-hidden">
                {/* Background Noise/Texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

                <div className="relative z-10 flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-amber-900/20 flex items-center justify-center border border-amber-700/50">
                            <Cookie className="w-5 h-5 text-amber-500" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div>
                            <h4 className="font-bold text-amber-500 text-sm uppercase tracking-wider mb-1">
                                Cookie Policy
                            </h4>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                We use cookies to enhance your navigation experience and analyze our traffic. No personal data is sold.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                            <button
                                onClick={handleDecline}
                                className="text-xs font-medium text-gray-400 hover:text-white px-3 py-2 transition-colors"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="text-xs font-bold bg-amber-600 text-[#120c0c] px-4 py-2 rounded hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20"
                            >
                                Accept Cookies
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-white p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
