import Image from "next/image";

// ... existing imports

export default async function About() {
    const { data: profile } = await getProfile();
    const avatar = profile?.avatar;

    // ... (rest of vars)

    return (
        <div className="min-h-screen bg-gradient-to-br from-deep-sea to-ocean-blue">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="text-center mb-8">
                    {avatar && (
                        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-crimson-red shadow-lg">
                            <Image src={avatar} alt={profile?.name || "Profile"} fill className="object-cover" />
                        </div>
                    )}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-canvas-white mb-4">
                        {name.split(" ")[0]} <span className="text-crimson-red">{name.split(" ").slice(1).join(" ")}</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-canvas-white/90">
                        {headline}
                    </p>
                </div>

                {/* Three Row Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

                    {/* Row 1: About & Skills */}
                    <Card className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">About</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <p className="text-sm leading-relaxed text-canvas-white whitespace-pre-line">
                            {bio}
                        </p>
                    </Card>

                    <Card>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Skills</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill: string, index: number) => (
                                <span key={index} className="px-3 py-1 bg-ocean-blue/20 rounded-full text-xs">{skill}</span>
                            ))}
                        </div>
                    </Card>

                    {/* Row 2: Experience Board - Flippable Cards */}
                    {/* Note: Ensure ExperienceCarousel handles the data structure correctly (logo is optional in DB) */}
                    <ExperienceCarousel experiences={experiences as any} />

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
                                    {education.map((edu: any, index: number) => (
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
                                {/* ... Keep certifications static or add to DB later if needed ... */}
                                <p className="text-xs opacity-50">Managed via LinkedIn integration currently.</p>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-canvas-white">Languages</h2>
                            <div className="w-16 h-1 bg-crimson-red mt-2"></div>
                        </div>
                        {/* ... Keep languages static or add to DB ... */}
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-bold text-sm">English</h3>
                                <p className="text-xs opacity-70">Professional</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">French</h3>
                                <p className="text-xs opacity-70">Native</p>
                            </div>
                        </div>
                    </Card>

                </div>
            </section>
        </div>
    );
}

