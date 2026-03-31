"use client"

// 社团端 - 学生信息表单页（只读）
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

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

// 模拟学生申请数据（从入社申请表单获取的完整数据）
const mockStudentData = {
  id: "1",
  name: "文字文",
  avatar: null,
  // 基础信息
  nickname: "小明",
  gender: "male",
  grade: "大一",
  college: "计算机学院",
  // 兴趣标签
  primaryTags: ["tech", "entertainment"],
  secondaryTags: ["programming", "gaming", "ai"],
  // 参与意愿
  experience: "tried",
  frequency: "weekly",
  weeklyHours: "2to5",
  monthlyFee: "30",
  needTraining: "no",
  philosophy: "freedom",
  // 社交风格
  socialStyle: "follower",
  groupSize: "small",
  // 目标期望
  goals: ["skill", "friends", "interest"],
  // 自我推荐
  selfRecommendation: "我是来自计算机学院大一的新生，从小喜欢文学，最喜欢的作家是鲁迅。希望能加入贵社团，和大家一起交流学习！",
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

export default function StudentApplicationPage() {
  const router = useRouter()
  const studentData = mockStudentData

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
            className="w-8 h-8 flex items-center justify-center rounded-[4px] hover:bg-[#F5F5F5] active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="flex-1 text-center text-[16px] font-semibold text-[#1A1A1A]">申请详情</h1>
          <div className="w-8 h-8"></div>
        </header>

        {/* 主内容区域 */}
        <main className="flex-1 overflow-y-auto scrollbar-hide pb-8 bg-[#F9F6E5]">
          {/* 学生头像和姓名 */}
          <section className="mx-4 mt-4 px-4 py-6 bg-white rounded-[8px] border border-[#E5E5E5]">
            <div className="flex items-center gap-4">
              {/* 大头贴 */}
              <div 
                className="rounded-full bg-[#E5E5E5] flex-shrink-0 flex items-center justify-center"
                style={{ width: "64px", height: "64px" }}
              >
                {studentData.avatar ? (
                  <img 
                    src={studentData.avatar} 
                    alt={studentData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#D9D9D9]" />
                )}
              </div>
              <div>
                <h2 className="text-[20px] font-semibold text-[#1A1A1A]">{studentData.nickname}</h2>
                <p className="text-[14px] text-[#666666] mt-1">{studentData.college} · {studentData.grade}</p>
              </div>
            </div>
          </section>

          <div className="h-3 bg-[#F9F6E5]" />

          {/* 基础信息 */}
          <section className="mx-4 px-4 py-4 bg-white rounded-[8px] border border-[#E5E5E5]">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">基础信息</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">昵称</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{studentData.nickname}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">性别</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{genderLabels[studentData.gender]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">年级</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{studentData.grade}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] text-[#666666]">学院</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{studentData.college}</span>
              </div>
            </div>
          </section>

          <div className="h-3 bg-[#F9F6E5]" />

          {/* 兴趣标签 */}
          <section className="mx-4 px-4 py-4 bg-white rounded-[8px] border border-[#E5E5E5]">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">兴趣标签</h3>
            
            <div className="flex flex-wrap gap-2">
              {[...studentData.primaryTags, ...studentData.secondaryTags].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[13px] text-[#F5B70A] bg-[#F5B70A]/10 rounded-[4px] font-medium"
                >
                  {tagLabels[tag] || tag}
                </span>
              ))}
            </div>
          </section>

          <div className="h-3 bg-[#F9F6E5]" />

          {/* 参与意愿 */}
          <section className="mx-4 px-4 py-4 bg-white rounded-[8px] border border-[#E5E5E5]">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">参与意愿</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">经验程度</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{experienceLabels[studentData.experience]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">参与频率</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{frequencyLabels[studentData.frequency]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">每周时间</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{hoursLabels[studentData.weeklyHours]}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">月费预算</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{studentData.monthlyFee}元/月</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">新人培训</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{trainingLabels[studentData.needTraining]}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] text-[#666666]">参与理念</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{philosophyLabels[studentData.philosophy]}</span>
              </div>
            </div>
          </section>

          <div className="h-3 bg-[#F9F6E5]" />

          {/* 社交风格 */}
          <section className="mx-4 px-4 py-4 bg-white rounded-[8px] border border-[#E5E5E5]">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">社交风格</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-[#F5F5F5]">
                <span className="text-[14px] text-[#666666]">社交风格</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{socialLabels[studentData.socialStyle]}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[14px] text-[#666666]">团队规模偏好</span>
                <span className="text-[14px] text-[#1A1A1A] font-medium">{groupLabels[studentData.groupSize]}</span>
              </div>
            </div>
          </section>

          <div className="h-3 bg-[#F9F6E5]" />

          {/* 目标期望 */}
          <section className="mx-4 px-4 py-4 bg-white rounded-[8px] border border-[#E5E5E5]">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">目标期望</h3>
            
            <div className="flex flex-wrap gap-2">
              {studentData.goals.map((goal) => (
                <span
                  key={goal}
                  className="px-3 py-1.5 text-[13px] text-white bg-[#F5B70A] rounded-[4px] font-medium"
                >
                  {goalLabels[goal]}
                </span>
              ))}
            </div>
          </section>

          <div className="h-3 bg-[#F9F6E5]" />

          {/* 自我推荐 */}
          <section className="mx-4 px-4 py-4 bg-white rounded-[8px] border border-[#E5E5E5]">
            <h3 className="text-[16px] font-semibold text-[#1A1A1A] mb-4">自我推荐</h3>
            
            <div className="p-3 bg-[#F5F5F5] rounded-[8px]">
              <p className="text-[14px] text-[#1A1A1A] leading-relaxed">
                {studentData.selfRecommendation || "该学生未填写自我推荐"}
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
