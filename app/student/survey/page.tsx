"use client"

// Survey page - uses native HTML for avatar display
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/match-club/status-bar"
import { MCButton } from "@/components/match-club/mc-button"

import { Tag } from "@/components/match-club/tag"
import { ArrowLeft, Camera, GripVertical, ChevronDown, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

// 问卷步骤
const STEPS = [
  { id: 1, title: "基础信息", subtitle: "让我们认识你", icon: "👋" },
  { id: 2, title: "兴趣标签", subtitle: "你喜欢什么", icon: "✨" },
  { id: 3, title: "投入与精力", subtitle: "你能投入多少", icon: "⏰" },
  { id: 4, title: "性格与社交", subtitle: "你的社交风格", icon: "💬" },
  { id: 5, title: "目标导向", subtitle: "你想要什么", icon: "🎯" },
]

// 选项数据
const GENDER_OPTIONS = [
  { value: "male", label: "男", icon: "👦" },
  { value: "female", label: "女", icon: "👧" },
  { value: "other", label: "其他", icon: "🌈" },
]

const PRIMARY_TAG_OPTIONS = [
  { value: "sports", label: "体育", icon: "🏀" },
  { value: "art", label: "艺术", icon: "🎨" },
  { value: "academic", label: "学术", icon: "📚" },
  { value: "tech", label: "技术", icon: "💻" },
  { value: "entertainment", label: "娱乐", icon: "🎮" },
  { value: "charity", label: "公益", icon: "💚" },
  { value: "social", label: "社交", icon: "🎉" },
]

const SECONDARY_TAGS: Record<string, { value: string; label: string }[]> = {
  sports: [
    { value: "basketball", label: "篮球" },
    { value: "football", label: "足球" },
    { value: "badminton", label: "羽毛球" },
    { value: "swimming", label: "游泳" },
    { value: "running", label: "跑步" },
    { value: "yoga", label: "瑜伽" },
  ],
  art: [
    { value: "music", label: "音乐" },
    { value: "dance", label: "舞蹈" },
    { value: "painting", label: "绘画" },
    { value: "photography", label: "摄影" },
    { value: "drama", label: "戏剧" },
  ],
  academic: [
    { value: "debate", label: "辩论" },
    { value: "reading", label: "阅读" },
    { value: "writing", label: "写作" },
    { value: "language", label: "语言学习" },
  ],
  tech: [
    { value: "programming", label: "编程" },
    { value: "robotics", label: "机器人" },
    { value: "ai", label: "人工智能" },
    { value: "design", label: "设计" },
  ],
  entertainment: [
    { value: "gaming", label: "游戏" },
    { value: "anime", label: "动漫" },
    { value: "movie", label: "电影" },
    { value: "boardgame", label: "桌游" },
  ],
  charity: [
    { value: "volunteer", label: "志愿服务" },
    { value: "environment", label: "环保" },
    { value: "education", label: "支教" },
  ],
  social: [
    { value: "networking", label: "社交活动" },
    { value: "party", label: "派对" },
    { value: "travel", label: "旅行" },
  ],
}

const EXPERIENCE_OPTIONS = [
  { value: "newbie", label: "想尝试", desc: "还没接触过，想探索新领域", icon: "🌱" },
  { value: "tried", label: "已玩过", desc: "有一些基础，想更深入", icon: "🌿" },
  { value: "expert", label: "老玩家", desc: "经验丰富，想找到志同道合的人", icon: "🌳" },
]

const FREQUENCY_OPTIONS = [
  { value: "high", label: "高频参与", desc: "每周多次，我是活动狂热者", icon: "🔥" },
  { value: "weekly", label: "每周一次", desc: "固定时间，规律生活", icon: "📅" },
  { value: "occasional", label: "偶尔参加", desc: "随心所欲，佛系参与", icon: "🍃" },
]

const HOURS_OPTIONS = [
  { value: "less2", label: "< 2小时", desc: "轻度参与" },
  { value: "2to5", label: "2-5小时", desc: "适度投入" },
  { value: "more5", label: "5小时+", desc: "深度参与" },
]

const FEE_OPTIONS = [
  { value: "0", label: "0元", desc: "白嫖党" },
  { value: "10", label: "10元", desc: "象征性" },
  { value: "20", label: "20元", desc: "小投入" },
  { value: "30", label: "30元", desc: "正常" },
  { value: "50", label: "50元", desc: "愿意付费" },
  { value: "80", label: "80元", desc: "高投入" },
  { value: "100", label: "100元", desc: "不差钱" },
]

const NEWBIE_TRAINING_OPTIONS = [
  { value: "yes", label: "需要培训", desc: "希望有人带入门", icon: "🎓" },
  { value: "no", label: "直接上手", desc: "我能自学", icon: "🚀" },
]

const PHILOSOPHY_OPTIONS = [
  { value: "freedom", label: "想要自由", desc: "自主参与", icon: "🦋" },
  { value: "supervision", label: "想要监督", desc: "更有动力", icon: "📋" },
]

const SOCIAL_OPTIONS = [
  { value: "leader", label: "我带氛围", desc: "社牛本牛，活跃气氛", icon: "🎤" },
  { value: "follower", label: "开团秒跟", desc: "有活动就参加，但不主动", icon: "🙋" },
  { value: "introvert", label: "社恐求带", desc: "比较内向，需要融入", icon: "🐢" },
]

const GROUP_OPTIONS = [
  { value: "big", label: "大家庭", desc: "20人以上, 热闹", icon: "👨‍👩‍👧‍👦" },
  { value: "small", label: "小团体", desc: "20人以下, 亲密", icon: "👥" },
]

const GOAL_OPTIONS = [
  { id: "friends", label: "交友", icon: "🤝", color: "#F5B70A" },
  { id: "skill", label: "技能", icon: "🛠️", color: "#0095B6" },
  { id: "happiness", label: "快乐", icon: "😊", color: "#4CAF50" },
  { id: "ability", label: "能力提升", icon: "📈", color: "#9C27B0" },
  { id: "resume", label: "履历", icon: "📄", color: "#FF9800" },
  { id: "interest", label: "兴趣", icon: "💡", color: "#E91E63" },
]

// 自定义输入组件 - 4px圆角
function SurveyInput({
  label,
  placeholder,
  value,
  onChange,
  helper,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  helper?: string
}) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="w-full">
      <label className="block text-[16px] font-medium text-[#1A1A1A] mb-2">
        {label}
      </label>
      <div className={cn(
        "relative transition-all duration-200",
        isFocused && "transform scale-[1.01]"
      )}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "w-full px-3 h-11 rounded-[4px] border-2 transition-all duration-200",
            "text-[16px] text-[#1A1A1A] placeholder:text-[#999999]",
            "bg-white focus:outline-none",
            isFocused
              ? "border-[#F5B70A] shadow-[0_0_0_3px_rgba(245,183,10,0.15)]"
              : "border-[#E5E5E5] hover:border-[#F5B70A]/50"
          )}
        />
      </div>
      {helper && (
        <p className="mt-2 text-[13px] text-[#999999]">{helper}</p>
      )}
    </div>
  )
}

