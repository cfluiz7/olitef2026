// ═══════════════════════════════════════════════════════════════════════════
// OLITEF 2026 — App Principal
// Login • Simulados Diários • Ranking • Código de Autenticação
// ═══════════════════════════════════════════════════════════════════════════

// ─── STATE ─────────────────────────────────────────────────────────────────
const LS_KEYS = {
  user: 'olitef2026_user',
  results: 'olitef2026_results',
  quiz: 'olitef2026_quiz_in_progress',
};

let USER = null;            // { nome, nomeRaw, nivel }
let RESULTS = [];           // [{ numero, dia, nota, corretas, total, data, codigo }]
let currentScreen = 'dashboard';
let quiz = null;            // estado do simulado em andamento
let quizTimer = null;

// ─── HELPERS ───────────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id); }

function normalizeName(raw) {
  if (!raw) return '';
  return raw.replace(/\s+/g, ' ').trim().replace(/[^a-zA-ZÀ-ú\s]/g, '').replace(/\s+/g, ' ').trim();
}

function normalizeForCode(raw) {
  // remove acentos e espaços, para o código
  return normalizeName(raw)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s/g, '')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function formatCapitalize(name) {
  return name.replace(/\b[a-zÀ-ú]/g, c => c.toUpperCase());
}

function pad2(n) { return String(n).padStart(2, '0'); }

function load() {
  try { USER = JSON.parse(localStorage.getItem(LS_KEYS.user)); } catch(e) { USER = null; }
  try { RESULTS = JSON.parse(localStorage.getItem(LS_KEYS.results)) || []; } catch(e) { RESULTS = []; }
}

function saveUser() { localStorage.setItem(LS_KEYS.user, JSON.stringify(USER)); }
function saveResults() { localStorage.setItem(LS_KEYS.results, JSON.stringify(RESULTS)); }

// ─── USER IDENTIFICATION ───────────────────────────────────────────────────
function setAuthEscola() {
  const el = $('authEscola');
  if (el) el.textContent = CONFIG.escola + ' — ' + CONFIG.olimpiada;
}

function nextNameStep() {
  const raw = $('inputName').value;
  const name = normalizeName(raw);
  if (name.length < 2) { $('inputName').focus(); return; }
  // armazena temporário no campo hidden
  window._pendingName = name;
  $('inputName').classList.add('hidden');
  $('step-name').classList.add('hidden');
  $('step-level').classList.remove('hidden');
}

function chooseLevel(level) {
  const name = formatCapitalize(window._pendingName || '');
  USER = { nome: name, nomeRaw: name, nivel: level };
  saveUser();
  $('login-view').classList.add('hidden');
  $('app-view').classList.remove('hidden');
  $('hdrNivel').textContent = 'Nível ' + level;
  $('avatarBtn').textContent = name.charAt(0).toUpperCase();
  updateHeader();
  navigate('dashboard');
}

function changeUser() {
  // trocar aluno
  localStorage.removeItem(LS_KEYS.user);
  load();
  showLogin();
}

function changeLevel() {
  // permite trocar nível mantendo nome
  if (USER) {
    window._pendingName = USER.nome;
    $('inputName').value = USER.nome;
    $('inputName').classList.remove('hidden');
    $('step-name').classList.add('hidden');
    $('step-level').classList.remove('hidden');
    $('login-view').classList.remove('hidden');
    // não remove app-view, mostra login por cima
  }
}

function toggleUserMenu() {
  const m = $('userMenu');
  m.classList.toggle('hidden');
  if (!m.classList.contains('hidden')) {
    $('umName').textContent = USER ? USER.nome : '';
    $('umNivel').textContent = (USER ? 'Nível ' + USER.nivel : '');
  }
}

function showLogin() {
  $('app-view').classList.add('hidden');
  $('login-view').classList.remove('hidden');
  resetAuthSteps();
}

function resetAuthSteps() {
  window._pendingName = '';
  $('inputName').value = '';
  $('inputName').classList.remove('hidden');
  $('step-name').classList.remove('hidden');
  $('step-level').classList.add('hidden');
  $('inputName').focus();
}

// ─── TIME (Fuso America/Fortaleza) ─────────────────────────────────────────
// Para projeto estático sem backend, usamos o relógio local convertido
// para o fuso Brasil/Fortaleza (UTC-3). Se CONFIG.useServerTime=true,
// tentamos uma fonte confiável (opcional).
let serverOffset = 0;
let serverNow = null;

async function initClock() {
  if (!CONFIG.useServerTime) return;
  try {
    const r = await fetch('https://worldtimeapi.org/api/timezone/America/Fortaleza').then(res => res.json());
    if (r && r.unixtime) {
      serverOfffet = r.unixtime * 1000 - Date.now();
      serverNow = r.datetime;
    }
  } catch(e) { /* usa relógio local */ }
}

