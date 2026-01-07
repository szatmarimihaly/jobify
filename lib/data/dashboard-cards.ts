
export const DASHBOARD_CARDS = [
  {
    id : 1,
    title : "Create your project",
    description : "After creating your project, you can upload your resume to the system, so you can get an evaluation from the system, for the job you wanna apply to.",
    href:"/dashboard/projects"
  },
  {
    id : 2,
    title : "Live Interview",
    description : "Here you prepare for the live interview, you can practice with the AI powered system, to get ready for the application interview, what you wanna enroll.",
    href:"/dashboard/live-interview"
  }
]

export type DashboardCard = typeof DASHBOARD_CARDS[number];