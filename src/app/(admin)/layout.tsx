import { AdminSidebar } from "@/components/admin";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            <AdminSidebar />
            <div className="lg:pl-64 transition-all duration-300">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
