import { int, index, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  profileType: mysqlEnum("profileType", ["student", "teacher"]).default("student").notNull(),
  level: mysqlEnum("level", ["nivel-1", "nivel-2", "nivel-3"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const classes = mysqlTable("classes", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  level: mysqlEnum("level", ["nivel-1", "nivel-2"]).notNull(),
  joinCode: varchar("joinCode", { length: 16 }).notNull().unique(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({ teacherIdIdx: index("classes_teacher_id_idx").on(table.teacherId) }));

export const classMembers = mysqlTable("classMembers", {
  id: int("id").autoincrement().primaryKey(),
  classId: int("classId").notNull(),
  studentId: int("studentId").notNull(),
  joinedAt: timestamp("joinedAt").defaultNow().notNull(),
}, (table) => ({ classIdIdx: index("class_members_class_id_idx").on(table.classId), studentIdIdx: index("class_members_student_id_idx").on(table.studentId) }));

export const lessons = mysqlTable("lessons", {
  id: int("id").autoincrement().primaryKey(),
  level: mysqlEnum("level", ["nivel-1", "nivel-2"]).notNull(),
  topic: varchar("topic", { length: 120 }).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  explanation: text("explanation").notNull(),
  sourceLabel: varchar("sourceLabel", { length: 255 }),
  isPublished: boolean("isPublished").default(true).notNull(),
});

export const quizQuestions = mysqlTable("quizQuestions", {
  id: int("id").autoincrement().primaryKey(),
  lessonId: int("lessonId").notNull(),
  question: text("question").notNull(),
  optionsJson: text("optionsJson").notNull(),
  correctIndex: int("correctIndex").notNull(),
  explanation: text("explanation").notNull(),
});

export const quizAttempts = mysqlTable("quizAttempts", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  questionId: int("questionId").notNull(),
  selectedIndex: int("selectedIndex").notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  xpEarned: int("xpEarned").default(0).notNull(),
  answeredAt: timestamp("answeredAt").defaultNow().notNull(),
});

export const studentProgress = mysqlTable("studentProgress", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  level: mysqlEnum("level", ["nivel-1", "nivel-2"]).notNull(),
  topic: varchar("topic", { length: 120 }).notNull(),
  completedLessons: int("completedLessons").default(0).notNull(),
  totalLessons: int("totalLessons").default(0).notNull(),
  xp: int("xp").default(0).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({ studentIdIdx: index("student_progress_student_id_idx").on(table.studentId) }));

export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  title: varchar("title", { length: 120 }).notNull(),
  description: text("description").notNull(),
});

export const studentAchievements = mysqlTable("studentAchievements", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  achievementId: int("achievementId").notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
});

export const studentReviews = mysqlTable("studentReviews", {
  id: int("id").autoincrement().primaryKey(),
  studentId: int("studentId").notNull(),
  level: mysqlEnum("level", ["nivel-1", "nivel-2"]).notNull(),
  topic: varchar("topic", { length: 120 }).notNull(),
  intervalDays: int("intervalDays").default(1).notNull(),
  dueAt: timestamp("dueAt").defaultNow().notNull(),
  lastResult: boolean("lastResult").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const teacherMaterials = mysqlTable("teacherMaterials", {
  id: int("id").autoincrement().primaryKey(),
  teacherId: int("teacherId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  fileUrl: text("fileUrl").notNull(),
  mimeType: varchar("mimeType", { length: 120 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  accessNote: text("accessNote").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
