import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft, Pencil, Trash2, MapPin, Calendar, User, Phone, Plus,
  CalendarDays, BookOpen, Clock, CalendarOff, Sunrise, Sun, CloudSun, Sunset, Moon,
  CheckCircle2, CalendarX, Printer, Download, AlertTriangle, PenLine,
} from "lucide-react";
import { AppShell, students } from "@/components/app/AppShell";

export const Route = createFileRoute("/talebe/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.name} — Kur'an Kursu` },
      { name: "description", content: "Talebe detayı: yoklama geçmişi, tutanaklar ve aile raporu." },
      { property: "og:title", content: `${params.name} — Kur'an Kursu` },
      { property: "og:description", content: "Talebe detayı: yoklama geçmişi, tutanaklar ve aile raporu." },
    ],
  }),
  component: TalebeDetay,
});

const tabs = ["Yoklama", "Tutanaklar", "Aile Raporu"] as const;

const namazStats = [
  { label: "Sabah Namazı", icon: Sunrise, value: 3 },
  { label: "Öğle Namazı", icon: Sun, value: 3 },
  { label: "İkindi Namazı", icon: CloudSun, value: 3 },
  { label: "Akşam Namazı", icon: Sunset, value: 3 },
  { label: "Yatsı Namazı", icon: Moon, value: 3 },
];

const topStats = [
  { label: "Toplam Gün", icon: CalendarDays, value: 4, tone: "bg-surface text-foreground" },
  { label: "Derse Girdiği Gün", icon: BookOpen, value: 3, tone: "bg-brand-soft text-primary" },
  { label: "Geç Kaldığı Gün", icon: Clock, value: 0, tone: "bg-amber-soft text-warn" },
  { label: "İzinli Gün", icon: CalendarOff, value: 1, tone: "bg-sky-soft text-info" },
];

const history = [
  { date: "2026-10-23", chips: ["Akşam ✓", "Yatsı ✓"], ders: "—" },
  { date: "2026-10-22", chips: ["Sabah ✓", "Öğle ✓", "İkindi ✓", "Akşam ✓", "Yatsı ✓"], ders: "✓" },
  { date: "2026-10-21", chips: ["Sabah ✓", "Öğle ✓", "İkindi ✓"], ders: "✓" },
];

const tutanaklar = [
  {
    title: "Namaza Katılmama", tag: "Namaza Katılmama", date: "2026-10-23", signed: false,
    body: "TUTANAK: 24.05.2024 tarihinde kursumuzda yapılan gözlemlerde, öğrencimiz [Öğrenci Adı Soyadı]'nın diğer kursiyerlerle sık sık tartışma yaşadığı ve disiplinsiz davranışlar sergilediği tespit edilmiştir. Kurs disiplinini ve huzurunu korumak adına, ilgili öğrencinin söz konusu tutumlarını düzeltmesi hususunda uyarılmasına ve velisinin durum hakkında bilgilendirilmesine karar verilmiştir.",
  },
  {
    title: "Anamdan hata yapmışım", tag: "Derse Geç Kalma", date: "2026-10-18", signed: true,
    body: "Yapılan gözlemler neticesinde; bazı öğrencilerin eğitim-öğretim süreci içerisinde arkadaşlarıyla uyumsuz davranışlar sergilediği görülmüştür.",
  },
];

const gunluk = [
  { date: "2026-10-21 · Çarşamba", durum: "İzinli", tone: "text-info" },
  { date: "2026-10-21 · Çarşamba", durum: "Namaz + Ders", tone: "text-primary" },
  { date: "2026-10-22 · Perşembe", durum: "Namaz + Ders", tone: "text-primary" },
];

