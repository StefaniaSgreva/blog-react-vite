export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/80 text-gray-300">
      <div className="page-container py-8 md:py-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        {/* Brand + pitch */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍕</span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400">
                Pizza Tech
              </span>
              <span className="text-lg font-bold">
                Italia
              </span>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Il blog dove la tradizione della pizza incontra il mondo della tecnologia,
            del business e del design digitale.
          </p>
        </div>

        {/* Navigation */}
        <nav
          className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3"
           aria-label="Link di navigazione nel footer"
        >
          <div className="space-y-2" aria-label="Sezione navigazione sito">
            <h3 className="footer-heading">
              Navigazione
            </h3>
            <a href="#home" className="block hover:text-white">
              Home
            </a>
            <a href="#blog" className="block hover:text-white">
              Articoli
            </a>
            <a href="#pizze" className="block hover:text-white">
              Pizze
            </a>
          </div>

          <div className="space-y-2" aria-label="Sezione pizzeria">
            <h3 className="footer-heading">
              Pizzeria
            </h3>
            <a href="#chi-siamo" className="block hover:text-white">
              Chi siamo
            </a>
            <a href="#contatti" className="block hover:text-white">
              Contatti
            </a>
            <a href="#prenota" className="block hover:text-white">
              Prenota un tavolo
            </a>
          </div>

          <div className="space-y-2" aria-label="Sezione legale">
            <h3 className="footer-heading">
              Legale
            </h3>
            <a href="#privacy" className="block hover:text-white">
              Privacy
            </a>
            <a href="#cookie" className="block hover:text-white">
              Cookie
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="page-container flex flex-col gap-3 py-4 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Pizza Tech Italia. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com" className="hover:text-white">
              Instagram
            </a>
            <a href="https://facebook.com" className="hover:text-white">
              Facebook
            </a>
            <a href="https://github.com" className="hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
