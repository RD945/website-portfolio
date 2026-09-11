import { startTransition, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const navItems = [
  ["Films", "#work"],
  ["About", "#about"],
  ["Crew", "#team"],
  ["Contact", "#contact"],
];

const services = [
  {
    name: "Commercial Films",
    asset: "/assets/service-commercial.svg",
    alt: "Amber studio light cutting across a dark commercial film set.",
    description: "Distinctive campaign films that turn a brand idea into a world people want to step into.",
  },
  {
    name: "Narrative Films",
    asset: "/assets/service-narrative.svg",
    alt: "A warm window glowing through a deep blue cinematic interior.",
    description: "Character-led stories developed with directors, writers, and producers from the first treatment to the final cut.",
  },
  {
    name: "Music Videos",
    asset: "/assets/service-music.svg",
    alt: "Colored stage lights crossing a dark music video set.",
    description: "Visually ambitious films that give artists a strong point of view and a world of their own.",
  },
  {
    name: "Documentary",
    asset: "/assets/service-documentary.svg",
    alt: "A quiet horizon and silhouetted subject in a documentary film frame.",
    description: "Human stories told with patience, honesty, and a close eye for the details that make them matter.",
  },
  {
    name: "Post-Production",
    asset: "/assets/service-post.svg",
    alt: "A glowing edit timeline with a waveform and color controls.",
    description: "Editing, sound, color, and finishing that bring every shot into focus and every feeling home.",
  },
];

const projects = [
  {
    title: "Afterlight",
    asset: "/assets/film-afterlight.svg",
    tone: "violet",
    category: "BRAND FILM / 2025",
    alt: "A lone figure moving through violet haze and a low orange sun.",
    logline: "A quiet study of the moment light changes everything.",
    credit: "Direction + Finish",
  },
  {
    title: "The Long Way Home",
    asset: "/assets/film-long-way-home.svg",
    tone: "amber",
    category: "NARRATIVE / 2025",
    alt: "A night road disappearing toward distant headlights.",
    logline: "A nocturnal road story told in warm headlights and empty miles.",
    credit: "Narrative Short",
  },
  {
    title: "Signals in the Dark",
    asset: "/assets/film-signals.svg",
    tone: "blue",
    category: "MUSIC VIDEO / 2024",
    alt: "Blue city lights and electric lines reflected on wet streets.",
    logline: "A kinetic performance film built from color, rhythm, and reflection.",
    credit: "Performance Film",
  },
  {
    title: "Low Season",
    asset: "/assets/film-low-season.svg",
    tone: "orange",
    category: "DOCUMENTARY / 2024",
    alt: "An empty coastal road under a soft late afternoon sky.",
    logline: "An observational portrait of a coast waiting for its next season.",
    credit: "Documentary Short",
  },
];

const teamMembers = [
  { asset: "/assets/crew-maya.svg", name: "Maya Bennett", role: "Executive Producer", blurb: "Keeps big ideas moving from first call to final delivery.", alt: "Cinematic portrait of Maya Bennett in warm studio light." },
  { asset: "/assets/crew-theo.svg", name: "Theo James", role: "Film Director", blurb: "Finds the human detail inside every ambitious frame.", alt: "Cinematic portrait of Theo James in blue studio light." },
  { asset: "/assets/crew-amara.svg", name: "Amara Lewis", role: "Director of Photography", blurb: "Shapes light, texture, and atmosphere for the story.", alt: "Cinematic portrait of Amara Lewis in soft red light." },
  { asset: "/assets/crew-niko.svg", name: "Niko Santos", role: "Editor", blurb: "Builds rhythm and emotion in the edit suite.", alt: "Cinematic portrait of Niko Santos in monochrome light." },
  { asset: "/assets/crew-clara.svg", name: "Clara Chen", role: "Production Designer", blurb: "Creates worlds with meaning in every visible detail.", alt: "Cinematic portrait of Clara Chen in green studio light." },
  { asset: "/assets/crew-elias.svg", name: "Elias Moore", role: "Colorist", blurb: "Gives every scene its final tone and pulse.", alt: "Cinematic portrait of Elias Moore in amber studio light." },
];

function Icon({ name, size = 18, strokeWidth = 1.7 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  if (name === "plus") {
    return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  }

  if (name === "chevron") {
    return <svg {...common}><path d="m6 9 6 6 6-6" /></svg>;
  }

  if (name === "arrow-up-right") {
    return <svg {...common}><path d="M5 19 19 5M8 5h11v11" /></svg>;
  }

  if (name === "arrow-right") {
    return <svg {...common}><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
  }

  if (name === "calendar") {
    return <svg {...common}><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M8 3v4M16 3v4M4 10h16" /></svg>;
  }

  return <svg {...common}><circle cx="12" cy="12" r="8" /></svg>;
}

function BrandMark({ label = "FRAMEHOUSE" }) {
  return (
    <span className="brand-lockup">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      {label && <span className="brand-label">{label}</span>}
    </span>
  );
}

function AssetVisual({ src, alt = "", tone = "neutral", className = "", loading = "lazy", fetchPriority, children }) {
  return (
    <div className={`asset-visual ${tone} ${className}`}>
      <div className="visual-fallback" aria-hidden="true" />
      {src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          onError={(event) => {
            event.currentTarget.setAttribute("aria-hidden", "true");
            event.currentTarget.style.display = "none";
          }}
        />
      )}
      {children}
    </div>
  );
}

function Reveal({ as: Element = "div", children, className = "", delay = 0, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Element>
  );
}

function LinkButton({ children, href = "#contact", light = false, icon = "arrow-up-right", className = "" }) {
  return (
    <a className={`link-button ${light ? "link-button-light" : ""} ${className}`} href={href}>
      {children}
      <Icon name={icon} size={18} />
    </a>
  );
}

function SectionLabel({ children }) {
  return (
    <Reveal className="section-label">
      <span className="label-icon"><Icon name="arrow-up-right" size={17} /></span>
      <span>{children}</span>
    </Reveal>
  );
}

function Navigation({ isOpen, setIsOpen }) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) setActiveSection(`#${visibleSection.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, setIsOpen]);

  return (
    <div className="nav-shell">
      <div className="nav-top">
        <a className="brand-link" href="#top" aria-label="Framehouse Films home">
          <BrandMark label="" />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`nav-link ${activeSection === href ? "is-active" : ""}`}
              aria-current={activeSection === href ? "page" : undefined}
            >
              {label}
              <Icon name="chevron" size={15} />
            </a>
          ))}
        </nav>
        <button
          className={`menu-button ${isOpen ? "is-open" : ""}`}
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className="nav-bottom">
        <a href="#services" className="utility-link"><Icon name="arrow-up-right" size={18} />Capabilities</a>
        <a href="#contact" className="utility-link"><Icon name="calendar" size={18} />Get in touch</a>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${isOpen ? "is-open" : ""}`} aria-label="Mobile navigation" aria-hidden={!isOpen}>
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1} aria-current={activeSection === href ? "page" : undefined}>{label}<Icon name="arrow-up-right" size={20} /></a>
        ))}
        <a href="#services" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>Capabilities<Icon name="arrow-up-right" size={20} /></a>
        <a href="#contact" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>Get in touch<Icon name="arrow-up-right" size={20} /></a>
      </nav>
    </div>
  );
}

