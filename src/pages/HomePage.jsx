import HeroSection from "../components/HeroSection";
import PostsGrid from "../components/PostsGrid";
import PizzasList from "../components/PizzasList";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="border-b border-white/10 bg-gradient-to-b from-black via-zinc-950 to-black"
      >
        <div className="page-container py-12 md:py-16">
          <HeroSection />
        </div>
      </section>

      {/* Blog */}
      <section
        id="blog"
        aria-labelledby="blog-heading"
        aria-label="Sezione ultimi articoli del blog"
        className="border-b border-white/10 bg-black"
      >
        <div className="page-container py-10 md:py-14">
          <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="blog-heading"
                className="text-2xl md:text-3xl font-bold tracking-tight"
              >
                Ultimi articoli
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Approfondimenti su tecnologia, business della ristorazione e design digitale.
              </p>
            </div>
          </header>

          <div className="mt-6">
            <PostsGrid />
          </div>
        </div>
      </section>

      {/* Pizze */}
      <section
        id="pizze"
        aria-labelledby="pizze-heading"
        aria-label="Sezione menù delle pizze"
        className="bg-black"
      >
        <div className="page-container py-10 md:py-14">
          <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                id="pizze-heading"
                className="text-2xl md:text-3xl font-bold tracking-tight"
              >
                Le nostre pizze
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Impasto leggero, ingredienti selezionati e un pizzico di innovazione.
              </p>
            </div>
          </header>

          <div className="mt-6">
            <PizzasList />
          </div>
        </div>
      </section>
    </>
  );
}
