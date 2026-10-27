"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { MessageView } from "@/components/messages/message-view";

export default function ThreadPage() {
  const params = useParams<{ threadId: string }>();
  const { getThreadById, me } = useStore();
  const thread = getThreadById(params.threadId);

  if (!thread || !me) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl font-bold">Conversation not found</p>
        <p className="mt-2 text-sm text-text-secondary">
          It may have been removed or the link is wrong.
        </p>
        <Link href="/messages" className="mt-6 inline-block">
          <Button variant="ghost">← Back to messages</Button>
        </Link>
      </div>
    );
  }

  const isParticipant = thread.participantAId === me.id || thread.participantBId === me.id;
  if (!isParticipant) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl font-bold">Access denied</p>
        <p className="mt-2 text-sm text-text-secondary">You're not part of this conversation.</p>
        <Link href="/messages" className="mt-6 inline-block">
          <Button variant="ghost">← Back to messages</Button>
        </Link>
      </div>
    );
  }

  return <MessageView thread={thread} currentUserId={me.id} />;
}