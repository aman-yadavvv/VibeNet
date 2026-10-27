"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Building2, Music, Store, Users, MessageSquare, ShieldCheck, Zap, Star } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const roles = [
  { icon: Users,     label: "Organisers", desc: "Plan events with the right people by your side.", accent: "from-violet to-pink" },
  { icon: Building2, label: "Venues",     desc: "Fill your calendar with the events that fit.",     accent: "from-pink to-coral" },
  { icon: Music,     label: "Artists",    desc: "Get discovered beyond the referral chain.",        accent: "from-coral to-lime" },
  { icon: Store,     label: "Vendors",    desc: "Turn one-off bookings into real relationships.",   accent: "from-mint to-violet" },
];

const features = [
  { icon: Sparkles,     title: "Smart matching",         desc: "We surface the right people for your event — by vibe, budget, city and style." },
  { icon: MessageSquare,title: "Real conversations",     desc: "Structured briefs, clean proposals, and a thread that never gets lost." },
  { icon: ShieldCheck,  title: "Verified profiles",      desc: "Every profile is checked. Reputation is portable across every event." },
  { icon: Zap,          title: "Less friction, more flow", desc: "Everything from 'I need a venue' to 'locked in' — in one place." },
];

const floatingCards = [
  { name: "Aria Events",  role: "Venue · Lisbon",   rating: 4.9, pos: "top-8 -left-6",    delay: 0 },
  { name: "Koda",         role: "Artist · Lisbon",  rating: 5.0, pos: "top-32 -right-8",  delay: 0.3 },
  { name: "Bloom Studio", role: "Vendor · Lisbon",  rating: 4.8, pos: "bottom-6 left-10", delay: 0.6 },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <a href="#roles" className="text-sm text-text-secondary transition hover:text-text-primary">Who it's for</a>
          <a href="#features" className="text-sm text-text-secondary transition hover:text-text-primary">Features</a>
          <a href="#cta" className="text-sm text-text-secondary transition hover:text-text-primary">Join</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-full px-5 py-2.5 text-sm font-medium text-text-secondary transition hover:text-text-primary sm:block">Log in</Link>
          <Link href="/signup" className="btn-primary !px-5 !py-2.5">Get early access <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </nav>

      <section className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-24 pt-16 lg:grid-cols-2 lg:items-center lg:pt-24">
        <div>
          <div className="fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-text-secondary backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
            Now onboarding in Lisbon
          </div>
          <h1 className="fade-up-1 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            The event industry, <span className="text-gradient">finally connected.</span>
          </h1>
          <p className="fade-up-2 mt-6 max-w-xl text-lg text-text-secondary">
            VibeNet is where organisers, venues, artists and vendors find each other, talk shop, close deals, and build a reputation that travels with them.
          </p>
          <div className="fade-up-3 mt-10 flex flex-wrap items-center gap-4">
            <Link href="/signup" className="btn-primary">Create your profile <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/discover" className="btn-ghost">Explore the network</Link>
          </div>
          <div className="fade-up-4 mt-10 flex flex-wrap items-center gap-6 text-sm text-text-muted">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} alt="" className="h-7 w-7 rounded-full border-2 border-base" />
                ))}
              </div>
              <span>400+ early members</span>
            </div>
            <div className="flex items-center gap-1">
              {[0,1,2,3,4].map(i => <Star key={i} className="h-4 w-4 fill-lime text-lime" />)}
              <span className="ml-1">Loved by organisers</span>
            </div>
          </div>
        </div>

        <div className="relative h-[420px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-[2rem] border border-border bg-gradient-to-br from-violet/10 via-pink/5 to-mint/10 backdrop-blur-sm" />
          <div className="absolute inset-6">
            <div className="relative h-full w-full">
              {floatingCards.map((c, i) => (
                <motion.div key={c.name}
                  className={`absolute ${c.pos} glass glass-hover w-56 p-4 shadow-card`}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: c.delay + 0.4, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -6, scale: 1.03 }}>
                  <div className="flex items-center gap-3">
                    <img src={`https://i.pravatar.cc/80?img=${i+20}`} alt="" className="h-10 w-10 rounded-full" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="truncate text-xs text-text-muted">{c.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-lime"><Star className="h-3 w-3 fill-lime" /> {c.rating}</div>
                    <span className="rounded-full bg-mint/15 px-2 py-0.5 text-mint">Verified</span>
                  </div>
                </motion.div>
              ))}
              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-primary opacity-30 blur-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      <section id="roles" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-mint">Who it's for</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            One network. <span className="text-gradient">Everyone in the room.</span>
          </h2>
          <p className="mt-4 text-text-secondary">Every role in the event industry has a seat. No gatekeeping, no awkward cold emails.</p>
        </div>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r, i) => (
            <motion.div key={r.label}
              className="group glass glass-hover relative overflow-hidden p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${r.accent} text-base`}>
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold">{r.label}</h3>
              <p className="mt-2 text-sm text-text-secondary">{r.desc}</p>
              <div className="mt-5 flex items-center gap-1 text-sm font-medium text-text-muted transition group-hover:text-mint">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-pink">Built different</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to <span className="text-gradient">actually collaborate.</span>
          </h2>
        </div>
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div key={f.title} className="glass glass-hover p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-2">
                <f.icon className="h-5 w-5 text-mint" />
              </div>
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-text-secondary">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-violet/20 via-pink/15 to-mint/15 p-12 text-center backdrop-blur-xl sm:p-20">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet/40 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-mint/30 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Your next <span className="text-gradient">big collaboration</span> is one click away.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-text-secondary">
              Join VibeNet and start building relationships that outlast the event.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="/signup" className="btn-primary">Join the network <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/discover" className="btn-ghost">See who's already here</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Logo size={24} />
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} VibeNet. Built for the event industry.</p>
        </div>
      </footer>
    </main>
  );
}