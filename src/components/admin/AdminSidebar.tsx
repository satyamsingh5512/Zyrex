"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Briefcase, Trophy, Building2, FileText,
    Users, Settings, LogOut, ChevronLeft, Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui";

const sidebarLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
    { href: "/admin/hackathons", label: "Hackathons", icon: Trophy },
    { href: "/admin/companies", label: "Companies", icon: Building2 },
    { href: "/admin/blogs", label: "Blogs", icon: FileText },
    { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-20 left-4 z-40 p-2 bg-white rounded-lg shadow-md border border-slate-200"
                aria-label="Open sidebar"
            >
                <Menu size={20} />
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/20 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 z-50 transition-all duration-300",
                    isCollapsed ? "w-16" : "w-64",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                        {!isCollapsed && (
                            <span className="font-semibold text-slate-900">Admin Panel</span>
                        )}
                        <button
                            onClick={() => {
                                if (window.innerWidth >= 1024) {
                                    setIsCollapsed(!isCollapsed);
                                } else {
                                    setIsMobileOpen(false);
                                }
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded-md"
                        >
                            {isMobileOpen ? <X size={18} /> : <ChevronLeft size={18} className={cn(isCollapsed && "rotate-180")} />}
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary-50 text-primary"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    )}
                                    title={isCollapsed ? link.label : undefined}
                                >
                                    <link.icon size={20} />
                                    {!isCollapsed && <span>{link.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-2 border-t border-slate-200">
                        <Link
                            href="/admin/settings"
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100",
                                isCollapsed && "justify-center"
                            )}
                        >
                            <Settings size={20} />
                            {!isCollapsed && <span>Settings</span>}
                        </Link>
                        <button
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100",
                                isCollapsed && "justify-center"
                            )}
                        >
                            <LogOut size={20} />
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default AdminSidebar;
