import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Film,
  Code,
  Layers,
  Rocket,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Executive Summary", icon: Film },
    { id: "architecture", label: "Architecture", icon: Layers },
    { id: "features", label: "Key Features", icon: Code },
    { id: "roadmap", label: "Future Vision", icon: Rocket },
    { id: "deployment", label: "Next Steps", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-8 overflow-hidden relative">
      {/* Film grain effect */}
      <div className="film-grain" />

      {/* Spotlight effect */}
      <div className="spotlight" />

      {/* Main content card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-6xl"
      >
        {/* Header */}
        <div className="glass-card border border-gold/20 rounded-t-2xl p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-2"
              >
                <Film className="w-8 h-8 text-gold" />
                <h1 className="text-gold uppercase tracking-wider">
                  Development Process Report
                </h1>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white mb-2"
              >
                Bambi Portfolio App
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-6 text-fog"
              >
                <span>Agency: Redbrush Studio</span>
                <span>Date: 2025-12-08</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-2"
            >
              <div className="stat-badge">
                <TrendingUp className="w-4 h-4" />
                <span>Production Ready</span>
              </div>
            </motion.div>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-2 mt-6 flex-wrap">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <div className="glass-card border-x border-b border-gold/20 rounded-b-2xl p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-gold mb-6">
                  Project Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="content-card">
                    <h4 className="text-white mb-3">
                      Heritage & Evolution
                    </h4>
                    <p className="text-fog mb-3">
                      Culmination of iterative development
                      across multiple repositories:
                    </p>
                    <ul className="space-y-2 text-fog">
                      <li className="flex items-start gap-2">
                        <span className="text-gold">•</span>
                        <span>
                          <strong>bambi-portfolio65:</strong>{" "}
                          Initial prototype and core identity
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">•</span>
                        <span>
                          <strong>bmbiprod:</strong> Production
                          refinement and deployment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">•</span>
                        <span>
                          <strong>Current:</strong> Unified,
                          high-performance codebase with
                          cinematic UI
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="content-card">
                    <h4 className="text-white mb-3">
                      Mission Statement
                    </h4>
                    <p className="text-fog mb-4">
                      A high-performance, visually immersive
                      Single Page Application designed to
                      showcase the work of videographer Aparicio
                      Bambi.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="stat-box">
                        <div className="text-gold mb-1">
                          React 19
                        </div>
                        <div className="text-fog">Frontend</div>
                      </div>
                      <div className="stat-box">
                        <div className="text-gold mb-1">
                          Firebase
                        </div>
                        <div className="text-fog">Backend</div>
                      </div>
                      <div className="stat-box">
                        <div className="text-gold mb-1">
                          Tailwind
                        </div>
                        <div className="text-fog">Styling</div>
                      </div>
                      <div className="stat-box">
                        <div className="text-gold mb-1">
                          Framer
                        </div>
                        <div className="text-fog">
                          Animation
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "architecture" && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-gold mb-6">
                  Technical Architecture
                </h3>
                <div className="space-y-4">
                  <div className="content-card">
                    <h4 className="text-white mb-3">
                      Core Stack
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-fog">
                      <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-white">
                            Frontend Framework
                          </div>
                          <div>
                            React 19 with Create React App
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-white">
                            Routing
                          </div>
                          <div>
                            React Router DOM v7 (Lazy loading)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-white">
                            Styling
                          </div>
                          <div>
                            Tailwind CSS + Custom variables
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-white">
                            Backend
                          </div>
                          <div>
                            Firebase Firestore (Real-time DB)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-card">
                    <h4 className="text-white mb-3">
                      Key Architectural Decisions
                    </h4>
                    <ul className="space-y-3 text-fog">
                      <li className="flex items-start gap-2">
                        <span className="text-gold">→</span>
                        <span>
                          <strong className="text-white">
                            Optimized Loading:
                          </strong>{" "}
                          React.lazy and Suspense for
                          code-splitting routes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">→</span>
                        <span>
                          <strong className="text-white">
                            Protected Routes:
                          </strong>{" "}
                          Secure admin panel with redirect logic
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">→</span>
                        <span>
                          <strong className="text-white">
                            Global Contexts:
                          </strong>{" "}
                          AuthProvider for session management
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">→</span>
                        <span>
                          <strong className="text-white">
                            PWA Ready:
                          </strong>{" "}
                          Mobile-first with native app
                          capabilities
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "features" && (
              <motion.div
                key="features"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-gold mb-6">
                  Key Features & Modules
                </h3>
                <div className="space-y-4">
                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Film className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Cinematic User Experience
                      </h4>
                    </div>
                    <ul className="space-y-2 text-fog ml-7">
                      <li>
                        <strong className="text-white">
                          Visual Language:
                        </strong>{" "}
                        Dark mode aesthetic with gold accents
                      </li>
                      <li>
                        <strong className="text-white">
                          Atmospheric Effects:
                        </strong>{" "}
                        Film grain, spotlight effects,
                        glassmorphism
                      </li>
                      <li>
                        <strong className="text-white">
                          Smooth Transitions:
                        </strong>{" "}
                        Custom PageWrapper with fade/slide
                        animations
                      </li>
                    </ul>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Admin Panel & Content Management
                      </h4>
                    </div>
                    <ul className="space-y-2 text-fog ml-7">
                      <li>
                        <strong className="text-white">
                          Dashboard:
                        </strong>{" "}
                        Real-time stats for Projects, Featured
                        Work, and Reviews
                      </li>
                      <li>
                        <strong className="text-white">
                          Dynamic Content:
                        </strong>{" "}
                        Create, edit, and delete portfolio
                        projects
                      </li>
                      <li>
                        <strong className="text-white">
                          Discover Module:
                        </strong>{" "}
                        Manage featured work items
                      </li>
                      <li>
                        <strong className="text-white">
                          Feedback System:
                        </strong>{" "}
                        Moderate and publish client reviews
                      </li>
                      <li>
                        <strong className="text-white">
                          Security:
                        </strong>{" "}
                        Protected by Firebase Authentication
                      </li>
                    </ul>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Mobile & Performance
                      </h4>
                    </div>
                    <ul className="space-y-2 text-fog ml-7">
                      <li>
                        <strong className="text-white">
                          Adaptive Navigation:
                        </strong>{" "}
                        Desktop header + mobile bottom bar
                      </li>
                      <li>
                        <strong className="text-white">
                          Skeleton Loading:
                        </strong>{" "}
                        Visual feedback during data fetching
                      </li>
                      <li>
                        <strong className="text-white">
                          PWA Features:
                        </strong>{" "}
                        Install app prompt for compatible
                        devices
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "roadmap" && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-gold mb-6">
                  Future Development Roadmap
                </h3>
                <div className="space-y-4">
                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Performance & Optimizations
                      </h4>
                    </div>
                    <ul className="space-y-2 text-fog ml-7">
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Image Optimization:
                          </strong>{" "}
                          Implement AVIF/WebP formats via build
                          pipeline
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Bundle Analysis:
                          </strong>{" "}
                          Further reduce initial load size
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Security Enhancements
                      </h4>
                    </div>
                    <ul className="space-y-2 text-fog ml-7">
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Firestore Rules:
                          </strong>{" "}
                          Tighten security rules with strict
                          validation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Environment Variables:
                          </strong>{" "}
                          Properly scope sensitive configuration
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Feature Roadmap
                      </h4>
                    </div>
                    <ul className="space-y-2 text-fog ml-7">
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Blog/News Section:
                          </strong>{" "}
                          CMS-lite for smaller updates
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Dark/Light Mode Toggle:
                          </strong>{" "}
                          High-contrast light mode for
                          accessibility
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">□</span>
                        <span>
                          <strong className="text-white">
                            Client Portal:
                          </strong>{" "}
                          Private albums and draft approval
                          system
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="content-card bg-gold/5 border border-gold/20">
                    <p className="text-fog">
                      <strong className="text-gold">
                        Current Status:
                      </strong>{" "}
                      Application is stable, production-ready,
                      and optimized with code splitting active.
                      Deployed on Render with full SPA support.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "deployment" && (
              <motion.div
                key="deployment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-gold mb-6">
                  Next Steps: Launching Your Custom Domain
                </h3>
                <div className="space-y-4">
                  <div className="content-card bg-gold/5 border border-gold/20">
                    <p className="text-fog">
                      <strong className="text-gold">
                        What{"'"}s Next:
                      </strong>{" "}
                      Your Bambi Portfolio app is fully built
                      and ready to go live! Now we just need to
                      connect it to your own custom domain name
                      using Cloudflare. This will give you a
                      professional web address like{" "}
                      <span className="text-white">
                        bambistudios.com
                      </span>{" "}
                      instead of the temporary Render URL.
                    </p>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Step 1: Purchase Your Domain
                      </h4>
                    </div>
                    <div className="space-y-3 text-fog ml-7">
                      <p>
                        First, you need to buy the domain name
                        you want for your portfolio:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">→</span>
                          <span>
                            Go to{" "}
                            <strong className="text-white">
                              Cloudflare Registrar
                            </strong>{" "}
                            (cloudflare.com/products/registrar)
                            or any registrar like Namecheap or
                            GoDaddy
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">→</span>
                          <span>
                            Search for your desired domain name
                            (see suggestions below)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">→</span>
                          <span>
                            <strong className="text-white">
                              Cost:
                            </strong>{" "}
                            Typically $10-15/year for .com
                            domains
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">→</span>
                          <span>
                            Complete the purchase and
                            registration
                          </span>
                        </li>
                      </ul>
                      <div className="bg-gold/10 border border-gold/20 rounded p-3 mt-3">
                        <div className="text-white mb-2">
                          💡 Domain Name Suggestions:
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-gold">
                            • bambistudios.com
                          </div>
                          <div className="text-gold">
                            • apariciobambi.com
                          </div>
                          <div className="text-gold">
                            • bambimotion.tv
                          </div>
                          <div className="text-gold">
                            • bambiproductions.com
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Step 2: Add Your Domain to Cloudflare
                      </h4>
                    </div>
                    <div className="space-y-3 text-fog ml-7">
                      <p>
                        If you bought your domain elsewhere (not
                        from Cloudflare), you{"'"}ll need to add
                        it to Cloudflare:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">1.</span>
                          <span>
                            Log into your{" "}
                            <strong className="text-white">
                              Cloudflare dashboard
                            </strong>{" "}
                            (dash.cloudflare.com)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">2.</span>
                          <span>
                            Click{" "}
                            <strong className="text-white">
                              &quot;Add a Site&quot;
                            </strong>{" "}
                            in the top right
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">3.</span>
                          <span>
                            Enter your domain name and click{" "}
                            <strong className="text-white">
                              &quot;Add Site&quot;
                            </strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">4.</span>
                          <span>
                            Select the{" "}
                            <strong className="text-white">
                              Free plan
                            </strong>{" "}
                            (it{"'"}s perfect for your needs)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">5.</span>
                          <span>
                            Cloudflare will scan your existing
                            DNS records
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">6.</span>
                          <span>
                            <strong className="text-white">
                              Important:
                            </strong>{" "}
                            Copy the two Cloudflare nameservers
                            they show you (e.g.,
                            jim.ns.cloudflare.com)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">7.</span>
                          <span>
                            Go back to your domain registrar
                            (Namecheap, GoDaddy, etc.) and
                            update the nameservers to the
                            Cloudflare ones
                          </span>
                        </li>
                      </ul>
                      <div className="bg-black/40 border border-gold/20 rounded p-3 mt-3">
                        <div className="text-white mb-1">
                          ⏱️ Wait Time:
                        </div>
                        <div className="text-sm">
                          Nameserver changes can take 2-24 hours
                          to complete. You{"'"}ll get an email
                          when it{"'"}s done.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Step 3: Configure DNS Records in
                        Cloudflare
                      </h4>
                    </div>
                    <div className="space-y-3 ml-7">
                      <p className="text-fog">
                        Once your domain is active in
                        Cloudflare, you need to point it to your
                        Render app:
                      </p>
                      <ul className="space-y-2 text-fog">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">1.</span>
                          <span>
                            In your Cloudflare dashboard, click
                            on your domain
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">2.</span>
                          <span>
                            Go to{" "}
                            <strong className="text-white">
                              DNS → Records
                            </strong>{" "}
                            in the left menu
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">3.</span>
                          <span>
                            Click{" "}
                            <strong className="text-white">
                              &quot;Add Record&quot;
                            </strong>{" "}
                            and create these two records:
                          </span>
                        </li>
                      </ul>

                      <div className="bg-black/40 border border-gold/20 rounded p-4 mt-3">
                        <div className="text-white mb-3">
                          📝 Record #1 - Root Domain (@ or your
                          domain)
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Type:
                            </div>
                            <div className="col-span-2 text-gold">
                              CNAME
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Name:
                            </div>
                            <div className="col-span-2 text-gold">
                              @
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Target:
                            </div>
                            <div className="col-span-2 text-gold">
                              https://bmbiprod.onrender.com/
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Proxy status:
                            </div>
                            <div className="col-span-2 text-gold">
                              Proxied (orange cloud ON)
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">TTL:</div>
                            <div className="col-span-2 text-gold">
                              Auto
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-gold/20 rounded p-4">
                        <div className="text-white mb-3">
                          📝 Record #2 - WWW Subdomain
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Type:
                            </div>
                            <div className="col-span-2 text-gold">
                              CNAME
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Name:
                            </div>
                            <div className="col-span-2 text-gold">
                              www
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Target:
                            </div>
                            <div className="col-span-2 text-gold">
                              your-app-name.onrender.com
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">
                              Proxy status:
                            </div>
                            <div className="col-span-2 text-gold">
                              Proxied (orange cloud ON)
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-fog">TTL:</div>
                            <div className="col-span-2 text-gold">
                              Auto
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gold/10 border border-gold/20 rounded p-3 mt-3">
                        <div className="text-white mb-1">
                          ⚠️ Replace &quot;your-app-name&quot;:
                        </div>
                        <div className="text-sm text-fog">
                          Change{" "}
                          <span className="text-gold">
                            your-app-name.onrender.com
                          </span>{" "}
                          to your actual Render URL
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Rocket className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Step 4: Connect Domain in Render
                      </h4>
                    </div>
                    <div className="space-y-3 text-fog ml-7">
                      <p>
                        Now tell Render about your custom
                        domain:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">1.</span>
                          <span>
                            Log into your{" "}
                            <strong className="text-white">
                              Render dashboard
                            </strong>{" "}
                            (dashboard.render.com)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">2.</span>
                          <span>
                            Click on your{" "}
                            <strong className="text-white">
                              Bambi Portfolio
                            </strong>{" "}
                            web service
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">3.</span>
                          <span>
                            Go to{" "}
                            <strong className="text-white">
                              Settings
                            </strong>{" "}
                            (in the left menu)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">4.</span>
                          <span>
                            Scroll down to{" "}
                            <strong className="text-white">
                              &quot;Custom Domain&quot;
                            </strong>{" "}
                            section
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">5.</span>
                          <span>
                            Click{" "}
                            <strong className="text-white">
                              &quot;Add Custom Domain&quot;
                            </strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">6.</span>
                          <span>
                            Enter your domain{" "}
                            <span className="text-gold">
                              (e.g., bambimotion.tv, or
                              bambivisuals.com, bv.tv, bv.com,
                              bv.me)
                            </span>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">7.</span>
                          <span>
                            Repeat to add the www version{" "}
                            <span className="text-gold">
                              (e.g., www.bambistudios.com,
                              www.bambimotion.tv, ...)
                            </span>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">8.</span>
                          <span>
                            <strong className="text-white">
                              SSL:
                            </strong>{" "}
                            Render will automatically set up
                            free SSL certificates (this can take
                            15-30 minutes)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Step 5: Update Firebase Settings
                      </h4>
                    </div>
                    <div className="space-y-3 text-fog ml-7">
                      <p>
                        Don{"'"}t forget to update Firebase with
                        your new domain:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">1.</span>
                          <span>
                            Go to your{" "}
                            <strong className="text-white">
                              Firebase Console
                            </strong>{" "}
                            (console.firebase.google.com)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">2.</span>
                          <span>
                            Select your Bambi Portfolio project
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">3.</span>
                          <span>
                            Go to{" "}
                            <strong className="text-white">
                              Authentication → Settings →
                              Authorized Domains
                            </strong>
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">4.</span>
                          <span>
                            Click{" "}
                            <strong className="text-white">
                              &quot;Add domain&quot;
                            </strong>{" "}
                            and add your custom domain
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">5.</span>
                          <span>
                            This allows your admin login to work
                            on the new domain
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="content-card">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-gold" />
                      <h4 className="text-white">
                        Step 6: Test Everything
                      </h4>
                    </div>
                    <div className="space-y-3 text-fog ml-7">
                      <p>
                        After setup is complete (can take up to
                        24 hours), verify everything works:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-gold">□</span>
                          <span>
                            Visit your domain in a browser
                            (e.g., bambistudios.com)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">□</span>
                          <span>
                            Check that www version also works
                            (e.g., www.bambistudios.com)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">□</span>
                          <span>
                            Verify the padlock icon shows in
                            your browser (HTTPS is working)
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">□</span>
                          <span>
                            Test the admin login at
                            yoursite.com/admin
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-gold">□</span>
                          <span>
                            Check the site on mobile devices
                          </span>
                        </li>
                      </ul>
                      <div className="bg-black/40 border border-gold/20 rounded p-3 mt-3">
                        <div className="text-white mb-1">
                          🔧 Having issues?
                        </div>
                        <div className="text-sm">
                          Use{" "}
                          <span className="text-gold">
                            dnschecker.org
                          </span>{" "}
                          to verify your DNS records have
                          propagated worldwide.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-card bg-gold/5 border border-gold/20">
                    <h4 className="text-white mb-3">
                      ✨ Benefits of Using Cloudflare:
                    </h4>
                    <ul className="space-y-2 text-fog">
                      <li className="flex items-start gap-2">
                        <span className="text-gold">✓</span>
                        <span>
                          <strong className="text-white">
                            Free SSL:
                          </strong>{" "}
                          Automatic HTTPS encryption
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">✓</span>
                        <span>
                          <strong className="text-white">
                            DDoS Protection:
                          </strong>{" "}
                          Protection against attacks
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">✓</span>
                        <span>
                          <strong className="text-white">
                            CDN:
                          </strong>{" "}
                          Faster loading times worldwide
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-gold">✓</span>
                        <span>
                          <strong className="text-white">
                            Analytics:
                          </strong>{" "}
                          Basic traffic insights
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-fog"
        >
          <div className="text-gold mb-2">
            Redbrush Studio Agency
          </div>
          <div>Building Immersive Digital Experiences</div>
        </motion.div>
      </motion.div>
    </div>
  );
}