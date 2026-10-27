import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between overflow-hidden p-12 lg:flex">
          <Link href="/" className="relative z-10"><Logo size={36} /></Link>
          <div className="relative z-10 max-w-md">
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight">
              The event industry, <span className="text-gradient">finally connected.</span>
            </h1>
            <p className="mt-6 text-text-secondary">
              One network for organisers, venues, artists and vendors. Discover, collaborate, and grow — without the cold emails.
            </p>
            <div className="mt-10 space-y-4">
              {[
                { icon: Sparkles, text: "Smart matching that actually fits your event." },
                { icon: Zap, text: "Briefs, proposals, and conversations in one place." },
                { icon: ShieldCheck, text: "Every profile is verified. Reputation is portable." },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2">
                    <f.icon className="h-3.5 w-3.5 text-mint" />
                  </div>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="relative z-10 text-xs text-text-muted">© {new Date().getFullYear()} VibeNet</p>
          <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-violet/30 blur-[100px]" />
          <div className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-pink/20 blur-[120px]" />
        </div>
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex justify-center lg:hidden">
              <Link href="/"><Logo size={32} /></Link>
            </div>
            <div className="rounded-3xl border border-border bg-surface/70 p-8 shadow-card backdrop-blur-2xl sm:p-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}   