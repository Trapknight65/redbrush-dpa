import { getArticleBySlug } from "@/actions/content.actions";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Tag, Eye } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TechStackGrid } from "@/components/dev/TechStackGrid";
import { CodeBlock } from "@/components/dev/CodeBlock";
import ReactMarkdown from "react-markdown";

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const { data: article } = await getArticleBySlug(slug);

    if (!article) {
        redirect("/dev-lab");
    }

    const techStack = article.techStack as any[] || [];

    return (
        <div className="min-h-screen bg-[var(--dev-bg)] text-white p-6 sm:p-8 pt-24">
            <div className="max-w-4xl mx-auto">

                {/* Back Link */}
                <Link href="/dev-lab" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--dev-neon-green)] mb-8 transition-colors font-mono text-sm">
                    <ArrowLeft size={16} /> ../RETURN_TO_LAB
                </Link>

                {/* Header */}
                <div className="space-y-6 mb-12 border-b border-[var(--dev-surface)] pb-8">
                    <div className="flex flex-wrap gap-3">
                        <Badge variant="outline" className="border-[var(--dev-neon-pink)] text-[var(--dev-neon-pink)] font-mono">
                            {article.category}
                        </Badge>
                        {article.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-[var(--dev-surface)] hover:bg-[var(--dev-surface)] text-gray-400 font-mono">
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-gray-500 font-mono">
                        <span className="flex items-center gap-2">
                            <Calendar size={14} /> {formatDate(article.createdAt)}
                        </span>
                        <span className="flex items-center gap-2">
                            <Eye size={14} /> {article.views} views
                        </span>
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-sm sm:prose-base lg:prose-lg prose-invert max-w-none mb-16 prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-[var(--dev-neon-blue)] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-[var(--dev-neon-green)] prose-pre:bg-[var(--dev-surface)] prose-pre:border prose-pre:border-white/10 prose-blockquote:border-l-[var(--dev-neon-pink)] prose-blockquote:bg-[var(--dev-neon-pink)]/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-li:text-gray-300">
                    <ReactMarkdown>
                        {article.content}
                    </ReactMarkdown>
                </article>

                {/* Tech Stack Used */}
                {techStack.length > 0 && (
                    <div className="border-t border-[var(--dev-surface)] pt-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <div className="w-1 h-6 bg-[var(--dev-neon-blue)]" />
                            Technologies Deployed
                        </h3>
                        <TechStackGrid items={techStack} />
                    </div>
                )}

            </div>
        </div>
    );
}
