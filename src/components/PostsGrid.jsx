// In seguito leggerai i dati reali da /public/data/posts-complete.json
const MOCK_POSTS = [
  {
    id: 1,
    title: "Come usare i social per riempire la sala il giovedì sera",
    category: "Marketing",
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Ottimizzare i costi ingredienti senza perdere qualità",
    category: "Business",
    readTime: "6 min",
  },
  {
    id: 3,
    title: "Sito web per pizzeria: cosa non deve mancare",
    category: "Tech",
    readTime: "7 min",
  },
];

export default function PostsGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {MOCK_POSTS.map((post) => (
        <article
          key={post.id}
          className="group rounded-2xl border border-white/10 bg-zinc-950/70 p-4 transition hover:border-red-500/60 hover:bg-zinc-900/80"
        >
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
            href="#"
            className="mt-3 inline-flex items-center text-xs font-medium text-red-300 hover:text-red-200"
          >
            Leggi l&apos;articolo
            <span className="ml-1" aria-hidden="true">
              →
            </span>
          </a>
        </article>
      ))}
    </div>
  );
}
