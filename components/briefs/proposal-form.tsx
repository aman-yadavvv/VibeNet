"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";

export function ProposalForm({ briefId, providerId }: { briefId: string; providerId: string }) {
  const { createProposal } = useStore();
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    if (!message.trim() || message.trim().length < 20) {
      return setError("Write at least a couple of sentences so the organiser can judge fit.");
    }
    const p = Number(price);
    if (!p || p <= 0) return setError("Enter a price.");
    setLoading(true);
    createProposal({ briefId, providerId, message: message.trim(), price: p });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <Card className="border-mint/30 bg-mint/5 p-6 text-center">
        <p className="text-sm font-semibold text-mint">Proposal sent 🎉</p>
        <p className="mt-1 text-xs text-text-secondary">
          A conversation thread has been created. Check Messages to chat.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg font-semibold">Send a proposal</h3>
      <p className="mt-1 text-xs text-text-secondary">
        Tell the organiser why you're a fit. Be specific — generic proposals get ignored.
      </p>
      <form onSubmit={submit} className="mt-4 space-y-4">
        <Textarea
          label="Your proposal"
          rows={5}
          placeholder="What would you do for this event? What's included? What makes you different?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Input
          label="Your price (€)"
          type="number"
          min="1"
          placeholder="3500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && (
          <div className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
            {error}
          </div>
        )}
        <Button type="submit" className="w-full" loading={loading}>
          <Send className="h-4 w-4" /> Send proposal
        </Button>
      </form>
    </Card>
  );
}