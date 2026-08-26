// ═══════════════════════════════════════════════════════════════════════════
// OLITEF 2026 — Educação Financeira | Escola Aniceto Teixeira
// App.js — Perguntas + Lógica do Quiz (Zero dependências)
// ═══════════════════════════════════════════════════════════════════════════

// ─── PERGUNTAS ────────────────────────────────────────────────────────────
const questions = [
  // ═══ NÍVEL 1: 6.º e 7.º anos ═══
  {id:101,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Necessidades e desejos",title:"Escolha com cabeça",prompt:"Qual item é uma necessidade para estudar?",options:["Um caderno","Um brinquedo novo","Uma skin no jogo","Um lanche extra"],answer:0,hint:"Pense no item que ajuda diretamente na atividade de estudar.",explanation:"O caderno ajuda diretamente nos estudos. Os outros itens podem ser desejos: são legais, mas podem esperar."},
  {id:106,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Necessidades e desejos",title:"O que é essencial?",prompt:"Qual das opções abaixo é mais uma necessidade do que um desejo?",options:["Entrar num cinema","Pagar a conta de luz","Comprar um videogame","Ir a uma festa"],answer:1,hint:"Necessidade é algo sem o qual a vida fica muito difícil ou prejudicada.",explanation:"A luz em casa é essencial. Sem ela, não há estudo, nem geladeira, nem comunicação."},
  {id:107,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Necessidades e desejos",title:"Ordem certa",prompt:"Se você tem R$ 100 e precisa pagar lanche da escola (R$ 30) e quer comprar um jogo (R$ 80), o que fazer primeiro?",options:["Comprar o jogo","Pagar o lanche e guardar o resto","Comprar os dois no parcelamento","Esperar o próximo mês"],answer:1,hint:"Sempre pague o que é necessário antes de pensar no que é desejo.",explanation:"Pagar o lanche (necessidade) e guardar o restante é a escolha mais inteligente."},
  {id:102,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Receitas e despesas",title:"O dinheiro em movimento",prompt:"Se entram R$ 30 e você gasta R$ 12, qual é o saldo?",options:["R$ 18","R$ 42","R$ 12","R$ 30"],answer:0,hint:"Para descobrir o que sobra, faça o valor que entra menos o valor que sai.",explanation:"Saldo é o que sobra: R$ 30 − R$ 12 = R$ 18."},
  {id:108,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Receitas e despesas",title:"De onde vem o dinheiro?",prompt:"Qual das opções abaixo é um exemplo de receita?",options:["Pagar uma conta","Receber mesada","Comprar material escolar","Gastar com transporte"],answer:1,hint:"Receita é quando o dinheiro vem para você.",explanation:"A mesada é dinheiro que entra — logo, é receita."},
  {id:109,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Receitas e despesas",title:"Fixo ou muda?",prompt:"Qual é um exemplo de despesa fixa?",options:["Lanche da cantina","Aluguel da casa","Comprar roupas novas","Ir ao cinema"],answer:1,hint:"Pense no gasto que acontece sempre igual, todo mês.",explanation:"O aluguel é fixo: é pago todo mês, geralmente o mesmo valor."},
  {id:103,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Orçamento",title:"Faça o mapa",prompt:"Qual é a melhor ordem para organizar um orçamento?",options:["Comprar e depois contar","Anotar entradas, listar saídas e comparar","Gastar tudo e pedir mais","Escolher só pela promoção"],answer:1,hint:"Um mapa é feito antes da viagem. O orçamento também deve vir antes da compra.",explanation:"Anote as receitas, liste as despesas e compare antes de decidir."},
  {id:110,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Orçamento",title:"Conta do mês",prompt:"Se sua mesada é R$ 80 e você gasta R$ 20 em lanches e R$ 15 em transporte, quanto sobra?",options:["R$ 35","R$ 45","R$ 55","R$ 65"],answer:1,hint:"Some as despesas e subtraia da mesada.",explanation:"R$ 80 − R$ 20 − R$ 15 = R$ 45."},
  {id:104,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Poupança",title:"Meta em passos",prompt:"Para juntar R$ 60 em 6 semanas, quanto guardar por semana?",options:["R$ 6","R$ 8","R$ 10","R$ 12"],answer:2,hint:"Divida o valor total pelo número de semanas.",explanation:"Dividimos a meta pelo prazo: R$ 60 ÷ 6 = R$ 10 por semana."},
  {id:111,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Poupança",title:"Pequenos passos",prompt:"Qual é a melhor forma de começar a poupar?",options:["Esperar sobrar muito dinheiro","Guardar uma parte toda semana","Pedir emprestado","Investir tudo em ações"],answer:1,hint:"A consistência é mais importante que a quantidade.",explanation:"Guardar uma parte toda semana cria o hábito de poupar."},
  {id:112,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Poupança",title:"Dinheiro que cresce",prompt:"Se você guarda R$ 100 a uma taxa de 10% ao mês, quanto terá depois de 2 meses?",options:["R$ 110","R$ 120","R$ 200","R$ 210"],answer:1,hint:"Calcule 10% do valor original e multiplique pelo número de meses.",explanation:"10% de R$ 100 = R$ 10. Em 2 meses: R$ 10 × 2 = R$ 20. Total: R$ 120."},
  {id:105,level:"nivel-1",macrotema:"Consumo consciente",topic:"Consumo consciente",title:"Pare e pense",prompt:"O que fazer antes de uma compra por impulso?",options:["Comprar imediatamente","Pedir a senha de alguém","Esperar, comparar e perguntar se precisa","Escolher o pacote maior sempre"],answer:2,hint:"Uma pausa de alguns minutos pode evitar uma decisão sem planejamento.",explanation:"Uma pausa ajuda a separar necessidade de desejo e comparar opções."},
  {id:113,level:"nivel-1",macrotema:"Consumo consciente",topic:"Consumo consciente",title:"Mensagem por trás",prompt:"Por que as empresas fazem propagandas com desconto e promoção?",options:["Para ajudar os consumidores","Para vender mais e aumentar o lucro","Porque os produtos estão vencendo","Por obrigação da lei"],answer:1,hint:"A propaganda tem um objetivo de negócio por trás.",explanation:"A propaganda existe para vender mais. Promoções podem ser reais, mas também podem ser estratégias para atrair clientes."},
  {id:114,level:"nivel-1",macrotema:"Consumo consciente",topic:"Consumo consciente",title:"Cuidado ao clicar",prompt:"Qual situação é um risco financeiro online?",options:["Comprar num site oficial","Divulgar dados bancários para um link desconhecido","Usar cartão virtual em compras","Verificar o saldo no app do banco"],answer:1,hint:"Pense em algo que colocaria seus dados em perigo.",explanation:"Divulgar dados bancários para links desconhecidos é um risco enorme."},
  {id:115,level:"nivel-1",macrotema:"Planejamento financeiro",topic:"Orçamento",title:"Onde vai o dinheiro?",prompt:"Qual é a melhor forma de anotar seus gastos do dia a dia?",options:["Memorizar tudo","Usar um caderno ou app de controle","Perguntar aos pais","Esquecer e comprar de novo"],answer:1,hint:"Pense em uma forma prática de registrar para não esquecer.",explanation:"Anotar os gastos ajuda a ver para onde o dinheiro vai e onde dá para economizar."},

  // ═══ NÍVEL 2: 8.º e 9.º anos ═══
  {id:201,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Crédito consciente",title:"O preço real do parcelamento",prompt:"Um celular custa R$ 1.200 à vista ou em 12x de R$ 120. Qual o custo total do parcelamento?",options:["R$ 1.200","R$ 1.440","R$ 1.080","R$ 1.320"],answer:1,hint:"Multiplique o valor da parcela pelo número de parcelas.",explanation:"12 × R$ 120 = R$ 1.440. O parcelamento com juros custa R$ 240 a mais."},
  {id:202,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Crédito consciente",title:"Armadilha do cartão",prompt:"Qual é a consequência de parcelar muitas compras ao mesmo tempo no cartão de crédito?",options:["Pagar mais barato","Ficar com parcelas altas e comprometer o orçamento","Ganhar mais dinheiro","Melhorar o score de crédito"],answer:1,hint:"Pense em quantas parcelas terão que pagar no próximo boleto.",explanation:"Muitas parcelas ao mesmo tempo aumentam a conta mensal e podem comprometer o orçamento."},
  {id:203,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Crédito consciente",title:"A bola de neve dos juros",prompt:"Se você deve R$ 500 e o juro é 5% ao mês (composto), quanto deve após 2 meses?",options:["R$ 525","R$ 550","R$ 551,25","R$ 600"],answer:2,hint:"No 1.º mês calcule 5% de R$ 500 e some. No 2.º mês, calcule 5% do novo valor.",explanation:"1.º mês: R$ 525. 2.º mês: R$ 525 × 5% = R$ 26,25 → R$ 551,25."},
  {id:204,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Crédito consciente",title:"Qual crédito usar?",prompt:"Qual é a diferença principal entre um empréstimo bancário e o cartão de crédito?",options:["Não há diferença","Empréstimo tem prazo definido; cartão é revolving","Cartão tem juros menores","Empréstimo não precisa devolver"],answer:1,hint:"Pense na forma como cada um cobra juros e como o pagamento é organizado.",explanation:"Empréstimo bancário tem parcelas fixas e prazo definido. Cartão de crédito é rotativo — juros altíssimos se não pagar à vista."},
  {id:205,level:"nivel-2",macrotema:"Produtos de renda fixa",topic:"Poupança e renda fixa",title:"Investimento seguro",prompt:"Qual é uma característica do Tesouro Direto?",options:["Risco alto e retorno garantido","Governo garante o investimento, com baixo risco","Só serve para milionários","O valor pode cair pela metade"],answer:1,hint:"Pense em quem está por trás desse investimento: o governo federal.",explanation:"O Tesouro Direto é garantido pelo governo federal, o que o torna um dos investimentos mais seguros."},
  {id:206,level:"nivel-2",macrotema:"Produtos de renda fixa",topic:"Poupança e renda fixa",title:"Quando posso resgatar?",prompt:"O que significa \"liquidez\" num investimento?",options:["Quanto dinheiro está investido","Facilidade de resgatar o dinheiro investido","A taxa de juros paga","O tempo mínimo do investimento"],answer:1,hint:"Pense em poder usar o dinheiro investido rapidamente.",explanation:"Liquidez é a capacidade de resgatar o investimento sem perdas significativas."},
  {id:207,level:"nivel-2",macrotema:"Produtos de renda fixa",topic:"Poupança e renda fixa",title:"Rende mais ou menos?",prompt:"Se a poupança rende 0,5% ao mês e o Tesouro Selic rende 1% ao mês, quanto a mais você ganha em 6 meses com R$ 1.000 no Tesouro Selic?",options:["R$ 10","R$ 30","R$ 60","R$ 120"],answer:1,hint:"Calcule o rendimento de cada um e subtraia.",explanation:"Poupança: R$ 30. Selic: R$ 60. Diferença: R$ 30."},
  {id:208,level:"nivel-2",macrotema:"Renda variável",topic:"Ações",title:"Ser dono de uma empresa",prompt:"Quando você compra uma ação, o que está fazendo?",options:["Emprestando dinheiro ao governo","Comprando uma parte da empresa","Depositando numa poupança","Pagando um imposto"],answer:1,hint:"Pense em dividir uma pizza: cada pedaço é uma parte do todo.",explanation:"Comprar ações é comprar uma parte da empresa. Se a empresa crescer, o valor da sua parte pode aumentar."},
  {id:209,level:"nivel-2",macrotema:"Renda variável",topic:"Risco e retorno",title:"Alto risco, alto retorno?",prompt:"Qual é a relação entre risco e retorno nos investimentos?",options:["Quanto menor o risco, maior o retorno","Quanto maior o risco, maior o retorno potencial","Risco e retorno não se influenciam","Investimentos seguros rendem mais"],answer:1,hint:"Pense numa montanha-russa: quanto mais alta, mais emoção — e mais chance de queda.",explanation:"Existe uma relação direta: investimentos mais arriscados oferecem retorno potencial maior, mas também maior chance de perda."},
  {id:210,level:"nivel-2",macrotema:"Renda variável",topic:"Diversificação",title:"Não coloque tudo no mesmo cesto",prompt:"Por que é recomendável diversificar investimentos?",options:["Para ganhar mais dinheiro imediatamente","Para reduzir o risco de perder tudo","Porque é obrigação da lei","Para pagar menos impostos"],answer:1,hint:"Pense em não colocar todos os ovos na mesma cesta.",explanation:"Diversificar reduz o risco: se um investimento render mal, os outros podem compensar."},
  {id:211,level:"nivel-2",macrotema:"Economia e câmbio",topic:"Câmbio e economia",title:"Moeda estrangeira",prompt:"Se 1 dólar = R$ 5,00 e você quer comprar algo de US$ 30, quanto custa em reais?",options:["R$ 30","R$ 100","R$ 150","R$ 500"],answer:2,hint:"Multiplique: US$ 30 × R$ 5,00",explanation:"US$ 30 × R$ 5,00 = R$ 150. O item custa R$ 150 no Brasil."},
  {id:212,level:"nivel-2",macrotema:"Economia e câmbio",topic:"Inflação",title:"Preços sobem, poder de compra cai",prompt:"Se a inflação é de 10% ao ano e seu salário não aumenta, o que acontece com seu poder de compra?",options:["Aumenta","Diminui","Fica igual","Depende do banco"],answer:1,hint:"Pense em poder de compra: quantos produtos dá para comprar com o mesmo valor.",explanation:"Com inflação de 10%, tudo fica 10% mais caro. Se o salário não aumenta, o poder de compra diminui."},
  {id:213,level:"nivel-2",macrotema:"Economia e câmbio",topic:"Oferta e procura",title:"Lei básica do mercado",prompt:"Se um produto está muito escasso e todos querem comprar, o que acontece com o preço?",options:["Diminui","Aumenta","Fica igual","Depende do governo"],answer:1,hint:"Pense no que acontece com o preço de um produto que acaba rápido.",explanation:"Quando a oferta é baixa e a procura é alta, o vendedor pode cobrar mais caro."},
  {id:214,level:"nivel-2",macrotema:"Finanças pessoais",topic:"Score de crédito",title:"Sua reputação financeira",prompt:"O que é o score de crédito?",options:["A quantidade de dinheiro que você tem","Uma nota que indica seu histórico de pagamento","O valor do seu salário","O número de cartões que você possui"],answer:1,hint:"Pense numa nota que diz se você é um bom pagador.",explanation:"O score reflete seu histórico de pagamentos. Quanto maior, mais confiável você é para o mercado financeiro."},
  {id:215,level:"nivel-2",macrotema:"Produtos de renda fixa",topic:"CDB",title:"O banco me paga por guardar dinheiro",prompt:"O que é um CDB (Certificado de Depósito Bancário)?",options:["Um tipo de empréstimo que o banco faz para você","Um investimento onde você empresta dinheiro ao banco e recebe juros","Uma conta corrente comum","Um cartão de crédito especial"],answer:1,hint:"Pense em guardar dinheiro no banco e receber por isso.",explanation:"No CDB, o investidor deposita dinheiro no banco por um prazo e recebe juros ao final."}
];

// ─── STATE ────────────────────────────────────────────────────────────────
let state = {
  currentLevel: null,
  currentQuestions: [],
  currentIndex: 0,
  selectedOption: null,
  hintUsed: false,
  answered: false,
  xp: 0,
  stars: 0,
  quizzesDone: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  topicStats: {}
};

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem('olitef2026'));
    if (s) {
      state.xp = s.xp || 0;
      state.stars = s.stars || 0;
      state.quizzesDone = s.quizzesDone || 0;
      state.totalCorrect = s.totalCorrect || 0;
      state.totalAnswered = s.totalAnswered || 0;
      state.topicStats = s.topicStats || {};
    }
  } catch(e) {}
  updateGlobalStats();
}

function saveState() {
  localStorage.setItem('olitef2026', JSON.stringify({
    xp: state.xp, stars: state.stars, quizzesDone: state.quizzesDone,
    totalCorrect: state.totalCorrect, totalAnswered: state.totalAnswered,
    topicStats: state.topicStats
  }));
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.nav === name);
  });
  if (name === 'progress') renderProgress();
  if (name === 'home') renderTopics();
  window.scrollTo(0, 0);
}

function updateGlobalStats() {
  document.getElementById('totalStars').textContent = state.stars;
  document.getElementById('totalXP').textContent = state.xp;
}

// ─── HOME: TOPIC CARDS ────────────────────────────────────────────────────
function renderTopics() {
  const n1 = document.getElementById('topics-nivel1');
  const n2 = document.getElementById('topics-nivel2');
  n1.innerHTML = '';
  n2.innerHTML = '';

  const macrotemas = {};
  questions.forEach(q => {
    if (!macrotemas[q.macrotema]) macrotemas[q.macrotema] = { nivel1: new Set(), nivel2: new Set() };
    macrotemas[q.macrotema][q.level].add(q.topic);
  });

  Object.entries(macrotemas).forEach(([m, levels]) => {
    if (levels.nivel1.size > 0) {
      const card = document.createElement('div');
      card.className = 'topic-card';
      card.onclick = () => startQuiz('nivel-1');
      card.innerHTML = `<h4>${m}</h4><p>${[...levels.nivel1].join(', ')}</p><div class="topic-count">${levels.nivel1.size} questões</div>`;
      n1.appendChild(card);
    }
    if (levels.nivel2.size > 0) {
      const card = document.createElement('div');
      card.className = 'topic-card';
      card.onclick = () => startQuiz('nivel-2');
      card.innerHTML = `<h4>${m}</h4><p>${[...levels.nivel2].join(', ')}</p><div class="topic-count">${levels.nivel2.size} questões</div>`;
      n2.appendChild(card);
    }
  });
}

// ─── QUIZ LOGIC ───────────────────────────────────────────────────────────
function startQuiz(level) {
  state.currentLevel = level;
  state.currentQuestions = shuffle(questions.filter(q => q.level === level));
  state.currentIndex = 0;
  state.selectedOption = null;
  state.hintUsed = false;
  state.answered = false;
  state._lastQuizCorrect = 0;
  state._lastQuizXP = 0;
  state._lastQuizStars = 0;

  showScreen('quiz');
  document.getElementById('quiz-select').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quizLevel').textContent = level === 'nivel-1' ? 'Nível 1' : 'Nível 2';
  renderQuestion();
}

function renderQuestion() {
  const q = state.currentQuestions[state.currentIndex];
  const total = state.currentQuestions.length;
  state.selectedOption = null;
  state.hintUsed = false;
  state.answered = false;

  // Progress
  document.getElementById('quizProgressFill').style.width = ((state.currentIndex / total) * 100) + '%';
  document.getElementById('quizCounter').textContent = `${state.currentIndex + 1} / ${total}`;

  // Question
  document.getElementById('qMacrotema').textContent = q.macrotema + ' — ' + q.topic;
  document.getElementById('qTitle').textContent = q.title;
  document.getElementById('qPrompt').textContent = q.prompt;

  // Options
  const letters = ['A', 'B', 'C', 'D'];
  const optionsHtml = q.options.map((opt, i) =>
    `<button class="quiz-option" onclick="selectOption(${i})" data-index="${i}">
      <span class="opt-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>`
  ).join('');
  document.getElementById('quizOptions').innerHTML = optionsHtml;

  // Reset UI
  document.getElementById('quizHint').classList.add('hidden');
  document.getElementById('quizFeedback').classList.add('hidden');
  document.getElementById('feedbackExplanation').classList.add('hidden');
  document.getElementById('btnHint').classList.remove('hidden');
  document.getElementById('btnCheck').classList.remove('hidden');
  document.getElementById('btnCheck').disabled = true;
  document.getElementById('btnNext').classList.add('hidden');
}

function selectOption(index) {
  if (state.answered) return;
  state.selectedOption = index;

  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });
  document.getElementById('btnCheck').disabled = false;
}

function showHint() {
  if (state.hintUsed || state.answered) return;
  state.hintUsed = true;
  const q = state.currentQuestions[state.currentIndex];
  document.getElementById('hintText').textContent = q.hint;
  document.getElementById('quizHint').classList.remove('hidden');
  document.getElementById('btnHint').classList.add('hidden');
}

function checkAnswer() {
  if (state.selectedOption === null || state.answered) return;
  state.answered = true;

  const q = state.currentQuestions[state.currentIndex];
  const correct = state.selectedOption === q.answer;

  // Mark options
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.answer) btn.classList.add('correct');
    if (i === state.selectedOption && !correct) btn.classList.add('wrong');
  });

  // XP
  const baseXP = [10, 15, 20, 25, 30][q.difficulty - 1] || 15;
  const xpGain = correct ? (state.hintUsed ? Math.round(baseXP * 0.7) : baseXP) : 0;
  state.xp += xpGain;
  state.totalAnswered++;
  if (correct) state.totalCorrect++;
  state._lastQuizXP += xpGain;
  if (correct) state._lastQuizCorrect++;

  // Topic stats
  if (!state.topicStats[q.macrotema]) state.topicStats[q.macrotema] = { correct: 0, total: 0 };
  state.topicStats[q.macrotema].total++;
  if (correct) state.topicStats[q.macrotema].correct++;

  // Feedback
  const feedback = document.getElementById('quizFeedback');
  const icon = document.getElementById('feedbackIcon');
  const text = document.getElementById('feedbackText');
  const explanation = document.getElementById('feedbackExplanation');

  feedback.classList.remove('hidden', 'correct', 'wrong');
  feedback.classList.add(correct ? 'correct' : 'wrong');
  icon.textContent = correct ? '✅' : '❌';
  text.textContent = correct
    ? (xpGain > 0 ? `Correto! +${xpGain} XP` : 'Correto!')
    : `Resposta incorreta. A certa é: ${q.options[q.answer]}`;

  explanation.textContent = q.explanation;
  explanation.classList.remove('hidden');

  // Hide hint/check, show next
  document.getElementById('btnHint').classList.add('hidden');
  document.getElementById('btnCheck').classList.add('hidden');
  document.getElementById('btnNext').classList.remove('hidden');

  updateGlobalStats();
  saveState();
}

function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.currentQuestions.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function showResults() {
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const total = state.currentQuestions.length;
  const correct = state._lastQuizCorrect;
  const pct = correct / total;

  let earnedStars = 0;
  if (pct >= 0.9) earnedStars = 3;
  else if (pct >= 0.7) earnedStars = 2;
  else if (pct >= 0.5) earnedStars = 1;
  state.stars += earnedStars;
  state._lastQuizStars = earnedStars;
  state.quizzesDone++;

  document.getElementById('resultCorrect').textContent = correct + ' / ' + total;
  document.getElementById('resultXP').textContent = state._lastQuizXP;
  document.getElementById('resultStars').textContent = earnedStars;

  let emoji, title, msg;
  if (pct >= 0.9) { emoji = '🎉'; title = 'Incrível!'; msg = 'Você domina esse nível!'; }
  else if (pct >= 0.7) { emoji = '👍'; title = 'Muito bem!'; msg = 'Continue assim!'; }
  else if (pct >= 0.5) { emoji = '💪'; title = 'Bom esforço!'; msg = 'Revise os tópicos e tente de novo.'; }
  else { emoji = '📚'; title = 'Continue praticando!'; msg = 'Releia as explicações e tente novamente.'; }

  document.getElementById('resultsIcon').textContent = emoji;
  document.getElementById('resultsTitle').textContent = title;
  document.getElementById('resultsText').textContent = msg;

  updateGlobalStats();
  saveState();
}

// ─── PROGRESS SCREEN ──────────────────────────────────────────────────────
function renderProgress() {
  document.getElementById('pXP').textContent = state.xp;
  document.getElementById('pStars').textContent = state.stars;
  document.getElementById('pQuizzes').textContent = state.quizzesDone;
  document.getElementById('pAccuracy').textContent = state.totalAnswered > 0
    ? Math.round((state.totalCorrect / state.totalAnswered) * 100) + '%'
    : '0%';

  const perfDiv = document.getElementById('topicPerformance');
  perfDiv.innerHTML = '';
  const entries = Object.entries(state.topicStats);
  if (entries.length === 0) {
    perfDiv.innerHTML = '<p style="color:var(--text-muted);font-size:14px">Nenhum quiz feito ainda. Comece praticando!</p>';
    return;
  }
  entries.sort((a, b) => (b[1].correct / b[1].total) - (a[1].correct / a[1].total));
  entries.forEach(([topic, s]) => {
    const pct = Math.round((s.correct / s.total) * 100);
    const item = document.createElement('div');
    item.className = 'topic-perf-item';
    item.innerHTML = `<span class="tp-name">${topic}</span><span class="tp-score">${s.correct}/${s.total} (${pct}%)</span>`;
    perfDiv.appendChild(item);
  });
}

function resetProgress() {
  if (!confirm('Resetar todo o progresso?')) return;
  state.xp = 0; state.stars = 0; state.quizzesDone = 0;
  state.totalCorrect = 0; state.totalAnswered = 0; state.topicStats = {};
  saveState();
  updateGlobalStats();
  renderProgress();
}

// ─── UTILITIES ────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── INIT ─────────────────────────────────────────────────────────────────
loadState();
renderTopics();