// 自定义下拉选择组件 - 4px圆角
function SurveySelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  options: { value: string; label: string; icon?: string }[]
  value: string
  onChange: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="w-full" ref={containerRef}>
      <label className="block text-[16px] font-medium text-[#1A1A1A] mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full px-3 h-11 rounded-[4px] border-2 transition-all duration-200",
            "text-[16px] text-left bg-white",
            "flex items-center justify-between gap-2",
            "focus:outline-none",
            isOpen
              ? "border-[#F5B70A] shadow-[0_0_0_3px_rgba(245,183,10,0.15)]"
              : "border-[#E5E5E5] hover:border-[#F5B70A]/50"
          )}
        >
          <span className={cn(
            "flex items-center gap-2",
            selectedOption ? "text-[#1A1A1A]" : "text-[#999999]"
          )}>
            {selectedOption?.icon && <span>{selectedOption.icon}</span>}
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-[#999999] transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 py-1 bg-white rounded-[4px] border-2 border-[#E5E5E5] shadow-lg max-h-60 overflow-auto animate-in fade-in slide-in-from-top-2 duration-150">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full px-3 h-11 text-left text-[16px] transition-colors",
                  "flex items-center justify-between gap-2",
                  "hover:bg-[#F5B70A]/10",
                  option.value === value && "text-[#F5B70A] bg-[#F5B70A]/5"
                )}
              >
                <span className="flex items-center gap-2">
                  {option.icon && <span>{option.icon}</span>}
                  {option.label}
                </span>
                {option.value === value && (
                  <Check className="w-4 h-4 text-[#F5B70A]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 选项按钮组件 - 带描述和图标
function OptionButton({
  selected,
  onClick,
  label,
  desc,
  icon,
  color = "#F5B70A",
  fullWidth = true,
}: {
  selected: boolean
  onClick: () => void
  label: string
  desc?: string
  icon?: string
  color?: string
  fullWidth?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-[4px] px-4 text-left transition-all duration-200",
        "border-2 flex items-center gap-3",
        fullWidth ? "w-full" : "",
        desc ? "h-[60px]" : "h-11",
        selected
          ? "border-transparent text-white shadow-md transform scale-[1.02]"
          : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:border-[#F5B70A]/50 hover:shadow-sm"
      )}
      style={{
        backgroundColor: selected ? color : undefined,
      }}
    >
      {icon && (
        <span className={cn(
          "text-[20px] transition-transform duration-200",
          selected && "transform scale-110"
        )}>
          {icon}
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-[16px] font-medium truncate",
          selected ? "text-white" : "text-[#1A1A1A]"
        )}>
          {label}
        </p>
        {desc && (
          <p className={cn(
            "text-[12px] truncate",
            selected ? "text-white/80" : "text-[#999999]"
          )}>
            {desc}
          </p>
        )}
      </div>
      {selected && (
        <Check className="w-5 h-5 text-white flex-shrink-0" />
      )}
    </button>
  )
}

// 标签选择按钮
function TagButton({
  selected,
  onClick,
  label,
  icon,
  color = "#F5B70A",
}: {
  selected: boolean
  onClick: () => void
  label: string
  icon?: string
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-9 px-4 rounded-[4px] text-[14px] font-medium transition-all duration-200",
        "border-2 flex items-center gap-1.5",
        selected
          ? "border-transparent text-white shadow-md transform scale-[1.05]"
          : "border-[#E5E5E5] bg-white text-[#666666] hover:border-[#F5B70A]/50"
      )}
      style={{
        backgroundColor: selected ? color : undefined,
      }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  )
}

