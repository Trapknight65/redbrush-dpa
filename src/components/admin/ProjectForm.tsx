"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/actions/project.actions";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import ImageUpload from "./ImageUpload";

type ProjectFormData = {
    title: string;
    slug: string;
    category: string;
    description: string;
    image: string;
    tags: string; // Comma separated in UI
    tech: string; // Comma separated in UI
    challenge: string;
    solution: string;
    caseStudyData?: string;
};

import { Prisma } from "@prisma/client";

// ...

// Use the return type of our getProject actions
type ProjectWithRelations = Prisma.ProjectGetPayload<{
    include: { caseStudies: true }
}>;

interface ProjectFormProps {
    initialData?: ProjectWithRelations | null;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormData>({
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            category: initialData?.category || "",
            description: initialData?.description || "",
            image: initialData?.image || "",
            tags: initialData?.tags?.join(", ") || "",
            tech: initialData?.tech?.join(", ") || "",
            challenge: initialData?.challenge || "",
            solution: initialData?.solution || "",
            caseStudyData: initialData?.caseStudyData ? JSON.stringify(initialData.caseStudyData, null, 2) : "",
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        setError("");

        try {
            // Transform strings to arrays
            const formattedData = {
                ...data,
                tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
                tech: data.tech.split(",").map((t) => t.trim()).filter(Boolean),
                // Add defaults for arrays not in form if needed
                // Add defaults for arrays not in form if needed
                results: initialData?.results || [],
                gallery: initialData?.gallery || [],
                figmaDesign: initialData?.figmaDesign ?? Prisma.JsonNull,
            };

            let result;
            if (initialData?.id) {
                result = await updateProject(initialData.id, formattedData);
            } else {
                result = await createProject(formattedData);
            }

            if (result.success) {
                router.push("/admin/projects");
                router.refresh(); // Refresh server components
            } else {
                setError(result.error as string);
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">

            {error && (
                <div className="bg-red-900/20 text-red-300 p-4 rounded border border-red-900/50">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Project Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                        placeholder="e.g. Redbrush E-commerce"
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                </div>

                {/* Slug */}
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Slug (URL)</label>
                    <input
                        {...register("slug", { required: "Slug is required" })}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                        placeholder="e.g. redbrush-ecommerce"
                    />
                    {errors.slug && <span className="text-red-500 text-xs">{errors.slug.message}</span>}
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Category</label>
                    <input
                        {...register("category", { required: "Category is required" })}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                        placeholder="e.g. Web Development"
                    />
                    {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                </div>

                {/* Image */}
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Image</label>
                    <ImageUpload
                        value={watch("image")}
                        onChange={(url) => setValue("image", url)}
                        onRemove={() => setValue("image", "")}
                    />
                    {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-amber-700 text-sm font-bold uppercase">Description</label>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    rows={4}
                    className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                    placeholder="Short summary of the project..."
                />
                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tags */}
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Tags (Comma separated)</label>
                    <input
                        {...register("tags")}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                        placeholder="React, Next.js, Design"
                    />
                </div>

                {/* Tech */}
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Tech Stack (Comma separated)</label>
                    <input
                        {...register("tech")}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                        placeholder="Tailwind CSS, TypeScript, Prisma"
                    />
                </div>
            </div>

            {/* Detailed Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Challenge</label>
                    <textarea
                        {...register("challenge")}
                        rows={3}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-amber-700 text-sm font-bold uppercase">Solution</label>
                    <textarea
                        {...register("solution")}
                        rows={3}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-amber-100 focus:border-amber-600 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Figma Case Study JSON Editor */}
            <div className="space-y-4 border border-amber-900/20 rounded-lg p-4 bg-black/20">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-amber-200 block">Figma Case Study Data (JSON)</label>
                    <button
                        type="button"
                        onClick={() => {
                            const template = {
                                header: {
                                    reportTitle: "Development Process Report",
                                    statusBadge: "Production Ready"
                                },
                                meta: {
                                    title: "Project Name",
                                    date: "2025",
                                    agency: "Redbrush DPA"
                                },
                                overview: {
                                    heritage: {
                                        title: "Project Heritage",
                                        description: "Describe the background and evolution of the project...",
                                        items: [{ label: "Version", text: "1.0" }]
                                    },
                                    mission: {
                                        statement: "To simplify digital workflows.",
                                        stats: [{ label: "100%", subLabel: "Uptime" }, { label: "50k+", subLabel: "Users" }]
                                    }
                                },
                                architecture: {
                                    coreStack: [
                                        { label: "Frontend", value: "Next.js 14, React, Tailwind" },
                                        { label: "Backend", value: "Node.js, Prisma, PostgreSQL" }
                                    ],
                                    decisions: [
                                        { title: "Why Next.js?", description: "For superior SSR performance and SEO." },
                                        { title: "Database Choice", description: "PostgreSQL for relational integrity." }
                                    ]
                                },
                                features: {
                                    items: [
                                        {
                                            title: "Real-time Analytics",
                                            icon: "TrendingUp",
                                            points: [{ label: "Latency", text: "< 50ms" }]
                                        },
                                        {
                                            title: "Secure Auth",
                                            icon: "Lock",
                                            points: [{ label: "Provider", text: "NextAuth" }]
                                        }
                                    ]
                                },
                                roadmap: {
                                    performance: [{ title: "Caching", description: "Implement Redis caching layer." }],
                                    security: [{ title: "Audit", description: "External security audit Q3." }],
                                    features: [{ title: "Mobile App", description: "Native iOS/Android wrappers." }],
                                    status: "Active Development"
                                },
                                deployment: {
                                    steps: [
                                        {
                                            title: "Phase 1: Alpha",
                                            description: "Internal testing.",
                                            points: [{ label: "Target", text: "Core Team" }]
                                        }
                                    ]
                                },
                                visuals: {
                                    title: "Project Gallery",
                                    items: [
                                        { type: "image", url: "/path/to/image.jpg", caption: "Dashboard View" }
                                    ]
                                }
                            };
                            setValue("caseStudyData", JSON.stringify(template, null, 2));
                        }}
                        className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1 border border-amber-900/30 px-2 py-1 rounded bg-[#1a1515]"
                    >
                        Load Template
                    </button>
                </div>

                <p className="text-xs text-gray-400">Paste the JSON structure for the Figma Case Study component here.</p>
                <textarea
                    {...register("caseStudyData")}
                    className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white font-mono text-xs h-64 focus:border-amber-500 outline-none transition-colors"
                    placeholder='{ "overview": { ... } }'
                />
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-amber-600 text-[#120c0c] font-bold px-8 py-3 rounded hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {initialData ? "Update Project" : "Create Project"}
                </button>
            </div>
        </form>
    );
}
