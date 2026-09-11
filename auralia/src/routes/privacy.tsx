import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Auralis" },
      {
        name: "description",
        content:
          "How Auralis collects, uses and protects your personal data when you browse our site or order headphones.",
      },
      { property: "og:title", content: "Privacy Policy — Auralis" },
      {
        property: "og:description",
        content: "How Auralis handles personal data, cookies, orders and your privacy rights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "What we collect",
    body: "Contact details you give us when ordering (name, email, shipping address), order history, and basic analytics such as pages viewed and device type.",
  },
  {
    title: "How we use it",
    body: "To process and ship orders, provide warranty support, answer questions, and improve the product pages you actually read. We do not sell personal data.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies to keep your cart and preferences, plus anonymous analytics cookies. You can refuse non-essential cookies without losing site functionality.",
  },
  {
    title: "Sharing",
    body: "Only with the partners needed to fulfil an order: payment processing, shipping, and email delivery. Each is bound by a data processing agreement.",
  },
  {
    title: "Your rights",
    body: "You can request a copy of your data, correct it, or ask us to delete it at any time. Write to privacy@auralis.audio and we will respond within 30 days.",
  },
  {
    title: "Retention",
    body: "Order records are kept for as long as warranty and tax obligations require. Analytics data is aggregated after 14 months.",
  },
];

function PrivacyPage() {
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
          Privacy Policy
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
          Questions? Reach us at privacy@auralis.audio.
        </p>
      </article>
    </main>
  );
}
