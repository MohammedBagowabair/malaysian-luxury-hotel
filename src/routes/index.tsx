import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero.jpg";
import suite from "@/assets/suite.jpg";
import spa from "@/assets/spa.jpg";
import dining from "@/assets/dining.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Serai Tanjung Langkawi — Rainforest & Sea Resort, Malaysia" },
      {
        name: "description",
        content:
          "A five-star hillside sanctuary on Langkawi's northwest coast. Ocean-view villas, Malay fine dining and a rainforest spa.",
      },
      { property: "og:title", content: "Serai Tanjung Langkawi" },
      {
        property: "og:description",
        content: "Where the rainforest meets the Andaman Sea. A five-star Malaysian resort.",
      },
    ],
  }),
  component: Index,
});

const nav = ["Stay", "Dine", "Wellness", "Experiences", "Offers"];

const rooms = [
  { name: "Rimba Deluxe", size: "58 m²", view: "Rainforest canopy", price: "1,150", img: suite },
  { name: "Samudera Ocean Suite", size: "96 m²", view: "Andaman Sea", price: "2,400", img: hero },
  { name: "Serai Pool Villa", size: "180 m²", view: "Private pool & sunset", price: "4,800", img: spa },
];

const experiences = [
  { t: "Mangrove Kayak at Dawn", d: "Paddle the Kilim Geoforest with our resident naturalist." },
  { t: "Kampung Cooking Class", d: "Pound sambal and fold ketupat with Chef Rosnah's family recipes." },
  { t: "Sunset Island Sail", d: "A private catamaran to Pulau Dayang Bunting, champagne on board." },
  { t: "Batik Atelier", d: "Hand-paint your own sarong with a Kelantanese master artisan." },
];

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [booked, setBooked] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 60);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <div className="overflow-x-hidden" suppressHydrationWarning>
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ink/95 py-3 backdrop-blur" : "py-6"
        } text-ink-foreground`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#top" className="leading-none">
            <span className="block font-display text-2xl tracking-wide">Serai Tanjung</span>
            <span className="eyebrow text-[0.55rem] text-gold">Langkawi · Malaysia</span>
          </a>
          <nav className="hidden gap-9 text-sm lg:flex">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="opacity-80 transition hover:text-gold hover:opacity-100">
                {n}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="#book" className="hidden border border-gold px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold transition hover:bg-gold hover:text-ink sm:inline-block">
              Reserve
            </a>
            <button aria-label="Menu" onClick={() => setMenu(!menu)} className="lg:hidden">
              <div className="space-y-1.5">
                <span className="block h-px w-6 bg-ink-foreground" />
                <span className="block h-px w-6 bg-ink-foreground" />
                <span className="block h-px w-4 bg-ink-foreground" />
              </div>
            </button>
          </div>
        </div>
        {menu && (
          <div className="mt-3 flex flex-col gap-4 bg-ink px-6 py-6 lg:hidden">
            {nav.map((n) => (
              <a key={n} onClick={() => setMenu(false)} href={`#${n.toLowerCase()}`} className="font-display text-2xl">
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-ink-foreground">
        <img src={hero} alt="Infinity pool at sunset overlooking the Andaman Sea" width={1920} height={1088} className="animate-slowzoom absolute inset-0 h-full w-full object-cover" />
        <div className="veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-40 md:pb-48">
          <p className="eyebrow animate-rise text-gold">Est. 1998 · Pantai Datai</p>
          <h1 className="animate-rise mt-5 max-w-4xl text-5xl leading-[1.02] md:text-8xl" style={{ animationDelay: ".15s" }}>
            Where the rainforest <em className="text-gold">meets</em> the sea.
          </h1>
          <p className="animate-rise mt-6 max-w-lg text-base opacity-85 md:text-lg" style={{ animationDelay: ".3s" }}>
            Eighty-two villas and suites tucked into ten-million-year-old jungle on Langkawi's northwest shore.
          </p>
        </div>

        {/* Booking bar */}
        <form
          id="book"
          onSubmit={(e) => {
            e.preventDefault();
            setBooked(true);
          }}
          className="absolute inset-x-4 bottom-6 mx-auto grid max-w-5xl grid-cols-2 gap-px overflow-hidden bg-border/30 text-foreground shadow-2xl md:inset-x-6 md:grid-cols-5"
        >
          {[
            { l: "Check in", t: "date" },
            { l: "Check out", t: "date" },
          ].map((f) => (
            <label key={f.l} className="bg-card px-5 py-3">
              <span className="eyebrow block text-[0.6rem] text-muted-foreground">{f.l}</span>
              <input required type={f.t} className="w-full bg-transparent text-sm outline-none" />
            </label>
          ))}
          <label className="bg-card px-5 py-3">
            <span className="eyebrow block text-[0.6rem] text-muted-foreground">Guests</span>
            <select className="w-full bg-transparent text-sm outline-none">
              <option>2 Adults</option><option>1 Adult</option><option>2 Adults, 1 Child</option><option>4 Adults</option>
            </select>
          </label>
          <label className="bg-card px-5 py-3">
            <span className="eyebrow block text-[0.6rem] text-muted-foreground">Promo</span>
            <input placeholder="Optional" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <button className="col-span-2 bg-accent px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground transition hover:bg-gold md:col-span-1">
            {booked ? "Checking availability ✓" : "Check availability"}
          </button>
        </form>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-12 md:py-40">
        <div className="reveal md:col-span-5">
          <p className="eyebrow text-accent">Selamat Datang</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-6xl">A quiet kind of luxury, rooted in Malay hospitality.</h2>
        </div>
        <div className="reveal space-y-6 text-muted-foreground md:col-span-6 md:col-start-7 md:pt-10">
          <p className="text-lg leading-relaxed">
            Named for the lemongrass that lines our forest paths and the headland we call home, Serai Tanjung is a place to
            slow down. Hornbills at breakfast, a private cove by noon, gamelan under the stars.
          </p>
          <div className="grid grid-cols-3 gap-6 border-t pt-8 text-foreground">
            {[["82", "Villas & suites"], ["1.2km", "Private beach"], ["4", "Restaurants & bars"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-4xl text-primary md:text-5xl">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms */}
      <section id="stay" className="bg-secondary py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-accent">Stay</p>
              <h2 className="mt-3 text-4xl md:text-6xl">Villas & Suites</h2>
            </div>
            <p className="max-w-sm text-muted-foreground">Teak, songket and stone — every room frames the jungle or the sea.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {rooms.map((r, i) => (
              <article key={r.name} className="reveal group" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={r.img} alt={r.name} loading="lazy" className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" />
                </div>
                <h3 className="mt-5 text-2xl md:text-3xl">{r.name}</h3>
                <div className="mt-2 flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
                  <span>{r.size} · {r.view}</span>
                  <span className="whitespace-nowrap">from <b className="font-semibold text-foreground">RM {r.price}</b></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dining */}
      <section id="dine" className="relative bg-ink text-ink-foreground">
        <div className="grid md:grid-cols-2">
          <img src={dining} alt="Nasi kerabu and grilled prawns" loading="lazy" className="h-[60vh] w-full object-cover md:h-full" />
          <div className="reveal flex flex-col justify-center px-6 py-20 md:px-16 md:py-32">
            <p className="eyebrow text-gold">Dine</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-6xl">Dapur Serai</h2>
            <p className="mt-6 max-w-md leading-relaxed opacity-80">
              Heirloom recipes from the Malay peninsula, reimagined over open flame. Butterfly-pea nasi kerabu, tiger prawns
              grilled in banana leaf, and a kuih trolley that is worth the journey alone.
            </p>
            <ul className="mt-10 space-y-4 border-t border-ink-foreground/15 pt-8 text-sm">
              {[["Dapur Serai", "Malay fine dining · Dinner"], ["Ombak", "Beach grill · All day"], ["Teh Tarik Lounge", "Afternoon tea · Cocktails"]].map(([a, b]) => (
                <li key={a} className="flex justify-between"><span className="font-display text-xl">{a}</span><span className="opacity-60">{b}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Wellness */}
      <section id="wellness" className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-28 md:grid-cols-2 md:py-40">
        <div className="reveal order-2 md:order-1">
          <p className="eyebrow text-accent">Wellness</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-6xl">Spa Rimba</h2>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Six open-air pavilions beside a forest stream. Our therapists draw on traditional urut massage, jamu herbal
            tonics and warm pandan compresses.
          </p>
          <a href="#book" className="mt-10 inline-block border-b border-accent pb-1 text-xs uppercase tracking-[0.25em]">Book a treatment →</a>
        </div>
        <div className="reveal order-1 md:order-2">
          <img src={spa} alt="Stone bath with frangipani in a forest spa pavilion" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="bg-primary py-28 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="eyebrow reveal text-gold">Experiences</p>
          <h2 className="reveal mt-3 max-w-2xl text-4xl md:text-6xl">Langkawi, the way locals know it.</h2>
          <div className="mt-16 grid gap-px bg-primary-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((e, i) => (
              <div key={e.t} className="reveal bg-primary p-8 transition hover:bg-ink" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="font-display text-5xl text-gold">0{i + 1}</span>
                <h3 className="mt-6 text-2xl">{e.t}</h3>
                <p className="mt-3 text-sm opacity-75">{e.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers + testimonial */}
      <section id="offers" className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ["Stay Longer", "Fourth night on us, with daily breakfast at Ombak.", "Save 25%"],
            ["Honeymoon Ritual", "Pool villa, couples' urut and a beach dinner for two.", "From RM 6,900"],
            ["Family Escape", "Kids under 12 stay & dine free, plus jungle camp.", "Kids free"],
          ].map(([t, d, b]) => (
            <div key={t} className="reveal border bg-card p-10 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="eyebrow text-accent">{b}</span>
              <h3 className="mt-4 text-3xl">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <blockquote className="reveal mx-auto mt-28 max-w-3xl text-center">
          <p className="font-display text-3xl italic leading-snug md:text-5xl">
            “The most graceful resort in Southeast Asia — service that feels like family.”
          </p>
          <footer className="eyebrow mt-8 text-muted-foreground">Asia Travel Review · Gold List</footer>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-4xl">Serai Tanjung</div>
            <p className="mt-4 max-w-sm text-sm opacity-70">Jalan Teluk Datai, 07000 Langkawi, Kedah Darul Aman, Malaysia</p>
          </div>
          <div className="text-sm opacity-80">
            <p className="eyebrow mb-4 text-gold">Contact</p>
            <p>+60 4 950 0000</p>
            <p>stay@seraitanjung.my</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="text-sm">
            <p className="eyebrow mb-4 text-gold">Newsletter</p>
            <div className="flex border-b border-ink-foreground/30">
              <input type="email" placeholder="Your email" className="flex-1 bg-transparent py-2 outline-none placeholder:text-ink-foreground/40" />
              <button className="text-gold">→</button>
            </div>
          </form>
        </div>
        <div className="border-t border-ink-foreground/10 py-6 text-center text-xs opacity-50">
          © 2026 Serai Tanjung Resorts Sdn. Bhd. · A fictional brand for demonstration
        </div>
      </footer>
    </div>
  );
}
