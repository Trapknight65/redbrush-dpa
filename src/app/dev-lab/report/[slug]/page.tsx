import { getDevReportBySlug } from "@/actions/content.actions";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart3, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatDate } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default async function ReportPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const { data: report } = await getDevReportBySlug(slug);

    if (!report) {
        redirect("/dev-lab");
    }

    const metrics = report.metrics as Record<string, any> || {};

    return (
        <div className="min-h-screen bg-[var(--dev-bg)] text-white p-6 sm:p-8 pt-24">
            <div className="max-w-5xl mx-auto">

                {/* Back Link */}
                <Link href="/dev-lab" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--dev-neon-green)] mb-8 transition-colors font-mono text-sm">
                    <ArrowLeft size={16} /> ../RETURN_TO_LAB
                </Link>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-[var(--dev-surface)] pb-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="border-[var(--dev-neon-blue)] text-[var(--dev-neon-blue)] font-mono uppercase">
                                Dev Report
                            </Badge>
                            <span className="text-gray-500 font-mono text-sm">{report.period}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            {report.title}
                        </h1>
                    </div>

                    {/* Timestamp */}
                    <div className="text-right hidden md:block">
                        <div className="text-xs text-gray-500 font-mono">FILED_ON</div>
                        <div className="text-lg font-mono font-bold">{formatDate(report.createdAt)}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <article className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white prose-a:text-[var(--dev-neon-blue)] max-w-none">
                            <div className="whitespace-pre-wrap font-sans text-lg leading-relaxed">
                                {report.content}
                            </div>
                        </article>

                        {/* Highlights */}
                        {report.highlights.length > 0 && (
                            <div className="mt-12 bg-[var(--dev-surface)] p-6 rounded-xl border border-white/5">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-[var(--dev-neon-green)]">
                                    <CheckCircle2 /> Key Achievements
                                </h3>
                                <ul className="space-y-3">
                                    {report.highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex gap-3 text-gray-300">
                                            <span className="text-[var(--dev-neon-green)] font-mono">0{idx + 1}.</span>
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Metrics Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#0a0a0a] border border-[var(--dev-neon-blue)]/30 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <BarChart3 size={100} />
                            </div>

                            <h3 className="text-lg font-bold mb-6 font-mono flex items-center gap-2">
                                <span className="w-2 h-2 bg-[var(--dev-neon-blue)] rounded-full animate-pulse" />
                                KPI_METRICS
                            </h3>

                            <div className="space-y-6 relative z-10">
                                {Object.entries(metrics).map(([key, value]) => (
                                    <div key={key}>
                                        <div className="text-xs text-gray-500 font-mono uppercase mb-1">{key}</div>
                                        <div className="text-3xl font-black text-white tracking-tight">
                                            {value}
                                        </div>
                                    </div>
                                ))}
                                {Object.keys(metrics).length === 0 && (
                                    <div className="text-sm text-gray-600 italic">No metrics recorded.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
