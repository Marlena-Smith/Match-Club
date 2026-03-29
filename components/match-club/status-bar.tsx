"use client"

import { cn } from "@/lib/utils"

interface StatusBarProps {
  className?: string
  time?: string
  dark?: boolean
}

// iOS 风格状态栏
export function StatusBar({ className, time = "9:41", dark = false }: StatusBarProps) {
  const textColor = dark ? "text-white" : "text-[#1A1A1A]"
  const fillColor = dark ? "#FFFFFF" : "#1A1A1A"

  return (
    <div
      className={cn(
        "w-full h-11 px-6 flex items-center justify-between",
        "font-['PingFang_SC',_-apple-system,_BlinkMacSystemFont,_sans-serif]",
        className
      )}
    >
      {/* 左侧时间 */}
      <span className={cn("text-[17px] font-semibold", textColor)}>
        {time}
      </span>

      {/* 右侧状态图标 */}
      <div className="flex items-center gap-1">
        {/* 信号 */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill={fillColor} />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill={fillColor} />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill={fillColor} />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill={fillColor} />
        </svg>

        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path
            d="M8 2.4C10.7 2.4 13.1 3.5 14.8 5.3L16 4C14 1.8 11.2 0.5 8 0.5C4.8 0.5 2 1.8 0 4L1.2 5.3C2.9 3.5 5.3 2.4 8 2.4Z"
            fill={fillColor}
          />
          <path
            d="M8 5.9C9.9 5.9 11.6 6.7 12.8 8L14 6.7C12.5 5.1 10.4 4.1 8 4.1C5.6 4.1 3.5 5.1 2 6.7L3.2 8C4.4 6.7 6.1 5.9 8 5.9Z"
            fill={fillColor}
          />
          <path
            d="M8 9.4C9.1 9.4 10.1 9.9 10.8 10.7L12 9.4C10.9 8.2 9.5 7.5 8 7.5C6.5 7.5 5.1 8.2 4 9.4L5.2 10.7C5.9 9.9 6.9 9.4 8 9.4Z"
            fill={fillColor}
          />
        </svg>

        {/* 电池 */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="23"
            height="11"
            rx="2.5"
            stroke={fillColor}
            strokeOpacity="0.35"
          />
          <rect x="2" y="2" width="20" height="8" rx="1.5" fill={fillColor} />
          <path
            d="M25 4V8C26.1 7.5 26.1 4.5 25 4Z"
            fill={fillColor}
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  )
}
