"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface MCAvatarProps {
  src?: string | null
  alt?: string
  size?: AvatarSize
  fallback?: string
  className?: string
  onClick?: () => void
}

// 头像尺寸样式映射 - 确保头像是正圆形
const sizeStyles: Record<AvatarSize, { container: string; text: string; pixels: number }> = {
  xs: { container: "w-6 h-6", text: "text-[11px]", pixels: 24 },
  sm: { container: "w-8 h-8", text: "text-[13px]", pixels: 32 },
  md: { container: "w-12 h-12", text: "text-[16px]", pixels: 48 },
  lg: { container: "w-16 h-16", text: "text-[20px]", pixels: 64 },
  xl: { container: "w-20 h-20", text: "text-[24px]", pixels: 80 },
  "2xl": { container: "w-24 h-24", text: "text-[28px]", pixels: 96 },
}

export function MCAvatar({
  src,
  alt = "头像",
  size = "md",
  fallback,
  className,
  onClick,
}: MCAvatarProps) {
  // 安全获取尺寸样式 - 始终使用默认值防止 undefined
  const defaultStyle = { container: "w-12 h-12", text: "text-[16px]", pixels: 48 }
  const currentStyle = (size && typeof size === "string" && sizeStyles[size as AvatarSize]) 
    ? sizeStyles[size as AvatarSize] 
    : defaultStyle
  const { container, text, pixels } = currentStyle
  
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase()
  }
  
  const initials = fallback ? getInitials(fallback) : alt ? getInitials(alt) : "?"

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center flex-shrink-0",
        "rounded-full bg-[#F5B70A]/20 border-2 border-white",
        container,
        onClick && "cursor-pointer hover:border-[#F5B70A] transition-all",
        className
      )}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={pixels}
          height={pixels}
          className="object-cover w-full h-full rounded-full"
        />
      ) : (
        <span className={cn("font-semibold text-[#F5B70A]", text)}>
          {initials}
        </span>
      )}
    </div>
  )
}
