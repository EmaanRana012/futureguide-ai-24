import { useState } from "react";
import { Send, Sparkles, CheckCircle2, Loader2, BookOpen, Briefcase, Rocket, Award, Target, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type CareerPath = {
  title: string;
  match: number;
  why: string;
  skills: string[];
  roadmap: { month: string; focus: string }[];
};

type Msg = { role: "user" | "ai"; text: string; paths?: CareerPath[] };

const CAREER_DATASET: { keywords: string[]; path: CareerPath }[] = [
  {
    keywords: ["ai", "ml", "machine", "python", "math", "statistics", "model"],
    path: {
      title: "AI / Machine Learning Engineer",
      match: 96,
      why: "Strong quantitative & analytical signals align with model-building work.",
      skills: ["Python", "PyTorch / TensorFlow", "Linear Algebra", "MLOps", "Prompt Engineering"],
      roadmap: [
        { month: "Month 1–2", focus: "Python + NumPy/Pandas fundamentals" },
        { month: "Month 3–4", focus: "Core ML: regression, trees, neural nets" },
        { month: "Month 5", focus: "Build 2 portfolio projects + Kaggle entry" },
        { month: "Month 6", focus: "Deploy a model & apply to junior AI roles" },
      ],
    },
  },
  {
    keywords: ["data", "analytics", "sql", "business", "dashboard", "insight"],
    path: {
      title: "Data Analyst",
      match: 92,
      why: "Curiosity for patterns + storytelling with numbers.",
      skills: ["SQL", "Excel / Sheets", "Power BI / Tableau", "Statistics", "Communication"],
      roadmap: [
        { month: "Month 1", focus: "SQL & spreadsheet fluency" },
        { month: "Month 2–3", focus: "Statistics + Tableau / Power BI" },
        { month: "Month 4–5", focus: "3 dashboard case studies" },
        { month: "Month 6", focus: "Portfolio site + analyst interviews" },
      ],
    },
  },
  {
    keywords: ["design", "ux", "ui", "creative", "art", "product", "figma"],
    path: {
      title: "UX / Product Designer",
      match: 94,
      why: "Empathy + aesthetics + systems thinking — designer DNA.",
      skills: ["Figma", "User Research", "Design Systems", "Prototyping", "Accessibility"],
      roadmap: [
        { month: "Month 1", focus: "Figma + UI fundamentals" },
        { month: "Month 2–3", focus: "User research & journey mapping" },
        { month: "Month 4–5", focus: "3 end-to-end case studies" },
        { month: "Month 6", focus: "Portfolio + mentor reviews + apply" },
      ],
    },
  },
  {
    keywords: ["web", "code", "software", "developer", "engineer", "react", "frontend", "backend"],
    path: {
      title: "Full-Stack Web Developer",
      match: 93,
      why: "Builder mindset with appetite for shipping real products.",
      skills: ["JavaScript / TypeScript", "React", "Node.js", "PostgreSQL", "Git"],
      roadmap: [
        { month: "Month 1", focus: "HTML, CSS, JavaScript core" },
        { month: "Month 2–3", focus: "React + REST APIs" },
        { month: "Month 4–5", focus: "Build & deploy 2 full-stack apps" },
        { month: "Month 6", focus: "Open-source contributions + interviews" },
      ],
    },
  },
  {
    keywords: ["security", "cyber", "hack", "network", "infosec"],
    path: {
      title: "Cybersecurity Analyst",
      match: 91,
      why: "Defensive thinking + curiosity about how systems break.",
      skills: ["Networking", "Linux", "SIEM Tools", "Threat Modeling", "Python Scripting"],
      roadmap: [
        { month: "Month 1–2", focus: "Networking + Linux essentials" },
        { month: "Month 3", focus: "CompTIA Security+ prep" },
        { month: "Month 4–5", focus: "TryHackMe / HackTheBox labs" },
        { month: "Month 6", focus: "Cert + SOC analyst applications" },
      ],
    },
  },
  {
    keywords: ["cloud", "devops", "infra", "aws", "azure", "kubernetes"],
    path: {
      title: "Cloud / DevOps Engineer",
      match: 90,
      why: "Systems thinker who enjoys automation & reliability.",
      skills: ["Linux", "Docker", "Kubernetes", "AWS / Azure", "Terraform"],
      roadmap: [
        { month: "Month 1", focus: "Linux + Bash + Git" },
        { month: "Month 2–3", focus: "Docker & CI/CD pipelines" },
        { month: "Month 4–5", focus: "AWS Solutions Architect Associate prep" },
        { month: "Month 6", focus: "IaC project + junior DevOps applications" },
      ],
    },
  },
  {
    keywords: ["sustain", "green", "climate", "environment", "energy", "eco"],
    path: {
      title: "Sustainability / Green-Tech Specialist",
      match: 89,
      why: "Mission-driven and aligned with the green economy of Vision 2035.",
      skills: ["ESG Frameworks", "Carbon Accounting", "Data Analysis", "Policy Literacy", "GIS"],
      roadmap: [
        { month: "Month 1", focus: "Climate & ESG fundamentals" },
        { month: "Month 2–3", focus: "Carbon accounting + GHG protocol" },
        { month: "Month 4–5", focus: "Real-org carbon footprint case study" },
        { month: "Month 6", focus: "Certification + green-tech internships" },
      ],
    },
  },
  {
    keywords: ["teach", "education", "tutor", "learn", "mentor"],
    path: {
      title: "EdTech Specialist",
      match: 92,
      why: "Passion for learning + tech amplifies impact at scale (SDG 4).",
      skills: ["Instructional Design", "LMS Platforms", "Content Creation", "Analytics", "AI Tools"],
      roadmap: [
        { month: "Month 1", focus: "Pedagogy & instructional design" },
        { month: "Month 2–3", focus: "Build 2 micro-courses on a public LMS" },
        { month: "Month 4–5", focus: "AI tools for personalized learning" },
        { month: "Month 6", focus: "Portfolio + EdTech role applications" },
      ],
    },
  },
];

function pickPaths(input: string): CareerPath[] {
  const text = input.toLowerCase();
  const scored = CAREER_DATASET.map(({ keywords, path }) => ({
    path,
    score: keywords.reduce((s, k) => s + (text.includes(k) ? 1 : 0), 0),
  }));
  const matched = scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
  const remaining = CAREER_DATASET
    .map((d) => d.path)
    .filter((p) => !matched.find((m) => m.path.title === p.title));
  const chosen =
    matched.length >= 3
      ? matched.slice(0, 3).map((m) => m.path)
      : [...matched.map((m) => m.path), ...remaining.slice(0, 3 - matched.length)];
  return chosen;
}

export function UserView() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi Emaan! Tell me your interests or skills and I'll generate 3 tailored career paths with a 6-month roadmap." },
  ]);
  const [loading, setLoading] = useState(false);

  const send = () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", text: input };
    const userInput = input;
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const paths = pickPaths(userInput);
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Based on "${userInput}", here are your top 3 tailored career paths — each mapped to a 6-month plan aligned with UN SDG 4 (Quality Education):`,
          paths,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <Card className="relative overflow-hidden border-0 bg-gradient-hero text-primary-foreground p-8 shadow-glow">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-4 bottom-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm mb-3">
            <Sparkles className="h-3 w-3 mr-1" /> Powered by AI
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Amal 👋</h1>
          <p className="mt-2 text-primary-foreground/90 max-w-2xl">
            Your personalized career compass. Chat with the AI advisor, track your progress,
            and unlock the skills the world needs next.
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chatbot */}
        <Card className="lg:col-span-3 flex flex-col h-[560px] shadow-card border-border/60 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b bg-card">
            <div className="h-9 w-9 rounded-lg bg-gradient-hero grid place-items-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Career Advisor</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Online
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-soft/30">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div className={`${m.paths ? "max-w-[92%]" : "max-w-[80%]"} rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-gradient-hero text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm"
                }`}>
                  <p className={m.paths ? "mb-3" : ""}>{m.text}</p>
                  {m.paths && (
                    <div className="space-y-3">
                      {m.paths.map((p, idx) => (
                        <div key={idx} className="rounded-xl border border-border/70 bg-gradient-soft/40 p-3.5">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="h-6 w-6 rounded-full bg-gradient-hero text-primary-foreground grid place-items-center text-[11px] font-bold">
                                {idx + 1}
                              </span>
                              <p className="font-semibold text-foreground">{p.title}</p>
                            </div>
                            <Badge className="bg-primary/10 text-primary border-0 text-[10px]">{p.match}% match</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">{p.why}</p>
                          <p className="mt-3 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground">Required skills</p>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {p.skills.map((s) => (
                              <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-accent text-accent-foreground">{s}</span>
                            ))}
                          </div>
                          <p className="mt-3 text-[11px] uppercase tracking-wide font-semibold text-muted-foreground">6-month roadmap</p>
                          <ol className="mt-1.5 space-y-1">
                            {p.roadmap.map((r, j) => (
                              <li key={j} className="flex gap-2 text-xs">
                                <span className="text-primary font-semibold shrink-0 w-20">{r.month}</span>
                                <span className="text-foreground">{r.focus}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ))}
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                        <GraduationCap className="h-3 w-3 text-primary" />
                        Aligned with UN SDG 4 — Quality, equitable & lifelong learning.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border rounded-2xl px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating your roadmap…
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-card">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="e.g. I love math and want to work in AI…"
                className="flex-1 px-4 py-2.5 rounded-xl bg-muted/50 border border-transparent focus:bg-card focus:border-primary/40 focus:outline-none text-sm transition-all"
              />
              <Button onClick={send} size="icon" className="rounded-xl bg-gradient-hero hover:opacity-90 h-10 w-10">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["AI Engineer", "UX Designer", "Data Scientist", "Cybersecurity"].map((t) => (
                <button
                  key={t}
                  onClick={() => setInput(`I want to become a ${t}`)}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Roadmap tracker */}
        <Card className="lg:col-span-2 p-6 shadow-card border-border/60">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-sm font-semibold">Your Career Roadmap</p>
              <p className="text-xs text-muted-foreground">Path: AI Engineer</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0">60% complete</Badge>
          </div>

          <div className="h-2 rounded-full bg-muted overflow-hidden mb-6">
            <div className="h-full w-[60%] bg-gradient-hero rounded-full" />
          </div>

          <div className="relative space-y-4">
            {[
              { icon: BookOpen, label: "Foundations", desc: "Python & Statistics", status: "done" },
              { icon: Target, label: "Specialization", desc: "Machine Learning", status: "done" },
              { icon: Briefcase, label: "Real Projects", desc: "3 portfolio builds", status: "active" },
              { icon: Award, label: "Certification", desc: "Cloud ML Associate", status: "todo" },
              { icon: Rocket, label: "First Role", desc: "Junior AI Engineer", status: "todo" },
            ].map((step, i, arr) => {
              const Icon = step.icon;
              const done = step.status === "done";
              const active = step.status === "active";
              return (
                <div key={i} className="flex gap-3 relative">
                  {i < arr.length - 1 && (
                    <div className="absolute left-[18px] top-9 w-px h-full bg-border" />
                  )}
                  <div className={`h-9 w-9 rounded-xl grid place-items-center shrink-0 relative z-10 ${
                    done ? "bg-primary text-primary-foreground"
                    : active ? "bg-gradient-hero text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground"
                  }`}>
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{step.label}</p>
                      {active && <Badge className="bg-secondary/10 text-secondary border-0 text-[10px] h-4 px-1.5">Now</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                  {done && <CheckCircle2 className="h-0 w-0 sr-only" />}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
