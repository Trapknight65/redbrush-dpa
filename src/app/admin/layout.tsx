export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-nami-cream text-nami-wood-dark relative overflow-hidden font-sans">
            {/* Thematic Background */}
            <div className="absolute inset-0 bg-nami-wood opacity-50 z-0" />

            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </div>
    );
}
