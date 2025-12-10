"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateProfile, Experience, Education, Certification } from "@/actions/profile.actions";
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
        },
    });

    const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experiences" });
    const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
    const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });

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
                        <input {...register("name")} className="w-full bg-[#0a0505] border border-amber-900/30 p-2 rounded text-amber-100" />
                    </div>
                    <div>
                        <label className="block text-amber-700 text-sm font-bold mb-1">Headline</label>
                        <input {...register("headline")} className="w-full bg-[#0a0505] border border-amber-900/30 p-2 rounded text-amber-100" />
                    </div>
                </div>
                <div>
                    <label className="block text-amber-700 text-sm font-bold mb-1">Bio</label>
                    <textarea {...register("bio")} rows={4} className="w-full bg-[#0a0505] border border-amber-900/30 p-2 rounded text-amber-100" />
                </div>
                <div>
                    <label className="block text-amber-700 text-sm font-bold mb-1">Skills (Comma separated)</label>
                    <input {...register("skills")} className="w-full bg-[#0a0505] border border-amber-900/30 p-2 rounded text-amber-100" />
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

                        <div className="grid grid-cols-2 gap-2">
                            <input {...register(`experiences.${index}.title`)} placeholder="Title" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                            <input {...register(`experiences.${index}.company`)} placeholder="Company" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                        </div>
                        <input {...register(`experiences.${index}.period`)} placeholder="Period (e.g. 2022-Present)" className="w-full bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                        <textarea {...register(`experiences.${index}.description`)} placeholder="Description" rows={2} className="w-full bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
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
                        <div className="grid grid-cols-3 gap-2">
                            <input {...register(`education.${index}.title`)} placeholder="Degree" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                            <input {...register(`education.${index}.institution`)} placeholder="Institution" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                            <input {...register(`education.${index}.year`)} placeholder="Year" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Certifications */}
            <div className="bg-[#1a1515] p-6 rounded-lg border border-amber-900/30 space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-amber-500">Certifications</h2>
                    <button type="button" onClick={() => appendCert({ title: "", issuer: "", date: "" })} className="text-amber-500 hover:text-amber-400">
                        <Plus size={20} />
                    </button>
                </div>
                {certFields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-[#0a0505] rounded border border-amber-900/20 space-y-2 relative">
                        <button type="button" onClick={() => removeCert(index)} className="absolute top-2 right-2 text-red-500"><Trash2 size={16} /></button>
                        <div className="grid grid-cols-3 gap-2">
                            <input {...register(`certifications.${index}.title`)} placeholder="Title" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                            <input {...register(`certifications.${index}.issuer`)} placeholder="Issuer" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                            <input {...register(`certifications.${index}.date`)} placeholder="Date" className="bg-transparent border-b border-amber-900/30 p-1 text-amber-100" />
                        </div>
                    </div>
                ))}
            </div>

            <button type="submit" disabled={loading} className="fixed bottom-8 right-8 bg-amber-600 text-[#120c0c] font-bold px-6 py-3 rounded-full shadow-lg hover:bg-amber-500 transition-colors flex items-center gap-2">
                {loading ? <Loader2 className="animate-spin" /> : <Save />}
                Save Profile
            </button>
        </form>
    );
}
