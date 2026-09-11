import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  AudioLines,
  Mic,
  Menu,
  Pause,
  Play,
  Cable,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Star,
  BatteryCharging,
  Bluetooth,
  Weight,
  Check,
  ArrowRight,
  Quote,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, LogoMark } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Auralis" },
      {
        name: "description",
        content:
          "High-resolution audio, active noise cancellation and spatial sound. Meet the wireless headphones of the future by Auralis.",
      },
      { property: "og:title", content: "Auralis — The Wireless Headphones of the Future" },
      {
        property: "og:description",
        content: "High-resolution audio, active noise cancellation and spatial sound from Auralis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Product", id: "features" },
  { label: "Craft", id: "works" },
  { label: "Pricing", id: "pricing" },
  { label: "Reviews", id: "reviews" },
];

const socials = [
  { Icon: Facebook, label: "Auralis on Facebook", href: "#" },
  { Icon: Twitter, label: "Auralis on X", href: "#" },
  { Icon: Instagram, label: "Auralis on Instagram", href: "#" },
  { Icon: Youtube, label: "Auralis on YouTube", href: "#" },
];

function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });
}

const specs = [
  { Icon: AudioLines, line1: "High-Resolution", line2: "Audio Compatible" },
  { Icon: Mic, line1: "70mm HD Driver Units With", line2: "Aluminium-Coated" },
  { Icon: Cable, line1: "4.4mm Balanced Cables", line2: "And Silver Coated" },
];

const featuresLeft = [
  {
    title: "Custom Acoustic Design",
    body: "From the canopy to the ear cushions, every part is carefully crafted to provide exceptional acoustic performance.",
  },
  {
    title: "Noise Cancellation",
    body: "Immersive sound through active noise cancellation so you can focus entirely on what you are listening to.",
  },
  {
    title: "Spatial Audio",
    body: "Dynamic head tracking places sound virtually anywhere in the room, delivering a genuinely immersive stage.",
  },
];

const featuresRight = [
  {
    title: "Transparency Mode",
    body: "Switch to transparency to listen to music while still hearing the environment around you.",
  },
  {
    title: "Automatic Switching",
    body: "Seamlessly move sound between your phone, tablet and laptop without touching a single setting.",
  },
  {
    title: "Audio Sharing",
    body: "Share an audio stream between two sets of headphones, so a film or a mix is never a solo act.",
  },
];

const stats = [
  { Icon: BatteryCharging, value: "40h", label: "Battery Life" },
  { Icon: Bluetooth, value: "5.3", label: "Bluetooth LE Audio" },
  { Icon: Weight, value: "312g", label: "Featherlight Build" },
  { Icon: AudioLines, value: "24bit", label: "Lossless Playback" },
];

type ResponsiveImage = {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
};

function imageAsset(
  name: string,
  width: number,
  height: number,
  widths: number[],
  sizes: string,
): ResponsiveImage {
  return {
    src: `/images/${name}-${widths[widths.length - 1]}.webp`,
    srcSet: widths.map((candidate) => `/images/${name}-${candidate}.webp ${candidate}w`).join(", "),
    sizes,
    width,
    height,
  };
}

const imageAssets = {
  hero: imageAsset(
    "headphones-hero",
    1200,
    1008,
    [480, 800, 1200],
    "(max-width: 640px) 80vw, (max-width: 1200px) 70vw, 960px",
  ),
  single: imageAsset(
    "headphone-single",
    704,
    1408,
    [320, 480, 704],
    "(max-width: 768px) 45vw, 260px",
  ),
  workStudio: imageAsset(
    "work-studio",
    1200,
    900,
    [480, 800, 1200],
    "(max-width: 768px) 100vw, 768px",
  ),
  workDetail: imageAsset(
    "work-detail",
    1200,
    900,
    [480, 800, 1200],
    "(max-width: 768px) 100vw, 768px",
  ),
  workSpace: imageAsset(
    "work-space",
    1200,
    900,
    [480, 800, 1200],
    "(max-width: 768px) 100vw, 768px",
  ),
};

