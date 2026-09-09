import { createFileRoute, notFound } from "@tanstack/react-router";
import { Clock, Users, Printer } from "lucide-react";
import { comboImage, DISCLAIMER, getCombo } from "@/data/combos";
import { BackButton, Disclaimer } from "@/components/PageHeader";
import { TagPill } from "@/components/ComboCard";
import { InfoTip } from "@/components/InfoTip";

export const Route = createFileRoute("/combinacoes/$slug")({
  loader: ({ params }) => {
    const combo = getCombo(params.slug);
    if (!combo) throw notFound();
    return combo;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Combinação"} | Lancheira que Não Volta Inteira` },
      {
        name: "description",
        content: loaderData?.summary ?? "Combinação simples para a lancheira escolar.",
      },
      { property: "og:title", content: loaderData?.name ?? "Combinação para a lancheira" },
      { property: "og:description", content: loaderData?.summary ?? "" },
    ],
  }),
  component: ComboPage,
});

function Bloco({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card-soft print-card mt-5 p-5">
      <h2 className="flex items-center text-xl leading-tight">{title}</h2>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function ComboPage() {
  const combo = Route.useLoaderData();

  return (
    <main>
      <div className="pt-5">
        <BackButton />
      </div>

      <img
        src={comboImage(combo.id)}
        alt={`Lancheira montada: ${combo.name}`}
        className="mt-4 h-64 w-full rounded-3xl object-cover shadow-lift"
      />

      <h1 className="mt-5 text-3xl leading-tight">{combo.name}</h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {combo.tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-secondary">
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {combo.time}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          {combo.portions}
        </span>
      </div>

      <Bloco title="Ingredientes">
        <ul className="space-y-1.5">
          {combo.ingredients.map((i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
              {i}
            </li>
          ))}
        </ul>
      </Bloco>

      <Bloco title="Como montar">
        <ol className="space-y-3">
          {combo.steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-butter font-display font-bold text-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </Bloco>

      <Bloco
        title={
          <>
            Você pode deixar pronto antes?
            <InfoTip
              title="Pode preparar antes?"
              text="São itens que você consegue deixar encaminhados no domingo ou na noite anterior para ganhar tempo durante a semana."
            />
          </>
        }
      >
        {combo.prepAhead}
      </Bloco>

      <Bloco title="Trocas simples">{combo.swaps}</Bloco>

      <Bloco title="Não esquecer na lancheira">{combo.remember}</Bloco>

      <button
        type="button"
        onClick={() => window.print()}
        className="no-print mt-6 flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground"
      >
        <Printer className="h-5 w-5" />
        Imprimir esta combinação
      </button>

      <Disclaimer text={DISCLAIMER} />
      <p className="print-only mt-6 text-xs">Lancheira que Não Volta Inteira</p>
    </main>
  );
}
