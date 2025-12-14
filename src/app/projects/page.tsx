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

            {/* Projects Grid (Bento Slider) */}
            <ProjectBento projects={projects || []} />
        </div>
    );
}
