"use client"

import { ChevronLeft, Home, Compass, Heart, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
      className="block bg-white rounded-[8px] p-[8px] border border-[#E5E5E5] hover:shadow-sm transition-shadow active:scale-[0.99]"
    >
      <div className="flex items-center gap-[8px]">
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
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col font-sans overflow-hidden">
      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col relative overflow-hidden">
        
        {/* 顶部导航 - 只有回退按钮和标题 */}
        <header className="px-4 pt-12 pb-3 flex items-center">
          <button 
            onClick={() => router.back()}
            className="w-8 h-8 rounded-[4px] flex items-center justify-center hover:bg-[#F0F0F0] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#666666]" />
          </button>

          <h1 className="flex-1 text-center text-[18px] font-semibold text-[#1A1A1A]">匹配结果</h1>
          
          {/* 占位，保持标题居中 */}
          <div className="w-8 h-8" />
        </header>

        {/* 主内容 - 隐藏滚动条 */}
        <main className="flex-1 px-4 pb-20 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style jsx>{`
            main::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {/* 匹配结果卡片 - 间距8px */}
          <section className="space-y-[8px]">
            {matchResults.map((club, index) => (
              <MatchCard key={index} club={club} />
            ))}
          </section>

          {/* 推荐区域 - 与上方卡片间距24px */}
          <section className="mt-[24px]">
            <h2 className="text-[15px] font-semibold text-[#1A1A1A]">
              也可以看看这些...
            </h2>
            {/* 按钮与文字间距16px */}
            <div className="flex flex-wrap gap-2 mt-[16px]">
              {recommendedClubs.map((clubName, index) => (
                <Link 
                  key={index} 
                  href={`/student/browse?search=${encodeURIComponent(clubName)}`}
                >
                  {/* 高度24px，圆角12px */}
                  <span className="inline-flex items-center px-2.5 h-[24px] text-[13px] text-[#666666] bg-white border border-[#E5E5E5] rounded-[12px] hover:bg-[#F5F5F5] transition-colors">
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
              <span className="text-[11px]">我的</span>
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
