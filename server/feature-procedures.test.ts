import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { listStudentDueReviews } from "./db";

function context(profileType: "student" | "teacher"): TrpcContext {
  return {
    user: { id: profileType === "student" ? 10 : 11, openId: `${profileType}-procedure`, name: profileType, email: `${profileType}@test.local`, loginMethod: "test", role: profileType === "teacher" ? "admin" : "user", profileType, level: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("protected learning procedures", () => {
  it("accepts a valid student attempt and scopes it to the signed-in student", async () => {
    const caller = appRouter.createCaller(context("student"));
    await expect(caller.student.recordAttempt({ questionId: 1, selectedIndex: 0, isCorrect: true, xpEarned: 50 })).resolves.toBeTypeOf("number");
    await expect(caller.student.progress()).resolves.toEqual(expect.arrayContaining([expect.objectContaining({ studentId: 10, topic: "quiz-1", xp: 50 })]));
    await expect(caller.student.achievements()).resolves.toEqual(expect.arrayContaining([expect.objectContaining({ slug: "primeira-vitoria", title: "Primeira vitória" })]));
  });

  it("creates a spaced review and returns a recommendation after an attempt", async () => {
    const caller = appRouter.createCaller(context("student"));
    await caller.student.recordAttempt({ questionId: 104, selectedIndex: 2, isCorrect: true, xpEarned: 10, level: "nivel-1", topic: "Poupança" });
    await expect(listStudentDueReviews(10)).resolves.toEqual(expect.arrayContaining([expect.objectContaining({ studentId: 10, topic: "Poupança", intervalDays: 3, lastResult: true })]));
    await expect(caller.student.dueReviews()).resolves.not.toEqual(expect.arrayContaining([expect.objectContaining({ topic: "Poupança" })]));
    await expect(caller.student.recommendation()).resolves.toEqual(expect.objectContaining({ topic: expect.any(String), activity: expect.any(String), quantity: expect.any(Number) }));
  });

  it("returns teacher roster insights scoped to the teacher", async () => {
    const caller = appRouter.createCaller(context("teacher"));
    await expect(caller.teacher.insights()).resolves.toEqual(expect.any(Array));
  });

  it("rejects a student from adding teacher materials", async () => {
    const caller = appRouter.createCaller(context("student"));
    await expect(caller.teacher.addMaterial({ title: "Arquivo", fileKey: "student/arquivo", fileUrl: "https://example.com/file.pdf", mimeType: "application/pdf", sizeBytes: 100 })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects a material with a non-PDF mime type before storage", async () => {
    const caller = appRouter.createCaller(context("teacher"));
    await expect(caller.teacher.addMaterial({ title: "Arquivo", fileKey: "teacher/arquivo", fileUrl: "https://example.com/file.txt", mimeType: "application/pdfx" as "application/pdf", sizeBytes: 100 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
