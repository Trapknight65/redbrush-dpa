
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// --- DATA FROM caseStudies.ts ---
const bambiPortfolioCaseStudy = {
    meta: {
        title: "Bambi Portfolio App",
        date: "2025-12-08",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Heritage & Evolution",
            description: "Culmination of iterative development across multiple repositories:",
            items: [
                { label: "bambi-portfolio65", text: "Initial prototype and core identity" },
                { label: "bmbiprod", text: "Production refinement and deployment" },
                { label: "Current", text: "Unified, high-performance codebase with cinematic UI" }
            ]
        },
        mission: {
            statement: "A high-performance, visually immersive Single Page Application designed to showcase the work of videographer Aparicio Bambi.",
            stats: [
                { label: "React 19", subLabel: "Frontend" },
                { label: "Firebase", subLabel: "Backend" },
                { label: "Tailwind", subLabel: "Styling" },
                { label: "Framer", subLabel: "Animation" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Frontend Framework", value: "React 19 with Create React App" },
            { label: "Routing", value: "React Router DOM v7 (Lazy loading)" },
            { label: "Styling", value: "Tailwind CSS + Custom variables" },
            { label: "Backend", value: "Firebase Firestore (Real-time DB)" }
        ],
        decisions: [
            { title: "Optimized Loading", description: "React.lazy and Suspense for code-splitting routes" },
            { title: "Protected Routes", description: "Secure admin panel with redirect logic" }
        ]
    },
    features: { items: [] },
    roadmap: { status: "Stable", performance: [], security: [], features: [] }
};

const projects = [
    {
        id: "ecommerce-platform",
        slug: "ecommerce-platform",
        title: "E-commerce Platform",
        category: "Web Development",
        tags: ["Web Development", "Next.js", "E-commerce"],
        description: "A modern, high-performance online store.",
        tech: ["Next.js", "TypeScript", "Stripe"],
        image: "🛒",
        challenge: "High traffic handling.",
        solution: "Custom Next.js app.",
        results: ["150% conversion increase"],
        gallery: ["🖼️", "📸"],
        caseStudies: {
            create: {
                meta: { title: "E-commerce Scale", date: "2025-11-15", agency: "Redbrush" },
                overview: { mission: { statement: "Scale e-commerce.", stats: [] } },
                architecture: {},
                features: {},
                roadmap: {}
            }
        }
    },
    {
        id: "bambi-portfolio",
        slug: "bambi-portfolio",
        title: "Bambi Portfolio App",
        category: "App Development",
        tags: ["App Development", "React", "Animation"],
        description: "Cinematic SPA for videographer portfolio.",
        tech: ["React 19", "Firebase", "Tailwind"],
        image: "🎬",
        challenge: "Cinematic feel requirements.",
        solution: "React SPA with Framer Motion.",
        results: ["PWA Ready", "60fps animations"],
        gallery: ["🎬", "✨"],
        caseStudies: {
            create: {
                ...bambiPortfolioCaseStudy
            }
        }
    },
    {
        id: "neon-dash",
        slug: "neon-dash",
        title: "Neon Dash Dashboard",
        category: "App Development",
        tags: ["Dashboard", "SaaS", "Dark Mode"],
        description: "High-contrast analytics dashboard for crypto traders.",
        tech: ["React", "D3.js", "WebSockets"],
        image: "📊",
        challenge: "Real-time data visualization.",
        solution: "WebSocket integration with D3 charts.",
        results: ["<100ms Latency", "User retention up 40%"],
        gallery: ["📈", "📉"],
        caseStudies: {
            create: {
                meta: { title: "Real-time Data Vis", date: "2025-10-01", agency: "Redbrush" },
                overview: { mission: { statement: "Visualize crypto data.", stats: [] } },
                architecture: {},
                features: {},
                roadmap: {}
            }
        }
    },
    {
        id: "zen-wellness",
        slug: "zen-wellness",
        title: "Zen Wellness App",
        category: "Mobile Apps",
        tags: ["Mobile", "React Native", "Health"],
        description: "Cross-platform meditation and wellness tracker.",
        tech: ["React Native", "Expo", "Node.js"],
        image: "🧘",
        challenge: "Offline capabilities.",
        solution: "Local-first architecture with sync.",
        results: ["5 Star Rating", "10k Downloads"],
        gallery: ["📱", "🧠"],
        caseStudies: {
            create: {
                meta: { title: "Offline First", date: "2025-09-20", agency: "Redbrush" },
                overview: { mission: { statement: "Bring peace offline.", stats: [] } },
                architecture: {},
                features: {},
                roadmap: {}
            }
        }
    }
]

// Services categorized as Articles for Admin visibility
const services = [
    {
        title: "Custom Web Development",
        slug: "service-web-development",
        category: "Service",
        excerpt: "High-performance websites and web applications tailored to your brand.",
        content: `---
# Custom Web Development

We build fast, secure, and scalable web solutions.

- **Next.js & React**: Modern frameworks for interactive UIs.
- **Performance Optimization**: Core Web Vitals focus.
- **SEO Ready**: Built for visibility.

---

# Our Process

1. **Discovery**: Understanding your needs.
2. **Design**: Prototyping and UI/UX.
3. **Develop**: agile coding sprints.
4. **Deploy**: CI/CD and hosting setup.
`,
        tags: ["Web", "Frontend", "Backend"],
        techStack: [{ name: "Next.js", version: "14" }, { name: "PostgreSQL", version: "16" }]
    },
    {
        title: "Mobile App Development",
        slug: "service-mobile-apps",
        category: "Service",
        excerpt: "Native and cross-platform mobile applications for iOS and Android.",
        content: `---
# Mobile App Development

Reach your users on any device.

- **React Native / Expo**: Cross-platform efficiency.
- **Native Performance**: Optimized code.
- **App Store Ops**: Submission and management.

---

# Features

- Offline Support
- Push Notifications
- Biometric Auth
`,
        tags: ["Mobile", "iOS", "Android"],
        techStack: [{ name: "React Native", version: "0.74" }, { name: "Expo", version: "50" }]
    },
    {
        title: "Brand Identity Design",
        slug: "service-brand-identity",
        category: "Service",
        excerpt: "Creating memorable visual identities that resonate with your audience.",
        content: `---
# Brand Identity

More than just a logo. We craft full visual systems.

- **Logo Design**: Minimalist and memorable.
- **Color Systems**: Psychology-backed palettes.
- **Typography**: Readable and distinctive.

---

# Deliverables

- Brand Guidelines (PDF)
- Asset Library (SVG, PNG)
- Social Media Kit
`,
        tags: ["Design", "Branding", "Creative"],
        techStack: [{ name: "Figma", version: "Latest" }, { name: "Adobe CC", version: "2025" }]
    }
];

async function main() {
    console.log('Start seeding ...')

    // Seed Projects
    for (const p of projects) {
        const project = await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                slug: p.slug,
                title: p.title,
                category: p.category,
                tags: p.tags,
                description: p.description,
                tech: p.tech,
                image: p.image,
                challenge: p.challenge,
                solution: p.solution,
                results: p.results,
                gallery: p.gallery,
                caseStudies: p.caseStudies
            },
        })
        console.log(`Created project: ${project.title}`)
    }

    // Seed Services (as Articles)
    for (const s of services) {
        await prisma.article.upsert({
            where: { slug: s.slug },
            update: {},
            create: {
                title: s.title,
                slug: s.slug,
                category: s.category,
                excerpt: s.excerpt,
                content: s.content,
                tags: s.tags,
                isPublished: true,
                techStack: s.techStack
            }
        });
        console.log(`Created service: ${s.title}`);
    }

    // --- SEED EXISTING ARTICLES ---
    const article = await prisma.article.upsert({
        where: { slug: "introducing-redbrush-dev-lab" },
        update: {},
        create: {
            title: "Introducing the Redbrush Dev Lab",
            slug: "introducing-redbrush-dev-lab",
            category: "Devlog",
            isPublished: true,
            excerpt: "A new era of transparency. We are opening our codebase logic and development process to the world.",
            tags: ["Announcement", "Transparency", "Next.js"],
            content: `---
# Welcome to the Lab

This is the start of the **Redbrush Developer Theme**. A dedicated space to showcase the raw engineering behind our cinematic experiences.

---

# Why "Dev Lab"?

We believe in "Show, Don't Just Tell". Clients and fellow developers should be able to see:
- Our code quality
- Our architectural decisions
- Our tech stack in action

---

# What to Expect

1. **Deep Dives**: Technical breakdowns of complex animations.
2. **Dev Reports**: Monthly summaries of our shipping velocity.
3. **Experiments**: Raw playground components.

Stay tuned.
`,
            techStack: [
                { name: "Next.js 14", version: "14.2" },
                { name: "Prisma", version: "5.x" },
                { name: "Tailwind CSS", version: "3.4" }
            ]
        }
    })
    console.log(`Created article: ${article.title}`)

    // --- SEED BAMBI VISUALS ARTICLE ---
    const bambiArticle = await prisma.article.upsert({
        where: { slug: "bambi-portfolio-case" },
        update: {},
        create: {
            title: "Bambi Visuals — Complete Project Summary",
            slug: "bambi-portfolio-case",
            category: "Case Study",
            isPublished: true,
            excerpt: "How Redbrush transformed Bambi Visuals into a cinematic, culturally-rooted digital brand using a slide-based narrative.",
            tags: ["Case Study", "Branding", "UI/UX", "Glassmorphism"],
            techStack: [
                { name: "Next.js", version: "14" },
                { name: "Glassmorphism", version: "Custom" },
                { name: "CMS", version: "Integrated" }
            ],
            content: `---
# Bambi Visuals — Complete Project Summary

Redbrush developed the full brand identity, UI system, and website experience for Bambi Visuals, transforming it into a cinematic, culturally-rooted digital brand.

---

# 1. Brand Identity Creation

**Visual Direction**:
Redbrush built a unique aesthetic blending:
- **Cinematic atmosphere**
- **Angola-inspired colors & light**
- **Elegance of the Palanca Negra Gigante**
- **Soft cosmic glow**

**The result:** A warm, expressive, premium identity.

**New Logo**:
- Minimal & Elegant
- Expressive
- Optimized for mobile

---

# 2. Color Palette & UI

**Official Palette**:
- 🔴 **Crimson Red**: Passion, expression, energy.
- 🌑 **Black**: Cinematic contrast, depth.
- 🌅 **Sunset Gold**: Warmth, African sunset glow.

**Glassmorphism System**:
- Frosted translucent layers
- Soft glow and blur (12–16px)
- Floating cards with depth

---

# 3. Infrastructure & CMS

**Mobile-First UI**:
- Thumb-friendly navigation
- Scalable typography
- Smooth transitions

**CMS Integration**:
- Full control for Bambi team
- Manage portfolio, projects, text, images
- Scalable storytelling platform

---

# 4. Cinematic Brand Energy

**Brand Tone**:
- Film-inspired
- Deep blacks for contrast
- Golden-hour highlights

**One-Liner**:
Redbrush built a cinematic, mobile-first, Angola-inspired brand and website for Bambi Visuals—complete with a new logo, crimson–black–gold color system, glassmorphic UI, and a scalable CMS-driven platform.
`
        }
    })
    console.log(`Created article: ${bambiArticle.title}`)

    // --- SEED DEV REPORT ---
    const report = await prisma.devReport.upsert({
        where: { slug: "system-initialization-dec-2025" },
        update: {},
        create: {
            title: "System Initialization: December 2025",
            slug: "system-initialization-dec-2025",
            period: "December 2025",
            isPublished: true,
            content: `The "Developers Theme" initiative has been successfully deployed. This report marks the beginning of our public engineering logs.

We have established the core infrastructure for:
- **Article Management**: MDX-ready content pipeline.
- **Metric Tracking**: Automated KPI visualization (mocked for now).
- **Component Playground**: A dedicated lab environment.

Next steps include integrating real-time GitHub metrics and expanding the component library.`,
            highlights: [
                "Deployed Dev Lab Portal",
                "Implemented Neon/Glassmorphism Design System",
                "Integrated Admin Article Management"
            ],
            metrics: {
                "Commits": 142,
                "Deployments": 15,
                "Uptime": "99.9%"
            }
        }
    })
    console.log(`Created report: ${report.title}`)

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
