"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function ThreadList({ userId }: { userId: string }) {
  const { getThreadsForUser } = useStore();
  const pathname = usePathname();
  const threads = getThreadsForUser(userId);

  if (threads.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/30 p-8 text-center">
        <p className="text-sm font-semibold">No conversations yet</p>
        <p className="mt-1 text-xs text-text-muted">
          When you send a proposal or message someone, threads appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {threads.map((t) => {
        const isA = t.participantAId === userId;
        const name = isA ? t.participantBName : t.participantAName;
        const avatar = isA ? t.participantBAvatar : t.participantAAvatar;
        const active = pathname === `/messages/${t.id}`;
        return (
          <Link
            key={t.id}
            href={`/messages/${t.id}`}
            className={cn(
              "flex items-start gap-3 rounded-xl p-3 transition",
              active ? "bg-surface-2" : "hover:bg-surface-2/70"
            )}
          >
            <Avatar src={avatar} name={name} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold">{name}</p>
                <span className="shrink-0 text-[10px] text-text-muted">
                  {timeAgo(t.lastMessageAt)}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-text-muted">{t.lastMessage}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}