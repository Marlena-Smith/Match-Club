"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BottomNav, BottomNavSpacer } from "@/components/match-club/bottom-nav"

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

// iOS风格状态栏组件 - 44px高度
function StatusBar() {
  return (
    <div className="w-full h-[44px] px-6 flex items-center justify-between bg-[#F9F6E5]">
      <span className="text-[17px] font-semibold text-[#1A1A1A]">9:41</span>
      <div className="flex items-center gap-1">
        {/* 信号 */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="#1A1A1A" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="#1A1A1A" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="#1A1A1A" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="#1A1A1A" />
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.4C10.7 2.4 13.1 3.5 14.8 5.3L16 4C14 1.8 11.2 0.5 8 0.5C4.8 0.5 2 1.8 0 4L1.2 5.3C2.9 3.5 5.3 2.4 8 2.4Z" fill="#1A1A1A" />
          <path d="M8 5.9C9.9 5.9 11.6 6.7 12.8 8L14 6.7C12.5 5.1 10.4 4.1 8 4.1C5.6 4.1 3.5 5.1 2 6.7L3.2 8C4.4 6.7 6.1 5.9 8 5.9Z" fill="#1A1A1A" />
          <path d="M8 9.4C9.1 9.4 10.1 9.9 10.8 10.7L12 9.4C10.9 8.2 9.5 7.5 8 7.5C6.5 7.5 5.1 8.2 4 9.4L5.2 10.7C5.9 9.9 6.9 9.4 8 9.4Z" fill="#1A1A1A" />
        </svg>
        {/* 电池 */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="23" height="11" rx="2.5" stroke="#1A1A1A" strokeOpacity="0.35" />
          <rect x="2" y="2" width="20" height="8" rx="1.5" fill="#1A1A1A" />
          <path d="M25 4V8C26.1 7.5 26.1 4.5 25 4Z" fill="#1A1A1A" fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  )
}

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
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col font-sans overflow-hidden">
      {/* 隐藏滚动条的全局样式 */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col relative overflow-hidden">

        {/* 状态栏 - 44px */}
        <StatusBar />

        {/* 顶部导航 - 44px 只有回退按钮和标题 */}
        <header className="h-[44px] px-4 flex items-center">
          <button
            onClick={() => router.push("/student")}
            className="w-8 h-8 rounded-[4px] flex items-center justify-center hover:bg-[#F0F0F0] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#666666]" />
          </button>

          <h1 className="flex-1 text-center text-[18px] font-semibold text-[#1A1A1A]">这些社团很适合你呢!</h1>

          {/* 占位，保持标题居中 */}
          <div className="w-8 h-8" />
        </header>

        {/* 主内容 - 隐藏滚动条 */}
        <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto scrollbar-hide">

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
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-[16px]">
              {recommendedClubs.map((clubName, index) => (
                <Link
                  key={index}
                  href={`/student/club/${index + 1}`}
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

        {/* 底部导航栏占位 */}
        <BottomNavSpacer />
      </div>

      {/* 底部导航栏 */}
      <BottomNav type="student" />
    </div>
  )
}
