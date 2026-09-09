import { Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { comboImage, type Combo } from "@/data/combos";

export function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-sage-soft px-2.5 py-1 text-[0.7rem] font-semibold text-foreground/75">
      {children}
    </span>
  );
}

export function ComboCard({ combo }: { combo: Combo }) {
  return (
    <article className="card-soft print-card overflow-hidden">
      <img
        src={comboImage(combo.id)}
        alt={`Lancheira montada: ${combo.name}`}
        loading="lazy"
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg leading-tight">{combo.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{combo.summary}</p>
        <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-secondary">
          <Clock className="h-4 w-4" />
          {combo.time}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {combo.tags.slice(0, 3).map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
        <Link
          to="/combinacoes/$slug"
          params={{ slug: combo.slug }}
          className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-4 font-semibold text-primary-foreground"
        >
          Ver como montar
        </Link>
      </div>
    </article>
  );
}