function nowInFortaleza() {
  if (serverNow) {
    // usa tempo do servidor se disponível
    return new Date(Date.now() + serverOffset);
  }
  // converte horário local para UTC-3 (Fortaleza)
  const local = new Date();
  // offset local em minutos (negativo para oeste)
  const offsetLocalMin = -local.getTimezoneOffset();
  const targetOffsetMin = -180; // UTC-3
  const diffMin = targetOffsetMin - offsetLocalMin;
  return new Date(local.getTime() + diffMin * 60000);
}

function parseDataLiberacao(str) {
  // "2026-09-01T06:00:00" já é UTC-3 (interpretar como horário de Fortaleza)
  const [d, t] = str.split('T');
  const [y, m, day] = d.split('-').map(Number);
  const [hh, mm, ss] = t.split(':').map(Number);
  return new Date(y, m - 1, day, hh, mm, ss);
}

// ─── UI NAVIGATION ─────────────────────────────────────────────────────────
function navigate(screen) {
  currentScreen = screen;
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.toggle('active', b.dataset.nav === screen));
  $('userMenu').classList.add('hidden');
  const main = $('main-content');
  main.className = 'fade-in';
  window.scrollTo(0, 0);

  if (!USER) { showLogin(); return; }

  switch(screen) {
    case 'dashboard': renderDashboard(main); break;
    case 'simulados': renderSimulados(main); break;
    case 'quiz': renderQuiz(main); break;
    case 'result': renderResult(main); break;
    case 'conteudos': renderConteudos(main); break;
    case 'ranking': renderRanking(main); break;
    case 'progress': renderProgress(main); break;
    default: renderDashboard(main);
  }
}

function updateHeader() {
  if (!USER) return;
  const streak = computeStreak();
  const el = $('hdrStreak');
  if (el) el.textContent = streak;
}

// ─── STREAK ────────────────────────────────────────────────────────────────
function computeStreak() {
  // sequência de dias com resultado
  if (!RESULTS || RESULTS.length === 0) return 0;
  const days = RESULTS.map(r => r.dia).sort((a,b)=>a-b);
  // vamos considerar sequência até hoje
  const today = nowInFortaleza();
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const expectedDia = today.getDate() - streak;
    if (days[i] === expectedDia) streak++;
    else break;
  }
  return streak;
}

// ─── SIMULADOS ─────────────────────────────────────────────────────────────
function getSimuladosNivel(nivel) {
  return SIMULADOS.filter(s => s.nivel === nivel).sort((a,b)=>a.dia-b.dia);
}

function isSimuladosLiberado(sim) {
  const now = nowInFortaleza();
  const lib = parseDataLiberacao(sim.dataLiberacao);
  return now >= lib;
}

function getSimuladoState(sim) {
  // 'available' | 'locked' | 'done'
  const done = RESULTS.find(r => r.numero === sim.numero);
  if (done) return 'done';
  return isSimuladosLiberado(sim) ? 'available' : 'locked';
}

function getNextLocked(simulados) {
  const now = nowInFortaleza();
  return simulados.filter(s => s.dia >= firstOfToday(now)).find(s => !isSimuladosLiberado(s));
}

function firstOfToday(now) {
  // retorna o dia (número) que deveria estar liberado hoje
  return now.getDate();
}

