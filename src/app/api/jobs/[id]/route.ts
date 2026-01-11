import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const jobId = params.id;
        const session = await getSession();

        const job = await db.job.findUnique({
            where: { id: jobId },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                        isPremium: true,
                        website: true,
                        description: true,
                    },
                },
            },
        });

        if (!job) {
            return NextResponse.json(
                { success: false, error: "Job not found" },
                { status: 404 }
            );
        }

        // Check if user has applied (if authenticated)
        let hasApplied = false;
        if (session) {
            const application = await db.application.findUnique({
                where: {
                    userId_jobId: {
                        userId: session.userId,
                        jobId: jobId,
                    },
                },
            });
            hasApplied = !!application;
        }

        // Parse JSON fields for SQLite
        const parsedJob = {
            ...job,
            techStack: JSON.parse(job.techStack || "[]"),
            hasApplied,
        };

        return NextResponse.json({
            success: true,
            job: parsedJob,
        });
    } catch (error) {
        console.error("Get job error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}