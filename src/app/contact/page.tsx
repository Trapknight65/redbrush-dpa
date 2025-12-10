'use client';

import { useState } from 'react';
import Button from "@/components/ui/Button";
import Card from "@/components/Card";
import ContactModal from "@/components/ContactModal";
import { getProfile, ContactInfo } from "@/actions/profile.actions";
import { useEffect } from 'react';

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await getProfile();
            if (data?.contactInfo) {
                // Cast to unknown first to avoid potential type mismatches with JSON
                setContactInfo(data.contactInfo as unknown as ContactInfo);
            }
        }
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-4 sm:mb-6">
                        Let&apos;s <span className="text-crimson-red">Work Together</span>
                    </h1>
                    <div className="flex items-center justify-center gap-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
                        <p className="text-base sm:text-lg lg:text-xl text-charcoal text-right flex-1">
                            Have a project in mind? We&apos;d love to hear from you.
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => setIsModalOpen(true)}
                            className="bg-crimson-red text-white hover:bg-red-700 shadow-lg flex-shrink-0"
                        >
                            <span className="mr-2">Let&apos;s Talk</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </Button>
                    </div>
                </div>
            </section>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {/* Contact Info Footer */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Get in touch" className="h-full">
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-dark-gray mb-2">📧 Email</h4>
                                <p className="text-charcoal break-all">{contactInfo?.email || "hello@redbrush.agency"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-dark-gray mb-2">📞 Phone</h4>
                                <p className="text-charcoal">{contactInfo?.phone || "+1 (555) 123-4567"}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-dark-gray mb-2">📍 Location</h4>
                                <p className="text-charcoal whitespace-pre-line">
                                    {contactInfo?.address || "123 Creative Street\nSan Francisco, CA 94102\nUnited States"}
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Card title="Socials & Hours" className="h-full">
                        <div className="space-y-6">
                            {contactInfo?.socials && contactInfo.socials.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-dark-gray mb-2">Connect with us</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {contactInfo.socials.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm text-charcoal transition-colors border border-gray-300"
                                            >
                                                {social.platform}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2 text-charcoal pt-4 border-t border-gray-100">
                                <h4 className="font-semibold text-dark-gray mb-2">Business Hours</h4>
                                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                                <p><strong>Saturday:</strong> 10:00 AM - 4:00 PM</p>
                                <p><strong>Sunday:</strong> Closed</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
}
