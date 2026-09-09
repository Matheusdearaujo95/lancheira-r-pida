import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Timer, CalendarCheck, Cookie, Sandwich, ThermometerSnowflake, Home, Dice5 } from "lucide-react";
import { combos, comboImage, DISCLAIMER, type Tag } from "@/data/combos";
import { ComboCard } from "@/components/ComboCard";
import { Disclaimer, PageHeader } from "@/components/PageHeader";
import { InfoTip } from "@/components/InfoTip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hoje | Lancheira que Não Volta Inteira" },
      {
        name: "description",
        content:
          "Escolha a situação da sua manhã e encontre em segundos uma combinação simples para a lancheira escolar.",
      },
      { property: "og:title", content: "Hoje | Lancheira que Não Volta Inteira" },
      {
        property: "og:description",
        content: "Seis atalhos para a manhã corrida e três combinações escolhidas para hoje.",
      },
    ],
  }),
  component: Hoje,
});

const situacoes: { label: string; tag: Tag; Icon: typeof Timer; bg: string }[] = [
  { label: "Tenho 5 minutos", tag: "5 min", Icon: Timer, bg: "bg-coral-soft" },
  { label: "Quero deixar pronto antes", tag: "Preparar antes", Icon: CalendarCheck, bg: "bg-sage-soft" },
  { label: "Preciso de opção doce", tag: "Doce caseiro", Icon: Cookie, bg: "bg-butter-soft" },
  { label: "Preciso de opção salgada", tag: "Salgado caseiro", Icon: Sandwich, bg: "bg-sky-soft" },
  { label: "Quero lanche sem geladeira", tag: "Sem geladeira", Icon: ThermometerSnowflake, bg: "bg-sage-soft" },
  { label: "Quero usar o que já tenho em casa", tag: "Poucos ingredientes", Icon: Home, bg: "bg-butter-soft" },
];

const destaques = [combos[0], combos[14], combos[26]];

function Hoje() {
  const navigate = useNavigate();
  const [sorteada, setSorteada] = useState<number | null>(null);
  const sorteio = sorteada === null ? null : combos[sorteada];

  return (
    <main>
      <PageHeader
        title="O que sua manhã precisa hoje?"
        subtitle="Escolha uma situação e encontre uma combinação simples para a lancheira."
      >
        <p className="mt-1 text-sm font-semibold text-secondary">Lancheira que Não Volta Inteira</p>
      </PageHeader>

      <section className="mt-6 grid grid-cols-2 gap-3" aria-label="Situações da manhã">
        {situacoes.map(({ label, tag, Icon, bg }) => (
          <button
            key={label}
            type="button"
            onClick={() => navigate({ to: "/combinacoes", search: { filtro: tag } })}
            className={`${bg} flex min-h-28 flex-col items-start justify-between rounded-2xl p-4 text-left shadow-soft`}
          >
            <Icon className="h-6 w-6 text-foreground/70" />
            <span className="font-display text-[1rem] font-bold leading-tight">{label}</span>
          </button>
        ))}
      </section>

      <section className="mt-9">
        <h2 className="text-2xl">Escolhidas para hoje</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Três ideias diferentes entre si, para você não repetir a de ontem.
        </p>
        <div className="mt-4 space-y-5">
          {destaques.map((c) => (
            <ComboCard key={c.id} combo={c} />
          ))}
        </div>
      </section>

      <section className="card-soft mt-9 bg-butter-soft p-5">
        <h2 className="flex items-center text-xl">
          Sem ideia para amanhã?
          <InfoTip
            title="Como funciona o sorteio"
            text="O botão só mostra uma combinação aleatória da biblioteca. Nada fica salvo, então você pode sortear quantas vezes quiser."
          />
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Deixe a escolha para o sorteio e siga com o resto da manhã.
        </p>
        <button
          type="button"
          onClick={() => setSorteada(Math.floor(Math.random() * combos.length))}
          className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
        >
          <Dice5 className="h-5 w-5" />
          Sortear uma lancheira
        </button>

        {sorteio ? (
          <Link
            to="/combinacoes/$slug"
            params={{ slug: sorteio.slug }}
            className="mt-4 flex items-center gap-3 rounded-2xl bg-card p-3"
          >
            <img
              src={comboImage(sorteio.id)}
              alt={`Lancheira montada: ${sorteio.name}`}
              className="h-16 w-16 shrink-0 rounded-xl object-cover"
            />
            <span>
              <span className="block font-display font-bold leading-tight">{sorteio.name}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {sorteio.time}, toque para ver como montar
              </span>
            </span>
          </Link>
        ) : null}
      </section>

      <Disclaimer text={DISCLAIMER} />
    </main>
  );
}
