import { useState } from "react";

const assetRoot = "/assets/remote/cdn.prod.website-files.com/62a9bee08b8f3a766efaa7da/";
const signUpUrl = "#";

const features = [
  {
    eyebrow: "Capture",
    title: "Keep the full customer story in view.",
    description:
      "Bring contacts, notes, signals, and context together so every conversation starts with the right picture.",
    surface: "bg-indigo-200",
    badge: "Customer context",
    image: `${assetRoot}62b7cd6d60a36031d910b94f_0_plan_dotted_pattern.png`,
    detail: "Last touchpoint captured",
  },
  {
    eyebrow: "Engage",
    title: "Know what to do next.",
    description:
      "Turn conversations into tasks, reminders, and clear next actions while the details are still fresh.",
    surface: "bg-teal-100",
    badge: "Next action ready",
    image: `${assetRoot}62b84320372fb36445618f4a_1_run_bumb_chat.png`,
    detail: "12 active accounts",
  },
  {
    eyebrow: "Follow up",
    title: "Never lose the thread.",
    description:
      "Keep decisions, messages, and commitments close so your next follow-up always has useful context.",
    surface: "bg-orange-200",
    badge: "Follow-up captured",
    image: `${assetRoot}62b84c32e86364859823d331_1_recap_rec.png`,
    detail: "3 tasks ready",
  },
  {
    eyebrow: "Grow",
    title: "Give every relationship room to grow.",
    description:
      "Give your team one shared workspace for account health, handoffs, and the work that moves customers forward.",
    surface: "bg-rose-200",
    badge: "Account workspace",
    image: `${assetRoot}62b84fe3372fb3892e61e867_1_collaborate_browser.png`,
    detail: "Shared account timeline",
  },
];

const templates = [
  {
    category: "Lead handoff",
    title: "Pass context without the scramble.",
    description: "A simple workflow for moving a new relationship from first signal to the right owner.",
    tone: "bg-orange-200",
    mark: "01",
  },
  {
    category: "Discovery call",
    title: "Turn a good conversation into momentum.",
    description: "A focused workflow for capturing needs, commitments, and the next useful action.",
    tone: "bg-indigo-200",
    mark: "02",
  },
  {
    category: "Account review",
    title: "See where every relationship stands.",
    description: "A structured review for spotting risks, celebrating progress, and choosing where to focus next.",
    tone: "bg-teal-100",
    mark: "03",
  },
  {
    category: "Team follow-up",
    title: "Make the next handoff obvious.",
    description: "A flexible starting point for keeping owners, deadlines, and customer commitments visible.",
    tone: "bg-rose-200",
    mark: "04",
  },
];

const testimonials = [
  {
    quote:
      "Flow gives us the right customer context before every conversation. The handoff feels clearer and the work moves faster.",
    name: "Sunny Bonnell",
    role: "Founder, Motto",
  },
  {
    quote:
      "The structure helps us spend less time searching for account history and more time listening to customers.",
    name: "Alex Chen",
    role: "Customer success lead",
  },
  {
    quote:
      "We can capture the important details once, keep the team aligned, and give every follow-up a clear owner.",
    name: "Maya Patel",
    role: "Account director",
  },
];

const faqs = [
  {
    question: "What makes Flow different?",
    answer:
      "Flow gives your team one connected place for customer context, conversations, tasks, and follow-through.",
  },
  {
    question: "Can I start with Flow for free?",
    answer:
      "You can start with Flow for free and explore the current plans and features available to your team in the app.",
  },
  {
    question: "How many teammates can use Flow?",
    answer:
      "Team capacity depends on the plan you choose. Start a workspace to see the options available for your team.",
  },
  {
    question: "Can I connect my existing sales tools?",
    answer:
      "Yes. Flow is designed to keep the tools you already use close while giving customer work one clear direction.",
  },
  {
    question: "Can I import my customer data?",
    answer:
      "Flow can become the shared home for your customer context. Start a workspace to explore the available setup options.",
  },
];

const buttonClass =
  "inline-flex items-center justify-center rounded-2xl border-2 border-slate-950 px-5 py-3 text-base font-medium transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#0f172a] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2";

