"use server";

import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { createSession, deleteSession, verifySession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        console.log("[Auth] Missing credentials");
        return { error: "Email and password are required" };
    }

    try {
        console.log(`[Auth] Attempting login for: ${email}`);
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.log("[Auth] User not found");
            return { error: "Invalid credentials" };
        }

        const isValidPassword = await compare(password, user.password);
        console.log(`[Auth] Password valid: ${isValidPassword}`);

        if (!isValidPassword) {
            console.log("[Auth] Invalid password");
            return { error: "Invalid credentials" };
        }

        // Create session
        console.log("[Auth] Creating session");
        await createSession(user.id, user.role);

    } catch (error) {
        console.error("Login error:", error);
        return { error: "Something went wrong" };
    }

    revalidatePath("/admin");
    redirect("/admin/dashboard");
}

export async function logout() {
    await deleteSession();
    redirect("/admin");
}

export async function createInitialUser() {
    const email = "zerolesignbeats@gmail.com";
    const password = "admin_password_placeholder";

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        const hashedPassword = await hash("654321", 10);
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: "Redbrush Admin",
                role: "admin",
            },
        });
        console.log("Initial admin user created.");
    } else {
        console.log("Admin user already exists.");
    }
}

export async function getAuthSession() {
    const session = await verifySession();
    if (!session) return null;
    return session;
}
