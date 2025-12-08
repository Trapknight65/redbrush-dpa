"use client";

import { motion } from "framer-motion";
import { Users, FileText, AlertCircle, BarChart3, Settings, Anchor } from "lucide-react";
import Link from 'next/link';

export default function AdminDashboardPage() {
    const stats = [
        { label: "Active Bounties", value: "8", icon: FileText, color: "text-amber-500" },
        { label: "Crew Members", value: "3", icon: Users, color: "text-blue-400" },
        { label: "System Alerts", value: "0", icon: AlertCircle, color: "text-green-500" },
        { label: "Total Views", value: "1.2k", icon: BarChart3, color: "text-purple-500" },
    ];

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#120c0c] border-r border-amber-900/30 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-full bg-amber-900/20 flex items-center justify-center border border-amber-700/50">
                        <Anchor className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-xl font-bold text-amber-500 tracking-wider">CPT. LOG</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-amber-900/20 text-amber-200 rounded border-l-2 border-amber-600">
                        <BarChart3 className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-amber-700/60 hover:text-amber-500 hover:bg-amber-900/10 rounded transition-colors">
                        <FileText className="w-5 h-5" />
                        Projects
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-amber-700/60 hover:text-amber-500 hover:bg-amber-900/10 rounded transition-colors">
                        <Users className="w-5 h-5" />
                        Crew
                    </Link>
                    <Link href="#" className="flex items-center gap-3 px-4 py-3 text-amber-700/60 hover:text-amber-500 hover:bg-amber-900/10 rounded transition-colors">
                        <Settings className="w-5 h-5" />
                        Ship Settings
                    </Link>
                </nav>

                <div className="mt-auto pt-6 border-t border-amber-900/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-900"></div>
                        <div>
                            <p className="text-sm font-bold text-amber-100">Redbrush</p>
                            <p className="text-xs text-amber-700">Captain</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-amber-100 mb-2">Bridge Overview</h1>
                    <p className="text-amber-700">Welcome back, Captain. Current ship status is normal.</p>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#1a1515] border border-amber-900/30 p-6 rounded-lg relative overflow-hidden group hover:border-amber-600/50 transition-colors"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Icon className="w-16 h-16" />
                                </div>
                                <div className={`mb-4 ${stat.color}`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-bold text-amber-100 mb-1">{stat.value}</h3>
                                <p className="text-amber-700 text-sm font-bold uppercase tracking-wide">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Recent Logs (Placeholder) */}
                <div className="bg-[#1a1515] border border-amber-900/30 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-amber-100 mb-6 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-600" />
                        Recent Log Entries
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-[#0a0505] rounded border border-amber-900/20 hover:border-amber-700/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-amber-200">New commission inquiry received</span>
                                </div>
                                <span className="text-amber-800 text-sm font-mono">1{i}:00 AM</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
