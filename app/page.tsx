import { Navbar } from "@/components/Navbar";
import { HeroScroll } from "@/components/HeroScroll";
import { PlaneMorph } from "@/components/PlaneMorph";
import { Globe } from "@/components/Globe";

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Airline",
    name: "Hairo Jets",
    description:
      "Premium private aviation with cinematic presentation, discreet coordination, and global reach.",
    url: "https://hairojets.com",
    areaServed: "Worldwide",
    serviceType: "Private jet charter",
  };

  return (
    <main className="bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <section className="mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-24 pt-32">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.45em] text-white/60">
            Hairo Jets
          </p>
          <h1 className="mt-5 text-5xl font-medium tracking-[-0.06em] md:text-7xl">
            Private aviation, reimagined with cinematic precision.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/68 md:text-base">
            Every arrival is composed. Every departure, effortless.
          </p>
        </div>
      </section>
      <HeroScroll />
      <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <h2 className="sr-only">Why choose Hairo Jets</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Discretion
            </p>
            <p className="mt-3 text-lg text-white/85">
              A service built around calm coordination and private oversight.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Range
            </p>
            <p className="mt-3 text-lg text-white/85">
              Global access with the confidence of a dedicated flight
              experience.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">
              Precision
            </p>
            <p className="mt-3 text-lg text-white/85">
              Luxury details handled with timing, clarity, and restraint.
            </p>
          </div>
        </div>
      </section>
      <PlaneMorph />
      <Globe />
    </main>
  );
}