function formatCountdown(ms) {
  if (ms <= 0) return "LIBERADO!";
  const seg = Math.floor(ms / 1000);
  const d = Math.floor(seg / 86400);
  const h = Math.floor((seg % 86400) / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = seg % 60;
  if (d > 0) return `${d}d ${pad2(h)}h ${pad2(m)}min`;
  if (h > 0) return `${pad2(h)}h ${pad2(m)}min ${pad2(s)}s`;
  if (m > 0) return `${pad2(m)}min ${pad2(s)}s`;
  return `${pad2(s)}s`;
}

// Timer global que atualiza countdowns
function startCountdownLoop() {
  if (quizTimer) clearInterval(quizTimer);
  quizTimer = setInterval(() => {
    if (currentScreen === 'simulados') {
      updateSimuladosCountdowns();
    } else if (currentScreen === 'dashboard') {
      updateNextSimCountdown();
    }
  }, 1000);
}

function updateSimuladosCountdowns() {
  const now = nowInFortaleza();
  document.querySelectorAll('[data-countdown]').forEach(el => {
    const lib = parseDataLiberacao(el.dataset.countdown);
    const diff = lib - now;
    el.textContent = "LIBERA EM " + formatCountdown(diff);
    if (diff <= 0) {
      // precisa desbloquear — re-render se ainda estiver na tela
      if (currentScreen === 'simulados') renderSimulados($('main-content'));
    }
  });
}

function updateNextSimCountdown() {
  const el = $('nextSimCountdown');
  if (!el) return;
  const now = nowInFortaleza();
  const sims = getSimuladosNivel(USER.nivel);
  const nxt = getNextLocked(sims);
  if (!nxt) { el.textContent = "🎉 Todos liberados!"; return; }
  const diff = parseDataLiberacao(nxt.dataLiberacao) - now;
  el.textContent = formatCountdown(diff);
}

// ─── RENDER: DASHBOARD ─────────────────────────────────────────────────────
function renderDashboard(main) {
  const sims = getSimuladosNivel(USER.nivel);
  const state = sims.map(s => getSimuladoState(s));
  const available = state.filter(s => s === 'available').length;
  const done = state.filter(s => s === 'done').length;
  const progressTotal = sims.length;
  const progressPct = progressTotal > 0 ? Math.round((done / progressTotal) * 100) : 0;

  // próximos 3 simulados
  const nextSims = sims.slice(0, 3);
  const nxt = getNextLocked(sims);
  const nxtDate = nxt ? parseDataLiberacao(nxt.dataLiberacao) : null;

  main.innerHTML = `
    <div class="dash-hero">
      <h1>Olá, ${USER.nome.split(' ')[0]}! 👋</h1>
      <div class="dash-nivel">Nível ${USER.nivel} · ${USER.nivel === 1 ? '6º e 7º ano' : '8º e 9º ano'}</div>
      <div class="section-title" style="font-size:14px;justify-content:center;margin-bottom:6px">Seu progresso</div>
      <div class="progress-bar-track" style="max-width:280px;margin:0 auto 6px">
        <div class="progress-bar-fill" style="width:${progressPct}%;background:var(--green)"></div>
      </div>
      <div style="font-size:12px;color:var(--muted);font-weight:700">${done}/${progressTotal} simulados concluídos (${progressPct}%)</div>
    </div>

    <div class="stat-row">
      <div class="stat-box"><div class="sb-icon">📝</div><div class="sb-val">${done}</div><div class="sb-lbl">Feitos</div></div>
      <div class="stat-box"><div class="sb-icon">📈</div><div class="sb-val">${avgNote()} <small style="font-size:12px">/10</small></div><div class="sb-lbl">Média</div></div>
      <div class="stat-box"><div class="sb-icon">🔥</div><div class="sb-val">${computeStreak()}</div><div class="sb-lbl">Sequência</div></div>
      <div class="stat-box"><div class="sb-icon">✅</div><div class="sb-val">${totalAcertos()}</div><div class="sb-lbl">Acertos</div></div>
    </div>

    <div class="section">
      <h2 class="section-title">🕐 Próximo simulado</h2>
      ${nxtDate ? `
        <div class="next-sim-card">
          <div class="ns-title">Simulado ${String(nxt.dia).padStart(2,'0')} — libera em:</div>
          <div id="nextSimCountdown">${formatCountdown(parseDataLiberacao(nxt.dataLiberacao) - nowInFortaleza())}</div>
        </div>
      ` : `
        <div class="next-sim-card">
          <div class="ns-title">🎉 Todos os simulados da campanha foram liberados!</div>
        </div>
      `}
    </div>

    <div class="section">
      <h2 class="section-title">📝 Simulados</h2>
      <div class="sim-list">
        ${nextSims.map(s => {
          const st = getSimuladoState(s);
          return simCardHTML(s, st);
        }).join('')}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🚀 Acesso rápido</h2>
      <div class="quick-grid">
        <a class="quick-btn" onclick="navigate('conteudos')"><div class="qb-icon">📚</div><div class="qb-label">Conteúdos</div></a>
        <a class="quick-btn" onclick="navigate('simulados')"><div class="qb-icon">📝</div><div class="qb-label">Simulados</div></a>
        <a class="quick-btn" onclick="navigate('ranking')"><div class="qb-icon">🏆</div><div class="qb-label">Ranking</div></a>
        <a class="quick-btn" onclick="navigate('progress')"><div class="qb-icon">📊</div><div class="qb-label">Desempenho</div></a>
      </div>
    </div>
  `;
}

function avgNote() {
  if (!RESULTS.length) return '0.0';
  const total = RESULTS.reduce((s, r) => s + r.nota, 0);
  return (total / RESULTS.length).toFixed(1);
}

function totalAcertos() {
  return RESULTS.reduce((s, r) => s + r.corretas, 0);
}

// ─── RENDER: SIMULADOS ─────────────────────────────────────────────────────
function renderSimulados(main) {
  const sims = getSimuladosNivel(USER.nivel);

  main.innerHTML = `
    <div class="section">
      <h2 class="section-title">📝 Simulados — Nível ${USER.nivel}</h2>
      <p class="section-sub">1 simulado liberado por dia, de 01/09 a 10/09.</p>
      <div class="sim-list">
        ${sims.map(s => {
          const st = getSimuladoState(s);
          return simCardHTML(s, st);
        }).join('')}
      </div>
    </div>
  `;
}

function simCardHTML(sim, st) {
  const letters = ['available', 'locked', 'done'];
  const icon = st === 'done' ? '✅' : st === 'available' ? '▶️' : '🔒';
  const badgeClass = st === 'available' ? 'ss-avail' : st === 'locked' ? 'ss-locked' : 'ss-done';
  const badgeText = st === 'done' ? 'CONCLUÍDO' : st === 'available' ? 'DISPONÍVEL' : 'BLOQUEADO';
  const dataStr = formatData(sim.dataLiberacao);
  const num = pad2(sumero(sim));
  let statusExtra = '';

  if (st === 'locked') {
    const diff = parseDataLiberacao(sim.dataLiberacao) - nowInFortaleza();
    statusExtra = `<div class="sim-countdown" data-countdown="${sim.dataLiberacao}">LIBERA EM ${formatCountdown(diff)}</div>`;
  } else if (st === 'available') {
    statusExtra = `<div class="sim-action">Fazer simulado ›</div>`;
  }

  const onClick = st === 'available' ? `onclick="startSimulado(${sim.numero})"` : '';

  return `
    <div class="sim-card ${st}" ${onClick}>
      <span class="sim-icon">${icon}</span>
      <div class="sim-info">
        <div class="sim-num">Simulado ${num}</div>
        <div class="sim-meta">${sim.questoes.length} questões · liberado ${dataStr}</div>
        ${st === 'locked' ? statusExtra : ''}
      </div>
      <div class="sim-status">
        <span class="ss-badge ${badgeClass}">${badgeText}</span>
        ${st === 'available' ? statusExtra : ''}
      </div>
    </div>
  `;
}

function sumero(sim) {
  // número exibido: 01..10 por nível
  return sim.dia;
}

function formatData(dataLiberacao) {
  const d = parseDataLiberacao(dataLiberacao);
  return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1);
}

