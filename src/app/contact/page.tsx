'use client';

import { useState } from 'react';
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd send this to an API
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-4 sm:mb-6">
                        Let's <span className="text-crimson-red">Work Together</span>
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-charcoal max-w-2xl mx-auto px-4">
                        Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Form */}
                    <Card title="Send us a message">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson-red focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson-red focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-semibold text-charcoal mb-2">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson-red focus:border-transparent"
                                    placeholder="Your Company"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson-red focus:border-transparent resize-none"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            {submitted && (
                                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                    Thank you! We'll get back to you soon.
                                </div>
                            )}

                            <Button type="submit" variant="primary" size="lg" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </Card>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card title="Get in touch">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-dark-gray mb-2">📧 Email</h4>
                                    <p className="text-charcoal">hello@redbrush.agency</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-dark-gray mb-2">📞 Phone</h4>
                                    <p className="text-charcoal">+1 (555) 123-4567</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-dark-gray mb-2">📍 Location</h4>
                                    <p className="text-charcoal">
                                        123 Creative Street<br />
                                        San Francisco, CA 94102<br />
                                        United States
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card title="Business Hours">
                            <div className="space-y-2 text-charcoal">
                                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                                <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                                <p><strong>Sunday:</strong> Closed</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
