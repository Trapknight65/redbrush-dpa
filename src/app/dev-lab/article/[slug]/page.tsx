import { getArticleBySlug } from "@/actions/content.actions";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, Eye } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TechStackGrid } from "@/components/dev/TechStackGrid";
import { CodeBlock } from "@/components/dev/CodeBlock";
import SlideDeck from "@/components/dev/SlideDeck";
import ReactMarkdown from "react-markdown";

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const { data: article } = await getArticleBySlug(slug);

    if (!article) {
        redirect("/dev-lab");
    }

    const techStack = article.techStack as any[] || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-crimson-red text-white flex flex-col relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black pointer-events-none" />

            {/* Top Bar / Navigation */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
                <Link href="/dev-lab" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest">
                    <ArrowLeft size={14} /> System / Dev_Lab
                </Link>
                <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-[var(--dev-neon-pink)] text-[var(--dev-neon-pink)] font-mono text-xs">
                        {article.category}
                    </Badge>
                    <span className="text-gray-600 font-mono text-xs">|</span>
                    <span className="text-gray-500 font-mono text-xs">{formatDate(article.createdAt)}</span>
                </div>
            </div>

            {/* Main Slide Content */}
            <div className="flex-1 relative z-10 overflow-hidden flex flex-col md:flex-row">

                {/* Left Panel: Slide Deck (Content) */}
                <SlideDeck
                    content={article.content}
                    repoUrl={article.repositoryUrl}
                    demoUrl={article.demoUrl}
                />

                {/* Right Panel: Tech & Stats (Sidebar on Desktop) */}
                {techStack.length > 0 && (
                    <div className="hidden md:block w-80 border-l border-white/5 bg-black/20 backdrop-blur-sm p-6 overflow-y-auto">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-[var(--dev-neon-blue)] rounded-full animate-pulse" />
                                    Tech Stack
                                </h3>
                                <div className="space-y-3">
                                    {techStack.map((tech: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between group p-2 rounded hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                            <span className="font-mono text-sm text-gray-300 group-hover:text-white">{tech.name}</span>
                                            {tech.version && (
                                                <span className="text-[10px] text-gray-600 bg-black/50 px-1.5 py-0.5 rounded border border-white/5">
                                                    v{tech.version}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Metadata Box */}
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5 space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Views</span>
                                    <span className="font-mono text-white">{article.views}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">Status</span>
                                    <span className="font-mono text-[var(--dev-neon-green)]">Published</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