const works = [
  {
    img: imageAssets.workStudio,
    title: "The Studio Session",
    body: "Reference-flat tuning built for long nights at the desk, where every decision has to hold up in the morning.",
    offset: "md:mr-[26%]",
  },
  {
    img: imageAssets.workDetail,
    title: "The Machined Cup",
    body: "Single-block aluminium, knit mesh and a hinge that settles with a weight you can feel in the hand.",
    offset: "md:ml-[26%]",
  },
  {
    img: imageAssets.workSpace,
    title: "The Quiet Hour",
    body: "Cancellation deep enough to turn a room, a cabin or a carriage into somewhere entirely your own.",
    offset: "md:mr-[26%]",
  },
];

const marqueeItems = [
  "A late-night mix",
  "A window seat at 38,000 ft",
  "The last train home",
  "A rain-soaked walk",
  "A room with the lights off",
  "The first listen",
];

const approach = [
  {
    title: "Listen",
    body: "Two years of measurement sessions with mastering engineers before a single housing was drawn.",
  },
  {
    title: "Shape",
    body: "Seventy-one physical prototypes, each one milled, worn and rejected until the fit disappeared.",
  },
  {
    title: "Tune",
    body: "Driver, damping and cushion tuned as one system, so the curve holds at whisper and at full volume.",
  },
  {
    title: "Finish",
    body: "Hand-assembled, serialised and measured again before it is allowed anywhere near a box.",
  },
];

const reviews = [
  {
    quote:
      "The soundstage is unreal. It feels like the band is playing inside the room, not inside your head.",
    name: "Maya Chen",
    role: "Music Producer, Berlin",
  },
  {
    quote:
      "Best noise cancellation I've ever tested. A 12-hour flight felt like a quiet studio session.",
    name: "Daniel Osei",
    role: "Travel Journalist",
  },
  {
    quote:
      "Every detail, from the knit canopy to the machined cups, feels like a piece of modern art.",
    name: "Sofia Marques",
    role: "Industrial Designer",
  },
];

const plans = [
  {
    name: "Standard",
    price: "449",
    finish: "Space Grey",
    features: ["Active Noise Cancellation", "20h battery life", "USB-C fast charge", "Smart Case"],
  },
  {
    name: "Signature",
    price: "549",
    finish: "Midnight Green",
    features: [
      "Everything in Standard",
      "40h battery life",
      "Spatial Audio + head tracking",
      "Engraved aluminium cups",
    ],
    featured: true,
  },
  {
    name: "Atelier",
    price: "749",
    finish: "Polished Chrome",
    features: [
      "Everything in Signature",
      "Hand-finished cups",
      "Balanced 4.4mm cable",
      "Lifetime ear-cushion swaps",
    ],
  },
];

const rise: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const headingClass =
  "text-center font-display text-[clamp(2rem,5vw,3.6rem)] font-light tracking-[0.02em]";

