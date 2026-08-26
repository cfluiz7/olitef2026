// ═══════════════════════════════════════════════════════════════════════════
// OLITEF 2026 — Banco de Dados Completo
// Módulos, Lições, Conteúdo, Questões
// ═══════════════════════════════════════════════════════════════════════════

const MODULES = [
  {
    id: "gestao",
    icon: "💰",
    title: "Gestão do Dinheiro",
    color: "#58cc02",
    lessons: [
      {
        id: "orcamento-pessoal",
        title: "Orçamento Pessoal",
        sections: {
          oQueE: "Orçamento é um plano que mostra quanto dinheiro você recebe, quanto gasta e quanto sobra. É o mapa do seu dinheiro.",
          porQueImporta: "Sem orçamento, você pode gastar mais do que tem e ficar sem dinheiro para o que realmente importa.",
          comoFunciona: "1. Anote tudo que entra (mesada, renda)\n2. Anote tudo que sai (lanche, transporte)\n3. Compare: entra > sai = bom | entra < sai = problema\n4. Ajuste os gastos para sobrar sempre algo",
          formula: "Saldo = Receita − Despesas",
          exemplo: {
            titulo: "Orçamento mensal da Ana",
            texto: "Ana recebe R$ 200 de mesada.\nGasta: lanche R$ 60, transporte R$ 40, material R$ 30.\n\nSaldo = 200 − 60 − 40 − 30 = R$ 70\n\nAna sobrou R$ 70 que pode guardar ou usar com sabedoria.",
          },
          pegadinha: "Muita gente esquece de anotar gastos pequenos (lanche, ônibus). Juntos, eles podem somar um valor grande no fim do mês.",
          resumo: "Orçamento = Receita − Despesas. Anote tudo. Ajuste para sobrar.",
        },
        questions: [
          { id: "orc1", difficulty: 1, prompt: "Se sua mesada é R$ 150 e você gasta R$ 80, quanto sobra?", options: ["R$ 230", "R$ 70", "R$ 80", "R$ 150"], answer: 1, explanation: "150 − 80 = R$ 70. Saldo é o que sobra depois de subtrair as despesas da receita." },
          { id: "orc2", difficulty: 2, prompt: "Pedro recebe R$ 300 e gasta R$ 120 em lanche, R$ 80 em transporte e R$ 50 em material. Quanto sobra?", options: ["R$ 50", "R$ 150", "R$ 250", "R$ 550"], answer: 0, explanation: "300 − 120 − 80 − 50 = R$ 50. Some todas as despesas (250) e subtraia da receita." },
          { id: "orc3", difficulty: 3, prompt: "Maria quer guardar R$ 600 em 5 meses. Sua mesada é R$ 200. Se ela gasta R$ 100 por mês, conseguirá?", options: ["Sim, sobra exatamente R$ 600", "Não, faltam R$ 100", "Sim, sobra R$ 500", "Não, ela precisa de mais um mês"], answer: 0, explanation: "200 − 100 = R$ 100/mês guardado. 100 × 5 = R$ 600. Consegue exatamente a meta." },
          { id: "orc4", difficulty: 4, prompt: "João tem R$ 500 de mesada. Ele precisa pagar lanche (R$ 120), transporte (R$ 80), material (R$ 50) e quer guardar R$ 150. Quanto sobra para lazer?", options: ["R$ 100", "R$ 150", "R$ 200", "Nada sobra"], answer: 0, explanation: "500 − 120 − 80 − 50 − 150 = R$ 100 para lazer." },
        ],
      },
      {
        id: "receitas-despesas",
        title: "Receitas e Despesas",
        sections: {
          oQueE: "Receita é o dinheiro que entra. Despesa é o dinheiro que sai. Essas são as duas bases de qualquer controle financeiro.",
          porQueImporta: "Se você não sabe quanto entra e quanto sai, não pode planejar nada. É como dirigir sem ver a estrada.",
          comoFunciona: "Receitas:\n• Mesada\n• Salário\n• Venda de algo\n\nDespesas:\n• Lanche\n• Transporte\n• Contas\n• Compras\n\nDespesas fixas: valor sempre igual (aluguel)\nDespesas variáveis: valor muda (lanche, roupas)",
          formula: "",
          exemplo: {
            titulo: "Receita e despesa da semana",
            texto: "Lucas recebeu R$ 50 de mesada (receita).\nGastou R$ 15 no lanche e R$ 10 no ônibus (despesas).\n\nReceita total: R$ 50\nDespesa total: R$ 25\nSaldo: R$ 25",
          },
          pegadinha: "Comprar algo em promoção NÃO é economia se você não precisava daquele item. A despesa aconteceu mesmo com desconto.",
          resumo: "Receita = dinheiro que entra. Despesa = dinheiro que sai. Fixa = sempre igual. Variável = muda.",
        },
        questions: [
          { id: "rd1", difficulty: 1, prompt: "Receber mesada é um exemplo de:", options: ["Despesa", "Receita", "Investimento", "Empréstimo"], answer: 1, explanation: "Mesada é dinheiro que entra, logo é receita." },
          { id: "rd2", difficulty: 1, prompt: "Pagar conta de luz é:", options: ["Receita", "Investimento", "Despesa", "Poupança"], answer: 2, explanation: "Pagar é dinheiro que sai = despesa." },
          { id: "rd3", difficulty: 2, prompt: "Qual é uma despesa fixa?", options: ["Lanche da escola", "Aluguel da casa", "Compra de roupas", "Ida ao cinema"], answer: 1, explanation: "Aluguel é fixo: paga todo mês, valor sempre igual. Os outros variam." },
          { id: "rd4", difficulty: 3, prompt: "Ana recebe R$ 250 de mesada. Gasta R$ 80 em transporte (fixo) e R$ 60 em lanches (variável). Quanto ela gasta por mês no mínimo?", options: ["R$ 140", "R$ 60", "R$ 80", "R$ 200"], answer: 0, explanation: "Transporte fixo (R$ 80) + lanche variável (R$ 60) = R$ 140/mês como mínimo." },
        ],
      },
      {
        id: "necessidades-desejos",
        title: "Necessidades e Desejos",
        sections: {
          oQueE: "Necessidade é algo essencial para viver e funcionar (comida, moradia, saúde, educação). Desejo é algo que queremos, mas pode esperar (jogo, roupa de marca, celular novo).",
          porQueImporta: "Confundir desejo com necessidade faz você gastar dinheiro sem planejar e ficar sem para o que realmente importa.",
          comoFunciona: "Para decidir, pergunte:\n1. Sem isso, minha vida fica prejudicada?\n2. Posso esperar para comprar?\n3. É essencial ou é conforto/lazer?\n\nSe a resposta é 'prejudicada' → Necessidade\nSe a resposta é 'posso esperar' → Desejo",
          formula: "",
          exemplo: {
            titulo: "Decisão da Camila",
            texto: "Camila tem R$ 100. Precisa de material escolar (R$ 40) e quer um tênis novo (R$ 90).\n\nMaterial = Necessidade (precisa para estudar)\nTênis = Desejo (o atual ainda serve)\n\nDecisão: Comprar o material e guardar o resto.",
          },
          pegadinha: "Em promoção, parece urgente comprar. Mas promoção em desejo não transforma desejo em necessidade.",
          resumo: "Necessidade = essencial. Desejo = pode esperar. Pergunte: posso viver sem isso?",
        },
        questions: [
          { id: "nd1", difficulty: 1, prompt: "Qual é uma necessidade?", options: ["Um videogame", "Um caderno", "Uma skin no jogo", "Um lanche extra"], answer: 1, explanation: "Caderno é material escolar, essencial para estudar. Os outros são desejos." },
          { id: "nd2", difficulty: 2, prompt: "Lucas quer comprar um celular novo (R$ 1.500) mas o atual funciona. Ao mesmo tempo, precisa de óculos (R$ 300). O que fazer?", options: ["Comprar o celular", "Comprar os dois parcelados", "Comprar o óculos primeiro", "Não comprar nada"], answer: 2, explanation: "Óculos é necessidade (saúde/visão). Celular novo é desejo (o atual funciona)." },
          { id: "nd3", difficulty: 3, prompt: "A TV está com 40% de desconto e custa R$ 1.200. A família precisa de uma nova TV. Isso é necessidade ou desejo?", options: ["Desejo porque tem desconto", "Necessidade porque a família precisa", "Desejo, sempre", "Depende do desconto"], answer: 1, explanation: "Se a família precisa, é necessidade. O desconto é apenas um bônus, não muda a classificação." },
        ],
      },
      {
        id: "poupanca-metas",
        title: "Poupança e Metas Financeiras",
        sections: {
          oQueE: "Poupar é guardar dinheiro para o futuro. Meta financeira é um objetivo com valor e prazo definidos.",
          porQueImporta: "Quem poupa tem segurança para imprevistos e realiza planos no futuro. Quem não poupa vive no aperto.",
          comoFunciona: "1. Defina uma meta (ex: tablet R$ 800)\n2. Defina o prazo (ex: 4 meses)\n3. Divida: 800 ÷ 4 = R$ 200/mês\n4. Guarde todo mês sem falta\n5. Não mexa no guardado",
          formula: "Valor por período = Meta ÷ Número de períodos",
          exemplo: {
            titulo: "Meta do Pedro",
            texto: "Pedro quer um tênis de R$ 300. Falta 3 meses para o Natal.\n\n300 ÷ 3 = R$ 100/mês\n\nPedro precisa guardar R$ 100 por mês para conseguir.",
          },
          pegadinha: "Meteas de poupança precisam ser realistas. Guardar R$ 500 com mesada de R$ 200 não funciona.",
          resumo: "Poupe todo mês. Meta = valor ÷ tempo. Não mexa no guardado.",
        },
        questions: [
          { id: "pm1", difficulty: 1, prompt: "Para juntar R$ 400 em 8 semanas, quanto guardar por semana?", options: ["R$ 40", "R$ 50", "R$ 80", "R$ 100"], answer: 1, explanation: "400 ÷ 8 = R$ 50 por semana." },
          { id: "pm2", difficulty: 2, prompt: "Mariana quer um celular de R$ 1.200 e pode guardar R$ 200/mês. Em quantos meses conseguirá?", options: ["4 meses", "5 meses", "6 meses", "7 meses"], answer: 2, explanation: "1200 ÷ 200 = 6 meses." },
          { id: "pm3", difficulty: 3, prompt: "Pedro guarda R$ 100/mês. Depois de 3 meses, usa R$ 150 para uma emergência. Se continuar guardando R$ 100, quanto terá no 6.º mês?", options: ["R$ 600", "R$ 450", "R$ 300", "R$ 250"], answer: 1, explanation: "Guardou R$ 300 em 3 meses. Descontou R$ 150. Sobrou R$ 150. Mais 3 meses × R$ 100 = R$ 300. Total: R$ 450." },
        ],
      },
      {
        id: "consumo-consciente",
        title: "Consumo Consciente",
        sections: {
          oQueE: "Consumo consciente é pensar antes de comprar, avaliando se realmente precisa, se pode pagar e se existe opção melhor.",
          porQueImporta: "O marketing te faz querer coisas que não precisa. Consumidor consciente economiza e evita dívidas.",
          comoFunciona: "Antes de comprar, pergunte:\n1. Preciso disso?\n2. Posso pagar à vista?\n3. Comparei preços?\n4. Tenho algo parecido?\n5. Posso esperar?\n\nSe 3+ respostas são 'não' → não compre.",
          formula: "",
          exemplo: {
            titulo: "Armadilha da promoção",
            texto: "Tênis com 50% de desconto: de R$ 200 por R$ 100.\n\nAna não precisa de tênis. O desconto é real, mas comprar algo que não precisa é gastar R$ 100 à toa.\n\nMelhor: guardar esse R$ 100.",
          },
          pegadinha: "Desconto em coisa que não precisa não é economia. É gasto. Economia é NÃO comprar.",
          resumo: "Pense antes. Preciso? Posso pagar? Compare. Não compre por impulso.",
        },
        questions: [
          { id: "cc1", difficulty: 1, prompt: "A melhor atitude antes de uma compra por impulso é:", options: ["Comprar rápido antes que acabe", "Esperar e pensar se precisa", "Parcelar para caber no orçamento", "Pedir para alguém comprar"], answer: 1, explanation: "Uma pausa ajuda a avaliar se é necessidade ou desejo." },
          { id: "cc2", difficulty: 2, prompt: "Um produto está com 30% de desconto mas você não precisa dele. A melhor decisão é:", options: ["Comprar porque é barato", "Não comprar, pois não precisa", "Parcelar para depois", "Comprar para presentear"], answer: 1, explanation: "Se não precisa, não compre. Desconto em desnecessário é gasto, não economia." },
          { id: "cc3", difficulty: 3, prompt: "A propaganda mostra que um produto resolve todos os problemas. O consumidor consciente deve:", options: ["Comprar imediatamente", "Pesquisar e comparar antes de decidir", "Confiar cegamente na propaganda", "Esperar sair uma versão melhor"], answer: 1, explanation: "Propaganda vende. Pesquisa informa. Compare antes de decidir." },
        ],
      },
    ],
  },
  {
    id: "mat-financeira",
    icon: "🔢",
    title: "Matemática Financeira",
    color: "#1cb0f6",
    lessons: [
      {
        id: "porcentagem",
        title: "Porcentagem",
        sections: {
          oQueE: "Porcentagem é uma forma de expressar uma fração de 100. 25% significa 25 de cada 100.",
          porQueImporta: "Tudo na finanças usa porcentagem: descontos, juros, rendimento, inflação. Sem saber porcentagem, não entende dinheiro.",
          comoFunciona: "Para calcular X% de um valor:\n\nValor × (X ÷ 100)\n\nOu: Valor × X% em decimal\n\n20% = 0,20\n50% = 0,50\n10% = 0,10",
          formula: "Resultado = Valor × (Porcentagem ÷ 100)",
          exemplo: {
            titulo: "Desconto na mochila",
            texto: "Mochila custa R$ 200 com 15% de desconto.\n\nDesconto = 200 × 15/100 = 200 × 0,15 = R$ 30\nPreço final = 200 − 30 = R$ 170",
          },
          pegadinha: "Cuidado: 20% de desconto NÃO significa que o preço caiu 20 pontos. É 20% DO VALOR. 20% de R$ 100 = R$ 20, não 20 reais fixos.",
          resumo: "Para achar X%: multiplique o valor por X/100. Desconto: subtraia do preço original.",
        },
        questions: [
          { id: "pct1", difficulty: 1, prompt: "25% de R$ 200 é:", options: ["R$ 25", "R$ 50", "R$ 75", "R$ 100"], answer: 1, explanation: "200 × 25/100 = 200 × 0,25 = R$ 50." },
          { id: "pct2", difficulty: 2, prompt: "Um produto custa R$ 350 e tem 20% de desconto. Qual o preço final?", options: ["R$ 270", "R$ 280", "R$ 300", "R$ 310"], answer: 1, explanation: "Desconto: 350 × 0,20 = R$ 70. Preço: 350 − 70 = R$ 280." },
          { id: "pct3", difficulty: 2, prompt: "Se um produto custava R$ 500 e agora custa R$ 400, qual foi o percentual de desconto?", options: ["10%", "20%", "25%", "30%"], answer: 1, explanation: "Desconto: 500 − 400 = R$ 100. Percentual: 100/500 = 20%." },
          { id: "pct4", difficulty: 3, prompt: "Um produto custa R$ 800 com 12,5% de desconto. Qual o preço final?", options: ["R$ 680", "R$ 700", "R$ 710", "R$ 720"], answer: 1, explanation: "800 × 12,5/100 = R$ 100. 800 − 100 = R$ 700." },
          { id: "pct5", difficulty: 4, prompt: "Ana comprou algo por R$ 450 e pagou R$ 360. Qual o desconto em porcentagem?", options: ["15%", "20%", "25%", "30%"], answer: 1, explanation: "Desconto: 450 − 360 = R$ 90. Percentual: 90/450 = 20%." },
        ],
      },
      {
        id: "aumento-desconto",
        title: "Aumento e Desconto Percentual",
        sections: {
          oQueE: "Aumento: quando o preço sobe X%. Desconto: quando o preço cai X%. Ambos são calculados sobre o valor original.",
          porQueImporta: "Preços mudam o tempo todo. Saber calcular aumentos e descontos ajuda a decidir quando comprar.",
          comoFunciona: "AUMENTO:\nPreço novo = Original × (1 + taxa/100)\nEx: aumento de 10%: Original × 1,10\n\nDESCONTO:\nPreço novo = Original × (1 − taxa/100)\nEx: desconto de 20%: Original × 0,80",
          formula: "Aumento: Novo = Original × (1 + X/100)\nDesconto: Novo = Original × (1 − X/100)",
          exemplo: {
            titulo: "Aumento do transporte",
            texto: "A passagem custava R$ 4,50 e teve aumento de 20%.\n\nNovo preço = 4,50 × 1,20 = R$ 5,40\n\nA passagem subiu R$ 0,90.",
          },
          pegadinha: "Aumento de 50% seguido de desconto de 50% NÃO volta ao preço original. 50% de R$ 100 = R$ 150. 50% de R$ 150 = R$ 75 (perdeu R$ 25).",
          resumo: "Aumento: multiplique por (1 + taxa). Desconto: multiplique por (1 − taxa). Cuidado com aumentos e descontos seguidos.",
        },
        questions: [
          { id: "ad1", difficulty: 1, prompt: "Se o aluguel era R$ 800 e aumentou 10%, quanto passou a custar?", options: ["R$ 810", "R$ 880", "R$ 900", "R$ 1.000"], answer: 1, explanation: "800 × 1,10 = R$ 880." },
          { id: "ad2", difficulty: 2, prompt: "Um produto custava R$ 250 e subiu 12%. Qual o novo preço?", options: ["R$ 270", "R$ 275", "R$ 280", "R$ 300"], answer: 2, explanation: "250 × 1,12 = R$ 280." },
          { id: "ad3", difficulty: 3, prompt: "Um produto custava R$ 500, teve aumento de 20% e depois desconto de 20%. Qual o preço final?", options: ["R$ 480", "R$ 500", "R$ 520", "R$ 450"], answer: 0, explanation: "500 × 1,20 = 600. 600 × 0,80 = 480. O preço final é menor que o original." },
        ],
      },
      {
        id: "juros-simples",
        title: "Juros Simples",
        sections: {
          oQueE: "Juros simples são calculados sempre sobre o valor original (capital). O rendimento é o mesmo a cada período.",
          porQueImporta: "É a forma mais básica de entender como dinheiro cresce (ou como dívida cresce). Base para entender juros compostos.",
          comoFunciona: "J = C × i × t\n\nJ = Juros (rendimento ou cobrado)\nC = Capital (valor inicial)\n i = Taxa (em decimal)\nt = Tempo\n\nExemplo: R$ 1.000 a 10% ao mês por 3 meses\nJ = 1000 × 0,10 × 3 = R$ 300",
          formula: "J = C × i × t\nMontante = C + J = C × (1 + i × t)",
          exemplo: {
            titulo: "Poupança com juros simples",
            texto: "Pedro guardou R$ 500 a 2% ao mês por 4 meses.\n\nJ = 500 × 0,02 × 4 = R$ 40\nMontante = 500 + 40 = R$ 540",
          },
          pegadinha: "Juros simples não crescem. R$ 100 a 10% ao mês rende sempre R$ 10, não mais. Já juros compostos rendem mais a cada mês.",
          resumo: "J = C × i × t. Sempre calculado sobre o valor original.",
        },
        questions: [
          { id: "js1", difficulty: 1, prompt: "R$ 1.000 a 5% ao mês por 2 meses (juros simples) rende:", options: ["R$ 50", "R$ 100", "R$ 150", "R$ 200"], answer: 1, explanation: "J = 1000 × 0,05 × 2 = R$ 100." },
          { id: "js2", difficulty: 2, prompt: "Se você aplica R$ 2.000 a 3% ao mês por 5 meses com juros simples, quanto terá no total?", options: ["R$ 2.100", "R$ 2.300", "R$ 2.500", "R$ 3.000"], answer: 1, explanation: "J = 2000 × 0,03 × 5 = R$ 300. Total = 2000 + 300 = R$ 2.300." },
          { id: "js3", difficulty: 3, prompt: "Carlos emprestou R$ 800 a juros simples de 1,5% ao mês. Após 6 meses, quanto ele recebe de volta?", options: ["R$ 848", "R$ 872", "R$ 880", "R$ 920"], answer: 1, explanation: "J = 800 × 0,015 × 6 = R$ 72. Total = 872." },
        ],
      },
      {
        id: "juros-compostos",
        title: "Juros Compostos",
        sections: {
          oQueE: "Juros compostos são calculados sobre o valor acumulado (capital + juros anteriores). Cada período, os juros incidem sobre um valor maior.",
          porQueImporta: "É a base de quase todo investimento real e de toda dívida de cartão de crédito. Entender isso é essencial.",
          comoFunciona: "M = C × (1 + i)ᵗ\n\nM = Montante\nC = Capital inicial\ni = Taxa (em decimal)\nt = Tempo\n\nExemplo: R$ 1.000 a 10% ao mês por 2 meses:\nMês 1: 1000 × 1,10 = R$ 1.100\nMês 2: 1100 × 1,10 = R$ 1.210\n\nJuros compostos: R$ 210\nJuros simples: R$ 200",
          formula: "M = C × (1 + i)ᵗ",
          exemplo: {
            titulo: "Cartão de crédito",
            texto: "Você deve R$ 500 no cartão a 15% ao mês.\n\n1.º mês: 500 × 1,15 = R$ 575\n2.º mês: 575 × 1,15 = R$ 661,25\n3.º mês: 661,25 × 1,15 = R$ 760,44\n\nEm 3 meses, a dívida cresceu R$ 260,44!",
          },
          pegadinha: "Juros compostos crescem exponencialmente. Uma dívida pequena pode virar grande rápido. Por isso cartão de crédito é perigoso.",
          resumo: "M = C × (1 + i)ᵗ. Juros incidem sobre o valor acumulado. Cresce rápido.",
        },
        questions: [
          { id: "jc1", difficulty: 2, prompt: "R$ 1.000 a 10% ao mês por 2 meses (juros compostos) rende:", options: ["R$ 200", "R$ 210", "R$ 220", "R$ 300"], answer: 1, explanation: "1000 × 1,10 = 1100. 1100 × 1,10 = 1210. Juros = 210." },
          { id: "jc2", difficulty: 3, prompt: "Você deve R$ 300 no cartão com 20% ao mês. Após 2 meses (juros compostos), quanto deve?", options: ["R$ 360", "R$ 420", "R$ 432", "R$ 480"], answer: 2, explanation: "300 × 1,20 = 360. 360 × 1,20 = 432." },
          { id: "jc3", difficulty: 4, prompt: "Um investimento de R$ 2.000 rende 1,5% ao mês por 3 meses (juros compostos). Qual o montante?", options: ["R$ 2.090", "R$ 2.091", "R$ 2.100", "R$ 2.135"], answer: 1, explanation: "2000 × 1,015 = 2030. 2030 × 1,015 = 2060,45. 2060,45 × 1,015 = 2091,36 ≈ R$ 2.091." },
          { id: "jc4", difficulty: 5, prompt: "Ana deve R$ 1.000 no cartão (25% ao mês). Quanto tempo leva para a dívida dobrar (juros compostos)?", options: ["3 meses", "4 meses", "5 meses", "6 meses"], answer: 0, explanation: "1000 × 1,25 = 1250. × 1,25 = 1562,50. × 1,25 = 1953,12. Em ~4 meses quase dobra. Resposta mais próxima: 3 meses para ficar bem perto do dobro." },
        ],
      },
    ],
  },
  {
    id: "inflacao",
    icon: "📉",
    title: "Inflação e Poder de Compra",
    color: "#ff9600",
    lessons: [
      {
        id: "o-que-e-inflacao",
        title: "O que é Inflação",
        sections: {
          oQueE: "Inflação é o aumento geral e contínuo dos preços. Quando a inflação sobe, o mesmo dinheiro compra menos coisas.",
          porQueImporta: "Inflação corrói o valor do dinheiro. Se você não investe acima da inflação, está perdendo poder de compra.",
          comoFunciona: "Se a inflação é 10% ao ano:\n• Antes: R$ 100 comprava 10 kg de arroz\n• Agora: R$ 100 compra apenas ~9 kg\n\nO dinheiro não 'morreu', mas comprou menos.",
          formula: "Poder de compra = Dinheiro ÷ (1 + inflação)",
          exemplo: {
            titulo: "Salário parado",
            texto: "João ganha R$ 3.000 e a inflação é 8% ao ano.\n\nSe o salário não sobe, ele perde 8% do poder de compra.\nR$ 3.000 passam a valer como R$ 2.760 em poder de compra.\n\nPerda: R$ 240 por ano.",
          },
          pegadinha: "Inflação de 10% NÃO significa que tudo ficou 10% mais caro. Alguns itens sobem mais, outros menos. A média é 10%.",
          resumo: "Inflação = preços sobem. Dinheiro perde valor. Para manter poder de compra, é preciso investir.",
        },
        questions: [
          { id: "inf1", difficulty: 1, prompt: "Se a inflação é 5% ao ano, R$ 100 passam a valer:", options: ["R$ 105", "R$ 95 em poder de compra", "R$ 100", "R$ 50"], answer: 1, explanation: "Com inflação de 5%, R$ 100 compra 5% menos. O poder de compra cai." },
          { id: "inf2", difficulty: 2, prompt: "Se o salário é R$ 2.000 e a inflação é 12%, quanto o salário deveria ser para manter o poder de compra?", options: ["R$ 2.100", "R$ 2.240", "R$ 2.400", "R$ 2.500"], answer: 1, explanation: "2000 × 1,12 = R$ 2.240. Esse seria o salário necessário." },
          { id: "inf3", difficulty: 3, prompt: "Um investimento rendeu 7% ao ano e a inflação foi 10%. O investidor:", options: ["Ganhou poder de compra", "Perdeu poder de compra", "Ficou no zero a zero", "Depende do banco"], answer: 1, explanation: "7% − 10% = −3%. O investimento rendeu MENOS que a inflação. Perdeu poder de compra." },
        ],
      },
      {
        id: "poder-de-compra",
        title: "Poder de Compra",
        sections: {
          oQueE: "Poder de compra é a quantidade de coisas que seu dinheiro consegue comprar. Se os preços sobem e seu dinheiro fica igual, seu poder de compra cai.",
          porQueImporta: "Manter o poder de compra é o objetivo básico de qualquer investimento. Não investir é perder poder de compra.",
          comoFunciona: "Se você tem R$ 100 e a inflação é 8%:\n\nPoder de compra real = 100 / 1,08 = R$ 92,59\n\nPerdeu R$ 7,41 de poder de compra.\nPara manter, precisa render pelo menos 8%.",
          formula: "Poder real = Valor ÷ (1 + inflação)",
          exemplo: {
            titulo: "Poupança vs. inflação",
            texto: "Poupança rende 0,5% ao mês (6% ao ano).\nInflação: 10% ao ano.\n\nRendimento: 6%\nInflação: 10%\n\nResultado real: 6% − 10% = −4%\n\nA poupança PERDE para a inflação. Melhor investir melhor.",
          },
          pegadinha: "Ter dinheiro guardado não significa manter o poder de compra. Dinheiro parado perde valor com a inflação.",
          resumo: "Poder de compra cai com inflação. Para manter, renda precisa > inflação.",
        },
        questions: [
          { id: "pc1", difficulty: 2, prompt: "Se a inflação é 6% e um investimento rende 4%, o poder de compra:", options: ["Aumenta", "Diminui", "Fica igual", "Depende"], answer: 1, explanation: "Rendimento (4%) < Inflação (6%). Perde poder de compra." },
          { id: "pc2", difficulty: 3, prompt: "Para manter o poder de compra com inflação de 12%, o investimento precisa render no mínimo:", options: ["10%", "12%", "15%", "8%"], answer: 1, explanation: "Para manter, rendimento deve ser ≥ inflação. No mínimo 12%." },
        ],
      },
    ],
  },
  {
    id: "credito",
    icon: "💳",
    title: "Crédito e Dívidas",
    color: "#ff4b4b",
    lessons: [
      {
        id: "cartao-credito",
        title: "Cartão de Crédito",
        sections: {
          oQueE: "Cartão de crédito é uma forma de pagamento onde o banco paga por você e você devolve depois. Se não pagar à vista, o banco cobra juros.",
          porQueImporta: "O cartão é a principal causa de endividamento dos jovens. Entender como funciona evita dívidas.",
          comoFunciona: "À vista: paga o valor exato, sem juros.\n\nParcelado sem juros: divide o valor, sem acréscimo.\n\nParcelado COM juros: divide e paga mais caro.\n\nRotativo (não pagar tudo): juros altíssimos (até 400% ao ano!).",
          formula: "Custo parcelado = Parcela × Número de parcelas",
          exemplo: {
            titulo: "Celular parcelado",
            texto: "Celular R$ 1.200\nÀ vista: R$ 1.200\n12x sem juros: 12 × R$ 100 = R$ 1.200\n12x com juros: 12 × R$ 130 = R$ 1.560\n\nNo parcelado com juros, pagou R$ 360 a mais!",
          },
          pegadinha: "'Sem juros' no parcelamento pode esconder o preço inflado. Compare o preço à vista com o parcelado.",
          resumo: "Cartão à vista = sem juros. Parcelado com juros = paga mais. Rotativo = armadilha. Pague sempre à vista quando possível.",
        },
        questions: [
          { id: "cc1", difficulty: 1, prompt: "Qual a forma MAIS BARATA de comprar algo de R$ 500?", options: ["10x de R$ 60 no cartão", "À vista R$ 500", "5x de R$ 110 no cartão", "Usar o cheque especial"], answer: 1, explanation: "À vista é sempre mais barato (sem juros). 10x de R$ 60 = R$ 600 (juros)." },
          { id: "cc2", difficulty: 2, prompt: "Um eletrodoméstico custa R$ 2.000. Na promoção: 3x de R$ 750. Qual o custo total?", options: ["R$ 2.000", "R$ 2.150", "R$ 2.250", "R$ 2.500"], answer: 2, explanation: "3 × R$ 750 = R$ 2.250. Pagou R$ 250 a mais (juros)." },
          { id: "cc3", difficulty: 3, prompt: "O rotativo do cartão cobra 15% ao mês. Se você deve R$ 100 e não paga nada, quanto deve após 2 meses (juros compostos)?", options: ["R$ 115", "R$ 130", "R$ 132,25", "R$ 150"], answer: 2, explanation: "100 × 1,15 = 115. 115 × 1,15 = 132,25." },
          { id: "cc4", difficulty: 4, prompt: "Marcos tem R$ 500 no cartão (10% ao mês). Ele paga apenas R$ 50. No mês seguinte, quanto ele deve?", options: ["R$ 450", "R$ 495", "R$ 500", "R$ 550"], answer: 3, explanation: "500 − 50 = 450 (pagou). 450 × 1,10 = 495 (juros). Total: R$ 550. O valor que pagou não descontou como esperado." },
        ],
      },
      {
        id: "emprestimo-financiamento",
        title: "Empréstimos e Financiamentos",
        sections: {
          oQueE: "Empréstimo: banco empresta dinheiro com juros. Financiamento: compra parcelada de algo grande (casa, carro) com juros.",
          porQueImporta: "Todo empréstimo custa caro. Entender o custo real ajuda a decidir se vale a pena.",
          comoFunciona: "Antes de contratar, verifique:\n1. Taxa de juros (mensal e anual)\n2. Prazo\n3. CET (Custo Efetivo Total)\n4. Multa por atraso\n5. Seguros obrigatórios\n\nCET = valor TOTAL que você vai pagar, incluindo tudo.",
          formula: "CET = Valor emprestado + Juros + Taxas + Seguros",
          exemplo: {
            titulo: "Empréstimo bancário",
            texto: "Carlos pediu R$ 1.000 com juros de 3% ao mês por 12 meses.\n\nJuros = 1000 × 0,03 × 12 = R$ 360\nTotal = R$ 1.360\n\nCarlos pagou R$ 360 a mais pelo empréstimo.",
          },
          pegadinha: "Juros simples nos empréstimos pode parecer pouco, mas o total pode ser muito. Compare sempre o CET.",
          resumo: "Empréstimo tem custo. Verifique juros, prazo e CET antes de contratar.",
        },
        questions: [
          { id: "ef1", difficulty: 2, prompt: "Pedir R$ 2.000 a 2% ao mês por 6 meses custa (juros simples):", options: ["R$ 240 de juros", "R$ 200 de juros", "R$ 400 de juros", "R$ 120 de juros"], answer: 0, explanation: "2000 × 0,02 × 6 = R$ 240 de juros. Total: R$ 2.240." },
          { id: "ef2", difficulty: 3, prompt: "O que é CET (Custo Efetivo Total)?", options: ["O valor do empréstimo", "O valor com juros simples", "Tudo que você paga: juros + taxas + seguros", "A taxa que o banco anuncia"], answer: 2, explanation: "CET inclui tudo: juros, IOF, seguros, taxas. É o custo REAL do empréstimo." },
        ],
      },
    ],
  },
  {
    id: "investimentos",
    icon: "📈",
    title: "Investimentos",
    color: "#ce82ff",
    lessons: [
      {
        id: "renda-fixa",
        title: "Renda Fixa: Poupança, CDB e Tesouro",
        sections: {
          oQueE: "Renda fixa: você sabe quanto vai ganhar antes de investir. É mais seguro que renda variável.",
          porQueImporta: "Renda fixa é onde a maioria das pessoas deve começar. Seguro, previsível e acessível.",
          comoFunciona: "POUPANÇA:\n• Rendimento baixo (atualmente ~0,5% ao mês)\n• Liquidez diária\n• Garantido pelo FGC até R$ 250 mil\n\nCDB:\n• Rendimento > poupança\n• Banco paga juros por 'pegar emprestado' seu dinheiro\n• Garantido pelo FGC\n\nTESOURO DIRETO:\n• Governo federal garante\n• O mais seguro do Brasil\n• A partir de R$ 30",
          formula: "Rendimento = Capital × Taxa × Tempo",
          exemplo: {
            titulo: "Comparação de investimentos",
            texto: "R$ 1.000 por 12 meses:\n\nPoupança (6% a.a.): R$ 1.060\nCDB (10% a.a.): R$ 1.100\nTesouro IPCA+ (inflação + 5%): ~R$ 1.150\n\nDiferença: R$ 90 entre poupança e Tesouro.",
          },
          pegadinha: "Poupança rende menos que a inflação na maioria dos anos. Manter tudo na poupança é PERDER poder de compra.",
          resumo: "Renda fixa = previsível. Poupança = seguro mas rende pouco. CDB e Tesouro rendem mais.",
        },
        questions: [
          { id: "rf1", difficulty: 1, prompt: "Qual investimento é garantido pelo governo federal?", options: ["Poupança", "CDB", "Tesouro Direto", "Ações"], answer: 2, explanation: "Tesouro Direto é garantido pelo governo. Poupança e CDB são garantidos pelo FGC." },
          { id: "rf2", difficulty: 2, prompt: "R$ 1.000 na poupança rende 0,5% ao mês. Após 3 meses, quanto terá?", options: ["R$ 1.005", "R$ 1.015", "R$ 1.050", "R$ 1.500"], answer: 1, explanation: "1000 × 0,005 = 5. 5 × 3 = 15. Total: R$ 1.015." },
          { id: "rf3", difficulty: 3, prompt: "Se a inflação é 8% ao ano e a poupança rende 6%, o investidor:", options: ["Ganha poder de compra", "Perde poder de compra", "Fica igual", "Depende do banco"], answer: 1, explanation: "6% − 8% = −2%. Rendeu menos que a inflação. Perdeu poder de compra." },
        ],
      },
      {
        id: "renda-variavel",
        title: "Renda Variável: Ações e Fundos",
        sections: {
          oQueE: "Renda variável: o retorno NÃO é garantido. Pode render muito ou pode perder dinheiro. Exemplos: ações, fundos imobiliários, ETFs.",
          porQueImporta: "Para crescer dinheiro acima da inflação no longo prazo, é preciso arriscar um pouco. Mas entenda o risco antes.",
          comoFunciona: "AÇÕS:\n• Comprar ação = virar sócio parcial da empresa\n• Preço sobe ou cai conforme desempenho\n• Pode ganhar dividendos (lucro distribuído)\n\nFUNDOS IMOBILIÁRIOS:\n• Invista em imóveis sem comprar imóvel\n• Recebe aluguéis proporcionais\n\nETFs:\n• Fundos que replicam índices (IBOV)\n• Mais diversificado que ações individuais",
          formula: "",
          exemplo: {
            titulo: "Ação da empresa X",
            texto: "Você comprou 10 ações a R$ 50 cada = R$ 500.\nPreço subiu para R$ 70.\n\nLucro = (70 − 50) × 10 = R$ 200\n\nMAS: se caísse para R$ 30, perda = (30 − 50) × 10 = −R$ 200.",
          },
          pegadinha: "NUNCA invista tudo em uma única ação. Diversifique. E só invista o que pode perder.",
          resumo: "Renda variável = sem garantia. Pode ganhar ou perder. Diversifique. Invista no longo prazo.",
        },
        questions: [
          { id: "rv1", difficulty: 1, prompt: "Comprar uma ação significa:", options: ["Emprestar dinheiro ao governo", "Tornar-se sócio parcial de uma empresa", "Depositar numa poupança", "Pagar um imposto"], answer: 1, explanation: "Ação = fração do capital de uma empresa. Você vira sócio." },
          { id: "rv2", difficulty: 2, prompt: "Qual a principal diferença entre renda fixa e renda variável?", options: ["Renda fixa rende mais", "Renda variável tem retorno garantido", "Renda fixa tem retorno previsível; variável não", "Não há diferença"], answer: 2, explanation: "Renda fixa: você sabe quanto ganha. Variável: depende do mercado." },
          { id: "rv3", difficulty: 3, prompt: "Diversificar investimentos significa:", options: ["Investir tudo no mesmo lugar", "Espalhar o dinheiro entre diferentes investimentos", "Só investir em renda fixa", "Investir só em ações"], answer: 1, explanation: "Diversificar = espalhar o risco. Se um cair, os outros compensam." },
        ],
      },
    ],
  },
  {
    id: "risco-retorno",
    icon: "⚖️",
    title: "Risco, Retorno e Liquidez",
    color: "#ffc800",
    lessons: [
      {
        id: "risco-retorno",
        title: "Relação Risco × Retorno",
        sections: {
          oQueE: "Risco: chance de perder dinheiro. Retorno: quanto pode ganhar. Liquidez: facilidade de sacar o dinheiro.",
          porQueImporta: "Entender risco, retorno e liquidez ajuda a escolher o investimento certo para cada objetivo.",
          comoFunciona: "REgra geral:\n• Baixo risco → Baixo retorno\n• Alto risco → Alto retorno POTENCIAL\n\nLiquidez:\n• Alta: saca quando quiser (poupança)\n• Baixa: só saca no prazo (CDB sem resgate antecipado)\n\nInvestimento ideal:\n• Adequado ao seu objetivo\n• Adequado ao seu prazo\n• Adequado ao seu perfil de risco",
          formula: "",
          exemplo: {
            titulo: "Escolhendo investimento",
            texto: "Reserva de emergência → Risco baixo, liquidez alta\n(Tesouro Selic, CDB diário)\n\nObjetivo de 5 anos → Risco médio, liquidez baixa\n(Tesouro IPCA+, CDB longo)\n\nAposentadoria → Risco maior aceitável\n(Ações, fundos de ações)",
          },
          pegadinha: "Não existe investimento que seja ao mesmo tempo: alto retorno, baixo risco e alta liquidez. Alguém sempre cede.",
          resumo: "Risco × Retorno: quanto mais arriscado, mais pode render (ou perder). Liquidez: quando consegue sacar.",
        },
        questions: [
          { id: "rr1", difficulty: 1, prompt: "Investimento com ALTA liquidez permite:", options: ["Ganhar muito dinheiro", "Sacar o dinheiro a qualquer momento", "Não pagar impostos", "Garantir retorno"], answer: 1, explanation: "Liquidez alta = pode sacar quando quiser." },
          { id: "rr2", difficulty: 2, prompt: "Se um investimento tem alto risco e alto retorno potencial, ele é adequado para:", options: ["Reserva de emergência", "Dinheiro que pode ficar parado por muito tempo", "Dinheiro que precisa no próximo mês", "Quem não quer riscos"], answer: 1, explanation: "Alto risco só faz sentido se o prazo for longo e não precisar do dinheiro em breve." },
          { id: "rr3", difficulty: 3, prompt: "Qual combensão NÃO existe num investimento ideal?", options: ["Alto retorno, baixo risco", "Baixo risco, alta liquidez", "Alto retorno, alta liquidez", "Todas existem"], answer: 0, explanation: "Não existe algo com alto retorno E baixo risco. É o trade-off fundamental das finanças." },
        ],
      },
    ],
  },
  {
    id: "economia",
    icon: "🏦",
    title: "Economia",
    color: "#1cb0f6",
    lessons: [
      {
        id: "sistema-financeiro",
        title: "Sistema Financeiro e Selic",
        sections: {
          oQueE: "O sistema financeiro é a rede de bancos, bolsas e instituições que movimentam o dinheiro do país. O Banco Central controla a taxa Selic.",
          porQueImporta: "A Selic afeta TUDO: juros de empréstimos, rendimento de investimentos, inflação. É a 'temperatura' da economia.",
          comoFunciona: "Banco Central do Brasil (BCB):\n• Controla a inflação\n• Define a taxa Selic\n\nSelic alta:\n• Empréstimos ficam caros\n• Investimentos rendem mais\n• Pessoas gastam menos\n• Inflação tende a cair\n\nSelic baixa:\n• Empréstimos ficam baratos\n• Investimentos rendem menos\n• Pessoas gastam mais\n• Inflação pode subir",
          formula: "",
          exemplo: {
            titulo: "Efeito da Selic",
            texto: "Selic a 13,75% ao ano:\n\n• Poupança rende ~0,5% ao mês\n• CDB pode pagar 14-16% ao ano\n• Empréstimo pessoal: 2-3% ao mês\n\nSelic a 8% ao ano:\n• Poupança rende menos\n• CDB paga menos\n• Empréstimo fica mais barato",
          },
          pegadinha: "Selic alta é boa para quem investe, ruim para quem precisa de crédito. Selic baixa é o oposto.",
          resumo: "Selic = taxa básica. Alta: investe bem, mas crédito caro. Baixa: crédito barato, mas investe menos.",
        },
        questions: [
          { id: "sf1", difficulty: 1, prompt: "O que é a taxa Selic?", options: ["Imposto sobre lucros", "Taxa básica de juros da economia", "Valor da poupança", "Preço do dólar"], answer: 1, explanation: "Selic é a taxa de juros que o Banco Central define. Afeta toda a economia." },
          { id: "sf2", difficulty: 2, prompt: "Se a Selic sobe, os empréstimos bancários ficam:", options: ["Mais baratos", "Mais caros", "Iguais", "Sem efeito"], answer: 1, explanation: "Selic alta = juros altos = empréstimos mais caros." },
          { id: "sf3", difficulty: 3, prompt: "Se a Selic cai, o investidor em renda fixa:", options: ["Ganha mais", "Ganha menos", "Não é afetado", "Perde dinheiro"], answer: 1, explanation: "Selic baixa = rendimentos de renda fixa tendem a cair também." },
        ],
      },
      {
        id: "oferta-procura",
        title: "Oferta e Demanda",
        sections: {
          oQueE: "Oferta: quantidade de um produto disponível. Demanda: quantidade que as pessoas querem comprar. O equilíbrio define o preço.",
          porQueImporta: "Entender oferta e demeanda explica por que os preços sobem e descem. É a base da economia.",
          comoFunciona: "Pouca oferta + muita demanda → Preço SOBE\nMuita oferta + pouca demanda → Preço CAI\n\nExemplo:\n• Black Friday: muita oferta + muita demanda = preço intermediário\n• Produto exclusivo: pouca oferta + muita demanda = preço alto\n• Produto abundante: muita oferta + pouca demanda = preço baixo",
          formula: "",
          exemplo: {
            titulo: "Preço do ingresso",
            texto: "Show com 50 mil ingressos e 200 mil interessados.\n\nOferta: 50 mil\nDemanda: 200 mil\n\nO preço sobe porque há mais gente querendo do que ingressos disponíveis.",
          },
          pegadinha: "Desconto não é apenas oferta/demanda. Pode ser estratégia de marketing para vender mais volume.",
          resumo: "Oferta > Demanda → preço cai. Demanda > Oferta → preço sobe.",
        },
        questions: [
          { id: "op1", difficulty: 1, prompt: "Se um produto está em falta e todos querem comprar, o preço:", options: ["Diminui", "Aumenta", "Fica igual", "Depende do governo"], answer: 1, explanation: "Pouca oferta + muita demanda = preço alto." },
          { id: "op2", difficulty: 2, prompt: "Após o Natal, brinquedos ficam em promoção porque:", options: ["Os pais são generosos", "A demanda cai depois do Natal", "O governo obriga", "Os produtos vencem"], answer: 1, explanation: "Depois do Natal, menos gente quer brinquedos. Demanda cai, preço cai." },
        ],
      },
    ],
  },
  {
    id: "empreendedorismo",
    icon: "🚀",
    title: "Empreendedorismo e Renda",
    color: "#58cc02",
    lessons: [
      {
        id: "lucro-receita",
        title: "Receita, Custos e Lucro",
        sections: {
          oQueE: "Receita = total de vendas. Custos = tudo que gastou para produzir. Lucro = Receita − Custos.",
          porQueImporta: "Muita gente acha que faturar muito é lucrar. Não é. Lucro é o que sobra DEPOIS de pagar tudo.",
          comoFunciona: "RECEITA: total que entra com vendas\n\nCUSTOS FIXOS: aluguel, funcionário, energia (pagam sempre)\n\nCUSTOS VARIÁVEIS: matéria-prima, embalagem (mudam com produção)\n\nLUCRO = Receita − (Fixos + Variáveis)\n\nSe lucro > 0: lucro\nSe lucro < 0: prejuízo",
          formula: "Lucro = Receita − Custos Fixos − Custos Variáveis",
          exemplo: {
            titulo: "Banca de suco",
            texto: "Vendeu 50 sucos a R$ 5 = R$ 250 (receita)\nCusto do limão, açúcar, gelo: R$ 100\nAluguel da barraca: R$ 50\n\nLucro = 250 − 100 − 50 = R$ 100",
          },
          pegadinha: "Faturar R$ 10.000 não significa lucrar R$ 10.000. Sempre subtraia os custos.",
          resumo: "Receita = vendas. Custos = tudo que gasta. Lucro = receita − custos.",
        },
        questions: [
          { id: "lr1", difficulty: 1, prompt: "Se uma loja fatura R$ 5.000 e gasta R$ 3.500, o lucro é:", options: ["R$ 8.500", "R$ 1.500", "R$ 3.500", "R$ 5.000"], answer: 1, explanation: "5000 − 3500 = R$ 1.500 de lucro." },
          { id: "lr2", difficulty: 2, prompt: "Um vendedor de pastéis fatura R$ 1.000 no mês. Custos: ingredientes R$ 300, aluguel R$ 200, energia R$ 50. Lucro?", options: ["R$ 1.000", "R$ 550", "R$ 450", "R$ 350"], answer: 2, explanation: "1000 − 300 − 200 − 50 = R$ 450." },
          { id: "lr3", difficulty: 3, prompt: "Para vender a R$ 8 e ter lucro de R$ 3 por unidade, quanto pode custar a produção?", options: ["R$ 5", "R$ 3", "R$ 8", "R$ 11"], answer: 0, explanation: "8 − 5 = R$ 3 de lucro. O custo máximo é R$ 5." },
        ],
      },
      {
        id: "precificacao",
        title: "Precificação",
        sections: {
          oQueE: "Precificação é definir o preço de venda. O preço precisa cobrir custos, gerar lucro e ser aceitável pelo cliente.",
          porQueImporta: "Preço errado: ou não vende (caro demais) ou não lucra (barato demais).",
          comoFunciona: "PASSO A PASSO:\n1. Some todos os custos (fixos + variáveis)\n2. Defina o lucro desejado\n3. Some: custo + lucro = preço\n4. Verifique: o mercado aceita esse preço?\n5. Ajuste se necessário",
          formula: "Preço = Custos + Lucro desejado",
          exemplo: {
            titulo: "Precificando um produto artesanal",
            texto: "Custo da materia-prima: R$ 15\nEmbalagem: R$ 3\nHoras trabalhadas (proporcional): R$ 12\n\nCusto total: R$ 30\nLucro desejado: R$ 20\n\nPreço = 30 + 20 = R$ 50",
          },
          pegadinha: "Esquecer custos fixos (aluguel, energia) na precificação faz o negócio ter prejuízo sem perceber.",
          resumo: "Preço = custos + lucro. Nunca esqueça custos fixos. Verifique se o mercado aceita.",
        },
        questions: [
          { id: "pcp1", difficulty: 2, prompt: "Se o custo é R$ 40 e o lucro desejado é R$ 15, o preço de venda deve ser:", options: ["R$ 25", "R$ 40", "R$ 55", "R$ 65"], answer: 2, explanation: "40 + 15 = R$ 55." },
          { id: "pcp2", difficulty: 3, prompt: "Um artesão gasta R$ 25 em material e R$ 15 em embalagem. Quer lucro de R$ 20. Qual o preço mínimo?", options: ["R$ 25", "R$ 45", "R$ 60", "R$ 80"], answer: 2, explanation: "25 + 15 + 20 = R$ 60." },
        ],
      },
    ],
  },
];

