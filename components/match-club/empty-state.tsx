import { cn } from "@/lib/utils"
import { MCButton } from "./mc-button"
import { Search, Heart, MessageCircle, Users, FileQuestion } from "lucide-react"

type EmptyStateType = "no-result" | "no-favorites" | "no-messages" | "no-members" | "default"

interface EmptyStateProps {
  type?: EmptyStateType
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const defaultContent: Record<EmptyStateType, { icon: React.ElementType; title: string; description: string }> = {
  "no-result": {
    icon: Search,
    title: "暂无匹配结果",
    description: "试试调整你的偏好设置，发现更多社团",
  },
  "no-favorites": {
    icon: Heart,
    title: "还没有收藏",
    description: "浏览社团时点击收藏，喜欢的社团都会出现在这里",
  },
  "no-messages": {
    icon: MessageCircle,
    title: "暂无消息",
    description: "申请加入社团后，消息会在这里显示",
  },
  "no-members": {
    icon: Users,
    title: "还没有新成员",
    description: "同意入社申请后，新成员会出现在这里",
  },
  "default": {
    icon: FileQuestion,
    title: "这里空空如也",
    description: "暂时没有内容",
  },
}

export function EmptyState({
  type = "default",
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const content = defaultContent[type]
  const Icon = content.icon

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
    >
      <div className="w-20 h-20 rounded-full bg-[#F9F6E5] flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-[#999999]" />
      </div>
      <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">
        {title || content.title}
      </h3>
      <p className="text-[16px] text-[#666666] max-w-xs">
        {description || content.description}
      </p>
      {actionLabel && onAction && (
        <MCButton
          variant="primary"
          size="md"
          onClick={onAction}
          className="mt-6"
        >
          {actionLabel}
        </MCButton>
      )}
    </div>
  )
}
