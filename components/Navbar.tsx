"use client";

export function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-xs uppercase tracking-[0.35em] text-white/80">
        <span>Hairo Jets</span>
        <nav className="hidden gap-8 md:flex">
          <a href="#fleet" className="transition hover:text-white">Fleet</a>
          <a href="#experience" className="transition hover:text-white">Experience</a>
          <a href="#contact" className="transition hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
