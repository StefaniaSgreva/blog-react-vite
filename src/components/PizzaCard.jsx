const badgeColorClasses = {
  emerald: "bg-emerald-500/90 border-emerald-500/60",
  red: "bg-red-500/90 border-red-500/60",
  purple: "bg-purple-500/90 border-purple-500/60",
  lime: "bg-lime-500/90 border-lime-500/60",
  yellow: "bg-yellow-500/90 border-yellow-500/60",
  amber: "bg-amber-500/90 border-amber-500/60",
  sky: "bg-sky-500/90 border-sky-500/60",
};

export function PizzaCard({ pizza }) {
  const badgeClass =
    badgeColorClasses[pizza.badgeColor] ||
    "bg-red-500/90 border-red-500/60";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 transition hover:border-red-500/60 hover:bg-zinc-900/80">
      <div className="relative">
        <img
          src={`https://picsum.photos/seed/pizza-${pizza.id}/600/360`}
          alt={pizza.name}
          className="h-40 w-full object-cover"
        />

        {pizza.badge && (
          <span
            className={`absolute right-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-md border ${badgeClass}`}
          >
            {pizza.badgeIcon && <span>{pizza.badgeIcon}</span>}
            <span>{pizza.badge}</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {pizza.name}
          </h3>
          <p className="my-2 text-xs text-gray-400 line-clamp-1">
            {pizza.description}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-white">{pizza.price}</span>
          <button
            type="button"
            className="text-xs font-medium text-red-300 hover:text-red-200"
          >
            Aggiungi alla comanda
          </button>
        </div>
      </div>
    </article>
  );
}

