import ProjectCard from "../Card/ProjectCard";
import { Project } from "@/types/project";

interface ProjectDisplayProps {
  projects: Project[];
}

const ProjectDisplay = ({ projects }: ProjectDisplayProps) => {
  if (!projects.length) {
    return (
      <div className="py-16 text-center text-gray-400">
        <p className="text-lg">No projects found.</p>
        <p className="mt-2 text-sm">
          Create your first project to start training 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-20 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectDisplay;
