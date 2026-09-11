import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Footer } from "./sections/Footer";
import { useEffect } from "react";

export const App = () => {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-reveal], [data-uid="bOCJ9aj1haXr76AX"], [data-uid="YxQ_VtkmbmhnmTlg"], [data-uid="QegMtNYiX2eMjNiF"]',
      ),
    );

    elements.forEach((element) => element.setAttribute("data-reveal", ""));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-uid="721viBrMPlpMvu_k"
      className="relative text-white text-base not-italic normal-nums font-normal accent-auto bg-slate-950 box-border caret-transparent block tracking-[normal] leading-[18.4px] list-outside list-disc outline-[3px] overflow-x-clip pointer-events-auto text-start indent-[0px] normal-case visible w-screen border-separate pt-[86px] font-system_ui md:pt-[104px] md:font-inter_v"
      onClickCapture={(event) => {
        const anchor = event.target instanceof Element ? event.target.closest("a") : null;
        const href = anchor?.getAttribute("href") ?? "";
        if (href === "#" || /^(?:\/|https?:|mailto:)/i.test(href)) {
          event.preventDefault();
        }
      }}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[3000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        Skip to content
      </a>
      <Header data-uid="aQ2NARTxxUR9jXPI" />
      <main id="main-content">
        <Hero data-uid="vURcoYvhuKp0hGoX" />
      </main>
      <Footer data-uid="XHlLnt0V9-U5lbJR" />
      <div data-uid="SacEYHwl_q15HogY" className="fixed box-border caret-transparent h-0 outline-[3px] w-0 z-[2147483001] font-system_ui"></div>
      <div data-uid="dF2lTNiLMg3qhu74" className="box-border caret-transparent outline-[3px] font-system_ui md:font-inter_v">
        <div data-uid="E6YK7pgaFUh6zJLA" className="text-sm box-border caret-transparent leading-[17px] outline-[3px] font-system_ui md:font-inter_v"></div>
      </div>
    </div>
  );
};