// ─── RENDER: QUIZ ──────────────────────────────────────────────────────────
function startSimulado(numero) {
  const sim = SIMULADOS.find(s => s.numero === numero);
  if (!sim) return;
  if (!isSimuladosLiberado(sim)) { alert('Este simulado ainda não foi liberado.'); return; }

  // verifica se já foi feito — permite refazer? Vamos permitir refazer, mas guarda melhor nota
  quiz = {
    numero: sim.numero,
    dia: sim.dia,
    nivel: sim.nivel,
    questoes: sim.questoes.map(q => ({ ...q })),
    current: 0,
    respostas: [],  // { indiceQuestao, respostaEscolhida }
    corretas: 0,
    finalized: false,
  };
  quiz.feedback = null;
  // salvar progresso em andamento
  localStorage.setItem(LS_KEYS.quiz, JSON.stringify(quiz));
  navigate('quiz');
}

// corrige: flashcards do quiz — PRÓXIMA, navegação, persistência
function renderQuiz(main) {
  if (!quiz) { navigate('simulados'); return; }

  const total = quiz.questoes.length;
  const q = quiz.questoes[quiz.current];
  const jaRespondida = quiz.respostas[quiz.current] !== undefined;
  const escolhida = jaRespondida ? quiz.respostas[quiz.current] : -1;

  main.innerHTML = `
    <span class="back-link" onclick="confirmExitQuiz()">← Sair do simulado</span>
    <div class="quiz-head">
      <div class="quiz-head-top">
        <span class="q-counter">QUESTÃO ${quiz.current + 1} DE ${total}</span>
        <span class="badge-green">Simulado ${pad2(quiz.dia)}</span>
      </div>
      <div class="q-progress-bar">
        <div class="q-progress-fill" style="width:${((quiz.current + 1) / total) * 100}%"></div>
      </div>
      <div class="q-dots">
        ${quiz.questoes.map((qq, i) => {
          const resp = quiz.respostas[i];
          let cls = '';
          if (i === quiz.current) cls = 'current';
          else if (resp !== undefined) {
            if (quiz.finalized) {
              cls = resp === qq.answer ? 'correct' : 'wrong';
            } else {
              cls = 'answered';
            }
          }
          return `<span class="q-dot ${cls}" onclick="gotoQuizQuestion(${i})">${i + 1}</span>`;
        }).join('')}
      </div>
    </div>

    <span class="q-tema">${q.tema}</span>
    <div class="q-prompt">${q.prompt}</div>

    <div class="q-options">
      ${q.options.map((opt, idx) => {
        let cls = '';
        if (jaRespondida) {
          if (idx === q.answer) cls = 'correct';
          if (idx === escolhida && escolhida !== q.answer) cls = 'wrong';
        } else if (idx === escolhida) cls = 'selected';
        const disabled = jaRespondida ? 'disabled' : '';
        return `<button class="q-opt ${cls} ${disabled}" data-i="${idx}" onclick="selectQuizOption(${idx})">` +
               `<span class="letter">${opt.charAt(0)}</span><span>${opt.slice(3)}</span></button>`;
      }).join('')}
    </div>

    <div id="quizFeedbackArea">${quiz.feedback ? quizFeedbackHTML(quiz.feedback) : ''}</div>

    <div class="q-actions">
      ${quiz.current > 0 ? `<button class="btn btn-o btn-sm" onclick="gotoQuizQuestion(${quiz.current - 1})">← Anterior</button>` : ''}
      ${!jaRespondida
        ? `<button class="btn btn-g btn-sm" id="btnConfirm" onclick="confirmQuizAnswer()" disabled>Confirmar</button>`
        : (quiz.current < total - 1
          ? `<button class="btn btn-b btn-sm" onclick="gotoQuizQuestion(${quiz.current + 1})">Próxima →</button>`
          : `<button class="btn btn-g btn-sm" onclick="finalizeQuiz()">Finalizar simulado</button>`)}
    </div>
  `;
}

