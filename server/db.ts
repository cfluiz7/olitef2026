import { and, desc, eq, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { achievements, classMembers, classes, InsertUser, lessons, quizAttempts, studentAchievements, studentProgress, studentReviews, teacherMaterials, users } from "../drizzle/schema";
import { ENV } from "./_core/env";
import { allOlitefQuestions } from "../shared/olitefQuestions";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); } catch (error) { console.warn("[Database] Failed to connect:", error); _db = null; }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  for (const field of ["name", "email", "loginMethod", "profileType", "level"] as const) {
    if (user[field] !== undefined) { values[field] = user[field] as never; updateSet[field] = user[field]; }
  }
  if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
  else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
  values.lastSignedIn = user.lastSignedIn ?? new Date(); updateSet.lastSignedIn = values.lastSignedIn;
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb(); if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}

export async function listPublishedLessons(level?: "nivel-1" | "nivel-2") {
  const db = await getDb(); if (!db) return [];
  return level ? db.select().from(lessons).where(eq(lessons.level, level)) : db.select().from(lessons);
}

export async function listTeacherRoster(teacherId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select({
    classId: classes.id,
    className: classes.name,
    studentId: users.id,
    studentName: users.name,
    level: classes.level,
    xp: sql<number>`coalesce(sum(${studentProgress.xp}), 0)`,
    completedLessons: sql<number>`coalesce(sum(${studentProgress.completedLessons}), 0)`,
    totalLessons: sql<number>`coalesce(sum(${studentProgress.totalLessons}), 0)`,
  }).from(classes)
    .innerJoin(classMembers, eq(classMembers.classId, classes.id))
    .innerJoin(users, eq(users.id, classMembers.studentId))
    .leftJoin(studentProgress, eq(studentProgress.studentId, users.id))
    .where(eq(classes.teacherId, teacherId))
    .groupBy(classes.id, classes.name, users.id, users.name, classes.level);
}

export async function listTeacherInsights(teacherId: number) {
  const roster = await listTeacherRoster(teacherId);
  const insights = await Promise.all(roster.map(async (student) => {
    const [topics, reviews, earned] = await Promise.all([
      listStudentTopicPerformance(student.studentId),
      listStudentPendingReviews(student.studentId),
      listStudentAchievements(student.studentId),
    ]);
    return { ...student, topics, pendingReviews: reviews.length, achievements: earned.length };
  }));
  return insights;
}

export async function listTeacherClasses(teacherId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select().from(classes).where(eq(classes.teacherId, teacherId)).orderBy(desc(classes.createdAt));
}

export async function createTeacherClass(input: { teacherId: number; name: string; level: "nivel-1" | "nivel-2"; joinCode: string }) {
  const db = await getDb(); if (!db) return undefined;
  const result = await db.insert(classes).values(input); return result[0]?.insertId;
}

export async function listStudentProgress(studentId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select().from(studentProgress).where(eq(studentProgress.studentId, studentId)).orderBy(desc(studentProgress.updatedAt));
}

export async function listStudentTopicPerformance(studentId: number) {
  const rows = await listStudentProgress(studentId);
  const grouped = new Map<string, { topic: string; completedLessons: number; totalLessons: number; xp: number }>();
  for (const row of rows) {
    const current = grouped.get(row.topic) ?? { topic: row.topic, completedLessons: 0, totalLessons: 0, xp: 0 };
    current.completedLessons += row.completedLessons;
    current.totalLessons += row.totalLessons;
    current.xp += row.xp;
    grouped.set(row.topic, current);
  }
  return Array.from(grouped.values()).map((row) => ({ ...row, percentage: row.totalLessons ? Math.round((row.completedLessons / row.totalLessons) * 100) : 0 }));
}

export async function listStudentAchievements(studentId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select({ id: achievements.id, slug: achievements.slug, title: achievements.title, description: achievements.description, earnedAt: studentAchievements.earnedAt }).from(studentAchievements).innerJoin(achievements, eq(studentAchievements.achievementId, achievements.id)).where(eq(studentAchievements.studentId, studentId)).orderBy(desc(studentAchievements.earnedAt));
}

export async function recordQuizAttempt(input: { studentId: number; questionId: number; selectedIndex: number; isCorrect: boolean; xpEarned: number; level?: "nivel-1" | "nivel-2"; topic?: string }) {
  const db = await getDb(); if (!db) return undefined;
  const result = await db.insert(quizAttempts).values({ studentId: input.studentId, questionId: input.questionId, selectedIndex: input.selectedIndex, isCorrect: input.isCorrect, xpEarned: input.xpEarned });
  const level = input.level ?? "nivel-1";
  const topic = input.topic ?? `quiz-${input.questionId}`;
  await db.insert(studentProgress).values({ studentId: input.studentId, level, topic, completedLessons: input.isCorrect ? 1 : 0, totalLessons: 1, xp: input.xpEarned });
  const intervalDays = input.isCorrect ? 3 : 1;
  const dueAt = new Date(Date.now() + intervalDays * 24 * 60 * 60 * 1000);
  await db.insert(studentReviews).values({ studentId: input.studentId, level, topic, intervalDays, dueAt, lastResult: input.isCorrect });
  if (input.isCorrect) {
    await db.insert(achievements).values({ slug: "primeira-vitoria", title: "Primeira vitória", description: "Acertaste o teu primeiro desafio de educação financeira." }).onDuplicateKeyUpdate({ set: { title: "Primeira vitória" } });
    const achievement = await db.select({ id: achievements.id }).from(achievements).where(eq(achievements.slug, "primeira-vitoria")).limit(1);
    const alreadyEarned = achievement[0] ? await db.select({ id: studentAchievements.id }).from(studentAchievements).where(and(eq(studentAchievements.studentId, input.studentId), eq(studentAchievements.achievementId, achievement[0].id))).limit(1) : [];
    if (achievement[0] && alreadyEarned.length === 0) await db.insert(studentAchievements).values({ studentId: input.studentId, achievementId: achievement[0].id });
  }
  return result[0]?.insertId;
}

