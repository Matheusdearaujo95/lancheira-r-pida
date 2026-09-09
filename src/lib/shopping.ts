export type Section =
  | "Hortifruti"
  | "Padaria"
  | "Geladeira"
  | "Mercearia"
  | "Preparo caseiro"
  | "Itens de apoio";

export const SECTIONS: Section[] = [
  "Hortifruti",
  "Padaria",
  "Geladeira",
  "Mercearia",
  "Preparo caseiro",
  "Itens de apoio",
];

const rules: { section: Section; words: string[] }[] = [
  {
    section: "Hortifruti",
    words: [
      "uva",
      "banana",
      "maçã",
      "morango",
      "tomate",
      "cenoura",
      "pera",
      "melão",
      "manga",
      "mamão",
      "tangerina",
      "mexerica",
      "abobrinha",
      "cebola",
      "pepino",
      "brócolis",
      "fruta",
      "legume",
      "cheiro verde",
      "limão",
    ],
  },
  {
    section: "Padaria",
    words: ["pão", "pãezinho", "pãozinho", "tortilha", "torrad", "sírio", "bolo caseiro", "biscoito caseiro"],
  },
  {
    section: "Geladeira",
    words: [
      "queijo",
      "requeijão",
      "ricota",
      "cottage",
      "iogurte",
      "leite",
      "ovo",
      "manteiga",
      "frango",
      "muçarela",
      "parmesão",
      "meia cura",
    ],
  },
  {
    section: "Mercearia",
    words: [
      "farinha",
      "aveia",
      "polvilho",
      "açúcar",
      "óleo",
      "goma",
      "atum",
      "milho",
      "ervilha",
      "arroz",
      "fermento",
      "pó royal",
      "canela",
      "sal",
      "orégano",
      "uva passa",
      "castanha",
      "azeite",
      "molho de tomate",
      "geleia",
      "chocolate",
    ],
  },
  {
    section: "Preparo caseiro",
    words: ["massa", "panqueca", "muffin", "cookies", "recheio", "bolinho", "mini bolo", "sachê"],
  },
  {
    section: "Itens de apoio",
    words: ["água", "suco", "bebida", "garrafinha", "papel manteiga", "guardanapo", "gelo", "coco"],
  },
];

export function sectionFor(item: string): Section {
  const lower = item.toLowerCase();
  for (const rule of rules) {
    if (rule.words.some((w) => lower.includes(w))) return rule.section;
  }
  return "Mercearia";
}

const stripQuantity = (item: string) =>
  item
    .replace(/^\d+([.,]\d+)?\s*/i, "")
    .replace(/^(g|kg|ml|l|xícaras?|xícara|colheres?|colher|fatias?|latas?|punhados?|unidades?|cachos?|rodelas?|potinhos?)\s+(de\s+)?/i, "")
    .replace(/^(de\s+)/i, "")
    .trim();

export function buildList(itemLists: string[][]) {
  const map = new Map<string, string>();
  for (const list of itemLists) {
    for (const raw of list) {
      const clean = stripQuantity(raw);
      const label = clean.charAt(0).toUpperCase() + clean.slice(1);
      map.set(label.toLowerCase(), label);
    }
  }
  const grouped: Record<Section, string[]> = {
    Hortifruti: [],
    Padaria: [],
    Geladeira: [],
    Mercearia: [],
    "Preparo caseiro": [],
    "Itens de apoio": [],
  };
  for (const label of map.values()) {
    grouped[sectionFor(label)].push(label);
  }
  for (const key of SECTIONS) grouped[key].sort((a, b) => a.localeCompare(b, "pt-BR"));
  return grouped;
}
