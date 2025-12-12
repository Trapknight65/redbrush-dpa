import { getProjectBySlug } from "@/actions/project.actions";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Rocket } from "lucide-react"; // Default icon for logo fallback
import FigmaCaseStudy, { CaseStudyData } from "@/components/FigmaCaseStudy";

export const dynamic = 'force-dynamic';

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: project } = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Cast Prisma JSON to CaseStudyData or default to null
    const caseStudyData = project.caseStudyData as unknown as CaseStudyData;

    // Helper to safely access thumbnail
    const thumbnail = project.figmaDesign && typeof project.figmaDesign === 'object' && 'thumbnail' in project.figmaDesign
        ? (project.figmaDesign as any).thumbnail
        : null;

    return (
        <div className="min-h-screen bg-black text-white selection:bg-crimson-red selection:text-white">

            {/* 1. Hero Section */}
            <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">

                {/* Background Preview (Opacity 30%) */}
                <div className="absolute inset-0 z-0">
                    {project.image ? (
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
                    {/* Gradient Overlay for smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
                </div>

                {/* Navbar / Back Link */}
                <div className="absolute top-6 left-6 z-20">
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm font-mono tracking-wider">PROJECTS</span>
                    </Link>
                </div>

                {/* Center Logo / Title */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 flex items-center justify-center mb-6 shadow-2xl shadow-crimson-red/20 transform hover:scale-105 transition-transform duration-500">
                        {/* 
                           Using thumbnail from figmaDesign if available, else generic icon.
                        */}
                        {thumbnail ? (
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-xl">
                                <Image
                                    src={thumbnail}
                                    alt="Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ) : (
                            <Rocket className="w-12 h-12 text-white/80" />
                        )}
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2 uppercase">
                        {project.title}
                    </h1>
                    <p className="text-lg text-white/60 font-mono tracking-widest uppercase">
                        {project.category}
                    </p>
                </div>
            </section>

            {/* 2. Content Section (Tab Navigation) */}
            <section className="relative z-10 -mt-20 pb-20 px-2 sm:px-4 md:px-8 max-w-7xl mx-auto">
                {caseStudyData ? (
                    <FigmaCaseStudy data={caseStudyData} />
                ) : (
                    // Fallback for projects without specific Deep Dive Data
                    <div className="glass-card bg-zinc-900/50 border border-white/10 p-8 rounded-xl text-center min-h-[300px] flex flex-col items-center justify-center backdrop-blur-md">
                        <div className="max-w-xl mx-auto space-y-4">
                            <h2 className="text-2xl font-bold text-white">Project Case Study</h2>
                            <p className="text-gray-400">
                                Detailed case study data (Overview, Architecture, Roadmap) has not been added for this project yet.
                            </p>
                            <p className="text-sm text-gray-500 font-mono">
                                Use the Admin Panel to populate the "Content Section" JSON.
                            </p>

                            {/* Display basic description as fallback */}
                            <div className="mt-8 pt-8 border-t border-white/10 text-left">
                                <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                                <p className="text-gray-300 leading-relaxed">{project.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>

        </div>
    );
}
