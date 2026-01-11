"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch("/api/auth/me");
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return {
        user,
        loading,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
    };
}