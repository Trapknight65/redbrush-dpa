"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateProfile, HeroSlide, Experience, Education, Certification, ContactInfo } from "@/actions/profile.actions";
import { useState } from "react";
import { Loader2, Save, Plus, Trash2, LayoutTemplate } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import VideoUpload from "@/components/admin/VideoUpload";

interface ProfileFormData {
    name: string;
    headline: string;
    bio: string;
    avatar: string;
    skills: string;
    experiences: Experience[];
    education: Education[];
    certifications: Certification[];
    languages: { language: string; proficiency: string }[];
    heroSlides: HeroSlide[];
    contactInfo: ContactInfo;
}

export default function HeroForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, control, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
        defaultValues: {
            name: initialData?.name || "",
            headline: initialData?.headline || "",
            bio: initialData?.bio || "",
            avatar: initialData?.avatar || "",
            skills: initialData?.skills?.join(", ") || "",
            experiences: initialData?.experiences || [],
            education: initialData?.education || [],
            certifications: initialData?.certifications || [],
            languages: initialData?.languages || [],
            heroSlides: initialData?.heroSlides || [],
            contactInfo: initialData?.contactInfo || { email: "", phone: "", address: "", socials: [] },
        },
    });

    const { fields: heroFields, append: appendHero, remove: removeHero } = useFieldArray({ control, name: "heroSlides" });

    const onSubmit = async (data: ProfileFormData) => {
        setLoading(true);
        setError("");
        try {
            const formattedData = {
                ...data,
                skills: typeof data.skills === 'string' ? data.skills.split(",").map(t => t.trim()).filter(Boolean) : data.skills,
            };

            const result = await updateProfile(formattedData as any);
            if (result.success) {
                router.refresh();
                alert("Hero slides updated successfully!");
            } else {
                setError(result.error as string);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to save hero slides");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            {error && <div className="text-red-500 p-4 border border-red-500 rounded bg-red-900/20">{error}</div>}

            <div className="bg-[#1a1515] p-6 rounded-lg border border-amber-900/30 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                    <LayoutTemplate className="w-8 h-8 text-amber-500" />
                    <div>
                        <h2 className="text-2xl font-bold text-amber-500">Hero Section</h2>
                        <p className="text-amber-500/60 text-sm">Manage the main homepage slider content</p>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-amber-900/30">
                    <h3 className="text-lg font-bold text-amber-100">Slides</h3>
                    <button type="button" onClick={() => appendHero({ type: "image", url: "", component: "", alt: "" })} className="flex items-center gap-2 text-sm bg-amber-900/20 text-amber-500 hover:text-amber-400 hover:bg-amber-900/30 px-3 py-2 rounded transition border border-amber-900/30">
                        <Plus size={16} />
                        Add Slide
                    </button>
                </div>

                <div className="space-y-4">
                    {heroFields.map((field, index) => (
                        <div key={field.id} className="p-4 bg-[#0a0505] rounded border border-amber-900/20 space-y-4 relative group hover:border-amber-900/50 transition">
                            <button type="button" onClick={() => removeHero(index)} className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-60 group-hover:opacity-100 transition"><Trash2 size={18} /></button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pr-8">
                                <div>
                                    <label className="block text-amber-700 text-xs font-bold mb-2">Content Type</label>
                                    <select {...register(`heroSlides.${index}.type`)} className="w-full bg-[#1a1515] border border-amber-900/30 p-2 rounded text-amber-100 text-sm focus:border-amber-500/50 outline-none">
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                        <option value="3d">3D Model</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-amber-700 text-xs font-bold mb-2">Media Source</label>
                                    <input {...register(`heroSlides.${index}.url`)} placeholder="URL or /path" className="w-full bg-[#1a1515] border border-amber-900/30 p-2 rounded text-amber-100 text-sm focus:border-amber-500/50 outline-none mb-2" />

                                    {watch(`heroSlides.${index}.type`) === 'image' && (
                                        <ImageUpload
                                            value={watch(`heroSlides.${index}.url`) || ""}
                                            onChange={(url) => setValue(`heroSlides.${index}.url`, url)}
                                            onRemove={() => setValue(`heroSlides.${index}.url`, "")}
                                        />
                                    )}

                                    {watch(`heroSlides.${index}.type`) === 'video' && (
                                        <VideoUpload
                                            value={watch(`heroSlides.${index}.url`) || ""}
                                            onChange={(url) => setValue(`heroSlides.${index}.url`, url)}
                                            onRemove={() => setValue(`heroSlides.${index}.url`, "")}
                                        />
                                    )}
                                </div>

                                {watch(`heroSlides.${index}.type`) === '3d' && (
                                    <div className="col-span-1 sm:col-span-2">
                                        <label className="block text-amber-700 text-xs font-bold mb-2">3D Component</label>
                                        <input {...register(`heroSlides.${index}.component`)} placeholder="e.g. FrogViewer" className="w-full bg-[#1a1515] border border-amber-900/30 p-2 rounded text-amber-100 text-sm focus:border-amber-500/50 outline-none" />
                                        <p className="text-xs text-amber-500/40 mt-1">Leave empty to use default model</p>
                                    </div>
                                )}

                                <div className="col-span-1 sm:col-span-2">
                                    <label className="block text-amber-700 text-xs font-bold mb-2">Alt Text / Description</label>
                                    <input {...register(`heroSlides.${index}.alt`)} placeholder="Brief description of the slide" className="w-full bg-[#1a1515] border border-amber-900/30 p-2 rounded text-amber-100 text-sm focus:border-amber-500/50 outline-none" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {heroFields.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-amber-900/20 rounded-lg text-amber-900/40">
                            <p>No slides configured yet.</p>
                            <p className="text-sm">Click "Add Slide" to begin.</p>
                        </div>
                    )}
                </div>
            </div>

            <button type="submit" disabled={loading} className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-amber-600 text-[#120c0c] font-bold px-6 py-3 rounded-full shadow-lg hover:bg-amber-500 transition-colors flex items-center gap-2 z-40">
                {loading ? <Loader2 className="animate-spin" /> : <Save />}
                Save Changes
            </button>
        </form >
    );
}
