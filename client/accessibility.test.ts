import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname);
const quiz = readFileSync(resolve(root, "src/pages/QuizExperience.tsx"), "utf8");
const teacher = readFileSync(resolve(root, "src/pages/TeacherDashboard.tsx"), "utf8");
const styles = readFileSync(resolve(root, "src/index.css"), "utf8");

describe("accessibility source audit", () => {
  it("keeps quiz actions keyboard-native with visible focus styles", () => {
    expect(quiz).toContain("<button");
    expect(quiz).toContain("<Button");
    expect(styles).toMatch(/focus-visible/);
  });

  it("labels the teacher upload control and names the educational iframe", () => {
    expect(teacher).toContain("<label");
    expect(teacher).toContain('accept="application/pdf"');
    expect(quiz).toContain('title={question.video?.title}');
  });
});
