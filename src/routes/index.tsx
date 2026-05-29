import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { AppSidebar, MobileNav, type ViewKey } from "@/components/futureguide/AppSidebar";
import { UserView } from "@/components/futureguide/UserView";
import { ClientView } from "@/components/futureguide/ClientView";
import { AdminView } from "@/components/futureguide/AdminView";
import { ImpactView } from "@/components/futureguide/ImpactView";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FutureGuide AI — Quality Education for All (SDG 4)" },
      { name: "description", content: "AI-powered career guidance aligned with SDG 4, Vision 2030 & Vision 2035." },
      { property: "og:title", content: "FutureGuide AI" },
      { property: "og:description", content: "AI-powered career guidance aligned with SDG 4." },
    ],
  }),
  component: App,
});

const titles: Record<ViewKey, string> = {
  user: "User Dashboard",
  client: "Client Dashboard",
  admin: "Admin Dashboard",
  impact: "Impact & Vision",
};

function App() {
  const [view, setView] = useState<ViewKey>("user");

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar active={view} onChange={setView} />

      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav active={view} onChange={setView} />

        <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b bg-card/60 backdrop-blur sticky top-0 z-10">
          <div>
            <p className="text-xs text-muted-foreground">FutureGuide AI</p>
            <h2 className="text-lg font-semibold tracking-tight">{titles[view]}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search…"
                className="pl-9 pr-4 py-2 text-sm rounded-lg bg-muted/50 border border-transparent focus:bg-card focus:border-primary/40 focus:outline-none w-64 transition-all"
              />
            </div>
            <button className="relative h-10 w-10 rounded-lg bg-muted/50 hover:bg-muted grid place-items-center transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-hero grid place-items-center text-primary-foreground text-sm font-semibold">
              AM
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          {view === "user" && <UserView />}
          {view === "client" && <ClientView />}
          {view === "admin" && <AdminView />}
          {view === "impact" && <ImpactView />}
        </main>
      </div>

      <Toaster />
    </div>
  );
}
