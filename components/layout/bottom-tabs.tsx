"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, FileText, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/briefs", label: "Briefs", icon: FileText },
  { href: "/messages", label: "Chats", icon: MessageSquare },
  { href: "/profile/edit", label: "Profile", icon: User },
];

export function BottomTabs() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-base/90 backdrop-blur-xl lg:hidden">
      <div className="grid grid-cols-5">
        {TABS.map((t) => {
          const active = pathname === t.href || (t.href !== "/dashboard" && pathname.startsWith(t.href));
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition",
                active ? "text-mint" : "text-text-muted"
              )}
            >
              <t.icon className="h-5 w-5" />
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}