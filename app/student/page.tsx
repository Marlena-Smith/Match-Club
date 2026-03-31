"use client"

import { useState, useRef } from "react"
import { BottomNav, BottomNavSpacer } from "@/components/match-club/bottom-nav"
import { StatusBar } from "@/components/match-club/status-bar"
import { Heart, X, Camera } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// 模拟热门社团数据
const hotClubs = [
  { id: "1", name: "合唱团" },
  { id: "2", name: "足球社" },
  { id: "3", name: "棋牌社" },
  { id: "4", name: "文学社" },
  { id: "5", name: "摄影社" },
  { id: "6", name: "篮球社" },
]

// 模拟匹配过的社团数据
const matchedClubs = [
  { id: "1", name: "合唱团" },
  { id: "2", name: "足球社" },
  { id: "3", name: "棋牌社" },
  { id: "4", name: "文学社" },
]

export default function StudentHomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginForm, setLoginForm] = useState({ studentId: "", password: "" })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 处理头像上传
  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // 处理登录
  const handleLogin = () => {
    if (loginForm.studentId && loginForm.password) {
      setIsLoggedIn(true)
      setUserName(loginForm.studentId.slice(-4))
      setShowLoginModal(false)
      setLoginForm({ studentId: "", password: "" })
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col overflow-hidden font-['PingFang_SC',_-apple-system,_sans-serif]">
      {/* 手机框架容器 */}
      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col relative">
        {/* 状态栏 */}
        <StatusBar />

        {/* 顶部区域 - 收藏和登录 */}
        <header className="h-[44px] px-4 flex items-center justify-between relative z-10">
          {/* 左侧收藏入口 */}
          <Link href="/student/favorites" className="flex flex-col items-center gap-0.5">
            <Heart className="w-6 h-6 text-[#666666]" />
            <span className="text-[11px] text-[#666666]">收藏</span>
          </Link>

          {/* 右侧头像和登录 */}
          <div className="flex flex-col items-center gap-0.5">
            {/* 头像 - 点击上传 */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              onClick={handleAvatarClick}
              className="w-12 h-12 rounded-full bg-[#F0F0F0] border-2 border-[#E5E5E5] flex items-center justify-center overflow-hidden hover:border-[#F5B70A] transition-colors"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="头像" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-5 h-5 text-[#999999]" />
              )}
            </button>
            {/* 登录按钮 */}
            <button
              onClick={() => isLoggedIn ? router.push("/student/profile") : setShowLoginModal(true)}
              className="text-[11px] text-[#666666] hover:text-[#F5B70A] transition-colors"
            >
              {isLoggedIn ? userName : "登录"}
            </button>
          </div>
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 px-4 overflow-y-auto pb-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style jsx>{`main::-webkit-scrollbar { display: none; }`}</style>
          
          {/* 热门社团 */}
          <section className="mt-4">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: "PingFang SC" }}>
              热门社团
            </h2>
            {/* 大卡片容器 341x134px */}
            <div className="w-[341px] h-[134px] bg-white rounded-[8px] border border-[#E5E5E5] p-3 overflow-hidden">
              {/* 小卡片横向滚动容器 */}
              <div 
                className="flex gap-2 overflow-x-auto pb-1" 
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                {hotClubs.map((club) => (
                  <Link
                    key={club.id}
                    href={`/student/club/${club.id}`}
                    className="flex-shrink-0 flex flex-col items-center"
                  >
                    {/* 小卡片 82x88px */}
                    <div className="w-[82px] h-[68px] bg-[#F0F0F0] rounded-[4px] hover:bg-[#E5E5E5] transition-colors" />
                    {/* 社团名 13px 常规体 间距8px */}
                    <span className="mt-2 text-[13px] text-[#1A1A1A] text-center" style={{ fontFamily: "PingFang SC", fontWeight: 400 }}>
                      {club.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 匹配过的 - 与上方间距24px */}
          <section className="mt-6">
            <h2 className="text-[18px] font-semibold text-[#1A1A1A] mb-2" style={{ fontFamily: "PingFang SC" }}>
              匹配过的
            </h2>
            {/* 大卡片容器 341x134px */}
            <div className="w-[341px] h-[134px] bg-white rounded-[8px] border border-[#E5E5E5] p-3 overflow-hidden">
              {/* 小卡片横向滚动容器 */}
              <div 
                className="flex gap-2 overflow-x-auto pb-1" 
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
                {matchedClubs.map((club) => (
                  <Link
                    key={club.id}
                    href={`/student/club/${club.id}`}
                    className="flex-shrink-0 flex flex-col items-center"
                  >
                    {/* 小卡片 82x88px */}
                    <div className="w-[82px] h-[68px] bg-[#F0F0F0] rounded-[4px] hover:bg-[#E5E5E5] transition-colors" />
                    {/* 社团名 13px 常规体 间距8px */}
                    <span className="mt-2 text-[13px] text-[#1A1A1A] text-center" style={{ fontFamily: "PingFang SC", fontWeight: 400 }}>
                      {club.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 现在去匹配按钮 */}
          <section className="mt-8 flex justify-center">
            <button
              onClick={() => router.push("/student/survey")}
              className="w-[200px] h-[48px] bg-[#4A9ECC] hover:bg-[#3A8EBC] active:scale-[0.98] text-white text-[16px] font-medium rounded-[24px] shadow-md transition-all"
            >
              现在去匹配
            </button>
          </section>
        </main>

        {/* 底部导航栏占位 */}
        <BottomNavSpacer />
      </div>

      {/* 底部导航栏 */}
      <BottomNav type="student" />

      {/* 登录弹窗 */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[320px] bg-white rounded-[12px] p-6 relative">
            {/* 关闭按钮 */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] transition-colors"
            >
              <X className="w-5 h-5 text-[#666666]" />
            </button>

            <h3 className="text-[18px] font-semibold text-[#1A1A1A] text-center mb-6">
              登录
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[14px] text-[#666666] mb-2">校园一卡通学号</label>
                <input
                  type="text"
                  value={loginForm.studentId}
                  onChange={(e) => setLoginForm({ ...loginForm, studentId: e.target.value })}
                  placeholder="请输入学号"
                  className="w-full h-[44px] px-4 border border-[#E5E5E5] rounded-[8px] text-[14px] focus:outline-none focus:border-[#F5B70A] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#666666] mb-2">密码</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="请输入密码"
                  className="w-full h-[44px] px-4 border border-[#E5E5E5] rounded-[8px] text-[14px] focus:outline-none focus:border-[#F5B70A] transition-colors"
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full h-[44px] bg-[#F5B70A] hover:bg-[#E5A700] text-white text-[16px] font-medium rounded-[8px] transition-colors mt-4"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
