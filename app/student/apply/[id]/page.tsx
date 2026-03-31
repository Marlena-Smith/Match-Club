"use client"

// Club Application Page - 入社申请页
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Save, Send, Check, X } from "lucide-react"

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

// 模拟从个人画像获取的用户数据（静态前端）
const defaultUserProfile = {
  nickname: "小明",
  gender: "male",
  grade: "大二",
  college: "计算机学院",
  primaryTags: ["tech", "entertainment"],
  secondaryTags: ["programming", "gaming", "ai"],
  experience: "tried",
  frequency: "weekly",
  weeklyHours: "2to5",
  monthlyFee: "30",
  needTraining: "no",
  philosophy: "freedom",
  socialStyle: "follower",
  groupSize: "small",
  goals: ["skill", "friends", "interest"],
}

// 标签映射
const tagLabels: Record<string, string> = {
  sports: "体育", art: "艺术", academic: "学术", tech: "技术",
  entertainment: "娱乐", charity: "公益", social: "社交",
  basketball: "篮球", football: "足球", badminton: "羽毛球",
  swimming: "游泳", running: "跑步", yoga: "瑜伽",
  music: "音乐", dance: "舞蹈", painting: "绘画",
  photography: "摄影", drama: "戏剧", debate: "辩论",
  reading: "阅读", writing: "写作", language: "语言学习",
  programming: "编程", robotics: "机器人", ai: "人工智能",
  design: "设计", gaming: "游戏", anime: "动漫",
  movie: "电影", boardgame: "桌游", volunteer: "志愿服务",
  environment: "环保", education: "支教", networking: "社交活动",
  party: "派对", travel: "旅行",
}

const genderLabels: Record<string, string> = {
  male: "男", female: "女", other: "其他"
}

const experienceLabels: Record<string, string> = {
  newbie: "想尝试", tried: "已玩过", expert: "老玩家"
}

const frequencyLabels: Record<string, string> = {
  high: "高频参与", weekly: "每周一次", occasional: "偶尔参加"
}

const hoursLabels: Record<string, string> = {
  less2: "< 2小时/周", "2to5": "2-5小时/周", more5: "5小时+/周"
}

const trainingLabels: Record<string, string> = {
  yes: "需要培训", no: "直接上手"
}

const philosophyLabels: Record<string, string> = {
  freedom: "自由参与", supervision: "有人监督"
}

const socialLabels: Record<string, string> = {
  leader: "我带氛围", follower: "开团秒跟", introvert: "社恐求带"
}

const groupLabels: Record<string, string> = {
  big: "大家庭 (20人以上)", small: "小团体 (20人以下)"
}

const goalLabels: Record<string, string> = {
  friends: "交友", skill: "技能", happiness: "快乐",
  ability: "能力提升", resume: "履历", interest: "兴趣"
}

