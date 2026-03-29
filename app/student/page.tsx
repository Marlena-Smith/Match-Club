"use client"

import { MCButton } from "@/components/match-club/mc-button"
import { BottomNav, BottomNavSpacer } from "@/components/match-club/bottom-nav"
import { StatusBar } from "@/components/match-club/status-bar"
import { Bell } from "lucide-react"
import Link from "next/link"

export default function StudentHomePage() {
  // 模拟登录状态
  const isLoggedIn = false
  const userName = "小明"

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col overflow-hidden font-['PingFang_SC',_-apple-system,_sans-serif]">
      {/* 手机框架容器 */}
      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col relative">
        {/* 状态栏 */}
        <StatusBar />

        {/* 顶部区域 - 消息和头像 */}
        <header className="px-4 py-4 flex items-start justify-between relative z-10">
          {/* 左侧消息入口 */}
          <Link href="/student/messages" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded bg-[#F5B70A]/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#F5B70A]" />
            </div>
            <span className="text-[13px] text-[#666666]">消息</span>
          </Link>

          {/* 右侧头像和登录 */}
          <Link href={isLoggedIn ? "/student/profile" : "/login"} className="flex flex-col items-center gap-1">
            <div className="w-20 h-20 rounded-full bg-[#F0F0F0] border-2 border-[#E5E5E5] flex items-center justify-center text-[24px] font-medium text-[#666666]">
              {isLoggedIn ? userName.slice(0, 2) : "?"}
            </div>
            <span className="text-[13px] text-[#666666]">
              {isLoggedIn ? userName : "登录"}
            </span>
          </Link>
        </header>

        {/* 中间插图区域 */}
        <div className="flex-1 relative">
          {/* 背景装饰 - 可以替换为实际插图 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-[#F5B70A]/10" />
          </div>
          
          {/* 底部白色弧形区域 */}
          <div className="absolute bottom-0 left-0 right-0">
            {/* 弧形背景 */}
            <div 
              className="h-80 bg-white"
              style={{
                borderTopLeftRadius: "50% 60px",
                borderTopRightRadius: "50% 60px",
              }}
            >
              {/* 按钮区域 */}
              <div className="pt-16 px-16 flex flex-col gap-4">
                <Link href="/student/survey">
                  <MCButton 
                    variant="ghost" 
                    fullWidth 
                    className="h-12 rounded-[20px] text-[16px] font-medium bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[#1A1A1A]"
                  >
                    个人画像
                  </MCButton>
                </Link>
                
                <Link href="/student/match-result">
                  <MCButton 
                    variant="ghost" 
                    fullWidth 
                    className="h-12 rounded-[20px] text-[16px] font-medium bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[#1A1A1A]"
                  >
                    匹配社团
                  </MCButton>
                </Link>
                
                <Link href="/student/browse">
                  <MCButton 
                    variant="ghost" 
                    fullWidth 
                    className="h-12 rounded-[20px] text-[16px] font-medium bg-[#F0F0F0] hover:bg-[#E5E5E5] text-[#1A1A1A]"
                  >
                    浏览社团
                  </MCButton>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 底部导航栏占位 */}
        <BottomNavSpacer />
      </div>

      {/* 底部导航栏 */}
      <BottomNav type="student" />
    </div>
  )
}
