import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminQuickNav from "@/components/admin/AdminQuickNav";

export default function AdminProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <AdminQuickNav />
            <AdminSidebar />
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
