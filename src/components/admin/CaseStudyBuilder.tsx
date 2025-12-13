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
    Trash2
} from "lucide-react";

interface CaseStudyBuilderProps {
    data: CaseStudyData | null;
    onChange: (data: CaseStudyData) => void;
}

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
            roadmap: { performance: [], security: [], features: [], status: "" }
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
    ];

    const Input = ({ label, value, onChangePath, placeholder = "" }: any) => (
        <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 uppercase">{label}</label>
            <input
                type="text"
                value={value || ""}
                onChange={(e) => update(onChangePath, e.target.value)}
                className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm focus:border-amber-600 focus:outline-none"
                placeholder={placeholder}
            />
        </div>
    );

    const TextArea = ({ label, value, onChangePath, rows = 3 }: any) => (
        <div className="space-y-1">
            <label className="text-xs font-bold text-amber-700 uppercase">{label}</label>
            <textarea
                value={value || ""}
                onChange={(e) => update(onChangePath, e.target.value)}
                rows={rows}
                className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm focus:border-amber-600 focus:outline-none"
            />
        </div>
    );

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
                            <Input label="Report Title" value={currentData.header?.reportTitle} onChangePath={['header', 'reportTitle']} placeholder="Development Process Report" />
                            <Input label="Status Badge" value={currentData.header?.statusBadge} onChangePath={['header', 'statusBadge']} placeholder="Production Ready" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Input label="Case Study Title" value={currentData.meta?.title} onChangePath={['meta', 'title']} />
                            <Input label="Agency" value={currentData.meta?.agency} onChangePath={['meta', 'agency']} />
                            <Input label="Date" value={currentData.meta?.date} onChangePath={['meta', 'date']} />
                        </div>
                    </div>
                )}

                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {/* Heritage */}
                        <div className="space-y-4">
                            <h4 className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">Heritage</h4>
                            <Input label="Title" value={currentData.overview?.heritage?.title} onChangePath={['overview', 'heritage', 'title']} />
                            <TextArea label="Description" value={currentData.overview?.heritage?.description} onChangePath={['overview', 'heritage', 'description']} />
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
                            <TextArea label="Statement" value={currentData.overview?.mission?.statement} onChangePath={['overview', 'mission', 'statement']} />
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
                        <Input label="Current Status" value={currentData.roadmap?.status} onChangePath={['roadmap', 'status']} placeholder="Active Development" />

                        {/* Status Sections Helper */}
                        {['performance', 'security', 'features'].map((sectionKey) => (
                            <div key={sectionKey} className="space-y-3">
                                <h4 className="text-amber-500 font-bold capitalize border-b border-amber-900/30 pb-1">{sectionKey}</h4>
                                {(currentData.roadmap?.[sectionKey as keyof typeof currentData.roadmap] as any[])?.map((item, idx) => (
                                    <div key={idx} className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-1">
                                            <input
                                                placeholder="Title"
                                                value={item.title}
                                                onChange={(e) => {
                                                    const newSection = [...(currentData.roadmap[sectionKey as keyof typeof currentData.roadmap] as any[])];
                                                    newSection[idx] = { ...newSection[idx], title: e.target.value };
                                                    update(['roadmap', sectionKey], newSection);
                                                }}
                                                className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-sm"
                                            />
                                            <input
                                                placeholder="Description"
                                                value={item.description}
                                                onChange={(e) => {
                                                    const newSection = [...(currentData.roadmap[sectionKey as keyof typeof currentData.roadmap] as any[])];
                                                    newSection[idx] = { ...newSection[idx], description: e.target.value };
                                                    update(['roadmap', sectionKey], newSection);
                                                }}
                                                className="w-full bg-[#1a1515] border border-amber-900/30 rounded p-2 text-amber-100 text-xs"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newSection = (currentData.roadmap[sectionKey as keyof typeof currentData.roadmap] as any[]).filter((_, i) => i !== idx);
                                                update(['roadmap', sectionKey], newSection);
                                            }}
                                            className="text-red-500 hover:text-red-400 mt-2"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const currentSection = (currentData.roadmap && currentData.roadmap[sectionKey as keyof typeof currentData.roadmap]) as any[] || [];
                                        update(['roadmap', sectionKey], [...currentSection, { title: "", description: "" }]);
                                    }}
                                    className="text-xs text-amber-600 hover:text-amber-500"
                                >
                                    + Add {sectionKey} Item
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
