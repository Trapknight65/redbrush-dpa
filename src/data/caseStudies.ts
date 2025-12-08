
import { CaseStudyData } from "../components/FigmaCaseStudy";

export const bambiPortfolioCaseStudy: CaseStudyData = {
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
            { title: "Protected Routes", description: "Secure admin panel with redirect logic" },
            { title: "Global Contexts", description: "AuthProvider for session management" },
            { title: "PWA Ready", description: "Mobile-first with native app capabilities" }
        ]
    },
    features: {
        items: [
            {
                title: "Cinematic User Experience",
                icon: "Film",
                points: [
                    { label: "Visual Language", text: "Dark mode aesthetic with gold accents" },
                    { label: "Atmospheric Effects", text: "Film grain, spotlight effects, glassmorphism" },
                    { label: "Smooth Transitions", text: "Custom PageWrapper with fade/slide animations" }
                ]
            },
            {
                title: "Admin Panel & Content Management",
                icon: "Shield",
                points: [
                    { label: "Dashboard", text: "Real-time stats for Projects, Featured Work, and Reviews" },
                    { label: "Dynamic Content", text: "Create, edit, and delete portfolio projects" },
                    { label: "Discover Module", text: "Manage featured work items" },
                    { label: "Feedback System", text: "Moderate and publish client reviews" },
                    { label: "Security", text: "Protected by Firebase Authentication" }
                ]
            },
            {
                title: "Mobile & Performance",
                icon: "TrendingUp",
                points: [
                    { label: "Adaptive Navigation", text: "Desktop header + mobile bottom bar" },
                    { label: "Skeleton Loading", text: "Visual feedback during data fetching" },
                    { label: "PWA Features", text: "Install app prompt for compatible devices" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Application is stable, production-ready, and optimized with code splitting active. Deployed on Render with full SPA support.",
        performance: [
            { title: "Image Optimization", description: "Implement AVIF/WebP formats via build pipeline" },
            { title: "Bundle Analysis", description: "Further reduce initial load size" }
        ],
        security: [
            { title: "Firestore Rules", description: "Tighten security rules with strict validation" },
            { title: "Environment Variables", description: "Properly scope sensitive configuration" }
        ],
        features: [
            { title: "Blog/News Section", description: "CMS-lite for smaller updates" },
            { title: "Dark/Light Mode Toggle", description: "High-contrast light mode for accessibility" },
            { title: "Client Portal", description: "Private albums and draft approval system" }
        ]
    },
    deployment: {
        steps: [
            {
                title: "Step 1: Get Cloudflare Nameservers",
                description: "First, set up your domain in Cloudflare (it's free and much faster/safer).",
                points: [
                    { text: "Create a free account at cloudflare.com" },
                    { text: "Click 'Add a Site' and enter your domain (e.g., bambimotion.tv)" },
                    { text: "Select the 'Free' plan" },
                    { text: "Cloudflare will give you 2 nameservers (e.g., alan.ns.cloudflare.com, etc.)" }
                ]
            },
            {
                title: "Step 2: Update Godaddy/Namecheap",
                description: "Point your domain provider to Cloudflare.",
                points: [
                    { text: "Log into your domain registrar (Godaddy, Namecheap, etc.)" },
                    { text: "Go to DNS Management for your domain" },
                    { text: "Change 'Nameservers' from 'Default' to 'Custom'" },
                    { text: "Enter the 2 nameservers from Cloudflare" },
                    { text: "Save (can take 1-24h to propagate, usually fast)" }
                ]
            },
            {
                title: "Step 3: Configure Cloudflare DNS",
                description: "Now point Cloudflare to Render. Add these 2 records in Cloudflare > DNS:",
                notes: [
                    {
                        title: "Record #1 - Root Domain",
                        text: "Type: CNAME | Name: @ | Target: https://bmbiprod.onrender.com/ | Proxy: Proxied"
                    },
                    {
                        title: "Record #2 - WWW Subdomain",
                        text: "Type: CNAME | Name: www | Target: your-app-name.onrender.com | Proxy: Proxied"
                    }
                ]
            },
            {
                title: "Step 4: Connect Domain in Render",
                description: "Now tell Render about your custom domain:",
                points: [
                    { text: "Log into your Render dashboard" },
                    { text: "Click on your Bambi Portfolio web service" },
                    { text: "Go to Settings > Custom Domain" },
                    { text: "Click 'Add Custom Domain' and enter your domain" },
                    { text: "Repeat to add the www version" },
                    { text: "SSL: Render will automatically set up free SSL certificates" }
                ]
            },
            {
                title: "Step 5: Update Firebase Settings",
                description: "Don't forget to update Firebase with your new domain:",
                points: [
                    { text: "Go to Firebase Console > Authentication > Settings > Authorized Domains" },
                    { text: "Add your custom domain" },
                    { text: "This allows your admin login to work on the new domain" }
                ]
            },
            {
                title: "Step 6: Test Everything",
                description: "After setup is complete, verify everything works:",
                points: [
                    { text: "Visit your domain in a browser" },
                    { text: "Check that www version also works" },
                    { text: "Verify the padlock icon shows (HTTPS)" },
                    { text: "Test the admin login" },
                    { text: "Check on mobile devices" }
                ]
            }
        ]
    },
    visuals: {
        title: "Visual Gallery",
        items: [
            {
                type: "image",
                url: "/images/case-studies/bambi/walkthrough.webp",
                caption: "Public Site Walkthrough: Cinematic user experience and navigation"
            },
            {
                type: "image",
                url: "/images/case-studies/bambi/admin-access.webp",
                caption: "Secure Admin Access: Authentication flow"
            },
            {
                type: "image",
                url: "/images/case-studies/bambi/dashboard.png",
                caption: "Admin Dashboard: Real-time content management statistics"
            }
        ]
    }
};

export const ecommerceCaseStudy: CaseStudyData = {
    meta: {
        title: "E-commerce Platform Scale",
        date: "2025-11-15",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Project Background",
            description: "A high-traffic fashion retailer needed to migrate from Shopify to a custom solution to avoid transaction fees and enable custom features.",
            items: [
                { label: "Challenge", text: "Legacy platform limitations and high costs" },
                { label: "Goal", text: "Custom headless solution with 0% transaction fees" }
            ]
        },
        mission: {
            statement: "Build a blazingly fast, SEO-optimized e-commerce platform capable of handling flash sales with 10k+ concurrent users.",
            stats: [
                { label: "Next.js", subLabel: "Framework" },
                { label: "Stripe", subLabel: "Payments" },
                { label: "Vercel", subLabel: "Hosting" },
                { label: "Redis", subLabel: "Caching" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Frontend", value: "Next.js 14 (App Router)" },
            { label: "Database", value: "PostgreSQL + Prisma" },
            { label: "Payments", value: "Stripe Connect" },
            { label: "Search", value: "Algolia InstantSearch" }
        ],
        decisions: [
            { title: "Server-Side Rendering", description: "Utilized for product pages to ensure maximum SEO visibility." },
            { title: "Edge Caching", description: "Implemented Vercel Edge Config for real-time feature flags and pricing updates." }
        ]
    },
    features: {
        items: [
            {
                title: "Real-Time Inventory",
                icon: "TrendingUp",
                points: [
                    { label: "WebSockets", text: "Live stock updates during checkouts" },
                    { label: "Cart Reservation", text: "Temporary hold architecture to prevent overselling" }
                ]
            },
            {
                title: "Admin Dashboard",
                icon: "Shield",
                points: [
                    { label: "Analytics", text: "Custom revenue charts and user behavior tracking" },
                    { label: "Order Management", text: "Bulk printing of shipping labels via EasyPost API" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Live and generating revenue.",
        performance: [{ title: "Core Vitals", description: "LCP < 1.2s, CLS 0" }],
        security: [{ title: "PCI Compliance", description: "SAQ-A compliant via Stripe Elements" }],
        features: [{ title: "AI Recommendations", description: "Product suggestion engine based on browsing history" }]
    }
};

export const brandingCaseStudy: CaseStudyData = {
    meta: {
        title: "Tech Startup Rebrand",
        date: "2025-10-01",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Identity Crisis",
            description: "The startup's original DIY logo was holding them back from enterprise deals.",
            items: [
                { label: "Previous", text: "Generic, clip-art style logo" },
                { label: "New Direction", text: "Trust, Innovation, Scalability" }
            ]
        },
        mission: {
            statement: "Create a visual identity that communicates reliability to Fortune 500 CTOs while retaining the startup's energetic culture.",
            stats: [
                { label: "Figma", subLabel: "Design" },
                { label: "Illustrator", subLabel: "Vectors" },
                { label: "Motion", subLabel: "Brand Guidelines" },
                { label: "Print", subLabel: "Collateral" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Design Tool", value: "Figma" },
            { label: "Asset Management", value: "Brandfolder" },
            { label: "Typography", value: "Custom Sans-Serif Family" }
        ],
        decisions: [
            { title: "Color Theory", description: "Shifted from aggressive red to deep navy and electric teal to signify stability and energy." },
            { title: "Logo System", description: "Responsive logo marks for different context (App icon, Header, Print)." }
        ]
    },
    features: {
        items: [
            {
                title: "Visual System",
                icon: "Layers",
                points: [
                    { label: "Logo Suite", text: "Primary wordmark, pictorial mark, and monochrome variants" },
                    { label: "Typography", text: "Licensed 'Inter' paired with a custom display font" }
                ]
            },
            {
                title: "Brand Guidelines",
                icon: "Film",
                points: [
                    { label: "Usage Rules", text: "Clear do's and don'ts for partner co-branding" },
                    { label: "Tone of Voice", text: "Guide for copywriters to maintain brand personality" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Rolled out globally.",
        performance: [],
        security: [],
        features: [{ title: "Motion Identity", description: "Developing a motion language for video intros" }]
    }
};

export const socialMediaCaseStudy: CaseStudyData = {
    meta: {
        title: "Viral Growth Campaign",
        date: "2025-09-20",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Stagnant Growth",
            description: "Client had plateaued at 5k followers for 2 years.",
            items: []
        },
        mission: {
            statement: "Ignite organic growth through a data-backed content strategy focusing on short-form video.",
            stats: [
                { label: "TikTok", subLabel: "Primary" },
                { label: "Reels", subLabel: "Secondary" },
                { label: "CapCut", subLabel: "Editing" },
                { label: "Notion", subLabel: "Management" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Analytics", value: "Google Data Studio" },
            { label: "Scheduling", value: "Buffer" },
            { label: "Ads", value: "Meta Business Manager" }
        ],
        decisions: [
            { title: "Video First", description: "Pivoted 100% of budget to vertical video production." },
            { title: "Community Management", description: "Implemented a 'reply to all' strategy within 1 hour." }
        ]
    },
    features: {
        items: [
            {
                title: "Content Engines",
                icon: "Film",
                points: [
                    { label: "Trend Jacking", text: "System to identify and adapt trends within 24 hours" },
                    { label: "Educational Series", text: "Deep dive content that established authority" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Campaign concluded.",
        performance: [],
        security: [],
        features: []
    }
};

export const cmsCaseStudy: CaseStudyData = {
    meta: {
        title: "Headless CMS Migration",
        date: "2025-08-10",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "WordPress Bottleneck",
            description: "Marketing team was dependent on devs for every text change.",
            items: []
        },
        mission: {
            statement: "Decouple content from code to empower the marketing team and speed up site performance.",
            stats: [
                { label: "Sanity.io", subLabel: "CMS" },
                { label: "Next.js", subLabel: "Frontend" },
                { label: "GROQ", subLabel: "Query Lang" },
                { label: "Vercel", subLabel: "Deploy" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Content Lake", value: "Sanity.io" },
            { label: "Frontend", value: "Next.js ISR" },
            { label: "Previews", value: "Sanity Presentation Mode" }
        ],
        decisions: [
            { title: "Structured Content", description: "Modeled content as data, not HTML blobs, allowing reuse across web and mobile." }
        ]
    },
    features: {
        items: [
            {
                title: "Real-time Preview",
                icon: "Code",
                points: [
                    { label: "Live Edit", text: "Marketing sees changes instantly before publishing" },
                    { label: "Visual Editing", text: "Click-to-edit directly on the frontend preview" }
                ]
            }
        ]
    },
    roadmap: {
        status: "In production.",
        performance: [],
        security: [],
        features: []
    }
};

export const saasCaseStudy: CaseStudyData = {
    meta: {
        title: "Enterprise Analytics Dashboard",
        date: "2025-07-22",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Big Data Problem",
            description: "Client needed to visualize millions of rows without loading spinners.",
            items: []
        },
        mission: {
            statement: "Deliver actionable insights through a responsive, real-time dashboard.",
            stats: [
                { label: "React", subLabel: "UI" },
                { label: "D3.js", subLabel: "Charts" },
                { label: "cube.js", subLabel: "Analytics" },
                { label: "AWS", subLabel: "Infra" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Frontend", value: "React + TanStack Query" },
            { label: "Visualization", value: "D3.js + Nivo" },
            { label: "Backend", value: "Node.js Microservices" }
        ],
        decisions: [
            { title: "Pre-aggregation", description: "Used Cube.js to pre-aggregate data for sub-second query responses." }
        ]
    },
    features: {
        items: [
            {
                title: "Interactive Reports",
                icon: "TrendingUp",
                points: [
                    { label: "Drill-down", text: "Users can click charts to filter global state" },
                    { label: "Export", text: "PDF and CSV generation worker" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Active development.",
        performance: [],
        security: [],
        features: []
    }
};

export const mobileAppCaseStudy: CaseStudyData = {
    meta: {
        title: "Fitness App UX Overhaul",
        date: "2025-06-15",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Churn Reduction",
            description: "Users were abandoning the app during onboarding.",
            items: []
        },
        mission: {
            statement: "Simplify the workout tracking flow to reduce friction and increase habit formation.",
            stats: [
                { label: "Figma", subLabel: "Prototyping" },
                { label: "Maze", subLabel: "Testing" },
                { label: "Lottie", subLabel: "Animation" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Design System", value: "Atomic Design" },
            { label: "Handoff", value: "Zeplin" }
        ],
        decisions: [
            { title: "Gamification", description: "Introduced streak counters and confetti animations to reward consistency." }
        ]
    },
    features: {
        items: [
            {
                title: "Workout Tracker",
                icon: "Layers",
                points: [
                    { label: "One-thumb use", text: "Controls placed within reach for gym us" },
                    { label: "Dark Mode", text: "Battery saving OLED black theme" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Released v2.0.",
        performance: [],
        security: [],
        features: []
    }
};

export const seoCaseStudy: CaseStudyData = {
    meta: {
        title: "Organic Traffic Turnaround",
        date: "2025-05-30",
        agency: "Redbrush Studio"
    },
    overview: {
        heritage: {
            title: "Invisible Brand",
            description: "Great product, zero organic visibility.",
            items: []
        },
        mission: {
            statement: "Dominate the 'luxury travel' keyword niche.",
            stats: [
                { label: "Semrush", subLabel: "Analysis" },
                { label: "Ahrefs", subLabel: "Backlinks" },
                { label: "GSC", subLabel: "Tracking" }
            ]
        }
    },
    architecture: {
        coreStack: [
            { label: "Audit", value: "Screaming Frog" },
            { label: "Content", value: "SurferSEO" }
        ],
        decisions: [
            { title: "Topic Clusters", description: "Built pillar pages linking to cluster content to boost authority." }
        ]
    },
    features: {
        items: [
            {
                title: "Technical SEO",
                icon: "Code",
                points: [
                    { label: "Core Web Vitals", text: "Optimized images and JS execution" },
                    { label: "Schema Markup", text: "Added JSON-LD for rich snippets" }
                ]
            }
        ]
    },
    roadmap: {
        status: "Ongoing retainer.",
        performance: [],
        security: [],
        features: []
    }
};
