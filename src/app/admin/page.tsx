"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Anchor, Globe } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple hardcoded check for demo purposes
        if (password === "654321") {
            router.push("/admin/dashboard");
        } else {
            setError("Incorrect Captain's Code");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="bg-[#1a1515]/90 backdrop-blur-sm border-2 border-amber-700/50 rounded-lg p-8 shadow-2xl relative overflow-hidden">
                    {/* Metal Corners */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-600 rounded-tl-sm" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-600 rounded-tr-sm" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-600 rounded-bl-sm" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-600 rounded-br-sm" />

                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-600/30">
                            <Anchor className="w-8 h-8 text-amber-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-amber-500 mb-2 uppercase tracking-widest">Captain's Quarters</h1>
                        <p className="text-amber-200/50 text-sm">Secure Entry Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-amber-700 text-xs uppercase tracking-wider font-bold mb-2">Access Code</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-700" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#0a0505] border border-amber-900/50 rounded p-3 pl-10 text-amber-100 focus:outline-none focus:border-amber-600 transition-colors font-mono"
                                    placeholder="Enter passcode..."
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-sm text-center font-bold bg-red-950/30 py-2 rounded border border-red-900/50"
                            >
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full border-amber-600 bg-amber-900/50 hover:bg-amber-800 text-amber-200"
                        >
                            Unlock Logbook
                        </Button>

                        <div className="text-center mt-4">
                            <a href="/" className="text-amber-800/60 hover:text-amber-600 text-xs flex items-center justify-center gap-1">
                                <Globe className="w-3 h-3" /> Return to Surface
                            </a>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
