export type OlitefLevel = "Nível 1" | "Nível 2";

export const olitefLevels = [
  {
    id: "nivel-1",
    level: "Nível 1" as OlitefLevel,
    years: "6.º e 7.º anos",
    sourceLabel: "Caderno do Estudante Nível 1",
    sourceKind: "Material enviado pelo professor",
    topics: [
      { id: "ma01-mt04", title: "Finanças pessoais", summary: "Receitas, despesas, orçamento e escolhas do dia a dia." },
      { id: "ma01-mt03", title: "Conceitos básicos de economia", summary: "Necessidades, desejos, preços e como as escolhas afetam a vida." },
      { id: "ma02-mt02", title: "Poupança e renda fixa", summary: "Guardar hoje para alcançar metas amanhã, com segurança e planeamento." },
    ],
  },
  {
    id: "nivel-2",
    level: "Nível 2" as OlitefLevel,
    years: "8.º e 9.º anos",
    sourceLabel: "Caderno do Estudante Nível 2",
    sourceKind: "Material enviado pelo professor",
    topics: [
      { id: "ma01-mt04", title: "Finanças pessoais e endividamento", summary: "Crédito consciente, parcelamento, juros e decisões responsáveis." },
      { id: "ma02-mt02", title: "Produtos de renda fixa", summary: "Prazo, liquidez, previsibilidade e objetivos de investimento." },
      { id: "ma03-mt01", title: "Introdução à renda variável", summary: "Risco, retorno e a diferença entre investir e apostar." },
      { id: "ma01-mt03", title: "Economia e câmbio", summary: "Preços, moeda, consumo internacional e variação cambial." },
    ],
  },
] as const;

export const publicOlitefReferences = [
  { title: "Provas anteriores", href: "https://www.olitef.com.br/baixar-provas-anteriores", detail: "Provas e gabaritos de 2024 e 2025." },
  { title: "Simulados", href: "https://www.olitef.com.br/baixar-provas-anteriores", detail: "Simulados públicos organizados por nível." },
  { title: "Caderno do estudante 2026", href: "https://www.olitef.com.br/baixar-provas-anteriores", detail: "Material público de apoio disponibilizado pela OLITEF." },
] as const;
