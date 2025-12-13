import { getProjectBySlug } from "@/actions/project.actions";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { notFound } from "next/navigation";
import { ArrowLeft, Rocket } from "lucide-react";
import FigmaCaseStudy, { CaseStudyData } from "@/components/FigmaCaseStudy";

export const dynamic = 'force-dynamic';

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: project } = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const caseStudyData = project.caseStudyData as unknown as CaseStudyData;

    const thumbnail = project.figmaDesign && typeof project.figmaDesign === 'object' && 'thumbnail' in project.figmaDesign
        ? (project.figmaDesign as any).thumbnail
        : null;

    const heroVideo = project.figmaDesign && typeof project.figmaDesign === 'object' && 'heroVideo' in project.figmaDesign
        ? (project.figmaDesign as any).heroVideo
        : null;

    const subtitle = project.figmaDesign && typeof project.figmaDesign === 'object' && 'subtitle' in project.figmaDesign
        ? (project.figmaDesign as any).subtitle
        : null;

    const baseline = project.figmaDesign && typeof project.figmaDesign === 'object' && 'baseline' in project.figmaDesign
        ? (project.figmaDesign as any).baseline
        : null;

    const previewLink = project.figmaDesign && typeof project.figmaDesign === 'object' && 'previewLink' in project.figmaDesign
        ? (project.figmaDesign as any).previewLink
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-deep-sea to-ocean-blue text-white selection:bg-crimson-red selection:text-white">

            {/* 1. Hero Section */}
            {/* 1. Hero Section */}
            <section className="relative h-[50vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {heroVideo ? (
                        <video
                            src={heroVideo}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-30 blur-sm scale-105"
                        />
                    ) : project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-30 blur-sm scale-105"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black opacity-30" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
                </div>

                <div className="absolute top-6 left-6 z-20">
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-mono tracking-wider">PROJECTS</span>
                    </Link>
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-end pb-12">
                    {/* Left Column: Logo, Title, Subtitle, Baseline */}
                    <div className="flex flex-col items-start text-left space-y-6">
                        {thumbnail && (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center shadow-2xl shadow-crimson-red/20">
                                <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-xl">
                                    <Image
                                        src={thumbnail}
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2 uppercase leading-none">
                                {project.title}
                            </h1>
                            {subtitle && (
                                <h2 className="text-xl sm:text-2xl text-white/90 font-light tracking-wide mb-2">
                                    {subtitle}
                                </h2>
                            )}
                            {baseline && (
                                <p className="text-sm sm:text-base text-crimson-red font-mono tracking-widest uppercase mt-4 border-l-2 border-crimson-red pl-4">
                                    {baseline}
                                </p>
                            )}
                            <p className="text-xs text-white/40 font-mono tracking-widest uppercase mt-2">
                                {project.category}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Preview Link */}
                    <div className="flex flex-col items-start lg:items-end justify-end space-y-4">
                        {previewLink && (
                            <a
                                href={previewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-full bg-white text-black px-8 py-4 font-bold tracking-wide transition-all hover:bg-gray-200 hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Live Preview <Rocket className="w-4 h-4" />
                                </span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Content Layout (Split View) */}
            <section className="relative z-10 -mt-10 pb-20 px-2 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-8">

                    {/* Left Column: Figma Case Study */}
                    <div className="w-full">
                        {caseStudyData ? (
                            <FigmaCaseStudy data={caseStudyData} />
                        ) : (
                            /* Fallback Content */
                            <div className="glass-card bg-zinc-900/50 border border-white/10 p-8 rounded-xl text-center min-h-[300px] flex flex-col items-center justify-center backdrop-blur-md">
                                <h2 className="text-2xl font-bold text-white mb-2">Project Overview</h2>
                                <p className="text-gray-300 leading-relaxed mb-8">{project.description}</p>
                                <p className="text-sm text-gray-500 font-mono">Detailed case study data not available.</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Tech Stack & CTA */}
                    <div className="space-y-6 pt-4 sm:pt-8 w-full">

                        {/* Tech Stack */}
                        <div className="bg-zinc-900/50 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg">
                            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2 text-white">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech: string) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 font-mono text-xs rounded-md hover:bg-white/10 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Similar Projects / CTA */}
                        <div className="bg-gradient-to-br from-crimson-red/20 to-black border border-crimson-red/20 p-6 rounded-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-crimson-red/5 group-hover:bg-crimson-red/10 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2 text-white">Start a Project</h3>
                                <p className="text-gray-400 text-sm mb-6">Inspired by this project? Let's build something amazing together.</p>
                                <Link href="/contact">
                                    <Button variant="secondary" className="w-full bg-crimson-red hover:bg-crimson-red/80 text-white border-none shadow-lg shadow-crimson-red/20">
                                        Get in Touch
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Gallery Mini-Grid (Optional) */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="grid grid-cols-2 gap-2">
                                {project.gallery.slice(0, 4).map((img: string, idx: number) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors">
                                        <Image
                                            src={img}
                                            alt={`Gallery ${idx}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </div>
    );
}