export async function listStudentErrors(studentId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select().from(quizAttempts).where(and(eq(quizAttempts.studentId, studentId), eq(quizAttempts.isCorrect, false))).orderBy(desc(quizAttempts.answeredAt));
}

export async function getStudentStreak(studentId: number) {
  const db = await getDb(); if (!db) return 0;
  const rows = await db.select({ answeredAt: quizAttempts.answeredAt }).from(quizAttempts).where(eq(quizAttempts.studentId, studentId)).orderBy(desc(quizAttempts.answeredAt));
  const days = Array.from(new Set(rows.map((row) => row.answeredAt.toISOString().slice(0, 10))));
  if (!days.length) return 0;
  let streak = 1;
  for (let index = 1; index < days.length; index += 1) {
    const previous = new Date(`${days[index - 1]}T00:00:00Z`).getTime();
    const current = new Date(`${days[index]}T00:00:00Z`).getTime();
    if (previous - current !== 24 * 60 * 60 * 1000) break;
    streak += 1;
  }
  return streak;
}

export async function listStudentPendingReviews(studentId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select().from(studentReviews).where(and(eq(studentReviews.studentId, studentId), lte(studentReviews.dueAt, new Date()))).orderBy(studentReviews.dueAt);
}

export async function listStudentDueReviews(studentId: number) {
  const db = await getDb(); if (!db) return [];
  return db.select().from(studentReviews).where(eq(studentReviews.studentId, studentId)).orderBy(studentReviews.dueAt);
}

export async function getStudentRecommendation(studentId: number) {
  const [progress, errors, reviews] = await Promise.all([listStudentProgress(studentId), listStudentErrors(studentId), listStudentPendingReviews(studentId)]);
  const grouped = new Map<string, { topic: string; level: string; xp: number; completed: number; total: number; errors: number }>();
  for (const row of progress) {
    const current = grouped.get(row.topic) ?? { topic: row.topic, level: row.level, xp: 0, completed: 0, total: 0, errors: 0 };
    current.xp += row.xp; current.completed += row.completedLessons; current.total += row.totalLessons;
    grouped.set(row.topic, current);
  }
  for (const error of errors) {
    const topic = allOlitefQuestions.find((question) => question.id === error.questionId)?.topic ?? "Revisão geral";
    const question = allOlitefQuestions.find((item) => item.id === error.questionId);
    const current = grouped.get(topic) ?? { topic, level: question?.level ?? "nivel-1", xp: 0, completed: 0, total: 0, errors: 0 };
    current.errors += 1; grouped.set(topic, current);
  }
  for (const review of reviews.filter((item) => item.dueAt.getTime() <= Date.now())) {
    const current = grouped.get(review.topic) ?? { topic: review.topic, level: review.level, xp: 0, completed: 0, total: 0, errors: 0 };
    current.errors += review.lastResult ? 1 : 2; grouped.set(review.topic, current);
  }
  const candidates = Array.from(grouped.values()).map((item) => ({ ...item, percentage: item.total ? Math.round((item.completed / item.total) * 100) : 0, priority: item.errors * 20 + Math.max(0, 100 - (item.total ? Math.round((item.completed / item.total) * 100) : 0)) }));
  const best = candidates.sort((a, b) => b.priority - a.priority)[0];
  return best ? { topic: best.topic, level: best.level, priority: best.priority >= 80 ? "alta" : best.priority >= 40 ? "média" : "baixa", activity: best.errors > 0 ? "Rever erros" : "Praticar", quantity: Math.min(10, Math.max(5, best.errors + 3)), reason: best.errors > 0 ? `${best.errors} erro(s) recente(s) e domínio de ${best.percentage}%.` : `Continue a praticar para consolidar o domínio de ${best.percentage}%.` } : { topic: "Necessidades e desejos", level: "nivel-1", priority: "média", activity: "Aprender", quantity: 5, reason: "Comece por uma sessão introdutória." };
}

export async function createTeacherMaterial(input: typeof teacherMaterials.$inferInsert) {
  const db = await getDb(); if (!db) return undefined;
  const result = await db.insert(teacherMaterials).values(input); return result[0]?.insertId;
}
