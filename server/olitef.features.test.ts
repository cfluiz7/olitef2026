import { describe, expect, it } from "vitest";
import { olitefLevels, publicOlitefReferences } from "../shared/olitefContent";

describe("OLITEF learning catalogue", () => {
  it("keeps the school tracks separated by level", () => {
    expect(olitefLevels.map((item) => item.level)).toEqual(["Nível 1", "Nível 2"]);
    expect(olitefLevels[0].years).toContain("6.º");
    expect(olitefLevels[0].years).toContain("7.º");
    expect(olitefLevels[1].years).toContain("8.º");
    expect(olitefLevels[1].years).toContain("9.º");
  });

  it("uses official public references instead of copying protected files", () => {
    expect(publicOlitefReferences.length).toBeGreaterThanOrEqual(3);
    expect(publicOlitefReferences.every((reference) => reference.href.startsWith("https://www.olitef.com.br/"))).toBe(true);
    expect(JSON.stringify(publicOlitefReferences).toLowerCase()).not.toContain("password");
    expect(JSON.stringify(publicOlitefReferences).toLowerCase()).not.toContain("senha");
  });
});
