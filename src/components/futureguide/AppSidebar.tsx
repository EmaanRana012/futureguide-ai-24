import { LayoutDashboard, Building2, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewKey = "user" | "client" | "admin" | "impact";

const items: { key: ViewKey; label: string; icon: typeof LayoutDashboard; hint: string }[] = [
  { key: "user", label: "User Dashboard", icon: LayoutDashboard, hint: "Career AI & roadmap" },
  { key: "client", label: "Client Dashboard", icon: Building2, hint: "Universities & employers" },
  { key: "admin", label: "Admin Dashboard", icon: ShieldCheck, hint: "System & users" },
  { key: "impact", label: "Impact & Vision", icon: Sparkles, hint: "SDG 4 · 2030 · 2035" },
];

export function AppSidebar({ active, onChange }: { active: ViewKey; onChange: (v: ViewKey) => void }) {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="h-10 w-10 rounded-xl bg-gradient-hero grid place-items-center shadow-glow">
          <GraduationCap className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight">FutureGuide AI</p>
          <p className="text-[11px] text-sidebar-foreground/60">Quality Education · SDG 4</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map(({ key, label, icon: Icon, hint }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={cn(
                "w-full group flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
              )}
            >
              <div className={cn(
                "h-9 w-9 rounded-lg grid place-items-center shrink-0 transition-colors",
                isActive ? "bg-gradient-hero text-primary-foreground" : "bg-sidebar-accent/60 text-sidebar-foreground/70"
              )}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{label}</p>
                <p className="text-[11px] text-sidebar-foreground/55 mt-0.5">{hint}</p>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="p-4 m-3 rounded-xl bg-sidebar-accent/40 border border-sidebar-border">
        <p className="text-xs font-medium text-sidebar-foreground">Aligned with</p>
        <p className="text-[11px] text-sidebar-foreground/60 mt-1">UN SDG 4 · Vision 2030 · Vision 2035</p>
      </div>
    </aside>
  );
}

export function MobileNav({ active, onChange }: { active: ViewKey; onChange: (v: ViewKey) => void }) {
  return (
    <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-3 bg-sidebar border-b border-sidebar-border">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
            active === key
              ? "bg-gradient-hero text-primary-foreground"
              : "bg-sidebar-accent/40 text-sidebar-foreground/80"
          )}
        >
          <Icon className="h-3.5 w-3.5" /> {label}
        </button>
      ))}
    </div>
  );
}
