import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession, requireAdmin } from "@/lib/auth";
import type { JobType } from "@/types";

export const dynamic = 'force-dynamic';

// GET /api/jobs - List jobs with filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const type = searchParams.get("type") as JobType | null;
        const isPremium = searchParams.get("premium") === "true";
        const isPPO = searchParams.get("ppo") === "true";
        const skills = searchParams.get("skills")?.split(",").filter(Boolean);
        const page = parseInt(searchParams.get("page") || "1");
        const pageSize = parseInt(searchParams.get("pageSize") || "10");

        const where: Record<string, unknown> = {
            isActive: true,
            deadline: { gte: new Date() },
        };

        if (type) where.type = type;
        if (isPPO) where.isPPO = true;
        if (isPremium) {
            where.company = { isPremium: true };
        }
        // Note: SQLite doesn't support array operations like hasSome
        // We'll filter skills in JavaScript for now

        const [jobs, total] = await Promise.all([
            db.job.findMany({
                where,
                include: {
                    company: {
                        select: {
                            id: true,
                            name: true,
                            logoUrl: true,
                            isPremium: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            db.job.count({ where }),
        ]);

        // Parse JSON strings for SQLite and filter by skills if needed
        let parsedJobs = jobs.map(job => ({
            ...job,
            techStack: JSON.parse(job.techStack || "[]"),
        }));

        // Filter by skills in JavaScript (since SQLite doesn't support array operations)
        if (skills && skills.length > 0) {
            parsedJobs = parsedJobs.filter(job => 
                skills.some(skill => job.techStack.includes(skill))
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                jobs: parsedJobs,
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        });
            db.job.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                items: jobs,
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (error) {
        console.error("Get jobs error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST /api/jobs - Create job (Admin only)
export async function POST(request: NextRequest) {
    try {
        await requireAdmin();

        const body = await request.json();
        const {
            companyId,
            title,
            type,
            location,
            stipend,
            duration,
            techStack,
            prepGuide,
            deadline,
            applyLink,
            isInternalApply,
            isPPO,
        } = body;

        if (!companyId || !title || !location || !deadline) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        const job = await db.job.create({
            data: {
                companyId,
                title,
                type: type || "INTERNSHIP",
                location,
                stipend: stipend || 0,
                duration,
                techStack: techStack || [],
                prepGuide,
                deadline: new Date(deadline),
                applyLink,
                isInternalApply: isInternalApply ?? true,
                isPPO: isPPO ?? false,
            },
            include: {
                company: true,
            },
        });

        return NextResponse.json({
            success: true,
            data: job,
        }, { status: 201 });
    } catch (error) {
        if ((error as Error).message === "Unauthorized") {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }
        if ((error as Error).message.includes("Admin")) {
            return NextResponse.json(
                { success: false, error: "Forbidden" },
                { status: 403 }
            );
        }
        console.error("Create job error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
