import { STATUS_COLORS, STATUS_LABELS, ProjectStatus } from "@/constants/projects/project"

interface StatusBadgeProps {
  status: ProjectStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const color = STATUS_COLORS[status] ?? "bg-gray-400";
  const label = STATUS_LABELS[status] ?? status;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-300 border-2 border-gray-200/30 px-4 py-2 rounded">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{label}</span>
    </div>
  );
};

export default StatusBadge;