"use client"

import { cn } from "@/lib/utils"

interface MatchPercentProps {
  percent: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

const sizeStyles = {
  sm: { container: "w-12 h-12", text: "text-[13px]", stroke: 3 },
  md: { container: "w-16 h-16", text: "text-[16px]", stroke: 4 },
  lg: { container: "w-24 h-24", text: "text-[20px]", stroke: 5 },
}

export function MatchPercent({
  percent,
  size = "md",
  showLabel = true,
  className,
}: MatchPercentProps) {
  const { container, text, stroke } = sizeStyles[size]
  const clampedPercent = Math.min(100, Math.max(0, percent))
  
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference

  const getColor = () => {
    if (clampedPercent >= 80) return "#F5B70A"
    if (clampedPercent >= 60) return "#0095B6"
    if (clampedPercent >= 40) return "#FF9800"
    return "#999999"
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className={cn("relative", container)}>
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#F9F6E5"
            strokeWidth={stroke}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold text-[#1A1A1A]", text)}>
            {clampedPercent}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className="text-[11px] text-[#999999]">匹配度</span>
      )}
    </div>
  )
}
