// ═══════════════════════════════════════════════════════════════════════════
// OLITEF 2026 — App Principal
// Navegação, Quiz Adaptativo, Progresso, Revisão
// ═══════════════════════════════════════════════════════════════════════════

// ─── STATE ────────────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  xp: 0,
  stars: 0,
  quizzesDone: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  lessonsCompleted: [],
  lessonQuestions: {},
  moduleProgress: {},
  contentMastery: {},
  questionHistory: {},
  streak: 0,
  lastStudyDate: null,
};

let S = { ...DEFAULT_STATE };
let currentScreen = 'dashboard';
let quizState = null;

function load() {
  try {
    const d = JSON.parse(localStorage.getItem('olitef2026v2'));
    if (d) S = { ...DEFAULT_STATE, ...d };
  } catch (e) {}
  updateStreak();
  updateHeader();
}

function save() {
  localStorage.setItem('olitef2026v2', JSON.stringify(S));
}

function updateStreak() {
  const today = new Date().toDateString();
  if (S.lastStudyDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (S.lastStudyDate === yesterday) {
    S.streak++;
  } else if (S.lastStudyDate !== today) {
    S.streak = S.lastStudyDate ? 0 : 1;
  }
  S.lastStudyDate = today;
  save();
}

function addXP(amount) {
  S.xp += amount;
  if (S.xp >= S.stars * 100 + 100) {
    S.stars++;
  }
  updateHeader();
  save();
}

function updateHeader() {
  document.getElementById('hdrXP').textContent = S.xp;
  document.getElementById('hdrStars').textContent = S.stars;
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────
function navigate(screen, data) {
  currentScreen = screen;
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.toggle('active', b.dataset.nav === screen));
  const main = document.getElementById('main-content');
  main.className = 'fade-in';
  window.scrollTo(0, 0);

  switch (screen) {
    case 'dashboard': renderDashboard(main); break;
    case 'modules': renderModules(main); break;
    case 'module': renderModuleDetail(main, data); break;
    case 'lesson': renderLessonDetail(main, data); break;
    case 'quiz': renderQuizSelect(main, data); break;
    case 'quiz-active': renderQuizActive(main); break;
    case 'quiz-results': renderQuizResults(main); break;
    case 'review': renderReview(main); break;
    case 'progress': renderProgress(main); break;
  }
}

// ─── HELPERS ──────────────────────────────────────────────────────────────
function getModule(id) { return MODULES.find(m => m.id === id); }
function getLesson(moduleId, lessonId) {
  const m = getModule(moduleId);
  return m ? m.lessons.find(l => l.id === lessonId) : null;
}

function getLessonProgress(lessonId) {
  return S.lessonQuestions[lessonId] || { correct: 0, total: 0, attempts: [] };
}

function getModuleProgress(moduleId) {
  const m = getModule(moduleId);
  if (!m) return 0;
  let total = 0, done = 0;
  m.lessons.forEach(l => {
    total++;
    if (S.lessonsCompleted.includes(l.id)) done++;
  });
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

function getMastery(topic) {
  const m = S.contentMastery[topic];
  if (!m) return 0;
  if (m.total < 1) return 0;
  const raw = (m.correct / m.total) * 100;
  const difficultyBonus = (m.hardCorrect / Math.max(m.hardTotal, 1)) * 10;
  const recencyBonus = m.recentCorrect / Math.max(m.recentTotal, 1) * 15;
  return Math.min(100, Math.round(raw * 0.7 + difficultyBonus + recencyBonus));
}

function getDifficultyLabel(d) {
  return ['', 'Fácil', 'Médio', 'Difícil', 'Desafio OLITEF'][d] || 'Médio';
}

function getDifficultyClass(d) {
  return 'd' + Math.min(d, 4);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pctColor(pct) {
  if (pct >= 70) return 'var(--green)';
  if (pct >= 40) return 'var(--yellow)';
  return 'var(--red)';
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────
function renderDashboard(el) {
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = S.lessonsCompleted.length;
  const accuracy = S.totalAnswered > 0 ? Math.round((S.totalCorrect / S.totalAnswered) * 100) : 0;
  const avgMastery = getAverageMastery();

  const recs = getRecommendations();

  el.innerHTML = `
    <div class="dash-hero">
      <h1>Olá! 🦉</h1>
      <p>Escola Aniceto Teixeira — OLITEF 2026</p>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-val">${completedLessons}/${totalLessons}</div><div class="stat-lbl">Lições</div></div>
        <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-val">${accuracy}%</div><div class="stat-lbl">Acerto</div></div>
        <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-val">${avgMastery}%</div><div class="stat-lbl">Domínio</div></div>
        <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-val">${S.streak}</div><div class="stat-lbl">Sequência</div></div>
        <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-val">${S.totalAnswered}</div><div class="stat-lbl">Questões</div></div>
        <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-val">${S.xp}</div><div class="stat-lbl">XP</div></div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📋 O que estudar agora</h2>
      <p class="section-sub">Baseado no seu desempenho</p>
      <div class="rec-list">
        ${recs.map((r, i) => `
          <div class="rec-item" onclick="${r.action}">
            <span class="rec-num">${i + 1}</span>
            <div>
              <div class="rec-text">${r.text}</div>
              <div class="rec-type">${r.type}</div>
            </div>
          </div>
        `).join('')}
        ${recs.length === 0 ? '<div class="empty-state"><div class="empty-icon">🎉</div><p>Comece estudando um módulo!</p></div>' : ''}
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">📊 Módulos</h2>
      <div class="mod-grid">
        ${MODULES.map(m => {
          const pct = getModuleProgress(m.id);
          return `
            <div class="mod-card" onclick="navigate('module','${m.id}')">
              <span class="mod-icon">${m.icon}</span>
              <div class="mod-info">
                <h3>${m.title}</h3>
                <p>${m.lessons.length} lições</p>
                <div class="mod-progress"><div class="mod-progress-fill" style="width:${pct}%;background:${m.color}"></div></div>
              </div>
              <span class="mod-pct">${pct}%</span>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function getAverageMastery() {
  const topics = Object.keys(S.contentMastery);
  if (topics.length === 0) return 0;
  return Math.round(topics.reduce((s, t) => s + getMastery(t), 0) / topics.length);
}

function getRecommendations() {
  const recs = [];

  MODULES.forEach(m => {
    m.lessons.forEach(l => {
      const mastery = getMastery(l.id);
      const lp = getLessonProgress(l.id);

      if (!S.lessonsCompleted.includes(l.id) && lp.total === 0) {
        recs.push({ text: `Estudar "${l.title}"`, type: m.title, action: `navigate('lesson','${m.id}|${l.id}')`, priority: 3 });
      } else if (mastery < 50 && lp.total > 0) {
        recs.push({ text: `Revisar "${l.title}" (${mastery}% domínio)`, type: m.title + ' — Reforço', action: `startLessonQuiz('${m.id}','${l.id}')`, priority: 1 });
      } else if (mastery >= 50 && mastery < 80 && lp.total > 0) {
        recs.push({ text: `Praticar "${l.title}" (${mastery}%)`, type: m.title, action: `startLessonQuiz('${m.id}','${l.id}')`, priority: 2 });
      }
    });
  });

  recs.sort((a, b) => a.priority - b.priority);
  return recs.slice(0, 5);
}

// ─── MODULES LIST ─────────────────────────────────────────────────────────
function renderModules(el) {
  el.innerHTML = `
    <div class="section">
      <h2 class="section-title">📚 Conteúdos</h2>
      <p class="section-sub">Escolha um módulo para começar</p>
      <div class="mod-grid">
        ${MODULES.map(m => {
          const pct = getModuleProgress(m.id);
          const totalQ = m.lessons.reduce((s, l) => s + l.questions.length, 0);
          return `
            <div class="mod-card" onclick="navigate('module','${m.id}')">
              <span class="mod-icon">${m.icon}</span>
              <div class="mod-info">
                <h3>${m.title}</h3>
                <p>${m.lessons.length} lições · ${totalQ} questões</p>
                <div class="mod-progress"><div class="mod-progress-fill" style="width:${pct}%;background:${m.color}"></div></div>
              </div>
              <span class="mod-pct">${pct}%</span>
            </div>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ─── MODULE DETAIL ────────────────────────────────────────────────────────
function renderModuleDetail(el, moduleId) {
  const m = getModule(moduleId);
  if (!m) return navigate('modules');

  el.innerHTML = `
    <span class="back-link" onclick="navigate('modules')">← Voltar</span>
    <div class="section">
      <h2 class="section-title">${m.icon} ${m.title}</h2>
      <p class="section-sub">${m.lessons.length} lições</p>
      <div class="lesson-list">
        ${m.lessons.map((l, i) => {
          const done = S.lessonsCompleted.includes(l.id);
          const lp = getLessonProgress(l.id);
          const mastery = getMastery(l.id);
          return `
            <div class="lesson-item" onclick="navigate('lesson','${m.id}|${l.id}')">
              <div class="lesson-check ${done ? 'done' : (lp.total > 0 ? 'in-progress' : '')}">
                ${done ? '✓' : (i + 1)}
              </div>
              <div style="flex:1">
                <div class="lesson-title">${l.title}</div>
                ${lp.total > 0 ? `<div style="font-size:11px;color:var(--muted)">${lp.correct}/${lp.total} acertos · ${mastery}% domínio</div>` : ''}
              </div>
              <span class="lesson-arrow">›</span>
            </div>`;
        }).join('')}
      </div>
    </div>
    <button class="btn btn-g btn-full" onclick="startModuleQuiz('${m.id}')">🎯 Praticar este módulo</button>
  `;
}

// ─── LESSON DETAIL ────────────────────────────────────────────────────────
function renderLessonDetail(el, data) {
  const [moduleId, lessonId] = data.split('|');
  const m = getModule(moduleId);
  const l = getLesson(moduleId, lessonId);
  if (!m || !l) return navigate('modules');

  const s = l.sections;
  const mastery = getMastery(lessonId);
  const done = S.lessonsCompleted.includes(lessonId);

  el.innerHTML = `
    <span class="back-link" onclick="navigate('module','${m.id}')">← ${m.title}</span>
    <div class="lesson-hero">
      <span class="tag">${m.icon} ${m.title}</span>
      <h1>${l.title}</h1>
      ${mastery > 0 ? `<p>Domínio: ${mastery}% ${done ? '✓ Concluído' : ''}</p>` : ''}
    </div>

    <div class="content-block">
      <h3>📖 O que é?</h3>
      <p>${s.oQueE}</p>
    </div>

    <div class="content-block">
      <h3>🎯 Por que isso importa?</h3>
      <p>${s.porQueImporta}</p>
    </div>

    <div class="content-block">
      <h3>⚙️ Como funciona?</h3>
      ${s.comoFunciona.split('\n').map(line => `<p>${line}</p>`).join('')}
    </div>

    ${s.formula ? `
      <div class="content-block">
        <h3>📐 Fórmula</h3>
        <div class="formula-box">${s.formula.replace(/\n/g, '<br>')}</div>
      </div>
    ` : ''}

    ${s.exemplo ? `
      <div class="content-block">
        <h3>📝 Exemplo prático</h3>
        <div class="example-box">
          <h4>${s.exemplo.titulo}</h4>
          <p>${s.exemplo.texto.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    ` : ''}

    <div class="content-block">
      <h3>⚠️ Cuidado com a pegadinha</h3>
      <div class="warning-box">${s.pegadinha}</div>
    </div>

    <div class="content-block">
      <h3>✅ Resumo</h3>
      <div class="summary-box">${s.resumo}</div>
    </div>

    <div class="lesson-nav">
      <button class="btn btn-g" onclick="startLessonQuiz('${m.id}','${l.id}')">🎯 Fazer questões (${l.questions.length})</button>
      <button class="btn btn-o" onclick="markLessonComplete('${l.id}')">${done ? '✓ Concluído' : 'Marcar como estudado'}</button>
    </div>
  `;
}

function markLessonComplete(lessonId) {
  if (!S.lessonsCompleted.includes(lessonId)) {
    S.lessonsCompleted.push(lessonId);
    addXP(15);
    save();
  }
  navigate('lesson', currentLessonData);
}

let currentLessonData = '';

const _origNav = navigate;
navigate = function(screen, data) {
  if (screen === 'lesson') currentLessonData = data;
  _origNav(screen, data);
};

// ─── QUIZ SYSTEM ──────────────────────────────────────────────────────────
function renderQuizSelect(el, data) {
  el.innerHTML = `
    <div class="section">
      <h2 class="section-title">🎯 Praticar</h2>
      <p class="section-sub">Escolha o tipo de prática</p>
      <div class="quiz-select">
        <div class="qs-card" onclick="startAdaptiveQuiz()">
          <div class="qs-icon">🧠</div>
          <h3>Adaptativo</h3>
          <p>A IA adapta a dificuldade ao seu desempenho</p>
        </div>
        <div class="qs-card" onclick="startOlitefQuiz()">
          <div class="qs-icon">🦉</div>
          <h3>OLITEF</h3>
          <p>Questões gerais da prova</p>
        </div>
      </div>
    </div>
    <div class="section">
      <h2 class="section-title">📋 Por módulo</h2>
      <div class="mod-grid">
        ${MODULES.map(m => `
          <div class="mod-card" onclick="startModuleQuiz('${m.id}')">
            <span class="mod-icon">${m.icon}</span>
            <div class="mod-info">
              <h3>${m.title}</h3>
              <p>${m.lessons.reduce((s, l) => s + l.questions.length, 0)} questões</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function startLessonQuiz(moduleId, lessonId) {
  const l = getLesson(moduleId, lessonId);
  if (!l || l.questions.length === 0) return;
  quizState = {
    mode: 'lesson',
    moduleId, lessonId,
    questions: shuffle([...l.questions]),
    current: 0,
    selected: null,
    answered: false,
    correct: 0,
    xpEarned: 0,
    hintUsed: false,
    reinforcementQueue: [],
  };
  navigate('quiz-active');
}

function startModuleQuiz(moduleId) {
  const m = getModule(moduleId);
  if (!m) return;
  const allQ = [];
  m.lessons.forEach(l => l.questions.forEach(q => allQ.push({ ...q, lessonId: l.id })));
  quizState = {
    mode: 'module',
    moduleId,
    questions: shuffle(allQ).slice(0, 10),
    current: 0,
    selected: null,
    answered: false,
    correct: 0,
    xpEarned: 0,
    hintUsed: false,
    reinforcementQueue: [],
  };
  navigate('quiz-active');
}

function startAdaptiveQuiz() {
  const allQ = getAllModuleQuestions();
  const adaptive = selectAdaptiveQuestions(allQ, 10);
  quizState = {
    mode: 'adaptive',
    questions: adaptive,
    current: 0,
    selected: null,
    answered: false,
    correct: 0,
    xpEarned: 0,
    hintUsed: false,
    reinforcementQueue: [],
  };
  navigate('quiz-active');
}

function startOlitefQuiz() {
  quizState = {
    mode: 'olitef',
    questions: shuffle([...OLITEF_QUESTIONS]).slice(0, 10),
    current: 0,
    selected: null,
    answered: false,
    correct: 0,
    xpEarned: 0,
    hintUsed: false,
    reinforcementQueue: [],
  };
  navigate('quiz-active');
}

function selectAdaptiveQuestions(pool, count) {
  const weak = pool.filter(q => {
    const m = S.contentMastery[q.lessonId];
    return m && (m.correct / Math.max(m.total, 1)) < 0.6;
  });
  const unseen = pool.filter(q => !S.questionHistory[q.id]);
  const rest = pool;

  const selected = [];
  const used = new Set();

  // 40% weak areas
  const weakCount = Math.min(Math.ceil(count * 0.4), weak.length);
  shuffle(weak).slice(0, weakCount).forEach(q => { if (!used.has(q.id)) { selected.push(q); used.add(q.id); } });

  // 30% unseen
  const unseenCount = Math.min(Math.ceil(count * 0.3), unseen.length);
  shuffle(unseen).filter(q => !used.has(q.id)).slice(0, unseenCount).forEach(q => { selected.push(q); used.add(q.id); });

  // Fill rest randomly
  shuffle(rest).filter(q => !used.has(q.id)).slice(0, count - selected.length).forEach(q => { selected.push(q); used.add(q.id); });

  return shuffle(selected).slice(0, count);
}

// ─── QUIZ ACTIVE ──────────────────────────────────────────────────────────
function renderQuizActive(el) {
  if (!quizState) return navigate('quiz');
  const qs = quizState;
  const total = qs.questions.length;
  const q = qs.current < total ? qs.questions[qs.current] : null;

  if (!q) {
    showQuizResults();
    return;
  }

  const diffLabel = getDifficultyLabel(q.difficulty || 2);
  const diffClass = getDifficultyClass(q.difficulty || 2);
  const letters = ['A', 'B', 'C', 'D', 'E'];

  el.innerHTML = `
    <span class="back-link" onclick="if(confirm('Sair do quiz?'))navigate('quiz')">← Sair</span>
    <div class="quiz-progress">
      <div class="qp-bar"><div class="qp-fill" style="width:${((qs.current / total) * 100)}%"></div></div>
      <div class="qp-info">
        <span>${qs.current + 1} / ${total}</span>
        <span class="qp-diff ${diffClass}">${diffLabel}</span>
      </div>
    </div>

    ${q.prompt ? `<div class="q-prompt">${q.prompt}</div>` : `<div class="q-prompt">${q.title ? q.title + ': ' : ''}${q.prompt || ''}</div>`}

    <div class="q-options">
      ${q.options.map((opt, i) => `
        <button class="q-opt" onclick="selectQuizOption(${i})" data-i="${i}">
          <span class="letter">${letters[i]}</span>
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>

    <div id="quizFeedbackArea"></div>

    <div class="q-actions">
      ${!qs.answered ? `<button class="btn btn-o btn-sm" onclick="showQuizHint()" id="btnHint">💡 Dica</button>` : ''}
      ${!qs.answered ? `<button class="btn btn-g btn-sm" onclick="checkQuizAnswer()" id="btnCheck" disabled>Verificar</button>` : ''}
      ${qs.answered ? `<button class="btn btn-b btn-sm" onclick="nextQuizQuestion()">Continuar</button>` : ''}
    </div>
  `;
}

function selectQuizOption(i) {
  if (!quizState || quizState.answered) return;
  quizState.selected = i;
  document.querySelectorAll('.q-opt').forEach((b, idx) => b.classList.toggle('selected', idx === i));
  const btn = document.getElementById('btnCheck');
  if (btn) btn.disabled = false;
}

function showQuizHint() {
  if (!quizState || quizState.hintUsed) return;
  quizState.hintUsed = true;
  const q = quizState.questions[quizState.current];
  const area = document.getElementById('quizFeedbackArea');
  if (area && q.hint) {
    area.innerHTML = `<div class="q-feedback" style="background:rgba(255,200,0,.06);border:1px solid var(--yellow);color:var(--yellow)">💡 ${q.hint}</div>`;
  }
  const btn = document.getElementById('btnHint');
  if (btn) btn.style.display = 'none';
}

function checkQuizAnswer() {
  if (!quizState || quizState.selected === null || quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  const correct = quizState.selected === q.answer;

  document.querySelectorAll('.q-opt').forEach((b, i) => {
    b.classList.add('disabled');
    if (i === q.answer) b.classList.add('correct');
    if (i === quizState.selected && !correct) b.classList.add('wrong');
  });

  if (correct) {
    quizState.correct++;
    const baseXP = [10, 15, 20, 30][Math.min((q.difficulty || 2) - 1, 3)];
    const xp = quizState.hintUsed ? Math.round(baseXP * 0.7) : baseXP;
    quizState.xpEarned += xp;
    addXP(xp);
  }

  // Update stats
  S.totalAnswered++;
  if (correct) S.totalCorrect++;

  // Update content mastery
  const lessonId = q.lessonId || quizState.lessonId;
  if (lessonId) {
    if (!S.contentMastery[lessonId]) S.contentMastery[lessonId] = { correct: 0, total: 0, hardCorrect: 0, hardTotal: 0, recentCorrect: 0, recentTotal: 0 };
    const cm = S.contentMastery[lessonId];
    cm.total++;
    if (correct) cm.correct++;
    cm.recentTotal++;
    if (correct) cm.recentCorrect++;
    if (q.difficulty >= 3) {
      cm.hardTotal++;
      if (correct) cm.hardCorrect++;
    }
  }

  // Track question
  S.questionHistory[q.id] = { correct, difficulty: q.difficulty, date: Date.now() };

  // Lesson questions tracking
  if (lessonId) {
    if (!S.lessonQuestions[lessonId]) S.lessonQuestions[lessonId] = { correct: 0, total: 0 };
    S.lessonQuestions[lessonId].total++;
    if (correct) S.lessonQuestions[lessonId].correct++;
  }

  // Error analysis + reinforcement
  const area = document.getElementById('quizFeedbackArea');
  let feedbackHTML = `<div class="q-feedback ${correct ? 'correct' : 'wrong'}">`;
  feedbackHTML += correct
    ? `✅ Correto!${quizState.xpEarned > 0 ? ` +${quizState.hintUsed ? Math.round([10,15,20,30][Math.min((q.difficulty||2)-1,3)]*0.7) : [10,15,20,30][Math.min((q.difficulty||2)-1,3)]} XP` : ''}`
    : `❌ Incorreto. Resposta: ${q.options[q.answer]}`;

  if (!correct) {
    const errorAnalysis = generateErrorAnalysis(q, quizState.selected);
    feedbackHTML += `<div class="error-analysis">🤔 ${errorAnalysis}</div>`;
    // Add reinforcement question
    const reinforcement = findReinforcement(q);
    if (reinforcement) {
      quizState.reinforcementQueue.push(reinforcement);
    }
  }

  if (q.explanation) {
    feedbackHTML += `<div class="explanation">${q.explanation}</div>`;
  }
  feedbackHTML += '</div>';

  if (area) area.innerHTML = feedbackHTML;

  save();
  updateHeader();

  // Hide hint/check, show next
  const hintBtn = document.getElementById('btnHint');
  const checkBtn = document.getElementById('btnCheck');
  if (hintBtn) hintBtn.style.display = 'none';
  if (checkBtn) checkBtn.style.display = 'none';
}

function generateErrorAnalysis(q, selectedIdx) {
  if (!q.options) return 'Revise o conteúdo e tente novamente.';
  const wrongAnswer = q.options[selectedIdx];
  const correctAnswer = q.options[q.answer];

  if (q.difficulty <= 1) return `Você selecionou "${wrongAnswer}". Revise o conceito básico e tente uma questão similar.`;
  if (q.difficulty <= 2) return `Cuidado: "${wrongAnswer}" parece plausível, mas ${correctAnswer} é a resposta correta. Revise o raciocínio.`;
  return `Essa questão combina conceitos. "${wrongAnswer}" é um erro comum. Foque na diferença entre os conceitos envolvidos.`;
}

function findReinforcement(q) {
  const allQ = getAllModuleQuestions();
  const sameTopic = allQ.filter(oq => oq.lessonId === q.lessonId && oq.id !== q.id);
  if (sameTopic.length > 0) return sameTopic[Math.floor(Math.random() * sameTopic.length)];
  return null;
}

function nextQuizQuestion() {
  if (!quizState) return;

  // Check for reinforcement questions
  if (quizState.reinforcementQueue.length > 0 && quizState.current >= quizState.questions.length - 1) {
    quizState.questions.push(quizState.reinforcementQueue.shift());
    quizState.current++;
    quizState.selected = null;
    quizState.answered = false;
    quizState.hintUsed = false;
    renderQuizActive(document.getElementById('main-content'));
    return;
  }

  quizState.current++;
  quizState.selected = null;
  quizState.answered = false;
  quizState.hintUsed = false;

  if (quizState.current >= quizState.questions.length) {
    showQuizResults();
  } else {
    renderQuizActive(document.getElementById('main-content'));
  }
}

function showQuizResults() {
  S.quizzesDone++;
  save();

  const total = quizState.questions.length;
  const correct = quizState.correct;
  const pct = total > 0 ? correct / total : 0;

  let emoji, title, msg;
  if (pct >= 0.9) { emoji = '🎉'; title = 'Incrível!'; msg = 'Você domina esse assunto!'; }
  else if (pct >= 0.7) { emoji = '👍'; title = 'Muito bem!'; msg = 'Continue praticando para chegar a 100%.'; }
  else if (pct >= 0.5) { emoji = '💪'; title = 'Bom esforço!'; msg = 'Revise o conteúdo e tente de novo.'; }
  else { emoji = '📚'; title = 'Continue praticando!'; msg = 'Releia a lição e tente novamente.'; }

  const main = document.getElementById('main-content');
  main.className = 'fade-in';
  main.innerHTML = `
    <div class="results-card">
      <div class="results-emoji">${emoji}</div>
      <h2>${title}</h2>
      <p>${msg}</p>
      <div class="results-stats">
        <div class="rs-item"><div class="rs-val">${correct}/${total}</div><div class="rs-lbl">Corretas</div></div>
        <div class="rs-item"><div class="rs-val">${quizState.xpEarned}</div><div class="rs-lbl">XP ganho</div></div>
        <div class="rs-item"><div class="rs-val">${Math.round(pct * 100)}%</div><div class="rs-lbl">Precisão</div></div>
      </div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-g btn-sm" onclick="navigate('quiz')">Praticar de novo</button>
        <button class="btn btn-o btn-sm" onclick="navigate('dashboard')">Voltar ao início</button>
      </div>
    </div>
  `;
}

// ─── REVIEW ───────────────────────────────────────────────────────────────
function renderReview(el) {
  const items = [];

  MODULES.forEach(m => {
    m.lessons.forEach(l => {
      const mastery = getMastery(l.id);
      const lp = getLessonProgress(l.id);
      const completed = S.lessonsCompleted.includes(l.id);

      if (!completed && lp.total === 0) {
        items.push({ module: m, lesson: l, type: 'unstudied', mastery, text: 'Não estudado', priority: 3 });
      } else if (mastery < 50) {
        items.push({ module: m, lesson: l, type: 'weak', mastery, text: `Domínio baixo (${mastery}%)`, priority: 1 });
      } else if (mastery < 80) {
        items.push({ module: m, lesson: l, type: 'review', mastery, text: `Precisa revisar (${mastery}%)`, priority: 2 });
      }
    });
  });

  items.sort((a, b) => a.priority - b.priority);

  el.innerHTML = `
    <div class="section">
      <h2 class="section-title">🔄 Revisar</h2>
      <p class="section-sub">${items.length > 0 ? items.length + ' itens precisam de atenção' : 'Tudo em dia!'}</p>

      ${items.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <p>Nenhum conteúdo precisa de revisão agora.<br>Continue praticando!</p>
        </div>
      ` : items.map(item => `
        <div class="review-item" onclick="navigate('lesson','${item.module.id}|${item.lesson.id}')">
          <h4>${item.module.icon} ${item.lesson.title}</h4>
          <p>${item.module.title}</p>
          <span class="review-tag ${item.type}">${item.text}</span>
        </div>
      `).join('')}
    </div>
  `;
}

// ─── PROGRESS ─────────────────────────────────────────────────────────────
function renderProgress(el) {
  const accuracy = S.totalAnswered > 0 ? Math.round((S.totalCorrect / S.totalAnswered) * 100) : 0;
  const avgMastery = getAverageMastery();
  const completedLessons = S.lessonsCompleted.length;
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons.length, 0);

  const masteryList = [];
  MODULES.forEach(m => {
    m.lessons.forEach(l => {
      masteryList.push({ module: m, lesson: l, mastery: getMastery(l.id) });
    });
  });
  masteryList.sort((a, b) => a.mastery - b.mastery);

  el.innerHTML = `
    <div class="section">
      <h2 class="section-title">📊 Seu Progresso</h2>
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon">📚</div><div class="stat-val">${completedLessons}/${totalLessons}</div><div class="stat-lbl">Lições</div></div>
        <div class="stat-card"><div class="stat-icon">📈</div><div class="stat-val">${avgMastery}%</div><div class="stat-lbl">Domínio</div></div>
        <div class="stat-card"><div class="stat-icon">🔥</div><div class="stat-val">${S.streak}</div><div class="stat-lbl">Sequência</div></div>
        <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-val">${S.totalAnswered}</div><div class="stat-lbl">Questões</div></div>
        <div class="stat-card"><div class="stat-icon">✅</div><div class="stat-val">${accuracy}%</div><div class="stat-lbl">Acerto</div></div>
        <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-val">${S.xp}</div><div class="stat-lbl">XP</div></div>
      </div>
    </div>

    <div class="section">
      <h2 class="section-title">🎯 Domínio por conteúdo</h2>
      ${masteryList.map(item => `
        <div class="dom-item">
          <span class="dom-name">${item.lesson.title}</span>
          <div class="dom-bar-wrap"><div class="dom-bar" style="width:${item.mastery}%;background:${pctColor(item.mastery)}"></div></div>
          <span class="dom-pct ${item.mastery >= 70 ? 'high' : item.mastery >= 40 ? 'mid' : 'low'}">${item.mastery}%</span>
        </div>
      `).join('')}
    </div>

    <div class="section" style="text-align:center">
      <button class="btn btn-o btn-sm" onclick="resetAllProgress()">Resetar progresso</button>
    </div>
  `;
}

function resetAllProgress() {
  if (!confirm('Resetar todo o progresso? Esta ação não pode ser desfeita.')) return;
  S = { ...DEFAULT_STATE };
  save();
  updateHeader();
  navigate('progress');
}

// ─── INIT ─────────────────────────────────────────────────────────────────
load();
navigate('dashboard');
