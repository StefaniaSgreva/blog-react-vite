import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Articoli", href: "#blog" },
  { label: "Pizze", href: "#pizze" },
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "Contatti", href: "#contatti" },
];

export default function TheHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="page-container flex items-center justify-between py-3">
        {/* Logo + Brand (no underline on hover) */}
        <a
          href="#home"
          className="site-logo flex items-center gap-2"
        >
          <span className="text-2xl">🍕</span>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400">
              Pizza Tech
            </span>
            <span className="text-lg font-bold">
              Italia
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium"
          aria-label="Navigazione principale"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-white  transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA: solo bottone */}
        <div className="hidden md:flex items-center gap-3">
          <button type="button">
            Prenota un tavolo
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-full p-2 border bg-black/50 text-gray-200 transition-colors duration-200 border-white/20"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Chiudi menu di navigazione" : "Apri menu di navigazione"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="sr-only">
            {isOpen ? "Chiudi menu" : "Apri menu"}
          </span>
          <span className="relative block w-5 h-4">
            {/* Linea 1 */}
            <span
              className={`absolute left-0 block h-0.5 w-full transition-all duration-200 ${
                isOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45 bg-red-500"
                  : "top-0 bg-current"
              }`}
            />
            {/* Linea 2 */}
            <span
              className={`absolute left-0 block h-0.5 w-full transition-all duration-200 ${
                isOpen
                  ? "opacity-0"
                  : "top-1/2 -translate-y-1/2 opacity-100 bg-current"
              }`}
            />
            {/* Linea 3 */}
            <span
              className={`absolute left-0 block h-0.5 w-full transition-all duration-200 ${
                isOpen
                  ? "top-1/2 -translate-y-1/2 -rotate-45 bg-red-500"
                  : "bottom-0 bg-current"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-white/10 bg-black/90"
          aria-label="Navigazione principale mobile"
        >
          <div className="page-container py-3 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-2 text-sm font-medium text-gray-200 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-3 w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              Prenota un tavolo
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
