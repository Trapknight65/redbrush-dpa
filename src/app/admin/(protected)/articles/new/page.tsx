import ArticleForm from "@/components/admin/ArticleForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/articles" className="text-amber-500 hover:text-amber-400 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-amber-500 uppercase tracking-widest">New Article</h1>
                    <p className="text-amber-700/60 font-mono text-sm">Create a new technical entry</p>
                </div>
            </div>

            <ArticleForm />
        </div>
    );
}
