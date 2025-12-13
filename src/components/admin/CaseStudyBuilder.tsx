"use client";

import { useState } from "react";
import { CaseStudyData } from "@/components/FigmaCaseStudy";
import {
    LayoutDashboard,
    Layers,
    Box,
    Map as MapIcon,
    Settings,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    CheckSquare,
    Square,
    Globe,
    UserRoundCog,
    PersonStanding,
    FerrisWheel
    Radar,
    Map,
    ShipWheel,
    Route,
    Snail,
    Linkedin,
    Brush,
    TabletSmartphone,
    Zap,
    Hop,
    TreePalm,
    Box, Boxes,
    Wind,


} from "lucide-react";

interface CaseStudyBuilderProps {
    data: CaseStudyData | null;
    onChange: (data: CaseStudyData) => void;
}

const Input = ({ label, value, onChange, placeholder = "" }: { label: string, value: any, onChange: (val: string) => void, placeholder?: string }) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-amber-700 uppercase">{label}</label>
        <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm focus:border-amber-600 focus:outline-none"
            placeholder={placeholder}
        />
    </div>
);

const TextArea = ({ label, value, onChange, rows = 3 }: { label: string, value: any, onChange: (val: string) => void, rows?: number }) => (
    <div className="space-y-1">
        <label className="text-xs font-bold text-amber-700 uppercase">{label}</label>
        <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm focus:border-amber-600 focus:outline-none"
        />
    </div>
);

