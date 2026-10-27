"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, RotateCcw, LogOut } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/lib/toasts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { RoleBadge } from "@/components/profile/role-badge";

export default function SettingsPage() {
  const { me, myProfile, resetDemoData, logout } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  if (!me || !myProfile) return null;

  function handleReset() {
    resetDemoData();
    toast({
      title: "Demo data reset",
      description: "All accounts, briefs and messages cleared.",
      variant: "success",
    });
    router.push("/login");
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Settings</h1>
        <p className="mt-1 text-text-secondary">Manage your account and app data.</p>
      </div>

      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">Account</p>
        <div className="mt-4 flex items-center gap-4">
          <Avatar src={myProfile.avatar} name={myProfile.displayName} size="lg" ring />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{myProfile.displayName}</p>
            <p className="truncate text-sm text-text-secondary">{me.email}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <RoleBadge role={myProfile.role} />
              <span className="text-xs text-text-muted">
                Joined {new Date(me.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href="/profile/edit"><Button variant="ghost" size="sm">Edit profile</Button></Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-3.5 w-3.5" /> Log out
          </Button>
        </div>
      </Card>

      <Card className="border-coral/30 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-coral/15 text-coral">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-coral">Reset demo data</p>
            <p className="mt-1 text-sm text-text-secondary">
              Wipes every account, brief, proposal, message and review created in this browser, then returns VibeNet to its original seeded state. You'll be logged out.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {confirming ? (
                <>
                  <Button size="sm" onClick={handleReset} className="!bg-coral !shadow-none">
                    <RotateCcw className="h-3.5 w-3.5" /> Yes, reset everything
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="ghost" onClick={() => setConfirming(true)}>
                  <RotateCcw className="h-3.5 w-3.5" /> Reset demo data
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">About VibeNet</p>
        <div className="mt-3 space-y-2 text-sm text-text-secondary">
          <p>Prototype v0.6 · Frontend-only · All data stored locally in your browser.</p>
          <p>Built with Next.js 14, Tailwind CSS, Framer Motion, and React Context.</p>
          <p className="text-xs text-text-muted">
            This is a demonstration build. No real accounts, payments, or data leave this device.
          </p>
        </div>
      </Card>
    </div>
  );
}