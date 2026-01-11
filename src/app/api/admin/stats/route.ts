import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
    try {
        await requireAdmin();

        // Get counts
        const [
            totalJobs,
            activeJobs,
            totalApplications,
            totalUsers,
            totalCompanies,
            totalEvents,
            recentApplications,
        ] = await Promise.all([
            db.job.count(),
            db.job.count({ where: { isActive: true } }),
            db.application.count(),
            db.user.count({ where: { role: "USER" } }),
            db.company.count(),
            db.event.count({ where: { isActive: true } }),
            db.application.findMany({
                take: 10,
                orderBy: { submittedAt: "desc" },
                include: {
                    job: {
                        select: {
                            title: true,
                            company: {
                                select: { name: true },
                            },
                        },
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
        ]);

        // Calculate today's applications
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayApplications = await db.application.count({
            where: {
                submittedAt: { gte: today },
            },
        });

        return NextResponse.json({
            success: true,
            stats: {
                totalJobs,
                activeJobs,
                totalApplications,
                todayApplications,
                totalUsers,
                totalCompanies,
                totalEvents,
            },
            recentApplications,
        });
    } catch (error) {
        console.error("Admin stats error:", error);
        return NextResponse.json(
            { success: false, error: "Unauthorized or server error" },
            { status: error instanceof Error && error.message === "Unauthorized" ? 401 : 500 }
        );
    }
}