export default function ApplyPage() {
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // 表单数据（自动填充个人画像内容，可编辑）
  const [formData, setFormData] = useState({
    ...defaultUserProfile,
    selfRecommendation: "", // 自荐内容
  })

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleSubmit = () => {
    setShowSuccessModal(true)
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    router.push("/student/match-result")
  }

  const updateField = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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

        {/* 顶部导航 - 44px */}
        <header className="h-[44px] px-4 flex items-center bg-[#F9F6E5]">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-[#F5B70A]/10 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-[#1A1A1A]">入社申请</h1>
          <button
            onClick={handleSave}
            className={`w-8 h-8 flex items-center justify-center rounded-[4px] transition-all ${isSaved ? "bg-[#4CAF50]/10" : "hover:bg-[#F5B70A]/10 active:scale-95"}`}
          >
            {isSaved ? (
              <Check className="w-5 h-5 text-[#4CAF50]" />
            ) : (
              <Save className="w-5 h-5 text-[#666666]" />
            )}
          </button>
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-[100px] bg-white">
          {/* 申请社团信息 */}
          <section className="px-4 py-4 bg-gradient-to-b from-[#F9F6E5] to-white">
            <div className="flex items-center gap-3 p-3 bg-white rounded-[8px] border border-[#F5B70A]/30 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#F5B70A]/10 border border-[#F5B70A]/30 flex items-center justify-center flex-shrink-0">
                <span className="text-[16px] font-semibold text-[#F5B70A]">S</span>
              </div>
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-[#1A1A1A]">正在申请：SUMA音乐协会</h2>
                <p className="text-[13px] text-[#666666] mt-0.5">填写以下信息，让社团更了解你</p>
              </div>
            </div>
          </section>

          {/* 基础信息 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">基础信息</h3>
            
            <div className="space-y-4">
              {/* 昵称 */}
              <div>
                <label className="text-[13px] text-[#666666] mb-1 block">昵称</label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => updateField("nickname", e.target.value)}
                  className="w-full h-[44px] px-3 rounded-[4px] border border-[#E5E5E5] text-[15px] text-[#1A1A1A] focus:border-[#F5B70A] focus:outline-none transition-colors"
                />
              </div>

              {/* 性别 */}
              <div>
                <label className="text-[13px] text-[#666666] mb-1 block">性别</label>
                <div className="flex gap-2">
                  {Object.entries(genderLabels).map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => updateField("gender", value)}
                      className={`flex-1 h-[40px] rounded-[4px] text-[14px] font-medium transition-all ${
                        formData.gender === value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-[#F5F5F5] text-[#666666] hover:bg-[#F5B70A]/10"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 年级 */}
              <div>
                <label className="text-[13px] text-[#666666] mb-1 block">年级</label>
                <input
                  type="text"
                  value={formData.grade}
                  onChange={(e) => updateField("grade", e.target.value)}
                  className="w-full h-[44px] px-3 rounded-[4px] border border-[#E5E5E5] text-[15px] text-[#1A1A1A] focus:border-[#F5B70A] focus:outline-none transition-colors"
                />
              </div>

              {/* 学院 */}
              <div>
                <label className="text-[13px] text-[#666666] mb-1 block">学院</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => updateField("college", e.target.value)}
                  className="w-full h-[44px] px-3 rounded-[4px] border border-[#E5E5E5] text-[15px] text-[#1A1A1A] focus:border-[#F5B70A] focus:outline-none transition-colors"
                />
              </div>
            </div>
          </section>

          <div className="h-[1px] bg-[#E5E5E5] mx-4" />

          {/* 兴趣标签 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">兴趣标签</h3>
            
            <div className="flex flex-wrap gap-2">
              {[...formData.primaryTags, ...formData.secondaryTags].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[13px] text-[#F5B70A] bg-[#F5B70A]/10 rounded-[4px] font-medium"
                >
                  {tagLabels[tag] || tag}
                </span>
              ))}
            </div>
          </section>

          <div className="h-[1px] bg-[#E5E5E5] mx-4" />

          {/* 参与意愿 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">参与意愿</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">经验程度</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{experienceLabels[formData.experience]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">参与频率</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{frequencyLabels[formData.frequency]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">每周时间</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{hoursLabels[formData.weeklyHours]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">月费预算</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{formData.monthlyFee}元/月</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">新人培训</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{trainingLabels[formData.needTraining]}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] text-[#666666]">参与理念</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{philosophyLabels[formData.philosophy]}</span>
              </div>
            </div>
          </section>

          <div className="h-[1px] bg-[#E5E5E5] mx-4" />

          {/* 社交风格 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">社交风格</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">社交风格</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{socialLabels[formData.socialStyle]}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] text-[#666666]">团队规模偏好</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{groupLabels[formData.groupSize]}</span>
              </div>
            </div>
          </section>

          <div className="h-[1px] bg-[#E5E5E5] mx-4" />

          {/* 目标期望 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">目标期望</h3>
            
            <div className="flex flex-wrap gap-2">
              {formData.goals.map((goal) => (
                <span
                  key={goal}
                  className="px-3 py-1.5 text-[13px] text-white bg-[#F5B70A] rounded-[4px] font-medium"
                >
                  {goalLabels[goal]}
                </span>
              ))}
            </div>
          </section>

          <div className="h-[1px] bg-[#E5E5E5] mx-4" />

          {/* 自荐信 - 核心新增内容 */}
          <section className="px-4 py-4">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-2">自我推荐</h3>
            <p className="text-[13px] text-[#999999] mb-4">写一段话介绍自己，让社团的小伙伴更了解你~</p>
            
            <textarea
              value={formData.selfRecommendation}
              onChange={(e) => updateField("selfRecommendation", e.target.value)}
              placeholder="例如：我是一个热爱音乐的大二学生，虽然没有专业基础，但我有一颗热忱的心！希望能在SUMA找到志同道合的朋友，一起玩音乐~"
              className="w-full h-[120px] p-3 rounded-[8px] border border-[#E5E5E5] text-[14px] text-[#1A1A1A] placeholder:text-[#CCCCCC] focus:border-[#F5B70A] focus:outline-none transition-colors resize-none leading-relaxed"
            />
            <div className="text-right mt-1">
              <span className="text-[12px] text-[#999999]">{formData.selfRecommendation.length}/500</span>
            </div>
          </section>
        </main>

        {/* 底部操作按钮 - 固定 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50">
          <div className="max-w-[390px] mx-auto px-4 py-3 flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 h-[44px] border border-[#E5E5E5] rounded-[8px] text-[15px] font-medium text-[#666666] bg-white hover:bg-[#F5F5F5] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              保存
            </button>
            <button
              onClick={handleSubmit}
              className="flex-[2] h-[44px] rounded-[8px] text-[15px] font-semibold text-white bg-[#F5B70A] hover:bg-[#E5A700] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              提交申请
            </button>
          </div>
        </div>
      </div>

      {/* 提交成功弹窗 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-8">
          <div className="bg-white rounded-[12px] p-6 w-full max-w-[300px] text-center animate-in fade-in zoom-in duration-200">
            {/* 成功图标 */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-[#4CAF50]" />
            </div>
            
            <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">提交成功</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed mb-6">
              等待社团的好消息吧！
            </p>

            <button
              onClick={handleCloseModal}
              className="w-full h-[44px] rounded-[8px] text-[15px] font-semibold text-white bg-[#F5B70A] hover:bg-[#E5A700] active:scale-[0.98] transition-all"
            >
              好的
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
