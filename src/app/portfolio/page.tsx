import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";
import { portfolioProjects } from "@/data/portfolio";

export default function Portfolio() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-4 sm:mb-6">
                        Our <span className="text-crimson-red">Portfolio</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-charcoal max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
                        Explore our recent work and see how we've helped brands achieve their digital goals.
                    </p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {portfolioProjects.map((project) => (
                        <Card key={project.id} className="flex flex-col h-full">
                            <div className="text-6xl mb-4 text-center">{project.image}</div>
                            <h3 className="text-xl sm:text-2xl font-bold text-dark-gray mb-2">{project.title}</h3>
                            <p className="text-sm text-electric-blue font-semibold mb-3">{project.category}</p>
                            <p className="text-charcoal mb-4 flex-grow text-sm sm:text-base">{project.description}</p>

                            <div className="mb-4">
                                <p className="text-xs font-semibold text-charcoal mb-2">Tech Stack:</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="text-xs px-2 py-1 bg-off-white border border-gray-300 rounded-full text-charcoal"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link href={`/portfolio/${project.id}`}>
                                <Button variant="ghost" size="sm" className="w-full mt-auto">
                                    View Case Study
                                </Button>
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="bg-crimson-red rounded-2xl p-8 sm:p-12 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                        Let's create something amazing together.
                    </p>
                    <Link href="/contact">
                        <Button variant="secondary" size="lg" className="bg-white text-crimson-red hover:bg-off-white border-white">
                            Get in Touch
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
