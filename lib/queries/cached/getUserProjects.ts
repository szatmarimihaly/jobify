import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const getUserProjects = (userId: string) =>
  unstable_cache(
    async () => {

        //FOR CACHING TEST
        console.log("🔥 DB QUERY: fetching projects for", userId);

      const rows = await db.query.projects.findMany({
        where: eq(projects.userId, userId),
        orderBy: [desc(projects.createdAt)],
      });

      // 🔥 convert Date → string ONCE
      return rows.map((p) => ({
        ...p,
        createdAt: p.createdAt.toISOString(),
      }));
    },
    ["user-projects", userId],
    {
      tags: [`user-projects-${userId}`],
    }
  )();