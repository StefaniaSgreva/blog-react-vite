import { useEffect, useState } from "react";
import { PizzaCard } from "./PizzaCard";
import { PizzaBadgesFilter } from "./PizzaBadgesFilter";

const VISIBLE_COUNT = 3;
const AUTOPLAY_DELAY = 5000;

export default function PizzasList() {
  const [pizzas, setPizzas] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activeBadgeId, setActiveBadgeId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0); // pagina, non più startIndex

  useEffect(() => {
    Promise.all([
      fetch("/data/pizze.json").then((res) => res.json()),
      fetch("/data/pizza_badges.json").then((res) => res.json()),
    ])
      .then(([pizzeData, badgesData]) => {
        setBadges(badgesData.badges);

        const badgeMap = new Map(badgesData.badges.map((b) => [b.id, b]));

        const all = pizzeData.pizze
          .filter((pizza) => pizza.published)
          .map((pizza) => {
            const badge = badgeMap.get(pizza.badgeId) || {};
            return {
              ...pizza,
              badge: badge.label || "",
              badgeColor: badge.color || "",
              badgeIcon: badge.icon || "",
            };
          });

        setPizzas(all);
      })
      .catch(console.error);
  }, []);

  const filteredPizzas =
    activeBadgeId == null
      ? pizzas
      : pizzas.filter((pizza) => pizza.badgeId === activeBadgeId);

  const total = filteredPizzas.length;
  const pageCount = total === 0 ? 0 : Math.ceil(total / VISIBLE_COUNT);

  // indice di partenza basato sulla pagina
  const startIndex = pageIndex * VISIBLE_COUNT;

  const visiblePizzas = filteredPizzas.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  const handleNext = () => {
    if (pageCount === 0) return;
    setPageIndex((prev) => (prev + 1) % pageCount);
  };

  const handlePrev = () => {
    if (pageCount === 0) return;
    setPageIndex((prev) => (prev - 1 + pageCount) % pageCount);
  };

  // Autoplay: cambia pagina ogni 5s
  useEffect(() => {
    if (pageCount === 0) return;

    const id = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % pageCount);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [pageCount]);

  return (
    <section className="space-y-5">
      <PizzaBadgesFilter
        badges={badges}
        activeBadgeId={activeBadgeId}
        onChange={(id) => {
          setActiveBadgeId(id);
          setPageIndex(0);
        }}
      />

      {total === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-gray-400">
          Nessuna pizza disponibile per questo badge al momento.
        </p>
      ) : (
        <>
          {/* Griglia carosello */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visiblePizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} />
            ))}
          </div>

          {/* Bullets per pagina + frecce */}
          <div className="flex flex-col items-center gap-4">
            {/* Bullets per pagina */}
            <div className="inline-flex items-center gap-1 rounded-full bg-zinc-900/80 px-2 py-1 shadow-sm ring-1 ring-white/10">
              {Array.from({ length: pageCount }).map((_, index) => {
                const isActive = index === pageIndex;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPageIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      isActive
                        ? "w-5 bg-red-500 shadow-[0_0_0_1px_rgba(248,113,113,0.6)]"
                        : "w-2.5 bg-zinc-600 hover:bg-zinc-400"
                    }`}
                    aria-label={`Vai alla pagina ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Barra di navigazione */}
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/80 px-4 py-2 shadow-sm">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs text-gray-100 hover:bg-red-500 hover:text-white disabled:opacity-40"
                aria-label="Pagina precedente"
                disabled={pageCount === 0}
              >
                ←
              </button>

              <div className="flex flex-col items-center px-1">
                <span className="text-[11px] text-gray-300">
                  Pagina {pageIndex + 1} di {pageCount}
                </span>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs text-gray-100 hover:bg-red-500 hover:text-white disabled:opacity-40"
                aria-label="Pagina successiva"
                disabled={pageCount === 0}
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
