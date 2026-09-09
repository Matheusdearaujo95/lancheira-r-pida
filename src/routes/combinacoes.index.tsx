import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { combos, DISCLAIMER, FILTERS, type Tag } from "@/data/combos";
import { ComboCard } from "@/components/ComboCard";
import { BackButton, Disclaimer, PageHeader } from "@/components/PageHeader";
import { InfoTip } from "@/components/InfoTip";

type Search = { filtro?: string };

export const Route = createFileRoute("/combinacoes/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    filtro: typeof search.filtro === "string" ? search.filtro : undefined,
  }),
  head: () => ({
    meta: [
      { title: "36 combinações para a lancheira | Lancheira que Não Volta Inteira" },
      {
        name: "description",
        content:
          "Biblioteca com 36 combinações de lanche escolar, filtradas por tempo de preparo e tipo de lanche.",
      },
      { property: "og:title", content: "36 combinações para variar sem complicar" },
      {
        property: "og:description",
        content: "Filtre por 5 minutos, preparar antes, sem geladeira, doce ou salgado caseiro.",
      },
    ],
  }),
  component: Combinacoes,
});

function Combinacoes() {
  const { filtro } = Route.useSearch();
  const navigate = useNavigate({ from: "/combinacoes" });

  const lista = filtro ? combos.filter((c) => (c.tags as string[]).includes(filtro)) : combos;

  const setFiltro = (t?: string) =>
    navigate({ search: t && t !== filtro ? { filtro: t } : {} });

  const extra: Tag[] = filtro === "Poucos ingredientes" ? ["Poucos ingredientes"] : [];

  return (
    <main>
      <div className="pt-5">
        <BackButton />
      </div>
      <PageHeader
        title="36 combinações para variar sem complicar"
        subtitle="Escolha pelo tempo que você tem e pelo tipo de lanche que faz sentido para a sua rotina."
      />

      <div className="no-print mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFiltro(undefined)}
          className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
            filtro ? "bg-card text-foreground/70 shadow-soft" : "bg-secondary text-secondary-foreground"
          }`}
        >
          Ver todas
        </button>
        {[...FILTERS, ...extra].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFiltro(t)}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold ${
              filtro === t ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground/70 shadow-soft"
            }`}
          >
            {t === "5 min" ? "5 minutos" : t}
          </button>
        ))}
      </div>

      <p className="mt-4 flex items-center text-sm text-muted-foreground">
        {lista.length} combinações nesta seleção
        <InfoTip
          title="Pode preparar antes?"
          text="São itens que você consegue deixar encaminhados no domingo ou na noite anterior para ganhar tempo durante a semana."
        />
      </p>

      <div className="mt-4 space-y-5">
        {lista.map((c) => (
          <ComboCard key={c.id} combo={c} />
        ))}
      </div>

      <Disclaimer text={DISCLAIMER} />
    </main>
  );
}
