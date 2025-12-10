import Link from "next/link";
import Image from "next/image";

import { getProfile, Education, Experience, Certification, Language } from "@/actions/profile.actions";
import { Card } from "@/components/ui/card";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import FloatingActions from "@/components/FloatingActions";
import AboutQuickNav from "@/components/AboutQuickNav";
import { Briefcase, GraduationCap, Award, Globe } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function About() {
    const { data: profile } = await getProfile();
    const avatar = profile?.avatar || "/logo.png";

    const name = profile?.name || "Aparicio Bambi";
    const headline = profile?.headline || "Videographer | Creative Director";
    const bio = profile?.bio || "";
    const skills = profile?.skills || [];
    // Cast JSON arrays to strict types
    const experiences = (profile?.experiences || []) as unknown as Experience[];
    const education = (profile?.education || []) as unknown as Education[];
    const certifications = (profile?.certifications || []) as unknown as Certification[];
    const languages = (profile?.languages || []) as unknown as Language[];

    return (
        <div className="min-h-screen text-white">
            <AboutQuickNav />
            <FloatingActions />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-24">

                {/* Section A: Bio and Skills */}
                <div id="bio-skills" className="scroll-mt-20 mb-16 sm:mb-24">
                    <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start">
                        {/* Avatar - Left */}
                        <div className="w-full md:w-1/3 flex-shrink-0">
                            <div className="relative aspect-square w-full max-w-[180px] sm:max-w-xs mx-auto md:mx-0 rounded-2xl overflow-hidden border-2 border-crimson-red/20 shadow-2xl">
                                {profile?.avatar ? (
                                    <Image
                                        src={profile.avatar}
                                        alt={profile.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full bg-[#1a1515] flex items-center justify-center text-gray-700">
                                        No Image
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content - Right */}
                        <div className="w-full md:w-2/3 space-y-4 sm:space-y-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                                    <span className="text-crimson-red">About</span> Me
                                </h1>
                                <h2 className="text-lg sm:text-xl text-gray-400 font-light mb-4">
                                    {profile?.headline || "Digital Creator & Developer"}
                                </h2>
                                <div className="h-1 w-20 bg-crimson-red rounded-full"></div>
                            </div>

                            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                                <p>
                                    {profile?.bio || "Passionate about creating digital experiences that leave a lasting impression."}
                                </p>
                            </div>

                            {/* Skills */}
                            {profile?.skills && profile.skills.length > 0 && (
                                <div className="pt-4">
                                    <h3 className="text-sm font-semibold text-crimson-red uppercase tracking-wider mb-3">
                                        Skills & Expertise
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#1a1515] border border-gray-800 rounded-full text-xs sm:text-sm text-gray-300 hover:border-crimson-red/50 transition-colors cursor-default"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section B: Experience */}
                {profile?.experiences && profile.experiences.length > 0 && (
                    <div id="experience" className="scroll-mt-20 mb-16 sm:mb-24">
                        <div className="flex items-center gap-4 mb-8">
                            <Briefcase className="text-crimson-red" size={24} />
                            <h2 className="text-xl sm:text-2xl font-bold">Experience</h2>
                        </div>
                        <div className="space-y-8 border-l-2 border-crimson-red/20 ml-3 pl-8 sm:pl-12 relative">
                            {profile.experiences.map((exp: any, index: number) => (
                                <div key={index} className="relative">
                                    {/* Timeline Dot */}
                                    <div className="absolute -left-[41px] sm:-left-[57px] top-1 w-5 h-5 rounded-full bg-[#0a0505] border-4 border-crimson-red"></div>

                                    <div className="space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                                            <h3 className="text-base sm:text-lg font-bold text-white">{exp.title}</h3>
                                            <span className="text-xs sm:text-sm text-crimson-red font-mono bg-crimson-red/5 px-2 py-0.5 rounded w-fit">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-400 font-medium">{exp.company}</div>
                                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Section C: Certifications & Languages */}
                <div id="cert-lang" className="scroll-mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                    {/* Certifications */}
                    {profile?.certifications && profile.certifications.length > 0 && (
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Award className="text-crimson-red" size={24} />
                                <h2 className="text-xl sm:text-2xl font-bold">Certifications</h2>
                            </div>
                            <div className="grid gap-4">
                                {profile.certifications.map((cert: any, index: number) => (
                                    <div key={index} className="bg-[#1a1515] p-4 rounded-xl border border-gray-800 hover:border-crimson-red/30 transition-colors group">
                                        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-crimson-red transition-colors">{cert.title}</h3>
                                        <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500">
                                            <span>{cert.issuer}</span>
                                            <span>{cert.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {profile?.languages && profile.languages.length > 0 && (
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <Globe className="text-crimson-red" size={24} />
                                <h2 className="text-xl sm:text-2xl font-bold">Languages</h2>
                            </div>
                            <div className="bg-[#1a1515] p-6 rounded-2xl border border-gray-800">
                                <div className="space-y-4">
                                    {profile.languages.map((lang: any, index: number) => (
                                        <div key={index} className="flex items-center justify-between border-b last:border-0 border-gray-800 pb-3 last:pb-0">
                                            <span className="font-medium text-sm sm:text-base text-gray-200">{lang.language}</span>
                                            <span className="text-xs sm:text-sm text-crimson-red font-mono">{lang.proficiency}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}

