"use client"

// 社团端首页 - 消息管理页
import { useState } from "react"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { BottomNav, BottomNavSpacer } from "@/components/match-club/bottom-nav"

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

// 申请数据类型
interface Application {
  id: string
  name: string
  avatar: string | null
  selfIntro: string
  status: "pending" | "accepted" | "rejected"
}

// 模拟申请数据
const mockApplications: Application[] = [
  {
    id: "1",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "pending",
  },
  {
    id: "2",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "pending",
  },
  {
    id: "3",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "pending",
  },
  {
    id: "4",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "pending",
  },
  {
    id: "5",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "accepted",
  },
  {
    id: "6",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "rejected",
  },
  {
    id: "7",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "accepted",
  },
  {
    id: "8",
    name: "文字文",
    avatar: null,
    selfIntro: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是...",
    status: "rejected",
  },
]

// 申请卡片组件
function ApplicationCard({ 
  application, 
  onAccept, 
  onReject 
}: { 
  application: Application
  onAccept?: () => void
  onReject?: () => void
}) {
  const isPending = application.status === "pending"
  
  return (
    <Link 
      href={`/club/application/${application.id}`}
      className="flex items-center gap-2 bg-white rounded-[8px] border border-[#E5E5E5]"
      style={{
        width: "340px",
        height: "89px",
        paddingTop: "20px",
        paddingBottom: "20px",
        paddingLeft: "8px",
        paddingRight: "14px",
      }}
    >
      {/* 大头贴 - 49px */}
      <div 
        className="rounded-full bg-[#E5E5E5] flex-shrink-0 flex items-center justify-center"
        style={{ width: "49px", height: "49px" }}
      >
        {application.avatar ? (
          <img 
            src={application.avatar} 
            alt={application.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#D9D9D9]" />
        )}
      </div>

      {/* 文字内容 */}
      <div 
        className="flex-1 min-w-0 flex flex-col justify-between"
        style={{ 
          paddingTop: "13px",
          paddingBottom: "13px",
          marginLeft: "8px",
        }}
      >
        {/* 姓名 - 苹方中黑体 14号 */}
        <h3 
          className="text-[#1A1A1A] font-medium truncate"
          style={{ 
            fontFamily: "'PingFang SC', -apple-system, sans-serif",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {application.name}
        </h3>
        {/* 自荐语 - 苹方常规体 13号 */}
        <p 
          className="text-[#666666] truncate"
          style={{ 
            fontFamily: "'PingFang SC', -apple-system, sans-serif",
            fontSize: "13px",
            fontWeight: 400,
          }}
        >
          {application.selfIntro}
        </p>
      </div>

      {/* 操作按钮区域 */}
      <div 
        className="flex items-center flex-shrink-0"
        style={{ gap: "8px", marginLeft: "12px" }}
      >
        {isPending ? (
          <>
            {/* 接受按钮 - 24px正方形 */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onAccept?.()
              }}
              className="flex items-center justify-center rounded-[4px] bg-[#F5B70A] hover:bg-[#E5A700] active:scale-95 transition-all"
              style={{ width: "24px", height: "24px" }}
            >
              <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
            </button>
            {/* 拒绝按钮 - 24px正方形 */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onReject?.()
              }}
              className="flex items-center justify-center rounded-[4px] bg-[#E5E5E5] hover:bg-[#D5D5D5] active:scale-95 transition-all"
              style={{ width: "24px", height: "24px" }}
            >
              <X className="w-4 h-4 text-[#666666]" strokeWidth={2.5} />
            </button>
          </>
        ) : (
          <span 
            className={`text-[12px] font-medium ${
              application.status === "accepted" ? "text-[#4CAF50]" : "text-[#999999]"
            }`}
          >
            {application.status === "accepted" ? "已接受" : "已拒绝"}
          </span>
        )}
      </div>
    </Link>
  )
}

export default function ClubMessagePage() {
  const [applications, setApplications] = useState<Application[]>(mockApplications)

  const pendingApplications = applications.filter(app => app.status === "pending")
  const processedApplications = applications.filter(app => app.status !== "pending")

  const handleAccept = (id: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: "accepted" as const } : app
      )
    )
  }

  const handleReject = (id: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id ? { ...app, status: "rejected" as const } : app
      )
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col font-['PingFang_SC',-apple-system,sans-serif]">
      {/* 隐藏滚动条 */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col relative">
        {/* 状态栏 - 44px */}
        <StatusBar />

        {/* 页面标题 - 居中 */}
        <header className="flex items-center justify-center bg-[#F9F6E5]" style={{ height: "44px" }}>
          <h1 
            className="text-[#1A1A1A]"
            style={{ 
              fontFamily: "'PingFang SC', -apple-system, sans-serif",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            消息管理
          </h1>
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide bg-[#F9F6E5]">
          {/* 待处理区域 */}
          <section>
            {/* 待处理标题 - 上下间距24/16px，中粗体16号 */}
            <h2 
              className="text-[#1A1A1A] bg-[#F9F6E5]"
              style={{ 
                fontFamily: "'PingFang SC', -apple-system, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                paddingTop: "24px",
                paddingBottom: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              待处理
            </h2>

            {/* 待处理卡片列表 - 卡片间距8px */}
            <div 
              className="flex flex-col"
              style={{ 
                gap: "8px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {pendingApplications.length > 0 ? (
                pendingApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onAccept={() => handleAccept(app.id)}
                    onReject={() => handleReject(app.id)}
                  />
                ))
              ) : (
                <div className="py-8 text-center text-[#999999] text-[14px]">
                  暂无待处理的申请
                </div>
              )}
            </div>
          </section>

          {/* 已处理区域 */}
          <section>
            {/* 已处理标题 - 上下间距24/16px */}
            <h2 
              className="text-[#1A1A1A] bg-[#F9F6E5]"
              style={{ 
                fontFamily: "'PingFang SC', -apple-system, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                paddingTop: "24px",
                paddingBottom: "16px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              已处理
            </h2>

            {/* 已处理卡片列表 - 卡片间距8px */}
            <div 
              className="flex flex-col"
              style={{ 
                gap: "8px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              {processedApplications.length > 0 ? (
                processedApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                  />
                ))
              ) : (
                <div className="py-8 text-center text-[#999999] text-[14px]">
                  暂无已处理的申请
                </div>
              )}
            </div>
          </section>

          {/* 底部导航栏占位 */}
          <BottomNavSpacer />
        </main>

        {/* 底部导航栏 */}
        <BottomNav type="club" />
      </div>
    </div>
  )
}