// 费用滑块选择器
function FeeSelector({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; desc: string }[]
}) {
  const selectedIndex = options.findIndex((opt) => opt.value === value)

  return (
    <div className="w-full">
      <label className="block text-[16px] font-medium text-[#1A1A1A] mb-3">
        可接受的最高会费
      </label>
      <div className="relative">
        {/* 费用条 */}
        <div className="flex gap-1">
          {options.map((opt, index) => (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                "flex-1 h-10 rounded-[4px] transition-all duration-200 flex items-center justify-center",
                "text-[13px] font-medium",
                index <= selectedIndex
                  ? "bg-[#F5B70A] text-white"
                  : "bg-[#E5E5E5]/50 text-[#999999] hover:bg-[#E5E5E5]"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* 描述 */}
        {value && (
          <p className="mt-2 text-center text-[13px] text-[#F5B70A] font-medium animate-in fade-in duration-200">
            {options.find((opt) => opt.value === value)?.desc}
          </p>
        )}
      </div>
    </div>
  )
}

export default function StudentSurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  // 表单数据
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    gender: "",
    avatar: "",
    interest_tag_primary: "",
    interest_tag_secondary: "",
    interest_tag_custom: "",
    experience_level: "",
    prefer_activity_frequency: "",
    prefer_weekly_hours: "",
    max_fee_acceptable: "",
    need_newbie_training: "",
    participation_philosophy: "",
    social_tendency: "",
    group_preference: "",
    main_goals: [] as string[],
  })

  const updateFormData = (key: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleGoalToggle = (goalId: string) => {
    const currentGoals = formData.main_goals
    if (currentGoals.includes(goalId)) {
      updateFormData("main_goals", currentGoals.filter((g) => g !== goalId))
    } else if (currentGoals.length < 3) {
      updateFormData("main_goals", [...currentGoals, goalId])
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsAnimating(false)
        // 滚动到页面顶部
        window.scrollTo(0, 0)
      }, 150)
    } else {
      // 提交表单，跳转到匹配结果页
      router.push("/student/match-result")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep(currentStep - 1)
        setIsAnimating(false)
        // 滚动到页面顶部
        window.scrollTo(0, 0)
      }, 150)
    } else {
      router.push("/student")
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col font-['PingFang_SC',_-apple-system,_sans-serif]">
      {/* 手机框架 */}
      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col">
        {/* 状态栏 */}
        <StatusBar />

        {/* 导航栏 - 44px高度 */}
        <header className="h-[44px] px-4 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-[4px] hover:bg-[#F5B70A]/10 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[20px]">{STEPS[currentStep - 1].icon}</span>
              <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
                {STEPS[currentStep - 1].title}
              </h1>
            </div>
            <p className="text-[13px] text-[#666666]">
              {STEPS[currentStep - 1].subtitle}
            </p>
          </div>
          <span className="text-[13px] text-[#999999] bg-[#F5B70A]/10 px-2 py-1 rounded-[4px]">
            {currentStep}/{STEPS.length}
          </span>
        </header>

        {/* 进度指示器 */}
        <div className="px-4 mb-4">
          {/* 步骤点 */}
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "w-8 h-8 rounded-[4px] flex items-center justify-center text-[14px] font-medium transition-all duration-300",
                  index + 1 < currentStep
                    ? "bg-[#F5B70A] text-white"
                    : index + 1 === currentStep
                      ? "bg-[#F5B70A] text-white shadow-md scale-110"
                      : "bg-[#E5E5E5] text-[#999999]"
                )}
              >
                {index + 1 < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
          {/* 进度条 */}
          <div className="h-1 bg-[#E5E5E5] rounded-[4px] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F5B70A] to-[#FDD835] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 表单内容 */}
        <div className={cn(
          "flex-1 px-4 pb-6 overflow-y-auto transition-all duration-150",
          isAnimating && "opacity-0 transform translate-x-4"
        )}>
          {/* Step 1: 基础信息 */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* 头像上传 */}
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#F5B70A]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="头像"
                      className="w-24 h-24 rounded-full object-cover relative border-3 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[28px] font-medium text-[#666666] relative border-3 border-white shadow-lg group-hover:scale-105 transition-transform duration-200">
                      {(formData.nickname || "你").slice(0, 2)}
                    </div>
                  )}
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F5B70A] rounded-[4px] flex items-center justify-center shadow-md hover:bg-[#C99700] active:scale-95 transition-all duration-200">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-[13px] text-[#666666]">点击上传你的大头贴</span>
              </div>

              <SurveyInput
                label="姓名"
                placeholder="请输入真实姓名"
                value={formData.name}
                onChange={(v) => updateFormData("name", v)}
              />

              <SurveyInput
                label="昵称"
                placeholder="给自己取个昵称吧"
                value={formData.nickname}
                onChange={(v) => updateFormData("nickname", v)}
                helper="这个昵称将展示给其他同学"
              />

              <div>
                <label className="block text-[16px] font-medium text-[#1A1A1A] mb-3">
                  性别
                </label>
                <div className="flex gap-3">
                  {GENDER_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("gender", opt.value)}
                      className={cn(
                        "flex-1 h-14 rounded-[4px] border-2 transition-all duration-200",
                        "flex flex-col items-center justify-center gap-1",
                        formData.gender === opt.value
                          ? "border-[#F5B70A] bg-[#F5B70A]/10 text-[#1A1A1A] shadow-md"
                          : "border-[#E5E5E5] bg-white text-[#666666] hover:border-[#F5B70A]/50"
                      )}
                    >
                      <span className="text-[20px]">{opt.icon}</span>
                      <span className="text-[14px] font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 兴趣标签 */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  你最感兴趣的领域是？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  选择一个最能代表你的方向
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_TAG_OPTIONS.map((tag) => (
                    <TagButton
                      key={tag.value}
                      selected={formData.interest_tag_primary === tag.value}
                      onClick={() => {
                        updateFormData("interest_tag_primary", tag.value)
                        updateFormData("interest_tag_secondary", "")
                      }}
                      label={tag.label}
                      icon={tag.icon}
                    />
                  ))}
                </div>
              </div>

              {formData.interest_tag_primary && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                    具体哪个方向？
                  </p>
                  <p className="text-[13px] text-[#666666] mb-3">
                    让我们更精准地了解你
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SECONDARY_TAGS[formData.interest_tag_primary]?.map((tag) => (
                      <TagButton
                        key={tag.value}
                        selected={formData.interest_tag_secondary === tag.value}
                        onClick={() => updateFormData("interest_tag_secondary", tag.value)}
                        label={tag.label}
                        color="#0095B6"
                      />
                    ))}
                  </div>
                </div>
              )}

              <SurveyInput
                label="自定义标签（可选）"
                placeholder="用一个词描述你的独特兴趣"
                value={formData.interest_tag_custom}
                onChange={(v) => updateFormData("interest_tag_custom", v)}
                helper="这个标签不参与匹配，但会展示在你的个人主页"
              />

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  你在这个领域的经验？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  帮助匹配适合你水平的社团
                </p>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      selected={formData.experience_level === opt.value}
                      onClick={() => updateFormData("experience_level", opt.value)}
                      label={opt.label}
                      desc={opt.desc}
                      icon={opt.icon}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 投入与精力 */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  你希望多久参加一次活动？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  根据你的日程安排
                </p>
                <div className="space-y-2">
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      selected={formData.prefer_activity_frequency === opt.value}
                      onClick={() => updateFormData("prefer_activity_frequency", opt.value)}
                      label={opt.label}
                      desc={opt.desc}
                      icon={opt.icon}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  每周能投入多少时间？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  包括活动、排练、训练等
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {HOURS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("prefer_weekly_hours", opt.value)}
                      className={cn(
                        "h-16 rounded-[4px] border-2 transition-all duration-200",
                        "flex flex-col items-center justify-center",
                        formData.prefer_weekly_hours === opt.value
                          ? "border-[#F5B70A] bg-[#F5B70A] text-white shadow-md transform scale-[1.02]"
                          : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:border-[#F5B70A]/50"
                      )}
                    >
                      <span className="text-[16px] font-semibold">{opt.label}</span>
                      <span className={cn(
                        "text-[11px]",
                        formData.prefer_weekly_hours === opt.value ? "text-white/80" : "text-[#999999]"
                      )}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <FeeSelector
                value={formData.max_fee_acceptable}
                onChange={(v) => updateFormData("max_fee_acceptable", v)}
                options={FEE_OPTIONS}
              />

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  是否需要新手培训？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  有些社团提供入门指导
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {NEWBIE_TRAINING_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      selected={formData.need_newbie_training === opt.value}
                      onClick={() => updateFormData("need_newbie_training", opt.value)}
                      label={opt.label}
                      desc={opt.desc}
                      icon={opt.icon}
                      fullWidth={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 性格与社交 */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  你更喜欢怎样的社团氛围？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  每个社团的管理风格不同
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {PHILOSOPHY_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      selected={formData.participation_philosophy === opt.value}
                      onClick={() => updateFormData("participation_philosophy", opt.value)}
                      label={opt.label}
                      desc={opt.desc}
                      icon={opt.icon}
                      fullWidth={false}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  在社交场合，你是...
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  了解你的社交风格
                </p>
                <div className="space-y-2">
                  {SOCIAL_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      selected={formData.social_tendency === opt.value}
                      onClick={() => updateFormData("social_tendency", opt.value)}
                      label={opt.label}
                      desc={opt.desc}
                      icon={opt.icon}
                      color="#0095B6"
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  你喜欢什么规模的社团？
                </p>
                <p className="text-[13px] text-[#666666] mb-3">
                  大家庭热闹，小团体亲密
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {GROUP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("group_preference", opt.value)}
                      className={cn(
                        "h-24 rounded-[4px] border-2 transition-all duration-200",
                        "flex flex-col items-center justify-center gap-0.6",
                        formData.group_preference === opt.value
                          ? "border-[#F5B70A] bg-[#F5B70A] text-white shadow-md transform scale-[1.02]"
                          : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:border-[#F5B70A]/50"
                      )}
                    >
                      <span className="text-[24px]">{opt.icon}</span>
                      <span className="text-[16px] font-medium">{opt.label}</span>
                      <span className={cn(
                        "text-[11px]",
                        formData.group_preference === opt.value ? "text-white/80" : "text-[#999999]"
                      )}>
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: 目标导向 */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  加入社团，你最想收获什么？
                </p>
                <p className="text-[13px] text-[#666666] mb-4">
                  选择1-3项，点击顺序即为优先级
                </p>

                {/* 目标选择网格 */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {GOAL_OPTIONS.map((goal) => {
                    const isSelected = formData.main_goals.includes(goal.id)
                    const priority = formData.main_goals.indexOf(goal.id) + 1

                    return (
                      <button
                        key={goal.id}
                        onClick={() => handleGoalToggle(goal.id)}
                        disabled={!isSelected && formData.main_goals.length >= 3}
                        className={cn(
                          "relative h-20 rounded-[4px] border-2 transition-all duration-200",
                          "flex flex-col items-center justify-center gap-1",
                          isSelected
                            ? "border-transparent text-white shadow-md transform scale-[1.02]"
                            : formData.main_goals.length >= 3
                              ? "border-[#E5E5E5] bg-white/50 text-[#999999] opacity-50 cursor-not-allowed"
                              : "border-[#E5E5E5] bg-white text-[#1A1A1A] hover:border-[#F5B70A]/50"
                        )}
                        style={{
                          backgroundColor: isSelected ? goal.color : undefined,
                        }}
                      >
                        {isSelected && (
                          <span className="absolute top-1 right-1 w-5 h-5 rounded-[4px] bg-white/20 flex items-center justify-center text-[12px] font-bold">
                            {priority}
                          </span>
                        )}
                        <span className="text-[24px]">{goal.icon}</span>
                        <span className="text-[14px] font-medium">{goal.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* 已选目标预览 */}
                {formData.main_goals.length > 0 && (
                  <div className="p-3 bg-white rounded-[4px] border-2 border-[#E5E5E5] animate-in fade-in duration-200">
                    <p className="text-[13px] text-[#666666] mb-2 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[#F5B70A]" />
                      你的目标优先级
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.main_goals.map((goalId, index) => {
                        const goal = GOAL_OPTIONS.find((g) => g.id === goalId)
                        return (
                          <div
                            key={goalId}
                            className="flex items-center gap-1.5 px-3 h-8 rounded-[4px] text-white text-[14px] font-medium"
                            style={{ backgroundColor: goal?.color }}
                          >
                            <span className="w-4 h-4 rounded-[4px] bg-white/20 flex items-center justify-center text-[11px]">
                              {index + 1}
                            </span>
                            <span>{goal?.icon}</span>
                            <span>{goal?.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* 画像预览 */}
              <div className="p-4 bg-white rounded-[4px] border-2 border-[#F5B70A]/30">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-[#F5B70A]" />
                  <p className="text-[16px] font-semibold text-[#1A1A1A]">你的画像预览</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interest_tag_primary && (
                    <Tag variant="primary" size="sm" className="rounded-[4px]">
                      {PRIMARY_TAG_OPTIONS.find((t) => t.value === formData.interest_tag_primary)?.icon}{" "}
                      {PRIMARY_TAG_OPTIONS.find((t) => t.value === formData.interest_tag_primary)?.label}
                    </Tag>
                  )}
                  {formData.interest_tag_secondary && (
                    <Tag variant="secondary" size="sm" className="rounded-[4px]">
                      {SECONDARY_TAGS[formData.interest_tag_primary]?.find(
                        (t) => t.value === formData.interest_tag_secondary
                      )?.label}
                    </Tag>
                  )}
                  {formData.experience_level && (
                    <Tag variant="outline" size="sm" className="rounded-[4px]">
                      {EXPERIENCE_OPTIONS.find((t) => t.value === formData.experience_level)?.icon}{" "}
                      {EXPERIENCE_OPTIONS.find((t) => t.value === formData.experience_level)?.label}
                    </Tag>
                  )}
                  {formData.social_tendency && (
                    <Tag variant="outline" size="sm" className="rounded-[4px]">
                      {SOCIAL_OPTIONS.find((t) => t.value === formData.social_tendency)?.icon}{" "}
                      {SOCIAL_OPTIONS.find((t) => t.value === formData.social_tendency)?.label}
                    </Tag>
                  )}
                  {formData.interest_tag_custom && (
                    <Tag variant="muted" size="sm" className="rounded-[4px]">
                      {formData.interest_tag_custom}
                    </Tag>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="px-4 pb-8 pt-4 bg-gradient-to-t from-[#F9F6E5] via-[#F9F6E5] to-transparent">
          <MCButton
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            className="h-12 rounded-[4px] text-[16px] shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200"
          >
            {currentStep === STEPS.length ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                完成并开始匹配
              </span>
            ) : (
              "下一步"
            )}
          </MCButton>
        </div>
      </div>
    </div>
  )
}
