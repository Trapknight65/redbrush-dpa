import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <AdminSidebar />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
