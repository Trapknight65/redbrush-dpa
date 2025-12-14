"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/actions/project.actions";
import { useState, useEffect } from "react";
import { Loader2, Save, Sparkles } from "lucide-react";
import { generateProjectContent } from "@/actions/ai.actions";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";
import VideoUpload from "./VideoUpload";
import CaseStudyBuilder from "./CaseStudyBuilder";
import { CaseStudyData } from "@/components/FigmaCaseStudy";

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
    gallery?: string[];
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
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProjectFormData>({
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            // ... (rest of defaults)
            category: initialData?.category || "",
            description: initialData?.description || "",
            image: initialData?.image || "",
            tags: initialData?.tags?.join(", ") || "",
            tech: initialData?.tech?.join(", ") || "",
            challenge: initialData?.challenge || "",
            solution: initialData?.solution || "",
            caseStudyData: initialData?.caseStudyData ? JSON.stringify(initialData.caseStudyData, null, 2) : "",
            gallery: initialData?.gallery || [],
        },
    });

    const titleValue = watch("title");

    useEffect(() => {
        if (!initialData && titleValue) {
            const slug = titleValue
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [titleValue, initialData, setValue]);

    const [logo, setLogo] = useState<string>("");
    const [heroVideo, setHeroVideo] = useState<string>("");
    const [heroSubtitle, setHeroSubtitle] = useState<string>("");
    const [heroBaseline, setHeroBaseline] = useState<string>("");
    const [heroPreviewLink, setHeroPreviewLink] = useState<string>("");

    useEffect(() => {
        if (initialData?.figmaDesign && typeof initialData.figmaDesign === 'object') {
            const design = initialData.figmaDesign as any;
            if (design.thumbnail) setLogo(design.thumbnail);
            if (design.heroVideo) setHeroVideo(design.heroVideo);
            if (design.subtitle) setHeroSubtitle(design.subtitle);
            if (design.baseline) setHeroBaseline(design.baseline);
            if (design.previewLink) setHeroPreviewLink(design.previewLink);
        }
    }, [initialData]);

    const onSubmit = async (data: ProjectFormData) => {
        setLoading(true);
        setError("");

        try {
            // Validate JSON if present
            if (data.caseStudyData) {
                try {
                    JSON.parse(data.caseStudyData);
                } catch (e) {
                    setError("Invalid JSON in Case Study Data fields");
                    setLoading(false);
                    return;
                }
            }

            // Transform strings to arrays and prepare figmaDesign
            const currentFigmaDesign = initialData?.figmaDesign as any || {};

            const formattedData = {
                ...data,
                tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
                tech: data.tech.split(",").map((t) => t.trim()).filter(Boolean),
                results: initialData?.results || [],
                gallery: data.gallery || [],
                figmaDesign: {
                    ...currentFigmaDesign,
                    thumbnail: logo || currentFigmaDesign.thumbnail,
                    heroVideo: heroVideo || currentFigmaDesign.heroVideo,
                    subtitle: heroSubtitle || null,
                    baseline: heroBaseline || null,
                    previewLink: heroPreviewLink || null,
                },
            };

            let result;
            if (initialData?.id) {
                result = await updateProject(initialData.id, formattedData);
            } else {
                result = await createProject(formattedData);
            }

            if (result.success) {
                router.push("/admin/projects");
                router.refresh();
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

    const handleGenerate = async () => {
        const title = watch("title");
        const category = watch("category");

        if (!title || !category) {
            toast.error("Please enter a Title and Category first.");
            return;
        }

        setIsGenerating(true);
        try {
            const result = await generateProjectContent(title, category);

            if (result.success && result.data) {
                setValue("description", result.data.description);
                setValue("challenge", result.data.challenge);
                setValue("solution", result.data.solution);
                setValue("tech", result.data.tech);
                setValue("tags", result.data.tags);
                toast.success("Content generated successfully using Gemini AI!");
            } else {
                toast.error(result.error || "Failed to generate content");
            }
        } catch (err) {
            toast.error("Something went wrong with AI generation");
            console.error(err);
        } finally {
            setIsGenerating(false);
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
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Project Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                        placeholder="e.g. Redbrush E-commerce"
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                </div>

                {/* Slug */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Slug (URL)</label>
                    <input
                        {...register("slug", { required: "Slug is required" })}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                        placeholder="e.g. redbrush-ecommerce"
                    />
                    {errors.slug && <span className="text-red-500 text-xs">{errors.slug.message}</span>}
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Category</label>
                    <input
                        {...register("category", { required: "Category is required" })}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                        placeholder="e.g. Web Development"
                    />
                    {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                </div>

                {/* Image */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Main Image</label>
                    <ImageUpload
                        value={watch("image")}
                        onChange={(url) => setValue("image", url)}
                        onRemove={() => setValue("image", "")}
                    />
                    {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
                </div>

                {/* Hero Video */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Hero Video (Optional)</label>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <VideoUpload
                                value={heroVideo}
                                onChange={(url) => setHeroVideo(url)}
                                onRemove={() => setHeroVideo("")}
                            />
                        </div>
                        <div className="text-xs text-nami-wood-dark/60 max-w-[200px]">
                            Upload a background video (MP4/WebM). This will replace the image in the Hero section.
                        </div>
                    </div>
                </div>

                {/* Logo (Mapped to figmaDesign.thumbnail) */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Project Logo</label>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <ImageUpload
                                value={logo}
                                onChange={(url) => setLogo(url)}
                                onRemove={() => setLogo("")}
                            />
                        </div>
                        <div className="text-xs text-nami-wood-dark/60 max-w-[200px]">
                            Upload a transparent PNG/SVG logo. This will be displayed in the detailed project view.
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Description</label>
                    <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="flex items-center gap-2 text-xs bg-nami-wood/50 text-nami-tangerine px-3 py-1.5 rounded-lg hover:bg-white/50 transition-colors disabled:opacity-50 font-bold border border-nami-wood"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <Sparkles className="w-3 h-3" />
                        )}
                        {isGenerating ? "Generating..." : "Magic Generate"}
                    </button>
                </div>
                <textarea
                    {...register("description", { required: "Description is required" })}
                    rows={4}
                    className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                    placeholder="Short summary of the project..."
                />
                {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
            </div>

            {/* Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tags */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Tags (Comma separated)</label>
                    <input
                        {...register("tags")}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                        placeholder="React, Next.js, Design"
                    />
                </div>

                {/* Tech */}
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Tech Stack (Comma separated)</label>
                    <input
                        {...register("tech")}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                        placeholder="Tailwind CSS, TypeScript, Prisma"
                    />
                </div>
            </div>

            {/* Hero Configuration */}
            <div className="space-y-4 pt-6 border-t border-nami-wood/30">
                <h3 className="text-lg font-bold text-nami-tangerine flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Hero Configuration
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Subtitle (Left)</label>
                        <input
                            value={heroSubtitle}
                            onChange={(e) => setHeroSubtitle(e.target.value)}
                            className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                            placeholder="e.g. A Revolutionary E-commerce Platform"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Baseline (Left)</label>
                        <input
                            value={heroBaseline}
                            onChange={(e) => setHeroBaseline(e.target.value)}
                            className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                            placeholder="e.g. Redefining online shopping experiences."
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Preview Link (Right)</label>
                        <input
                            value={heroPreviewLink}
                            onChange={(e) => setHeroPreviewLink(e.target.value)}
                            className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                            placeholder="e.g. https://example.com/project-preview"
                        />
                    </div>
                </div>
            </div>

            {/* Detailed Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-nami-wood/20">
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Challenge</label>
                    <textarea
                        {...register("challenge")}
                        rows={3}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-nami-tangerine text-sm font-bold uppercase tracking-wider">Solution</label>
                    <textarea
                        {...register("solution")}
                        rows={3}
                        className="w-full bg-white/50 border border-nami-wood rounded-lg p-3 text-nami-wood-dark focus:border-nami-tangerine focus:outline-none transition-all shadow-sm font-medium"
                    />
                </div>
            </div>

            {/* Figma Case Study Builder */}
            <div className="space-y-4 pt-6 border-t border-nami-wood/20">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-nami-tangerine flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Case Study Builder
                    </h3>

                    <button
                        type="button"
                        onClick={() => {
                            const template = {
                                header: {
                                    reportTitle: "Development Process Report",
                                    statusBadge: "Production Ready",
                                    icon: "Film",
                                    badgeIcon: "TrendingUp"
                                },
                                meta: {
                                    title: "Project Name",
                                    date: "2025",
                                    agency: "Redbrush DPA"
                                },
                                overview: {
                                    heritage: {
                                        title: "Project Heritage",
                                        description: "Describe the background...",
                                        items: [{ label: "Version", text: "1.0" }]
                                    },
                                    mission: {
                                        statement: "To simplify digital workflows.",
                                        stats: [{ label: "Uptime", subLabel: "100%" }]
                                    }
                                },
                                architecture: {
                                    coreStack: [
                                        { label: "Frontend", value: "Next.js 14" }
                                    ],
                                    decisions: []
                                },
                                features: { items: [] },
                                roadmap: {
                                    performance: [],
                                    security: [],
                                    features: [],
                                    ux: [],
                                    seo: [],
                                    other: [],
                                    status: "Active Development"
                                },
                                deployment: {
                                    steps: []
                                }
                            };
                            setValue("caseStudyData", JSON.stringify(template, null, 2));
                        }}
                        className="text-xs text-nami-tangerine hover:text-white border border-nami-wood px-3 py-1 rounded-lg hover:bg-nami-tangerine transition-all"
                    >
                        Reset / Load Template
                    </button>
                </div>

                <CaseStudyBuilder
                    data={(() => {
                        try {
                            return watch("caseStudyData") ? JSON.parse(watch("caseStudyData")!) : null;
                        } catch (e) {
                            return null;
                        }
                    })()}
                    onChange={(newData) => {
                        setValue("caseStudyData", JSON.stringify(newData, null, 2));
                    }}
                />

                {/* Fallback/Debug: Raw JSON Toggle (hidden by default or kept small) */}
                <details className="text-xs text-nami-wood-dark/50">
                    <summary className="cursor-pointer hover:text-nami-tangerine">View Raw JSON</summary>
                    <textarea
                        {...register("caseStudyData")}
                        className="w-full bg-black/80 border border-nami-wood rounded p-3 text-white font-mono text-xs h-32 mt-2"
                    />
                </details>
            </div>

            {/* Gallery */}
            <div className="space-y-4 pt-6 border-t border-nami-wood/20">
                <h3 className="text-lg font-bold text-nami-tangerine flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Project Gallery
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(watch("gallery") || []).map((url, index) => (
                        <div key={index} className="relative group aspect-video">
                            <ImageUpload
                                value={url}
                                onChange={(newUrl) => {
                                    const currentGallery = watch("gallery") || [];
                                    const newGallery = [...currentGallery];
                                    newGallery[index] = newUrl;
                                    setValue("gallery", newGallery);
                                }}
                                onRemove={() => {
                                    const currentGallery = watch("gallery") || [];
                                    const newGallery = currentGallery.filter((_, i) => i !== index);
                                    setValue("gallery", newGallery);
                                }}
                            />
                            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                {index + 1}
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => {
                            const currentGallery = watch("gallery") || [];
                            setValue("gallery", [...currentGallery, ""]);
                        }}
                        className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-nami-wood/50 rounded-lg hover:border-nami-tangerine hover:bg-nami-tangerine/5 transition-all group"
                    >
                        <div className="p-3 rounded-full bg-nami-wood/20 group-hover:bg-nami-tangerine/20 transition-colors mb-2">
                            <Sparkles className="w-6 h-6 text-nami-wood-dark group-hover:text-nami-tangerine" />
                        </div>
                        <span className="text-sm font-bold text-nami-wood-dark group-hover:text-nami-tangerine">Add Image</span>
                    </button>
                </div>
            </div>

            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-nami-tangerine text-white font-bold px-8 py-3 rounded-lg hover:bg-nami-tangerine/90 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {initialData ? "Update Project" : "Create Project"}
                </button>
            </div>
        </form >
    );
}
