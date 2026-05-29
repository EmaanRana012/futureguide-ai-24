import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Globe2, Telescope, Users2, Leaf, Brain, Heart, Target, ChevronRight } from "lucide-react";

export function ImpactView() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <Card className="relative overflow-hidden border-0 bg-gradient-hero text-primary-foreground p-10 shadow-glow">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative max-w-3xl">
          <Badge className="bg-white/15 text-white border-0 backdrop-blur-sm mb-4">
            <Globe2 className="h-3 w-3 mr-1" /> Impact & Vision
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Education that compounds — for people, planet, and progress.
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90">
            FutureGuide AI is built to advance <strong>UN SDG 4</strong>, support <strong>Vision 2030</strong>,
            and prepare the next generation for <strong>Vision 2035</strong>.
          </p>
        </div>
      </Card>

      {/* Three pillars */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            tag: "UN SDG 4",
            title: "Quality Education for All",
            icon: GraduationCap,
            desc: "Ensure inclusive, equitable, lifelong learning opportunities — regardless of geography, gender, or income.",
            points: ["Free AI career guidance", "Personalized roadmaps", "Mentorship at scale"],
          },
          {
            tag: "Vision 2030",
            title: "Human Capital Development",
            icon: Telescope,
            desc: "Empower a knowledge-driven workforce. Align learner pathways to national diversification & talent goals.",
            points: ["Skills-to-jobs matching", "University partnerships", "Future-of-work analytics"],
          },
          {
            tag: "Vision 2035",
            title: "Sustainable Generations",
            icon: Leaf,
            desc: "Build resilient, sustainability-literate citizens equipped for the green economy and ethical AI era.",
            points: ["Green-skills curriculum", "Ethical AI literacy", "Lifelong learning loops"],
          },
        ].map((p) => {
          const I = p.icon;
          return (
            <Card key={p.tag} className="p-7 shadow-card border-border/60 hover:shadow-glow transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-gradient-hero grid place-items-center mb-5 shadow-glow">
                <I className="h-6 w-6 text-primary-foreground" />
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 mb-3">{p.tag}</Badge>
              <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm">
                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {/* SDG 4 targets */}
      <Card className="p-8 shadow-card border-border/60 bg-gradient-soft">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge className="bg-secondary/10 text-secondary border-0 mb-3">SDG 4 · Direct Targets</Badge>
            <h2 className="text-2xl font-bold tracking-tight">How we map to the goal</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Every feature in FutureGuide AI ties back to a measurable SDG 4 sub-target — from
              equitable access (4.3) to relevant skills for decent work (4.4) and global citizenship (4.7).
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { code: "4.3", label: "Equal access to higher education" },
              { code: "4.4", label: "Skills for employment" },
              { code: "4.5", label: "Eliminate gender disparities" },
              { code: "4.7", label: "Sustainable development education" },
            ].map((t) => (
              <div key={t.code} className="bg-card rounded-xl p-4 border border-border/60">
                <p className="text-xs font-bold text-primary">Target {t.code}</p>
                <p className="text-sm font-medium mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Impact metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users2, n: "24K+", l: "Learners empowered" },
          { icon: Brain, n: "120K+", l: "AI roadmaps generated" },
          { icon: Heart, n: "62%", l: "Underserved reached" },
          { icon: Target, n: "78.6%", l: "Placement success" },
        ].map((m) => {
          const I = m.icon;
          return (
            <Card key={m.l} className="p-6 shadow-card border-border/60 text-center">
              <div className="h-11 w-11 rounded-xl bg-gradient-hero text-primary-foreground grid place-items-center mx-auto shadow-glow">
                <I className="h-5 w-5" />
              </div>
              <p className="mt-4 text-3xl font-bold text-gradient">{m.n}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.l}</p>
            </Card>
          );
        })}
      </div>

      {/* CTA */}
      <Card className="p-8 bg-gradient-hero text-primary-foreground border-0 shadow-glow text-center">
        <h3 className="text-2xl font-bold">Building the future, one learner at a time.</h3>
        <p className="mt-2 text-primary-foreground/90 max-w-2xl mx-auto">
          Together with educators, employers, and governments — we're shaping the world of 2030 and beyond.
        </p>
      </Card>
    </div>
  );
}
