import { notFound } from 'next/navigation';
import { getProjects, getProjectBySlug } from '@/actions/project.actions';
import Button from "@/components/ui/Button";
import Card from '@/components/Card';
import Link from 'next/link';
import ProjectCaseStudies from '@/components/ProjectCaseStudies';
import FigmaCaseStudy from '@/components/FigmaCaseStudy';

export async function generateStaticParams() {
    const { data: projects } = await getProjects();
    if (!projects) return [];

    return projects.map((project) => ({
        id: project.slug, // Map slug to [id] param
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: project } = await getProjectBySlug(id); // Treat id as slug

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-deep-sea to-ocean-blue text-white selection:bg-gold selection:text-black">
            {/* Nav / Back */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Link href="/portfolio" className="inline-flex items-center text-gold hover:text-white transition-colors font-mono uppercase tracking-widest text-xs gap-2 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK_TO_FLEET
                </Link>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-20">

                {/* Hero Section: Split Layout */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    {/* Left: Title & Description */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="text-6xl mb-4 animate-bounce-slow inline-block">{project.image}</div>
                        <div>
                            <p className="text-gold font-bold tracking-widest uppercase text-sm mb-2">{project.category}</p>
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: Tech Stack Box */}
                    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 lg:mt-12">
                        <h3 className="text-gold font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
                            Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 bg-black/30 border border-white/10 rounded text-gray-300 text-xs font-mono hover:border-gold/50 hover:text-gold transition-colors cursor-default"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content: Split Layout */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left: Case Study Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* New Figma Case Study Integration */}
                        {project.caseStudyData && (
                            <div className="bg-black/20 rounded-xl overflow-hidden mb-12">
                                <FigmaCaseStudy data={project.caseStudyData as any} />
                            </div>
                        )}

                        {/* Existing Case Studies (Text) */}
                        {project.caseStudies && (
                            <div className="prose prose-invert max-w-none">
                                <ProjectCaseStudies studies={project.caseStudies as any} />
                            </div>
                        )}

                        {/* Details Cards (Challenge/Solution/Results) */}
                        <div className="space-y-8">
                            <Card title="The Challenge" className="hover:border-gold/30 transition-colors">
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{project.challenge}</p>
                            </Card>

                            <Card title="Our Solution" className="hover:border-gold/30 transition-colors">
                                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{project.solution}</p>
                            </Card>

                            <Card title="Results" className="hover:border-gold/30 transition-colors">
                                <ul className="space-y-3 mt-2">
                                    {project.results.map((result, index) => (
                                        <li key={index} className="text-gray-300 text-sm sm:text-base flex items-start">
                                            <span className="text-gold mr-3">✓</span>
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </div>
                    </div>

                    {/* Right: Gallery */}
                    <div className="space-y-8">
                        <div className="lg:sticky lg:top-24 space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-gold pl-4">
                                Visual Gallery
                            </h3>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                                {project.gallery.map((img, index) => (
                                    <div
                                        key={index}
                                        className="aspect-video bg-black/20 border border-white/10 rounded-lg flex items-center justify-center text-5xl hover:bg-black/40 hover:border-gold/50 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <span className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                                            {img}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </section>

                {/* CTA Footer */}
                <section className="pt-12 border-t border-white/10">
                    <div className="bg-gradient-to-r from-crimson-red to-red-900 rounded-2xl p-8 sm:p-12 text-center text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif italic">Ready to set sail?</h2>
                            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                                Let's build your next digital flagship.
                            </p>
                            <Link href="/contact">
                                <Button variant="secondary" size="lg" className="bg-white text-crimson-red hover:bg-gray-100 border-none font-bold tracking-wide">
                                    START PROJECT
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
