import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Check, Lightbulb, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";

type Question = { id: number; level: string; topic: string; title: string; prompt: string; options: string[]; answer: number; explanation: string; microLesson?: string; hint?: string; detailedExplanation?: string; alternativeFeedback?: string[]; difficulty?: number; video?: { title: string; id: string } };

const fallbackQuestions: Question[] = [
  { id: 101, level: "nivel-1", topic: "Necessidades e desejos", title: "Escolha com cabeça", prompt: "Qual item é uma necessidade para estudar?", options: ["Um caderno", "Um brinquedo novo", "Uma skin no jogo", "Um lanche extra"], answer: 0, explanation: "O caderno ajuda diretamente nos estudos. Os outros itens são desejos." },
  { id: 102, level: "nivel-1", topic: "Receitas e despesas", title: "O dinheiro em movimento", prompt: "Se entram R$ 30 e você gasta R$ 12, qual é o saldo?", options: ["R$ 18", "R$ 42", "R$ 12", "R$ 30"], answer: 0, explanation: "Saldo é o que sobra: R$ 30 − R$ 12 = R$ 18." },
  { id: 103, level: "nivel-1", topic: "Orçamento", title: "Faça o mapa", prompt: "Qual é a melhor ordem para organizar um orçamento?", options: ["Comprar e depois contar", "Anotar entradas, listar saídas e comparar", "Gastar tudo e pedir mais", "Escolher só pela promoção"], answer: 1, explanation: "Anote receitas, liste despesas e compare antes de decidir." },
  { id: 104, level: "nivel-1", topic: "Poupança", title: "Meta em passos", prompt: "Para juntar R$ 60 em 6 semanas, quanto guardar por semana?", options: ["R$ 6", "R$ 8", "R$ 10", "R$ 12"], answer: 2, explanation: "R$ 60 ÷ 6 = R$ 10 por semana." },
  { id: 105, level: "nivel-1", topic: "Consumo consciente", title: "Pare e pense", prompt: "O que fazer antes de uma compra por impulso?", options: ["Comprar imediatamente", "Pedir a senha de alguém", "Esperar, comparar e perguntar se precisa", "Escolher o pacote maior sempre"], answer: 2, explanation: "Pausar, comparar e avaliar a necessidade melhora a decisão." },
];