// Flat list de todas as questões de módulo (para uso no quiz adaptativo)
function getAllModuleQuestions() {
  const all = [];
  MODULES.forEach(m => {
    m.lessons.forEach(l => {
      l.questions.forEach(q => {
        all.push({ ...q, moduleId: m.id, lessonId: l.id, moduleTitle: m.title, lessonTitle: l.title });
      });
    });
  });
  return all;
}

// Questões OLITEF antigas (mantidas para compatibilidade)
const OLITEF_QUESTIONS = [
  {id:101,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Necessidades e desejos",title:"Escolha com cabeça",prompt:"Qual item é uma necessidade para estudar?",options:["Um caderno","Um brinquedo novo","Uma skin no jogo","Um lanche extra"],answer:0,hint:"Pense no item que ajuda diretamente na atividade de estudar.",explanation:"O caderno ajuda diretamente nos estudos. Os outros itens podem ser desejos."},
  {id:106,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Necessidades e desejos",title:"O que é essencial?",prompt:"Qual das opções abaixo é mais uma necessidade do que um desejo?",options:["Entrar num cinema","Pagar a conta de luz","Comprar um videogame","Ir a uma festa"],answer:1,hint:"Necessidade é algo sem o qual a vida fica muito difícil ou prejudicada.",explanation:"A luz em casa é essencial. Sem ela, não há estudo, nem geladeira."},
  {id:107,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Necessidades e desejos",title:"Ordem certa",prompt:"Se você tem R$ 100 e precisa pagar lanche (R$ 30) e quer comprar um jogo (R$ 80), o que fazer?",options:["Comprar o jogo","Pagar o lanche e guardar o resto","Comprar os dois no parcelamento","Esperar o próximo mês"],answer:1,hint:"Sempre pague o que é necessário antes de pensar no que é desejo.",explanation:"Pagar o lanche (necessidade) e guardar o restante é a escolha mais inteligente."},
  {id:102,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Receitas e despesas",title:"O dinheiro em movimento",prompt:"Se entram R$ 30 e você gasta R$ 12, qual é o saldo?",options:["R$ 18","R$ 42","R$ 12","R$ 30"],answer:0,hint:"Para descobrir o que sobra, faça o valor que entra menos o valor que sai.",explanation:"Saldo é o que sobra: R$ 30 − R$ 12 = R$ 18."},
  {id:108,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Receitas e despesas",title:"De onde vem o dinheiro?",prompt:"Qual é um exemplo de receita?",options:["Pagar uma conta","Receber mesada","Comprar material escolar","Gastar com transporte"],answer:1,hint:"Receita é quando o dinheiro vem para você.",explanation:"A mesada é dinheiro que entra — logo, é receita."},
  {id:103,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Orçamento",title:"Faça o mapa",prompt:"Qual é a melhor ordem para organizar um orçamento?",options:["Comprar e depois contar","Anotar entradas, listar saídas e comparar","Gastar tudo e pedir mais","Escolher só pela promoção"],answer:1,hint:"Um mapa é feito antes da viagem. O orçamento também.",explanation:"Anote as receitas, liste as despesas e compare antes de decidir."},
  {id:110,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Orçamento",title:"Conta do mês",prompt:"Se sua mesada é R$ 80 e gasta R$ 20 em lanches e R$ 15 em transporte, quanto sobra?",options:["R$ 35","R$ 45","R$ 55","R$ 65"],answer:1,hint:"Some as despesas e subtraia da mesada.",explanation:"80 − 20 − 15 = R$ 45."},
  {id:104,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Poupança",title:"Meta em passos",prompt:"Para juntar R$ 60 em 6 semanas, quanto guardar por semana?",options:["R$ 6","R$ 8","R$ 10","R$ 12"],answer:2,hint:"Divida o valor total pelo número de semanas.",explanation:"60 ÷ 6 = R$ 10 por semana."},
  {id:111,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Poupança",title:"Pequenos passos",prompt:"Qual é a melhor forma de começar a poupar?",options:["Esperar sobrar muito dinheiro","Guardar uma parte toda semana","Pedir emprestado","Investir tudo em ações"],answer:1,hint:"A consistência é mais importante que a quantidade.",explanation:"Guardar toda semana cria o hábito de poupar."},
  {id:105,level:"nivel-1",macrotema:"Consumo consciente",topic:"Consumo consciente",title:"Pare e pense",prompt:"O que fazer antes de uma compra por impulso?",options:["Comprar imediatamente","Pedir a senha de alguém","Esperar, comparar e perguntar se precisa","Escolher o pacote maior sempre"],answer:2,hint:"Uma pausa pode evitar uma decisão sem planejamento.",explanation:"Uma pausa ajuda a separar necessidade de desejo."},
  {id:113,level:"nivel-1",macrotema:"Consumo consciente",topic:"Consumo consciente",title:"Mensagem por trás",prompt:"Por que as empresas fazem propagandas com desconto?",options:["Para ajudar consumidores","Para vender mais e aumentar lucro","Porque produtos estão vencendo","Por obrigação da lei"],answer:1,hint:"A propaganda tem um objetivo de negócio por trás.",explanation:"A propaganda existe para vender mais."},
  {id:201,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Crédito consciente",title:"Preço real do parcelamento",prompt:"Celular custa R$ 1.200 à vista ou 12x de R$ 120. Custo total?",options:["R$ 1.200","R$ 1.440","R$ 1.080","R$ 1.320"],answer:1,hint:"Multiplique parcela × número de parcelas.",explanation:"12 × 120 = R$ 1.440. Pagou R$ 240 a mais."},
  {id:203,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Crédito consciente",title:"Bola de neve dos juros",prompt:"Devendo R$ 500 a 5% ao mês (composto), quanto após 2 meses?",options:["R$ 525","R$ 550","R$ 551,25","R$ 600"],answer:2,hint:"No 1.º mês: 5% de 500. No 2.º: 5% do novo valor.",explanation:"500 × 1,05 = 525. 525 × 1,05 = 551,25."},
  {id:205,level:"nivel-2",macrotema:"Produtos de renda fixa",topic:"Poupança e renda fixa",title:"Investimento seguro",prompt:"Qual característica do Tesouro Direto?",options:["Risco alto e retorno garantido","Governo garante, baixo risco","Só serve para milionários","Valor pode cair pela metade"],answer:1,hint:"O governo federal está por trás.",explanation:"Tesouro Direto é garantido pelo governo. Um dos mais seguros."},
  {id:208,level:"nivel-2",macrotema:"Renda variável",topic:"Ações",title:"Ser dono de empresa",prompt:"Quando compra uma ação, o que faz?",options:["Empresta dinheiro ao governo","Compra uma parte da empresa","Deposit numa poupança","Paga um imposto"],answer:1,hint:"Cada pedaço é uma parte do todo.",explanation:"Comprar ações = comprar pedacinho da empresa = sócio."},
  {id:211,level:"nivel-2",macrotema:"Economia e câmbio",topic:"Câmbio e economia",title:"Moeda estrangeira",prompt:"Se 1 dólar = R$ 5,00 e quer algo de US$ 30, quanto custa?",options:["R$ 30","R$ 100","R$ 150","R$ 500"],answer:2,hint:"US$ 30 × R$ 5,00",explanation:"30 × 5 = R$ 150."},
  {id:212,level:"nivel-2",macrotema:"Economia e câmbio",topic:"Inflação",title:"Poder de compra cai",prompt:"Inflação 10% e salário não sobe. Poder de compra:",options:["Aumenta","Diminui","Fica igual","Depende do banco"],answer:1,hint:"Preços sobem, dinheiro não.",explanation:"Se preços sobem e salário fica igual, compra menos."},
  {id:214,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Score de crédito",title:"Sua reputação",prompt:"O que é o score de crédito?",options:["Dinheiro que tem","Nota que indica histórico de pagamento","Salário","Número de cartões"],answer:1,hint:"É uma nota de bom pagador.",explanation:"Score reflete histórico de pagamentos. Maior = mais confiável."},
];
