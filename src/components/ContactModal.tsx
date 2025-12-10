"use client";

import { useState } from "react";
import { X, Loader2, Send } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Form submitted:", formData);
        setSubmitted(true);
        setLoading(false);

        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", company: "", message: "" });
            onClose();
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-lg bg-[#0a0505] border border-crimson-red/30 rounded-2xl shadow-[0_0_50px_rgba(220,20,60,0.1)] overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Let&apos;s <span className="text-crimson-red">Talk</span></h2>
                    <p className="text-gray-400 mb-6 text-sm">
                        Tell us about your project or just say hello. We&apos;ll get back to you shortly.
                    </p>

                    {submitted ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="w-16 h-16 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center border border-green-900/50">
                                <Send size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                            <p className="text-gray-400">We&apos;ll be in touch soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1515] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-crimson-red focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1515] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-crimson-red focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Company (Optional)"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1515] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-crimson-red focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <textarea
                                        name="message"
                                        placeholder="Project details..."
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full bg-[#1a1515] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-crimson-red focus:outline-none transition-colors resize-none"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                className="w-full justify-center bg-crimson-red hover:bg-red-700 text-white border-none"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={18} />}
                                Send Message
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
