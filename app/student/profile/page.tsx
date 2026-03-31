"use client"

import { Home, Compass, Heart, User, ChevronRight, QrCode, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useRef } from "react"

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
  const firstTwoChars = name.slice(0, 2)
  return (
    <div
      className={`rounded-full bg-[#F0F0F0] flex items-center justify-center text-[#666666] font-medium border-2 border-[#E5E5E5] ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {firstTwoChars}
    </div>
  )
}

// 标签组件
function SimpleTag({
  children,
  variant = "default",
  className = ""
}: {
  children: React.ReactNode
  variant?: "default" | "primary" | "joined"
  className?: string
}) {
  const variantStyles = {
    default: "bg-[#F5F5F5] text-[#666666]",
    primary: "bg-[#F5B70A]/15 text-[#F5B70A] border border-[#F5B70A]/30",
    joined: "bg-[#4CAF50]/15 text-[#4CAF50] border border-[#4CAF50]/30"
  }
  return (
    <span className={`inline-block px-2.5 py-1 text-[12px] rounded-[4px] ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}

// 可滑动查看二维码的申请卡片
function SwipeableApplicationCard({
  application,
  onShowQRCode
}: {
  application: {
    id: string
    clubName: string
    clubAvatar: string | null
    selfIntro: string
    status: "pending" | "approved" | "rejected"
    qrCode?: string
  }
  onShowQRCode: (clubName: string) => void
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
    const newTranslate = Math.min(0, Math.max(-100, currentXRef.current + diff))
    setTranslateX(newTranslate)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (translateX < -50) {
      setTranslateX(-100)
    } else {
      setTranslateX(0)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    startXRef.current = e.clientX
    currentXRef.current = translateX
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startXRef.current
    const newTranslate = Math.min(0, Math.max(-100, currentXRef.current + diff))
    setTranslateX(newTranslate)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (translateX < -50) {
      setTranslateX(-100)
    } else {
      setTranslateX(0)
    }
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      if (translateX < -50) {
        setTranslateX(-100)
      } else {
        setTranslateX(0)
      }
    }
  }

  const statusStyles = {
    pending: { text: "审核中", color: "text-[#F5B70A]", bg: "bg-[#F5B70A]/10" },
    approved: { text: "已通过", color: "text-[#4CAF50]", bg: "bg-[#4CAF50]/10" },
    rejected: { text: "未通过", color: "text-[#AE322A]", bg: "bg-[#AE322A]/10" }
  }

  const status = statusStyles[application.status]

  return (
    <div className="relative overflow-hidden rounded-[8px]">
      {/* 二维码按钮背景 */}
      <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-[#F5B70A] flex items-center justify-center">
        <button
          onClick={() => onShowQRCode(application.clubName)}
          className="flex flex-col items-center justify-center text-white hover:bg-[#E5A700] w-full h-full transition-colors"
        >
          <QrCode className="w-6 h-6 mb-1" />
          <span className="text-[12px] font-medium">群二维码</span>
        </button>
      </div>

      {/* 卡片内容 */}
      <div
        ref={cardRef}
        className="relative bg-white rounded-[8px] p-3 border border-[#E5E5E5] cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? "none" : "transform 0.2s ease-out"
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-start gap-3">
          <SimpleAvatar name={application.clubName} size={48} className="flex-shrink-0" />

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[15px] font-medium text-[#1A1A1A]">
                {application.clubName}
              </h3>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${status.color} ${status.bg}`}>
                {status.text}
              </span>
            </div>
            <p className="text-[13px] text-[#999999] line-clamp-2">
              {application.selfIntro}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// 二维码弹窗
function QRCodeModal({
  clubName,
  onClose
}: {
  clubName: string
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-[12px] p-6 mx-4 max-w-[300px] w-full shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F5F5] transition-colors"
        >
          <X className="w-5 h-5 text-[#999999]" />
        </button>

        <h3 className="text-[16px] font-semibold text-[#1A1A1A] text-center mb-4">
          {clubName}
        </h3>

        {/* 模拟二维码 */}
        <div className="w-[180px] h-[180px] mx-auto bg-[#F5F5F5] rounded-[8px] flex items-center justify-center border-2 border-dashed border-[#E5E5E5]">
          <div className="text-center">
            <QrCode className="w-16 h-16 text-[#CCCCCC] mx-auto mb-2" />
            <p className="text-[12px] text-[#999999]">群二维码</p>
          </div>
        </div>

        <p className="text-[13px] text-[#666666] text-center mt-4">
          扫码申请加入社团群聊
        </p>

        <button
          onClick={onClose}
          className="w-full mt-4 h-[40px] bg-[#F5B70A] text-white text-[14px] font-medium rounded-[8px] hover:bg-[#E5A700] active:scale-[0.98] transition-all"
        >
          我知道了
        </button>
      </div>
    </div>
  )
}

// 底部导航项数据
const navItems = [
  { label: "首页", href: "/student", icon: Home },
  { label: "匹配", href: "/student/survey", icon: Compass },
  { label: "收藏", href: "/student/favorites", icon: Heart },
  { label: "我的", href: "/student/profile", icon: User },
]

export default function ProfilePage() {
  const pathname = usePathname()
  const [showQRCode, setShowQRCode] = useState(false)
  const [currentQRClub, setCurrentQRClub] = useState("")

  // 模拟用户数据
  const isLoggedIn = true
  const userData = {
    name: "小明",
    avatar: null,
    tags: ["音乐", "唱歌", "摇滚", "吉他"],
    joinedClubs: ["上大音协", "吉他社"]
  }

  // 模拟已发送的申请
  const [applications] = useState([
    {
      id: "1",
      clubName: "街舞社",
      clubAvatar: null,
      selfIntro: "我从小就喜欢跳舞，希望能在大学继续追求这个爱好，和大家一起进步！",
      status: "pending" as const
    },
    {
      id: "2", 
      clubName: "摄影协会",
      clubAvatar: null,
      selfIntro: "热爱用镜头记录生活中的美好瞬间，希望能加入摄影协会学习更多技巧。",
      status: "approved" as const
    },
    {
      id: "3",
      clubName: "辩论队",
      clubAvatar: null,
      selfIntro: "高中时期参加过辩论比赛，对辩论有浓厚兴趣，希望能加入辩论队。",
      status: "rejected" as const
    }
  ])

  const handleShowQRCode = (clubName: string) => {
    setCurrentQRClub(clubName)
    setShowQRCode(true)
  }

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
          <h1 className="flex-1 text-center text-[18px] font-semibold text-[#1A1A1A]">我的</h1>
          <div className="w-8 h-8" />
        </header>

        {/* 主内容 */}
        <main className="flex-1 px-4 pt-4 pb-20 overflow-y-auto scrollbar-hide">
          {/* 用户头像和登录区域 */}
          <section className="flex flex-col items-center mb-6">
            <Link 
              href={isLoggedIn ? "#" : "/login"}
              className="flex flex-col items-center group"
            >
              <div className="relative">
                <SimpleAvatar 
                  name={isLoggedIn ? userData.name : "?"} 
                  size={80} 
                  className="group-hover:border-[#F5B70A] transition-colors"
                />
                {isLoggedIn && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#4CAF50] rounded-full flex items-center justify-center border-2 border-white">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                )}
              </div>
              <span className="mt-2 text-[16px] font-medium text-[#1A1A1A]">
                {isLoggedIn ? userData.name : "点击登录"}
              </span>
            </Link>
          </section>

          {/* 我的标签 */}
          {isLoggedIn && (
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-semibold text-[#1A1A1A]">我的标签</h2>
                <Link 
                  href="/student/survey"
                  className="text-[13px] text-[#F5B70A] flex items-center hover:underline"
                >
                  编辑 <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.tags.map((tag, index) => (
                  <SimpleTag key={index} variant="primary">{tag}</SimpleTag>
                ))}
              </div>
            </section>
          )}

          {/* 已加入的社团 */}
          {isLoggedIn && (
            <section className="mb-6">
              <h2 className="text-[15px] font-semibold text-[#1A1A1A] mb-3">已加入的社团</h2>
              {userData.joinedClubs.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.joinedClubs.map((club, index) => (
                    <SimpleTag key={index} variant="joined">{club}</SimpleTag>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-[#999999]">还没有加入任何社团</p>
              )}
            </section>
          )}

          {/* 分割线 */}
          <div className="h-px bg-[#E5E5E5] my-4" />

          {/* 我的申请 / 消息 */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-semibold text-[#1A1A1A]">我的申请</h2>
              <span className="text-[12px] text-[#999999]">左滑查看群二维码</span>
            </div>

            {applications.length > 0 ? (
              <div className="space-y-2">
                {applications.map((app) => (
                  <SwipeableApplicationCard
                    key={app.id}
                    application={app}
                    onShowQRCode={handleShowQRCode}
                  />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-[14px] text-[#999999] mb-2">还没有发送过申请</p>
                <Link
                  href="/student/match-result"
                  className="text-[13px] text-[#F5B70A] hover:underline"
                >
                  去看看社团 →
                </Link>
              </div>
            )}
          </section>
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

      {/* 二维码弹窗 */}
      {showQRCode && (
        <QRCodeModal
          clubName={currentQRClub}
          onClose={() => setShowQRCode(false)}
        />
      )}
    </div>
  )
}
