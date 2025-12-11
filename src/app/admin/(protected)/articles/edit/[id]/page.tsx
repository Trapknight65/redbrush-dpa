import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ArticleForm from "@/components/admin/ArticleForm";
import { getArticleById } from "@/actions/content.actions";
import { redirect } from "next/navigation";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { data: article } = await getArticleById(id);

    if (!article) {
        redirect("/admin/articles");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/articles" className="text-amber-500 hover:text-amber-400 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-amber-500 uppercase tracking-widest">Edit Article</h1>
                    <p className="text-amber-700/60 font-mono text-sm">Update technical entry {article.slug}</p>
                </div>
            </div>

            <ArticleForm article={article} />
        </div>
    );
}
