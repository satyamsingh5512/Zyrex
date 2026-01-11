import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const page = parseInt(searchParams.get("page") || "1");
        const pageSize = parseInt(searchParams.get("pageSize") || "10");

        const where: Record<string, unknown> = {
            publishedAt: { not: null },
        };

        // Filter by category if provided
        if (category && category !== "All") {
            // For now, we'll use a simple text search in tags
            // In a real app, you might have a separate categories table
            where.tags = { contains: category.toLowerCase() };
        }

        const [blogs, total] = await Promise.all([
            db.blog.findMany({
                where,
                include: {
                    author: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { publishedAt: "desc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            db.blog.count({ where }),
        ]);

        // Parse JSON fields for SQLite
        const parsedBlogs = blogs.map(blog => ({
            ...blog,
            tags: JSON.parse(blog.tags || "[]"),
        }));

        return NextResponse.json({
            success: true,
            data: {
                blogs: parsedBlogs,
                total,
                page,
                pageSize,
                totalPages: Math.ceil(total / pageSize),
            },
        });
    } catch (error) {
        console.error("Get blogs error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}