"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined); setLoading(true);
    const res = login({ email, password });
    setLoading(false);
    if (!res.ok) setError(res.error);
    else router.push("/dashboard");
  }

  function handleDemo() { demoLogin(); router.push("/dashboard"); }

  return (
    <div>
      <h2 className="font-display text-3xl font-bold tracking-tight">Welcome back.</h2>
      <p className="mt-2 text-sm text-text-secondary">Log in to keep your event flow moving.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" value={email}
          onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <Input label="Password" type="password" placeholder="••••••••" value={password}
          onChange={(e) => setPassword(e.target.value)} error={error} autoComplete="current-password" />
        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Log in <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <Button variant="ghost" className="w-full" size="lg" onClick={handleDemo}>
        <Sparkles className="h-4 w-4 text-mint" /> Try the demo (no signup)
      </Button>
      <p className="mt-8 text-center text-sm text-text-secondary">
        New to VibeNet?{" "}
        <Link href="/signup" className="font-medium text-text-primary underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}