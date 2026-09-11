import { Navbar } from "./sections/Navbar";
import { Hero } from "./sections/Hero";
import { LogoMarqueeSection } from "./sections/LogoMarqueeSection";

export const App = () => {
  return (
    <div
      id="top"
      className="min-h-screen bg-white text-slate-950 font-gt_eesti_display"
      onClickCapture={(event) => {
        const anchor = event.target instanceof Element ? event.target.closest("a") : null;
        const href = anchor?.getAttribute("href") ?? "";
        if (href === "#" || /^(?:\/|https?:|mailto:)/i.test(href)) {
          event.preventDefault();
        }
      }}
    >
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-orange-300"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <LogoMarqueeSection />
      </main>
    </div>
  );
};
