"use client"

interface ScoreBadgeProps {
  score: number | null
  size?: "sm" | "md" | "lg"
}

export default function ScoreBadge({ score, size = "md" }: ScoreBadgeProps) {

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return { container: "w-16 h-16", text: "text-sm", svg: 64, strokeWidth: 4 }
      case "lg":
        return { container: "w-28 h-28", text: "text-3xl", svg: 112, strokeWidth: 6 }
      default:
        return { container: "w-20 h-20", text: "text-xl", svg: 80, strokeWidth: 5 }
    }
  }

  const sizes = getSizeClasses()

  /* 🔴 NULL STATE */
  if (score === null) {
    return (
      <div
        className={`flex items-center justify-center ${sizes.container} rounded-full border-2 border-gray-600 text-gray-400 font-medium`}
      >
        N/A
      </div>
    )
  }

  /* 🟢 SCORE STATE */
  const validScore = Math.min(100, Math.max(0, score))

  const getColor = () => {
    if (validScore <= 39) return { stroke: "#ef4444", text: "text-red-500" }
    if (validScore <= 79) return { stroke: "#facc15", text: "text-yellow-400" }
    return { stroke: "#22c55e", text: "text-green-500" }
  }

  const color = getColor()
  const radius = (sizes.svg - sizes.strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (validScore / 100) * circumference

  return (
    <div className={`relative ${sizes.container} flex items-center justify-center`}>
      <svg
        className="absolute -rotate-90 transition-all duration-500"
        width={sizes.svg}
        height={sizes.svg}
      >
        <circle
          cx={sizes.svg / 2}
          cy={sizes.svg / 2}
          r={radius}
          strokeWidth={sizes.strokeWidth}
          fill="none"
          className="text-gray-700/30"
          stroke="currentColor"
        />
        <circle
          cx={sizes.svg / 2}
          cy={sizes.svg / 2}
          r={radius}
          stroke={color.stroke}
          strokeWidth={sizes.strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>

      <span className={`z-10 font-bold ${sizes.text} ${color.text}`}>
        {validScore}%
      </span>
    </div>
  )
}
