export type Guia = {
  slug: string;
  title: string;
  intro: string;
  icon: string;
  steps: string[];
};

export const guias: Guia[] = [
  {
    slug: "ganhar-tempo-no-domingo",
    title: "Como ganhar tempo no domingo",
    intro: "Uma hora no domingo tira o peso das cinco manhãs.",
    icon: "CalendarCheck",
    steps: [
      "Escolha duas receitas para assar e congelar em porções.",
      "Lave e seque as frutas que aguentam a semana.",
      "Rale queijo e cenoura e guarde em potes pequenos.",
      "Separe cinco potinhos e cinco saquinhos já limpos.",
      "Deixe a lista da semana colada na porta da geladeira.",
    ],
  },
  {
    slug: "lancheira-em-5-minutos",
    title: "Como montar uma lancheira em 5 minutos",
    intro: "A regra é simples: uma base, uma fruta, uma bebida.",
    icon: "Timer",
    steps: [
      "Escolha a base (pão, tapioca, bolinho ou muffin).",
      "Junte uma fruta que já esteja lavada.",
      "Coloque a bebida em pé no bolso lateral.",
      "Feche com guardanapo e gelo reutilizável.",
    ],
  },
  {
    slug: "preparar-na-noite-anterior",
    title: "O que preparar na noite anterior",
    intro: "Cinco minutos à noite valem quinze de manhã.",
    icon: "MoonStar",
    steps: [
      "Tire do congelador o que vai assar ou descongelar.",
      "Corte a fruta que não escurece e guarde em pote.",
      "Encha a garrafinha e deixe na geladeira.",
      "Deixe a lancheira aberta na bancada com os potes dentro.",
    ],
  },
  {
    slug: "evitar-mandar-sempre-a-mesma-coisa",
    title: "Como evitar mandar sempre a mesma coisa",
    intro: "Não é falta de ideia, é falta de um sistema simples.",
    icon: "Shuffle",
    steps: [
      "Separe a semana em: dois salgados, dois doces caseiros e um dia livre.",
      "Troque só a fruta e a bebida quando o tempo estiver curto.",
      "Use o botão de sortear quando bater o branco.",
      "Anote o que ela comeu inteiro e repita esse formato com outro recheio.",
    ],
  },
  {
    slug: "trocas-simples",
    title: "Trocas simples quando faltar um ingrediente",
    intro: "Faltou um item? Quase sempre tem um substituto no armário.",
    icon: "Repeat",
    steps: [
      "Queijo branco vira requeijão, ricota ou cottage.",
      "Frango desfiado vira ovo cozido amassado ou atum bem escorrido.",
      "Morango vira uva, melão ou a fruta que estiver boa.",
      "Pão de forma vira tapioca, pão sírio ou pãozinho.",
      "Suco vira água, sempre uma opção tranquila.",
    ],
  },
  {
    slug: "checklist-antes-de-fechar",
    title: "Checklist antes de fechar a lancheira",
    intro: "Passe o olho rápido nesses cinco itens.",
    icon: "ListChecks",
    steps: [
      "Bebida fechada e em pé.",
      "Gelo reutilizável quando tiver queijo, ovo, frango ou iogurte.",
      "Guardanapo e garfinho ou colher, se precisar.",
      "Pote testado, sem tampa frouxa.",
      "Nome da criança na lancheira e nos potes.",
    ],
  },
];

export const guiaImage = (slug: string) => `/images/guias/${slug}.svg`;
