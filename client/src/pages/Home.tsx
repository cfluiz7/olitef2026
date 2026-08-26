import { useState } from "react";
import { Link } from "wouter";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight, BookOpen, BrainCircuit, Check, ChevronRight,
  CircleDollarSign, Flame, GraduationCap, Library, LockKeyhole,
  Play, Shield, Sparkles, Target, Trophy, Zap,
} from "lucide-react";

const levels = [
  { label: "Nível 1", years: "6.º e 7.º", title: "Começar bem", progress: 78, color: "green", lessons: "12 aulas", desc: "Receitas, despesas e escolhas conscientes." },
  { label: "Nível 2", years: "8.º e 9.º", title: "Ganhar confiança", progress: 42, color: "blue", lessons: "18 aulas", desc: "Crédito, juros e investimentos básicos." },
];

const topics = [
  { title: "Orçamento", detail: "Escolhas do dia a dia", icon: CircleDollarSign, color: "bg-brand-sun/25 text-amber-700" },
  { title: "Poupança", detail: "Planear para conquistar", icon: Target, color: "bg-brand-green/15 text-brand-green" },
  { title: "Investimentos", detail: "Risco, prazo e objetivos", icon: BrainCircuit, color: "bg-brand-blue/15 text-brand-blue" },
];

const quizQuestions = [
  { question: "Qual é o primeiro passo para organizar a vida financeira?", options: ["Comprar mais", "Conhecer receitas e despesas", "Investir tudo", "Evitar conversar sobre dinheiro"], answer: 1, explanation: "Registar receitas e despesas ajuda a perceber para onde o dinheiro está a ir e permite tomar decisões melhores." },
  { question: "Para que serve uma reserva de emergência?", options: ["Para compras por impulso", "Para pagar juros", "Para lidar com imprevistos", "Para gastar no fim do mês"], answer: 2, explanation: "A reserva de emergência protege os objetivos quando aparece uma despesa inesperada." },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="brand-mark"><Sparkles className="h-5 w-5" /></div>
      <div className="leading-tight">
        <div className="font-display text-lg font-extrabold tracking-tight text-ink">olitef<span className="text-brand-green">.estudos</span></div>
        <div className="text-[9px] font-bold uppercase tracking-[.15em] text-muted-foreground">Escola Aniceto Teixeira</div>
      </div>
    </div>
  );
}

