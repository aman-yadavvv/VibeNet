"use client";

import { MessageSquare } from "lucide-react";
import { useStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { ThreadList } from "@/components/messages/thread-list";

export default function MessagesPage() {
  const { me } = useStore();
  if (!me) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Messages</h1>
        <p className="mt-1 text-text-secondary">
          Conversations with organisers, venues, artists, and vendors.
        </p>
      </div>

      <Card className="p-2 sm:p-3">
        <ThreadList userId={me.id} />
      </Card>

      <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface/40 p-4 text-xs text-text-muted">
        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-mint" />
        <p>
          Threads are automatically created when a proposal is sent. You can message
          any member you're collaborating with.
        </p>
      </div>
    </div>
  );
}