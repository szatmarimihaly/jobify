import { auth } from "../auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { user } from "@/auth-schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session?.user){
        return null;
    }

    const userData = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
        columns: {
            id: true,
            name: true,
            email: true,
            role: true,
            credits: true,
        }
    });

    return userData;
}

export function hasUnlimitedCredits(role : string): boolean {
    return role === "admin" || role === "tester"
}

