import { getArticles } from "@/actions/content.actions";
import Link from "next/link";
import { Plus, Edit, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ArticlesAdminPage() {
    const { data: articles } = await getArticles(false);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-amber-500 uppercase tracking-widest">Articles</h1>
                    <p className="text-amber-700/60 font-mono text-sm mt-2">Manage technical content and reports</p>
                </div>
                <Link
                    href="/admin/articles/new"
                    className="flex items-center gap-2 bg-amber-600 text-[#0a0505] px-4 py-2 rounded font-bold hover:bg-amber-500 transition-colors"
                >
                    <Plus size={18} /> New Entry
                </Link>
            </div>

            <div className="grid gap-4">
                {articles && articles.length > 0 ? (
                    articles.map((article) => (
                        <div
                            key={article.id}
                            className="bg-[#120c0c] border border-amber-900/20 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-900/40 transition-colors"
                        >
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold text-amber-100">{article.title}</h2>
                                    <Badge variant={article.isPublished ? "default" : "secondary"} className={article.isPublished ? "bg-green-900/50 text-green-400 border-green-900" : "bg-gray-800 text-gray-400"}>
                                        {article.isPublished ? "PUBLISHED" : "DRAFT"}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-amber-700/60 font-mono">
                                    <span>{article.category}</span>
                                    <span>•</span>
                                    <span>{formatDate(article.createdAt)}</span>
                                    <span>•</span>
                                    <span>{article.views} Views</span>
                                </div>
                            </div>

                            <Link
                                href={`/admin/articles/edit/${article.id}`}
                                className="px-4 py-2 border border-amber-900/30 rounded text-amber-500 hover:bg-amber-900/20 hover:text-amber-300 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Edit size={14} /> Edit
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 border border-dashed border-amber-900/20 rounded-lg text-amber-700/50 font-mono">
                        No articles found. Start writing transmission...
                    </div>
                )}
            </div>
        </div>
    );
}
