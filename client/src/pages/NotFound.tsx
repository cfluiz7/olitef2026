import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 shadow-sm border-2 border-ink/5 bg-white rounded-2xl">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-coral/15">
              <AlertCircle className="h-8 w-8 text-brand-coral" />
            </div>
          </div>
          <h1 className="text-5xl font-black text-ink">404</h1>
          <h2 className="mt-2 font-display text-xl font-extrabold text-ink">Página não encontrada</h2>
          <p className="mt-3 text-muted-foreground font-semibold leading-6">
            Esta página não existe ou foi movida.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Button onClick={() => setLocation("/")} className="btn-duo btn-green h-12">
              <Home className="mr-2 h-4 w-4" /> Voltar ao início
            </Button>
            <Button onClick={() => setLocation("/aluno")} variant="outline" className="btn-duo h-12 border-ink/15">
              <ArrowLeft className="mr-2 h-4 w-4" /> Painel do aluno
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground font-bold">Escola Aniceto Teixeira · OLITEF</p>
        </CardContent>
      </Card>
    </div>
  );
}
