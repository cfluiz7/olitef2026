import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { createTeacherClass, createTeacherMaterial, getStudentRecommendation, getStudentStreak, listPublishedLessons, listTeacherInsights, listTeacherRoster, listStudentAchievements, listStudentPendingReviews, listStudentErrors, listStudentProgress, listStudentTopicPerformance, listTeacherClasses, recordQuizAttempt } from "./db";
import { storagePut } from "./storage";
import { allOlitefQuestions } from "../shared/olitefQuestions";

const levelSchema = z.enum(["nivel-1", "nivel-2"]);
const teacherProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin" && ctx.user.profileType !== "teacher") throw new TRPCError({ code: "FORBIDDEN", message: "Acesso reservado a professores." });
  return next();
});
const studentProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.profileType !== "student" && ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "Acesso reservado a alunos." });
  return next();
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  lessons: router({
    published: publicProcedure.input(z.object({ level: levelSchema.optional() }).optional()).query(({ input }) => listPublishedLessons(input?.level)),
    questions: publicProcedure.input(z.object({ level: levelSchema.default("nivel-1") })).query(({ input }) => allOlitefQuestions.filter((question) => question.level === input.level)),
  }),
  student: router({
    progress: studentProcedure.query(({ ctx }) => listStudentProgress(ctx.user.id)),
    achievements: studentProcedure.query(({ ctx }) => listStudentAchievements(ctx.user.id)),
    topicPerformance: studentProcedure.query(({ ctx }) => listStudentTopicPerformance(ctx.user.id)),
    errors: studentProcedure.query(({ ctx }) => listStudentErrors(ctx.user.id)),
    dueReviews: studentProcedure.query(({ ctx }) => listStudentPendingReviews(ctx.user.id)),
    streak: studentProcedure.query(({ ctx }) => getStudentStreak(ctx.user.id)),
    recommendation: studentProcedure.query(({ ctx }) => getStudentRecommendation(ctx.user.id)),
    recordAttempt: studentProcedure.input(z.object({ questionId: z.number().int().positive(), selectedIndex: z.number().int().min(0), isCorrect: z.boolean(), xpEarned: z.number().int().min(0).max(100), level: levelSchema.optional(), topic: z.string().max(120).optional() })).mutation(({ ctx, input }) => recordQuizAttempt({ studentId: ctx.user.id, ...input })),
  }),
  teacher: router({
    classes: teacherProcedure.query(({ ctx }) => listTeacherClasses(ctx.user.id)),
    roster: teacherProcedure.query(({ ctx }) => listTeacherRoster(ctx.user.id)),
    insights: teacherProcedure.query(({ ctx }) => listTeacherInsights(ctx.user.id)),
    createClass: teacherProcedure.input(z.object({ name: z.string().min(2).max(120), level: levelSchema })).mutation(({ ctx, input }) => createTeacherClass({ teacherId: ctx.user.id, ...input, joinCode: `OLI-${Math.random().toString(36).slice(2, 8).toUpperCase()}` })),
    addMaterial: teacherProcedure.input(z.object({ title: z.string().min(2).max(180), fileKey: z.string().min(1).max(512), fileUrl: z.string().url(), mimeType: z.literal("application/pdf"), sizeBytes: z.number().int().positive().max(20 * 1024 * 1024) })).mutation(({ ctx, input }) => createTeacherMaterial({ teacherId: ctx.user.id, ...input, accessNote: "Disponível apenas para turmas autorizadas pelo professor." })),
    uploadPdf: teacherProcedure.input(z.object({ title: z.string().min(2).max(180), fileName: z.string().min(1).max(180), mimeType: z.literal("application/pdf"), sizeBytes: z.number().int().positive().max(20 * 1024 * 1024), dataBase64: z.string().min(1) })).mutation(async ({ ctx, input }) => {
      const buffer = Buffer.from(input.dataBase64.replace(/^data:application\/pdf;base64,/, ""), "base64");
      if (buffer.length > 20 * 1024 * 1024) throw new TRPCError({ code: "BAD_REQUEST", message: "O PDF ultrapassa 20 MB." });
      const stored = await storagePut(`teacher-materials/${ctx.user.id}/${Date.now()}-${input.fileName.replace(/[^a-zA-Z0-9._-]/g, "-")}`, buffer, input.mimeType);
      return createTeacherMaterial({ teacherId: ctx.user.id, title: input.title, fileKey: stored.key, fileUrl: stored.url, mimeType: input.mimeType, sizeBytes: buffer.length, accessNote: "Disponível apenas para turmas autorizadas pelo professor." });
    }),
  }),
});

export type AppRouter = typeof appRouter;
