import { ExperienceLevel, ProjectStatus } from "@/constants/projects/project";

export interface Project {
  id: string;
  name: string;
  jobTitle: string;
  experienceLevel: ExperienceLevel | null;
  latestScore: number | null;
  createdAt: string;
  status: ProjectStatus;
}