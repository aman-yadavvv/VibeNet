"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useToast, type ToastVariant } from "@/lib/toasts";
import { cn } from "@/lib/utils";

const ICONS: Record<ToastVariant, typeof Info> = {
  default: Info,
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const STYLES: Record<ToastVariant, string> = {
  default: "border-border",
  success: "border-mint/40",
  error: "border-coral/40",
  info: "border-violet/40",
};

const ICON_STYLES: Record<ToastVariant, string> = {
  default: "text-text-secondary",
  success: "text-mint",
  error: "text-coral",
  info: "text-violet-glow",
};

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-20 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {toasts.map((t) => {
          const variant = t.variant ?? "default";
          const Icon = ICONS[variant];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, transition: { duration: 0.2 } }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 rounded-xl border bg-surface-2/95 p-4 shadow-card backdrop-blur-xl",
                STYLES[variant]
              )}
            >
              <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", ICON_STYLES[variant])} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{t.title}</p>
                {t.description && (
                  <p className="mt-0.5 text-xs text-text-secondary">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-md p-1 text-text-muted transition hover:bg-surface-3 hover:text-text-primary"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}