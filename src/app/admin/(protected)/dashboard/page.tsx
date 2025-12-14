
import { getProjects } from "@/actions/project.actions";
import { getArticles } from "@/actions/content.actions";
import { Users, FileText, AlertCircle, BarChart3, Plus, ArrowRight, LayoutDashboard, Terminal } from "lucide-react";
import Link from 'next/link';
import Button from "@/components/ui/Button";

export default async function AdminDashboardPage() {
    const { data: projects, error: projectsError } = await getProjects();
    const { data: articles, error: articlesError } = await getArticles(false); // Fetch all, not just published

    const projectCount = projects ? projects.length : 0;
    const articleCount = articles ? articles.length : 0;
    const publishedArticles = articles ? articles.filter(a => a.isPublished).length : 0;

    const stats = [
        { label: "Total Projects", value: projectCount.toString(), icon: LayoutDashboard, color: "text-nami-tangerine", border: "border-nami-tangerine/30" },
        { label: "Dev Articles", value: articleCount.toString(), subValue: `${publishedArticles} Public`, icon: Terminal, color: "text-nami-green", border: "border-nami-green/30" },
        { label: "Total Views", value: "2.4k", icon: BarChart3, color: "text-blue-500", border: "border-blue-500/30" },
        { label: "System Alerts", value: projectsError || articlesError ? "1" : "0", icon: AlertCircle, color: "text-red-500", border: "border-red-500/30" },
    ];

    const QuickAction = ({ href, label, icon: Icon, color }: any) => (
        <Link href={href} className={`flex items-center justify-center gap-2 p-4 rounded-lg bg-white/50 border border-nami-wood hover:border-${color}/50 hover:bg-white/80 transition-all group shadow-sm hover:shadow-md`}>
            <div className={`p-2 rounded-full bg-nami-wood/10 group-hover:bg-${color}/20 text-${color} transition-colors`}>
                <Icon size={18} />
            </div>
            <span className="font-bold text-nami-wood-dark group-hover:text-nami-tangerine transition-colors">{label}</span>
        </Link>
    );

    return (
        <div className="p-8 min-h-screen">
            {/* Header */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black mb-2 tracking-tight text-nami-wood-dark flex items-center gap-3">
                        BRIDGE CONTROL <span className="text-xs font-mono py-1 px-2 rounded bg-nami-tangerine/20 text-nami-tangerine border border-nami-tangerine/30">V.2.0</span>
                    </h1>
                    <p className="text-nami-wood-dark/60">System functional. Welcome back, Captain Redbrush.</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/dev-lab"
                        target="_blank"
                        className="bg-nami-tangerine hover:bg-nami-tangerine/90 text-white border-0 px-4 py-2 rounded-lg font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                    >
                        View Dev Lab
                    </Link>
                </div>
            </header>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                <QuickAction href="/admin/projects/new" label="New Project" icon={Plus} color="nami-tangerine" />
                <QuickAction href="/admin/articles/new" label="New Article" icon={Terminal} color="nami-green" />
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
                            className={`p-6 rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] bg-white/40 border border-nami-wood shadow-sm`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Icon className="w-24 h-24 text-nami-wood-dark" />
                            </div>
                            <div className={`mb-4 ${stat.color} p-3 rounded-lg bg-nami-wood/10 inline-flex`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-4xl font-black mb-1 text-nami-wood-dark">{stat.value}</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-nami-wood-dark/60 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                                {stat.subValue && <span className="text-[10px] font-mono text-nami-wood-dark/50 bg-nami-wood/10 px-2 py-0.5 rounded">{stat.subValue}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Content Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Recent Projects */}
                <div className="bg-white/40 rounded-xl p-6 border border-nami-wood shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-nami-wood-dark">
                            <LayoutDashboard className="w-5 h-5 text-nami-tangerine" />
                            Recent Projects
                        </h2>
                        <Link href="/admin/projects" className="text-xs text-nami-tangerine/70 hover:text-nami-tangerine transition-colors font-bold">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {projects?.slice(0, 5).map((project) => (
                            <Link key={project.id} href={`/admin/projects/${project.id}`} className="block group">
                                <div className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-nami-wood/30 group-hover:border-nami-tangerine/50 transition-all shadow-sm group-hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded bg-nami-wood/10 flex items-center justify-center text-lg">{project.image}</div>
                                        <div>
                                            <span className="text-nami-wood-dark font-bold block group-hover:text-nami-tangerine transition-colors">{project.title}</span>
                                            <span className="text-xs text-nami-wood-dark/60">{project.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-nami-wood-dark/40 text-xs font-mono">{new Date(project.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Articles */}
                <div className="bg-white/40 rounded-xl p-6 border border-nami-wood shadow-sm backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2 text-nami-wood-dark">
                            <Terminal className="w-5 h-5 text-nami-green" />
                            Recent Articles
                        </h2>
                        <Link href="/admin/articles" className="text-xs text-nami-green/70 hover:text-nami-green transition-colors font-bold">View All</Link>
                    </div>
                    <div className="space-y-3">
                        {articles?.slice(0, 5).map((article) => (
                            <Link key={article.id} href={`/admin/articles/${article.slug}`} className="block group">
                                <div className="flex items-center justify-between p-4 bg-white/60 rounded-lg border border-nami-wood/30 group-hover:border-nami-green/50 transition-all shadow-sm group-hover:shadow-md">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${article.isPublished ? 'bg-nami-green shadow-[0_0_8px_var(--nami-green)]' : 'bg-gray-400'}`}></div>
                                        <div>
                                            <span className="text-nami-wood-dark font-bold block group-hover:text-nami-green transition-colors">{article.title}</span>
                                            <span className="text-xs text-nami-wood-dark/60">{article.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-nami-wood-dark/40 text-xs font-mono">{new Date(article.updatedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {(!articles || articles.length === 0) && (
                            <div className="text-center py-8 opacity-50">
                                <Terminal className="w-8 h-8 mx-auto mb-2 text-nami-wood-dark/40" />
                                <p className="text-sm text-nami-wood-dark/60">No articles logged.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
