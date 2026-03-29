"use client"

import { MCAvatar } from "@/components/match-club/mc-avatar"
import { Tag } from "@/components/match-club/tag"
import { BottomNav, BottomNavSpacer } from "@/components/match-club/bottom-nav"
import { StatusBar } from "@/components/match-club/status-bar"
import { Bell } from "lucide-react"
import Link from "next/link"

// 模拟匹配结果数据
const matchResults = [
  {
    id: "1",
    name: "北大音乐协会",
    avatar: null,
    tags: ["音乐", "唱歌", "摇滚", "吉他"],
    matchScore: 92,
  },
  {
    id: "2", 
    name: "清华街舞社",
    avatar: null,
    tags: ["街舞", "Hip-Hop", "Breaking", "表演"],
    matchScore: 88,
  },
  {
    id: "3",
    name: "人大摄影协会",
    avatar: null,
    tags: ["摄影", "旅行", "风光", "人像"],
    matchScore: 85,
  },
]

// 推荐社团标签
const recommendedClubs = [
  "棋牌社", "羽毛球社", "汉服社", "桌游社",
  "篮球社", "足球社", "乒乓球社", "合唱团", "音乐协会",
  "棋牌社", "羽毛球社", "汉服社", "桌游社",
  "篮球社", "足球社", "合唱团", "音乐协会",
]

// 圆形进度条组件
function CircularProgress({ 
  percentage, 
  size = 56, 
  strokeWidth = 4 
}: { 
  percentage: number
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
        />
        {/* 进度圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F5B70A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* 百分比文字 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[16px] font-bold text-[#F5B70A]">{percentage}%</span>
      </div>
    </div>
  )
}

// 匹配结果卡片组件
function MatchCard({ 
  club 
}: { 
  club: typeof matchResults[0]
}) {
  return (
    <Link 
      href={`/student/club/${club.id}`}
      className="block bg-white rounded-[4px] p-4 shadow-sm border border-[#E5E5E5] hover:shadow-md transition-shadow active:scale-[0.98]"
    >
      <div className="flex items-center gap-4">
        {/* 社团头像 */}
        <MCAvatar 
          size="lg"
          src={club.avatar}
          fallback={club.name}
          className="flex-shrink-0"
        />
        
        {/* 社团信息 */}
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2 truncate">
            {club.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {club.tags.map((tag, index) => (
              <Tag 
                key={index} 
                variant="muted" 
                size="sm"
                className="rounded-[4px]"
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        
        {/* 匹配度进度圈 */}
        <div className="flex flex-col items-center flex-shrink-0">
          <CircularProgress percentage={club.matchScore} />
          <span className="text-[11px] text-[#999999] mt-1">匹配度</span>
        </div>
      </div>
    </Link>
  )
}

export default function MatchResultPage() {
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
        <header className="px-4 py-3 flex items-start justify-between relative z-10">
          {/* 左侧消息入口 */}
          <Link href="/student/messages" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-[4px] bg-[#F5B70A]/20 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#F5B70A]" />
            </div>
            <span className="text-[13px] text-[#666666]">消息</span>
          </Link>

          {/* 中间标题 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-2">
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">匹配结果</h1>
          </div>

          {/* 右侧头像和登录 */}
          <Link href={isLoggedIn ? "/student/profile" : "/login"} className="flex flex-col items-center gap-1">
            <MCAvatar 
              size="xl" 
              fallback={isLoggedIn ? userName : "?"} 
              className="border-2 border-[#E5E5E5]"
            />
            <span className="text-[13px] text-[#666666]">
              {isLoggedIn ? userName : "登录"}
            </span>
          </Link>
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 px-4 pb-4 overflow-y-auto">
          {/* 匹配结果列表 */}
          <section className="space-y-3 mb-6">
            {matchResults.map((club) => (
              <MatchCard key={club.id} club={club} />
            ))}
          </section>

          {/* 推荐社团区域 */}
          <section>
            <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-3">
              也可以看看这些...
            </h2>
            <div className="flex flex-wrap gap-2">
              {recommendedClubs.map((clubName, index) => (
                <Link 
                  key={index} 
                  href={`/student/browse?search=${encodeURIComponent(clubName)}`}
                >
                  <Tag 
                    variant="outline" 
                    size="sm"
                    className="rounded-[4px] hover:bg-[#F5B70A]/10 transition-colors cursor-pointer"
                  >
                    {clubName}
                  </Tag>
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* 底部导航栏占位 */}
        <BottomNavSpacer />
      </div>

      {/* 底部导航栏 */}
      <BottomNav type="student" />
    </div>
  )
}
