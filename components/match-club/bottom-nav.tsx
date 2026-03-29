"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, Heart, User, FileText, Image, Users } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

// 学生端导航项
const studentNavItems: NavItem[] = [
  { label: "首页", href: "/student", icon: Home },
  { label: "浏览", href: "/student/browse", icon: Compass },
  { label: "收藏", href: "/student/favorites", icon: Heart },
  { label: "我的", href: "/student/profile", icon: User },
]

// 社团端导航项
const clubNavItems: NavItem[] = [
  { label: "首页", href: "/club", icon: Home },
  { label: "问卷", href: "/club/survey", icon: FileText },
  { label: "海报", href: "/club/poster", icon: Image },
  { label: "新人", href: "/club/newcomers", icon: Users },
]

interface BottomNavProps {
  type: "student" | "club"
  className?: string
}

export function BottomNav({ type, className }: BottomNavProps) {
  const pathname = usePathname()
  const navItems = type === "student" ? studentNavItems : clubNavItems

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-white border-t border-[#E5E5E5]",
        className
      )}
    >
      <div className="max-w-[390px] mx-auto">
        <div className="flex items-center justify-around h-14 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center flex-1 h-full",
                  "transition-colors duration-200",
                  isActive ? "text-[#F5B70A]" : "text-[#999999] hover:text-[#666666]"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 mb-0.5 transition-transform",
                    isActive && "scale-105"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={cn(
                    "text-[11px]",
                    isActive && "font-semibold"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// 添加底部导航栏时页面内容的安全区域
export function BottomNavSpacer() {
  return <div className="h-14" />
}
