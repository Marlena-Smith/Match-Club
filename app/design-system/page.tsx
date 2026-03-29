"use client"

import { 
  MCButton, 
  MCCard, 
  MCCardHeader, 
  MCCardTitle, 
  MCCardContent,
  MCInnerCard,
  Tag, 
  MCInput, 
  MCSelect,
  MatchPercent,
  EmptyState,
  LoadingSpinner,
} from "@/components/match-club"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-[#F9F6E5]">
      <div className="max-w-[390px] mx-auto px-4 py-8 space-y-8">
        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-[36px] font-bold text-[#1A1A1A]">设计系统</h1>
          <p className="text-[13px] text-[#666666] mt-2">Match Club 组件库</p>
        </div>

        {/* 颜色 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>颜色</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-[#F5B70A] mb-2" />
                <p className="text-[11px] text-[#666666]">主色</p>
                <p className="text-[11px] text-[#999999]">#F5B70A</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-[#0095B6] mb-2" />
                <p className="text-[11px] text-[#666666]">次色</p>
                <p className="text-[11px] text-[#999999]">#0095B6</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-[#AE322A] mb-2" />
                <p className="text-[11px] text-[#666666]">点缀</p>
                <p className="text-[11px] text-[#999999]">#AE322A</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-[#F9F6E5] border border-[#E5E5E5] mb-2" />
                <p className="text-[11px] text-[#666666]">温暖米白</p>
                <p className="text-[11px] text-[#999999]">#F9F6E5</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-[#FCEFE8] border border-[#E5E5E5] mb-2" />
                <p className="text-[11px] text-[#666666]">奶油白</p>
                <p className="text-[11px] text-[#999999]">#FCEFE8</p>
              </div>
            </div>
          </MCCardContent>
        </MCCard>

        {/* 字号 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>字号</MCCardTitle>
          </MCCardHeader>
          <MCCardContent className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[48px] font-bold text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">48px H1</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[36px] font-bold text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">36px H2</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[28px] font-semibold text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">28px H3</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[24px] font-semibold text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">24px H4</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[20px] text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">20px Large</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[16px] text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">16px Body</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">13px Small</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-[#1A1A1A]">Aa</span>
              <span className="text-[11px] text-[#999999]">11px Caption</span>
            </div>
          </MCCardContent>
        </MCCard>

        {/* 按钮 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>按钮 (圆角8px)</MCCardTitle>
          </MCCardHeader>
          <MCCardContent className="space-y-4">
            <div className="space-y-3">
              <MCButton variant="primary" fullWidth>主要按钮</MCButton>
              <MCButton variant="secondary" fullWidth>次要按钮</MCButton>
              <MCButton variant="accent" fullWidth>强调按钮</MCButton>
              <MCButton variant="outline" fullWidth>描边按钮</MCButton>
              <MCButton variant="ghost" fullWidth>幽灵按钮</MCButton>
            </div>
            <div className="flex gap-2">
              <MCButton size="sm">小按钮</MCButton>
              <MCButton size="md">中按钮</MCButton>
              <MCButton size="lg">大按钮</MCButton>
            </div>
          </MCCardContent>
        </MCCard>

        {/* 标签 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>标签 (高度28px, 圆角12px)</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <div className="flex flex-wrap gap-2">
              <Tag variant="primary" size="md">体育</Tag>
              <Tag variant="secondary" size="md">艺术</Tag>
              <Tag variant="accent" size="md">学术</Tag>
              <Tag variant="outline" size="md">技术</Tag>
              <Tag variant="muted" size="md">娱乐</Tag>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Tag variant="primary" size="sm">小标签</Tag>
              <Tag variant="primary" size="md">中标签</Tag>
              <Tag variant="primary" size="lg">大标签</Tag>
            </div>
          </MCCardContent>
        </MCCard>

        {/* 头像 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>头像 (正圆)</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <div className="flex items-end gap-4">
              {/* 使用原生 HTML 实现头像 */}
              <div className="w-6 h-6 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[11px] font-medium text-[#666666]">小</div>
              <div className="w-8 h-8 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[13px] font-medium text-[#666666]">小</div>
              <div className="w-12 h-12 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[16px] font-medium text-[#666666]">小明</div>
              <div className="w-16 h-16 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[20px] font-medium text-[#666666]">小明</div>
              <div className="w-20 h-20 rounded-full bg-[#F0F0F0] flex items-center justify-center text-[24px] font-medium text-[#666666]">小明</div>
            </div>
          </MCCardContent>
        </MCCard>

        {/* 卡片 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>卡片 (圆角12px)</MCCardTitle>
          </MCCardHeader>
          <MCCardContent className="space-y-4">
            <MCInnerCard>
              <p className="text-[13px] text-[#666666]">内部卡片 (圆角8px)</p>
            </MCInnerCard>
            <MCInnerCard>
              <p className="text-[13px] text-[#666666]">用于嵌套内容</p>
            </MCInnerCard>
          </MCCardContent>
        </MCCard>

        {/* 输入框 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>输入框 (高度36px, 圆角8px)</MCCardTitle>
          </MCCardHeader>
          <MCCardContent className="space-y-4">
            <MCInput label="姓名" placeholder="请输入姓名" />
            <MCInput label="错误示例" placeholder="请输入" error="这是错误提示" />
            <MCSelect 
              label="兴趣标签"
              placeholder="请选择"
              options={[
                { value: "sports", label: "体育" },
                { value: "art", label: "艺术" },
                { value: "tech", label: "技术" },
              ]}
            />
          </MCCardContent>
        </MCCard>

        {/* 匹配度 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>匹配度</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <div className="flex justify-around">
              <MatchPercent percent={92} size="sm" />
              <MatchPercent percent={75} size="md" />
              <MatchPercent percent={45} size="lg" />
            </div>
          </MCCardContent>
        </MCCard>

        {/* 空状态 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>空状态</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <EmptyState type="no-result" />
          </MCCardContent>
        </MCCard>

        {/* 加载 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>加载</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <div className="flex justify-center">
              <LoadingSpinner size="md" />
            </div>
          </MCCardContent>
        </MCCard>

        {/* 间距说明 */}
        <MCCard>
          <MCCardHeader>
            <MCCardTitle>间距规范</MCCardTitle>
          </MCCardHeader>
          <MCCardContent>
            <div className="space-y-2 text-[13px] text-[#666666]">
              <p>左右边距: 16px (px-4)</p>
              <p>间距等级: 4/8/16/24/36/48px</p>
              <p>手机框架: 390 x 844px</p>
            </div>
          </MCCardContent>
        </MCCard>
      </div>
    </div>
  )
}
