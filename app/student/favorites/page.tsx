"use client"

import { Home, Compass, Heart, User, Link2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { useFavorites } from "@/contexts/favorites-context"

// iOS风格状态栏组件 - 44px高度
function StatusBar() {
  return (
    <div className="w-full h-[44px] px-6 flex items-center justify-between bg-[#F9F6E5]">
      <span className="text-[17px] font-semibold text-[#1A1A1A]">9:41</span>
      <div className="flex items-center gap-1">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="#1A1A1A" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="#1A1A1A" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="#1A1A1A" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="#1A1A1A" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 2.4C10.7 2.4 13.1 3.5 14.8 5.3L16 4C14 1.8 11.2 0.5 8 0.5C4.8 0.5 2 1.8 0 4L1.2 5.3C2.9 3.5 5.3 2.4 8 2.4Z" fill="#1A1A1A" />
          <path d="M8 5.9C9.9 5.9 11.6 6.7 12.8 8L14 6.7C12.5 5.1 10.4 4.1 8 4.1C5.6 4.1 3.5 5.1 2 6.7L3.2 8C4.4 6.7 6.1 5.9 8 5.9Z" fill="#1A1A1A" />
          <path d="M8 9.4C9.1 9.4 10.1 9.9 10.8 10.7L12 9.4C10.9 8.2 9.5 7.5 8 7.5C6.5 7.5 5.1 8.2 4 9.4L5.2 10.7C5.9 9.9 6.9 9.4 8 9.4Z" fill="#1A1A1A" />
        </svg>
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="23" height="11" rx="2.5" stroke="#1A1A1A" strokeOpacity="0.35" />
          <rect x="2" y="2" width="20" height="8" rx="1.5" fill="#1A1A1A" />
          <path d="M25 4V8C26.1 7.5 26.1 4.5 25 4Z" fill="#1A1A1A" fillOpacity="0.4" />
        </svg>
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

// 可滑动删除的收藏卡片
function SwipeableCard({
  club,
  onDelete
}: {
  club: { id: string; name: string; avatar: string | null; tags: string[] }
  onDelete: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startXRef = useRef(0)
  const currentXRef = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX
    currentXRef.current = translateX
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startXRef.current
    const newTranslate = Math.min(0, Math.max(-80, currentXRef.current + diff))
    setTranslateX(newTranslate)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    // 如果滑动超过40px，显示删除按钮
    if (translateX < -40) {
      setTranslateX(-80)
    } else {
      setTranslateX(0)
    }
  }

  const handleDelete = () => {
    onDelete()
    setTranslateX(0)
  }

  return (
    <div className="relative overflow-hidden rounded-[8px]">
      {/* 删除按钮背景 */}
      <div className="absolute right-0 top-0 bottom-0 w-[80px] bg-[#AE322A] flex items-center justify-center">
        <button
          onClick={handleDelete}
          className="text-white text-[14px] font-medium"
        >
          删除
        </button>
      </div>

      {/* 卡片内容 */}
      <div
        ref={cardRef}
        className="relative bg-white rounded-[8px] p-[8px] border border-[#E5E5E5] transition-transform"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Link
          href={`/student/club/${club.id}`}
          className="flex items-center gap-[8px]"
        >
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
        </Link>
      </div>
    </div>
  )
}

// 链环图案组件 - 表示"连接"
function ChainIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="120" height="120" viewBox="0 0 120 120" fill="none">
      {/* 左环 */}
      <ellipse cx="45" cy="60" rx="25" ry="20" stroke="#F5B70A" strokeWidth="8" strokeOpacity="0.3" fill="none" />
      {/* 右环 */}
      <ellipse cx="75" cy="60" rx="25" ry="20" stroke="#F5B70A" strokeWidth="8" strokeOpacity="0.3" fill="none" />
      {/* 交叉部分加深 */}
      <path d="M50 48 Q60 60 50 72" stroke="#F5B70A" strokeWidth="8" strokeOpacity="0.5" fill="none" />
      <path d="M70 48 Q60 60 70 72" stroke="#F5B70A" strokeWidth="8" strokeOpacity="0.5" fill="none" />
    </svg>
  )
}

// 底部导航项数据
const navItems = [
  { label: "首页", href: "/student", icon: Home },
  { label: "匹配", href: "/student/survey", icon: Compass },
  { label: "收藏", href: "/student/favorites", icon: Heart },
  { label: "我的", href: "/student/profile", icon: User },
]

export default function FavoritesPage() {
  const pathname = usePathname()
  const { favorites, removeFavorite } = useFavorites()

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

        {/* 顶部导航 - 44px */}
        <header className="h-[44px] px-4 flex items-center">
          <div className="w-8 h-8" />
          <h1 className="flex-1 text-center text-[18px] font-semibold text-[#1A1A1A]">我的收藏</h1>
          <div className="w-8 h-8" />
        </header>

        {/* 主内容 */}
        <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto scrollbar-hide">
          {favorites.length === 0 ? (
            /* 空状态 */
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              {/* 链环图案 */}
              <div className="relative mb-8">
                <ChainIcon className="opacity-60" />
              </div>

              <h2 className="text-[16px] font-semibold text-[#1A1A1A] mb-2">
                还没有收藏任何社团
              </h2>
              <p className="text-[13px] text-[#999999] text-center px-8">
                看到有意思的社团，点一下 <span className="text-[#F5B70A]">★</span> 就可以收藏啦
              </p>

              {/* 引导按钮 */}
              <Link
                href="/student/match-result"
                className="mt-8 px-6 py-2.5 bg-[#F5B70A] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#E5A700] active:scale-[0.98] transition-all shadow-sm"
              >
                去看看社团
              </Link>
            </div>
          ) : (
            /* 收藏列表 */
            <section className="space-y-[8px]">
              {favorites.map((club) => (
                <SwipeableCard
                  key={club.id}
                  club={club}
                  onDelete={() => removeFavorite(club.id)}
                />
              ))}

              {/* 提示文字 */}
              <p className="text-center text-[12px] text-[#999999] pt-4">
                左滑卡片可以取消收藏
              </p>
            </section>
          )}
        </main>

        {/* 底部导航 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50">
          <div className="max-w-[390px] mx-auto flex items-center justify-around h-14 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${isActive ? "text-[#F5B70A]" : "text-[#999999] hover:text-[#666666]"
                    }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-0.5 transition-transform ${isActive ? "scale-105" : ""}`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={`text-[11px] ${isActive ? "font-semibold" : ""}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
