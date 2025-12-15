import { useEffect, useState } from "react";
import { PizzaCard } from "./PizzaCard";
import { PizzaBadgesFilter } from "./PizzaBadgesFilter";

export default function PizzasList() {
  const [pizzas, setPizzas] = useState([]);
  const [badges, setBadges] = useState([]);
  const [activeBadgeId, setActiveBadgeId] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/pizze.json").then((res) => res.json()),
      fetch("/data/pizza_badges.json").then((res) => res.json()),
    ])
      .then(([pizzeData, badgesData]) => {
        setBadges(badgesData.badges);

        const badgeMap = new Map(
          badgesData.badges.map((b) => [b.id, b])
        );

        const top3 = pizzeData.pizze
          .filter((pizza) => pizza.published)
          .slice(0, 3)
          .map((pizza) => {
            const badge = badgeMap.get(pizza.badgeId) || {};
            return {
              ...pizza,
              badge: badge.label || "",
              badgeColor: badge.color || "",
              badgeIcon: badge.icon || "",
            };
          });

        setPizzas(top3);
      })
      .catch(console.error);
  }, []);

  const filteredPizzas =
    activeBadgeId == null
      ? pizzas
      : pizzas.filter((pizza) => pizza.badgeId === activeBadgeId);

  return (
    <section className="space-y-4">
      <PizzaBadgesFilter
        badges={badges}
        activeBadgeId={activeBadgeId}
        onChange={setActiveBadgeId}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </section>
  );
}
