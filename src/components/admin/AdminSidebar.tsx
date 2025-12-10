"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Users, Anchor, Settings } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, if not I will replace with template literals or verify

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
        { href: "/admin/projects", label: "Projects", icon: FileText },
        // { href: "/admin/crew", label: "Crew", icon: Users }, // Placeholder for now
        { href: "/admin/about", label: "About / Profile", icon: Users },
    ];

    return (
        <aside className="w-full md:w-64 bg-[#120c0c] border-r border-amber-900/30 p-6 flex flex-col h-screen sticky top-0">
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
    );
}
