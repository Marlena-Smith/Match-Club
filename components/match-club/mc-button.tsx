import { cn } from "@/lib/utils"
import { forwardRef } from "react"

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg" | "icon"

interface MCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#F5B70A] text-[#1A1A1A] hover:bg-[#C99700] shadow-sm",
  secondary: "bg-[#0095B6] text-white hover:bg-[#00778F] shadow-sm",
  accent: "bg-[#AE322A] text-white hover:bg-[#D84A42] shadow-sm",
  outline: "bg-transparent border-2 border-[#F5B70A] text-[#1A1A1A] hover:bg-[#F5B70A]/10",
  ghost: "bg-[#F9F6E5] text-[#1A1A1A] hover:bg-[#F5B70A]/20",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-[13px] px-4 h-8 rounded",
  md: "text-[16px] px-6 h-10 rounded-lg",
  lg: "text-[16px] px-8 h-12 rounded-lg",
  icon: "p-2.5 rounded-lg",
}

export const MCButton = forwardRef<HTMLButtonElement, MCButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[#F5B70A] focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "active:scale-[0.98]",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

MCButton.displayName = "MCButton"
