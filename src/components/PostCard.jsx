export function PostCard({ post }) {
  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 transition hover:border-red-500/60 hover:bg-zinc-900/80"
    >
      <img
        src={`https://picsum.photos/seed/${post.id}/600/360`}
        alt={post.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-red-300">
          {post.category}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug group-hover:text-white">
          {post.title}
        </h3>
        <p className="mt-2 text-xs text-gray-400">
          Tempo di lettura: {post.readTime}
        </p>
        <a
          href={`/blog/${post.slug}`}
          aria-label={`Leggi l'articolo: ${post.title}`}
          className="mt-3 inline-flex items-center text-xs font-medium text-red-300 hover:text-red-200"
        >
          Leggi l&apos;articolo
          <span className="ml-1" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </article>
  );
}
