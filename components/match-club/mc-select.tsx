"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface Option {
  value: string
  label: string
}

interface MCSelectProps {
  options: Option[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  className?: string
  disabled?: boolean
}

// 下拉菜单高度36px，圆角8px
export function MCSelect({
  options,
  value,
  onChange,
  placeholder = "请选择",
  label,
  error,
  className,
  disabled = false,
}: MCSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {label && (
        <label className="block text-[16px] font-medium text-[#1A1A1A] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "w-full px-3 h-9 rounded-lg border transition-all duration-200",
            "text-[16px] text-left bg-white",
            "flex items-center justify-between gap-2",
            "focus:outline-none",
            disabled && "opacity-50 cursor-not-allowed",
            error
              ? "border-[#F44336]"
              : isOpen
              ? "border-[#F5B70A] ring-2 ring-[#F5B70A]/20"
              : "border-[#E5E5E5] hover:border-[#F5B70A]/50"
          )}
          disabled={disabled}
        >
          <span className={selectedOption ? "text-[#1A1A1A]" : "text-[#999999]"}>
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
          <div className="absolute z-50 w-full mt-1 py-1 bg-white rounded-lg border border-[#E5E5E5] shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-3 h-9 text-left text-[16px] transition-colors",
                  "flex items-center justify-between",
                  "hover:bg-[#F9F6E5]",
                  option.value === value && "text-[#F5B70A] bg-[#F5B70A]/5"
                )}
              >
                <span>{option.label}</span>
                {option.value === value && (
                  <Check className="w-4 h-4 text-[#F5B70A]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[13px] text-[#F44336]">{error}</p>
      )}
    </div>
  )
}
