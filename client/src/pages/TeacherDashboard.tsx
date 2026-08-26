import { useState } from "react";
import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft, BarChart3, BookOpen, CheckCircle2, FileUp, FolderOpen,
  GraduationCap, KeyRound, LockKeyhole, Plus, ShieldCheck, Sparkles, Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const fallbackClasses = [
  { name: "Turma 6.º A", level: "Nível 1", students: 28, progress: 72, active: "12 hoje" },
  { name: "Turma 7.º B", level: "Nível 1", students: 24, progress: 58, active: "9 hoje" },
  { name: "Turma 8.º A", level: "Nível 2", students: 26, progress: 46, active: "14 hoje" },
];

export default function TeacherDashboard() {
  const { user } = useAuth();
  const isTeacher = user?.role === "admin" || user?.profileType === "teacher";
  const { data: liveClasses } = trpc.teacher.classes.useQuery(undefined, { enabled: isTeacher });
  const { data: roster } = trpc.teacher.roster.useQuery(undefined, { enabled: isTeacher });
  const { data: insights } = trpc.teacher.insights.useQuery(undefined, { enabled: isTeacher });
  const createClass = trpc.teacher.createClass.useMutation();
  const uploadPdf = trpc.teacher.uploadPdf.useMutation();

  const rosterByClass = new Map<number, { students: number; progress: number }>();
  (roster ?? []).forEach((s) => {
    const c = rosterByClass.get(s.classId) ?? { students: 0, progress: 0 };
    c.students += 1;
    c.progress += s.totalLessons ? Math.round((Number(s.completedLessons) / Number(s.totalLessons)) * 100) : 0;
    rosterByClass.set(s.classId, c);
  });

  const displayedClasses = liveClasses?.length ? liveClasses.map((item) => {
    const s = rosterByClass.get(item.id) ?? { students: 0, progress: 0 };
    return { name: item.name, level: item.level === "nivel-1" ? "Nível 1" : "Nível 2", students: s.students, progress: s.students ? Math.round(s.progress / s.students) : 0, active: s.students ? "acompanhamento ativo" : "sem alunos" };
  }) : fallbackClasses;

  const totalStudents = new Set((roster ?? []).map((s) => s.studentId)).size;
  const averageProgress = roster?.length ? Math.round(roster.reduce((sum, s) => sum + (Number(s.totalLessons) ? (Number(s.completedLessons) / Number(s.totalLessons)) * 100 : 0), 0) / roster.length) : 0;

  if (!user || !isTeacher) return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header"><div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Início</Link>
        <div className="flex items-center gap-2.5"><div className="brand-mark"><Sparkles className="h-4 w-4" /></div><span className="font-display font-extrabold">olitef<span className="text-brand-green">.estudos</span></span></div>
        <span className="text-sm font-bold text-muted-foreground">Área do professor</span>
      </div></header>
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-16">
        <Card className="max-w-lg rounded-2xl border-2 border-ink/5 bg-white p-4 text-center shadow-xl shadow-ink/10">
          <CardContent className="p-8 sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue"><LockKeyhole className="h-6 w-6" /></div>
            <h1 className="mt-6 font-display text-2xl font-black text-ink">Área reservada a professores</h1>
            <p className="mt-3 leading-6 text-muted-foreground font-semibold text-sm">Entre com a sua conta de professor para gerir turmas e materiais autorizados.</p>
            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={() => startLogin()} className="btn-duo btn-green h-12">Entrar como professor</Button>
              <Link href="/" className="text-sm font-bold text-muted-foreground hover:text-foreground py-2">Voltar à página inicial</Link>
            </div>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-background p-3 text-left text-xs leading-5 text-muted-foreground border-2 border-ink/5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span className="font-semibold">A plataforma não armazena senhas. Materiais privados só são enviados por professores autenticados.</span>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header"><div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Página inicial</Link>
        <div className="flex items-center gap-2.5"><div className="brand-mark"><Sparkles className="h-4 w-4" /></div><span className="font-display font-extrabold">olitef<span className="text-brand-green">.estudos</span></span></div>
        <Badge className="rounded-full bg-brand-green text-white hover:bg-brand-green font-extrabold"><GraduationCap className="mr-1.5 h-3.5 w-3.5" /> Professor</Badge>
      </div></header>
      <main className="container py-8 lg:py-12">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Centro de acompanhamento</p>
            <h1 className="font-display text-4xl font-black tracking-[-0.04em] text-ink sm:text-5xl">A tua turma,<br /><span className="highlight-green">mais perto.</span></h1>
            <p className="mt-3 max-w-lg leading-6 text-muted-foreground font-semibold">Acompanha o que está a resultar e encontra o próximo conceito para ensinar.</p>
          </div>
          <Button onClick={() => createClass.mutate({ name: `Nova turma ${new Date().getFullYear()}`, level: "nivel-1" })} disabled={createClass.isPending} className="btn-duo btn-green h-12 px-6">
            <Plus className="mr-2 h-4 w-4" /> {createClass.isPending ? "Criando..." : "Criar turma"}
          </Button>
        </div>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Users, label: "Alunos ativos", value: totalStudents, color: "bg-brand-green/10 text-brand-green" },
            { icon: BarChart3, label: "Progresso médio", value: `${averageProgress}%`, color: "bg-brand-blue/10 text-brand-blue" },
            { icon: BookOpen, label: "Materiais", value: insights?.length ?? 0, color: "bg-brand-sun/20 text-amber-700" },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label} className="rounded-2xl border-2 border-ink/5 bg-white shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}><Icon className="h-4 w-4" /></div>
                  <span className="text-sm text-muted-foreground font-bold">{label}</span>
                </div>
                <p className="mt-3 font-display text-3xl font-black">{value}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div><p className="eyebrow">Turmas</p><h2 className="section-title text-2xl mt-1">As tuas turmas</h2></div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {displayedClasses.map((cls) => (
              <Card key={cls.name} className="rounded-2xl border-2 border-ink/5 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:border-brand-green/30">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className={`rounded-full font-extrabold text-xs ${cls.level === "Nível 1" ? "border-brand-green text-brand-green" : "border-brand-blue text-brand-blue"}`}>{cls.level}</Badge>
                    <span className="text-xs text-muted-foreground font-bold">{cls.active}</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-extrabold">{cls.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground font-semibold">{cls.students} alunos</p>
                  <Progress value={cls.progress} className="mt-3 h-2.5 bg-ink/10" />
                  <div className="mt-2 flex justify-between text-xs font-extrabold text-muted-foreground">
                    <span>Progresso</span><span>{cls.progress}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-brand-sun/20 border-2 border-brand-sun/30 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-sun text-ink"><KeyRound className="h-5 w-5" /></div>
            <div>
              <h3 className="font-display text-lg font-extrabold">Como os alunos entram</h3>
              <p className="mt-1 text-sm leading-5 text-muted-foreground font-semibold">Quando criar uma turma, um código de acesso (ex: OLI-XXXXXX) é gerado. Os alunos usam este código na plataforma para se juntarem à turma.</p>
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 border-2 border-ink/5">
                <KeyRound className="h-4 w-4 text-brand-green" />
                <span className="font-mono text-sm font-extrabold tracking-wider text-ink">
                  {liveClasses?.[0]?.joinCode ?? "OLI-XXXXXX"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
