"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Users, Trophy, TrendingUp, Eye, Clock, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui";

interface Stats {
    totalJobs: number;
    activeJobs: number;
    totalApplications: number;
    todayApplications: number;
    totalUsers: number;
    totalCompanies: number;
    totalEvents: number;
}

interface RecentApplication {
    id: string;
    submittedAt: string;
    job: {
        title: string;
        company: {
            name: string;
        };
    };
    user: {
        name?: string;
        email: string;
    };
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/admin/stats");
            const data = await response.json();

            if (data.success) {
                setStats(data.stats);
                setRecentApplications(data.recentApplications);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">Loading...</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <Card key={i}>
                            <CardContent className="p-5">
                                <div className="h-20 bg-muted animate-pulse rounded" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const statsCards = stats ? [
        { 
            label: "Active Jobs", 
            value: stats.activeJobs.toString(), 
            total: stats.totalJobs,
            icon: Briefcase, 
            color: "text-primary" 
        },
        { 
            label: "Applications Today", 
            value: stats.todayApplications.toString(), 
            total: stats.totalApplications,
            icon: Users, 
            color: "text-accent" 
        },
        { 
            label: "Active Events", 
            value: stats.totalEvents.toString(), 
            total: stats.totalEvents,
            icon: Trophy, 
            color: "text-secondary" 
        },
        { 
            label: "Total Users", 
            value: stats.totalUsers.toString(), 
            total: stats.totalUsers,
            icon: Eye, 
            color: "text-muted-foreground" 
        },
    ] : [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat) => (
                    <Card key={stat.label}>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                                    {stat.total !== stat.value && (
                                        <p className="text-xs text-muted-foreground mt-1">
                                            of {stat.total} total
                                        </p>
                                    )}
                                </div>
                                <div className={`p-3 bg-muted rounded-xl ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock size={20} className="text-muted-foreground" />
                        Recent Applications
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {recentApplications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No recent applications
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentApplications.map((application) => (
                                <div
                                    key={application.id}
                                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                New application
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {application.job.title} at {application.job.company.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                by {application.user.name || application.user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(application.submittedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/jobs/create">
                    <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-primary">
                        <div className="flex items-center gap-3">
                            <Briefcase className="text-primary" size={24} />
                            <div>
                                <p className="font-semibold text-foreground">Post a Job</p>
                                <p className="text-xs text-muted-foreground">Create new opportunity</p>
                            </div>
                        </div>
                    </Card>
                </Link>
                <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-secondary">
                    <div className="flex items-center gap-3">
                        <Trophy className="text-secondary" size={24} />
                        <div>
                            <p className="font-semibold text-foreground">Create Hackathon</p>
                            <p className="text-xs text-muted-foreground">Host a new event</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-accent">
                    <div className="flex items-center gap-3">
                        <Users className="text-accent" size={24} />
                        <div>
                            <p className="font-semibold text-foreground">View Applications</p>
                            <p className="text-xs text-muted-foreground">Review candidates</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
