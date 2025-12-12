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

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project: Project) => (
                        <Card key={project.id} className="flex flex-col h-full bg-white group hover:shadow-2xl transition-all duration-300 border-none overflow-hidden p-0">
                            {/* Image */}
                            <div className="relative h-48 w-full overflow-hidden">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                    {project.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-dark-gray mb-2 group-hover:text-crimson-red transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-charcoal mb-4 line-clamp-3 text-sm flex-grow">
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags?.slice(0, 3).map((tag, i) => (
                                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                    {project.tags?.length > 3 && (
                                        <span className="text-xs text-gray-400">+{project.tags.length - 3}</span>
                                    )}
                                </div>

                                <Link href={`/projects/${project.slug}`} className="mt-auto">
                                    <Button variant="secondary" className="w-full bg-transparent border border-crimson-red text-crimson-red hover:bg-crimson-red hover:text-white">
                                        View Case Study
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                    {!projects?.length && (
                        <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl text-gray-500 mb-2">No projects found</h3>
                            <p className="text-gray-400">Projects added in the Admin Panel will appear here.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
