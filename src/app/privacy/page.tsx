import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-4xl">
            <h1 className="text-4xl font-bold text-amber-500 mb-8">Privacy Policy</h1>

            <div className="prose prose-invert prose-amber max-w-none space-y-8">
                <section className="bg-black/30 border border-amber-900/30 rounded-xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                    <p className="text-gray-300">
                        Welcome to Redbrush Digital Agency. We value your privacy and are committed to protecting your personal data.
                        This privacy policy explains how we collect and use your data when you visit our website.
                    </p>
                </section>

                <section className="bg-black/30 border border-amber-900/30 rounded-xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4">2. Data Collection</h2>
                    <p className="text-gray-300">
                        We collect minimal user data necessary for the functionality of this site. This may include:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                        <li>Cookies usage data (via Google Analytics or similar tools)</li>
                        <li>Contact form submissions (Name, Email, Message)</li>
                        <li>Server logs (IP address, Browser type)</li>
                    </ul>
                </section>

                <section className="bg-black/30 border border-amber-900/30 rounded-xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4">3. Cookie Policy</h2>
                    <p className="text-gray-300">
                        We use cookies to improve user experience. You can choose to accept or decline cookies through our cookie banner.
                    </p>
                </section>

                <section className="bg-black/30 border border-amber-900/30 rounded-xl p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white mb-4">4. Contact Us</h2>
                    <p className="text-gray-300">
                        If you have any questions about this Privacy Policy, please contact us at:
                        <br />
                        <a href="mailto:contact@redbrush.agency" className="text-amber-500 hover:text-amber-400 ml-1">contact@redbrush.agency</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