function selectQuizOption(idx) {
  if (!quiz) return;
  if (quiz.respostas[quiz.current] !== undefined) return; // já respondida
  // atualiza seleção visual
  document.querySelectorAll('.q-opt').forEach(b => {
    b.classList.toggle('selected', parseInt(b.dataset.i) === idx);
  });
  // habilita botão confirmar
  const btn = $('btnConfirm');
  if (btn) btn.disabled = false;
  window._selPreview = idx;
}

function quizFeedbackHTML(fb) {
  if (fb.correct) {
    return `<div class="q-feedback correct">✅ Correto!${fb.explanation ? `<div class="fb-expl">${fb.explanation}</div>` : ''}</div>`;
  }
  return `<div class="q-feedback wrong">❌ Incorreto. Resposta correta: ${fb.correctOption}${fb.explanation ? `<div class="fb-expl">${fb.explanation}</div>` : ''}
    ${fb.chosenOption ? `<div class="fb-wrong-msg">Você marcou "${fb.chosenOption}". Revise e preste atenção.</div>` : ''}
  </div>`;
}

function confirmQuizAnswer() {
  if (!quiz) return;
  const idx = window._selPreview;
  if (idx === undefined) return;

  const q = quiz.questoes[quiz.current];
  quiz.respostas[quiz.current] = idx;

  if (idx === q.answer) {
    quiz.corretas = (quiz.corretas || 0) + 1;
    quiz.feedback = { correct: true, explanation: q.explanation };
  } else {
    quiz.feedback = {
      correct: false,
      explanation: q.explanation,
      correctOption: q.options[q.answer] ? q.options[q.answer].slice(3) : '',
      chosenOption: q.options[idx] ? q.options[idx].slice(3) : '',
    };
  }

  window._selPreview = undefined;
  saveQuizProgress();
  renderQuiz($('main-content'));
}

function gotoQuizQuestion(idx) {
  if (!quiz) return;
  if (idx < 0 || idx >= quiz.questoes.length) return;
  quiz.current = idx;
  // feedback é relativo à questão atual: se já respondida, guarda; senão limpa
  const r = quiz.respostas[idx];
  if (r === undefined) {
    quiz.feedback = null;
    window._selPreview = undefined;
  } else {
    window._selPreview = r;
    // regenera feedback da questão visitada
    const q = quiz.questoes[idx];
    if (r === q.answer) quiz.feedback = { correct: true, explanation: q.explanation };
    else quiz.feedback = {
      correct: false,
      explanation: q.explanation,
      correctOption: q.options[q.answer] ? q.options[q.answer].slice(3) : '',
      chosenOption: q.options[r] ? q.options[r].slice(3) : '',
    };
  }
  saveQuizProgress();
  renderQuiz($('main-content'));
  window.scrollTo(0, 0);
}

function confirmExitQuiz() {
  if (confirm('Deseja sair do simulado? Seu progresso será perdido.')) {
    localStorage.removeItem(LS_KEYS.quiz);
    quiz = null;
    navigate('simulados');
  }
}

function saveQuizProgress() {
  if (quiz) localStorage.setItem(LS_KEYS.quiz, JSON.stringify(quiz));
}

// auto-salvar (fictício para compatibilidade)

