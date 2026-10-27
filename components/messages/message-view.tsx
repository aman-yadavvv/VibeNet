"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useStore } from "@/lib/store";
import type { Thread } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MessageView({
  thread, currentUserId,
}: { thread: Thread; currentUserId: string }) {
  const { getMessagesForThread, sendMessage, getBriefById, getProfileByUserId } = useStore();
  const messages = getMessagesForThread(thread.id);
  const [body, setBody] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const isA = thread.participantAId === currentUserId;
  const otherName = isA ? thread.participantBName : thread.participantAName;
  const otherAvatar = isA ? thread.participantBAvatar : thread.participantAAvatar;
  const otherUserId = isA ? thread.participantBId : thread.participantAId;
  const otherProfile = getProfileByUserId(otherUserId);
  const brief = thread.briefId ? getBriefById(thread.briefId) : undefined;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    sendMessage(thread.id, body.trim(), currentUserId);
    setBody("");
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-xl lg:h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-surface/80 p-3 sm:p-4">
        <Link
          href="/messages"
          className="rounded-lg p-1.5 text-text-secondary hover:bg-surface-2 hover:text-text-primary lg:hidden"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Avatar src={otherAvatar} name={otherName} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{otherName}</p>
          {otherProfile && (
            <Link
              href={`/p/${otherProfile.id}`}
              className="truncate text-xs text-text-muted hover:text-mint"
            >
              View profile →
            </Link>
          )}
        </div>
        {brief && (
          <Link
            href={`/briefs/${brief.id}`}
            className="hidden rounded-full bg-surface-2 px-3 py-1 text-[11px] text-text-secondary transition hover:bg-surface-3 hover:text-text-primary sm:inline-block"
          >
            {brief.title.length > 30 ? brief.title.slice(0, 30) + "…" : brief.title}
          </Link>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((m) => {
            const isMine = m.senderId === currentUserId;
            return (
              <div key={m.id} className={cn("flex gap-2", isMine ? "justify-end" : "justify-start")}>
                {!isMine && (
                  <Avatar src={otherAvatar} name={otherName} size="sm" className="mt-0.5 shrink-0" />
                )}
                <div className={cn("max-w-[75%] sm:max-w-[65%]")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      isMine
                        ? "bg-gradient-primary text-base"
                        : "bg-surface-2 text-text-primary"
                    )}
                  >
                    {m.body}
                  </div>
                  <p className={cn(
                    "mt-1 text-[10px] text-text-muted",
                    isMine ? "text-right" : "text-left"
                  )}>
                    {new Date(m.createdAt).toLocaleTimeString("en-GB", {
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      </div>

      {/* Composer */}
      <form onSubmit={submit} className="border-t border-border bg-surface/80 p-3">
        <div className="flex gap-2">
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Message ${otherName}…`}
            className="flex-1 rounded-full border border-border bg-surface-2 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-violet/60 focus:outline-none focus:ring-2 focus:ring-violet/20"
          />
          <button
            type="submit"
            disabled={!body.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-base transition hover:scale-[1.03] disabled:opacity-40 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}