import Image from "next/image";

import { getProfile, Education, Experience, Certification } from "@/actions/profile.actions";
import { Card } from "@/components/ui/card";
import ExperienceCarousel from "@/components/ExperienceCarousel";
import PrintResumeButton from "@/components/PrintResumeButton";

export const dynamic = 'force-dynamic';

export default async function About() {
    const { data: profile } = await getProfile();
    const avatar = profile?.avatar;

    const name = profile?.name || "Aparicio Bambi";
    const headline = profile?.headline || "Videographer | Creative Director";
    const bio = profile?.bio || "";
    const skills = profile?.skills || [];
    // Cast JSON arrays to strict types
    const experiences = (profile?.experiences || []) as unknown as Experience[];
    const education = (profile?.education || []) as unknown as Education[];
    const certifications = (profile?.certifications || []) as unknown as Certification[];

    return (
        <div className="min-h-screen bg-gradient-to-br from-deep-sea to-ocean-blue">
            {/* ... Hero Section omitted ... */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="text-center mb-8">
                    {/* ... Avatar omitted ... */}
                    <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-crimson-red shadow-lg">
                        <Image src={avatar} alt={profile?.name || "Profile"} fill className="object-cover" />
                    </div>

                    <PrintResumeButton />

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-canvas-white mb-4">
                        {name.split(" ")[0]} <span className="text-crimson-red">{name.split(" ").slice(1).join(" ")}</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-canvas-white/90">
                        {headline}
                    </p>
                </div>

                {/* Three Row Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                    {/* ... About & Skills omitted ... */}
                    <Card className="lg:col-span-2">
                        {/* ... */}
                    </Card>

                    <Card>
                        {/* ... */}
                    </Card>

                    {/* ... ExperienceCarousel omitted ... */}
                    <ExperienceCarousel experiences={experiences} />

                    {/* Row 3: Education & Languages */}
                    <Card className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Education & Certifications</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-base text-canvas-white mb-3">Education</h3>
                                <div className="space-y-3">
                                    {education.map((edu, index) => (
                                        <div key={index}>
                                            <h4 className="font-bold text-sm">{edu.title}</h4>
                                            <p className="text-xs text-ocean-blue">{edu.institution}</p>
                                            <p className="text-xs opacity-70">{edu.year}</p>
                                        </div>
                                    ))}
                                    {education.length === 0 && <p className="text-xs opacity-50">No education listings available.</p>}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-base text-canvas-white mb-3">Certifications</h3>
                                <div className="space-y-3">
                                    {certifications.map((cert, index) => (
                                        <div key={index}>
                                            <h4 className="font-bold text-sm">{cert.title}</h4>
                                            <p className="text-xs text-ocean-blue">{cert.issuer}</p>
                                            <p className="text-xs opacity-70">{cert.date}</p>
                                        </div>
                                    ))}
                                    {certifications.length === 0 && <p className="text-xs opacity-50">No certifications listed.</p>}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* ... Languages omitted ... */}
                    <Card>
                        {/* ... */}
                    </Card>
                </div>
            </section>
        </div>
    );
}

