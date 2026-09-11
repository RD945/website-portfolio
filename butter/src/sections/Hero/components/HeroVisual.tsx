export const HeroVisual = () => {
  return (
    <div className="hero-visual relative mx-auto h-[330px] w-full max-w-[480px] md:h-[500px] md:flex-1">
      <div className="absolute inset-8 rounded-full bg-indigo-400/70 blur-[1px] md:inset-12" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-[2rem] border-2 border-slate-950 bg-white p-4 shadow-[10px_12px_0_#0f172a] md:p-6">
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4 md:p-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Flow CRM</p>
              <p className="mt-1 text-lg font-bold">Customer follow-up</p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">Active</span>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-xl bg-indigo-200 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">Next action</p>
              <p className="mt-2 font-bold">Send the proposal and check in Friday</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-orange-200 p-4">
                <p className="text-2xl">+ </p>
                <p className="mt-2 text-sm font-bold">12 active accounts</p>
              </div>
              <div className="rounded-xl bg-teal-100 p-4">
                <p className="text-2xl">-&gt; </p>
                <p className="mt-2 text-sm font-bold">3 follow-ups due</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 left-2 rounded-2xl border-2 border-slate-950 bg-orange-300 px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#0f172a] md:bottom-4 md:left-0">
        Built for better relationships
      </div>
      <div className="absolute right-2 top-4 rounded-2xl border-2 border-slate-950 bg-rose-200 px-4 py-3 text-sm font-bold shadow-[4px_4px_0_#0f172a] md:right-0 md:top-10">
        Context in one place
      </div>
    </div>
  );
};
