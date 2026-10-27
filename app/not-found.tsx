import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <div className="inline-block"><Logo size={48} /></div>
        <h1 className="mt-8 font-display text-7xl font-bold tracking-tight text-gradient">404</h1>
        <p className="mt-4 text-lg text-text-secondary">This page doesn't exist yet.</p>
        <p className="mt-1 text-sm text-text-muted">Or it's coming in a future update.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/"><Button>Back home</Button></Link>
          <Link href="/discover"><Button variant="ghost">Explore the network</Button></Link>
        </div>
      </div>
    </div>
  );
}