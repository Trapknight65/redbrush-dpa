"use client";

import { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
    code: string;
    language?: string;
    fileName?: string;
}

export function CodeBlock({ code, language = "typescript", fileName }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative rounded-lg border border-[var(--dev-surface)] bg-[#0a0a0a] overflow-hidden my-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[var(--dev-surface)] border-b border-black/50">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FileCode size={14} className="text-[var(--dev-neon-blue)]" />
                    <span className="font-mono">{fileName || language}</span>
                </div>
                <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-md hover:bg-[var(--dev-bg)] text-gray-400 hover:text-[var(--dev-neon-green)] transition-colors"
                    aria-label="Copy code"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>

            {/* Code Content */}
            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-gray-300">
                    <code>{code}</code>
                </pre>
            </div>

            {/* Neon Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--dev-neon-blue)] to-[var(--dev-neon-pink)] opacity-50" />
        </div>
    );
}
