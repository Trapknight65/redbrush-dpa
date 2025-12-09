
import { getProjectById } from "@/actions/project.actions";
import ProjectForm from "@/components/admin/ProjectForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminProjectEditPage({ params }: PageProps) {
    const { id } = await params;
    const isNew = id === "new";

    let project = null;

    if (!isNew) {
        const { data } = await getProjectById(id);
        if (!data) {
            notFound();
        }
        project = data;
    }

    return (
        <div className="min-h-screen bg-[#120c0c] text-amber-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/projects" className="p-2 rounded-full hover:bg-amber-900/20 text-amber-600 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-amber-100">
                            {isNew ? "Create New Project" : "Edit Project"}
                        </h1>
                        <p className="text-amber-700">
                            {isNew ? "Add a new item to your portfolio" : `Editing ${project?.title}`}
                        </p>
                    </div>
                </div>

                <div className="bg-[#1a1515] border border-amber-900/30 rounded-lg p-8">
                    <ProjectForm initialData={project} />
                </div>
            </div>
        </div>
    );
}
