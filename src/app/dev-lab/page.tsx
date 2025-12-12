import { getArticles, getDevReports } from "@/actions/content.actions";
import { Terminal, TerminalLine } from "@/components/dev/Terminal";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, FileText, FlaskConical, LayoutTemplate } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { DevGridBackground } from "@/components/dev/DevGridBackground";

export const dynamic = 'force-dynamic';

export default async function DevLabPage() {
    const { data: articles } = await getArticles(true); // Filter out archived/drafts
    const { data: reports } = await getDevReports(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 text-white p-6 sm:p-8 pt-24 relative overflow-hidden">
            <DevGridBackground />
            <div className="max-w-6xl mx-auto space-y-16 relative z-10">

                {/* Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-8 bg-[var(--dev-neon-green)] animate-pulse" />
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--dev-neon-green)] to-[var(--dev-neon-blue)]">
                                    DEV LAB
                                </span>
                            </h1>
                        </div>
                        <p className="text-gray-400 font-mono text-lg max-w-md">
                            Exploring the codebase, documenting the journey, and building in public.
                        </p>
                    </div>

                    <Terminal title="system-status" className="w-full">
                        <TerminalLine prefix=">" color="success">System: ONLINE</TerminalLine>
                        <TerminalLine prefix=">" color="info">Mode: DEVELOPER</TerminalLine>
                        <TerminalLine prefix=">" color="warning">Latest Deploy: Just now</TerminalLine>
                        <TerminalLine prefix="$">ls ./experiments</TerminalLine>
                    </Terminal>
                </div>

                {/* Main Content Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Articles Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between border-b border-[var(--dev-surface)] pb-4">
                            <h2 className="text-2xl font-bold flex items-center gap-3">
                                <FileText className="text-[var(--dev-neon-pink)]" />
                                Technical Articles
                            </h2>
                            <span className="text-xs font-mono text-gray-500">{articles?.length || 0} ITEMS</span>
                        </div>

                        <div className="grid gap-4">
                            {articles && articles.length > 0 ? (
                                articles.map((article) => (
                                    <Link
                                        key={article.id}
                                        href={`/dev-lab/article/${article.slug}`}
                                        className="group block p-6 bg-[var(--dev-surface)] border border-white/5 rounded-xl hover:border-[var(--dev-neon-pink)]/50 hover:shadow-[0_0_20px_rgba(255,0,60,0.1)] transition-all duration-300"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <Badge variant="outline" className="border-[var(--dev-neon-blue)] text-[var(--dev-neon-blue)] font-mono">
                                                {article.category}
                                            </Badge>
                                            <span className="text-xs font-mono text-gray-500">
                                                {formatDate(article.createdAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--dev-neon-pink)] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                            {article.excerpt || "No excerpt provided."}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-mono text-[var(--dev-neon-green)] opacity-0 group-hover:opacity-100 transition-opacity">
                                            READ_ENTRY <ArrowRight size={14} />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="p-8 text-center border border-dashed border-gray-800 rounded-xl text-gray-600 font-mono">
                                    [NO_DATA] Accessing archives... 0 records found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar: Reports & Playground */}
                    <div className="space-y-12">

                        {/* Reports Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-[var(--dev-surface)] pb-4">
                                <h2 className="text-xl font-bold flex items-center gap-3">
                                    <LayoutTemplate className="text-[var(--dev-neon-blue)]" />
                                    Dev Reports
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {reports && reports.length > 0 ? (
                                    reports.map((report) => (
                                        <Link
                                            key={report.id}
                                            href={`/dev-lab/report/${report.slug}`}
                                            className="block p-4 bg-[var(--dev-surface)] border-l-2 border-[var(--dev-neon-blue)] hover:bg-white/5 transition-colors"
                                        >
                                            <div className="text-sm font-bold text-white mb-1">
                                                {report.title}
                                            </div>
                                            <div className="text-xs font-mono text-gray-500">
                                                {report.period}
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-600 font-mono italic">
                                        No reports filed yet.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Experiments / Playground Link */}
                        <div className="p-6 rounded-xl bg-gradient-to-br from-[var(--dev-surface)] to-black border border-[var(--dev-neon-green)]/20">
                            <div className="flex items-center gap-3 mb-4">
                                <FlaskConical className="text-[var(--dev-neon-green)]" />
                                <h3 className="font-bold">Component Lab</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">
                                Test components, design systems, and animations in isolation.
                            </p>
                            <button className="w-full py-2 px-4 bg-[var(--dev-neon-green)]/10 text-[var(--dev-neon-green)] border border-[var(--dev-neon-green)]/50 rounded hover:bg-[var(--dev-neon-green)] hover:text-black transition-all font-mono text-sm font-bold uppercase">
                                Access Lab
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
