import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";

export default function Services() {
    const services = [
        {
            icon: "🎨",
            title: "Web Design & Development",
            description: "Custom websites and web applications built with modern technologies. Responsive, fast, and optimized for conversions.",
            features: ["Responsive Design", "Performance Optimization", "SEO-Friendly", "Custom CMS"]
        },
        {
            icon: "📱",
            title: "Digital Marketing",
            description: "Data-driven marketing strategies to grow your online presence and reach your target audience effectively.",
            features: ["Social Media Marketing", "Content Strategy", "Email Campaigns", "Analytics & Reporting"]
        },
        {
            icon: "✨",
            title: "UX/UI Design",
            description: "User-centered design that creates intuitive and engaging experiences for your customers.",
            features: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
        },
        {
            icon: "🚀",
            title: "Branding & Identity",
            description: "Build a memorable brand that resonates with your audience and stands out from the competition.",
            features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"]
        },
        {
            icon: "💼",
            title: "E-Commerce Solutions",
            description: "Complete e-commerce platforms that drive sales and provide seamless shopping experiences.",
            features: ["Online Stores", "Payment Integration", "Inventory Management", "Order Tracking"]
        },
        {
            icon: "🔧",
            title: "Consulting & Strategy",
            description: "Expert guidance to help you navigate the digital landscape and achieve your business goals.",
            features: ["Digital Strategy", "Tech Consulting", "Growth Planning", "Performance Audits"]
        }
    ];

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

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {services.map((service, index) => (
                        <Card key={index} className="flex flex-col h-full">
                            <div className="text-5xl sm:text-6xl mb-4 text-center">{service.icon}</div>
                            <h3 className="text-xl sm:text-2xl font-bold text-dark-gray mb-3 text-center">
                                {service.title}
                            </h3>
                            <p className="text-charcoal mb-4 flex-grow text-sm sm:text-base">
                                {service.description}
                            </p>

                            <div className="mt-auto">
                                <h4 className="text-xs font-semibold text-charcoal mb-2 uppercase tracking-wide">
                                    Key Features:
                                </h4>
                                <ul className="space-y-1.5">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="text-sm text-charcoal flex items-start">
                                            <span className="text-crimson-red mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    ))}
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
                        <div key={index} className="text-center">
                            <div className="text-5xl font-bold text-crimson-red/20 mb-2">{phase.step}</div>
                            <h3 className="text-xl font-bold text-dark-gray mb-2">{phase.title}</h3>
                            <p className="text-sm text-charcoal">{phase.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="bg-crimson-red rounded-2xl p-8 sm:p-12 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                        Let's discuss how we can help transform your digital presence.
                    </p>
                    <Link href="/contact">
                        <Button variant="secondary" size="lg" className="bg-white text-crimson-red hover:bg-off-white border-white">
                            Contact Us Today
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
