"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Film,
    Code,
    Layers,
    Zap,
    Database,
    Server,
    Smartphone,
    CheckCircle,
    Layout,
    Lock,
    Rocket,
    Shield,
    TrendingUp,
    Globe,
    LucideIcon,
} from "lucide-react";

export interface CaseStudyData {
    overview: {
        heritage: {
            title: string;
            description: string;
            items: { label?: string; text: string }[];
        };
        mission: {
            statement: string;
            stats: { label: string; subLabel: string }[];
        };
    };
    architecture: {
        coreStack: { label: string; value: string }[];
        decisions: { title: string; description: string }[];
    };
    features: {
        items: { title: string; icon: string; points: { label?: string; text: string }[] }[];
    };
    roadmap: {
        performance: { title: string; description: string }[];
        security: { title: string; description: string }[];
        features: { title: string; description: string }[];
        status: string;
    };
    deployment?: {
        steps: { title: string; description: string; points?: { label?: string; text: string }[]; notes?: { title: string; text: string }[] }[];
    };
    visuals?: {
        title: string;
        items: { type: 'image' | 'video'; url: string; caption: string }[];
    };
    meta: {
        title: string;
        date: string;
        agency: string;
    };
}

const icons: Record<string, LucideIcon> = {
    Film,
    Code,
    Layers,
    Rocket,
    Shield,
    TrendingUp,
    Globe,
    Zap,
    Database,
    Server,
    Smartphone,
    CheckCircle,
    Layout,
    Lock,
};

