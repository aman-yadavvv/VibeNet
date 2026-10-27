"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useStore } from "@/lib/store";
import { CITIES, EVENT_TYPES } from "@/lib/constants";

export function BriefForm() {
  const router = useRouter();
  const { myProfile, createBrief } = useStore();

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [city, setCity] = useState(myProfile?.city ?? CITIES[0]);
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);

    if (!title.trim()) return setError("Give your brief a title.");
    if (!eventDate) return setError("Pick an event date.");
    if (new Date(eventDate) <= new Date()) return setError("Event date must be in the future.");
    const guests = Number(guestCount);
    if (!guests || guests < 1) return setError("Enter a valid guest count.");
    const min = Number(budgetMin);
    const max = Number(budgetMax);
    if (!min || min < 0) return setError("Enter a valid minimum budget.");
    if (!max || max < min) return setError("Maximum budget must be at least the minimum.");
    if (!description.trim()) return setError("Add a short description.");

    setLoading(true);
    const brief = createBrief({
      organiserId: myProfile!.id,
      title: title.trim(),
      eventType,
      city,
      eventDate: new Date(eventDate).toISOString(),
      guestCount: guests,
      budgetMin: min,
      budgetMax: max,
      description: description.trim(),
    });
    setLoading(false);
    if (brief) router.push(`/briefs/${brief.id}`);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <Input
        label="Brief title"
        placeholder="e.g. Rooftop launch party for 120 people"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Select label="Event type" value={eventType} onChange={(e) => setEventType(e.target.value)}>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </Select>
        <Select label="City" value={city} onChange={(e) => setCity(e.target.value)}>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Event date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
        <Input
          label="Guest count"
          type="number"
          min="1"
          placeholder="120"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Budget min (€)"
          type="number"
          min="0"
          placeholder="8000"
          value={budgetMin}
          onChange={(e) => setBudgetMin(e.target.value)}
        />
        <Input
          label="Budget max (€)"
          type="number"
          min="0"
          placeholder="15000"
          value={budgetMax}
          onChange={(e) => setBudgetMax(e.target.value)}
        />
      </div>

      <Textarea
        label="Description"
        rows={5}
        placeholder="What kind of event is it? What vibe? What do you need? Be specific — you'll get better proposals."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && (
        <div className="rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Publish brief <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}