import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Auralis" },
      {
        name: "description",
        content:
          "The terms that apply when you order Auralis headphones: pricing, shipping, returns, warranty and liability.",
      },
      { property: "og:title", content: "Terms of Service — Auralis" },
      {
        property: "og:description",
        content: "Ordering, shipping, returns and warranty terms for Auralis headphones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "Orders",
    body: "An order is confirmed once we send a confirmation email. We may cancel and refund an order if a product is mispriced or unavailable.",
  },
  {
    title: "Pricing and payment",
    body: "Prices are shown in US dollars and exclude local import duties. Payment is taken at the time of order.",
  },
  {
    title: "Shipping",
    body: "Worldwide shipping is free. Estimated delivery is 3–7 working days; delays caused by customs are outside our control.",
  },
  {
    title: "Returns",
    body: "30 days of risk-free listening. Return the headphones in a resellable state and we refund the full amount, shipping included.",
  },
  {
    title: "Warranty",
    body: "Every pair carries a two-year warranty against manufacturing defects. Damage from drops, liquid or disassembly is not covered.",
  },
  {
    title: "Liability",
    body: "Our liability for any claim is limited to the amount paid for the product concerned. Nothing here limits rights you have under local consumer law.",
  },
];

function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="stage min-h-screen text-slate-100">
      <header className="mx-auto flex max-w-[900px] items-center justify-between px-6 py-8">
        <Logo />
        <Link
          to="/"
          className="cta flex items-center gap-2 rounded-full border border-stage-mist/50 px-6 py-2.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>
      </header>

      <article className="mx-auto max-w-[760px] px-6 pb-32 pt-10">
        <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-light tracking-[0.02em]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-stage-sage">Last updated 10 September 2026</p>

        <div className="mt-14 space-y-12">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-xl font-light uppercase tracking-[0.14em]">
                {s.title}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-stage-mist">{s.body}</p>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-slate-200/10 pt-8 text-sm text-stage-sage">
          Questions? Reach us at support@auralis.audio.
        </p>
      </article>
    </main>
  );
}
