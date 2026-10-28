import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, User, GraduationCap } from "lucide-react";
import { AppShell, Avatar, students } from "@/components/app/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Talebeler — Kur'an Kursu" },
      { name: "description", content: "Kur'an kursu talebe listesi ve durum takibi." },
      { property: "og:title", content: "Talebeler — Kur'an Kursu" },
      { property: "og:description", content: "Kur'an kursu talebe listesi ve durum takibi." },
    ],
  }),
  component: Index,
});

function Index() {
  const [q, setQ] = useState("");
  const list = students.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <AppShell>
      <div className="mt-7 flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">Talebeler</h2>
        <span className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm">
          <User className="h-4 w-4" /> {students.length} talebe
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-2xl bg-surface px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Talebe ara..." className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
      </div>
      <div className="mt-4 flex items-center justify-between rounded-t-lg bg-brand-soft px-5 py-2.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><User className="h-4 w-4" /> Adı Soyadı</span>
        <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Durum</span>
      </div>
      <div className="mt-4 overflow-hidden rounded-b-2xl border border-t-0 border-border bg-card">
        {list.map((s, i) => (
          <Link key={s.name} to="/talebe/$name" params={{ name: s.name }} className="flex items-center gap-4 border-b border-border px-8 py-3 last:border-0">
            <span className="w-3 text-sm text-muted-foreground">{i + 1}</span>
            <Avatar name={s.name} />
            <div className="flex-1">
              <p className="font-serif text-base font-bold">{s.name}</p>
              <p className="text-sm text-muted-foreground">Talebe</p>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-sm">
              <span className={`h-1.5 w-1.5 rounded-full ${s.status === "İyi" ? "bg-good" : "bg-warn"}`} />
              {s.status}
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
