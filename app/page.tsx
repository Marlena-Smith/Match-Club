import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F9F6E5] flex items-center justify-center p-4">
      <div className="max-w-[390px] w-full space-y-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-[36px] font-bold text-[#1A1A1A]">Match Club</h1>
          <p className="text-[16px] text-[#666666] mt-2">找到属于你的社团</p>
        </div>

        {/* 导航入口 */}
        <div className="space-y-4">
          <Link 
            href="/student" 
            className="block w-full p-6 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#F5B70A] hover:shadow-md transition-all"
          >
            <h2 className="text-[20px] font-semibold text-[#1A1A1A]">学生端</h2>
            <p className="text-[13px] text-[#666666] mt-1">我是新生，想找社团</p>
          </Link>

          <Link 
            href="/club" 
            className="block w-full p-6 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#0095B6] hover:shadow-md transition-all"
          >
            <h2 className="text-[20px] font-semibold text-[#1A1A1A]">社团端</h2>
            <p className="text-[13px] text-[#666666] mt-1">我是社团，想招新人</p>
          </Link>

          <Link 
            href="/design-system" 
            className="block w-full p-6 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#AE322A] hover:shadow-md transition-all"
          >
            <h2 className="text-[20px] font-semibold text-[#1A1A1A]">设计系统</h2>
            <p className="text-[13px] text-[#666666] mt-1">查看组件库</p>
          </Link>
        </div>

        {/* 版本信息 */}
        <p className="text-center text-[11px] text-[#999999] mt-8">v1.1 | 2026-03-29</p>
      </div>
    </div>
  )
}
