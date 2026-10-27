"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { BriefForm } from "@/components/briefs/brief-form";

export default function NewBriefPage() {
  const { myProfile } = useStore();

  if (!myProfile || myProfile.role !== "organiser") {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl font-bold">Only organisers can post briefs.</p>
        <p className="mt-2 text-sm text-text-secondary">
          Your account is registered as a {myProfile?.role}. Switch to an organiser account to post briefs.
        </p>
        <Link href="/dashboard" className="mt-6 inline-block text-sm text-mint hover:underline">
          ← Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/briefs" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to briefs
      </Link>

      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">New brief</h1>
        <p className="mt-1 text-text-secondary">
          Give us the essentials. The more specific, the better the proposals.
        </p>
      </div>

      <Card className="max-w-3xl p-6 sm:p-8">
        <BriefForm />
      </Card>
    </div>
  );
}