// ─── FINALIZAÇÃO ───────────────────────────────────────────────────────────
function finalizeQuiz() {
  if (!quiz) return;
  if (quiz.finalized) return;

  // força todas respondidas? Se não, avisa em branco
  const total = quiz.questoes.length;
  const respondidas = quiz.respostas.filter(r => r !== undefined).length;
  if (respondidas < total) {
    if (!confirm('Você ainda não respondeu ' + (total - respondidas) + ' questão(ões). Finalizar mesmo assim?')) return;
  }

  quiz.finalized = true;

  // recalcular corretas com base nas respostas (parcial)
  let corretas = 0;
  quiz.questoes.forEach((q, i) => {
    const r = quiz.respostas[i];
    if (r === q.answer) corretas++;
  });
  quiz.corretas = corretas;

  // nota 0-10
  const nota = total > 0 ? Math.round((corretas / total) * CONFIG.escalaNota * 10) / 10 : 0;

  // código de autenticação
  const codigo = generateAuthenticationCode(USER.nome, nota, quiz.dia, quiz.numero);

  const dataStr = ISOData(nowInFortaleza());

  const result = {
    numero: quiz.numero,
    dia: quiz.dia,
    nivel: quiz.nivel,
    nota,
    corretas,
    total,
    percentual: Math.round((corretas / total) * 100),
    data: dataStr,
    codigo,
  };

  // adiciona ao histórico (guarda melhor nota por simulado)
  const idxExiste = RESULTS.findIndex(r => r.numero === quiz.numero);
  if (idxExiste >= 0) {
    if (RESULTS[idxExiste].corretas < corretas) RESULTS[idxExiste] = result;
  } else {
    RESULTS.push(result);
  }
  RESULTS.sort((a, b) => a.dia - b.dia);
  saveResults();

  // remove quiz em andamento
  localStorage.removeItem(LS_KEYS.quiz);
  quiz = null;

  window._lastResult = result;
  navigate('result');
  updateHeader();
}

function ISOData(d) {
  return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
}

// ─── CÓDIGO DE AUTENTICAÇÃO ────────────────────────────────────────────────
function generateAuthenticationCode(nome, nota, dia, numeroSimulado) {
  // Fórmula: {nomeNormalizado}{nota*diadaaplicacao}ns{numeroSimulado}
  // nota em escala 0-100 (multiplicada por 10) para evitar vírgulas no código
  const nomeNorm = normalizeForCode(nome);
  const notaInt = Math.round(nota * 10); // 0-100
  const mult = notaInt * dia;
  return nomeNorm + '{' + mult + '}ns' + numeroSimulado;
}

// ─── RENDER: RESULT ────────────────────────────────────────────────────────
function renderResult(main) {
  const r = window._lastResult;
  if (!r) { navigate('simulados'); return; }

  let emoji, msg;
  const pct = r.percentual;
  if (pct >= 90) { emoji = '🏆'; msg = 'Excelente! Você está pronto para a OLITEF!'; }
  else if (pct >= 70) { emoji = '🎉'; msg = 'Muito bem! Continue assim!'; }
  else if (pct >= 50) { emoji = '💪'; msg = 'Bom esforço! Revise o conteúdo e tente melhorar amanhã.'; }
  else { emoji = '📚'; msg = 'Não desista! Leia os conteúdos e volte a praticar.'; }

  main.innerHTML = `
    <div class="result-card">
      <div class="result-emoji">${emoji}</div>
      <h2>Simulado concluído!</h2>
      <div class="rc-sub">${USER.nome} · Simulado ${String(r.dia).padStart(2,'0')} · Nível ${r.nivel}</div>
      <div class="result-big-note">${notaFormat(r.nota)}<small>/10</small></div>
      <div class="result-stats">
        <div class="rs-item"><div class="rs-val">${r.corretas}/${r.total}</div><div class="rs-lbl">Acertos</div></div>
        <div class="rs-item"><div class="rs-val">${r.percentual}%</div><div class="rs-lbl">Percentual</div></div>
        <div class="rs-item"><div class="rs-val">${String(r.data).slice(8,10)}/09</div><div class="rs-lbl">Data</div></div>
      </div>
      <div class="result-msg">${msg}</div>
    </div>

    <div class="code-box">
      <div class="cb-title">🔐 Seu código de autenticação</div>
      <div id="authCode">${r.codigo}</div>
      <button class="btn btn-y btn-sm btn-full" onclick="copyAuthCode()">📋 Copiar código</button>
      <div class="freq-note">Guarde este código. Ele será utilizado para registrar sua participação.</div>
    </div>

    <div class="section" style="text-align:center">
      <div class="freq-note" style="font-weight:800;color:var(--text)">REGISTRE SUA PARTICIPAÇÃO</div>
      <div class="freq-note">Copie seu código e informe-o no formulário de frequência.</div>
      <button class="btn btn-g btn-full" onclick="openFrequencia()">📝 Registrar frequência</button>
    </div>

    <div class="section" style="display:flex;gap:8px">
      <button class="btn btn-b" style="flex:1" onclick="navigate('simulados')">Ver simulados</button>
      <button class="btn btn-o" style="flex:1" onclick="navigate('dashboard')">Voltar</button>
    </div>
  `;
}

function notaFormat(n) {
  return String(n).replace('.', ',');
}

function copyAuthCode() {
  const code = window._lastResult ? window._lastResult.codigo : '';
  const el = $('authCode');
  if (!code) return;
  // fallback para mobile
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => toast('Código copiado!')).catch(() => fallbackCopy(code));
  } else {
    fallbackCopy(code);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); toast('Código copiado!'); }
  catch(e) { prompt('Copie seu código:', text); }
  document.body.removeChild(ta);
}

function openFrequencia() {
  const target = CONFIG.formularioFrequencia;
  window.open(target, '_blank');
}

