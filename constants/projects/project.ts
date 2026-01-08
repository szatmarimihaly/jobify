export type ProjectStatus =
  | "draft"
  | "processing"
  | "completed"
  | "failed";

export type ExperienceLevel =
  | "entry"
  | "mid"
  | "senior"
  | "lead"
  | "executive";

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
  lead: "Lead Level",
  executive: "Executive Level",
};

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  draft: "Draft",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

export const STATUS_COLORS: Record<ProjectStatus, string> = {
  draft: "bg-gray-400",
  processing: "bg-yellow-400",
  completed: "bg-green-500",
  failed: "bg-red-500",
};