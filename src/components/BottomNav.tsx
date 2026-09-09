import { Link } from "@tanstack/react-router";
import { Sun, LayoutGrid, CalendarDays, ShoppingBasket, BookOpen } from "lucide-react";

const items = [
  { to: "/", label: "Hoje", Icon: Sun },
  { to: "/combinacoes", label: "Combinações", Icon: LayoutGrid },
  { to: "/semana", label: "Semana", Icon: CalendarDays },
  { to: "/compras", label: "Compras", Icon: ShoppingBasket },
  { to: "/guia", label: "Guia", Icon: BookOpen },
];

export function BottomNav() {
  return (
    <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur">
      <ul className="mx-auto flex max-w-xl items-stretch justify-between px-2 py-1.5">
        {items.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[0.7rem] font-semibold text-muted-foreground transition-colors"
              activeProps={{ className: "bg-coral-soft text-primary" }}
            >
              <Icon className="h-5 w-5" />
              <span className="leading-none">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
