
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
    }
};