function Index() {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const approachRef = useRef<HTMLDivElement | null>(null);

  const [orderPlan, setOrderPlan] = useState<(typeof plans)[number] | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("Signature");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [marqueePaused, setMarqueePaused] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const reduce = hydrated && Boolean(prefersReducedMotion);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : -90]);
  const productY = useTransform(heroProgress, [0, 1], [0, reduce ? 0 : 60]);
  const heroFade = useTransform(heroProgress, [0, 0.9], [1, reduce ? 1 : 0.25]);

  const { scrollYProgress: approachProgress } = useScroll({
    target: approachRef,
    offset: ["start 65%", "end 60%"],
  });
  const approachFill = useSpring(approachProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const handleMobileNav = (id: string) => {
    setMobileMenuOpen(false);
    window.setTimeout(() => scrollToId(id), 180);
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        tabIndex={-1}
        className="stage min-h-screen overflow-hidden text-slate-100"
      >
        {/* Nav */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <header className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-8">
            <Logo />
            <nav className="hidden items-center gap-10 text-[15px] text-stage-mist md:flex">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="relative rounded-sm outline-none transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-slate-100 hover:after:origin-left hover:after:scale-x-100 focus-visible:text-slate-100 focus-visible:ring-2 focus-visible:ring-slate-100/60"
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open navigation"
                  className="cta flex h-11 w-11 items-center justify-center rounded-full border border-stage-mist/50 text-stage-mist hover:border-slate-100 hover:bg-slate-100 hover:text-stage-abyss md:hidden"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <button
                type="button"
                onClick={() => scrollToId("pricing")}
                className="cta rounded-full border border-stage-mist/50 px-7 py-3 text-sm hover:border-slate-100 hover:bg-slate-100 hover:text-stage-abyss"
              >
                Buy Now
              </button>
            </div>
          </header>

          <SheetContent
            side="right"
            className="w-[min(86vw,360px)] border-stage-mist/20 bg-stage-pine p-8 text-slate-100 sm:max-w-sm"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-xl font-light uppercase tracking-[0.18em] text-slate-100">
                Auralis
              </SheetTitle>
              <SheetDescription className="text-left text-stage-mist">
                Explore the collection.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="mt-10 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleMobileNav(link.id)}
                  className="rounded-xl px-4 py-3 text-left text-base text-stage-mist transition-colors hover:bg-slate-100/[0.06] hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-slate-100/60 focus-visible:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => handleMobileNav("pricing")}
              className="cta mt-8 flex w-full items-center justify-center rounded-full border border-stage-mist/50 px-7 py-3 text-sm hover:border-slate-100 hover:bg-slate-100 hover:text-stage-abyss"
            >
              Buy Now
            </button>
          </SheetContent>
        </Sheet>

        {/* Hero */}
        <section ref={heroRef} className="relative mx-auto max-w-[1200px] px-6 pb-16">
          <div className="glow pointer-events-none absolute inset-x-0 top-10 h-[520px]" />

          <div className="absolute right-2 top-20 hidden flex-col items-center gap-4 lg:flex">
            <span className="h-16 w-px bg-slate-200/40" />
            {socials.slice(0, 3).map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="rounded-full transition-transform duration-300 hover:-translate-y-1 hover:text-slate-100 focus-visible:ring-2 focus-visible:ring-slate-100/60 focus-visible:outline-none"
              >
                <Icon className="h-4 w-4 text-stage-mist" />
              </a>
            ))}
          </div>

          <motion.div className="relative mx-auto max-w-4xl pt-10" style={{ opacity: heroFade }}>
            <motion.h1
              style={{ y: headlineY }}
              className="text-chrome pointer-events-none text-center font-display text-[clamp(2.6rem,9vw,6.4rem)] font-light uppercase leading-[0.95] tracking-[0.02em]"
            >
              The wireless headphones of the future
            </motion.h1>

            <motion.div
              style={{ y: productY }}
              className="relative z-10 -mt-[14%] flex min-h-[46vh] items-center justify-center"
            >
              <img
                src={imageAssets.hero.src}
                srcSet={imageAssets.hero.srcSet}
                sizes={imageAssets.hero.sizes}
                alt="Space grey wireless over-ear headphones, three-quarter view"
                width={imageAssets.hero.width}
                height={imageAssets.hero.height}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="mx-auto h-[46vh] max-h-[520px] w-auto max-w-[80%] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </motion.div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-6">
            <span className="hidden text-sm text-stage-mist sm:block">Space Grey — full view</span>
            <button
              type="button"
              onClick={() => scrollToId("features")}
              className="hidden items-center gap-5 text-sm text-stage-mist transition-colors hover:text-slate-100 sm:flex"
            >
              Discover
              <span className="h-px w-24 bg-slate-200/50" />
            </button>
          </div>
        </section>

        {/* Specs */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto grid max-w-[1050px] grid-cols-1 gap-10 px-6 py-28 sm:grid-cols-3 sm:divide-x sm:divide-slate-200/15"
        >
          {specs.map(({ Icon, line1, line2 }) => (
            <motion.div key={line1} variants={rise} className="flex items-center gap-4 sm:px-8">
              <Icon className="h-7 w-7 shrink-0 text-stage-mist" strokeWidth={1} />
              <p className="text-[15px] leading-snug">
                {line1}
                <br />
                {line2}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Features */}
        <section id="features" className="relative mx-auto max-w-[1200px] px-6 py-32">
          <Reveal>
            <h2 className={headingClass}>The Features</h2>
          </Reveal>

          <div className="relative mt-20 grid grid-cols-1 items-center gap-14 md:grid-cols-[1fr_auto_1fr]">
            <div className="order-2 space-y-16 md:order-1">
              {featuresLeft.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <article>
                    <h3 className="font-display text-xl font-light uppercase tracking-[0.14em]">
                      {f.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-stage-mist">
                      {f.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <motion.img
              src={imageAssets.single.src}
              srcSet={imageAssets.single.srcSet}
              sizes={imageAssets.single.sizes}
              alt="Single headphone earcup and aluminium arm"
              loading="lazy"
              fetchPriority="low"
              width={imageAssets.single.width}
              height={imageAssets.single.height}
              decoding="async"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              {...(reduce
                ? {}
                : {
                    whileHover: { scale: 1.03, rotate: 0.8 },
                  })}
              className="order-1 mx-auto w-[45%] max-w-[260px] drop-shadow-[0_40px_70px_rgba(0,0,0,0.65)] md:order-2 md:w-[260px]"
            />

            <div className="order-3 space-y-16 md:text-right">
              {featuresRight.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <article>
                    <h3 className="font-display text-xl font-light uppercase tracking-[0.14em]">
                      {f.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-stage-mist md:ml-auto">
                      {f.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-[1050px] px-6 py-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-slate-200/10 bg-slate-200/10 md:grid-cols-4"
          >
            {stats.map(({ Icon, value, label }) => (
              <motion.div
                key={label}
                variants={rise}
                {...(reduce ? {} : { whileHover: { y: -4 } })}
                className="group flex flex-col items-center gap-3 bg-stage-pine px-6 py-12 text-center transition-colors duration-500 hover:bg-stage-forest"
              >
                <Icon
                  className="h-6 w-6 text-stage-mist transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1}
                />
                <span className="text-chrome font-display text-4xl font-light tracking-tight">
                  {value}
                </span>
                <span className="text-xs uppercase tracking-[0.22em] text-stage-mist">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Selected Works */}
        <section id="works" className="mx-auto max-w-[1200px] px-6 py-32">
          <Reveal>
            <h2 className={headingClass}>Selected Works</h2>
          </Reveal>

          <div className="mt-24 space-y-[24vh]">
            {works.map((w, i) => (
              <motion.article
                key={w.title}
                initial={{ opacity: 0, y: 70, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative mx-auto w-full max-w-3xl ${w.offset}`}
              >
                <div className="overflow-hidden rounded-[2rem] border border-slate-200/10">
                  <img
                    src={w.img.src}
                    srcSet={w.img.srcSet}
                    sizes={w.img.sizes}
                    alt={w.title}
                    loading="lazy"
                    fetchPriority="low"
                    width={w.img.width}
                    height={w.img.height}
                    decoding="async"
                    className="work-image h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.035]"
                  />
                </div>
                <div className="mt-7 max-w-md">
                  <span className="font-display text-2xl font-light uppercase tracking-[0.14em]">
                    {w.title}
                  </span>
                  <p className="mt-3 text-[15px] leading-relaxed text-stage-mist">{w.body}</p>
                </div>
                <span className="absolute -top-10 right-0 font-display text-6xl font-light text-slate-100/10">
                  0{i + 1}
                </span>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Imagine Your Space — marquee */}
        <section className="relative border-y border-slate-200/10 py-28">
          <Reveal>
            <h2 className={`${headingClass} px-6`}>Imagine Your Space</h2>
          </Reveal>
          <div className="marquee-mask mt-16 overflow-hidden [--dur:38s]">
            <div className={`marquee-track ${marqueePaused ? "is-paused" : ""}`}>
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                  {marqueeItems.map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-10 whitespace-nowrap px-10 font-display text-[clamp(1.6rem,4vw,3.2rem)] font-light uppercase tracking-[0.08em] text-slate-100/70"
                    >
                      {item}
                      <LogoMark className="h-6 w-6 text-stage-sage" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMarqueePaused((paused) => !paused)}
            onFocus={(event) => {
              if (event.currentTarget.matches(":focus-visible")) setMarqueePaused(true);
            }}
            aria-pressed={marqueePaused}
            aria-label={marqueePaused ? "Resume scene marquee" : "Pause scene marquee"}
            className="cta mx-auto mt-7 flex h-11 w-11 items-center justify-center rounded-full border border-stage-mist/35 text-stage-mist hover:border-slate-100 hover:bg-slate-100 hover:text-stage-abyss"
          >
            {marqueePaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
        </section>

        {/* Our Approach — scroll progress */}
        <section className="mx-auto max-w-[1200px] px-6 py-32">
          <Reveal>
            <h2 className={headingClass}>Our Approach</h2>
          </Reveal>

          <div ref={approachRef} className="relative mt-24">
            <div className="absolute left-6 top-0 h-full w-px bg-slate-200/12 md:left-1/2 md:-translate-x-1/2">
              <motion.div
                style={{ scaleY: reduce ? 1 : approachFill }}
                className="h-full w-full origin-top bg-gradient-to-b from-stage-mist via-stage-sage to-transparent"
              />
            </div>

            <div className="space-y-[18vh]">
              {approach.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0.15, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-16 md:w-1/2 md:pl-0 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                  }`}
                >
                  <span
                    className={`absolute top-2 left-6 h-3 w-3 -translate-x-1/2 rounded-full bg-stage-mist ${
                      i % 2 === 0 ? "md:left-full" : "md:left-0"
                    }`}
                  />
                  <span className="font-display text-sm tracking-[0.3em] text-stage-sage">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-light uppercase tracking-[0.12em]">
                    {step.title}
                  </h3>
                  <p
                    className={`mt-4 max-w-sm text-[15px] leading-relaxed text-stage-mist ${
                      i % 2 === 0 ? "md:ml-auto" : ""
                    }`}
                  >
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="mx-auto max-w-[1200px] px-6 py-32">
          <Reveal>
            <h2 className={headingClass}>Product Reviews</h2>
          </Reveal>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {reviews.map((r) => (
              <motion.figure
                key={r.name}
                variants={rise}
                {...(reduce ? {} : { whileHover: { y: -5 } })}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="group flex flex-col rounded-[2rem] border border-slate-200/10 bg-slate-100/[0.04] p-9 backdrop-blur-sm hover:border-stage-sage/50"
              >
                <Quote
                  className="h-7 w-7 text-stage-sage transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1}
                />
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-slate-100 text-slate-100" />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-stage-mist">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-slate-200/10 pt-6">
                  <p className="font-display text-base uppercase tracking-[0.14em]">{r.name}</p>
                  <p className="mt-1 text-sm text-stage-sage">{r.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-[1200px] px-6 py-32">
          <Reveal>
            <h2 className={headingClass}>Choose Your Finish</h2>
            <p className="mx-auto mt-5 max-w-md text-center text-[15px] text-stage-mist">
              Three editions. One uncompromising sound. Free engraving on every order.
            </p>
          </Reveal>
          <fieldset className="mt-20">
            <legend className="sr-only">Choose an Auralis edition</legend>
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {plans.map((p) => (
                <motion.div
                  key={p.name}
                  variants={rise}
                  {...(reduce ? {} : { whileHover: { y: -7 } })}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className={`${
                    p.featured
                      ? "relative flex flex-col rounded-[2rem] border bg-slate-100 text-stage-abyss shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
                      : "relative flex flex-col rounded-[2rem] border bg-slate-100/[0.04]"
                  } transition-[border-color,box-shadow] duration-300 ${
                    selectedPlan === p.name
                      ? "border-stage-mist ring-1 ring-stage-mist/60"
                      : p.featured
                        ? "border-slate-100/50"
                        : "border-slate-200/10 hover:border-stage-sage/50"
                  }`}
                >
                  <input
                    id={`plan-${p.name.toLowerCase()}`}
                    type="radio"
                    name="edition"
                    value={p.name}
                    checked={selectedPlan === p.name}
                    onChange={() => setSelectedPlan(p.name)}
                    aria-label={`${p.name} edition, ${p.finish}, $${p.price}`}
                    className="peer sr-only"
                  />
                  <label
                    htmlFor={`plan-${p.name.toLowerCase()}`}
                    className="flex flex-1 cursor-pointer flex-col rounded-[2rem] p-9 pb-0 outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-slate-100/60 peer-focus-visible:ring-offset-4 peer-focus-visible:ring-offset-stage-pine"
                  >
                    <h3 className="font-display text-xl font-light uppercase tracking-[0.16em]">
                      {p.name}
                    </h3>
                    <p
                      className={
                        p.featured
                          ? "mt-1 text-sm text-stage-forest"
                          : "mt-1 text-sm text-stage-sage"
                      }
                    >
                      {p.finish}
                    </p>
                    <p className="mt-7 font-display text-5xl font-light tracking-tight">
                      <span className="align-top text-2xl">$</span>
                      {p.price}
                    </p>
                    <ul className="mt-9 flex-1 space-y-4">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[15px]">
                          <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.5} />
                          <span className={p.featured ? "text-stage-forest" : "text-stage-mist"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPlan(p.name);
                      setOrderPlan(p);
                    }}
                    className={
                      p.featured
                        ? "cta relative z-10 mx-9 mb-9 mt-10 flex items-center justify-center gap-2 rounded-full bg-stage-abyss py-3.5 text-sm text-slate-100"
                        : "cta relative z-10 mx-9 mb-9 mt-10 flex items-center justify-center gap-2 rounded-full border border-stage-mist/50 py-3.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
                    }
                  >
                    Order Now
                    <ArrowRight className="cta-arrow h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </fieldset>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-y border-slate-200/10 py-36">
          <div className="glow pointer-events-none absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, scale: 1.06 }}
            whileInView={{ opacity: 0.12, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="text-chrome select-none whitespace-nowrap font-display text-[clamp(4rem,16vw,13rem)] font-light uppercase tracking-[0.04em]">
              Auralis
            </span>
          </motion.div>
          <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
            <h2 className={headingClass}>Hear The Future Today</h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-stage-mist">
              Order now and get free worldwide shipping, a 2-year warranty and 30 days of risk-free
              listening.
            </p>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  const plan = plans.find((p) => p.name === selectedPlan) ?? plans[1]!;
                  setOrderPlan(plan);
                }}
                className="cta flex items-center gap-2 rounded-full bg-slate-100 px-9 py-3.5 text-sm text-stage-abyss"
              >
                Buy Now
                <ArrowRight className="cta-arrow h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToId("features")}
                className="cta rounded-full border border-stage-mist/50 px-9 py-3.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
              >
                Explore Features
              </button>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className="mx-auto max-w-[1200px] px-6 py-20">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
            <div className="text-center md:text-left">
              <Logo className="justify-center md:justify-start" />
              <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-stage-mist">
                The wireless headphones of the future. Designed for the ones who listen closely.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-center text-[15px] text-stage-mist md:text-left">
              {navLinks.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="transition-colors hover:text-slate-100 md:text-left"
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <div className="flex gap-4">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="cta flex h-11 w-11 items-center justify-center rounded-full border border-stage-mist/40 hover:bg-slate-100 hover:text-stage-abyss"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200/10 pt-8 text-sm text-stage-sage md:flex-row">
            <p>© 2026 Auralis. All rights reserved.</p>
            <div className="flex gap-8">
              <Link to="/privacy" className="transition-colors hover:text-slate-100">
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-slate-100">
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>

        {/* Order dialog */}
        <Dialog open={orderPlan !== null} onOpenChange={(open) => !open && setOrderPlan(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-200/10 bg-stage-pine text-slate-100 sm:max-w-md">
            <div className="flex items-center gap-4 pr-8">
              <img
                src={imageAssets.single.src}
                srcSet={imageAssets.single.srcSet}
                sizes="48px"
                alt="Auralis headphone detail"
                width={imageAssets.single.width}
                height={imageAssets.single.height}
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                className="h-20 w-12 shrink-0 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
              />
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-light uppercase tracking-[0.12em]">
                  {orderPlan?.name} Edition
                </DialogTitle>
                <DialogDescription className="text-stage-mist">
                  {orderPlan?.finish} finish · ${orderPlan?.price} · free worldwide shipping and 30
                  days of risk-free listening.
                </DialogDescription>
              </DialogHeader>
            </div>

            <ul className="mt-2 space-y-3">
              {orderPlan?.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-stage-mist">
                  <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  toast.success(`${orderPlan?.name} reserved`, {
                    description: "We'll email you as soon as this batch ships.",
                  });
                  setOrderPlan(null);
                }}
                className="cta flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-100 py-3.5 text-sm text-stage-abyss"
              >
                Confirm order
                <ArrowRight className="cta-arrow h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOrderPlan(null)}
                className="cta rounded-full border border-stage-mist/50 px-7 py-3.5 text-sm hover:bg-slate-100 hover:text-stage-abyss"
              >
                Not yet
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </MotionConfig>
  );
}
