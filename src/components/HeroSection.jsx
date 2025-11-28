export default function HeroSection() {
  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400">
          Pizza Tech Italia · Blog & Pizzeria
        </p>
        <h1
          id="hero-heading"
          className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight"
        >
          Dove la pizza incontra
          <span className="block text-red-400">
            tecnologia, business e design.
          </span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-gray-300 max-w-xl">
          Strategie digitali, strumenti e ispirazioni per far crescere la tua pizzeria
          e il tuo brand nel mondo online, senza dimenticare l&apos;impasto.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href="#blog">
            <button type="button">
              Leggi gli ultimi articoli
            </button>
          </a>
          <a
            href="#pizze"
            className="text-xs font-medium uppercase tracking-wide text-gray-300 hover:text-white"
          >
            Guarda il menù delle pizze
          </a>
        </div>

        <dl className="mt-6 grid grid-cols-3 gap-4 text-xs text-gray-400 max-w-xs">
          <div>
            <dt className="font-semibold text-gray-300">Articoli</dt>
            <dd>Marketing, tool e casi studio per pizzerie moderne.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Ricette</dt>
            <dd>Impasti, topping creativi e processi di cucina.</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-300">Tech</dt>
            <dd>POS, delivery, siti web e automazioni.</dd>
          </div>
        </dl>
      </div>

      <div className="relative">
        <div className="aspect-[4/3] w-full rounded-3xl border border-white/10 bg-gradient-to-br from-red-500/40 via-orange-500/30 to-yellow-500/20 shadow-[0_0_80px_rgba(248,113,113,0.35)]" />
        <div className="absolute inset-4 rounded-3xl border border-white/10 bg-black/60 backdrop-blur flex flex-col justify-between p-4">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="font-semibold uppercase tracking-[0.16em] text-red-300">
              Pizza Dashboard
            </span>
            <span className="text-gray-400">Stato serata</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>Coperti prenotati</span>
              <span className="font-semibold text-green-400">+32</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery attivi</span>
              <span className="font-semibold text-yellow-300">14</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pizze vendute oggi</span>
              <span className="font-semibold text-red-300">128</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-400">
            Numeri simulati, ma insight reali per ottimizzare il tuo servizio e la tua
            presenza digitale.
          </p>
        </div>
      </div>
    </div>
  );
}
