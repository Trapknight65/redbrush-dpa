export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0a0505] text-amber-50 relative overflow-hidden font-serif">
            {/* Thematic Background */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
            <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-red-950/30 z-0" />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
