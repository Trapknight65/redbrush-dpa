import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/actions/project.actions";
import { Project } from "@prisma/client";

export default async function Projects() {
    const { data: projects } = await getProjects();

    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-4 sm:mb-6">
                        Our <span className="text-crimson-red">Projects</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-charcoal max-w-3xl mx-auto mb-8 sm:mb-10 px-4">
                        Showcasing our best work and technical expertise.
                    </p>
                </div>
            </section>

            {/* Projects Grid (Bento Style) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[400px]">
                    {projects?.map((project: Project, index: number) => {
                        // Bento pattern: 
                        // 0: Big (2x2)
                        // 1, 2: Normal
                        // 3: Tall (1x2)
                        // 4, 5: Normal
                        const isFeatured = index === 0;
                        const isTall = index === 3;

                        return (
                            <Card
                                key={project.id}
                                className={`
                                    flex flex-col h-full group hover:shadow-2xl transition-all duration-500 border-none overflow-hidden p-0 relative
                                    ${isFeatured ? 'md:col-span-2 md:row-span-2' : ''}
                                    ${isTall ? 'md:row-span-2' : ''}
                                `}
                            >
                                {/* Background Image with Zoom Effect */}
                                <div className="absolute inset-0 w-full h-full">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-700">
                                            No Image
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                </div>

                                {/* Overlay Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                            <span className="text-xs bg-crimson-red text-white px-2 py-1 rounded font-bold uppercase tracking-wider">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className={`font-black text-white mb-2 leading-tight ${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
                                            {project.title}
                                        </h3>

                                        <p className={`text-gray-300 mb-4 line-clamp-2 ${isFeatured ? 'text-lg max-w-lg' : 'text-sm'}`}>
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags?.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="text-[10px] uppercase tracking-wider border border-white/20 text-white/70 px-2 py-1 rounded hover:bg-white/10 transition-colors">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <Link href={`/projects/${project.slug}`} className="inline-block mt-2">
                                            <Button variant="secondary" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-crimson-red hover:border-crimson-red transition-all">
                                                View Case Study
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                    {!projects?.length && (
                        <div className="col-span-full text-center py-20 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                            <h3 className="text-xl text-white/50 mb-2">No projects found</h3>
                            <p className="text-gray-500">Projects added in the Admin Panel will appear here.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
