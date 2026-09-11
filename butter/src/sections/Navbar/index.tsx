import { useEffect, useRef, useState } from "react";

const navigation = [
  { label: "Product", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Resources", href: "#resources" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#get-started" },
];

const signUpUrl = "#";
const loginUrl = "#";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <nav
      aria-label="Primary navigation"
      className="absolute inset-x-0 top-4 z-50 mx-auto w-full max-w-[1440px] px-4 md:fixed md:top-6 md:px-12 lg:px-20"
    >
      <div className="relative rounded-2xl bg-white/95 px-4 py-3 shadow-[0_8px_32px_rgba(10,11,30,0.1)] backdrop-blur md:px-5">
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="rounded-lg text-lg font-bold tracking-[-0.04em] text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
          >
            <span>flow</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={loginUrl}
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-slate-950 md:inline-flex"
            >
              Log in
            </a>
            <a
              href={signUpUrl}
              onClick={(event) => event.preventDefault()}
              className="hidden rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#fb923c] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 md:inline-flex"
            >
              Sign up free
            </a>
            <button
              type="button"
              ref={menuButtonRef}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-xl text-slate-950 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-slate-950 md:hidden"
            >
              <span aria-hidden="true">{isOpen ? "x" : "="}</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-navigation" className="border-t border-slate-200 pb-2 pt-3 md:hidden">
            <div className="grid gap-1">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-700 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-slate-950"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={loginUrl}
                className="mt-2 rounded-lg border border-slate-950 px-3 py-3 text-center text-base font-medium text-slate-950 transition hover:bg-stone-100"
              >
                Log in
              </a>
              <a
                href={signUpUrl}
                onClick={(event) => event.preventDefault()}
                className="rounded-lg bg-slate-950 px-3 py-3 text-center text-base font-medium text-white transition hover:bg-slate-800"
              >
                Sign up free
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
