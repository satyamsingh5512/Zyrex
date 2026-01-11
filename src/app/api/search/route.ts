import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.toLowerCase() || "";
        
        if (!query || query.length < 2) {
            return NextResponse.json({
                success: true,
                data: { jobs: [], companies: [], events: [], blogs: [] },
            });
        }

        // Search jobs
        const jobs = await db.job.findMany({
            where: {
                isActive: true,
                OR: [
                    { title: { contains: query } },
                    { location: { contains: query } },
                ],
            },
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
            take: 5,
        });

        // Search companies
        const companies = await db.company.findMany({
            where: {
                name: { contains: query },
            },
            take: 5,
        });

        // Search events
        const events = await db.event.findMany({
            where: {
                isActive: true,
                OR: [
                    { title: { contains: query } },
                    { description: { contains: query } },
                ],
            },
            include: {
                company: {
                    select: {
                        id: true,
                        name: true,
                        logoUrl: true,
                    },
                },
            },
            take: 5,
        });

        // Search blogs
        const blogs = await db.blog.findMany({
            where: {
                publishedAt: { not: null },
                OR: [
                    { title: { contains: query } },
                    { content: { contains: query } },
                ],
            },
            select: {
                id: true,
                title: true,
                slug: true,
                excerpt: true,
                coverImage: true,
                publishedAt: true,
            },
            take: 5,
        });

        // Parse JSON fields for SQLite
        const parsedJobs = jobs.map(job => ({
            ...job,
            techStack: JSON.parse(job.techStack || "[]"),
        }));

        const parsedEvents = events.map(event => ({
            ...event,
            rounds: JSON.parse(event.rounds || "[]"),
        }));

        return NextResponse.json({
            success: true,
            data: {
                jobs: parsedJobs,
                companies,
                events: parsedEvents,
                blogs,
            },
        });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json(
            { success: false, error: "Search failed" },
            { status: 500 }
        );
    }
}