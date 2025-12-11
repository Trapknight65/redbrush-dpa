"use client";

import { useState, useEffect } from "react";
import { Control, UseFormSetValue } from "react-hook-form";
import { Plus, X, LayoutTemplate } from "lucide-react";
import { ArticleInput } from "@/actions/content.actions";

interface SlideEditorProps {
    control: Control<ArticleInput>;
    setValue: UseFormSetValue<ArticleInput>;
    initialContent: string;
}

export default function SlideEditor({ control, setValue, initialContent }: SlideEditorProps) {
    // Split content by "---" delimiter
    const [slides, setSlides] = useState<string[]>(initialContent ? initialContent.split("---").map(s => s.trim()) : [""]);
    const [activeSlide, setActiveSlide] = useState(0);

    // Sync slides back to "content" field whenever slides change
    useEffect(() => {
        const joinedContent = slides.join("\n\n---\n\n");
        setValue("content", joinedContent);
    }, [slides, setValue]);

    const handleSlideChange = (index: number, content: string) => {
        const newSlides = [...slides];
        newSlides[index] = content;
        setSlides(newSlides);
    };

    const addSlide = () => {
        if (slides.length >= 10) return;
        setSlides([...slides, "# New Slide"]);
        setActiveSlide(slides.length); // Switch to new slide
    };

    const removeSlide = (index: number) => {
        if (slides.length <= 1) return;
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
        if (activeSlide >= newSlides.length) {
            setActiveSlide(newSlides.length - 1);
        }
    };

    const insertText = (tag: string) => {
        const textarea = document.getElementById("slide-textarea") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = slides[activeSlide];
        const before = text.substring(0, start);
        const after = text.substring(end);
        const selection = text.substring(start, end);

        let newText = "";
        let newCursorPos = start;

        switch (tag) {
            case "h1":
                newText = `${before}# ${selection || "Heading 1"}\n${after}`;
                newCursorPos = start + 2;
                break;
            case "h2":
                newText = `${before}## ${selection || "Heading 2"}\n${after}`;
                newCursorPos = start + 3;
                break;
            case "h3":
                newText = `${before}### ${selection || "Heading 3"}\n${after}`;
                newCursorPos = start + 4;
                break;
            case "bold":
                newText = `${before}**${selection || "Bold Text"}**${after}`;
                newCursorPos = start + 2;
                break;
            case "italic":
                newText = `${before}_${selection || "Italic Text"}_${after}`;
                newCursorPos = start + 1;
                break;
            case "code":
                newText = `${before}\`\`\`javascript\n${selection || "// Code here"}\n\`\`\`\n${after}`;
                newCursorPos = start + 13;
                break;
            case "html":
                newText = `${before}\`\`\`html\n${selection || "<!-- HTML here -->"}\n\`\`\`\n${after}`;
                newCursorPos = start + 7;
                break;
            case "css":
                newText = `${before}\`\`\`css\n${selection || "/* CSS here */"}\n\`\`\`\n${after}`;
                newCursorPos = start + 6;
                break;
            default:
                return;
        }

        handleSlideChange(activeSlide, newText);

        // Defer cursor update to allow react render
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos + (selection.length || 0));
        }, 0);
    };

    return (
        <div className="space-y-4 border border-amber-900/20 rounded-lg p-4 bg-black/20">
            <div className="flex items-center justify-between">
                <h3 className="text-amber-200 font-medium flex items-center gap-2">
                    <LayoutTemplate size={16} /> Presentation Slides ({slides.length}/10)
                </h3>
                <button
                    type="button"
                    onClick={addSlide}
                    className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 disabled:opacity-50"
                    disabled={slides.length >= 10}
                >
                    <Plus size={14} /> Add Slide
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/5">
                {slides.map((_, index) => (
                    <div key={index} className="flex items-center group">
                        <button
                            type="button"
                            onClick={() => setActiveSlide(index)}
                            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-colors ${activeSlide === index
                                ? "bg-[#1a1515] text-amber-500 border-x border-t border-amber-900/30"
                                : "text-gray-500 hover:text-gray-300 bg-white/5"
                                }`}
                        >
                            Slide {index + 1}
                        </button>
                        {slides.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeSlide(index)}
                                className="ml-1 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-white/5 rounded-t border-x border-t border-amber-900/20">
                <button type="button" onClick={() => insertText("h1")} className="px-2 py-1 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded">H1</button>
                <button type="button" onClick={() => insertText("h2")} className="px-2 py-1 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded">H2</button>
                <button type="button" onClick={() => insertText("h3")} className="px-2 py-1 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded">H3</button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button type="button" onClick={() => insertText("bold")} className="px-2 py-1 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 rounded">B</button>
                <button type="button" onClick={() => insertText("italic")} className="px-2 py-1 text-xs italic text-gray-400 hover:text-white hover:bg-white/10 rounded">I</button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button type="button" onClick={() => insertText("code")} className="px-2 py-1 text-xs font-mono text-yellow-500 hover:text-yellow-400 hover:bg-white/10 rounded">{`{JS}`}</button>
                <button type="button" onClick={() => insertText("html")} className="px-2 py-1 text-xs font-mono text-orange-500 hover:text-orange-400 hover:bg-white/10 rounded">{`<html>`}</button>
                <button type="button" onClick={() => insertText("css")} className="px-2 py-1 text-xs font-mono text-blue-500 hover:text-blue-400 hover:bg-white/10 rounded">{`#css`}</button>
            </div>

            {/* Editor Area */}
            <div className="relative">
                <textarea
                    id="slide-textarea"
                    value={slides[activeSlide]}
                    onChange={(e) => handleSlideChange(activeSlide, e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-amber-900/30 rounded-b p-4 text-gray-300 font-mono text-sm leading-relaxed focus:border-amber-500 outline-none transition-colors min-h-[400px]"
                    placeholder={`# Slide Title\n\n- Point 1\n- Point 2`}
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-gray-600 font-mono">
                    Markdown Supported
                </div>
            </div>
        </div>
    );
}
