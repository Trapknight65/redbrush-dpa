
import { getProjects } from "@/actions/project.actions";
import { getArticles } from "@/actions/content.actions";
import { Users, FileText, AlertCircle, BarChart3, Plus, ArrowRight, LayoutDashboard, Terminal } from "lucide-react";
import Link from 'next/link';
import { Button } from "@/components/ui/Button";

export default async function AdminDashboardPage() {
    const { data: projects, error: projectsError } = await getProjects();
    const { data: articles, error: articlesError } = await getArticles(false); // Fetch all, not just published

    const projectCount = projects ? projects.length : 0;
    const articleCount = articles ? articles.length : 0;
    const publishedArticles = articles ? articles.filter(a => a.isPublished).length : 0;

    const stats = [
        { label: "Total Projects", value: projectCount.toString(), icon: LayoutDashboard, color: "text-amber-500", border: "border-amber-500/20" },
        { label: "Dev Articles", value: articleCount.toString(), subValue: `${publishedArticles} Public`, icon: Terminal, color: "text-[var(--dev-neon-green)]", border: "border-[var(--dev-neon-green)]/20" },
        { label: "Total Views", value: "2.4k", icon: BarChart3, color: "text-purple-500", border: "border-purple-500/20" },
        { label: "System Alerts", value: projectsError || articlesError ? "1" : "0", icon: AlertCircle, color: "text-red-500", border: "border-red-500/20" },
    ];

    const QuickAction = ({ href, label, icon: Icon, color }: any) => (
        <Link href={href} className={`flex items-center justify-center gap-2 p-4 rounded-lg bg-[var(--dev-surface)] border border-white/5 hover:border-${color}/50 hover:bg-${color}/5 transition-all group`}>
            <div className={`p-2 rounded-full bg-white/5 group-hover:bg-${color}/20 text-${color} transition-colors`}>
                <Icon size={18} />
            </div>
            <span className="font-medium text-gray-300 group-hover:text-white">{label}</span>
        </Link>
    );

    return (
        <div className="p-8 text-amber-100 min-h-screen bg-[var(--dev-bg)]">
            {/* Header */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight text-white flex items-center gap-3">
                        BRIDGE CONTROL <span className="text-xs font-mono py-1 px-2 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">V.1.0</span>
                    </h1>
                    <p className="text-gray-500">System functional. Welcome back, Captain Redbrush.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild className="bg-[var(--dev-neon-blue)] hover:bg-[var(--dev-neon-blue)]/80 text-white border-0">
                        <Link href="/dev-lab" target="_blank">View Dev Lab</Link>
                    </Button>
                </div>
            </header>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <QuickAction href="/admin/projects/new" label="New Project" icon={Plus} color="amber-500" />
                <QuickAction href="/admin/articles/new" label="New Article" icon={Terminal} color="[var(--dev-neon-green)]" />
                <QuickAction href="/admin/about" label="Edit Profile" icon={Users} color="blue-500" />
                <QuickAction href="/" label="View Site" icon={ArrowRight} color="purple-500" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`neu-flat p-6 rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] ${stat.border}`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon className="w-24 h-24" />
                            </div>
                            <div className={`mb-4 ${stat.color} p-3 rounded-lg bg-white/5 inline-flex`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-4xl font-black mb-1 text-white">{stat.value}</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                {stat.subValue && <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">{stat.subValue}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Projects */}
                <div className="neu-flat rounded-xl p-6 border border-amber-900/20">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                            <LayoutDashboard className="w-5 h-5 text-amber-500" />
                            Recent Projects
                        </h2>
                        <Link href="/admin/projects" className="text-xs text-amber-500/50 hover:text-amber-500 transition-colors">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {projects?.slice(0, 5).map((project) => (
                            <Link key={project.id} href={`/admin/projects/${project.id}`} className="block group">
                                <div className="flex items-center justify-between p-4 bg-[#0a0505] rounded-lg border border-white/5 group-hover:border-amber-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-lg">{project.image}</div>
                                        <div>
                                            <span className="text-gray-200 font-medium block group-hover:text-amber-400 transition-colors">{project.title}</span>
                                            <span className="text-xs text-gray-600">{project.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-600 text-xs font-mono">{new Date(project.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="neu-flat rounded-xl p-6 border border-[var(--dev-neon-green)]/10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                            <Terminal className="w-5 h-5 text-[var(--dev-neon-green)]" />
                            Recent Articles
                        </h2>
                        <Link href="/admin/articles" className="text-xs text-[var(--dev-neon-green)]/50 hover:text-[var(--dev-neon-green)] transition-colors">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {articles?.slice(0, 5).map((article) => (
                            <Link key={article.id} href={`/admin/articles/${article.slug}`} className="block group">
                                <div className="flex items-center justify-between p-4 bg-[#0a0505] rounded-lg border border-white/5 group-hover:border-[var(--dev-neon-green)]/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${article.isPublished ? 'bg-[var(--dev-neon-green)] shadow-[0_0_8px_var(--dev-neon-green)]' : 'bg-gray-600'}`}></div>
                                        <div>
                                            <span className="text-gray-200 font-medium block group-hover:text-[var(--dev-neon-green)] transition-colors">{article.title}</span>
                                            <span className="text-xs text-gray-600">{article.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-gray-600 text-xs font-mono">{new Date(article.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {(!articles || articles.length === 0) && (
                            <div className="text-center py-8 opacity-50">
                                <Terminal className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                                <p className="text-sm text-gray-500">No articles logged.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
