import Link from "next/link";
import Image from "next/image";
import { getProjects, deleteProject } from "@/actions/project.actions";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
    const { data: projects, error } = await getProjects();

    return (
        <div className="p-8 text-amber-100">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-amber-100">Projects</h1>
                        <p className="text-amber-700">Manage your portfolio content</p>
                    </div>

                    <Link
                        href="/admin/projects/new"
                        className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-[#120c0c] font-bold rounded hover:bg-amber-500 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Link>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-900/20 border border-red-900/50 p-4 rounded text-red-400 mb-6">
                        Failed to load projects: {error}
                    </div>
                )}

                {/* Projects List */}
                <div className="grid gap-4">
                    {projects?.map((project) => (
                        <div
                            key={project.id}
                            className="flex items-center justify-between p-6 bg-[#1a1515] border border-amber-900/30 rounded-lg group hover:border-amber-600/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-900/20 rounded flex items-center justify-center text-2xl relative overflow-hidden">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    ) : (
                                        "📁"
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-amber-100 group-hover:text-amber-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-amber-800 font-mono">
                                        <span>/{project.slug}</span>
                                        <span>•</span>
                                        <span>{project.category}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link
                                    href={`/admin/projects/${project.id}`}
                                    className="p-2 text-amber-700 hover:text-amber-400 hover:bg-amber-900/20 rounded transition-colors"
                                >
                                    <Pencil className="w-5 h-5" />
                                </Link>

                                {/* We'll make this a form action later for progressive enhancement, but for now specific delete component or button is cleaner. 
                    Ideally deletion should be a client component to confirm. 
                    For this step, I'll just put a non-functional 'trash' icon or wrap in a simple server form for now.
                */}
                                <form action={async () => {
                                    "use server";
                                    await deleteProject(project.id);
                                }}>
                                    <button className="p-2 text-red-900 hover:text-red-500 hover:bg-red-900/10 rounded transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}

                    {projects?.length === 0 && (
                        <div className="text-center py-12 text-amber-800 border-2 border-dashed border-amber-900/30 rounded-lg">
                            <p>No projects found. Create one to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
