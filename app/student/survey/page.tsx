"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatusBar } from "@/components/match-club/status-bar"
import { MCButton } from "@/components/match-club/mc-button"
import { MCInput } from "@/components/match-club/mc-input"
import { MCSelect } from "@/components/match-club/mc-select"
import { MCAvatar } from "@/components/match-club/mc-avatar"
import { Tag } from "@/components/match-club/tag"
import { ArrowLeft, Camera, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

// 问卷步骤
const STEPS = [
  { id: 1, title: "基础信息", subtitle: "让我们认识你" },
  { id: 2, title: "兴趣标签", subtitle: "你喜欢什么" },
  { id: 3, title: "投入与精力", subtitle: "你能投入多少" },
  { id: 4, title: "性格与社交", subtitle: "你的社交风格" },
  { id: 5, title: "目标导向", subtitle: "你想要什么" },
]

// 选项数据
const GENDER_OPTIONS = [
  { value: "male", label: "男" },
  { value: "female", label: "女" },
  { value: "other", label: "其他" },
]

const PRIMARY_TAG_OPTIONS = [
  { value: "sports", label: "体育" },
  { value: "art", label: "艺术" },
  { value: "academic", label: "学术" },
  { value: "tech", label: "技术" },
  { value: "entertainment", label: "娱乐" },
  { value: "charity", label: "公益" },
  { value: "social", label: "社交" },
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
  { value: "newbie", label: "想尝试" },
  { value: "tried", label: "已玩过" },
  { value: "expert", label: "老玩家" },
]

const FREQUENCY_OPTIONS = [
  { value: "high", label: "高频（每周多次）" },
  { value: "weekly", label: "每周一次" },
  { value: "occasional", label: "偶尔参加" },
]

const HOURS_OPTIONS = [
  { value: "less2", label: "< 2小时" },
  { value: "2to5", label: "2-5小时" },
  { value: "more5", label: "5小时+" },
]

const FEE_OPTIONS = [
  { value: "0", label: "0元（免费）" },
  { value: "10", label: "10元" },
  { value: "20", label: "20元" },
  { value: "30", label: "30元" },
  { value: "50", label: "50元" },
  { value: "80", label: "80元" },
  { value: "100", label: "100元" },
]

const NEWBIE_TRAINING_OPTIONS = [
  { value: "yes", label: "是，需要新手培训" },
  { value: "no", label: "否，直接上手" },
]

const PHILOSOPHY_OPTIONS = [
  { value: "freedom", label: "想要自由" },
  { value: "supervision", label: "想要监督" },
]

const SOCIAL_OPTIONS = [
  { value: "leader", label: "我带氛围" },
  { value: "follower", label: "开团秒跟" },
  { value: "introvert", label: "社恐求带" },
]

const GROUP_OPTIONS = [
  { value: "big", label: "想要大家庭" },
  { value: "small", label: "想要小团体" },
]

const GOAL_OPTIONS = [
  { id: "friends", label: "交友" },
  { id: "skill", label: "技能" },
  { id: "happiness", label: "快乐" },
  { id: "ability", label: "能力提升" },
  { id: "resume", label: "履历" },
  { id: "interest", label: "兴趣" },
]

export default function StudentSurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  
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

  const handleGoalReorder = (fromIndex: number, toIndex: number) => {
    const newGoals = [...formData.main_goals]
    const [removed] = newGoals.splice(fromIndex, 1)
    newGoals.splice(toIndex, 0, removed)
    updateFormData("main_goals", newGoals)
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    } else {
      // 提交表单
      router.push("/student/match")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.back()
    }
  }

  const progress = (currentStep / STEPS.length) * 100

  return (
    <div className="min-h-screen bg-[#F9F6E5] flex flex-col font-['PingFang_SC',_-apple-system,_sans-serif]">
      {/* 手机框架 */}
      <div className="max-w-[390px] w-full mx-auto flex-1 flex flex-col">
        {/* 状态栏 */}
        <StatusBar />

        {/* 导航栏 */}
        <header className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#F5B70A]/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          <div className="flex-1">
            <h1 className="text-[20px] font-semibold text-[#1A1A1A]">
              {STEPS[currentStep - 1].title}
            </h1>
            <p className="text-[13px] text-[#666666]">
              {STEPS[currentStep - 1].subtitle}
            </p>
          </div>
          <span className="text-[13px] text-[#999999]">
            {currentStep}/{STEPS.length}
          </span>
        </header>

        {/* 进度条 */}
        <div className="px-4 mb-6">
          <div className="h-1 bg-[#E5E5E5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F5B70A] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 表单内容 */}
        <div className="flex-1 px-4 pb-6 overflow-y-auto">
          {/* Step 1: 基础信息 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* 头像上传 */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <MCAvatar
                    size="2xl"
                    src={formData.avatar}
                    fallback={formData.nickname || "你"}
                    className="border-2 border-[#E5E5E5]"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F5B70A] rounded-full flex items-center justify-center shadow-md">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-[13px] text-[#666666]">点击上传头像</span>
              </div>

              <MCInput
                label="姓名"
                placeholder="请输入真实姓名"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="rounded"
              />

              <MCInput
                label="昵称"
                placeholder="给自己取个昵称吧"
                value={formData.nickname}
                onChange={(e) => updateFormData("nickname", e.target.value)}
                className="rounded"
              />

              <MCSelect
                label="性别"
                placeholder="请选择性别"
                options={GENDER_OPTIONS}
                value={formData.gender}
                onChange={(v) => updateFormData("gender", v)}
              />
            </div>
          )}

          {/* Step 2: 兴趣标签 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  你最感兴趣的领域是？
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRIMARY_TAG_OPTIONS.map((tag) => (
                    <button
                      key={tag.value}
                      onClick={() => {
                        updateFormData("interest_tag_primary", tag.value)
                        updateFormData("interest_tag_secondary", "")
                      }}
                      className={cn(
                        "h-7 px-4 rounded text-[14px] transition-all",
                        formData.interest_tag_primary === tag.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#666666] hover:border-[#F5B70A]"
                      )}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {formData.interest_tag_primary && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                    具体是哪个方向？
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SECONDARY_TAGS[formData.interest_tag_primary]?.map((tag) => (
                      <button
                        key={tag.value}
                        onClick={() => updateFormData("interest_tag_secondary", tag.value)}
                        className={cn(
                          "h-7 px-4 rounded text-[14px] transition-all",
                          formData.interest_tag_secondary === tag.value
                            ? "bg-[#0095B6] text-white"
                            : "bg-white border border-[#E5E5E5] text-[#666666] hover:border-[#0095B6]"
                        )}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <MCInput
                  label="自定义标签（可选）"
                  placeholder="用一个词描述你的独特兴趣"
                  value={formData.interest_tag_custom}
                  onChange={(e) => updateFormData("interest_tag_custom", e.target.value)}
                  helper="这个标签不会参与匹配，但会展示在你的个人主页"
                  className="rounded"
                />
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  你在这个领域的经验？
                </p>
                <div className="space-y-2">
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("experience_level", opt.value)}
                      className={cn(
                        "w-full h-11 rounded px-4 text-left text-[16px] transition-all flex items-center",
                        formData.experience_level === opt.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#F5B70A]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 投入与精力 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  你希望多久参加一次活动？
                </p>
                <div className="space-y-2">
                  {FREQUENCY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("prefer_activity_frequency", opt.value)}
                      className={cn(
                        "w-full h-11 rounded px-4 text-left text-[16px] transition-all flex items-center",
                        formData.prefer_activity_frequency === opt.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#F5B70A]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  每周能投入多少时间？
                </p>
                <div className="space-y-2">
                  {HOURS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("prefer_weekly_hours", opt.value)}
                      className={cn(
                        "w-full h-11 rounded px-4 text-left text-[16px] transition-all flex items-center",
                        formData.prefer_weekly_hours === opt.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#F5B70A]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <MCSelect
                label="可接受的最高会费"
                placeholder="请选择会费范围"
                options={FEE_OPTIONS}
                value={formData.max_fee_acceptable}
                onChange={(v) => updateFormData("max_fee_acceptable", v)}
              />

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  是否需要新手培训？
                </p>
                <div className="flex gap-3">
                  {NEWBIE_TRAINING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("need_newbie_training", opt.value)}
                      className={cn(
                        "flex-1 h-11 rounded px-3 text-[14px] transition-all",
                        formData.need_newbie_training === opt.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#F5B70A]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 性格与社交 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  你更喜欢怎样的社团氛围？
                </p>
                <div className="space-y-2">
                  {PHILOSOPHY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("participation_philosophy", opt.value)}
                      className={cn(
                        "w-full h-11 rounded px-4 text-left text-[16px] transition-all flex items-center",
                        formData.participation_philosophy === opt.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#F5B70A]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  在社交场合，你是...
                </p>
                <div className="space-y-2">
                  {SOCIAL_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("social_tendency", opt.value)}
                      className={cn(
                        "w-full h-11 rounded px-4 text-left text-[16px] transition-all flex items-center",
                        formData.social_tendency === opt.value
                          ? "bg-[#0095B6] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#0095B6]"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">
                  你喜欢什么规模的社团？
                </p>
                <div className="flex gap-3">
                  {GROUP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateFormData("group_preference", opt.value)}
                      className={cn(
                        "flex-1 h-14 rounded px-3 text-[16px] transition-all flex flex-col items-center justify-center",
                        formData.group_preference === opt.value
                          ? "bg-[#F5B70A] text-white"
                          : "bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:border-[#F5B70A]"
                      )}
                    >
                      <span>{opt.label}</span>
                      <span className={cn(
                        "text-[11px]",
                        formData.group_preference === opt.value ? "text-white/80" : "text-[#999999]"
                      )}>
                        {opt.value === "big" ? "20人以上" : "20人以下"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: 目标导向 */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-1">
                  加入社团，你最想收获什么？
                </p>
                <p className="text-[13px] text-[#666666] mb-4">
                  选择1-3项，并按优先级排序
                </p>

                {/* 已选目标 - 可拖拽排序 */}
                {formData.main_goals.length > 0 && (
                  <div className="mb-4 p-3 bg-white rounded border border-[#E5E5E5]">
                    <p className="text-[13px] text-[#666666] mb-2">已选（按优先级排序）</p>
                    <div className="space-y-2">
                      {formData.main_goals.map((goalId, index) => {
                        const goal = GOAL_OPTIONS.find((g) => g.id === goalId)
                        return (
                          <div
                            key={goalId}
                            className="flex items-center gap-2 h-9 px-3 bg-[#F5B70A]/10 rounded"
                          >
                            <GripVertical className="w-4 h-4 text-[#999999] cursor-move" />
                            <span className="w-5 h-5 rounded-full bg-[#F5B70A] text-white text-[12px] flex items-center justify-center">
                              {index + 1}
                            </span>
                            <span className="flex-1 text-[14px] text-[#1A1A1A]">{goal?.label}</span>
                            <button
                              onClick={() => handleGoalToggle(goalId)}
                              className="text-[#999999] hover:text-[#AE322A]"
                            >
                              ×
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* 可选目标 */}
                <div className="flex flex-wrap gap-2">
                  {GOAL_OPTIONS.filter((g) => !formData.main_goals.includes(g.id)).map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => handleGoalToggle(goal.id)}
                      disabled={formData.main_goals.length >= 3}
                      className={cn(
                        "h-9 px-4 rounded text-[14px] transition-all",
                        "bg-white border border-[#E5E5E5] text-[#666666]",
                        formData.main_goals.length < 3
                          ? "hover:border-[#F5B70A] hover:text-[#F5B70A]"
                          : "opacity-50 cursor-not-allowed"
                      )}
                    >
                      + {goal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 总结预览 */}
              <div className="p-4 bg-white rounded border border-[#E5E5E5]">
                <p className="text-[16px] font-medium text-[#1A1A1A] mb-3">你的画像预览</p>
                <div className="flex flex-wrap gap-2">
                  {formData.interest_tag_primary && (
                    <Tag variant="primary" size="sm">
                      {PRIMARY_TAG_OPTIONS.find((t) => t.value === formData.interest_tag_primary)?.label}
                    </Tag>
                  )}
                  {formData.interest_tag_secondary && (
                    <Tag variant="secondary" size="sm">
                      {SECONDARY_TAGS[formData.interest_tag_primary]?.find(
                        (t) => t.value === formData.interest_tag_secondary
                      )?.label}
                    </Tag>
                  )}
                  {formData.experience_level && (
                    <Tag variant="outline" size="sm">
                      {EXPERIENCE_OPTIONS.find((t) => t.value === formData.experience_level)?.label}
                    </Tag>
                  )}
                  {formData.social_tendency && (
                    <Tag variant="outline" size="sm">
                      {SOCIAL_OPTIONS.find((t) => t.value === formData.social_tendency)?.label}
                    </Tag>
                  )}
                  {formData.interest_tag_custom && (
                    <Tag variant="muted" size="sm">
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
            className="h-12 rounded text-[16px]"
          >
            {currentStep === STEPS.length ? "完成并开始匹配" : "下一步"}
          </MCButton>
        </div>
      </div>
    </div>
  )
}
