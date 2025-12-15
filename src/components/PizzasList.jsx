import { useEffect, useState } from "react";
import { PizzaCard } from "./PizzaCard";

export default function PizzasList() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/pizze.json").then((res) => res.json()),
      fetch("/data/pizza-badges.json").then((res) => res.json()),
    ])
      .then(([pizzeData, badgesData]) => {
        const badgeMap = new Map(
          badgesData.badges.map((b) => [b.id, b.label])
        );

        const top3 = pizzeData.pizze
          .filter((pizza) => pizza.published)
          .slice(0, 3)
          .map((pizza) => ({
            ...pizza,
            badge: badgeMap.get(pizza.badgeId) || "",
          }));

        setPizzas(top3);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}