function StatCard({ label, icon: Icon, value, tone }: { label: string; icon: typeof Clock; value: number; tone: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon className="h-5 w-5" /></div>
      <p className="mt-3 font-serif text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function TalebeDetay() {
  const { name } = Route.useParams();
  const student = students.find((s) => s.name === name) ?? { name, status: "İyi" as const };
  const [tab, setTab] = useState<(typeof tabs)[number]>("Yoklama");

  return (
    <AppShell>
      <Link to="/" className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Talebeler
      </Link>

      {/* Profil kartı */}
      <div className="mt-3 rounded-2xl border border-border bg-card p-5">
        <div className="h-20 w-20 rounded-2xl bg-surface" />
        <div className="mt-3 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold">{student.name}</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm">
              <Pencil className="h-4 w-4" /> Düzenle
            </button>
            <button className="rounded-xl p-2 text-destructive"><Trash2 className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span>23 yaş</span>
          <span className="rounded-full bg-amber-soft px-3 py-0.5 text-xs font-medium text-warn">Daimi Grup</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Tamam</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 2026-10-18</span>
        </div>
        <div className="mt-2 flex items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> Df</span>
          <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> 7044245</span>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="mt-5 grid grid-cols-3 gap-1 rounded-2xl bg-surface p-1.5">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-xl py-2 text-sm ${tab === t ? "bg-card font-semibold shadow-sm" : "text-muted-foreground"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "Yoklama" && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold">Yoklama Geçmişi</h3>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm text-primary-foreground">
              <Plus className="h-4 w-4" /> Yoklama Ekle
            </button>
          </div>

          {/* Aylık gelişim grafiği */}
          <div className="mt-4 rounded-2xl border border-border bg-card p-5">
            <h4 className="font-serif text-lg font-bold">Aylık Gelişim Grafiği</h4>
            <p className="mt-1 text-xs text-muted-foreground">Ders ve namaz katılım oranları — son aylar (%)</p>
            <div className="mt-4 flex h-40 items-end gap-6 border-b border-border px-4">
              {[
                { ay: "Eyl", namaz: 60, ders: 55 },
                { ay: "Eki", namaz: 75, ders: 75 },
              ].map((m) => (
                <div key={m.ay} className="flex h-full flex-1 items-end justify-center gap-2">
                  <div className="w-8 rounded-t-lg bg-good" style={{ height: `${m.namaz}%` }} />
                  <div className="w-8 rounded-t-lg bg-warn" style={{ height: `${m.ders}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-good" /> Namaz %</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warn" /> Ders %</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {topStats.map((s) => <StatCard key={s.label} {...s} />)}
            {namazStats.map((s) => <StatCard key={s.label} {...s} tone="bg-brand-soft text-good" />)}
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
            {history.map((h) => (
              <div key={h.date} className="flex flex-wrap items-center gap-2 border-b border-border px-4 py-3 text-sm last:border-0">
                <span className="font-medium">{h.date}</span>
                <span className="flex-1" />
                {h.chips.map((c) => (
                  <span key={c} className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs text-primary">{c}</span>
                ))}
                <span className="text-xs text-muted-foreground">Ders: {h.ders}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "Tutanaklar" && (
        <>
          <div className="mt-6 flex items-start justify-between gap-3">
            <h3 className="font-serif text-2xl font-bold leading-tight">Tutanaklar & Davranış Kayıtları</h3>
            <button className="flex shrink-0 items-center gap-2 rounded-xl bg-destructive px-4 py-2.5 text-sm text-destructive-foreground">
              <Plus className="h-4 w-4" /> Tutanak Ekle
            </button>
          </div>
          <h4 className="mt-5 font-serif text-lg font-bold text-primary">Olumlu (0)</h4>
          <p className="mt-2 text-sm text-muted-foreground">Kayıt yok.</p>
          <h4 className="mt-5 font-serif text-lg font-bold text-warn">Olumsuz ({tutanaklar.length})</h4>
          <div className="mt-3 space-y-4">
            {tutanaklar.map((t) => (
              <div key={t.title} className="rounded-2xl border border-warn/40 bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-soft">
                    <AlertTriangle className="h-5 w-5 text-warn" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="rounded-full bg-destructive px-3 py-1 text-xs text-destructive-foreground">{t.tag}</span>
                    {t.signed && <span className="flex items-center gap-1 text-xs text-good"><PenLine className="h-3.5 w-3.5" /> İmzalı</span>}
                  </div>
                </div>
                <p className="mt-3 rounded-xl bg-surface p-4 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "Aile Raporu" && (
        <>
          <div className="mt-6 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold">Aile Raporu</h3>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm">
                <Printer className="h-4 w-4" /> Yazdır
              </button>
              <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground">
                <Download className="h-4 w-4" /> PDF İndir
              </button>
            </div>
          </div>
          <div className="mt-4 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-surface" />
              <div>
                <p className="font-serif text-xl font-bold">{student.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span>23 yaş</span>
                  <span className="rounded-full bg-amber-soft px-2.5 py-0.5 text-xs font-medium text-warn">Daimi Grup</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Tamam</span>
                </div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-y-6 border-t border-border pt-5 text-center">
              {[
                { icon: CheckCircle2, v: 4, l: "Namaza Katıldığı", c: "text-good" },
                { icon: CheckCircle2, v: 3, l: "Derse Girdiği", c: "text-good" },
                { icon: Clock, v: 0, l: "Geç Kaldığı", c: "text-warn" },
                { icon: CalendarX, v: 0, l: "Katılmadığı", c: "text-destructive" },
                { icon: CalendarOff, v: 1, l: "İzinli Gün", c: "text-info" },
                { icon: CalendarDays, v: 4, l: "Toplam Gün", c: "text-muted-foreground" },
              ].map((s) => (
                <div key={s.l}>
                  <s.icon className={`mx-auto h-7 w-7 ${s.c}`} />
                  <p className="mt-1 font-serif text-2xl font-bold">{s.v}</p>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
            <h4 className="mt-6 font-serif text-lg font-bold">Günlük Katılım Detayı</h4>
            <div className="mt-3 overflow-hidden rounded-xl border border-border">
              {gunluk.map((g, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border px-4 py-3 text-sm last:border-0">
                  <span className="text-muted-foreground">{g.date}</span>
                  <span className={`font-medium ${g.tone}`}>{g.durum}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AppShell>
  );
}
