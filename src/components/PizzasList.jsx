import { useEffect, useState, useCallback } from "react";
import { PizzaCard } from "./PizzaCard";
import { PizzaBadgesFilter } from "./PizzaBadgesFilter";

const AUTOPLAY_DELAY = 5000; // intervallo autoplay in ms

/**
 * Hook custom: calcola quante card mostrare per pagina
 * in base alla larghezza viewport
 *
 * - < 640px: 1 card (mobile)
 * - 640–1023px: 2 card (tablet)
 * - >= 1024px: 3 card (desktop)
 */
function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    function update() {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }

    update(); // calcolo iniziale
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visibleCount;
}

export default function PizzasList() {
  // Stato dati base
  const [pizzas, setPizzas] = useState([]);
  const [badges, setBadges] = useState([]);

  // Badge attivo (filtro)
  const [activeBadgeId, setActiveBadgeId] = useState(null);

  // Indice pagina scelto dall'utente (0-based)
  const [pageIndex, setPageIndex] = useState(0);

  // Numero card per pagina, responsivo
  const visibleCount = useVisibleCount();

  /**
   * Carica pizze e badge dai JSON pubblici
   * e arricchisce le pizze con info badge
   */
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

  /**
   * Applica il filtro per badge (se attivo)
   */
  const filteredPizzas =
    activeBadgeId == null
      ? pizzas
      : pizzas.filter((pizza) => pizza.badgeId === activeBadgeId);

  const total = filteredPizzas.length;

  // Numero totale di pagine in base al numero di card per pagina
  const pageCount =
    total === 0 || visibleCount === 0
      ? 0
      : Math.ceil(total / visibleCount);

  /**
   * safePageIndex: versione "clamped" di pageIndex in base a pageCount
   *
   * - Se non ci sono pagine, è 0.
   * - Se pageIndex è fuori range (es. dopo un filtro), viene riportato a pageCount - 1.
   *
   * Questo evita di usare setState dentro un effect per correggere l'indice
   * come raccomandato dalle linee guida React
   */
  const safePageIndex =
    pageCount === 0 ? 0 : Math.min(pageIndex, pageCount - 1);

  // Calcola indice di partenza in base a safePageIndex
  const startIndex = safePageIndex * visibleCount;

  // Pizze visibili nella pagina corrente
  const visiblePizzas = filteredPizzas.slice(
    startIndex,
    startIndex + visibleCount
  );

  /**
   * Vai alla pagina successiva, con wrap
   */
  const handleNext = useCallback(() => {
    if (pageCount === 0) return;
    setPageIndex((prev) => (prev + 1) % pageCount);
  }, [pageCount]);

  /**
   * Vai alla pagina precedente, con wrap
   */
  const handlePrev = useCallback(() => {
    if (pageCount === 0) return;
    setPageIndex((prev) => (prev - 1 + pageCount) % pageCount);
  }, [pageCount]);

  /**
   * Autoplay: cambia pagina ogni AUTOPLAY_DELAY ms
   * È un effetto legittimo perché sincronizza con un timer esterno
   */
  useEffect(() => {
    if (pageCount === 0) return;

    const id = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % pageCount);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [pageCount]);

  /**
   * Accessibilità: navigazione tastiera con frecce sinistra/destra
   * Ignora input/textarea/contentEditable per non interferire con la digitazione
   */
  useEffect(() => {
    function handleKeyDown(event) {
      const target = event.target;
      const tag = target.tagName.toLowerCase();

      if (tag === "input" || tag === "textarea" || target.isContentEditable) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile: 1 card per pagina, niente bullets
  const isMobileSingleCard = visibleCount === 1;

  return (
    <section
      className="space-y-5"
      role="region"
      aria-label="Carosello pizze in evidenza"
      aria-roledescription="carousel" // descrizione semantica per screen reader 
    >
      {/* Filtro badge (categorie pizze) */}
      <PizzaBadgesFilter
        badges={badges}
        activeBadgeId={activeBadgeId}
        onChange={(id) => {
          setActiveBadgeId(id);
          // niente reset manuale di pageIndex: safePageIndex si occuperà di tenerlo valido
        }}
      />

      {total === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-gray-400">
          Nessuna pizza disponibile per questo badge al momento.
        </p>
      ) : (
        <>
          {/* Lista slide visibili (pagina corrente) */}
          <div
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-live="polite" // annuncia i cambi slide senza essere troppo invasivo 
          >
            {visiblePizzas.map((pizza, index) => {
              const slideNumber = startIndex + index + 1;
              return (
                <article
                  key={pizza.id}
                  role="listitem"
                  aria-roledescription="slide"
                  aria-label={`Pizza ${slideNumber} di ${total}`}
                >
                  <PizzaCard pizza={pizza} />
                </article>
              );
            })}
          </div>

          {/* Controlli carosello: bullets (solo non mobile) + frecce */}
          <div
            className="flex flex-col items-center gap-4"
            role="group"
            aria-label="Controlli carosello pizze"
          >
            {/* Bullets di paginazione: nascosti su mobile per UI più semplice */}
            {!isMobileSingleCard && (
              <div className="inline-flex items-center gap-1 rounded-full bg-zinc-900/80 px-2 py-1 shadow-sm ring-1 ring-white/10">
                {Array.from({ length: pageCount }).map((_, index) => {
                  const isActive = index === safePageIndex;
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
                      aria-current={isActive ? "page" : undefined}
                    />
                  );
                })}
              </div>
            )}

            {/* Barra frecce + indicatore pagina: sempre visibile */}
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
                  Pagina {safePageIndex + 1} di {pageCount}
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
