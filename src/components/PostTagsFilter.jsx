export function PostTagsFilter({ tags, activeTag, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full border px-3 py-1 text-xs font-medium ${
          activeTag == null
            ? "border-red-500 bg-red-500 text-white"
            : "border-white/20 bg-zinc-900 text-gray-200 hover:border-red-400"
        }`}
      >
        Tutti
      </button>

      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => onChange(tag.id)}
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
            activeTag === tag.id
              ? "border-red-500 bg-red-500 text-white"
              : "border-white/20 bg-zinc-900 text-gray-200 hover:border-red-400"
          }`}
        >
          <span>{tag.icon}</span>
          <span>{tag.name}</span>
          <span className="text-[10px] opacity-70">({tag.count})</span>
        </button>
      ))}
    </div>
  );
}
