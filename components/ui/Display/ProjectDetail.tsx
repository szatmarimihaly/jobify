import DeleteProject from "../Button/DeleteProject"
import RoundedItem from "../Design/RoundedItem"
import ScoreBadge from "../Design/Score/ScoreBadge"
import { EXPERIENCE_LABELS } from "@/constants/projects/project"

interface ProjectDetail {
  project: {
    id: string,
    name: string,
    updatedAt: string,
    jobTitle: string,
    jobDescription: string,
    latestScore: number | null,
    experienceLevel: string
  }
}

export default async function ProjectDetail({ project }: ProjectDetail) {
  return (
    <div className="flex flex-col items-center bg-[#1d1d1d] border border-gray-200/10 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-gray-200/20 shadow-[0_0_20px_rgba(229,231,235,0.1)] hover:shadow-[0_0_30px_rgba(229,231,235,0.3)] transition-all duration-300 mt-6 sm:mt-10 mx-2 sm:mx-4 w-full max-w-5xl">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-4 w-full">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-semibold leading-tight bg-linear-to-r from-teal-500 to-blue-400 bg-clip-text text-transparent">
          {project.name}
        </h2>

        {/* Date Badge */}
        <RoundedItem text={new Date(project.updatedAt).toLocaleDateString()} />
      </div>

      {/* Content Grid - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mt-6 sm:mt-8 lg:mt-10 w-full">
        {/* Left Column - Job Details */}
        <div className="flex flex-col gap-4 sm:gap-5 order-2 lg:order-1">
          <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/40 transition-colors duration-200">
            <p className="text-xs sm:text-sm text-gray-400 mb-1.5 uppercase tracking-wider">Job Title</p>
            <p className="font-medium text-base sm:text-lg text-gray-100">{project.jobTitle}</p>
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/30 hover:border-gray-600/40 transition-colors duration-200">
            <p className="text-xs sm:text-sm text-gray-400 mb-1.5 uppercase tracking-wider">Experience Level</p>
            <p className="font-medium text-base sm:text-lg text-gray-100">{project.experienceLevel.toUpperCase()}</p>
          </div>
        </div>

        {/* Right Column - Score Badge */}
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 order-1 lg:order-2 bg-gray-900/30 rounded-lg p-6 sm:p-8 border border-gray-700/20">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider font-medium mb-2">Latest Match Score</p>
          <div className="scale-110 sm:scale-125 lg:scale-150">
            <ScoreBadge score={project.latestScore} size="md" />
          </div>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="mt-6 sm:mt-8 lg:mt-10 w-full bg-gray-900/30 rounded-lg p-4 sm:p-6 border border-gray-700/20">
        <p className="text-xs sm:text-sm text-gray-400 mb-3 uppercase tracking-wider font-medium">Job Description</p>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed whitespace-pre-wrap">
          {project.jobDescription}
        </p>
      </div>

      {/* Action Button */}
      <div className="w-full flex justify-center sm:justify-end mt-6 sm:mt-8">
        <DeleteProject projectId={project.id} />
      </div>
    </div>
  )
}