function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--green);color:#fff;padding:12px 20px;border-radius:20px;font-weight:800;z-index:300;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,.3)';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// ─── RENDER: RANKING ───────────────────────────────────────────────────────
function renderRanking(main) {
  const ranking = RANKING.lista;
  const posEmoji = ['🥇','🥈','🥉'];

  main.innerHTML = `
    <div class="section">
      <h2 class="section-title">🏆 Ranking</h2>
      <p class="rank-plain">Acompanhe sua posição entre os participantes.</p>
      ${ranking.map(r => {
        const top = r.posicao <= 3;
        return `
          <div class="rank-card ${top ? 'top' + r.posicao : ''}">
            <div class="rank-pos ${top ? 'pos' + r.posicao : 'other'}">${top ? posEmoji[r.posicao-1] : r.posicao + 'º'}</div>
            <div class="rank-name">${r.nome}</div>
            <div class="rank-pont">${r.pontuacao} ${r.pontuacao === 1 ? 'pt' : 'pts'}</div>
          </div>`;
      }).join('')}
      <div class="rank-update">
        <div class="ru-badge">🏆 Ranking atualizado</div><br>
        Última atualização: ${formatDateTime(RANKING.atualizadoEm)}<br>
        Próxima atualização prevista em até 24 horas.
      </div>
    </div>
  `;
}

function formatDateTime(str) {
  if (!str) return '—';
  const d = new Date(str);
  return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + pad2(d.getHours()) + ':' + pad2(d.getMinutes());
}

