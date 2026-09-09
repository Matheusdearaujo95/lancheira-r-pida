import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  CalendarDays,
  Check,
  Clock,
  Printer,
  ShoppingBasket,
  Trash2,
  X,
  Plus,
  ArrowRight,
} from "lucide-react";
import { combos, comboImage, DISCLAIMER, getCombo, type Combo } from "@/data/combos";
import { BackButton, Disclaimer, PageHeader } from "@/components/PageHeader";
import { DAYS, usePlanner, type Day } from "@/components/PlannerContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/semana")({
  head: () => ({
    meta: [
      { title: "Semana | Lancheira que Não Volta Inteira" },
      {
        name: "description",
        content:
          "Planeje os lanches escolares de segunda a sexta e gere sua lista de compras automaticamente.",
      },
      { property: "og:title", content: "Planeje os próximos cinco dias" },
      {
        property: "og:description",
        content: "Escolha uma combinação para cada dia da semana e veja sua lista de compras.",
      },
    ],
  }),
  component: SemanaPage,
});

function SemanaPage() {
  const { plan, setDay, clearDay } = usePlanner();
  const [activeDay, setActiveDay] = useState<Day | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCombos = combos.filter((c) => {
    const matchesTag = filterTag ? (c.tags as string[]).includes(filterTag) : true;
    const matchesSearch = searchTerm
      ? c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  const totalFilled = DAYS.filter((d) => Boolean(plan[d])).length;

  const handleSelectCombo = (combo: Combo) => {
    if (!activeDay) return;
    setDay(activeDay, combo.slug);
    setActiveDay(null);
    setSearchTerm("");
    setFilterTag(null);
  };

  return (
    <main>
      <div className="pt-5 no-print">
        <BackButton />
      </div>

      <PageHeader
        title="Planeje os próximos cinco dias"
        subtitle="Escolha uma combinação para cada dia e veja sua lista de compras."
      />

      <div className="mt-6 space-y-4">
        {DAYS.map((day) => {
          const slug = plan[day];
          const combo = slug ? getCombo(slug) : null;

          return (
            <div key={day} className="card-soft print-card p-4 transition-all">
              <div className="flex items-center justify-between border-b border-border/70 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-soft font-display font-bold text-secondary text-sm">
                    {day.slice(0, 3)}
                  </span>
                  <h2 className="font-display text-lg font-bold">{day}</h2>
                </div>

                {combo ? (
                  <button
                    type="button"
                    onClick={() => clearDay(day)}
                    aria-label={`Remover lanche de ${day}`}
                    className="no-print flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                ) : null}
              </div>

              {combo ? (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={comboImage(combo.id)}
                    alt={`Lancheira de ${day}: ${combo.name}`}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold text-[0.95rem] leading-snug truncate">
                      {combo.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 text-secondary" />
                      {combo.time}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDay(day)}
                    className="no-print shrink-0 rounded-lg bg-sage-soft px-3 py-1.5 text-xs font-semibold text-secondary hover:bg-sage-soft/80"
                  >
                    Trocar
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveDay(day)}
                  className="no-print mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:border-primary/40 hover:bg-coral-soft/30 transition-colors"
                >
                  <Plus className="h-4 w-4 text-primary" />
                  Escolher combinação
                </button>
              )}
            </div>
          );
        })}
      </div>

      {totalFilled > 0 ? (
        <section className="mt-8">
          <h2 className="text-xl">Resumo da sua semana</h2>
          <p className="mt-1 text-sm text-muted-foreground">{totalFilled} de 5 dias planejados.</p>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {DAYS.map((day) => {
              const slug = plan[day];
              const combo = slug ? getCombo(slug) : null;
              if (!combo) return null;

              return (
                <div key={day} className="card-soft print-card flex items-center gap-3 p-3">
                  <img
                    src={comboImage(combo.id)}
                    alt={combo.name}
                    className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="block text-[0.7rem] font-bold uppercase tracking-wider text-secondary">
                      {day}
                    </span>
                    <p className="truncate text-xs font-bold leading-tight">{combo.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="no-print mt-6 space-y-3">
            <Link
              to="/compras"
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-colors"
            >
              <ShoppingBasket className="h-5 w-5" />
              Ver lista de compras
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => window.print()}
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 py-3 font-semibold text-foreground shadow-soft hover:bg-accent transition-colors"
            >
              <Printer className="h-5 w-5 text-secondary" />
              Imprimir minha semana
            </button>
          </div>
        </section>
      ) : (
        <div className="card-soft mt-8 p-5 text-center bg-butter-soft/60">
          <CalendarDays className="mx-auto h-8 w-8 text-secondary/80" />
          <h3 className="mt-2 font-display text-base font-bold">Nenhum dia escolhido ainda</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Toque nos botões acima para montar os lanches de cada dia da semana.
          </p>
        </div>
      )}

      {/* Modal de seleção de combinação */}
      <Dialog
        open={activeDay !== null}
        onOpenChange={(open) => {
          if (!open) {
            setActiveDay(null);
            setSearchTerm("");
            setFilterTag(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-hidden p-0 sm:max-w-md">
          <DialogHeader className="p-4 pb-2 border-b border-border">
            <DialogTitle className="text-lg">Escolher para {activeDay}</DialogTitle>
            <p className="text-xs text-muted-foreground">
              Selecione uma entre as 36 opções da biblioteca.
            </p>

            <div className="mt-2">
              <input
                type="search"
                placeholder="Buscar por nome ou ingrediente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-xs outline-none focus:border-primary"
              />
            </div>

            <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                type="button"
                onClick={() => setFilterTag(null)}
                className={`shrink-0 rounded-full px-2.5 py-1 font-semibold ${
                  filterTag === null
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                Todas
              </button>
              {["5 min", "Preparar antes", "Sem geladeira", "Doce caseiro", "Salgado caseiro"].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFilterTag(filterTag === tag ? null : tag)}
                    className={`shrink-0 rounded-full px-2.5 py-1 font-semibold ${
                      filterTag === tag
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </DialogHeader>

          <div className="max-h-[55vh] overflow-y-auto p-4 space-y-2.5">
            {filteredCombos.map((combo) => (
              <button
                key={combo.id}
                type="button"
                onClick={() => handleSelectCombo(combo)}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-2.5 text-left hover:border-primary/50 hover:bg-coral-soft/20 transition-all"
              >
                <img
                  src={comboImage(combo.id)}
                  alt={combo.name}
                  className="h-14 w-14 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold leading-tight">{combo.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">{combo.summary}</p>
                  <div className="mt-1 flex items-center gap-2 text-[0.7rem] text-secondary font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {combo.time}
                    </span>
                    <span>•</span>
                    <span>{combo.tags[0]}</span>
                  </div>
                </div>
              </button>
            ))}

            {filteredCombos.length === 0 ? (
              <p className="py-8 text-center text-xs text-muted-foreground">
                Nenhuma combinação encontrada com esses termos.
              </p>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      <Disclaimer text={DISCLAIMER} />
      <p className="print-only mt-6 text-xs text-center text-muted-foreground">
        Lancheira que Não Volta Inteira • Planejamento semanal
      </p>
    </main>
  );
}
