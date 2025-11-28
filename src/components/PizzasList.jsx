const MOCK_PIZZAS = [
  {
    id: 1,
    name: "Margherita Classica",
    description: "Pomodoro San Marzano, fiordilatte, basilico fresco, olio EVO.",
    price: "7,50 €",
    badge: "Best seller",
  },
  {
    id: 2,
    name: "Diavola Tech",
    description: "Spianata piccante, olive taggiasche, jalapeño, buffer per il palato.",
    price: "9,50 €",
    badge: "Piccante",
  },
  {
    id: 3,
    name: "Veg Power",
    description: "Verdure di stagione, crema di zucca, semi tostati, zero compromessi.",
    price: "10,00 €",
    badge: "Vegana",
  },
];

export default function PizzasList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {MOCK_PIZZAS.map((pizza) => (
        <article
          key={pizza.id}
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-950/70 p-4 transition hover:border-red-500/60 hover:bg-zinc-900/80"
        >
          <header className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-white">
                {pizza.name}
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                {pizza.description}
              </p>
            </div>
            {pizza.badge && (
              <span className="inline-flex items-center rounded-full border border-red-500/40 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-red-300">
                {pizza.badge}
              </span>
            )}
          </header>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">{pizza.price}</span>
            <button type="button">
              Aggiungi alla comanda
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