export default function Home() {
  const { loading, user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const question = quizQuestions[questionIndex];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    setQuestionIndex((i) => (i + 1) % quizQuestions.length);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="site-header">
        <div className="container flex h-16 items-center justify-between gap-6">
          <BrandMark />
          <nav className="hidden items-center gap-6 text-sm font-bold text-muted-foreground md:flex" aria-label="Navegação principal">
            <a href="#trilhas" className="hover:text-foreground transition-colors">Trilhas</a>
            <a href="#desafio" className="hover:text-foreground transition-colors">Desafio</a>
            <a href="#conteudo" className="hover:text-foreground transition-colors">Conteúdo</a>
            <a href="#biblioteca" className="hover:text-foreground transition-colors">Biblioteca</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/professor" className="hidden rounded-xl px-3 py-2 text-sm font-bold text-muted-foreground transition hover:bg-muted sm:inline-flex">Professor</Link>
            {user ? (
              <Link href="/aluno"><Button className="btn-duo btn-green rounded-xl px-5">Entrar</Button></Link>
            ) : (
              <Button onClick={() => startLogin()} className="btn-duo btn-green rounded-xl px-5">Começar</Button>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="container relative grid gap-10 pb-16 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-24 lg:pt-16">
          <div className="relative z-10 max-w-2xl">
            <Badge className="mb-5 rounded-full border-brand-green/20 bg-brand-green/10 px-4 py-1.5 text-brand-green font-bold hover:bg-brand-green/10">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" /> Preparação OLITEF
            </Badge>
            <h1 className="font-display text-5xl font-black leading-[0.97] tracking-[-0.04em] text-ink sm:text-6xl">
              Educação financeira <span className="highlight-green">pode ser leve.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-7 text-muted-foreground font-semibold">
              Prepare-se para a OLITEF da <strong className="text-ink">Escola Aniceto Teixeira</strong> com quizzes, trilhas e conteúdos para os Níveis 1 e 2.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/aluno">
                <Button className="btn-duo btn-green h-14 px-8 text-base w-full sm:w-auto">
                  Começar a estudar <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#conteudo">
                <Button variant="outline" className="btn-duo h-14 px-8 text-base border-ink/15 bg-white w-full sm:w-auto">
                  Ver conteúdos <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </a>
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground font-semibold">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-green" /> Nível 1 e Nível 2</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-green" /> Feedback imediato</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-green" /> Progresso visível</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="rounded-[2rem] border-2 border-ink/10 bg-white p-5 shadow-xl sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[.15em] text-muted-foreground">Desafio rápido</span>
                <span className="rounded-full bg-brand-sun/25 px-3 py-1 text-xs font-extrabold text-amber-700">+50 XP</span>
              </div>
              <div className="mt-5 rounded-2xl bg-[#f0f7eb] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-extrabold uppercase tracking-[.12em] text-brand-green">Pergunta {questionIndex + 1}</div>
                    <h2 className="mt-2 font-display text-xl font-extrabold text-ink leading-snug">{question.question}</h2>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/15"><Target className="h-5 w-5 text-brand-green" /></div>
                </div>
                <div className="mt-4 space-y-2">
                  {question.options.map((opt, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect = i === question.answer;
                    const showResult = selectedAnswer !== null;
                    return (
                      <button key={opt} onClick={() => handleAnswer(i)}
                        className={`quiz-option text-sm w-full ${showResult && isSelected ? (isCorrect ? "correct" : "wrong") : ""}`}>
                        <span className={`option-letter ${showResult && isCorrect ? "active" : ""}`}>{String.fromCharCode(65 + i)}</span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedAnswer !== null && (
                  <div className={`mt-4 rounded-xl p-3 text-sm font-semibold ${selectedAnswer === question.answer ? "bg-brand-green/15 text-ink" : "bg-brand-coral/10 text-ink"}`}>
                    {selectedAnswer === question.answer ? "✓ Correto! " : "✗ Incorreto. "}{question.explanation}
                  </div>
                )}
                <div className="mt-4 flex gap-3">
                  <Button onClick={nextQuestion} className="btn-duo btn-green flex-1 h-12">
                    {selectedAnswer !== null ? "Próxima" : "Responder"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section className="border-y-2 border-ink/5 bg-white py-4">
          <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center text-sm font-bold text-muted-foreground sm:justify-between">
            <span className="inline-flex items-center gap-2"><GraduationCap className="h-4 w-4 text-brand-green" /> 6.º ao 9.º ano</span>
            <span className="inline-flex items-center gap-2"><Flame className="h-4 w-4 text-brand-coral" /> Sequências motivam</span>
            <span className="inline-flex items-center gap-2"><Trophy className="h-4 w-4 text-brand-sun" /> Conquistas para celebrar</span>
          </div>
        </section>

        {/* TRILHAS */}
        <section id="trilhas" className="container py-16 lg:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className="eyebrow">Os teus níveis</p><h2 className="section-title">Escolhe o teu nível.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground font-semibold">Avança ao teu ritmo. Cada nível consolida um conceito antes do próximo desafio.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {levels.map((lvl, index) => (
              <button key={lvl.label} onClick={() => setSelectedLevel(index)} className="group text-left">
                <Card className={`h-full overflow-hidden rounded-2xl border-2 bg-white transition ${selectedLevel === index ? "border-brand-green shadow-lg shadow-brand-green/10" : "border-ink/10 hover:border-brand-green/40"}`}>
                  <div className={`h-2 ${lvl.color === "green" ? "bg-brand-green" : "bg-brand-blue"}`} />
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="rounded-full border-ink/10 font-extrabold">{lvl.label} · {lvl.years}</Badge>
                      <ChevronRight className="h-5 w-5 text-ink/20 transition group-hover:translate-x-1 group-hover:text-brand-green" />
                    </div>
                    <CardTitle className="font-display text-2xl font-extrabold mt-1">{lvl.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground font-semibold">{lvl.desc}</p>
                    <div className="mt-4 flex justify-between text-sm">
                      <span className="text-muted-foreground font-semibold">{lvl.lessons}</span>
                      <span className="font-extrabold text-brand-green">{lvl.progress}%</span>
                    </div>
                    <Progress value={lvl.progress} className="mt-2 h-2.5 bg-ink/10" />
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </section>

        {/* CONTEÚDO OLITEF */}
        <section id="conteudo" className="bg-white border-y-2 border-ink/5 py-16 lg:py-24">
          <div className="container">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="eyebrow">Conteúdo OLITEF</p><h2 className="section-title">Tudo que precisa saber.</h2></div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground font-semibold">Conteúdos organizados por nível e macrotema, exatamente como na prova OLITEF.</p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Nível 1 */}
              <Card className="rounded-2xl border-2 border-brand-green/20 bg-[#f0f7eb]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white"><Zap className="h-5 w-5" /></div>
                    <div>
                      <CardTitle className="font-display text-xl font-extrabold">Nível 1 — 6.º e 7.º anos</CardTitle>
                      <p className="text-xs font-bold text-muted-foreground mt-0.5">Caderno do Estudante Nível 1</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl bg-white p-4 border border-brand-green/15">
                    <h4 className="font-extrabold text-sm">Finanças pessoais</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Receitas, despesas, orçamento e escolhas do dia a dia.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-brand-green/15">
                    <h4 className="font-extrabold text-sm">Conceitos básicos de economia</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Necessidades, desejos, preços e como as escolhas afetam a vida.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-brand-green/15">
                    <h4 className="font-extrabold text-sm">Poupança e renda fixa</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Guardar hoje para alcançar metas amanhã, com segurança e planeamento.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-brand-green/15">
                    <h4 className="font-extrabold text-sm">Consumo consciente</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Compras por impulso, publicidade e segurança online.</p>
                  </div>
                </CardContent>
              </Card>
              {/* Nível 2 */}
              <Card className="rounded-2xl border-2 border-brand-blue/20 bg-[#edf6ff]">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue text-white"><Shield className="h-5 w-5" /></div>
                    <div>
                      <CardTitle className="font-display text-xl font-extrabold">Nível 2 — 8.º e 9.º anos</CardTitle>
                      <p className="text-xs font-bold text-muted-foreground mt-0.5">Caderno do Estudante Nível 2</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="rounded-xl bg-white p-4 border border-brand-blue/15">
                    <h4 className="font-extrabold text-sm">Finanças pessoais e endividamento</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Crédito consciente, parcelamento, juros e decisões responsáveis.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-brand-blue/15">
                    <h4 className="font-extrabold text-sm">Produtos de renda fixa</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Prazo, liquidez, previsibilidade e objetivos de investimento.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-brand-blue/15">
                    <h4 className="font-extrabold text-sm">Introdução à renda variável</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Risco, retorno e a diferença entre investir e apostar.</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 border border-brand-blue/15">
                    <h4 className="font-extrabold text-sm">Economia e câmbio</h4>
                    <p className="text-xs text-muted-foreground mt-1 font-semibold">Preços, moeda, consumo internacional e variação cambial.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* DESAFIO DIÁRIO */}
        <section id="desafio" className="container py-16 lg:py-24">
          <div className="quiz-panel grid gap-6 overflow-hidden p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
            <div className="relative z-10">
              <p className="text-brand-sun font-extrabold text-xs uppercase tracking-[.15em]">Desafio diário</p>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-white sm:text-4xl">
                Uma pergunta. <span className="text-brand-sun">Uma descoberta.</span>
              </h2>
              <p className="mt-4 max-w-sm leading-6 text-white/60 font-semibold">
                Responde, recebe feedback e mantém a tua sequência. O importante não é acertar sempre — é perceber porquê.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white">
                <Flame className="h-5 w-5 text-brand-sun" />
                <span><strong className="text-white">4 dias</strong> de sequência</span>
              </div>
            </div>
            <div className="relative z-10 rounded-2xl bg-white p-5 text-ink sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-[.12em] text-brand-green">Desafio #07</span>
                <span className="xp-badge">+50 XP</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-extrabold">O dinheiro tem um plano?</h3>
              <p className="mt-3 text-sm leading-5 text-muted-foreground font-semibold">Escolher uma meta torna mais fácil decidir o que fazer com o dinheiro.</p>
              <div className="mt-4 space-y-1.5">
                <div className="progress-bar-duo"><div className="progress-bar-duo-fill" style={{ width: "68%" }} /></div>
                <div className="flex justify-between text-xs font-extrabold text-muted-foreground"><span>Progresso</span><span>68%</span></div>
              </div>
              <Link href="/quiz">
                <Button className="btn-duo btn-green mt-5 w-full h-13">
                  Continuar desafio <Play className="ml-2 h-4 w-4 fill-current" />
                </Button>
              </Link>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="avatar-dot bg-brand-sun">A</div>
                  <div className="avatar-dot bg-brand-green">B</div>
                  <div className="avatar-dot bg-brand-blue">C</div>
                </div>
                <span className="text-xs text-muted-foreground font-semibold">+ 500 estudantes</span>
              </div>
            </div>
          </div>
        </section>

        {/* BIBLIOTECA */}
        <section id="biblioteca" className="border-t-2 border-ink/5 bg-white py-16 lg:py-24">
          <div className="container">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="eyebrow">Biblioteca</p><h2 className="section-title">Fontes que fazem sentido.</h2></div>
              <p className="max-w-md text-sm leading-6 text-muted-foreground font-semibold">Referências públicas da OLITEF, organizadas para encontrares rapidamente provas e materiais.</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <a href="https://www.olitef.com.br/baixar-provas-anteriores" target="_blank" rel="noreferrer" className="library-card">
                <div className="library-icon bg-brand-green/10 text-brand-green"><BookOpen className="h-5 w-5" /></div>
                <div><h3 className="font-display text-lg font-extrabold">Provas anteriores</h3><p className="mt-1 text-sm leading-5 text-muted-foreground font-semibold">Níveis 1 e 2, com gabarito.</p></div>
                <ArrowRight className="ml-auto h-5 w-5 text-ink/25" />
              </a>
              <a href="https://www.olitef.com.br/baixar-provas-anteriores" target="_blank" rel="noreferrer" className="library-card">
                <div className="library-icon bg-brand-sun/25 text-amber-700"><BrainCircuit className="h-5 w-5" /></div>
                <div><h3 className="font-display text-lg font-extrabold">Simulados</h3><p className="mt-1 text-sm leading-5 text-muted-foreground font-semibold">Pratica com perguntas no espírito da competição.</p></div>
                <ArrowRight className="ml-auto h-5 w-5 text-ink/25" />
              </a>
              <a href="https://www.olitef.com.br/baixar-provas-anteriores" target="_blank" rel="noreferrer" className="library-card">
                <div className="library-icon bg-brand-blue/10 text-brand-blue"><Library className="h-5 w-5" /></div>
                <div><h3 className="font-display text-lg font-extrabold">Caderno do estudante</h3><p className="mt-1 text-sm leading-5 text-muted-foreground font-semibold">Material oficial de apoio 2026.</p></div>
                <ArrowRight className="ml-auto h-5 w-5 text-ink/25" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA PROFESSOR */}
        <section className="container py-16 lg:py-24">
          <div className="relative overflow-hidden rounded-2xl bg-brand-sun px-7 py-12 sm:px-12 lg:px-16">
            <div className="relative z-10 max-w-2xl">
              <p className="eyebrow text-ink/50">Para professores</p>
              <h2 className="mt-3 font-display text-3xl font-black leading-tight text-ink sm:text-4xl">Acompanhar também é ensinar.</h2>
              <p className="mt-4 max-w-lg leading-6 text-ink/65 font-semibold">Cria turmas, partilha conteúdos autorizados e vê onde a tua turma pode avançar.</p>
              <Link href="/professor">
                <Button className="btn-duo btn-dark mt-6 px-6">Conhecer a área do professor <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
            <div className="absolute -right-10 -top-14 h-64 w-64 rounded-full border-[22px] border-ink/10" />
            <div className="absolute -bottom-20 right-16 h-56 w-56 rounded-full border-[16px] border-white/30" />
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-ink/5 bg-white">
        <div className="container flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <BrandMark />
          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-3.5 w-3.5" /> Dados protegidos</span>
            <span className="text-ink/15">|</span>
            <span>Escola Aniceto Teixeira · OLITEF 2026</span>
          </div>
        </div>
      </footer>
      {!loading && !user && (
        <div className="fixed bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3 rounded-full border-2 border-ink/10 bg-white/95 px-4 py-3 text-xs font-bold text-ink shadow-xl backdrop-blur">
          <span className="hidden text-muted-foreground sm:inline">Guarda o teu progresso</span>
          <Button onClick={() => startLogin()} size="sm" className="btn-duo btn-green rounded-xl text-xs">Entrar</Button>
        </div>
      )}
    </div>
  );
}
