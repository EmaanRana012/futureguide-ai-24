import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Users, Server, Zap, MoreHorizontal } from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell,
} from "recharts";

const usage = [
  { d: "Mon", users: 1240, ai: 820 },
  { d: "Tue", users: 1580, ai: 1100 },
  { d: "Wed", users: 1720, ai: 1340 },
  { d: "Thu", users: 1610, ai: 1280 },
  { d: "Fri", users: 1980, ai: 1620 },
  { d: "Sat", users: 1430, ai: 980 },
  { d: "Sun", users: 1180, ai: 780 },
];

const roles = [
  { name: "Students", value: 18420 },
  { name: "Mentors", value: 1240 },
  { name: "Clients", value: 312 },
  { name: "Admins", value: 24 },
];

const users = [
  { name: "Sara Al-Mutairi", role: "Student", status: "active", joined: "Mar 12, 2025" },
  { name: "Omar Khaled", role: "Mentor", status: "active", joined: "Feb 28, 2025" },
  { name: "KAUST University", role: "Client", status: "pending", joined: "Apr 02, 2025" },
  { name: "Lina Hassan", role: "Student", status: "active", joined: "Apr 05, 2025" },
  { name: "Tech Valley Co.", role: "Client", status: "suspended", joined: "Jan 18, 2025" },
  { name: "Ahmed Riyad", role: "Admin", status: "active", joined: "Dec 04, 2024" },
];

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary",
  pending: "bg-secondary/10 text-secondary",
  suspended: "bg-destructive/10 text-destructive",
};

export function AdminView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">System health, usage metrics & user management</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: "Total Users", val: "19,996", sub: "+312 today" },
          { icon: Activity, label: "Daily Active", val: "8,412", sub: "42% of base" },
          { icon: Zap, label: "AI Sessions", val: "2,184", sub: "Today" },
          { icon: Server, label: "Uptime", val: "99.98%", sub: "Last 30 days" },
        ].map((s) => {
          const I = s.icon;
          return (
            <Card key={s.label} className="p-5 shadow-card border-border/60">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <I className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="mt-2 text-2xl font-bold tabular-nums">{s.val}</p>
              <p className="text-xs text-primary mt-1">{s.sub}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 p-6 shadow-card border-border/60">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold">Platform Usage</p>
              <p className="text-xs text-muted-foreground">Active users vs AI sessions · last 7 days</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Users</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" />AI</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usage}>
                <defs>
                  <linearGradient id="gu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.14 165)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.62 0.14 165)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.17 245)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.52 0.17 245)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 220)" vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.012 220)", fontSize: 12 }} />
                <Area type="monotone" dataKey="users" stroke="oklch(0.62 0.14 165)" strokeWidth={2.5} fill="url(#gu)" />
                <Area type="monotone" dataKey="ai" stroke="oklch(0.52 0.17 245)" strokeWidth={2.5} fill="url(#ga)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-6 shadow-card border-border/60">
          <p className="text-sm font-semibold mb-1">User Distribution</p>
          <p className="text-xs text-muted-foreground mb-4">Across all roles</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roles} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.012 220)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.012 220)", fontSize: 12 }} />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {roles.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? "oklch(0.62 0.14 165)" : "oklch(0.52 0.17 245)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="shadow-card border-border/60 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <p className="text-sm font-semibold">User Management</p>
            <p className="text-xs text-muted-foreground">Recent accounts</p>
          </div>
          <Button size="sm" variant="outline" className="rounded-lg">Export</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th className="text-left font-medium px-6 py-3">Name</th>
                <th className="text-left font-medium px-6 py-3">Role</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-left font-medium px-6 py-3">Joined</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u) => (
                <tr key={u.name} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-hero text-primary-foreground grid place-items-center text-xs font-semibold">
                        {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">{u.role}</td>
                  <td className="px-6 py-3.5">
                    <Badge className={`${statusStyles[u.status]} border-0 capitalize`}>{u.status}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">{u.joined}</td>
                  <td className="px-6 py-3.5 text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
