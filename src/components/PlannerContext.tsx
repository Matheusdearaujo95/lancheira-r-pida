import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export const DAYS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"] as const;
export type Day = (typeof DAYS)[number];

type Plan = Partial<Record<Day, string>>;

type Ctx = {
  plan: Plan;
  setDay: (day: Day, slug: string) => void;
  clearDay: (day: Day) => void;
};

const PlannerContext = createContext<Ctx | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>({});

  const value = useMemo<Ctx>(
    () => ({
      plan,
      setDay: (day, slug) => setPlan((p) => ({ ...p, [day]: slug })),
      clearDay: (day) =>
        setPlan((p) => {
          const next = { ...p };
          delete next[day];
          return next;
        }),
    }),
    [plan],
  );

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner precisa estar dentro de PlannerProvider");
  return ctx;
}
