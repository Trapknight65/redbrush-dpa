import Card from "@/components/Card";
import ExperienceCarousel from "@/components/ExperienceCarousel";

export default function About() {
    const experiences = [
        {
            title: "Customer Advisor",
            company: "DHL Express",
            period: "Nov 2022 - Present",
            location: "",
            description: "Providing exceptional customer service and support for DHL Express clients, handling inquiries, resolving issues, and ensuring customer satisfaction.",
            logo: "/dhl-logo.png"
        },
        {
            title: "Customer Advisor",
            company: "Sitel Group",
            period: "Jul 2022 - Nov 2022",
            location: "",
            description: "Receiving calls for Apple brand customers, resolving technical problems, and supporting users with their devices and services.",
            logo: "/sitel-logo.png"
        },
        {
            title: "Digital Project Manager",
            company: "Groupe Promotrans",
            period: "Oct 2019 - Dec 2020",
            location: "",
            description: "Management of digital projects, content creation, social media animation, and performance analysis. Led digital transformation initiatives and coordinated cross-functional teams.",
            logo: "/promotrans-logo.png"
        },
        {
            title: "Prépa Com'",
            company: "Digital Cocoon",
            period: "Mar 2019 - Sep 2019",
            location: "",
            description: "Communication and media studies preparation program focused on digital marketing, content strategy, and modern communication techniques.",
            logo: "/digital-cocoon-logo.png"
        },
        {
            title: "Performance Analyst Apprentice",
            company: "PSA Peugeot Citroën",
            period: "Oct 2015 - Feb 2017 · 1 yr 5 mos",
            location: "PARIS 17",
            description: "Responsible for the performance of all Citroën digital devices. This position with strategic, relational and operational skills positioned me as support on all aspects of Citroën brand's digital strategy: Performance analyses leading to optimization actions, monitoring of recommendations, ensuring integration of processes on the digital channel (lead referencing).",
            logo: "/psa-logo.png"
        },
        {
            title: "Display Campaign Assistant",
            company: "Ecselis",
            period: "Jul 2014 - Dec 2014 · 6 mos",
            location: "29/30 Quai de Dion Bouton",
            description: "Implementation and monitoring of performance-oriented digital campaigns (Numericable, GEMO, Sushishop). Consolidation of weekly reports, performance feedback to networks broadcasting campaigns for our clients, negotiation. Creation of quotes, purchase orders, insertion orders in relation with accounting department and networks. Client relations. This initiatory experience in digital communication was a formative experience.",
            logo: "/ecselis-logo.png"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-deep-sea to-ocean-blue">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-canvas-white mb-4">
                        Allan <span className="text-crimson-red">Deschamps</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-canvas-white/90">
                        Digital Performer
                    </p>
                </div>

                {/* Three Row Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

                    {/* Row 1: About & Skills */}
                    <Card className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">About</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <p className="text-sm leading-relaxed text-canvas-white">
                            I am an experienced customer advisor specializing in problem-solving and customer satisfaction.
                            I have worked in various sectors, from logistics to training, including customer service for renowned brands.
                            My ability to communicate effectively and negotiate solutions allows me to achieve and exceed set objectives.
                            I am passionate about digital and continuous improvement, always looking for new skills to enrich my profile.
                        </p>
                    </Card>

                    <Card>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Skills</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">Negotiation</span>
                            <span className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">Communication</span>
                            <span className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">Customer Service</span>
                            <span className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">Digital Marketing</span>
                            <span className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">Project Management</span>
                            <span className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">UX Design</span>
                        </div>
                        <p className="text-xs mt-3 opacity-70">+ 37 more skills</p>
                    </Card>

                    {/* Row 2: Experience Board - Flippable Cards */}
                    <ExperienceCarousel experiences={experiences} />

                    {/* Row 3: Education & Languages */}
                    <Card className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Education & Certifications</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-base text-canvas-white mb-3">Education</h3>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-bold text-sm">Digital Project Manager</h4>
                                        <p className="text-xs text-ocean-blue">Institut F2I</p>
                                        <p className="text-xs opacity-70">2019 - 2021</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Communication Studies</h4>
                                        <p className="text-xs text-ocean-blue">Digital Cocoon</p>
                                        <p className="text-xs opacity-70">2019</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-canvas-white mb-3">Certifications</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <span className="text-lg">🎓</span>
                                        <div>
                                            <h4 className="font-bold text-xs">UX Foundations: Accessibility</h4>
                                            <p className="text-xs opacity-70">LinkedIn • Sep 2020</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="text-lg">🎓</span>
                                        <div>
                                            <h4 className="font-bold text-xs">UX Foundations: Interaction Design</h4>
                                            <p className="text-xs opacity-70">LinkedIn • Sep 2020</p>
                                        </div>
                                    </div>
                                    <p className="text-xs opacity-70">+ 3 more certifications</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Languages</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-bold text-sm">English</h3>
                                <p className="text-xs opacity-70">Professional</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">French Creole</h3>
                                <p className="text-xs opacity-70">Native/Bilingual</p>
                            </div>
                            <p className="text-xs opacity-70 mt-2">+ 2 more languages</p>
                        </div>
                    </Card>

                </div>
            </section>
        </div>
    );
}