function HeroMedia() {
  return (
    <div className="hero-media" aria-label="Framehouse film reel preview">
      <AssetVisual src="/assets/hero-flow.webp" alt="" tone="hero-art" className="hero-artwork" loading="eager" fetchPriority="high">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-bars" aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => <span key={index} style={{ "--bar-index": index }} />)}
        </div>
        <a className="hero-play" href="#work" aria-label="Explore selected films"><span>PLAY</span><Icon name="arrow-up-right" size={20} /></a>
        <div className="hero-frame-label">REEL / 01</div>
      </AssetVisual>
    </div>
  );
}

function Header({ isOpen, setIsOpen }) {
  return (
    <header className="site-header" id="top">
      <div className="container">
        <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="hero-content">
          <h1>Framehouse film production house</h1>
          <HeroMedia />
        </div>
      </div>
    </header>
  );
}

function LogosSection() {
  const logos = ["FRAMEHOUSE", "Northline", "Aster", "Morrow", "Signal", "Vista"];
  return (
    <section className="logos-section" id="about">
      <div className="container logos-layout">
        <Reveal as="p" className="intro-copy">We develop, produce, and finish films that turn a clear point of view into something people can feel. From the first treatment to the final grade, we bring the right crew, craft, and care to every frame.</Reveal>
        <Reveal className="client-logos" delay={100} aria-label="Selected production partners">
          {logos.map((logo, index) => <span className={`client-logo logo-${index}`} key={logo}>{logo}</span>)}
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [activeService, setActiveService] = useState(null);
  return (
    <section className="services-section" id="services">
      <div className="container">
        <SectionLabel>What We Make</SectionLabel>
        <div className="service-list">
          {services.map((service, index) => {
            const isActive = activeService === index;
            return (
              <Reveal as="div" className={`service-item ${isActive ? "is-active" : ""}`} key={service.name} delay={index * 45}>
                <button type="button" className="service-trigger" onClick={() => setActiveService(isActive ? null : index)} aria-expanded={isActive} aria-controls={`service-description-${index}`}>
                  <span className="service-name-row">
                    <AssetVisual src={service.asset} alt={service.alt} tone={`service-art service-art-${index}`} />
                    <span>{service.name}</span>
                  </span>
                  <span className="service-toggle"><Icon name="plus" size={27} /></span>
                </button>
                <div id={`service-description-${index}`} className="service-description" aria-hidden={!isActive}>
                  <p>{service.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const isFeatured = index === 0;

  return (
    <Reveal as="article" className={`project-card ${isFeatured ? "project-card-featured" : ""}`} delay={index * 60}>
      <AssetVisual src={project.asset} alt={project.alt} tone={`project-art ${project.tone}`} className="project-artwork">
        <div className="project-art-top">
          <span className="project-index">0{index + 1}</span>
          <span className="project-art-label">FRAMEHOUSE / SELECTED</span>
        </div>
        <a className="project-hover" href="#contact" aria-label={`Talk about ${project.title}`}><span>Discuss film</span><Icon name="arrow-up-right" size={20} /></a>
      </AssetVisual>
      <div className="project-info">
        <div className="project-info-main">
          <p className="project-eyebrow">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="project-logline">{project.logline}</p>
        </div>
        <div className="project-details"><span>{project.credit}</span><span>0{index + 1} / 04</span></div>
      </div>
    </Reveal>
  );
}

function PortfolioSection() {
  return (
    <section className="portfolio-section" id="work">
      <div className="container">
        <div className="portfolio-heading">
          <SectionLabel>Selected Films</SectionLabel>
          <Reveal as="p" className="portfolio-note" delay={80}>Four recent frames from commercial, narrative, music, and documentary work.</Reveal>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
        </div>
        <LinkButton href="#contact" icon="arrow-right" className="wide-button">View film archive</LinkButton>
      </div>
    </section>
  );
}

function TeamCard({ member, index }) {
  return (
    <Reveal as="article" className="team-card" delay={index * 45}>
      <AssetVisual src={member.asset} alt={member.alt} tone="team-art" className="team-artwork">
        <span className="team-index">0{index + 1} / 06</span>
        <span className="team-media-label">FRAMEHOUSE CREW</span>
      </AssetVisual>
      <div className="team-info">
        <div><h3>{member.name}</h3><p>{member.role}</p></div>
        <p className="team-blurb">{member.blurb}</p>
      </div>
    </Reveal>
  );
}

function TeamSection() {
  return (
    <section className="team-section" id="team">
      <div className="container">
        <SectionLabel>The Crew</SectionLabel>
        <div className="team-intro-row">
          <Reveal as="p" className="team-intro">A production house built around curious directors, thoughtful producers, and the people who make every frame matter.</Reveal>
          <Reveal className="team-note" delay={100}>
            <span className="team-note-index">06 / 06</span>
            <p>One connected crew across development, production, post, and finish.</p>
          </Reveal>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => <TeamCard member={member} index={index} key={member.asset} />)}
        </div>
        <LinkButton href="#contact" icon="arrow-right" className="wide-button">Meet the crew</LinkButton>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <Reveal className="cta-panel">
          <AssetVisual src="/assets/cta-flow.webp" alt="" tone="cta-art" className="cta-artwork" />
          <div className="cta-content">
            <h2>Have a story? Let&apos;s make it.</h2>
            <p>From the first treatment to final delivery, we build focused productions with ambitious ideas and exceptional craft.</p>
             <LinkButton href="#" light icon="arrow-up-right">Start a conversation</LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-panel">
          <div className="footer-brand"><BrandMark label="Framehouse" /></div>
          <div className="footer-menus">
            <div className="footer-menu-upper">
              <div className="footer-link-column">
                {navItems.map(([label, href]) => <a href={href} key={label}>{label}<Icon name="chevron" size={14} /></a>)}
              </div>
               <a className="footer-email" href="#">hello@framehouse.film</a>
            </div>
            <div className="footer-menu-lower">
              <a className="footer-service-link" href="#services"><Icon name="arrow-up-right" size={17} />Capabilities<Icon name="arrow-up-right" size={17} /></a>
              <div className="social-links" aria-label="Social links">
                 {["f", "◎", "x", "p", "in", "@"].map((social) => <a href="#" aria-label={`Social ${social}`} key={social}>{social}</a>)}
              </div>
              <span className="footer-copyright">© 2026 Framehouse Films</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      startTransition(() => setContentReady(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="page"
      onClickCapture={(event) => {
        const anchor = event.target instanceof Element ? event.target.closest("a") : null;
        const href = anchor?.getAttribute("href") ?? "";
        if (href === "#" || /^(?:\/|https?:|mailto:)/i.test(href)) {
          event.preventDefault();
        }
      }}
    >
      <a className="skip-link" href="#main">Skip to content</a>
      <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      <main id="main" tabIndex="-1">
        {contentReady && (
          <>
            <LogosSection />
            <ServicesSection />
            <PortfolioSection />
            <TeamSection />
            <CtaSection />
          </>
        )}
      </main>
      {contentReady && <Footer />}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
