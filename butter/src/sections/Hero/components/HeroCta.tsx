export const HeroCta = () => {
  return (
    <div className="hero-cta flex flex-wrap items-center gap-3">
      <a
        href="#"
        aria-label="Sign up for Flow for free"
        onClick={(event) => event.preventDefault()}
        className="inline-flex items-center justify-center rounded-2xl border-2 border-slate-950 bg-slate-950 px-[26px] py-[17px] text-lg font-medium text-white transition hover:-translate-y-1 hover:shadow-[6px_6px_0_#0f172a] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
      >
        Sign up, it&apos;s free <span aria-hidden="true" className="ml-2">-&gt;</span>
      </a>
      <a
        href="#features"
        className="inline-flex items-center rounded-2xl px-2 py-3 text-base font-medium text-slate-700 underline decoration-2 underline-offset-4 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-950"
      >
        See how it works
      </a>
    </div>
  );
};
