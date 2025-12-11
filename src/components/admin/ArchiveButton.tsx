"use client";

import { toggleArchiveArticle } from "@/actions/content.actions";
import { Archive, ArchiveRestore } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";


interface ArchiveButtonProps {
    id: string;
    isArchived: boolean;
}

export default function ArchiveButton({ id, isArchived }: ArchiveButtonProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        await toggleArchiveArticle(id, !isArchived);
        router.refresh();
        setLoading(false);
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`p-2 rounded border transition-colors flex items-center gap-2 ${isArchived
                ? "bg-purple-900/20 text-purple-400 border-purple-900/50 hover:bg-purple-900/40"
                : "bg-gray-800/50 text-gray-500 border-gray-700 hover:bg-gray-700 hover:text-gray-300"
                }`}
            title={isArchived ? "Restore from Archive" : "Archive"}
        >
            {isArchived ? <ArchiveRestore size={16} /> : <Archive size={16} />}
            {loading && <span className="animate-spin text-xs">...</span>}
        </button>
    );
}
