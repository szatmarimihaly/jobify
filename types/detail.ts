import { ExperienceLevel, ProjectStatus } from "@/constants/projects/project";

export interface ProjectDetail {
    id: string,
    name: string,
    status: ProjectStatus
}