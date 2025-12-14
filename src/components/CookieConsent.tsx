"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: true,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookieConsent", "true");
        localStorage.setItem("cookiePreferences", JSON.stringify({ necessary: true, analytics: true, marketing: true }));
        setIsVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem("cookieConsent", "custom");
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        setIsVisible(false);
        setShowPreferences(false);
    };

    const handleDeclineAll = () => {
        localStorage.setItem("cookieConsent", "false");
        localStorage.setItem("cookiePreferences", JSON.stringify({ necessary: true, analytics: false, marketing: false }));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    if (showPreferences) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-[#1a1515] border border-amber-900/30 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-amber-500">Cookie Preferences</h3>
                        <button onClick={() => setShowPreferences(false)} className="text-gray-400 hover:text-white"><X size={20} /></button>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-white">Strictly Necessary</h4>
                                <p className="text-xs text-gray-400 max-w-[250px]">Required for the website to function. Cannot be disabled.</p>
                            </div>
                            <div className="w-10 h-5 bg-amber-600/50 rounded-full relative cursor-not-allowed">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-white">Analytics</h4>
                                <p className="text-xs text-gray-400 max-w-[250px]">Help us understand how you use our site.</p>
                            </div>
                            <button
                                onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                                className={cn("w-10 h-5 rounded-full relative transition-colors", preferences.analytics ? "bg-amber-600" : "bg-gray-700")}
                            >
                                <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", preferences.analytics ? "right-1" : "left-1")} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-white">Marketing</h4>
                                <p className="text-xs text-gray-400 max-w-[250px]">Used to deliver relevant advertisements.</p>
                            </div>
                            <button
                                onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                                className={cn("w-10 h-5 rounded-full relative transition-colors", preferences.marketing ? "bg-amber-600" : "bg-gray-700")}
                            >
                                <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", preferences.marketing ? "right-1" : "left-1")} />
                            </button>
                        </div>
                    </div>
                    <div className="p-6 border-t border-white/10 flex justify-end gap-3 bg-black/20">
                        <button onClick={handleDeclineAll} className="px-4 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Reject All</button>
                        <button onClick={handleSavePreferences} className="px-4 py-2 rounded text-sm font-bold bg-amber-600 text-black hover:bg-amber-500 transition-colors">Save Preferences</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-700">
            <div className="bg-[#1a1515]/95 backdrop-blur-md border border-amber-900/30 rounded-xl shadow-2xl p-6 relative overflow-hidden group">
                {/* Background Noise/Texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

                <div className="relative z-10 flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-amber-900/20 flex items-center justify-center border border-amber-700/50 group-hover:bg-amber-900/40 transition-colors">
                            <Cookie className="w-5 h-5 text-amber-500" />
                        </div>
                    </div>

                    <div className="space-y-3 flex-1">
                        <div>
                            <h4 className="font-bold text-amber-500 text-sm uppercase tracking-wider mb-1 flex justify-between items-center">
                                Cookie Policy
                                <a href="/privacy" className="text-[10px] text-gray-500 hover:text-amber-500 underline decoration-amber-500/30">Read Policy</a>
                            </h4>
                            <p className="text-xs text-gray-300 leading-relaxed">
                                We use cookies to enhance your experience.
                                <button onClick={() => setShowPreferences(true)} className="ml-1 text-amber-500 hover:underline">
                                    Customize settings
                                </button>.
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-1 gap-2">
                            <button
                                onClick={handleDeclineAll}
                                className="text-xs font-medium text-gray-400 hover:text-white px-2 py-2 transition-colors"
                            >
                                Decline
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowPreferences(true)}
                                    className="text-xs font-medium text-amber-500 hover:text-amber-400 px-3 py-2 bg-amber-900/10 rounded border border-amber-900/20 hover:bg-amber-900/20 transition-all"
                                >
                                    Customize
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="text-xs font-bold bg-amber-600 text-[#120c0c] px-4 py-2 rounded hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/20"
                                >
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
