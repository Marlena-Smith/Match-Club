import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface MCInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
}

// 输入框高度36px，圆角8px
export const MCInput = forwardRef<HTMLInputElement, MCInputProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[16px] font-medium text-[#1A1A1A] mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 h-9 rounded-lg border transition-all duration-200",
            "text-[16px] text-[#1A1A1A] placeholder:text-[#999999]",
            "bg-white focus:outline-none",
            error
              ? "border-[#F44336] focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20"
              : "border-[#E5E5E5] focus:border-[#F5B70A] focus:ring-2 focus:ring-[#F5B70A]/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[13px] text-[#F44336]">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-1 text-[13px] text-[#999999]">{helper}</p>
        )}
      </div>
    )
  }
)

MCInput.displayName = "MCInput"

interface MCTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helper?: string
}

// 文本域圆角8px
export const MCTextarea = forwardRef<HTMLTextAreaElement, MCTextareaProps>(
  ({ className, label, error, helper, id, ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[16px] font-medium text-[#1A1A1A] mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 rounded-lg border transition-all duration-200 resize-none",
            "text-[16px] text-[#1A1A1A] placeholder:text-[#999999]",
            "bg-white focus:outline-none min-h-[100px]",
            error
              ? "border-[#F44336] focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20"
              : "border-[#E5E5E5] focus:border-[#F5B70A] focus:ring-2 focus:ring-[#F5B70A]/20",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-[13px] text-[#F44336]">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-1 text-[13px] text-[#999999]">{helper}</p>
        )}
      </div>
    )
  }
)

MCTextarea.displayName = "MCTextarea"
