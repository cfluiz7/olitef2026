import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, ArrowRight, BookOpen, Check, Flame, GraduationCap,
  Library, LockKeyhole, Medal, Play, RotateCcw, Sparkles, Target,
  Trophy,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const tracks = [
  { level: "Nível 1", levelKey: "nivel-1" as const, years: "6.º e 7.º anos", progress: 68, description: "Dinheiro, escolhas, metas e primeiros hábitos.", color: "green", topics: ["Receitas e despesas", "Orçamento", "Poupança", "Consumo consciente"] },
  { level: "Nível 2", levelKey: "nivel-2" as const, years: "8.º e 9.º anos", progress: 34, description: "Crédito, juros, investimentos e câmbio.", color: "blue", topics: ["Endividamento", "Juros", "Renda fixa", "Renda variável"] },
];

const achievements = [
  { icon: Flame, title: "Em sequência", detail: "4 dias seguidos", color: "bg-brand-coral/15 text-brand-coral" },
  { icon: Target, title: "Primeira meta", detail: "Concluiu um plano", color: "bg-brand-blue/15 text-brand-blue" },
  { icon: Medal, title: "Mente poupadora", detail: "10 desafios certos", color: "bg-brand-sun/25 text-amber-700" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const name = user?.name?.split(" ")[0] || "estudante";
  const { data: progressData } = trpc.student.progress.useQuery(undefined, { enabled: Boolean(user) });
  const { data: achievementData } = trpc.student.achievements.useQuery(undefined, { enabled: Boolean(user) });
  const { data: topicPerformance } = trpc.student.topicPerformance.useQuery(undefined, { enabled: Boolean(user) });
  const { data: recommendation } = trpc.student.recommendation.useQuery(undefined, { enabled: Boolean(user) });
  const { data: dueReviews } = trpc.student.dueReviews.useQuery(undefined, { enabled: Boolean(user) });
  const { data: streak } = trpc.student.streak.useQuery(undefined, { enabled: Boolean(user) });

  const progressByLevel = Object.fromEntries((progressData ?? []).map((item) => [item.level, item.totalLessons > 0 ? Math.round((item.completedLessons / item.totalLessons) * 100) : 0]));
  const totalXp = (progressData ?? []).reduce((sum, item) => sum + item.xp, 0);
  const totalLessons = (progressData ?? []).reduce((sum, item) => sum + item.totalLessons, 0);
  const completedLessons = (progressData ?? []).reduce((sum, item) => sum + item.completedLessons, 0);
  const overallProgress = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Início
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="brand-mark"><Sparkles className="h-4 w-4" /></div>
            <span className="font-display font-extrabold text-ink">olitef<span className="text-brand-green">.estudos</span></span>
          </div>
          <div>{user ? (
            <span className="hidden text-sm font-bold text-muted-foreground sm:inline">Olá, {name}</span>
          ) : (
            <Button onClick={() => startLogin()} size="sm" className="btn-duo btn-green rounded-xl">Entrar</Button>
          )}</div>
        </div>
      </header>

      <main className="container py-8 lg:py-12">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Área do estudante</p>
            <h1 className="font-display text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">
              Hoje é um bom dia<br />para <span className="highlight-green">avançar.</span>
            </h1>
            <p className="mt-3 max-w-lg leading-6 text-muted-foreground font-semibold">Escolhe uma trilha, completa um desafio e vê o teu conhecimento crescer.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm border-2 border-ink/5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-coral/15 text-brand-coral"><Flame className="h-5 w-5" /></div>
            <div>
              <p className="text-xs text-muted-foreground font-bold">Sequência</p>
              <p className="font-display font-extrabold">{user ? `${streak ?? 0} dia${streak === 1 ? "" : "s"}` : "A começar"}</p>
            </div>
          </div>
        </div>

        {!user && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border-2 border-brand-green/15 bg-brand-green/5 p-3 text-sm text-ink font-semibold">
            <LockKeyhole className="h-4 w-4 shrink-0 text-brand-green" />
            <span>Estás a ver uma prévia. <button onClick={() => startLogin()} className="font-extrabold text-brand-green underline underline-offset-4">Entra para guardar progresso.</button></span>
          </div>
        )}

        {/* DESAFIO RECOMENDADO + RESUMO */}
        <section className="mt-8 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <Card className="overflow-hidden rounded-2xl border-2 border-ink/5 bg-ink text-white shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Badge className="rounded-full border-0 bg-brand-green text-white hover:bg-brand-green font-extrabold">{recommendation ? "Recomendado" : "Primeiro desafio"}</Badge>
                  <h2 className="mt-4 max-w-lg font-display text-2xl font-black leading-tight">{recommendation ? `${recommendation.activity}: ${recommendation.topic}` : "Começa por uma escolha financeira"}</h2>
                  <p className="mt-2 max-w-md text-sm leading-5 text-white/60 font-semibold">{recommendation?.reason ?? "Responde a uma questão e descobre como funciona o teu progresso."}</p>
                </div>
                <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-white/10 sm:flex"><Target className="h-6 w-6 text-brand-sun" /></div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/quiz"><Button className="btn-duo btn-green h-12 px-6">Começar agora <Play className="ml-2 h-4 w-4 fill-current" /></Button></Link>
                <span className="text-xs font-bold text-white/45">{recommendation ? `${recommendation.quantity} questões sugeridas` : "Sessão inicial"}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-2 border-ink/5 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display text-lg font-extrabold">Resumo da semana</CardTitle>
                <Trophy className="h-5 w-5 text-brand-sun" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <span className="text-sm text-muted-foreground font-bold">XP conquistado</span>
                <span className="font-display text-3xl font-black">{totalXp}</span>
              </div>
              <div className="mt-3 progress-bar-duo"><div className="progress-bar-duo-fill" style={{ width: `${overallProgress}%` }} /></div>
              <div className="mt-2 flex justify-between text-xs font-extrabold text-muted-foreground">
                <span>{completedLessons} de {totalLessons} atividades</span>
                <span>{overallProgress}%</span>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { label: "Nível 1", val: progressByLevel["nivel-1"] ?? 0, color: "bg-brand-green" },
                  { label: "Nível 2", val: progressByLevel["nivel-2"] ?? 0, color: "bg-brand-blue" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground font-bold">{item.label}</span>
                    <span className="font-extrabold">{item.val}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* RECOMENDADO */}
        {user && recommendation && (
          <section className="mt-8">
            <Card className="rounded-2xl border-0 bg-brand-green text-white shadow-lg shadow-brand-green/15">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-white/70 font-extrabold text-xs uppercase tracking-[.1em]">Recomendado para você</p>
                  <h2 className="mt-1 font-display text-xl font-black">Hoje: {recommendation.activity.toLowerCase()} {recommendation.topic}</h2>
                  <p className="mt-1 text-sm text-white/75 font-semibold">{recommendation.reason} Sessão: {recommendation.quantity} questões. {dueReviews?.length ? `${dueReviews.length} revisão(ões) pendente(s).` : "Revisões serão agendadas automaticamente."}</p>
                </div>
                <Link href="/quiz"><Button className="btn-duo bg-white text-brand-green hover:bg-white/90 h-12 px-6 shadow-none font-extrabold">Começar <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              </CardContent>
            </Card>
          </section>
        )}

        {/* MODOS */}
        <section className="mt-10">
          <p className="eyebrow">Modos de estudo</p>
          <h2 className="section-title text-2xl mt-1">Escolhe como estudar</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { href: "/quiz?mode=learn", icon: BookOpen, title: "Aprender", desc: "Microexplicação antes da questão.", color: "text-brand-green", bg: "bg-brand-green/10" },
              { href: "/quiz?mode=practice", icon: Target, title: "Praticar", desc: "Questões focadas num tema.", color: "text-brand-coral", bg: "bg-brand-coral/10" },
              { href: "/quiz?mode=errors", icon: RotateCcw, title: "Meus erros", desc: "Reforço das lacunas recentes.", color: "text-brand-sun", bg: "bg-brand-sun/20" },
              { href: "/quiz?mode=rapid", icon: Flame, title: "Revisão rápida", desc: "5 questões rápidas.", color: "text-brand-blue", bg: "bg-brand-blue/10" },
            ].map(({ href, icon: Icon, title, desc, color, bg }) => (
              <Link key={href} href={href} className="rounded-2xl bg-white p-4 shadow-sm border-2 border-ink/5 transition hover:-translate-y-0.5 hover:shadow-md hover:border-brand-green/30">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${bg}`}><Icon className={`h-4 w-4 ${color}`} /></div>
                <p className="mt-3 text-sm font-extrabold">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground font-semibold">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* PERFORMANCE POR TEMA */}
        {user && topicPerformance && topicPerformance.length > 0 && (
          <section className="mt-10">
            <p className="eyebrow">Performance por tema</p>
            <h2 className="section-title text-2xl mt-1">Onde estás a avançar</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topicPerformance.map((item) => (
                <div key={item.topic} className="rounded-2xl bg-white p-4 shadow-sm border-2 border-ink/5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-extrabold">{item.topic}</p>
                    <span className="text-sm font-extrabold text-brand-green">{item.percentage}%</span>
                  </div>
                  <Progress value={item.percentage} className="mt-2 h-2.5 bg-ink/10" />
                  <p className="mt-1.5 text-xs text-muted-foreground font-bold">{item.completedLessons} de {item.totalLessons} · {item.xp} XP</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TRILHAS */}
        <section className="mt-10" id="trilhas">
          <p className="eyebrow">Escolhe o teu nível</p>
          <h2 className="section-title text-2xl mt-1">As tuas trilhas</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {tracks.map((track) => {
              const liveProgress = progressByLevel[track.levelKey] ?? track.progress;
              return (
                <Card key={track.level} className="rounded-2xl border-2 border-ink/5 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg hover:border-brand-green/30">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className={`rounded-full font-extrabold ${track.color === "green" ? "border-brand-green text-brand-green" : "border-brand-blue text-brand-blue"}`}>{track.level}</Badge>
                        <h3 className="mt-3 font-display text-xl font-extrabold">{track.years}</h3>
                      </div>
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${track.color === "green" ? "bg-brand-green/10 text-brand-green" : "bg-brand-blue/10 text-brand-blue"}`}>
                        <GraduationCap className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-5 text-muted-foreground font-semibold">{track.description}</p>
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-muted-foreground font-bold">Progresso</span>
                      <span className="font-extrabold">{liveProgress}%</span>
                    </div>
                    <Progress value={liveProgress} className="mt-1.5 h-2.5 bg-ink/10" />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {track.topics.map((topic) => (
                        <span key={topic} className="rounded-full bg-background px-3 py-1 text-xs font-bold text-muted-foreground">{topic}</span>
                      ))}
                    </div>
                    <Link href="/quiz"><Button className="btn-duo btn-dark mt-4 w-full h-12">Continuar trilha <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CONQUISTAS + BIBLIOTECA */}
        <section className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <Card className="rounded-2xl border-2 border-ink/5 bg-brand-sun/20 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-display text-lg font-extrabold">
                <Trophy className="h-5 w-5 text-brand-sun" /> Conquistas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {achievements.map(({ icon: Icon, title, detail, color }) => (
                <div key={title} className="flex items-center gap-3 rounded-xl bg-white/70 p-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}><Icon className="h-4 w-4" /></div>
                  <div className="flex-1">
                    <p className="text-sm font-extrabold">{title}</p>
                    <p className="text-xs text-muted-foreground font-bold">{detail}</p>
                  </div>
                  <Check className="h-4 w-4 text-brand-green" />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card id="biblioteca" className="rounded-2xl border-2 border-ink/5 bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 font-display text-lg font-extrabold">
                <Library className="h-5 w-5 text-brand-blue" /> Biblioteca OLITEF
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-3">
                <a href="https://www.olitef.com.br/baixar-provas-anteriores" target="_blank" rel="noreferrer" className="rounded-xl bg-background p-3 transition hover:bg-brand-green/10 border-2 border-ink/5 hover:border-brand-green/30">
                  <BookOpen className="h-4 w-4 text-brand-green" />
                  <p className="mt-2 text-sm font-extrabold">Provas</p>
                  <p className="text-xs text-muted-foreground font-bold">2024 e 2025</p>
                </a>
                <a href="https://www.olitef.com.br/baixar-provas-anteriores" target="_blank" rel="noreferrer" className="rounded-xl bg-background p-3 transition hover:bg-brand-sun/15 border-2 border-ink/5 hover:border-brand-sun/50">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <p className="mt-2 text-sm font-extrabold">Simulados</p>
                  <p className="text-xs text-muted-foreground font-bold">Prática guiada</p>
                </a>
                <a href="https://www.olitef.com.br/baixar-provas-anteriores" target="_blank" rel="noreferrer" className="rounded-xl bg-background p-3 transition hover:bg-brand-blue/10 border-2 border-ink/5 hover:border-brand-blue/30">
                  <Library className="h-4 w-4 text-brand-blue" />
                  <p className="mt-2 text-sm font-extrabold">Caderno</p>
                  <p className="text-xs text-muted-foreground font-bold">Material 2026</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