export const LogoMarqueeSection = () => {
  const [templateIndex, setTemplateIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const template = templates[templateIndex];
  const testimonial = testimonials[testimonialIndex];

  const showPreviousTemplate = () => {
    setTemplateIndex((current) => (current - 1 + templates.length) % templates.length);
  };

  const showNextTemplate = () => {
    setTemplateIndex((current) => (current + 1) % templates.length);
  };

  const showPreviousTestimonial = () => {
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNextTestimonial = () => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <div className="overflow-hidden">
      <section id="features" className="scroll-mt-28 bg-white px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-indigo-700">Less admin. More relationship.</p>
            <h2 className="max-w-[90%] text-[42px] font-black leading-[42px] md:max-w-none md:text-[80px] md:leading-[80px]">
              Everything your customer work needs.
            </h2>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-600 md:text-2xl">
              Flow gives teams one clear place to capture context, manage follow-ups, and grow customer relationships.
            </p>
          </div>

          <div id="use-cases" className="mt-16 grid gap-6 md:mt-24">
            {features.map((feature, index) => (
              <article
                key={feature.eyebrow}
                className={`grid items-center gap-8 rounded-[2.5rem] p-6 md:grid-cols-2 md:gap-16 md:p-12 ${feature.surface} ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-600">{feature.eyebrow}</p>
                  <h3 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-[-0.04em] md:text-5xl">{feature.title}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">{feature.description}</p>
                  <a href={signUpUrl} onClick={(event) => event.preventDefault()} className={`${buttonClass} mt-8 bg-white`}>
                    Get started <span aria-hidden="true" className="ml-2">-&gt;</span>
                  </a>
                </div>

                <div className={`relative aspect-square overflow-hidden rounded-[2rem] border-2 border-slate-950/10 bg-white/50 p-5 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-white/60">
                    <img src={feature.image} alt="" loading="lazy" decoding="async" className="max-h-[75%] max-w-[82%] object-contain drop-shadow-[0_18px_18px_rgba(15,23,42,0.12)]" />
                    <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-bold shadow-sm">
                      <span>{feature.badge}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs font-medium text-slate-600 shadow-sm">
                      {feature.detail}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="templates" className="scroll-mt-28 bg-slate-950 px-5 py-20 text-white md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-orange-300">Playbooks</p>
              <h2 className="max-w-[90%] text-[42px] font-black leading-[42px] md:max-w-none md:text-[80px] md:leading-[80px]">Start with a strong first move.</h2>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-300 md:text-2xl">Choose a workflow for the next customer conversation, then make it yours.</p>
            </div>
            <a href={signUpUrl} onClick={(event) => event.preventDefault()} className={`${buttonClass} shrink-0 bg-orange-300 text-slate-950`}>
              Explore Flow <span aria-hidden="true" className="ml-2">-&gt;</span>
            </a>
          </div>

          <div className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-3 md:mt-16 md:p-5">
            <article aria-live="polite" className={`min-h-[360px] rounded-[2rem] p-7 text-slate-950 md:min-h-[420px] md:p-14 ${template.tone}`}>
              <div className="flex h-full min-h-[300px] flex-col justify-between">
                <div className="flex items-start justify-between gap-6">
                  <span className="rounded-full border-2 border-slate-950 bg-white/60 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em]">{template.category}</span>
                  <span className="text-6xl font-black tracking-[-0.08em] md:text-8xl">{template.mark}</span>
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">{template.title}</h3>
                  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">{template.description}</p>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Template slides">
              {templates.map((item, index) => (
                <button
                  key={item.mark}
                  type="button"
                  role="tab"
                  aria-selected={templateIndex === index}
                  aria-label={`Show ${item.category} template`}
                  onClick={() => setTemplateIndex(index)}
                  className={`h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${templateIndex === index ? "w-10 bg-orange-300" : "w-3 bg-white/40 hover:bg-white/70"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={showPreviousTemplate} aria-label="Previous template" className="h-12 w-12 rounded-full border border-white/30 text-xl transition hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-orange-300">&larr;</button>
              <button type="button" onClick={showNextTemplate} aria-label="Next template" className="h-12 w-12 rounded-full border border-white/30 text-xl transition hover:bg-white hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-orange-300">&rarr;</button>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="scroll-mt-28 bg-orange-300 px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-slate-700">For the whole team</p>
            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">Make every follow-up count.</h2>
            <p className="mt-7 text-xl leading-8 text-slate-700">When customer context is easy to find, every teammate can move the relationship forward.</p>
          </div>

          <div className="rounded-[2.5rem] border-2 border-slate-950 bg-white p-7 shadow-[8px_8px_0_#0f172a] md:p-12">
            <div aria-live="polite">
              <p className="text-2xl leading-10 tracking-[-0.02em] md:text-4xl md:leading-[1.25]">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="font-bold">{testimonial.name}</p>
                <p className="mt-1 text-slate-600">{testimonial.role}</p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2" role="tablist" aria-label="Testimonials">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={testimonialIndex === index}
                    aria-label={`Show testimonial from ${item.name}`}
                    onClick={() => setTestimonialIndex(index)}
                    className={`h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-950 ${testimonialIndex === index ? "w-8 bg-slate-950" : "w-3 bg-slate-300 hover:bg-slate-500"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={showPreviousTestimonial} aria-label="Previous testimonial" className="h-10 w-10 rounded-full border border-slate-950 text-lg transition hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950">&larr;</button>
                <button type="button" onClick={showNextTestimonial} aria-label="Next testimonial" className="h-10 w-10 rounded-full border border-slate-950 text-lg transition hover:bg-slate-950 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950">&rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-28 bg-white px-5 py-20 md:px-8 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-indigo-700">FAQ</p>
          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-8xl">A few useful answers.</h2>
          <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-bold tracking-[-0.02em] outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-slate-950 md:text-2xl">
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="text-3xl font-normal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pr-10 pt-5 text-lg leading-8 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started" className="scroll-mt-28 bg-indigo-200 px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 rounded-[2.5rem] border-2 border-slate-950 bg-white p-7 shadow-[8px_8px_0_#0f172a] md:flex-row md:items-end md:p-12">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-indigo-700">Ready when you are</p>
            <h2 className="max-w-[90%] text-[42px] font-black leading-[42px] md:max-w-none md:text-[80px] md:leading-[80px]">Give every customer conversation a clear next step.</h2>
          </div>
          <a href={signUpUrl} onClick={(event) => event.preventDefault()} className={`${buttonClass} shrink-0 bg-slate-950 text-white`}>
            Sign up, it&apos;s free <span aria-hidden="true" className="ml-2">-&gt;</span>
          </a>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <a href="#top" className="text-3xl font-black tracking-[-0.06em] focus:outline-none focus:ring-2 focus:ring-orange-300">flow</a>
            <p className="mt-3 max-w-sm text-slate-400">A clear, connected workspace for customer relationships.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
            <a href="#features" className="transition hover:text-white">Product</a>
            <a href="#templates" className="transition hover:text-white">Templates</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
            <a href={signUpUrl} onClick={(event) => event.preventDefault()} className="transition hover:text-white">Get started</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
