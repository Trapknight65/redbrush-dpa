"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateProfile, Experience, Education, Certification, HeroSlide } from "@/actions/profile.actions";
import { useState } from "react";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

interface ProfileFormData {
    name: string;
    headline: string;
    bio: string;
    avatar: string;
    skills: string; // Comma separated for editing
    experiences: Experience[];
    education: Education[];
    certifications: Certification[];
    languages: { language: string; proficiency: string }[];
    heroSlides: HeroSlide[];
}

export default function ProfileForm({ initialData }: { initialData?: any }) {
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
        },
    });

    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experiences" });
    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
    const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });
    const { fields: heroFields, append: appendHero, remove: removeHero } = useFieldArray({ control, name: "heroSlides" });

    const onSubmit = async (data: ProfileFormData) => {
        setLoading(true);
        setError("");
        try {
            const formattedData = {
                ...data,
                skills: data.skills.split(",").map(t => t.trim()).filter(Boolean),
            };

            const result = await updateProfile(formattedData as any);
            if (result.success) {
                router.refresh();
                alert("Profile updated successfully!");
            } else {
                setError(result.error as string);
            }
        } catch (err) {
            console.error(err);
            setError("Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            {error && <div className="text-red-500 p-4 border border-red-500 rounded bg-red-900/20">{error}</div>}

            {/* Basic Info */}
            <div className="bg-[#1a1515] p-6 rounded-lg border border-amber-900/30 space-y-4">
                <h2 className="text-xl font-bold text-amber-500 mb-4">Basic Information</h2>

                {/* Avatar Upload */}
                <div className="mb-6">
                    <label className="block text-amber-700 text-sm font-bold mb-2">Profile Picture</label>
                    <ImageUpload
                        value={watch("avatar")}
                        onChange={(url) => setValue("avatar", url)}
                        onRemove={() => setValue("avatar", "")}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-amber-700 text-sm font-bold mb-1">Name</label>
                        <input {...register("name")} className="w-full bg-[#0a0505] border border-amber-900/30 p-3 sm:p-2 rounded text-amber-100 text-base sm:text-sm" />
                    </div>
                    <div>
                        <label className="block text-amber-700 text-sm font-bold mb-1">Headline</label>
                        <input {...register("headline")} className="w-full bg-[#0a0505] border border-amber-900/30 p-3 sm:p-2 rounded text-amber-100 text-base sm:text-sm" />
                    </div>
                </div>
                <div>
                    <label className="block text-amber-700 text-sm font-bold mb-1">Bio</label>
                    <textarea {...register("bio")} rows={4} className="w-full bg-[#0a0505] border border-amber-900/30 p-3 sm:p-2 rounded text-amber-100 text-base sm:text-sm" />
                </div>
                <div>
                    <label className="block text-amber-700 text-sm font-bold mb-1">Skills (Comma separated)</label>
                    <input {...register("skills")} className="w-full bg-[#0a0505] border border-amber-900/30 p-3 sm:p-2 rounded text-amber-100 text-base sm:text-sm" />
                </div>
            </div>

            {/* Experience */}
            <div className="bg-[#1a1515] p-6 rounded-lg border border-amber-900/30 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-500">Experience</h2>
                    <button type="button" onClick={() => appendExp({ title: "", company: "", period: "", description: "" })} className="text-amber-500 hover:text-amber-400">
                        <Plus size={20} />
                    </button>
                </div>
                {expFields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-[#0a0505] rounded border border-amber-900/20 space-y-2 relative">
                        <button type="button" onClick={() => removeExp(index)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16} /></button>

                        {/* Logo Upload */}
                        <div className="mb-2">
                            <label className="block text-amber-700 text-xs font-bold mb-1">Company Logo</label>
                            <ImageUpload
                                value={watch(`experiences.${index}.logo`) || ""}
                                onChange={(url) => setValue(`experiences.${index}.logo`, url)}
                                onRemove={() => setValue(`experiences.${index}.logo`, "")}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input {...register(`experiences.${index}.title`)} placeholder="Title" className="bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm w-full" />
                            <input {...register(`experiences.${index}.company`)} placeholder="Company" className="bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm w-full" />
                        </div>
                        <input {...register(`experiences.${index}.period`)} placeholder="Period (e.g. 2022-Present)" className="w-full bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm" />
                        <textarea {...register(`experiences.${index}.description`)} placeholder="Description" rows={3} className="w-full bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm" />
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="bg-[#1a1515] p-6 rounded-lg border border-amber-900/30 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-500">Education</h2>
                    <button type="button" onClick={() => appendEdu({ title: "", institution: "", year: "" })} className="text-amber-500 hover:text-amber-400">
                        <Plus size={20} />
                    </button>
                </div>
                {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-[#0a0505] rounded border border-amber-900/20 space-y-2 relative">
                        <button type="button" onClick={() => removeEdu(index)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2">
                            <input {...register(`education.${index}.title`)} placeholder="Degree" className="bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm w-full" />
                            <input {...register(`education.${index}.institution`)} placeholder="Institution" className="bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm w-full" />
                            <input {...register(`education.${index}.year`)} placeholder="Year" className="bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm w-full" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Slides */}
            <div className="bg-[#1a1515] p-6 rounded-lg border border-amber-900/30 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-500">Hero Slides</h2>
                    <button type="button" onClick={() => appendHero({ type: "image", url: "", component: "", alt: "" })} className="text-amber-500 hover:text-amber-400">
                        <Plus size={20} />
                    </button>
                </div>
                {heroFields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-[#0a0505] rounded border border-amber-900/20 space-y-2 relative">
                        <button type="button" onClick={() => removeHero(index)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-amber-700 text-xs font-bold mb-1">Type</label>
                                <select {...register(`heroSlides.${index}.type`)} className="w-full bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm">
                                    <option value="image" className="bg-[#0a0505]">Image</option>
                                    <option value="video" className="bg-[#0a0505]">Video</option>
                                    <option value="3d" className="bg-[#0a0505]">3D Model</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-amber-700 text-xs font-bold mb-1">URL / Source</label>
                                <div className="flex gap-2 items-center">
                                    <div className="space-y-2">
                                        <input {...register(`heroSlides.${index}.url`)} placeholder="URL or /path" className="w-full bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm" />
                                        {watch(`heroSlides.${index}.type`) === 'image' && (
                                            <ImageUpload
                                                value={watch(`heroSlides.${index}.url`) || ""}
                                                onChange={(url) => setValue(`heroSlides.${index}.url`, url)}
                                                onRemove={() => setValue(`heroSlides.${index}.url`, "")}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {watch(`heroSlides.${index}.type`) === '3d' && (
                                <div>
                                    <label className="block text-amber-700 text-xs font-bold mb-1">Component / Model</label>
                                    <input {...register(`heroSlides.${index}.component`)} placeholder="e.g. FrogViewer" className="w-full bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm" />
                                    <p className="text-xs text-amber-500/50 mt-1">Leave empty for default Frog</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-amber-700 text-xs font-bold mb-1">Alt Text</label>
                                <input {...register(`heroSlides.${index}.alt`)} placeholder="Alt text" className="w-full bg-transparent border-b border-amber-900/30 p-2 text-amber-100 text-base sm:text-sm" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button type="submit" disabled={loading} className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-amber-600 text-[#120c0c] font-bold px-6 py-3 rounded-full shadow-lg hover:bg-amber-500 transition-colors flex items-center gap-2 z-40">
                {loading ? <Loader2 className="animate-spin" /> : <Save />}
                Save
            </button>
        </form >
    );
}