export default function CaseStudyBuilder({ data, onChange }: CaseStudyBuilderProps) {
    const [activeTab, setActiveTab] = useState("meta");

    // Helper to ensure data structure exists
    const ensureData = (): CaseStudyData => {
        return data || {
            meta: { title: "", date: "", agency: "" },
            header: { reportTitle: "", statusBadge: "" },
            overview: { heritage: { title: "", description: "", items: [] }, mission: { statement: "", stats: [] } },
            architecture: { coreStack: [], decisions: [] },
            features: { items: [] },
            roadmap: {
                performance: [],
                security: [],
                features: [],
                ux: [],
                seo: [],
                other: [],
                status: ""
            }
        };
    };

    const currentData = ensureData();

    // Generic update helper
    const update = (path: string[], value: any) => {
        const newData = JSON.parse(JSON.stringify(currentData));
        let ref = newData;
        for (let i = 0; i < path.length - 1; i++) {
            if (!ref[path[i]]) ref[path[i]] = {};
            ref = ref[path[i]];
        }
        ref[path[path.length - 1]] = value;
        onChange(newData);
    };

    const tabs = [
        { id: "meta", label: "Meta & Header", icon: Settings },
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "architecture", label: "Architecture", icon: Layers },
        { id: "features", label: "Features", icon: Box },
        { id: "roadmap", label: "Roadmap", icon: MapIcon },
        { id: "deployment", label: "Next Steps", icon: Globe },
    ];

    return (
        <div className="border border-amber-900/30 rounded-lg overflow-hidden bg-black/20">
            {/* Tabs */}
            <div className="flex border-b border-amber-900/30 bg-[#1a1515]">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? "bg-amber-900/20 text-amber-500 border-b-2 border-amber-500"
                                : "text-gray-400 hover:text-amber-200 hover:bg-amber-900/10"
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <div className="p-6">
                {activeTab === "meta" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="Report Title" value={currentData.header?.reportTitle} onChange={(val) => update(['header', 'reportTitle'], val)} placeholder="Development Process Report" />
                            <Input label="Status Badge" value={currentData.header?.statusBadge} onChange={(val) => update(['header', 'statusBadge'], val)} placeholder="Production Ready" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Case Study Title" value={currentData.meta?.title} onChange={(val) => update(['meta', 'title'], val)} />
                            <Input label="Agency" value={currentData.meta?.agency} onChange={(val) => update(['meta', 'agency'], val)} />
                            <Input label="Date" value={currentData.meta?.date} onChange={(val) => update(['meta', 'date'], val)} />
                        </div>
                    </div>
                )}

                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Heritage */}
                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Heritage</h4>
                            <Input label="Title" value={currentData.overview?.heritage?.title} onChange={(val) => update(['overview', 'heritage', 'title'], val)} />
                            <TextArea label="Description" value={currentData.overview?.heritage?.description} onChange={(val) => update(['overview', 'heritage', 'description'], val)} />
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-amber-700 uppercase">Key Stats/Items</label>
                                {currentData.overview?.heritage?.items?.map((item, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            placeholder="Label"
                                            value={item.label}
                                            onChange={(e) => {
                                                const newItems = [...(currentData.overview.heritage.items || [])];
                                                newItems[idx] = { ...newItems[idx], label: e.target.value };
                                                update(['overview', 'heritage', 'items'], newItems);
                                            }}
                                            className="w-1/3 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                        />
                                        <input
                                            placeholder="Value"
                                            value={item.text}
                                            onChange={(e) => {
                                                const newItems = [...(currentData.overview.heritage.items || [])];
                                                newItems[idx] = { ...newItems[idx], text: e.target.value };
                                                update(['overview', 'heritage', 'items'], newItems);
                                            }}
                                            className="flex-1 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newItems = currentData.overview.heritage.items.filter((_, i) => i !== idx);
                                                update(['overview', 'heritage', 'items'], newItems);
                                            }}
                                            className="text-red-500 hover:text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newItems = [...(currentData.overview.heritage.items || []), { text: "" }];
                                        update(['overview', 'heritage', 'items'], newItems);
                                    }}
                                    className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500"
                                >
                                    <Plus className="w-3 h-3" /> Add Item
                                </button>
                            </div>
                        </div>

                        {/* Mission */}
                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Mission</h4>
                            <TextArea label="Statement" value={currentData.overview?.mission?.statement} onChange={(val) => update(['overview', 'mission', 'statement'], val)} />
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-amber-700 uppercase">Mission Stats</label>
                                {currentData.overview?.mission?.stats?.map((stat, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            placeholder="Stat (e.g. 100%)"
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...(currentData.overview.mission.stats || [])];
                                                newStats[idx] = { ...newStats[idx], label: e.target.value };
                                                update(['overview', 'mission', 'stats'], newStats);
                                            }}
                                            className="w-1/3 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                        />
                                        <input
                                            placeholder="Sub-label (e.g. Uptime)"
                                            value={stat.subLabel}
                                            onChange={(e) => {
                                                const newStats = [...(currentData.overview.mission.stats || [])];
                                                newStats[idx] = { ...newStats[idx], subLabel: e.target.value };
                                                update(['overview', 'mission', 'stats'], newStats);
                                            }}
                                            className="flex-1 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newStats = currentData.overview.mission.stats.filter((_, i) => i !== idx);
                                                update(['overview', 'mission', 'stats'], newStats);
                                            }}
                                            className="text-red-500 hover:text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newStats = [...(currentData.overview.mission.stats || []), { label: "", subLabel: "" }];
                                        update(['overview', 'mission', 'stats'], newStats);
                                    }}
                                    className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500"
                                >
                                    <Plus className="w-3 h-3" /> Add Stat
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other tabs can be implemented similarly, keeping it truncated for brevity if needed or continuing pattern */}
                {activeTab === "architecture" && (
                    <div className="space-y-8">
                        {/* Core Stack */}
                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Core Stack</h4>
                            {currentData.architecture?.coreStack?.map((stack, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        placeholder="Label (e.g. Frontend)"
                                        value={stack.label}
                                        onChange={(e) => {
                                            const newStack = [...(currentData.architecture.coreStack || [])];
                                            newStack[idx] = { ...newStack[idx], label: e.target.value };
                                            update(['architecture', 'coreStack'], newStack);
                                        }}
                                        className="w-1/3 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                    />
                                    <input
                                        placeholder="Value (e.g. React, Next.js)"
                                        value={stack.value}
                                        onChange={(e) => {
                                            const newStack = [...(currentData.architecture.coreStack || [])];
                                            newStack[idx] = { ...newStack[idx], value: e.target.value };
                                            update(['architecture', 'coreStack'], newStack);
                                        }}
                                        className="flex-1 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newStack = currentData.architecture.coreStack.filter((_, i) => i !== idx);
                                            update(['architecture', 'coreStack'], newStack);
                                        }}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newStack = [...(currentData.architecture.coreStack || []), { label: "", value: "" }];
                                    update(['architecture', 'coreStack'], newStack);
                                }}
                                className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500"
                            >
                                <Plus className="w-3 h-3" /> Add Stack Item
                            </button>
                        </div>

                        {/* Decisions */}
                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Decisions</h4>
                            {currentData.architecture?.decisions?.map((decision, idx) => (
                                <div key={idx} className="space-y-2 border border-amber-900/20 p-3 rounded bg-black/20">
                                    <div className="flex justify-between items-start">
                                        <input
                                            placeholder="Decision Title"
                                            value={decision.title}
                                            onChange={(e) => {
                                                const newDocs = [...(currentData.architecture.decisions || [])];
                                                newDocs[idx] = { ...newDocs[idx], title: e.target.value };
                                                update(['architecture', 'decisions'], newDocs);
                                            }}
                                            className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm mb-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newDocs = currentData.architecture.decisions.filter((_, i) => i !== idx);
                                                update(['architecture', 'decisions'], newDocs);
                                            }}
                                            className="text-red-500 hover:text-red-400 ml-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <textarea
                                        placeholder="Description"
                                        value={decision.description}
                                        onChange={(e) => {
                                            const newDocs = [...(currentData.architecture.decisions || [])];
                                            newDocs[idx] = { ...newDocs[idx], description: e.target.value };
                                            update(['architecture', 'decisions'], newDocs);
                                        }}
                                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                        rows={2}
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newDocs = [...(currentData.architecture.decisions || []), { title: "", description: "" }];
                                    update(['architecture', 'decisions'], newDocs);
                                }}
                                className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-500"
                            >
                                <Plus className="w-3 h-3" /> Add Decision
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "features" && (
                    <div className="space-y-4">
                        {currentData.features?.items?.map((feature, idx) => (
                            <div key={idx} className="border border-amber-900/20 p-4 rounded bg-black/20 space-y-3">
                                <div className="flex justify-between">
                                    <h5 className="text-amber-300 font-bold text-sm">Feature #{idx + 1}</h5>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newItems = currentData.features.items.filter((_, i) => i !== idx);
                                            update(['features', 'items'], newItems);
                                        }}
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        placeholder="Feature Title"
                                        value={feature.title}
                                        onChange={(e) => {
                                            const newItems = [...(currentData.features.items || [])];
                                            newItems[idx] = { ...newItems[idx], title: e.target.value };
                                            update(['features', 'items'], newItems);
                                        }}
                                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                    />
                                    <input
                                        placeholder="Icon Name (e.g. Zap)"
                                        value={feature.icon}
                                        onChange={(e) => {
                                            const newItems = [...(currentData.features.items || [])];
                                            newItems[idx] = { ...newItems[idx], icon: e.target.value };
                                            update(['features', 'items'], newItems);
                                        }}
                                        className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                    />
                                </div>
                                {/* Feature Points */}
                                <div className="space-y-2 pl-4 border-l border-amber-900/20">
                                    {feature.points?.map((point, pIdx) => (
                                        <div key={pIdx} className="flex gap-2">
                                            <input
                                                placeholder="Label (opt)"
                                                value={point.label}
                                                onChange={(e) => {
                                                    const newItems = [...(currentData.features.items || [])];
                                                    const newPoints = [...(newItems[idx].points || [])];
                                                    newPoints[pIdx] = { ...newPoints[pIdx], label: e.target.value };
                                                    newItems[idx].points = newPoints;
                                                    update(['features', 'items'], newItems);
                                                }}
                                                className="w-1/4 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-xs"
                                            />
                                            <input
                                                placeholder="Point Text"
                                                value={point.text}
                                                onChange={(e) => {
                                                    const newItems = [...(currentData.features.items || [])];
                                                    const newPoints = [...(newItems[idx].points || [])];
                                                    newPoints[pIdx] = { ...newPoints[pIdx], text: e.target.value };
                                                    newItems[idx].points = newPoints;
                                                    update(['features', 'items'], newItems);
                                                }}
                                                className="flex-1 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-xs"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newItems = [...currentData.features.items];
                                                    const newPoints = newItems[idx].points.filter((_, i) => i !== pIdx);
                                                    newItems[idx].points = newPoints;
                                                    update(['features', 'items'], newItems);
                                                }}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newItems = [...currentData.features.items];
                                            if (!newItems[idx].points) newItems[idx].points = [];
                                            newItems[idx].points.push({ text: "" });
                                            update(['features', 'items'], newItems);
                                        }}
                                        className="text-xs text-amber-600 hover:text-amber-500"
                                    >
                                        + Add Point
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => {
                                const newItems = [...(currentData.features.items || []), { title: "", icon: "Code", points: [] }];
                                update(['features', 'items'], newItems);
                            }}
                            className="bg-amber-900/20 text-amber-500 px-4 py-2 rounded text-sm w-full border border-amber-900/30 hover:bg-amber-900/30"
                        >
                            + Add Feature Module
                        </button>
                    </div>
                )}

                {activeTab === "roadmap" && (
                    <div className="space-y-6">
                        <Input label="Current Status" value={currentData.roadmap?.status} onChange={(val) => update(['roadmap', 'status'], val)} placeholder="Active Development" />

                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Modules Configuration</h4>

                            {/* Roadmap Sections Loop */}
                            {[
                                { key: 'performance', label: 'Performance' },
                                { key: 'security', label: 'Security' },
                                { key: 'features', label: 'Features' },
                                { key: 'ux', label: 'UX/UI' },
                                { key: 'seo', label: 'SEO' },
                                { key: 'other', label: 'Other' },
                            ].map((section) => {
                                const sectionKey = section.key as keyof typeof currentData.roadmap;
                                const isActive = Array.isArray(currentData.roadmap?.[sectionKey]);
                                const items = (currentData.roadmap?.[sectionKey] as any[]) || [];

                                // Local state for collapse (using a simplistic approach since we can't easily add state hooks inside map here without refactor, 
                                // but we can use details/summary element for native behavior or just always show if active)
                                // Standard details/summary is reliable.

                                return (
                                    <div key={section.key} className={`border ${isActive ? 'border-amber-900/40 bg-black/40' : 'border-dashed border-gray-800 opacity-60'} rounded-lg overflow-hidden transition-all`}>
                                        <div className="flex items-center justify-between p-3 bg-[#151212]">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (isActive) {
                                                            // Optional: Confirm delete? For now just direct update.
                                                            update(['roadmap', section.key], undefined); // or [] if we want to keep it but empty
                                                        } else {
                                                            update(['roadmap', section.key], []);
                                                        }
                                                    }}
                                                    className={`transition-colors ${isActive ? "text-amber-500" : "text-gray-600 hover:text-gray-400"}`}
                                                >
                                                    {isActive ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                                </button>
                                                <span className={`font-bold ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>{section.label}</span>
                                            </div>
                                            {isActive && (
                                                <span className="text-xs text-gray-500">{items.length} items</span>
                                            )}
                                        </div>

                                        {isActive && (
                                            <div className="p-4 border-t border-amber-900/20 space-y-3">
                                                {items.map((item, idx) => (
                                                    <div key={idx} className="flex gap-2 items-start group">
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex gap-2">
                                                                <input
                                                                    placeholder="Title"
                                                                    value={item.title}
                                                                    onChange={(e) => {
                                                                        const newSection = [...items];
                                                                        newSection[idx] = { ...newSection[idx], title: e.target.value };
                                                                        update(['roadmap', section.key], newSection);
                                                                    }}
                                                                    className="w-1/3 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm focus:border-amber-600 focus:outline-none"
                                                                />
                                                                <input
                                                                    placeholder="Description"
                                                                    value={item.description}
                                                                    onChange={(e) => {
                                                                        const newSection = [...items];
                                                                        newSection[idx] = { ...newSection[idx], description: e.target.value };
                                                                        update(['roadmap', section.key], newSection);
                                                                    }}
                                                                    className="flex-1 bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm focus:border-amber-600 focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newSection = items.filter((_, i) => i !== idx);
                                                                update(['roadmap', section.key], newSection);
                                                            }}
                                                            className="text-gray-600 hover:text-red-500 p-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newItems = [...items, { title: "", description: "" }];
                                                        update(['roadmap', section.key], newItems);
                                                    }}
                                                    className="w-full py-2 border border-dashed border-amber-900/30 text-amber-700 hover:text-amber-500 hover:border-amber-600/50 rounded text-xs flex items-center justify-center gap-2 transition-all"
                                                >
                                                    <Plus className="w-3 h-3" /> Add Item
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                {activeTab === "deployment" && (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Deployment Steps</h4>
                            {(currentData.deployment?.steps || []).map((step, idx) => (
                                <div key={idx} className="border border-amber-900/20 p-4 rounded bg-black/20 space-y-3">
                                    <div className="flex justify-between">
                                        <h5 className="text-amber-300 font-bold text-sm">Step #{idx + 1}</h5>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSteps = (currentData.deployment?.steps || []).filter((_, i) => i !== idx);
                                                update(['deployment', 'steps'], newSteps);
                                            }}
                                            className="text-red-500 hover:text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        <Input
                                            label="Title"
                                            value={step.title}
                                            onChange={(val) => {
                                                const newSteps = [...(currentData.deployment?.steps || [])];
                                                newSteps[idx] = { ...newSteps[idx], title: val };
                                                update(['deployment', 'steps'], newSteps);
                                            }}
                                        />
                                        <TextArea
                                            label="Description"
                                            value={step.description}
                                            onChange={(val) => {
                                                const newSteps = [...(currentData.deployment?.steps || [])];
                                                newSteps[idx] = { ...newSteps[idx], description: val };
                                                update(['deployment', 'steps'], newSteps);
                                            }}
                                        />

                                        {/* Notes Section */}
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-amber-700 uppercase">Notes / Warnings</label>
                                            {(step.notes || []).map((note, nIdx) => (
                                                <div key={nIdx} className="flex gap-2 items-start bg-black/40 p-2 rounded">
                                                    <div className="flex-1 space-y-1">
                                                        <input
                                                            placeholder="Note Title (e.g. Warning)"
                                                            value={note.title}
                                                            onChange={(e) => {
                                                                const newSteps = [...(currentData.deployment?.steps || [])];
                                                                const newNotes = [...(newSteps[idx].notes || [])];
                                                                newNotes[nIdx] = { ...newNotes[nIdx], title: e.target.value };
                                                                newSteps[idx].notes = newNotes;
                                                                update(['deployment', 'steps'], newSteps);
                                                            }}
                                                            className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-xs mb-1"
                                                        />
                                                        <textarea
                                                            placeholder="Note Text"
                                                            value={note.text}
                                                            onChange={(e) => {
                                                                const newSteps = [...(currentData.deployment?.steps || [])];
                                                                const newNotes = [...(newSteps[idx].notes || [])];
                                                                newNotes[nIdx] = { ...newNotes[nIdx], text: e.target.value };
                                                                newSteps[idx].notes = newNotes;
                                                                update(['deployment', 'steps'], newSteps);
                                                            }}
                                                            className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-xs"
                                                            rows={2}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newSteps = [...(currentData.deployment?.steps || [])];
                                                            const newNotes = (newSteps[idx].notes || []).filter((_, i) => i !== nIdx);
                                                            newSteps[idx].notes = newNotes;
                                                            update(['deployment', 'steps'], newSteps);
                                                        }}
                                                        className="text-red-500 hover:text-red-400 p-1"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSteps = [...(currentData.deployment?.steps || [])];
                                                    if (!newSteps[idx].notes) newSteps[idx].notes = [];
                                                    newSteps[idx].notes.push({ title: "", text: "" });
                                                    update(['deployment', 'steps'], newSteps);
                                                }}
                                                className="text-xs text-amber-600 hover:text-amber-500 flex items-center gap-1"
                                            >
                                                <Plus className="w-3 h-3" /> Add Note
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newSteps = [...(currentData.deployment?.steps || []), { title: "", description: "", notes: [] }];
                                    update(['deployment', 'steps'], newSteps);
                                }}
                                className="bg-amber-900/20 text-amber-500 px-4 py-2 rounded text-sm w-full border border-amber-900/30 hover:bg-amber-900/30"
                            >
                                + Add Deployment Step
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
