"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Users, Anchor, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    const navItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
        { href: "/admin/projects", label: "Projects", icon: FileText },
        { href: "/admin/articles", label: "Articles", icon: FileText },
        { href: "/admin/about", label: "About / Profile", icon: Users },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-[#120c0c] border border-amber-900/50 rounded-md text-amber-500 shadow-lg"
            >
                {isOpen ? <Settings className="w-6 h-6" /> : <BarChart3 className="w-6 h-6" />}
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#120c0c] border-r border-amber-900/30 p-6 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-full bg-amber-900/20 flex items-center justify-center border border-amber-700/50">
                        <Anchor className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-xl font-bold text-amber-500 tracking-wider">CPT. LOG</span>
                </div>

                <nav className="space-y-2 flex-grow">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded transition-colors",
                                    isActive
                                        ? "bg-amber-900/20 text-amber-200 border-l-2 border-amber-600"
                                        : "text-amber-700/60 hover:text-amber-500 hover:bg-amber-900/10"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-amber-900/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center text-amber-100 font-bold border border-amber-700/30">
                            RB
                        </div>
                        <div>
                            <p className="text-sm font-bold text-amber-100">Redbrush</p>
                            <p className="text-xs text-amber-700">Captain</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
