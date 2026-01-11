import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getSession();
        
        if (!session) {
            return NextResponse.json(
                { success: false, error: "Not authenticated" },
                { status: 401 }
            );
        }

        const jobId = params.id;
        const { answers } = await request.json();

        // Check if job exists and is active
        const job = await db.job.findUnique({
            where: { id: jobId },
        });

        if (!job || !job.isActive) {
            return NextResponse.json(
                { success: false, error: "Job not found or inactive" },
                { status: 404 }
            );
        }

        // Check if user already applied
        const existingApplication = await db.application.findUnique({
            where: {
                userId_jobId: {
                    userId: session.userId,
                    jobId: jobId,
                },
            },
        });

        if (existingApplication) {
            return NextResponse.json(
                { success: false, error: "You have already applied to this job" },
                { status: 409 }
            );
        }

        // Create application
        const application = await db.application.create({
            data: {
                userId: session.userId,
                jobId: jobId,
                status: "PENDING",
                answers: answers ? JSON.stringify(answers) : null,
            },
        });

        return NextResponse.json({
            success: true,
            application,
        });
    } catch (error) {
        console.error("Apply to job error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}