import Link from "next/link"
import StatusBadge from "../Design/StatusBadge";
import { EXPERIENCE_LABELS } from "@/constants/projects/project";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project } : ProjectCardProps) => {

    const statusColors = {
        draft : "bg-gray-100",
        processing : "bg-yellow-100",
        completed : "bg-green-100",
        failed : "bg-red-100"
    };

  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="group block bg-[#1d1d1d] border border-gray-200/10 rounded-xl p-5 hover:border-gray-200/20 shadow-[0_0_20px_rgba(229,231,235,0.1)] hover:shadow-[0_0_20px_rgba(229,231,235,0.3)] animation"
    >
      <div className="w-full flex items-center justify-between">
        <h3>{project.name}</h3>
        {project.experienceLevel && (
          <p className="border-2 border-gray-200/30 px-4 py-2 rounded">{EXPERIENCE_LABELS[project.experienceLevel] ?? project.experienceLevel}</p>
        )}
      </div>

      <h4 className="text-center text-3xl mt-4 bg-linear-to-r from-teal-500 to-blue-300 bg-clip-text text-transparent">{project.jobTitle}</h4>

      <div className="text-sm flex items-center mt-10 justify-between">
        <StatusBadge status={project.status}/>
        <p className="text-gray-400">{project.createdAt.toLocaleDateString()}</p>
      </div>
    </Link>
  )
}

export default ProjectCard