"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createArticle, updateArticle, ArticleInput } from "@/actions/content.actions";
import { Loader2, Plus, X, Laptop, FileText, Wand2, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import SlideEditor from "./SlideEditor";

interface ArticleFormProps {
    article?: any; // Using any for simplicity with Prisma types for now, essentially Article
}

export default function ArticleForm({ article }: ArticleFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<ArticleInput>({
        defaultValues: {
            title: article?.title || "",
            slug: article?.slug || "",
            category: article?.category || "Tutorial",
            excerpt: article?.excerpt || "",
            content: article?.content || "",
            repositoryUrl: article?.repositoryUrl || "",
            isPublished: article?.isPublished || false,
            tags: article?.tags || [],
            techStack: article?.techStack || [],
        }
    });

    const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({
        control,
        name: "techStack"
    });

    // Predefined Tech Stack Options
    const techOptions = [
        { name: "Frameworks", items: ["Next.js", "React", "Vue", "Svelte", "Node.js"] },
        { name: "Styling", items: ["TailwindCSS", "CSS Modules", "Sass", "Framer Motion", "GSAP"] },
        { name: "Database", items: ["Prisma", "Supabase", "PostgreSQL", "MongoDB", "Firebase"] },
        { name: "Tools", items: ["TypeScript", "Docker", "Git", "Figma", "Stripe"] },
        { name: "CMS", items: ["Payload", "Sanity", "Strapi", "Contentful", "WordPress"] }
    ];

    const loadTemplate = () => {
        const template = `# [Client Name] — Project Summary

## 1. Brand Identity Creation
- **Visual Direction**: ...
- **Core Values**: ...

## 2. Color Palette
- **Primary**: ...
- **Secondary**: ...

## 3. UI/UX Strategy
- **Key Features**: ...
- **User Flow**: ...

## 4. Technical Infrastructure
- **Stack**: ...
- **Performance**: ...

> **Summary**: One-line project recap.`;

        setValue("content", template);
    };

    const generateExample = () => {
        setValue("title", "Project Alpha — Complete Case Study");
        setValue("slug", "project-alpha-case-study");
        setValue("category", "Deep Dive");
        setValue("excerpt", "A comprehensive look at how we built Project Alpha from scratch using Next.js and Tailwind.");
        setValue("tags", ["Case Study", "Next.js", "Redesign"]);

        // Clear existing tech stack
        setValue("techStack", []);
        // Add sample tech stack
        appendTech({ name: "Next.js", version: "13" });
        appendTech({ name: "TailwindCSS", version: "3.0" });
        appendTech({ name: "Supabase", version: "2.0" });

        const content = `# Project Alpha — Complete Case Study

## 1. Brand Identity Creation
- **Visual Direction**: Modern, sleek, dark mode first.
- **Core Values**: Speed, Reliability, Innovation.

## 2. Color Palette
- **Primary**: #0070f3 (Electric Blue)
- **Secondary**: #000000 (Void Black)

## 3. UI/UX Strategy
- **Key Features**: Real-time dashboard, AI analytics, Dark mode toggle.
- **User Flow**: Optimized for conversion with less than 3 clicks to purchase.

## 4. Technical Infrastructure
- **Stack**: Next.js App Router for SEO and performance.
- **Performance**: 98/100 Lighthouse score on mobile.

> **Summary**: Project Alpha redefined the industry standard for dashboard performance and aesthetics.`;
        setValue("content", content);
    };

    const onSubmit = async (data: ArticleInput) => {
        setIsLoading(true);
        try {
            // Ensure tags is array if coming from string input
            if (typeof data.tags === 'string') {
                data.tags = (data.tags as string).split(',').map((t: string) => t.trim());
            }

            let res;
            if (article) {
                res = await updateArticle(article.id, data);
            } else {
                res = await createArticle(data);
            }

            if (res.success) {
                router.push("/admin/articles");
                router.refresh();
            } else {
                alert("Error saving article: " + res.error);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">

            {/* Template Actions */}
            <div className="flex flex-wrap gap-4 p-4 bg-amber-900/10 border border-amber-900/20 rounded-lg">
                <button
                    type="button"
                    onClick={loadTemplate}
                    className="px-4 py-2 text-sm bg-[#1a1515] text-amber-500 border border-amber-900/30 rounded hover:border-amber-500 hover:text-amber-400 transition-colors flex items-center gap-2"
                >
                    <FileText size={16} /> Load Case Study Template
                </button>
                <button
                    type="button"
                    onClick={generateExample}
                    className="px-4 py-2 text-sm bg-[#1a1515] text-green-500 border border-green-900/30 rounded hover:border-green-500 hover:text-green-400 transition-colors flex items-center gap-2"
                >
                    <Wand2 size={16} /> Generate Full Example
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-200">Title</label>
                    <input
                        {...register("title", { required: true })}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors"
                        placeholder="Article Title"
                    />
                    {errors.title && <span className="text-red-500 text-xs">Required</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-200">Slug</label>
                    <input
                        {...register("slug", { required: true })}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors font-mono"
                        placeholder="article-slug"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-200">Category</label>
                    <select
                        {...register("category", { required: true })}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors"
                    >
                        <option value="Tutorial">Tutorial</option>
                        <option value="Deep Dive">Deep Dive</option>
                        <option value="Quick Fix">Quick Fix</option>
                        <option value="Devlog">Devlog</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-200">Tags (comma separated)</label>
                    <input
                        {...register("tags")}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors"
                        placeholder="react, nextjs, performance"
                    />
                    {/* Note: We handle the split in onSubmit */}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-amber-200">Excerpt</label>
                <textarea
                    {...register("excerpt")}
                    className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors min-h-[80px]"
                    placeholder="Brief summary..."
                />
            </div>

            {/* URL Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-200">Repository URL</label>
                    <input
                        {...register("repositoryUrl")}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors font-mono text-xs"
                        placeholder="https://github.com/..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-amber-200">Live Demo URL (Preview)</label>
                    <input
                        {...register("demoUrl")}
                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white focus:border-amber-500 outline-none transition-colors font-mono text-xs"
                        placeholder="https://..."
                    />
                </div>
            </div>

            {/* Slide Editor or Figma Case Study Selector */}
            <div className="space-y-4 border border-amber-900/20 rounded-lg p-4 bg-black/20">
                <h3 className="text-amber-200 font-medium flex items-center gap-2">
                    <Laptop size={16} /> Content Format
                </h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-amber-200 block mb-2">Figma Case Study Data (JSON)</label>
                        <p className="text-xs text-gray-400 mb-2">Paste the JSON structure for the Figma Case Study component here. Leave empty to use standard Slide functionality.</p>
                        <textarea
                            {...register("caseStudyData")}
                            className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-3 text-white font-mono text-xs h-64 focus:border-amber-500 outline-none transition-colors"
                            placeholder='{ "overview": { ... } }'
                        />
                        <button
                            type="button"
                            onClick={() => {
                                const template = {
                                    overview: {
                                        heritage: { title: "Project Heritage", description: "Background...", items: [{ text: "Item 1" }] },
                                        mission: { statement: "Mission...", stats: [{ label: "100%", subLabel: "Uptime" }] }
                                    },
                                    architecture: {
                                        coreStack: [{ label: "Frontend", value: "React" }],
                                        decisions: [{ title: "Why React?", description: "Speed." }]
                                    },
                                    features: { items: [] },
                                    roadmap: { performance: [], security: [], features: [], status: "In Progress" },
                                    meta: { title: "New Project", date: "2025", agency: "Redbrush" }
                                };
                                setValue("caseStudyData", JSON.stringify(template, null, 2));
                            }}
                            className="mt-2 text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                        >
                            <Copy size={12} /> Load Template
                        </button>
                    </div>

                    <div className="text-center text-gray-500 text-xs my-4">- OR -</div>

                    <SlideEditor control={control} setValue={setValue} initialContent={article?.content || ""} />
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="space-y-4 border border-amber-900/20 rounded-lg p-4 bg-black/20">
                <div className="flex items-center justify-between">
                    <h3 className="text-amber-200 font-medium flex items-center gap-2">
                        <Laptop size={16} /> Tech Stack
                    </h3>
                    <button
                        type="button"
                        onClick={() => appendTech({ name: "", version: "" })}
                        className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300"
                    >
                        <Plus size={14} /> Add Tech
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {techFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start bg-[#1a1515] p-2 rounded border border-amber-900/10">
                            <input
                                {...register(`techStack.${index}.name` as const)}
                                placeholder="Tech Name (e.g. React)"
                                className="bg-transparent border-b border-gray-700 text-sm text-white w-full focus:outline-none focus:border-amber-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeTech(index)}
                                className="text-red-500 hover:text-red-400"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Tech Helper */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                    <p className="text-xs text-amber-200/50 uppercase tracking-widest font-bold">Quick Add Tech</p>
                    <div className="flex flex-wrap gap-2">
                        {techOptions.map((group) => (
                            <div key={group.name} className="flex flex-wrap gap-1">
                                {group.items.slice(0, 3).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => appendTech({ name: item, version: "Latest" })}
                                        className="text-[10px] px-2 py-1 bg-white/5 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 rounded border border-transparent hover:border-amber-500/30 transition-all"
                                    >
                                        + {item}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Helper */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                    <p className="text-xs text-amber-200/50 uppercase tracking-widest font-bold">Quick Add Tech</p>
                    <div className="flex flex-wrap gap-2">
                        {techOptions.map((group) => (
                            <div key={group.name} className="flex flex-wrap gap-1">
                                {group.items.slice(0, 3).map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => appendTech({ name: item, version: "Latest" })}
                                        className="text-[10px] px-2 py-1 bg-white/5 hover:bg-amber-500/20 text-gray-400 hover:text-amber-400 rounded border border-transparent hover:border-amber-500/30 transition-all"
                                    >
                                        + {item}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-amber-200 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register("isPublished")}
                        className="w-4 h-4 rounded border-amber-900/30 bg-[#1a1515] text-amber-500 focus:ring-amber-500"
                    />
                    Publish Immediately
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded transition-colors flex items-center justify-center gap-2"
            >
                {isLoading && <Loader2 className="animate-spin" size={18} />}
                {article ? "Update Article" : "Create Article"}
            </button>

        </form>
    );
}
