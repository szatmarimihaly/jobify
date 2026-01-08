import ProjectDetail from "@/components/ui/Display/ProjectDetail";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { redirect } from "next/navigation";
import { projectDetail } from "@/lib/queries/projectDetail";


interface PageProps {
    params : { projectId : string }
}

export default async function({ params } : PageProps) {

    const { projectId } = await params;
    const user = await getCurrentUser();

    if(!user) {
        redirect("/sign-in")
    }

    const project = await projectDetail(projectId, user.id);

    if(!project) {
        redirect("/dashboard/projects")
    }

  return (
    <main className="flex flex-col items-center mt-10">
        <div className="px-2 flex flex-col items-center justify-center">
            <ProjectDetail project={project}/>
        </div>
    </main>
  )
}
