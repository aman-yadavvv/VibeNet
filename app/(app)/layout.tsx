"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { BottomTabs } from "@/components/layout/bottom-tabs";
import { useRequireAuth } from "@/lib/hooks/use-require-auth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { hydrated, me } = useRequireAuth();

  if (!hydrated || !me) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet border-t-transparent" />
          <p className="text-sm text-text-muted">Loading VibeNet…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <Topbar />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:pt-8">
          {children}
        </div>
      </main>
      <BottomTabs />
    </div>
  );
}