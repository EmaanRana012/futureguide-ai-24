import { useState } from "react";
import { Send, Sparkles, CheckCircle2, Circle, Loader2, BookOpen, Briefcase, Rocket, Award, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Msg = { role: "user" | "ai"; text: string; steps?: string[] };

const SAMPLE_REPLIES: Record<string, string[]> = {
  default: [
    "Learn Python fundamentals (4 weeks)",
    "Build 2 data projects with pandas & NumPy",
    "Study core ML concepts: regression, trees, neural nets",
    "Complete a Kaggle competition end-to-end",
    "Publish a portfolio + apply to junior AI roles",
  ],
};

export function UserView() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hi! Tell me your interests or skills and I'll generate a personalized career roadmap." },
  ]);
  const [loading, setLoading] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          text: `Here's a tailored roadmap based on "${userMsg.text}":`,
          steps: SAMPLE_REPLIES.default,
        },
      ]);
      setLoading(false);
    }, 900);
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
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-gradient-hero text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm"
                }`}>
                  <p>{m.text}</p>
                  {m.steps && (
                    <ol className="mt-3 space-y-2">
                      {m.steps.map((s, idx) => (
                        <li key={idx} className="flex gap-2.5 text-xs">
                          <span className="h-5 w-5 rounded-full bg-primary/10 text-primary grid place-items-center text-[10px] font-bold shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-foreground">{s}</span>
                        </li>
                      ))}
                    </ol>
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
                  {done && <Circle className="h-0 w-0" />}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
