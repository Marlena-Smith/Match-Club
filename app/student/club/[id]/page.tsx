"use client"

import { ChevronLeft, Home, Compass, Heart, User, Bookmark } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// 模拟社团数据
const clubData = {
  id: "1",
  name: "SUMA",
  slogan: "上大音协，等你加入！",
  avatar: null,
  tags: ["音乐", "唱歌", "摇滚", "吉他"],
  
  // 我们是谁
  aboutUs: "这里是一群热爱音乐并值得信任的朋友。在音乐的领域里，我们不断探索，找到属于自己的火花。简介，讲讲历史荣誉。",
  
  // 光辉事迹
  achievements: [
    {
      title: "社团破冰",
      description: "每学期初，我们都会举办破冰活动，帮助新成员快速融入社团大家庭，建立深厚的友谊。",
      imagePosition: "left"
    },
    {
      title: "草坪音乐节",
      description: "一年一度的草坪音乐节是我们的招牌活动，在校园草坪上尽情演奏，感受音乐的魅力。",
      imagePosition: "right"
    },
    {
      title: "吉他小班课",
      description: "由经验丰富的学长学姐授课，零基础也能快速上手，让音乐梦想照进现实。",
      imagePosition: "left"
    },
    {
      title: "吃喝玩乐",
      description: "除了音乐，我们还有丰富的社交活动，聚餐、桌游、团建应有尽有。",
      imagePosition: "right"
    }
  ],
  
  // 活动信息
  activityInfo: {
    frequency: "小活动一周一次，大活动不定期刷新",
    time: "每周五或周日18:00",
    howToJoin: "点击"心动"，我们会联系您~"
  },
  
  // 加入我们你将获得
  benefits: [
    "拥有一群热爱音乐并值得信任的朋友；",
    "在音乐的领域里不断探索，找到属于自己的火花；",
    "不定期掉落去音乐节当志愿者的机会、免费观看livehouse的机会；",
    "还有更多惊喜等你发现！"
  ],
  
  // 我们希望你
  requirements: [
    "永做自己！"
  ],
  
  // 组织构成
  departments: [
    {
      name: "x x 部",
      description: "是SUMA的招牌！主要负责平时的演出，可以寻找伙伴，组织自己的乐队，也可以独当一面。",
      leader: "部长",
      leaderName: "xxx"
    },
    {
      name: "x x 部",
      description: "是SUMA的招牌！主要负责平时的演出，可以寻找伙伴，组织自己的乐队，也可以独当一面。",
      leader: "部长",
      leaderName: "xxx"
    },
    {
      name: "x x 部",
      description: "是SUMA的招牌！主要负责平时的演出，可以寻找伙伴，组织自己的乐队，也可以独当一面。",
      leader: "部长",
      leaderName: "xxx"
    }
  ],
  
  // 社长信息
  president: {
    name: "社长",
    title: "社长登场！",
    message: "如果你也被这些韵律的触动，点击心动。我在xx大学音乐协会，想要听到你的声音~"
  },
  
  // 结语
  conclusion: "如果你也被这些韵律的触动，点击心动。我在xx大学音乐协会，想要听到你的声音~"
}

