import { useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.history.back()}
      className="no-print inline-flex min-h-11 items-center gap-1 rounded-xl bg-card px-3 text-sm font-semibold text-foreground/80 shadow-soft"
    >
      <ChevronLeft className="h-4 w-4" />
      Voltar
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <header className="pt-6">
      <h1 className="text-3xl leading-tight">{title}</h1>
      {subtitle ? <p className="mt-2 text-[0.95rem] text-muted-foreground">{subtitle}</p> : null}
      {children}
    </header>
  );
}

export function Disclaimer({ text }: { text: string }) {
  return <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{text}</p>;
}
