"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteProject(projectId : string){
    const user = await getCurrentUser();

    if(!user) {
        redirect("/sign-in")
    }

    await db.delete(projects).where(and(
        eq(projects.id, projectId),
        eq(projects.userId, user.id)
    ))

    revalidateTag(`user-projects-${user.id}`, "default");

    //VALIDATION
    console.log("🔥 Project deleted successfully! Re-caching now!");
    redirect("/dashboard/projects");
}