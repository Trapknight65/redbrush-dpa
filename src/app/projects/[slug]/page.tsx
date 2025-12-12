import { getProjectBySlug } from "@/actions/project.actions";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";
import * as LucideIcons from "lucide-react";

// Helper to render icon dynamically
const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
    // @ts-ignore - Dynamic access
    const Icon = LucideIcons[name as keyof typeof LucideIcons] as any;
    return Icon ? <Icon className={className} /> : <span className={className}>{name}</span>;
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: project } = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-pure-white text-dark-gray">
            {/* Hero Section */}
            <div className="relative h-[50vh] sm:h-[60vh] w-full">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-charcoal flex items-center justify-center text-gray-500">
                        No Image Available
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 w-full">
                        <Link href="/projects" className="text-white/80 hover:text-white mb-4 inline-block text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                            <LucideIcons.ArrowLeft className="w-4 h-4" /> Back to Projects
                        </Link>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-3 py-1 bg-crimson-red text-white text-sm font-bold rounded">
                                {project.category}
                            </span>
                            {project.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded border border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <LucideIcons.FileText className="w-6 h-6 text-crimson-red" />
                                Overview
                            </h2>
                            <p className="text-lg text-charcoal leading-relaxed whitespace-pre-line">
                                {project.description}
                            </p>
                        </section>

                        {/* Challenge & Solution */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <section className="bg-ocean-blue/[0.4] p-6 rounded-xl border-l-4 border-crimson-red">
                                <h3 className="text-xl font-bold mb-3">The Challenge</h3>
                                <p className="text-charcoal">{project.challenge}</p>
                            </section>
                            <section className="bg-ocean-blue/[0.4] p-6 rounded-xl border-l-4 border-sunset-gold">
                                <h3 className="text-xl font-bold mb-3">The Solution</h3>
                                <p className="text-charcoal">{project.solution}</p>
                            </section>
                        </div>

                        {/* Results */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <LucideIcons.BarChart className="w-6 h-6 text-crimson-red" />
                                Key Results
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {project.results.map((result: string, idx: number) => (
                                    <div key={idx} className="p-4 bg-ocean-blue/[0.4] border border-gray-100 shadow-sm rounded-lg flex items-start gap-3">
                                        <LucideIcons.CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-dark-gray font-medium">{result}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Gallery */}
                        {project.gallery && project.gallery.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <LucideIcons.Image className="w-6 h-6 text-crimson-red" />
                                    Gallery
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.gallery.map((img: string, idx: number) => (
                                        <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                                            <Image
                                                src={img}
                                                alt={`Gallery image ${idx + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8">
                        {/* Tech Stack */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 border-b border-gray-100 pb-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1 bg-gray-100 text-charcoal font-medium text-sm rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Case Study Callout */}
                        {project.caseStudies && project.caseStudies.length > 0 && (
                            <div className="bg-deep-sea text-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold mb-2">Detailed Case Study</h3>
                                <p className="text-white/80 text-sm mb-6">
                                    Read the in-depth breakdown of how we built this project.
                                </p>
                                <Link href={`/case-studies/${project.caseStudies[0].id}`}>
                                    <Button className="w-full bg-crimson-red hover:bg-crimson-red/90 text-white">
                                        Read Full Case Study
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Contact CTA */}
                        <div className="bg-gradient-to-br from-crimson-red to-black p-6 rounded-xl text-white shadow-lg">
                            <h3 className="text-xl font-bold mb-2">Have a similar idea?</h3>
                            <p className="text-white/90 text-sm mb-6">Let's bring your vision to life.</p>
                            <Link href="/contact">
                                <Button variant="secondary" className="w-full bg-ocean-blue/[0.4] text-crimson-red hover:bg-gray-100 border-none">
                                    Start a Project
                                </Button>
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
