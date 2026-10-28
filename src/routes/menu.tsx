import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menü — Kur'an Kursu" },
      { name: "description", content: "Kur'an kursu uygulama menüsü." },
      { property: "og:title", content: "Menü — Kur'an Kursu" },
      { property: "og:description", content: "Kur'an kursu uygulama menüsü." },
    ],
  }),
  component: () => (
    <AppShell>
      <h2 className="mt-7 font-serif text-3xl font-bold">Menü</h2>
      <p className="mt-2 text-sm text-muted-foreground">Yakında.</p>
    </AppShell>
  ),
});
