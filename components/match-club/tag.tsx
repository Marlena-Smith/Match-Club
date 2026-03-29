import { cn } from "@/lib/utils"

type TagVariant = "primary" | "secondary" | "accent" | "outline" | "muted"
type TagSize = "sm" | "md" | "lg"

interface TagProps {
  children: React.ReactNode
  variant?: TagVariant
  size?: TagSize
  className?: string
  onClick?: () => void
}

const variantStyles: Record<TagVariant, string> = {
  primary: "bg-[#F5B70A] text-[#1A1A1A]",
  secondary: "bg-[#0095B6] text-white",
  accent: "bg-[#AE322A] text-white",
  outline: "bg-transparent border-2 border-[#F5B70A] text-[#1A1A1A]",
  muted: "bg-[#F9F6E5] text-[#666666]",
}

// 中标签高度28px，圆角12px
const sizeStyles: Record<TagSize, string> = {
  sm: "text-[11px] px-2 h-5 rounded-lg",
  md: "text-[13px] px-3 h-7 rounded-xl",
  lg: "text-[16px] px-4 h-8 rounded-xl",
}

export function Tag({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        onClick && "cursor-pointer hover:opacity-80",
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
