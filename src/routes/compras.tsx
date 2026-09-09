import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CalendarDays, Check, Printer, ShoppingBasket, Sparkles, ArrowRight } from "lucide-react";
import { combos, DISCLAIMER, getCombo } from "@/data/combos";
import { BackButton, Disclaimer, PageHeader } from "@/components/PageHeader";
import { DAYS, usePlanner } from "@/components/PlannerContext";
import { buildList, SECTIONS, type Section } from "@/lib/shopping";

export const Route = createFileRoute("/compras")({
  head: () => ({
    meta: [
      { title: "Lista de Compras | Lancheira que Não Volta Inteira" },
      {
        name: "description",
        content:
          "Lista de compras organizada por seções para os lanches escolares da semana sem complicações.",
      },
      { property: "og:title", content: "Lista da semana sem quebrar a cabeça" },
      {
        property: "og:description",
        content:
          "Itens de hortifruti, padaria, geladeira e mercearia organizados pelos lanches da semana.",
      },
    ],
  }),
  component: ComprasPage,
});

const SECTION_ICONS: Record<Section, string> = {
  Hortifruti: "🍎",
  Padaria: "🥖",
  Geladeira: "🧀",
  Mercearia: "🌾",
  "Preparo caseiro": "🥣",
  "Itens de apoio": "💧",
};

export function ComprasPage() {
  const { plan, setDay } = usePlanner();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // Obter as combinações ativas na semana
  const activeCombos = useMemo(() => {
    return DAYS.map((day) => {
      const slug = plan[day];
      return slug ? getCombo(slug) : null;
    }).filter((c): c is NonNullable<typeof c> => c !== null);
  }, [plan]);

  // Lista de ingredientes agrupados por setor
  const grouped = useMemo(() => {
    const lists = activeCombos.map((c) => c.ingredients);
    return buildList(lists);
  }, [activeCombos]);

  // Total de itens na lista
  const totalItems = useMemo(() => {
    return SECTIONS.reduce((acc, sec) => acc + (grouped[sec]?.length ?? 0), 0);
  }, [grouped]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handlePreencherExemplo = () => {
    // Sugestão de 5 combinações variadas e equilibradas
    const exemplo = [combos[0], combos[1], combos[12], combos[24], combos[32]];
    DAYS.forEach((day, index) => {
      const c = exemplo[index];
      if (c) setDay(day, c.slug);
    });
  };

  return (
    <main>
      <div className="pt-5 no-print">
        <BackButton />
      </div>

      <PageHeader
        title="Lista da semana sem quebrar a cabeça"
        subtitle="Itens organizados por setor para você comprar apenas o necessário."
      />

      {activeCombos.length > 0 ? (
        <div className="mt-6 space-y-6">
          {/* Lanches selecionados */}
          <div className="card-soft print-card p-4 bg-sage-soft/40">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
              Lanches incluídos nesta lista ({activeCombos.length} dias)
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {activeCombos.map((c) => (
                <span
                  key={c.id}
                  className="rounded-full bg-card px-2.5 py-1 text-xs font-semibold text-foreground/80 shadow-soft"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Seções de compras */}
          <div className="space-y-4">
            {SECTIONS.map((section) => {
              const items = grouped[section] ?? [];
              if (items.length === 0) return null;

              return (
                <section key={section} className="card-soft print-card p-4">
                  <h2 className="flex items-center gap-2 font-display text-lg font-bold border-b border-border/70 pb-2">
                    <span className="text-base" aria-hidden="true">
                      {SECTION_ICONS[section]}
                    </span>
                    <span>{section}</span>
                    <span className="ml-auto text-xs font-semibold text-muted-foreground">
                      {items.length} {items.length === 1 ? "item" : "itens"}
                    </span>
                  </h2>

                  <ul className="mt-3 space-y-2.5">
                    {items.map((item) => {
                      const isChecked = Boolean(checkedItems[item]);
                      return (
                        <li
                          key={item}
                          onClick={() => toggleItem(item)}
                          className="flex items-center gap-3 cursor-pointer select-none group"
                        >
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                              isChecked
                                ? "bg-secondary border-secondary text-secondary-foreground"
                                : "border-input bg-card group-hover:border-primary/60"
                            }`}
                          >
                            {isChecked ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : null}
                          </span>
                          <span
                            className={`text-sm transition-all ${
                              isChecked
                                ? "line-through text-muted-foreground/60"
                                : "text-foreground"
                            }`}
                          >
                            {item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className="no-print pt-2 space-y-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-colors"
            >
              <Printer className="h-5 w-5" />
              Imprimir lista de compras
            </button>

            <Link
              to="/semana"
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 py-3 font-semibold text-foreground shadow-soft hover:bg-accent transition-colors"
            >
              <CalendarDays className="h-5 w-5 text-secondary" />
              Alterar combinações da semana
            </Link>
          </div>
        </div>
      ) : (
        <div className="card-soft mt-6 p-6 text-center space-y-4 bg-butter-soft/50">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-butter">
            <ShoppingBasket className="h-7 w-7 text-foreground/70" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Sua lista ainda está vazia</h2>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
              Escolha os lanches na tela Semana para que a lista seja montada automaticamente por
              seções de supermercado.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link
              to="/semana"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              <CalendarDays className="h-4 w-4" />
              Ir para Planejamento Semanal
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={handlePreencherExemplo}
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-accent"
            >
              <Sparkles className="h-4 w-4 text-secondary" />
              Preencher semana de exemplo
            </button>
          </div>
        </div>
      )}

      <Disclaimer text={DISCLAIMER} />
      <p className="print-only mt-6 text-xs text-center text-muted-foreground">
        Lancheira que Não Volta Inteira • Lista de compras semanal
      </p>
    </main>
  );
}
