import { Users, TrendingUp, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const stats = [
  { label: "Total Students Monitored", value: "24,318", delta: "+12.4%", icon: Users, tint: "primary" },
  { label: "Active Programs", value: "187", delta: "+8 this month", icon: GraduationCap, tint: "secondary" },
  { label: "Open Opportunities", value: "1,042", delta: "+23.1%", icon: Briefcase, tint: "primary" },
  { label: "Placement Rate", value: "78.6%", delta: "+4.2pts", icon: TrendingUp, tint: "secondary" },
];

const skills = [
  { name: "Artificial Intelligence", demand: 94 },
  { name: "Data Analytics", demand: 88 },
  { name: "Cloud Engineering", demand: 82 },
  { name: "UX / Product Design", demand: 71 },
  { name: "Cybersecurity", demand: 69 },
  { name: "Sustainable Engineering", demand: 58 },
];

export function ClientView() {
  const [form, setForm] = useState({ title: "", type: "Internship", location: "", desc: "" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Client Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Analytics for universities, employers & partners</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="p-5 shadow-card border-border/60 hover:shadow-glow transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`h-10 w-10 rounded-xl grid place-items-center ${
                  s.tint === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[10px]">
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />{s.delta}
                </Badge>
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 p-6 shadow-card border-border/60">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-semibold">Top In-Demand Skills</p>
              <p className="text-xs text-muted-foreground">Q1 2025 · regional employer index</p>
            </div>
            <Badge className="bg-gradient-hero text-primary-foreground border-0">Live</Badge>
          </div>
          <div className="space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-foreground">{s.name}</span>
                  <span className="text-muted-foreground tabular-nums">{s.demand}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-gradient-hero rounded-full transition-all"
                    style={{ width: `${s.demand}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 shadow-card border-border/60">
          <div className="mb-5">
            <p className="text-sm font-semibold">Post Job / Opportunity</p>
            <p className="text-xs text-muted-foreground">Reach 24K+ active learners</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Opportunity posted (demo)", { description: form.title || "Untitled" });
              setForm({ title: "", type: "Internship", location: "", desc: "" });
            }}
            className="space-y-3"
          >
            <input
              placeholder="Role title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-muted/50 border border-transparent focus:bg-card focus:border-primary/40 focus:outline-none transition-all"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="px-3 py-2.5 text-sm rounded-lg bg-muted/50 border border-transparent focus:bg-card focus:border-primary/40 focus:outline-none transition-all"
              >
                <option>Internship</option><option>Full-time</option><option>Scholarship</option><option>Mentorship</option>
              </select>
              <input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="px-3 py-2.5 text-sm rounded-lg bg-muted/50 border border-transparent focus:bg-card focus:border-primary/40 focus:outline-none transition-all"
              />
            </div>
            <textarea
              placeholder="Brief description…"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              rows={4}
              className="w-full px-3 py-2.5 text-sm rounded-lg bg-muted/50 border border-transparent focus:bg-card focus:border-primary/40 focus:outline-none transition-all resize-none"
            />
            <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90 rounded-lg">
              Publish opportunity
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
