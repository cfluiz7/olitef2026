export const MAX_TEACHER_PDF_BYTES = 20 * 1024 * 1024;

export function isAllowedTeacherPdf(file: { type: string; size: number }) {
  return file.type === "application/pdf" && file.size > 0 && file.size <= MAX_TEACHER_PDF_BYTES;
}

export function readTeacherPdf(file: { type: string; size: number; name: string }, readerFactory: () => FileReader = () => new FileReader()) {
  if (!isAllowedTeacherPdf(file)) return Promise.reject(new Error("PDF inválido ou acima do limite de 20 MB."));
  return new Promise<string>((resolve, reject) => {
    const reader = readerFactory();
    reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Não foi possível ler o PDF."));
    reader.onerror = () => reject(new Error("Não foi possível ler o PDF."));
    reader.readAsDataURL(file as unknown as Blob);
  });
}