// iOS风格状态栏组件 - 44px高度
function StatusBar() {
  return (
    <div className="w-full h-[44px] px-6 flex items-center justify-between bg-white">
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

// 底部导航项数据
const navItems = [
  { label: "首页", href: "/student", icon: Home },
  { label: "匹配", href: "/student/survey", icon: Compass },
  { label: "收藏", href: "/student/favorites", icon: Heart },
  { label: "我的", href: "/student/profile", icon: User },
]

export default function ClubPosterPage() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-white flex flex-col font-['PingFang_SC',-apple-system,sans-serif] overflow-hidden">
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
        <header className="h-[44px] px-4 flex items-center bg-white">
          <button
            onClick={() => router.push("/student/match-result")}
            className="w-8 h-8 flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-[#1A1A1A]">社团海报</h1>
          <div className="w-8 h-8" />
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-[140px]">
          {/* 社团头部信息 */}
          <section className="px-4 py-4">
            <div className="flex items-center gap-3">
              {/* 社团头像 */}
              <div className="w-16 h-16 rounded-full bg-[#F0F0F0] flex items-center justify-center flex-shrink-0">
                <span className="text-[20px] font-medium text-[#666666]">
                  {clubData.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-[20px] font-semibold text-[#1A1A1A]">{clubData.name}</h2>
                <p className="text-[13px] text-[#666666] mt-1">{clubData.slogan}</p>
                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {clubData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-[13px] text-[#666666] bg-[#F5F5F5] rounded-[4px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 分割线 */}
          <div className="h-[1px] bg-[#E5E5E5] mx-4" />

          {/* 我们是谁 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">我们是谁？</h3>
            <p className="text-[13px] text-[#666666] leading-relaxed mt-[16px]">
              {clubData.aboutUs}
            </p>
            
            {/* 大合照 - 318x144 */}
            <div className="mt-[16px] flex justify-center">
              <div className="w-[318px] h-[144px] bg-[#E5E5E5] rounded-[8px] flex items-center justify-center">
                <span className="text-[13px] text-[#999999]">（插入图片）大合照</span>
              </div>
            </div>
          </section>

          {/* 我们的光辉事迹 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">我们的光辉事迹</h3>
            
            <div className="mt-[16px] space-y-[8px]">
              {clubData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="w-[340px] h-[144px] mx-auto bg-[#F9F9F9] rounded-[8px] p-[12px] flex gap-[12px]"
                >
                  {achievement.imagePosition === "left" ? (
                    <>
                      {/* 图片在左 */}
                      <div className="w-[100px] h-[120px] bg-[#E5E5E5] rounded-[4px] flex-shrink-0" />
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-[16px] font-semibold text-[#1A1A1A]">{achievement.title}</h4>
                        <p className="text-[13px] text-[#666666] leading-relaxed mt-2 line-clamp-4">
                          {achievement.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 图片在右 */}
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-[16px] font-semibold text-[#1A1A1A]">{achievement.title}</h4>
                        <p className="text-[13px] text-[#666666] leading-relaxed mt-2 line-clamp-4">
                          {achievement.description}
                        </p>
                      </div>
                      <div className="w-[100px] h-[120px] bg-[#E5E5E5] rounded-[4px] flex-shrink-0" />
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* 活动信息卡片 */}
            <div className="mt-[8px] w-[340px] mx-auto bg-[#F9F9F9] rounded-[8px] p-[16px]">
              <div className="grid grid-cols-3 gap-[8px] text-center">
                <div>
                  <p className="text-[13px] font-medium text-[#1A1A1A]">活动频率</p>
                  <p className="text-[13px] text-[#666666] mt-1">{clubData.activityInfo.frequency}</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1A1A1A]">活动时间</p>
                  <p className="text-[13px] text-[#666666] mt-1">{clubData.activityInfo.time}</p>
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1A1A1A]">如何加入</p>
                  <p className="text-[13px] text-[#666666] mt-1">{clubData.activityInfo.howToJoin}</p>
                </div>
              </div>
            </div>
          </section>

          {/* 加入我们，你将... */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">加入我们，你将...</h3>
            <ul className="mt-[16px] space-y-2">
              {clubData.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[13px] text-[#1A1A1A] mt-0.5">•</span>
                  <span className="text-[13px] text-[#666666] leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 我们希望你 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">我们希望你</h3>
            <ul className="mt-[16px] space-y-2">
              {clubData.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[13px] text-[#1A1A1A] mt-0.5">•</span>
                  <span className="text-[13px] text-[#666666] leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 组织构成 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">组织构成</h3>
            <p className="text-[13px] text-[#666666] mt-[16px] leading-relaxed">
              SUMA目前由xx部、宣传部、外联部、后勤部联合组成。
            </p>
            
            <div className="mt-[16px] space-y-[8px]">
              {clubData.departments.map((dept, index) => (
                <div
                  key={index}
                  className="w-[318px] h-[102px] mx-auto bg-[#F9F9F9] rounded-[8px] p-[12px] flex gap-[12px]"
                >
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-[#1A1A1A]">{dept.name}</h4>
                    <p className="text-[13px] text-[#666666] leading-relaxed mt-1 line-clamp-2">
                      {dept.description}
                    </p>
                    <p className="text-[13px] text-[#999999] mt-1">{dept.leader}：{dept.leaderName}</p>
                  </div>
                  {/* 部长头像 */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#E5E5E5] flex items-center justify-center">
                      <span className="text-[13px] text-[#999999]">部长大头贴</span>
                    </div>
                    <span className="text-[11px] text-[#999999]">{dept.leader}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 社长登场 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">{clubData.president.title}</h3>
            <div className="mt-[16px] flex gap-[12px]">
              <div className="flex-1">
                <p className="text-[13px] text-[#666666] leading-relaxed">
                  {clubData.president.message}
                </p>
              </div>
              {/* 社长头像 */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-[64px] h-[64px] rounded-full bg-[#E5E5E5] flex items-center justify-center">
                  <span className="text-[11px] text-[#999999]">社长靓照</span>
                </div>
                <span className="text-[13px] text-[#666666]">{clubData.president.name}：xxx</span>
              </div>
            </div>
          </section>

          {/* 结语 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A]">结语</h3>
            <p className="text-[13px] text-[#666666] leading-relaxed mt-[16px]">
              {clubData.conclusion}
            </p>
          </section>

          {/* 操作按钮 */}
          <section className="px-4 py-4">
            <div className="flex gap-4">
              <button className="flex-1 h-[44px] border border-[#E5E5E5] rounded-[8px] text-[16px] font-medium text-[#666666] bg-white hover:bg-[#F5F5F5] transition-colors">
                再看看吧
              </button>
              <button className="flex-1 h-[44px] border border-[#AE322A] rounded-[8px] text-[16px] font-medium text-[#AE322A] bg-white hover:bg-[#FFF5F5] transition-colors flex items-center justify-center gap-1">
                <Heart className="w-4 h-4" />
                心动
              </button>
            </div>
          </section>

          {/* 收藏和分享按钮 */}
          <section className="px-4 pb-4 flex justify-center gap-8">
            <button className="flex flex-col items-center gap-1">
              <Bookmark className="w-6 h-6 text-[#999999]" />
            </button>
            <button className="flex flex-col items-center gap-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </button>
          </section>
        </main>

        {/* 底部导航 - 固定在底部 */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50">
          <div className="max-w-[390px] mx-auto flex items-center justify-around h-14 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
                    isActive ? "text-[#F5B70A]" : "text-[#999999] hover:text-[#666666]"
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
