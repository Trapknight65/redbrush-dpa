import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getServices } from "@/actions/service.actions";
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

            {/* Services Grid (Bento Style) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {services?.map((service: any, index: number) => {
                        // Bento Logic: First item spans 2 cols, 4th item spans 2 cols, etc.
                        const isWide = index === 0 || index === 3 || index === 6;

                        return (
                            <Card
                                key={service.id}
                                className={`
                                    flex flex-col h-full border border-white/10 bg-black/40 backdrop-blur-md 
                                    hover:border-crimson-red/50 transition-all duration-300 shadow-xl hover:shadow-crimson-red/20
                                    group relative overflow-hidden
                                    ${isWide ? 'md:col-span-2' : ''}
                                `}
                            >
                                {/* Decorative Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-crimson-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="text-crimson-red mb-6 flex justify-between items-start relative z-10">
                                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        <IconRenderer name={service.icon} className="w-8 h-8 sm:w-10 sm:h-10" />
                                    </div>
                                    <span className="text-4xl font-black text-white/5">{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 relative z-10 uppercase tracking-tight">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 mb-6 flex-grow text-sm sm:text-base relative z-10 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {service.description}
                                </p>

                                <div className="mt-auto relative z-10">
                                    <div className="h-px w-full bg-gradient-to-r from-crimson-red/50 to-transparent mb-4" />
                                    <h4 className="text-xs font-bold text-crimson-red mb-3 uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-crimson-red animate-pulse" />
                                        Includes
                                    </h4>
                                    <ul className={`grid ${isWide ? 'grid-cols-2 gap-x-4' : 'grid-cols-1'} gap-y-2`}>
                                        {service.features.map((feature: string, idx: number) => (
                                            <li key={idx} className="text-sm text-gray-400 flex items-center gap-2 group-hover:text-gray-300 transition-colors">
                                                <div className="w-1 h-1 bg-crimson-red rounded-full" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Card>
                        );
                    })}
                    {!services?.length && (
                        <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-3xl">
                            <LucideIcons.Ghost className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl text-gray-400 font-bold mb-2">No Services Found</h3>
                            <p className="text-gray-600">Head to the Admin Panel to add your services.</p>
                        </div>
                    )}
                </div>
            </section>

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
