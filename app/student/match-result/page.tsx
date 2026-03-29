"use client"

import { Bell, Home, Compass, Heart, User } from "lucide-react"
import Link from "next/link"

// 模拟匹配结果数据
const matchResults = [
  {
    id: "1",
    name: "xx大学音乐协会",
    avatar: null,
    tags: ["音乐", "唱歌", "摇滚", "吉他"],
    matchScore: 92,
  },
  {
    id: "2", 
    name: "xx大学音乐协会",
    avatar: null,
    tags: ["音乐", "唱歌", "摇滚", "吉他"],
    matchScore: 92,
  },
  {
    id: "3",
    name: "xx大学音乐协会",
    avatar: null,
    tags: ["音乐", "唱歌", "摇滚", "吉他"],
    matchScore: 92,
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
  size = 48, 
  strokeWidth = 3 
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
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
        />
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[14px] font-bold text-[#F5B70A]">{percentage}%</span>
      </div>
    </div>
  )
}

// 简单头像组件
function SimpleAvatar({ 
  name, 
  size = 48,
  className = ""
}: { 
  name: string
  size?: number
  className?: string
}) {
  const firstChar = name.charAt(0)
  return (
    <div 
      className={`rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#666666] font-medium ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {firstChar}
    </div>
  )
}

// 标签组件
function SimpleTag({ 
  children,
  className = ""
}: { 
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`inline-block px-2 py-0.5 text-[12px] text-[#666666] bg-[#F5F5F5] rounded-[4px] ${className}`}>
      {children}
    </span>
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
      className="block bg-white rounded-[4px] p-4 border border-[#E5E5E5] hover:shadow-sm transition-shadow active:scale-[0.99]"
    >
      <div className="flex items-center gap-3">
        <SimpleAvatar name={club.name} size={48} className="flex-shrink-0" />
        
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-medium text-[#1A1A1A] mb-2">
            {club.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {club.tags.map((tag, index) => (
              <SimpleTag key={index}>{tag}</SimpleTag>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center flex-shrink-0">
          <CircularProgress percentage={club.matchScore} />
          <span className="text-[11px] text-[#999999] mt-1">匹配度</span>
        </div>
      </div>
    </Link>
  )
}

export default function MatchResultPage() {
  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col font-sans">
      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col relative">
        
        {/* 顶部导航 */}
        <header className="px-4 pt-12 pb-3 flex items-center justify-between">
          <Link href="/student/messages" className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-[4px] bg-[#F0F0F0] flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#666666]" />
            </div>
            <span className="text-[12px] text-[#666666]">消息</span>
          </Link>

          <h1 className="text-[18px] font-semibold text-[#1A1A1A]">匹配结果</h1>

          <Link href="/login" className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-[#F0F0F0] border-2 border-[#E5E5E5]" />
            <span className="text-[12px] text-[#666666]">登录</span>
          </Link>
        </header>

        {/* 主内容 */}
        <main className="flex-1 px-4 pb-20 overflow-y-auto">
          <section className="space-y-3 mb-6">
            {matchResults.map((club, index) => (
              <MatchCard key={index} club={club} />
            ))}
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#1A1A1A] mb-3">
              也可以看看这些...
            </h2>
            <div className="flex flex-wrap gap-2">
              {recommendedClubs.map((clubName, index) => (
                <Link 
                  key={index} 
                  href={`/student/browse?search=${encodeURIComponent(clubName)}`}
                >
                  <span className="inline-block px-2.5 py-1 text-[13px] text-[#666666] bg-white border border-[#E5E5E5] rounded-[4px] hover:bg-[#F5F5F5] transition-colors">
                    {clubName}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </main>

        {/* 底部导航 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] py-2 px-6 z-50">
          <div className="max-w-[390px] mx-auto flex justify-between items-center">
            <Link href="/student" className="flex flex-col items-center gap-0.5 text-[#999999]">
              <Home className="w-5 h-5" />
              <span className="text-[11px]">首页</span>
            </Link>
            <Link href="/student/browse" className="flex flex-col items-center gap-0.5 text-[#999999]">
              <Compass className="w-5 h-5" />
              <span className="text-[11px]">浏览</span>
            </Link>
            <Link href="/student/favorites" className="flex flex-col items-center gap-0.5 text-[#999999]">
              <Heart className="w-5 h-5" />
              <span className="text-[11px]">收藏</span>
            </Link>
            <Link href="/student/profile" className="flex flex-col items-center gap-0.5 text-[#999999]">
              <User className="w-5 h-5" />
              <span className="text-[11px]">我的</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}
