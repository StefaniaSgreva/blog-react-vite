const filterColorClasses = {
  emerald: "border-emerald-400 bg-emerald-500/10 text-emerald-100",
  red: "border-red-400 bg-red-500/10 text-red-100",
  purple: "border-purple-400 bg-purple-500/10 text-purple-100",
  lime: "border-lime-400 bg-lime-500/10 text-lime-100",
  yellow: "border-yellow-400 bg-yellow-500/10 text-yellow-100",
  amber: "border-amber-400 bg-amber-500/10 text-amber-100",
  sky: "border-sky-400 bg-sky-500/10 text-sky-100",
};

export function PizzaBadgesFilter({ badges, activeBadgeId, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full border px-3 py-1 text-xs font-medium ${
          activeBadgeId == null
            ? "border-red-500 bg-red-500 text-white"
            : "border-white/20 bg-zinc-900 text-gray-200 hover:border-red-400"
        }`}
      >
        Tutte
      </button>

      {badges
        .filter((badge) => badge.id !== 0)
        .map((badge) => {
          const base =
            filterColorClasses[badge.color] ||
            "border-white/20 bg-zinc-900 text-gray-200";
          const active =
            activeBadgeId === badge.id
              ? "border-red-500 bg-red-500 text-white"
              : base;

          return (
            <button
              key={badge.id}
              type="button"
              onClick={() => onChange(badge.id)}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition hover:border-red-400 ${active}`}
            >
              {badge.icon && <span>{badge.icon}</span>}
              <span>{badge.label}</span>
            </button>
          );
        })}
    </div>
  );
}
