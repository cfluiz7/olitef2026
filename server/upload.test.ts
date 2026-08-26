import { describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  createTeacherMaterial: vi.fn().mockResolvedValue(42),
  createTeacherClass: vi.fn(),
  listPublishedLessons: vi.fn().mockResolvedValue([]),
  listStudentAchievements: vi.fn().mockResolvedValue([]),
  listStudentProgress: vi.fn().mockResolvedValue([]),
  listTeacherClasses: vi.fn().mockResolvedValue([]),
  recordQuizAttempt: vi.fn(),
}));
vi.mock("./storage", () => ({ storagePut: vi.fn().mockResolvedValue({ key: "teacher-materials/1/file.pdf", url: "/manus-storage/teacher-materials/1/file.pdf" }) }));

import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const ctx = (profileType: "student" | "teacher"): TrpcContext => ({ user: { id: 1, openId: profileType, name: profileType, email: `${profileType}@test.local`, loginMethod: "test", role: profileType === "teacher" ? "admin" : "user", profileType, level: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() }, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: {} as TrpcContext["res"] });

describe("teacher.uploadPdf", () => {
  it("rejects non-teachers", async () => {
    const caller = appRouter.createCaller(ctx("student"));
    await expect(caller.teacher.uploadPdf({ title: "PDF", fileName: "file.pdf", mimeType: "application/pdf", sizeBytes: 3, dataBase64: "data:application/pdf;base64,JVBERi0=" })).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects oversized input before storage", async () => {
    const caller = appRouter.createCaller(ctx("teacher"));
    await expect(caller.teacher.uploadPdf({ title: "PDF", fileName: "file.pdf", mimeType: "application/pdf", sizeBytes: 21 * 1024 * 1024, dataBase64: "data:application/pdf;base64,JVBERi0=" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("rejects a non-PDF MIME type before storage", async () => {
    const caller = appRouter.createCaller(ctx("teacher"));
    await expect(caller.teacher.uploadPdf({ title: "Arquivo", fileName: "arquivo.txt", mimeType: "application/pdfx" as "application/pdf", sizeBytes: 5, dataBase64: "data:application/pdf;base64,JVBERi0=" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("stores a valid PDF and records only the storage reference", async () => {
    const caller = appRouter.createCaller(ctx("teacher"));
    await expect(caller.teacher.uploadPdf({ title: "PDF", fileName: "file.pdf", mimeType: "application/pdf", sizeBytes: 5, dataBase64: "data:application/pdf;base64,JVBERi0=" })).resolves.toBe(42);
  });
});
