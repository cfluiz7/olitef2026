import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function contextFor(profileType: "student" | "teacher"): TrpcContext {
  return {
    user: { id: profileType === "student" ? 2 : 3, openId: `${profileType}-test`, name: profileType, email: `${profileType}@test.local`, loginMethod: "test", role: profileType === "teacher" ? "admin" : "user", profileType, level: null, createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date() },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("profile authorization", () => {
  it("blocks students from teacher operations", async () => {
    const caller = appRouter.createCaller(contextFor("student"));
    await expect(caller.teacher.classes()).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("allows an authenticated teacher to reach teacher operations", async () => {
    const caller = appRouter.createCaller(contextFor("teacher"));
    await expect(caller.teacher.classes()).resolves.toEqual([]);
  });
});
