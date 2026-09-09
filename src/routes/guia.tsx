import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ListChecks,
  MoonStar,
  Printer,
  Repeat,
  Shuffle,
  Timer,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { guias, guiaImage, type Guia } from "@/data/guias";
import { DISCLAIMER } from "@/data/combos";
import { BackButton, Disclaimer, PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/guia")({
  head: () => ({
    meta: [
      { title: "Guia Prático | Lancheira que Não Volta Inteira" },
      {
        name: "description",
        content: "Dicas rápidas, organização do domingo e cartões imprimíveis para a geladeira.",
      },
      { property: "og:title", content: "Guia Prático para a Rotina" },
      {
        property: "og:description",
        content: "Passo a passo simples para ganhar tempo e descomplicar a montagem da lancheira.",
      },
    ],
  }),
  component: GuiaPage,
});

const ICON_MAP: Record<string, typeof CalendarCheck> = {
  CalendarCheck,
  Timer,
  MoonStar,
  Shuffle,
  Repeat,
  ListChecks,
};

// Cartões rápidos para recortar e fixar com ímã na geladeira
const CARTOES_GELADEIRA = [
  {
    titulo: "Regra dos 3 itens",
    subtitulo: "A base de toda lancheira",
    itens: [
      "1 item que sustenta (pão, tapioca, bolo ou muffim)",
      "1 fruta fresca lavada e seca",
      "1 bebida (água na garrafinha ou água de coco)",
    ],
    cor: "bg-coral-soft",
    destaque: "text-primary",
  },
  {
    titulo: "Checklist de fechamento",
    subtitulo: "Antes de fechar o zíper",
    itens: [
      "Garrafinha bem fechada e em pé",
      "Gelo reutilizável se tiver leite, queijo ou ovo",
      "Guardanapo e colher se precisar",
      "Potinho testado sem tampa solta",
    ],
    cor: "bg-sage-soft",
    destaque: "text-secondary",
  },
  {
    titulo: "Trocas de emergência",
    subtitulo: "Faltou um item na despensa?",
    itens: [
      "Queijo branco vira requeijão ou ricota",
      "Pão de forma vira pão sírio ou tapioca",
      "Morango vira uva ou maçã fatiada",
      "Suco vira água fresca, sem neura",
    ],
    cor: "bg-butter-soft",
    destaque: "text-amber-700",
  },
  {
    titulo: "5 minutos no domingo",
    subtitulo: "Para salvar a semana",
    itens: [
      "Lavar e secar as frutas resistentes",
      "Deixar potinhos limpos em fila",
      "Ralar cenoura e guardar em pote fechado",
      "Congelar pães de queijo e muffins prontos",
    ],
    cor: "bg-sky-soft",
    destaque: "text-sky-700",
  },
];

export function GuiaPage() {
  const [openGuide, setOpenGuide] = useState<string | null>(guias[0]?.slug ?? null);

  const toggleGuide = (slug: string) => {
    setOpenGuide((prev) => (prev === slug ? null : slug));
  };

  return (
    <main>
      <div className="pt-5 no-print">
        <BackButton />
      </div>

      <PageHeader
        title="Dicas práticas para sua rotina"
        subtitle="Ideias simples para economizar tempo e montar as lancheiras sem estresse."
      />

      {/* Seção dos 6 Guias */}
      <section className="mt-6 space-y-4">
        {guias.map((guia) => {
          const Icon = ICON_MAP[guia.icon] ?? BookOpen;
          const isOpen = openGuide === guia.slug;

          return (
            <article
              key={guia.slug}
              className="card-soft print-card overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => toggleGuide(guia.slug)}
                className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/40 transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-soft text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-[1rem] font-bold leading-tight">
                      {guia.title}
                    </h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{guia.intro}</p>
                  </div>
                </div>

                <ChevronDown
                  className={`no-print h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div className={isOpen ? "block" : "hidden print:block"}>
                <div className="border-t border-border/70 p-4 pt-3 bg-card">
                  <img
                    src={guiaImage(guia.slug)}
                    alt={guia.title}
                    className="h-32 w-full rounded-xl object-cover"
                    loading="lazy"
                  />

                  <ol className="mt-4 space-y-2.5">
                    {guia.steps.map((step, idx) => (
                      <li key={step} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-butter font-display text-[0.7rem] font-bold text-foreground">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5 text-foreground/90">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Seção: Cartões para a geladeira */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl">Cartões para a geladeira</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Dicas resumidas para imprimir, recortar e fixar com ímã.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print flex items-center gap-1.5 rounded-xl border border-input bg-card px-3 py-2 text-xs font-semibold text-secondary hover:bg-accent shadow-soft"
          >
            <Printer className="h-3.5 w-3.5" />
            Imprimir cartões
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {CARTOES_GELADEIRA.map((cartao) => (
            <div
              key={cartao.titulo}
              className={`print-card rounded-2xl p-4 border border-border/80 shadow-soft ${cartao.cor}`}
            >
              <div className="border-b border-foreground/10 pb-2">
                <span
                  className={`text-[0.7rem] font-bold uppercase tracking-wider ${cartao.destaque}`}
                >
                  {cartao.subtitulo}
                </span>
                <h3 className="font-display text-base font-bold text-foreground">
                  {cartao.titulo}
                </h3>
              </div>

              <ul className="mt-3 space-y-1.5 text-xs text-foreground/80">
                {cartao.itens.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/50" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Disclaimer text={DISCLAIMER} />
      <p className="print-only mt-6 text-xs text-center text-muted-foreground">
        Lancheira que Não Volta Inteira • Guia prático da rotina
      </p>
    </main>
  );
}
