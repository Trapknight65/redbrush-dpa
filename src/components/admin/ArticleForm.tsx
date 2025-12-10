"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createArticle, updateArticle, ArticleInput } from "@/actions/content.actions";
import { Loader2, Plus, X, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleFormProps {
    article?: any; // Using any for simplicity with Prisma types for now, essentially Article
}

export default function ArticleForm({ article }: ArticleFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, control, handleSubmit, formState: { errors } } = useForm<ArticleInput>({
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

    // Simple arrays for tags management
    // For MVP we just use comma separation or simple input for tags, 
    // but react-hook-form handles arrays better with useFieldArray or custom logic.
    // Let's use a simple text input for tags splitted by comma for simplicity in this MVP.

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

            {/* Markdown Content Editor */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-amber-200 flex justify-between">
                    Content (Markdown)
                    <span className="text-xs text-amber-500/50">Supports MDX-like structure</span>
                </label>
                <textarea
                    {...register("content", { required: true })}
                    className="w-full bg-[#0a0a0a] border border-amber-900/30 rounded p-4 text-gray-300 font-mono text-sm leading-relaxed focus:border-amber-500 outline-none transition-colors min-h-[400px]"
                    placeholder="# Heading&#10;&#10;Write your technical masterpiece here..."
                />
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
