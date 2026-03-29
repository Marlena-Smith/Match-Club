import { cn } from "@/lib/utils"

interface MCCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

// 大卡片圆角12px
const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
}

export function MCCard({
  children,
  className,
  onClick,
  hoverable = false,
  padding = "md",
}: MCCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-[#E5E5E5]",
        paddingStyles[padding],
        hoverable && "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

interface MCCardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function MCCardHeader({ children, className }: MCCardHeaderProps) {
  return (
    <div className={cn("mb-3", className)}>
      {children}
    </div>
  )
}

interface MCCardTitleProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
}

export function MCCardTitle({ children, className, as: Tag = "h3" }: MCCardTitleProps) {
  return (
    <Tag className={cn("text-[20px] font-semibold text-[#1A1A1A]", className)}>
      {children}
    </Tag>
  )
}

interface MCCardContentProps {
  children: React.ReactNode
  className?: string
}

export function MCCardContent({ children, className }: MCCardContentProps) {
  return (
    <div className={cn("text-[16px] text-[#666666]", className)}>
      {children}
    </div>
  )
}

interface MCCardFooterProps {
  children: React.ReactNode
  className?: string
}

export function MCCardFooter({ children, className }: MCCardFooterProps) {
  return (
    <div className={cn("mt-4 flex items-center gap-3", className)}>
      {children}
    </div>
  )
}

// 内部卡片组件，圆角8px
interface MCInnerCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function MCInnerCard({ children, className, onClick }: MCInnerCardProps) {
  return (
    <div
      className={cn(
        "bg-[#F9F6E5] rounded-lg p-3",
        onClick && "cursor-pointer hover:bg-[#F5B70A]/10 transition-colors",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
