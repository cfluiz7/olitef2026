// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURAÇÃO CENTRALIZADA — OLITEF 2026
// Altere aqui para ajustar campanha, datas, formulário e ranking
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // ── Identidade ──
  escola: "Escola Aniceto Teixeira",
  olimpiada: "OLITEF 2026",

  // ── Fuso horário ──
  // Área de atuação: Brasil (Ceará). A liberação usa este fuso.
  timezone: "America/Fortaleza",
  useServerTime: false,   // true = busca tempo confiável; false = tempo local (estático)

  // ── Campanha ──
  campanha: {
    inicio: "2026-09-01",   // primeiro dia (YYYY-MM-DD)
    fim: "2026-09-10",      // último dia
    // Horário (HH:mm) em que cada simulado libera no dia correspondente
    horaLiberacao: "06:00",
  },

  // ── Formulário de frequência ──
  formularioFrequencia: "https://docs.google.com/forms/d/e/1FAIpQLSe0-U5fGwJoQlNdW3F1o9WOXY7SeVhbG8HaatWp_0JpbgjGGA/viewform?usp=dialog",

  // ── Questões por simulado ──
  questoesPorSimulado: 15,

  // ── Pontuação ──
  // Escala da nota exibida (0 a 10) e do código de autenticação
  escalaNota: 10,

  // ── Código de autenticação ──
  // Fórmula: {nomeNormalizado}{nota*diaDaAplicacao}ns{numeroSimulado}
  // Ex: Luiz{85*1}ns1  (nota em escala 0-100 dentro dos colchetes multiplicada pelo dia)
};

// ── RANKING ─────────────────────────────────────────────────────────────
// Fonte central de dados. Atualize aqui para alterar o ranking.
// A atualização é MANUAL: informe os novos resultados e edite este array.
const RANKING = {
  atualizadoEm: "2026-09-04T06:00:00",
  atualizacaoManual: true, // true = atualização manual (sem mecanismo automático real)
  lista: [
    { posicao: 1, nome: "Elisa Klivia Giffony Da Mota", pontuacao: 3 },
    { posicao: 1, nome: "Mariana Gomes de Aguiar", pontuacao: 3 },
    { posicao: 1, nome: "Vanessa Cristina Rocha Teixeira", pontuacao: 3 },
    { posicao: 2, nome: "Maria Geiza", pontuacao: 2 },
    { posicao: 2, nome: "Wallison Teixeira dos Santos", pontuacao: 2 },
    { posicao: 3, nome: "Francisco Ariel Teixeira Mota", pontuacao: 1 },
    { posicao: 3, nome: "Hellen Mara", pontuacao: 1 },
  ],
};

// ── CONTExTO por nível (reaproveitado do antigo data.js) ──
// Define quais módulos são visíveis em cada nível.
// IMPORTANTE: os ids abaixo devem corresponder a módulos de nível
// superior em data.js (MODULES[].id). Não inclua ids de lições.
const CONTEUDOS_POR_NIVEL = {
  1: ["gestao", "mat-financeira", "empreendedorismo"],
  2: ["inflacao", "credito", "investimentos", "risco-retorno", "economia"],
};