export default function QuizExperience() {
  const { user } = useAuth();

  const recordAttempt = trpc.student.recordAttempt.useMutation();
  const { data: nivel1Questions } = trpc.lessons.questions.useQuery({ level: "nivel-1" });
  const { data: nivel2Questions } = trpc.lessons.questions.useQuery({ level: "nivel-2" });
  const { data: persistedErrors } = trpc.student.errors.useQuery(undefined, { enabled: Boolean(user) });
  const { data: recommendation } = trpc.student.recommendation.useQuery(undefined, { enabled: Boolean(user) });

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode") ?? "smart";
  const requestedLevel = params.get("level") as "nivel-1" | "nivel-2" | null;
  const examMode = mode === "exam";

  const [selectedLevel, setSelectedLevel] = useState<"nivel-1" | "nivel-2">(requestedLevel ?? "nivel-1");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongIds, setWrongIds] = useState<number[]>([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [responses, setResponses] = useState<Array<{ questionId: number; selectedIndex: number; isCorrect: boolean }>>([]);

  const allRemote = useMemo(() => [...(nivel1Questions ?? []), ...(nivel2Questions ?? [])], [nivel1Questions, nivel2Questions]);
  const baseQuestions = allRemote.length ? allRemote : fallbackQuestions;

  const activeQuestions = useMemo(() => {
    let qs = reviewMode || mode === "errors"
      ? baseQuestions.filter((q) => wrongIds.includes(q.id) || (persistedErrors ?? []).some((e) => e.questionId === q.id))
      : baseQuestions.filter((q) => q.level === selectedLevel);
    if (mode === "practice" && recommendation?.topic) qs = qs.filter((q) => q.topic === recommendation.topic);
    if (!qs.length) qs = baseQuestions.filter((q) => q.level === selectedLevel);
    if (mode === "rapid") qs = qs.slice(0, 5);
    if (mode === "smart") qs.sort((a, b) => (a.difficulty ?? 3) - (b.difficulty ?? 3));
    return qs;
  }, [baseQuestions, persistedErrors, recommendation, reviewMode, wrongIds, mode, selectedLevel]);

  const question = activeQuestions[index];
  const progress = activeQuestions.length ? Math.round(((index + (selected !== null ? 1 : 0)) / activeQuestions.length) * 100) : 0;
  const answered = selected !== null;
  const correct = question ? selected === question.answer : false;

  const choose = (option: number) => {
    if (answered || !question || (mode === "learn" && !showExplanation)) return;
    setSelected(option);
    setResponses((r) => [...r, { questionId: question.id, selectedIndex: option, isCorrect: option === question.answer }]);
    if (option === question.answer) setScore((s) => s + 1);
    else setWrongIds((ids) => ids.includes(question.id) ? ids : [...ids, question.id]);
    if (user) recordAttempt.mutate({ questionId: question.id, selectedIndex: option, isCorrect: option === question.answer, xpEarned: option === question.answer ? 10 : 2, level: selectedLevel, topic: question.topic });
  };

  const next = () => { setIndex((i) => i + 1); setSelected(null); setShowHint(false); setShowExplanation(false); };
  const restart = () => { setIndex(0); setSelected(null); setScore(0); setWrongIds([]); setResponses([]); setReviewMode(false); setShowHint(false); setShowExplanation(false); };

  if (activeQuestions.length === 0) return (
    <div className="min-h-screen bg-background text-ink">
      <header className="site-header"><div className="container flex h-16 items-center justify-between">
        <Link href="/aluno" className="flex items-center gap-2 font-bold text-muted-foreground text-sm"><ArrowLeft className="h-4 w-4" /> Painel</Link>
        <div className="font-display text-lg font-extrabold">olitef<span className="text-brand-green">.estudos</span></div>
      </div></header>
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-10">
        <section className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm border-2 border-ink/5 sm:p-12">
          <p className="eyebrow text-brand-green">Tudo em dia</p>
          <h1 className="mt-3 font-display text-3xl font-black">Nenhuma questão disponível.</h1>
          <p className="mt-3 leading-6 text-muted-foreground font-semibold">Tente novamente mais tarde ou escolha outro nível.</p>
          <Link href="/aluno"><Button className="btn-duo btn-green mt-6">Voltar ao painel</Button></Link>
        </section>
      </main>
    </div>
  );

  if (index >= activeQuestions.length) return (
    <div className="min-h-screen bg-ink text-white">
      <header className="border-b border-white/10 bg-ink/90 backdrop-blur"><div className="container flex h-16 items-center justify-between">
        <Link href="/aluno" className="flex items-center gap-2 font-bold text-white/60 text-sm"><ArrowLeft className="h-4 w-4" /> Voltar</Link>
        <div className="font-display text-lg font-extrabold">olitef<span className="text-brand-green">.estudos</span></div>
      </div></header>
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-10">
        <section className="w-full max-w-2xl rounded-2xl bg-white/10 p-8 backdrop-blur-sm sm:p-12 text-center">
          <p className="text-brand-sun font-extrabold text-xs uppercase tracking-[.15em]">Missão concluída</p>
          <h1 className="mt-3 font-display text-4xl font-black sm:text-5xl">
            {score === activeQuestions.length ? "Perfeito! 🎯" : score >= activeQuestions.length / 2 ? "Muito bem!" : "Continue tentando!"}
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-lg leading-7 text-white/70 font-semibold">
            {reviewMode ? `Nesta revisão, acertou ${score} de ${activeQuestions.length}.` : `Acertou ${score} de ${activeQuestions.length}.`}
            {" "}XP ganho: <strong className="text-brand-sun">{score * 10}</strong>
          </p>
          {examMode && (
            <div className="mt-6 space-y-2 text-left max-w-lg mx-auto">
              {responses.map((r, i) => {
                const q = baseQuestions.find((entry) => entry.id === r.questionId);
                return (
                  <div key={`${r.questionId}-${i}`} className="rounded-xl bg-white/10 p-4">
                    <p className="text-sm font-extrabold">{i + 1}. {q?.prompt}</p>
                    <p className="mt-1 text-sm text-white/70 font-semibold">{r.isCorrect ? "✓ Correta" : `✗ Incorreta · Resposta: ${q?.options[q.answer ?? 0]}`}</p>
                    <p className="mt-1 text-xs text-white/50 font-semibold">{q?.explanation}</p>
                  </div>
                );
              })}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button onClick={restart} className="btn-duo btn-green h-12 px-6"><RotateCcw className="mr-2 h-4 w-4" /> Repetir</Button>
            <Link href="/aluno"><Button variant="outline" className="btn-duo h-12 px-6 border-white/20 text-white hover:bg-white/10">Painel do aluno</Button></Link>
          </div>
        </section>
      </main>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="site-header">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/aluno" className="flex items-center gap-2 font-bold text-muted-foreground text-sm"><ArrowLeft className="h-4 w-4" /> Painel</Link>
          <div className="flex items-center gap-2.5">
            <div className="brand-mark"><Sparkles className="h-4 w-4" /></div>
            <span className="font-display font-extrabold text-ink">olitef<span className="text-brand-green">.estudos</span></span>
          </div>
          <div className="flex items-center gap-3">
            {!requestedLevel && (
              <div className="flex rounded-xl border-2 border-ink/10 overflow-hidden">
                <button onClick={() => { setSelectedLevel("nivel-1"); restart(); }}
                  className={`px-3 py-1.5 text-xs font-extrabold transition ${selectedLevel === "nivel-1" ? "bg-brand-green text-white" : "bg-white text-muted-foreground hover:bg-muted"}`}>Nível 1</button>
                <button onClick={() => { setSelectedLevel("nivel-2"); restart(); }}
                  className={`px-3 py-1.5 text-xs font-extrabold transition ${selectedLevel === "nivel-2" ? "bg-brand-blue text-white" : "bg-white text-muted-foreground hover:bg-muted"}`}>Nível 2</button>
              </div>
            )}
            <Badge variant="outline" className="rounded-full border-ink/10 font-extrabold hidden sm:inline-flex">
              {selectedLevel === "nivel-1" ? "6.º–7.º" : "8.º–9.º"}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl py-6 lg:py-10">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="eyebrow">{mode === "rapid" ? "Revisão rápida" : mode === "learn" ? "Modo aprender" : mode === "practice" ? "Praticar" : mode === "errors" ? "Meus erros" : "Quiz"} · {index + 1} de {activeQuestions.length}</p>
            <h1 className="font-display text-2xl font-black sm:text-3xl">Aprenda. Responda. <span className="highlight-green">Avance.</span></h1>
          </div>
          <div className="text-right">
            <span className="xp-badge">{score * 10} XP</span>
          </div>
        </div>

        <Progress value={progress} className="mb-6 h-3 bg-ink/10" />

        <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
          {/* QUESTION CARD */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border-2 border-ink/5 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <Badge variant="outline" className="rounded-full border-brand-green/20 bg-brand-green/10 text-brand-green font-extrabold text-xs">{question.topic}</Badge>
              {question.difficulty && (
                <span className="rounded-full bg-brand-sun/25 px-2.5 py-1 text-xs font-extrabold text-amber-700">
                  {["Fácil", "Fácil", "Médio", "Difícil", "Muito difícil"][question.difficulty - 1] ?? "Médio"}
                </span>
              )}
            </div>

            {mode === "learn" && !showExplanation && (
              <div className="mt-4 rounded-xl bg-brand-green/5 border border-brand-green/15 p-4">
                <p className="text-sm font-extrabold text-brand-green flex items-center gap-1.5"><Lightbulb className="h-4 w-4" /> Microlição</p>
                <p className="mt-2 text-sm leading-5 text-ink/75 font-semibold">{question.microLesson ?? question.explanation}</p>
              </div>
            )}

            <h2 className="mt-5 font-display text-xl font-black sm:text-2xl leading-snug">{question.prompt}</h2>

            <div className="mt-5 space-y-2.5">
              {question.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === question.answer;
                const showResult = selected !== null;
                return (
                  <button key={opt} onClick={() => choose(i)}
                    className={`quiz-option w-full ${showResult && isSelected ? (isCorrect ? "correct" : "wrong") : ""} ${showResult && isCorrect ? "correct" : ""}`}>
                    <span className={`option-letter ${showResult && isCorrect ? "active" : ""}`}>{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1 text-sm">{opt}</span>
                    {showResult && isSelected && (isCorrect ? <Check className="h-4 w-4 text-brand-green shrink-0" /> : <XCircle className="h-4 w-4 text-brand-coral shrink-0" />)}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className={`mt-5 rounded-xl p-4 text-sm font-semibold ${correct ? "bg-brand-green/10 text-ink" : "bg-brand-coral/10 text-ink"}`}>
                <p className="font-extrabold">{correct ? "✓ Correto!" : "✗ Incorreto"} {correct ? `+10 XP` : "+2 XP"}</p>
                <p className="mt-1.5 text-ink/70 leading-5">{question.explanation}</p>
                {showHint && question.hint && !correct && (
                  <p className="mt-2 text-xs text-brand-blue font-bold">💡 {question.hint}</p>
                )}
              </div>
            )}

            {answered && question.detailedExplanation && (
              <button onClick={() => setShowExplanation(!showExplanation)} className="mt-3 text-xs font-extrabold text-brand-green hover:underline">
                {showExplanation ? "Ocultar explicação detalhada" : "Ver explicação detalhada"}
              </button>
            )}
            {showExplanation && question.detailedExplanation && (
              <div className="mt-2 rounded-xl bg-brand-green/5 border border-brand-green/15 p-4 text-xs leading-5 text-ink/70 font-semibold">
                {question.detailedExplanation}
              </div>
            )}
          </section>

          {/* SIDEBAR */}
          <section className="space-y-4">
            {!answered && !showHint && question.hint && (
              <Button onClick={() => setShowHint(true)} variant="outline" className="btn-duo w-full h-12 border-brand-blue/30 text-brand-blue hover:bg-brand-blue/5">
                <Lightbulb className="mr-2 h-4 w-4" /> Mostrar dica
              </Button>
            )}
            {answered && (
              <Button onClick={next} className="btn-duo btn-green w-full h-13 text-base">
                {index < activeQuestions.length - 1 ? "Próxima questão" : "Ver resultado"}
              </Button>
            )}

            <div className="rounded-2xl bg-white p-5 shadow-sm border-2 border-ink/5">
              <p className="text-xs font-extrabold uppercase tracking-[.1em] text-muted-foreground">Progresso</p>
              <div className="mt-3 space-y-2">
                {activeQuestions.map((q, i) => {
                  const response = responses.find((r) => r.questionId === q.id);
                  const isCurrent = i === index;
                  return (
                    <div key={q.id} className={`flex items-center gap-2.5 rounded-xl p-2.5 text-xs font-bold transition ${isCurrent ? "bg-brand-green/10 text-brand-green" : response ? (response.isCorrect ? "bg-brand-green/5 text-brand-green" : "bg-brand-coral/5 text-brand-coral") : "text-muted-foreground"}`}>
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-ink/5 text-[10px] font-extrabold">{i + 1}</span>
                      <span className="flex-1 truncate">{q.topic}</span>
                      {response && (response.isCorrect ? <Check className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />)}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-brand-sun/15 p-4 text-center">
              <p className="text-xs font-extrabold text-amber-700">Escola Aniceto Teixeira</p>
              <p className="mt-1 text-xs text-muted-foreground font-bold">OLITEF · {selectedLevel === "nivel-1" ? "Nível 1" : "Nível 2"}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
