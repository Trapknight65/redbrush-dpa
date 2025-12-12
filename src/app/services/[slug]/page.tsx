import { getServiceBySlug } from "@/actions/service.actions";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";
import * as LucideIcons from "lucide-react";

// Helper to render icon dynamically
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore - Dynamic access
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as any;
    return Icon ? <Icon className={className} /> : <span className={className}>{name}</span>;
}

export default async function ServiceDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: service } = await getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white text-dark-gray">
            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 p-6 bg-crimson-red/5 rounded-2xl">
                        <IconRenderer name={service.icon} className="w-20 h-20 text-crimson-red" />
                    </div>
                    <div>
                        <Link href="/services" className="text-crimson-red hover:text-crimson-red/80 mb-4 inline-block text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                            <LucideIcons.ArrowLeft className="w-4 h-4" /> Back to Services
                        </Link>
                        <h1 className="text-4xl sm:text-5xl font-bold text-dark-gray mb-4">
                            {service.title}
                        </h1>
                        <p className="text-lg md:text-xl text-charcoal max-w-2xl">
                            {service.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Features */}
                    <div className="lg:col-span-2">
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <LucideIcons.CheckCircle2 className="w-6 h-6 text-crimson-red" />
                                What's Included
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {service.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                        <LucideIcons.Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-charcoal font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <LucideIcons.Zap className="w-10 h-10 text-sunset-gold mb-4" />
                                    <h3 className="text-lg font-bold mb-2">Speed & Performance</h3>
                                    <p className="text-charcoal text-sm">We prioritize performance to ensure your digital product provides the best user experience.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <LucideIcons.Shield className="w-10 h-10 text-deep-sea mb-4" />
                                    <h3 className="text-lg font-bold mb-2">Security First</h3>
                                    <p className="text-charcoal text-sm">Robust security measures are integrated from the start to protect your data and users.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <LucideIcons.LayoutTemplate className="w-10 h-10 text-crimson-red mb-4" />
                                    <h3 className="text-lg font-bold mb-2">Scalable Architecture</h3>
                                    <p className="text-charcoal text-sm">Designed to grow with your business, ensuring long-term sustainability and flexibility.</p>
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <LucideIcons.HeartHandshake className="w-10 h-10 text-green-600 mb-4" />
                                    <h3 className="text-lg font-bold mb-2">Dedicated Support</h3>
                                    <p className="text-charcoal text-sm">We are with you every step of the way, from initial concept to post-launch maintenance.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / CTA */}
                    <aside className="lg:col-span-1 space-y-8">
                        {service.price && (
                            <div className="bg-deep-sea p-8 rounded-2xl text-white shadow-xl">
                                <h3 className="text-lg font-medium text-white/80 mb-2">Starting at</h3>
                                <div className="text-4xl font-bold text-white mb-6">
                                    {service.price}
                                </div>
                                <p className="text-sm text-white/70 mb-8 border-t border-white/10 pt-4">
                                    * Final price depends on project scope and requirements.
                                </p>
                                <Link href="/contact" className="block">
                                    <Button className="w-full bg-crimson-red hover:bg-crimson-red/90 text-white font-bold py-4">
                                        Get A Quote
                                    </Button>
                                </Link>
                            </div>
                        )}
                        {!service.price && (
                            <div className="bg-deep-sea p-8 rounded-2xl text-white shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Start Your Project</h3>
                                <p className="text-white/80 mb-8">
                                    Ready to transform your business? Contact us to discuss your needs.
                                </p>
                                <Link href="/contact" className="block">
                                    <Button className="w-full bg-crimson-red hover:bg-crimson-red/90 text-white font-bold py-4">
                                        Contact Us
                                    </Button>
                                </Link>
                            </div>
                        )}

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-dark-gray mb-4">Need something custom?</h3>
                            <p className="text-sm text-charcoal mb-4">
                                We also offer bespoke solutions tailored to unique business challenges.
                            </p>
                            <Link href="/contact" className="text-crimson-red font-medium hover:underline text-sm">
                                Talk to an expert &rarr;
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
