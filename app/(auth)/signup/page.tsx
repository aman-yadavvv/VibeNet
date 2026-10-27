"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Music, Store, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { ROLE_META, ROLES, CITIES } from "@/lib/constants";
import type { Role } from "@/lib/types";
import { cn } from "@/lib/utils";

const ROLE_ICONS = { organiser: Users, venue: Building2, artist: Music, vendor: Store };

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("Lisbon");
  const [role, setRole] = useState<Role>("organiser");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined); setLoading(true);
    const res = signup({ name, email, password, role, city });
    setLoading(false);
    if (!res.ok) setError(res.error);
    else router.push("/dashboard");
  }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold tracking-tight">Create your account.</h2>
      <p className="mt-2 text-sm text-text-secondary">Join the network. It's free to start.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <Input label="Full name" placeholder="Alex Rivera" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Email" type="email" placeholder="you@example.com" value={email}
          onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <Input label="Password" type="password" placeholder="At least 8 characters" value={password}
          onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">I'm joining as</p>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((r) => {
              const Icon = ROLE_ICONS[r];
              const active = role === r;
              return (
                <button type="button" key={r} onClick={() => setRole(r)}
                  className={cn(
                    "group flex items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200",
                    active ? "border-violet/60 bg-violet/10 shadow-glow"
                           : "border-border bg-surface-2/40 hover:border-white/20 hover:bg-surface-2/70"
                  )}>
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br text-base", ROLE_META[r].gradient)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{ROLE_META[r].label}</p>
                    <p className="text-[11px] leading-tight text-text-muted">{ROLE_META[r].blurb}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <Select label="City" value={city} onChange={(e) => setCity(e.target.value)}>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        {error && <p className="text-xs text-coral">{error}</p>}
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Create account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      <p className="mt-8 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-text-primary underline-offset-4 hover:underline">Log in</Link>
      </p>
    </div>
  );
}