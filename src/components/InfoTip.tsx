import { useState } from "react";
import { Info, X } from "lucide-react";

export function InfoTip({ title, text }: { title: string; text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-flex align-middle no-print">
      <button
        type="button"
        aria-label={`Saber mais sobre ${title}`}
        onClick={() => setOpen(true)}
        className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-soft text-foreground/70 transition-colors hover:bg-sky"
      >
        <Info className="h-3.5 w-3.5" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-soft w-full max-w-sm p-5 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg leading-tight">{title}</h3>
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="rounded-full bg-muted p-1.5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </div>
        </div>
      ) : null}
    </span>
  );
}
