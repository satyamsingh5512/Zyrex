import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signToken, setAuthCookie } from "@/lib/auth";

interface DBUser {
    id: string;
    email: string;
    password: string;
    name?: string;
    role: "USER" | "ADMIN" | "COMPANY";
}

// POST /api/auth/register
export async function POST(request: NextRequest) {
    try {
        const { email, password, name } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "User already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: "USER",
                skills: [],
            },
        }) as unknown as DBUser;

        // Generate token
        const token = await signToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });

        // Set cookie
        setAuthCookie(token);

        return NextResponse.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
