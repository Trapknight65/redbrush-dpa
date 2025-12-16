"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Users, Anchor, Settings, Package, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    const navItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
        { href: "/admin/projects", label: "Projects", icon: FileText },
        { href: "/admin/articles", label: "Articles", icon: FileText },
        { href: "/admin/services", label: "Services", icon: Package },
        { href: "/admin/hero", label: "Hero Section", icon: Film },
        { href: "/admin/about", label: "About / Profile", icon: Users },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-nami-wood border border-nami-wood-dark rounded-md text-nami-tangerine shadow-lg"
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
                "fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-nami-wood border-r border-nami-wood p-6 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 shadow-xl",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center border border-nami-wood shadow-sm">
                        <Anchor className="w-6 h-6 text-nami-tangerine" />
                    </div>
                    <span className="text-xl font-bold text-nami-wood-dark tracking-wider">CPT. LOG</span>
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
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium",
                                    isActive
                                        ? "bg-white/50 text-nami-tangerine border-l-4 border-nami-tangerine shadow-sm"
                                        : "text-nami-wood-dark/70 hover:text-nami-tangerine hover:bg-white/30"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="mt-auto pt-6 border-t border-nami-wood/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-nami-tangerine flex items-center justify-center text-white font-bold shadow-md">
                            RB
                        </div>
                        <div>
                            <p className="text-sm font-bold text-nami-wood-dark">Redbrush</p>
                            <p className="text-xs text-nami-wood-dark/60">Navigator</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
