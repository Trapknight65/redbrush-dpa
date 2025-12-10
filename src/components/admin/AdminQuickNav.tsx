"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FileText, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminQuickNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin/dashboard", icon: BarChart3, label: "Dashboard" },
        { href: "/admin/projects", icon: FileText, label: "Projects" },
        { href: "/admin/about", icon: Users, label: "Profile" },
    ];

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 md:hidden flex flex-col gap-2 bg-[#120c0c] border-l border-y border-amber-900/30 rounded-l-xl p-2 shadow-xl">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "p-3 rounded-lg transition-all",
                            isActive
                                ? "bg-amber-900/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                                : "text-amber-700/60 hover:text-amber-500 hover:bg-amber-900/20"
                        )}
                        aria-label={item.label}
                    >
                        <Icon className="w-6 h-6" />
                    </Link>
                );
            })}
        </div>
    );
}
