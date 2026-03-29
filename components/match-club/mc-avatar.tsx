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

// 头像尺寸样式映射
const sizeStyles = {
  xs: { container: "w-6 h-6", text: "text-[11px]", pixels: 24 },
  sm: { container: "w-8 h-8", text: "text-[13px]", pixels: 32 },
  md: { container: "w-12 h-12", text: "text-[16px]", pixels: 48 },
  lg: { container: "w-16 h-16", text: "text-[20px]", pixels: 64 },
  xl: { container: "w-20 h-20", text: "text-[24px]", pixels: 80 },
  "2xl": { container: "w-24 h-24", text: "text-[28px]", pixels: 96 },
} as const

// 默认样式
const defaultStyle = { container: "w-12 h-12", text: "text-[16px]", pixels: 48 }

// 安全获取样式的函数
function getSizeStyle(size: string | undefined) {
  if (!size) return defaultStyle
  if (size in sizeStyles) {
    return sizeStyles[size as keyof typeof sizeStyles]
  }
  return defaultStyle
}

export function MCAvatar({
  src,
  alt = "头像",
  size = "md",
  fallback,
  className,
  onClick,
}: MCAvatarProps) {
  const { container, text, pixels } = getSizeStyle(size)
  
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
