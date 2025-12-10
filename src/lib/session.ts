import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
    userId: string;
    role: string;
    expiresAt: Date;
};

export async function createSession(userId: string, role: string = "user") {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const session = await new SignJWT({ userId, role, expiresAt })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function decrypt(session: string | undefined = "") {
    if (!session) return null;
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as SessionPayload;
    } catch (error) {
        console.log("Failed to verify session");
        return null;
    }
}

export async function verifySession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    const sessionPayload = await decrypt(session);

    if (!sessionPayload?.userId) {
        return null;
    }

    return sessionPayload;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
