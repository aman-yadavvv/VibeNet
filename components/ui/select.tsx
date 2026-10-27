"use client";
import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string; error?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, Props>(
  ({ className, label, error, id, children, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <select ref={ref} id={inputId}
            className={cn(
              "w-full appearance-none rounded-xl border border-border bg-surface-2/60 px-4 py-3 pr-10 text-sm text-text-primary",
              "backdrop-blur-xl transition-all duration-200",
              "focus:border-violet/60 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-violet/20",
              error && "border-coral/60",
              className
            )}
            {...props}>
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        </div>
        {error && <p className="mt-1.5 text-xs text-coral">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";