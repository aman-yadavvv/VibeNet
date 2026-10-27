"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string; error?: string; hint?: string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? React.useId();
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-2 block text-xs font-medium uppercase tracking-wider text-text-secondary">
            {label}
          </label>
        )}
        <input ref={ref} id={inputId}
          className={cn(
            "w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted",
            "backdrop-blur-xl transition-all duration-200",
            "focus:border-violet/60 focus:bg-surface-2 focus:outline-none focus:ring-2 focus:ring-violet/20",
            error && "border-coral/60 focus:border-coral focus:ring-coral/20",
            className
          )}
          {...props} />
        {error ? <p className="mt-1.5 text-xs text-coral">{error}</p>
          : hint ? <p className="mt-1.5 text-xs text-text-muted">{hint}</p> : null}
      </div>
    );
  }
);
Input.displayName = "Input";