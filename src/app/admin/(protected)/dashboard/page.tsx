import { getProjects } from "@/actions/project.actions";
import { Users, FileText, AlertCircle, BarChart3, Anchor } from "lucide-react";
import Link from 'next/link';
// Actually, to use `motion` we need "use client". But `getProjects` is server-side.
// We should make the Page a server component and pass data to a Client component.
// For simplicity in this step, I will keep the Page as Server Component and remove direct motion animation on the stats for now, or fetch data here and pass to a client part.
// Let's refactor: Page (Server) -> DashboardClient (Client)

export default async function AdminDashboardPage() {
    const { data: projects, error } = await getProjects();
    const projectCount = projects ? projects.length : 0;

    const stats = [
        { label: "Active Project", value: projectCount.toString(), icon: FileText, color: "text-amber-500" },
        { label: "Crew Members", value: "3", icon: Users, color: "text-blue-400" },
        { label: "System Alerts", value: error ? "1" : "0", icon: AlertCircle, color: "text-green-500" },
        { label: "Total Views", value: "1.2k", icon: BarChart3, color: "text-purple-500" },
    ];

    return (
        <div className="p-8 text-amber-100 font-serif">
            <header className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Bridge Overview</h1>
                <p className="text-amber-700">Welcome back, Captain. Current ship status is normal.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-[#1a1515] border border-amber-900/30 p-6 rounded-lg relative overflow-hidden group hover:border-amber-600/50 transition-colors"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icon className="w-16 h-16" />
                            </div>
                            <div className={`mb-4 ${stat.color}`}>
                                <Icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                            <p className="text-amber-700 text-sm font-bold uppercase tracking-wide">{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Projects List */}
            <div className="bg-[#1a1515] border border-amber-900/30 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Recent Projects
                </h2>
                <div className="space-y-4">
                    {projects?.slice(0, 5).map((project) => (
                        <Link key={project.id} href={`/admin/projects/${project.id}`} className="block">
                            <div className="flex items-center justify-between p-4 bg-[#0a0505] rounded border border-amber-900/20 hover:border-amber-700/40 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-amber-200">{project.title}</span>
                                </div>
                                <span className="text-amber-800 text-sm font-mono">{new Date(project.updatedAt).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}
                    {(!projects || projects.length === 0) && (
                        <p className="text-amber-800 italic">No projects found. Check the database.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

