import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Save, Check } from "lucide-react";
import { AppShell, Avatar, students } from "@/components/app/AppShell";

export const Route = createFileRoute("/yoklama")({
  head: () => ({
    meta: [
      { title: "Günlük Yoklama — Kur'an Kursu" },
      { name: "description", content: "Beş vakit namaz ve ders yoklamasını işaretleyip kaydedin." },
      { property: "og:title", content: "Günlük Yoklama — Kur'an Kursu" },
      { property: "og:description", content: "Beş vakit namaz ve ders yoklamasını işaretleyip kaydedin." },
    ],
  }),
  component: Yoklama,
});

const cols = ["Sabah", "Öğle", "İkindi", "Akşam", "Yatsı", "Ders"];

function Yoklama() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const d = new Date(date);
  const label = d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  const day = d.toLocaleDateString("tr-TR", { weekday: "long" });
  return (
    <AppShell>
      <h2 className="mt-7 font-serif text-3xl font-bold">Günlük Yoklama</h2>
      <p className="mt-2 text-sm text-muted-foreground">Beş vakit namaz ve ders yoklamasını işaretleyip kaydedin.</p>
      <div className="mt-5 flex items-end justify-between gap-3 rounded-2xl border border-border bg-card p-5">
        <div>
          <p className="text-xs text-muted-foreground">Tarih</p>
          <div className="mt-2 flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
            <label className="relative whitespace-nowrap rounded-xl border border-border px-4 py-2 text-sm">
              {label}
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="absolute inset-0 opacity-0" />
            </label>
          </div>
          <p className="mt-2 font-semibold capitalize text-primary">{day}</p>
        </div>
        <button className="mb-6 flex items-center gap-2 whitespace-nowrap rounded-xl bg-primary px-3 py-2.5 text-xs text-primary-foreground">
          <Save className="h-4 w-4" /> Yoklamayı Kaydet
        </button>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center bg-brand-soft px-4 py-3 text-xs text-muted-foreground">
          <span className="w-24 text-sm">Adı Soyadı</span>
          <div className="grid flex-1 grid-cols-6 gap-1 text-center text-[10px]">{cols.map((c) => <span key={c}>{c}</span>)}</div>
        </div>
        {students.map((s) => (
          <div key={s.name} className="flex items-center border-t border-border px-4 py-3">
            <div className="flex w-24 items-center gap-3"><Avatar name={s.name} size="sm" /><span>{s.name}</span></div>
            <div className="grid flex-1 grid-cols-6 gap-1">
              {cols.map((c) => {
                const k = `${s.name}-${c}`;
                return (
                  <button key={c} onClick={() => setMarks((m) => ({ ...m, [k]: !m[k] }))} className={`flex h-8 items-center justify-center rounded-lg border border-border ${marks[k] ? "bg-primary text-primary-foreground" : "bg-surface"}`}>
                    {marks[k] && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
