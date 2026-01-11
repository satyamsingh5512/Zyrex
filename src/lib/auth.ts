// JWT Authentication utilities
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "@/types";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "your-secret-key-min-32-chars-long!!"
);

const JWT_EXPIRES_IN = "7d";

export interface JWTPayload {
    userId: string;
    email: string;
    role: UserRole;
    [key: string]: unknown;
}

export async function signToken(payload: JWTPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(JWT_EXPIRES_IN)
        .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as JWTPayload;
    } catch {
        return null;
    }
}

export async function getSession(): Promise<JWTPayload | null> {
    const cookieStore = cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) return null;

    return verifyToken(token);
}

export async function requireAuth(): Promise<JWTPayload> {
    const session = await getSession();
    if (!session) {
        throw new Error("Unauthorized");
    }
    return session;
}

export async function requireAdmin(): Promise<JWTPayload> {
    const session = await requireAuth();
    if (session.role !== "ADMIN") {
        throw new Error("Forbidden: Admin access required");
    }
    return session;
}

export function setAuthCookie(token: string) {
    cookies().set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });
}

export function clearAuthCookie() {
    cookies().delete("auth-token");
}
