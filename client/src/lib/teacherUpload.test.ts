import { describe, expect, it } from "vitest";
import { isAllowedTeacherPdf, readTeacherPdf } from "./teacherUpload";

describe("teacherUpload", () => {
  it("accepts only non-empty PDFs up to 20 MB", () => {
    expect(isAllowedTeacherPdf({ type: "application/pdf", size: 120 })).toBe(true);
    expect(isAllowedTeacherPdf({ type: "text/plain", size: 120 })).toBe(false);
    expect(isAllowedTeacherPdf({ type: "application/pdf", size: 0 })).toBe(false);
  });

  it("reads an allowed PDF through FileReader and returns its data URL", async () => {
    const reader = {
      result: "data:application/pdf;base64,QUJD",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
      readAsDataURL: () => reader.onload?.(),
    } as unknown as FileReader;
    await expect(readTeacherPdf({ type: "application/pdf", size: 3, name: "a.pdf" }, () => reader)).resolves.toBe("data:application/pdf;base64,QUJD");
  });
});