// ─── RENDER: CONTEÚDOS ─────────────────────────────────────────────────────
function renderConteudos(main) {
  // módulos visíveis para o nível do aluno (definidos em CONTEUDOS_POR_NIVEL)
  const niveis = CONTEUDOS_POR_NIVEL[USER.nivel] || [];
  const mods = MODULES.filter(m => niveis.includes(m.id));
  if (mods.length === 0) {
    main.innerHTML = `
      <div class="section">
        <h2 class="section-title">📚 Conteúdos — Nível ${USER.nivel}</h2>
        <div class="empty-state"><div class="empty-icon">📭</div><p>Nenhum conteúdo disponível para este nível.</p></div>
      </div>`;
    return;
  }

  main.innerHTML = `
    <div class="section">
      <h2 class="section-title">📚 Conteúdos — Nível ${USER.nivel}</h2>
      <p class="section-sub">${USER.nivel === 1 ? 'Conteúdos para 6º e 7º ano' : 'Conteúdos para 8º e 9º ano'}</p>
      <div class="mod-list">
        ${mods.map(m => `
          <div class="mod-card" onclick="renderConteudoLição('${m.id}')">
            <span class="mod-icon">${m.icon}</span>
            <div class="mod-title">
              <h3>${m.title}</h3>
              <p>${m.lessons.length} lições</p>
            </div>
            <span class="mod-arrow">›</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderConteudoLição(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) return;
  const main = $('main-content');
  main.className = 'fade-in';
  window.scrollTo(0,0);
  main.innerHTML = `
    <span class="back-link" onclick="navigate('conteudos')">← Conteúdos</span>
    <div class="section">
      <h2 class="section-title">${m.icon} ${m.title}</h2>
      <div class="sim-list">
        ${m.lessons.map(l => `
          <div class="mod-card" onclick="renderLiçãoDetalhe('${m.id}','${l.id}')">
            <span class="mod-icon">📖</span>
            <div class="mod-title"><h3>${l.title}</h3><p>${l.questions.length} questões</p></div>
            <span class="mod-arrow">›</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderLiçãoDetalhe(moduleId, lessonId) {
  const m = MODULES.find(x => x.id === moduleId);
  const l = m && m.lessons.find(x => x.id === lessonId);
  if (!m || !l) return;
  const s = l.sections;
  const main = $('main-content');
  main.className = 'fade-in';
  window.scrollTo(0,0);
  main.innerHTML = `
    <span class="back-link" onclick="renderConteudoLição('${m.id}')">← ${m.title}</span>
    <div class="section">
      <h2 class="section-title">${l.title}</h2>
      <div class="section-sub">${m.icon} ${m.title}</div>

      <div class="card" style="margin-bottom:12px"><strong>📖 O que é?</strong><p style="margin-top:6px;color:var(--muted)">${s.oQueE}</p></div>
      <div class="card" style="margin-bottom:12px"><strong>🎯 Por que importa?</strong><p style="margin-top:6px;color:var(--muted)">${s.porQueImporta}</p></div>
      <div class="card" style="margin-bottom:12px"><strong>⚙️ Como funciona?</strong><p style="margin-top:6px;color:var(--muted);white-space:pre-line">${s.comoFunciona}</p></div>
      ${s.formula ? `<div class="card" style="margin-bottom:12px;border-color:var(--yellow)"><strong>📐 Fórmula</strong><p style="margin-top:6px;color:var(--yellow);font-weight:700;white-space:pre-line">${s.formula}</p></div>` : ''}
      ${s.exemplo ? `<div class="card" style="margin-bottom:12px;border-color:var(--blue)"><strong>📝 Exemplo</strong><p style="margin-top:6px;color:var(--muted);white-space:pre-line">${s.exemplo.texto}</p></div>` : ''}
      ${s.pegadinha ? `<div class="card" style="margin-bottom:12px;border-color:var(--red)"><strong>⚠️ Pegadinha</strong><p style="margin-top:6px;color:var(--red)">${s.pegadinha}</p></div>` : ''}
      ${s.resumo ? `<div class="card" style="margin-bottom:12px;border-color:var(--green)"><strong>✅ Resumo</strong><p style="margin-top:6px;color:var(--green);font-weight:700">${s.resumo}</p></div>` : ''}

      <button class="btn btn-g btn-full" onclick="startLessonReview('${moduleId}','${lessonId}')">🎯 Praticar este conteúdo</button>
    </div>
  `;
}

// ─── RENDER: PROGRESS ──────────────────────────────────────────────────────
function renderProgress(main) {
  const sims = getSimuladosNivel(USER.nivel);
  const done = RESULTS.filter(r => r.nivel === USER.nivel);
  const pct = sims.length ? Math.round((done.length / sims.length) * 100) : 0;
  const avg = avgNote();
  const acertos = totalAcertos();

  main.innerHTML = `
    <div class="section">
      <h2 class="section-title">📊 Meu Desempenho</h2>
      <p class="section-sub">${USER.nome} · Nível ${USER.nivel}</p>
      <div class="stat-row">
        <div class="stat-box"><div class="sb-icon">📝</div><div class="sb-val">${done.length}/${sims.length}</div><div class="sb-lbl">Simulados</div></div>
        <div class="stat-box"><div class="sb-icon">📈</div><div class="sb-val">${avg}</div><div class="sb-lbl">Média</div></div>
        <div class="stat-box"><div class="sb-icon">✅</div><div class="sb-val">${acertos}</div><div class="sb-lbl">Acertos</div></div>
        <div class="stat-box"><div class="sb-icon">🔥</div><div class="sb-val">${computeStreak()}</div><div class="sb-lbl">Sequência</div></div>
      </div>

      <h2 class="section-title" style="margin-top:20px">Progresso geral</h2>
      <div class="card">
        <div class="progress-bar-track"><div class="progress-bar-fill" style="width:${pct}%;background:var(--green)"></div></div>
        <div style="font-size:12px;color:var(--muted);font-weight:700;margin-top:6px">${pct}% concluído</div>
      </div>

      <h2 class="section-title" style="margin-top:20px">Histórico de simulados</h2>
      ${done.length === 0 ? `
        <div class="empty-state"><div class="empty-icon">📭</div><p>Você ainda não fez nenhum simulado.<br>Vamos começar?</p></div>
      ` : `
        <div>
          ${done.map(r => `
            <div class="hist-item">
              <div class="hi-info">Simulado ${String(r.dia).padStart(2,'0')} · ${r.data}<br><span style="color:var(--muted)">${r.corretas}/${r.total} acertos · ${r.percentual}%</span></div>
              <div class="hi-note">${notaFormat(r.nota)}</div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// ─── REVISÃO DE CONTEÚDO (questões do data.js) ─────────────────────────────
function startLessonReview(moduleId, lessonId) {
  const m = MODULES.find(x => x.id === moduleId);
  const l = m && m.lessons.find(x => x.id === lessonId);
  if (!m || !l) return;

  quiz = {
    numero: 'L-' + lessonId,
    dia: 0,
    nivel: USER.nivel,
    questoes: l.questions.map(q => ({
      prompt: q.prompt,
      options: q.options.map((o, i) => letters[i] + ') ' + o),
      answer: q.answer,
      explanation: q.explanation,
      tema: l.title
    })),
    current: 0,
    respostas: [],
    corretas: 0,
    finalized: false,
    isReview: true,
  };
  navigate('quiz');
}

const letters = ['A','B','C','D','E'];

// ─── INIT ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setAuthEscola();
  load();
  $('inputName').addEventListener('input', (e) => {
    $('btnNameNext').disabled = normalizeName(e.target.value).length < 2;
  });
  $('inputName').addEventListener('keydown', (e) => { if (e.key === 'Enter') nextNameStep(); });

  initClock().then(() => {
    if (USER) {
      $('login-view').classList.add('hidden');
      $('app-view').classList.remove('hidden');
      $('hdrNivel').textContent = 'Nível ' + USER.nivel;
      $('avatarBtn').textContent = USER.nome.charAt(0).toUpperCase();
      updateHeader();
      navigate('dashboard');
    } else {
      $('inputName').focus();
    }
    startCountdownLoop();
  });
});
