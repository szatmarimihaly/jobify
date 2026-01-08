import { db } from "@/db"
import { projects } from "@/db/schema";
import { eq, and } from "drizzle-orm"

export async function projectDetail(projectId : string, userId : string) {

    console.log("🔥 DB QUERY: fetching project", projectId, " for user ", userId);

    const project = await db.query.projects.findFirst({
        where: and(
            eq(projects.id, projectId),
            eq(projects.userId, userId)
        )
    })

    if(!project) {
        return null;
    }

    return {
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
  };
}