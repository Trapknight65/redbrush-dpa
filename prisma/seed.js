
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const portfolioProjects = [
    {
        title: "Bambi Portfolio - v1",
        slug: "bambi-portfolio-v1",
        category: "Web Development",
        description: "A high-performance portfolio website built with Next.js and Tailwind CSS.",
        image: "🦌",
        tags: ["Next.js", "React", "Tailwind CSS"],
        tech: ["Next.js", "React", "Framing Motion", "Tailwind CSS"],
        challenge: "Creating a unique, performant portfolio that stands out.",
        solution: "Utilized Next.js for server-side rendering and Tailwind for rapid styling.",
        results: ["100/100 Lighthouse Score", "Featured on Awwwards"],
        gallery: ["🦌", "🚀", "💻"],
        figmaDesign: { title: "Portfolio Design", thumbnail: "/figma-thumb.png", url: "#" },
        caseStudyData: {
            overview: {
                heritage: { title: "Project Heritage", description: "Bambi Portfolio Evolution", items: [{ text: "Version 1.0" }] },
                mission: { statement: "To showcase creativity.", stats: [{ label: "100%", subLabel: "Uptime" }] }
            },
            architecture: {
                coreStack: [{ label: "Frontend", value: "React" }],
                decisions: [{ title: "Why React?", description: "Component based structure." }]
            },
            features: { items: [] },
            roadmap: { performance: [], security: [], features: [], status: "Completed" },
            meta: { title: "Bambi Portfolio", date: "2024", agency: "Bambi" }
        }
    },
    {
        title: "Redbrush DPA",
        slug: "redbrush-dpa",
        category: "Agency Site",
        description: "Digital Product Agency website.",
        image: "🔴",
        tags: ["Next.js", "Prisma", "PostgreSQL"],
        tech: ["Next.js 14", "Prisma", "Supabase", "Tailwind"],
        challenge: "Building a scalable agency platform.",
        solution: "Integrated a robust CMS with Prisma and Supabase.",
        results: ["Scalable Architecture", "Easy Content Management"],
        gallery: ["🔴", "🔥", "📈"],
        caseStudyData: {
            overview: {
                heritage: { title: "Agency Origins", description: "From freelance to agency", items: [{ text: "Founded 2024" }] },
                mission: { statement: "Digital Excellence.", stats: [{ label: "5+", subLabel: "Clients" }] }
            },
            architecture: {
                coreStack: [{ label: "Fullstack", value: "Next.js" }],
                decisions: [{ title: "Why Prisma?", description: "Type-safety." }]
            },
            features: { items: [] },
            roadmap: { performance: [], security: [], features: [], status: "Live" },
            meta: { title: "Redbrush DPA", date: "2024", agency: "Redbrush" }
        }
    }
];

async function main() {
    console.log('Start seeding ...');
    for (const p of portfolioProjects) {
        const project = await prisma.project.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        });
        console.log(`Created project with id: ${project.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
