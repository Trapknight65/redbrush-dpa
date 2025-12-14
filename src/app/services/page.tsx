import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getServices } from "@/actions/service.actions";
import ServiceBento from "@/components/ServiceBento";
import * as LucideIcons from "lucide-react";

// Helper to render icon dynamically
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore - Dynamic access
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as any;
    return Icon ? <Icon className={className} /> : <span className={className}>{name}</span>;
}

export default async function Services() {
    const { data: services } = await getServices();

    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-4 sm:mb-6">
                        Our <span className="text-crimson-red">Services</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-charcoal max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
                        We offer comprehensive digital solutions to help your business thrive in the modern digital landscape.
                        From design to development, marketing to strategy—we've got you covered.
                    </p>
                </div>
            </section>

            {/* Services Grid (Bento Slider) */}
            <ServiceBento services={services || []} />

            {/* Process Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-dark-gray mb-4">
                        Our <span className="text-crimson-red">Process</span>
                    </h2>
                    <p className="text-lg text-charcoal max-w-2xl mx-auto">
                        We follow a proven methodology to deliver exceptional results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { step: "01", title: "Discovery", description: "We learn about your business, goals, and target audience" },
                        { step: "02", title: "Strategy", description: "We develop a tailored plan to achieve your objectives" },
                        { step: "03", title: "Execution", description: "We bring your vision to life with precision and creativity" },
                        { step: "04", title: "Launch & Support", description: "We deploy your solution and provide ongoing support" }
                    ].map((phase, index) => (
                        <div key={index} className="text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-5xl font-bold text-crimson-red/10 mb-2">{phase.step}</div>
                            <h3 className="text-xl font-bold text-dark-gray mb-2">{phase.title}</h3>
                            <p className="text-sm text-charcoal">{phase.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="bg-crimson-red rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl shadow-crimson-red/20">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
                        Let's discuss how we can help transform your digital presence.
                    </p>
                    <Link href="/contact">
                        <Button variant="secondary" className="bg-white text-crimson-red hover:bg-off-white border-white px-8 py-3 text-lg font-bold">
                            Contact Us Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
