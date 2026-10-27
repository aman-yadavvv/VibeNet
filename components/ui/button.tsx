"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline" | "subtle";
type Size = "sm" | "md" | "lg";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant; size?: Size; loading?: boolean;
};

const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-base";

const variants: Record<Variant, string> = {
  primary: "bg-gradient-primary text-base shadow-glow hover:scale-[1.02] hover:shadow-glow-pink active:scale-[0.99]",
  ghost: "border border-border bg-surface/60 text-text-primary backdrop-blur-xl hover:border-white/20 hover:bg-surface-2/80",
  outline: "border border-violet/40 bg-transparent text-text-primary hover:border-violet hover:bg-violet/10",
  subtle: "bg-surface-2 text-text-primary hover:bg-surface-3",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-sm",
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)}
            disabled={disabled || loading} {...props}>
      {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> : children}
    </button>
  )
);
Button.displayName = "Button";