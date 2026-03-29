"use client"

import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeStyles = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-[3px]",
  lg: "w-12 h-12 border-4",
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "rounded-full border-[#F9F6E5] border-t-[#F5B70A] animate-spin",
        sizeStyles[size],
        className
      )}
    />
  )
}

interface LoadingOverlayProps {
  message?: string
  className?: string
}

export function LoadingOverlay({ message = "加载中...", className }: LoadingOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-[#F9F6E5]/80 backdrop-blur-sm",
        className
      )}
    >
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-[16px] text-[#666666]">{message}</p>
    </div>
  )
}

interface MatchingAnimationProps {
  className?: string
}

export function MatchingAnimation({ className }: MatchingAnimationProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-[#F9F6E5]",
        className
      )}
    >
      <div className="relative w-32 h-32 mb-8">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "absolute w-12 h-6 rounded-full",
              "flex items-center justify-center text-[11px] text-white font-medium",
              i % 3 === 0 ? "bg-[#F5B70A]" : i % 3 === 1 ? "bg-[#0095B6]" : "bg-[#AE322A]"
            )}
            style={{
              animation: `float-tag-${i} 2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              left: `${20 + i * 12}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
          >
            {["体育", "艺术", "学术", "技术", "社交"][i]}
          </div>
        ))}
      </div>
      <h3 className="text-[28px] font-semibold text-[#1A1A1A] mb-2">正在匹配中</h3>
      <p className="text-[16px] text-[#666666]">为你寻找最合适的社团...</p>
      
      <div className="w-48 h-2 bg-[#F9F6E5] rounded-full mt-6 overflow-hidden border border-[#E5E5E5]">
        <div
          className="h-full bg-[#F5B70A] rounded-full animate-pulse"
          style={{
            animation: "progress-grow 2s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float-tag-0 {
          0%, 100% { transform: translate(0, 0) rotate(-5deg); }
          50% { transform: translate(10px, -15px) rotate(5deg); }
        }
        @keyframes float-tag-1 {
          0%, 100% { transform: translate(0, 0) rotate(3deg); }
          50% { transform: translate(-15px, 10px) rotate(-8deg); }
        }
        @keyframes float-tag-2 {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(8px, 12px) rotate(6deg); }
        }
        @keyframes float-tag-3 {
          0%, 100% { transform: translate(0, 0) rotate(4deg); }
          50% { transform: translate(-10px, -8px) rotate(-4deg); }
        }
        @keyframes float-tag-4 {
          0%, 100% { transform: translate(0, 0) rotate(-3deg); }
          50% { transform: translate(12px, 8px) rotate(7deg); }
        }
        @keyframes progress-grow {
          0% { width: 0%; }
          50% { width: 80%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-[#F9F6E5] rounded-lg animate-pulse",
        className
      )}
    />
  )
}

export function ClubCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 border border-[#E5E5E5]">
      <div className="flex items-start gap-4">
        <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
