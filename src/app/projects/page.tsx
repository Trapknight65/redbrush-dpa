import Card from "@/components/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/actions/project.actions";
import { Project } from "@prisma/client";
import ProjectBento from "@/components/ProjectBento";

export default async function Projects() {
    const { data: projects } = await getProjects();

    return (
        <div className="min-h-screen bg-gradient-to-br from-off-white via-pure-white to-off-white">
            {/* Projects Split Layout */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-20 items-start">
                    {/* Left: Bento Slider */}
                    <div className="w-full order-2 lg:order-1">
                        <ProjectBento projects={projects || []} />
                    </div>

                    {/* Right: Text Content (Sticky) */}
                    <div className="lg:sticky lg:top-24 order-1 lg:order-2 text-right lg:text-right">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-gray mb-6">
                            Our <span className="text-crimson-red">Projects</span>
                        </h1>
                        <p className="text-lg text-charcoal leading-relaxed mb-8 ml-auto max-w-lg">
                            Showcasing our best work and technical expertise. We take pride in delivering high-quality solutions that solve real problems.
                        </p>
                        <div className="hidden lg:block w-20 h-1 bg-crimson-red rounded-full ml-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
}