export default function FigmaCaseStudy({ data }: { data: CaseStudyData }) {
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Executive Summary", icon: Film },
        { id: "architecture", label: "Architecture", icon: Layers },
        { id: "features", label: "Key Features", icon: Code },
        { id: "roadmap", label: "Future Vision", icon: Rocket },
        ...(data.deployment ? [{ id: "deployment", label: "Next Steps", icon: Globe }] : []),
        ...(data.visuals ? [{ id: "visuals", label: "Gallery", icon: Film }] : []),
    ];

    return (
        <div className="w-full bg-black text-white p-4 sm:p-8 overflow-hidden relative rounded-xl my-8 min-h-[600px] flex items-center justify-center">
            {/* Film grain effect */}
            <div className="film-grain absolute inset-0 w-full h-full" />

            {/* Spotlight effect */}
            <div className="spotlight absolute inset-0 w-full h-full" />

            {/* Main content card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-6xl"
            >
                {/* Header */}
                <div className="glass-card border border-gold/20 rounded-t-2xl p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-4">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-2"
                            >
                                <Film className="w-8 h-8 text-gold" />
                                <h1 className="text-gold uppercase tracking-wider text-lg font-bold">
                                    Development Process Report
                                </h1>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white text-3xl font-bold mb-2"
                            >
                                {data.meta.title}
                            </motion.h2>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-4 sm:gap-6 text-fog text-sm"
                            >
                                <span>Agency: {data.meta.agency}</span>
                                <span>Date: {data.meta.date}</span>
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
                <div className="glass-card border-x border-b border-gold/20 rounded-b-2xl p-6 sm:p-8 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === "overview" && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-gold text-2xl font-bold mb-6">
                                    Project Overview
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="content-card">
                                        <h4 className="text-white font-bold mb-3">
                                            {data.overview.heritage.title}
                                        </h4>
                                        <p className="text-fog mb-3 text-sm leading-relaxed">
                                            {data.overview.heritage.description}
                                        </p>
                                        <ul className="space-y-2 text-fog text-sm">
                                            {data.overview.heritage.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-gold">•</span>
                                                    <span>
                                                        {item.label && <strong>{item.label}:</strong>} {item.text}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="content-card">
                                        <h4 className="text-white font-bold mb-3">
                                            Mission Statement
                                        </h4>
                                        <p className="text-fog mb-4 text-sm leading-relaxed">
                                            {data.overview.mission.statement}
                                        </p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {data.overview.mission.stats.map((stat, i) => (
                                                <div key={i} className="stat-box">
                                                    <div className="text-gold mb-1 font-bold">
                                                        {stat.label}
                                                    </div>
                                                    <div className="text-fog text-xs">{stat.subLabel}</div>
                                                </div>
                                            ))}
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
                                <h3 className="text-gold text-2xl font-bold mb-6">
                                    Technical Architecture
                                </h3>
                                <div className="space-y-4">
                                    <div className="content-card">
                                        <h4 className="text-white font-bold mb-3">
                                            Core Stack
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-fog text-sm">
                                            {data.architecture.coreStack.map((stack, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <Code className="w-5 h-5 text-gold flex-shrink-0 mt-1" />
                                                    <div>
                                                        <div className="text-white font-semibold">
                                                            {stack.label}
                                                        </div>
                                                        <div>
                                                            {stack.value}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="content-card">
                                        <h4 className="text-white font-bold mb-3">
                                            Key Architectural Decisions
                                        </h4>
                                        <ul className="space-y-3 text-fog text-sm">
                                            {data.architecture.decisions.map((decision, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-gold">→</span>
                                                    <span>
                                                        <strong className="text-white">
                                                            {decision.title}:
                                                        </strong>{" "}
                                                        {decision.description}
                                                    </span>
                                                </li>
                                            ))}
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
                                <h3 className="text-gold text-2xl font-bold mb-6">
                                    Key Features & Modules
                                </h3>
                                <div className="space-y-4">
                                    {data.features.items.map((feature, i) => {
                                        const FeatureIcon = icons[feature.icon] || Code;
                                        return (
                                            <div key={i} className="content-card">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <FeatureIcon className="w-5 h-5 text-gold" />
                                                    <h4 className="text-white font-bold">
                                                        {feature.title}
                                                    </h4>
                                                </div>
                                                <ul className="space-y-2 text-fog ml-7 text-sm">
                                                    {feature.points.map((point, j) => (
                                                        <li key={j}>
                                                            {point.label && <strong className="text-white">{point.label}:</strong>}{" "}
                                                            {point.text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    })}
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
                                <h3 className="text-gold text-2xl font-bold mb-6">
                                    Future Development Roadmap
                                </h3>
                                <div className="space-y-4">
                                    <div className="content-card">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Rocket className="w-5 h-5 text-gold" />
                                            <h4 className="text-white font-bold">
                                                Performance & Optimizations
                                            </h4>
                                        </div>
                                        <ul className="space-y-2 text-fog ml-7 text-sm">
                                            {data.roadmap.performance.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-gold">□</span>
                                                    <span>
                                                        <strong className="text-white">{item.title}:</strong>{" "}
                                                        {item.description}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="content-card">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Shield className="w-5 h-5 text-gold" />
                                            <h4 className="text-white font-bold">
                                                Security Enhancements
                                            </h4>
                                        </div>
                                        <ul className="space-y-2 text-fog ml-7 text-sm">
                                            {data.roadmap.security.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-gold">□</span>
                                                    <span>
                                                        <strong className="text-white">{item.title}:</strong>{" "}
                                                        {item.description}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="content-card">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Code className="w-5 h-5 text-gold" />
                                            <h4 className="text-white font-bold">
                                                Feature Roadmap
                                            </h4>
                                        </div>
                                        <ul className="space-y-2 text-fog ml-7 text-sm">
                                            {data.roadmap.features.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="text-gold">□</span>
                                                    <span>
                                                        <strong className="text-white">{item.title}:</strong>{" "}
                                                        {item.description}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="content-card bg-gold/5 border border-gold/20">
                                        <p className="text-fog text-sm">
                                            <strong className="text-gold">
                                                Current Status:
                                            </strong>{" "}
                                            {data.roadmap.status}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "deployment" && data.deployment && (
                            <motion.div
                                key="deployment"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-gold text-2xl font-bold mb-6">
                                    Next Steps: Launching Your Custom Domain
                                </h3>
                                <div className="space-y-4">
                                    {data.deployment.steps.map((step, i) => (
                                        <div key={i} className="content-card">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Shield className="w-5 h-5 text-gold" />
                                                <h4 className="text-white font-bold">
                                                    {step.title}
                                                </h4>
                                            </div>
                                            <div className="space-y-3 text-fog ml-7 text-sm">
                                                <p>{step.description}</p>
                                                {step.points && (
                                                    <ul className="space-y-2">
                                                        {step.points.map((point, j) => (
                                                            <li key={j} className="flex items-start gap-2">
                                                                <span className="text-gold">→</span>
                                                                <span>
                                                                    {point.label && <strong>{point.label}</strong>} {point.text}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {step.notes && step.notes.map((note, k) => (
                                                    <div key={k} className="bg-black/40 border border-gold/20 rounded p-3 mt-3">
                                                        <div className="text-white mb-1">
                                                            {note.title}
                                                        </div>
                                                        <div className="text-sm">
                                                            {note.text}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "visuals" && data.visuals && (
                            <motion.div
                                key="visuals"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-gold text-2xl font-bold mb-6">
                                    {data.visuals.title}
                                </h3>
                                <div className="grid grid-cols-1 gap-8">
                                    {data.visuals.items.map((item, i) => (
                                        <div key={i} className="glass-card border border-gold/10 overflow-hidden rounded-lg">
                                            {item.type === 'image' ? (
                                                <img
                                                    src={item.url}
                                                    alt={item.caption}
                                                    className="w-full h-auto object-cover"
                                                />
                                            ) : (
                                                <video
                                                    src={item.url}
                                                    controls
                                                    className="w-full h-auto"
                                                />
                                            )}
                                            <div className="p-4 bg-black/60 border-t border-gold/10">
                                                <p className="text-fog text-sm text-center italic">
                                                    {item.caption}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
