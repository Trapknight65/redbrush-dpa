import { notFound } from 'next/navigation';
import { getProjectById, portfolioProjects } from '@/data/portfolio';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import FigmaCaseStudy from '@/components/FigmaCaseStudy';

export async function generateStaticParams() {
    return portfolioProjects.map((project) => ({
        id: project.id,
    }));
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
    const project = getProjectById(params.id);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <Link href="/portfolio" className="inline-flex items-center text-crimson-red hover:text-electric-blue mb-6 transition-colors">
                    ← Back to Portfolio
                </Link>

                <div className="text-center">
                    <div className="text-8xl mb-6">{project.image}</div>
                    <p className="text-electric-blue font-semibold mb-2">{project.category}</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-4 sm:mb-6">
                        {project.title}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-charcoal max-w-3xl mx-auto px-4">
                        {project.description}
                    </p>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex flex-wrap gap-3 justify-center">
                    {project.tech.map((tech, index) => (
                        <span
                            key={index}
                            className="px-4 py-2 bg-pure-white border-2 border-crimson-red rounded-full text-crimson-red font-semibold text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Image Gallery */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark-gray mb-8">Project Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {project.gallery.map((img, index) => (
                        <div
                            key={index}
                            className="aspect-square bg-pure-white border-2 border-gray-200 rounded-lg flex items-center justify-center text-6xl hover:border-crimson-red transition-colors cursor-pointer"
                        >
                            {img}
                        </div>
                    ))}
                </div>
            </section>

            {/* Figma Case Study / Design Process */}
            {project.figmaDesign && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 scale-90 sm:scale-100 origin-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-dark-gray mb-8">Design Process</h2>
                    <FigmaCaseStudy />
                </section>
            )}

            {/* Case Study */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    <Card title="The Challenge">
                        <p className="text-charcoal text-sm sm:text-base">{project.challenge}</p>
                    </Card>

                    <Card title="Our Solution">
                        <p className="text-charcoal text-sm sm:text-base">{project.solution}</p>
                    </Card>

                    <Card title="Results">
                        <ul className="space-y-2">
                            {project.results.map((result, index) => (
                                <li key={index} className="text-charcoal text-sm sm:text-base flex items-start">
                                    <span className="text-crimson-red mr-2">✓</span>
                                    {result}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
                <div className="bg-crimson-red rounded-2xl p-8 sm:p-12 text-center text-white">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Like What You See?</h2>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90">
                        Let's create something amazing for your business too.
                    </p>
                    <Link href="/contact">
                        <Button variant="secondary" size="lg" className="bg-white text-crimson-red hover:bg-off-white border-white">
                            Start Your Project
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
