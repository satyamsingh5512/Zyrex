import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const slug = params.slug;

        const blog = await db.blog.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!blog || !blog.publishedAt) {
            return NextResponse.json(
                { success: false, error: "Blog post not found" },
                { status: 404 }
            );
        }

        // Parse JSON fields for SQLite
        const parsedBlog = {
            ...blog,
            tags: JSON.parse(blog.tags || "[]"),
        };

        return NextResponse.json({
            success: true,
            blog: parsedBlog,
        });
    } catch (error) {
        console.error("Get blog error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}