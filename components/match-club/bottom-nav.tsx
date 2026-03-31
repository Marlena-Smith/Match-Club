"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Compass, User, Inbox, Building2, Activity } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

// 学生端导航项 - 3个tab：百团大战、个人画像、我的
const studentNavItems: NavItem[] = [
  { label: "百团大战", href: "/student", icon: Home },
  { label: "个人画像", href: "/student/survey", icon: Compass },
  { label: "我的", href: "/student/profile", icon: User },
]

// 社团端导航项 - 3个tab：消息管理、社团主页、数据中心
const clubNavItems: NavItem[] = [
  { label: "消息管理", href: "/club", icon: Inbox },
  { label: "社团主页", href: "/club/home", icon: Building2 },
  { label: "数据中心", href: "/club/data", icon: Activity },
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
