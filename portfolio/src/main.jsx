import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const asset = (name) => `/assets/${name}`;

function Arrow({ direction = "right", size = 18 }) {
  const path = direction === "left" ? "M18 12H5m6-6-6 6 6 6" : "M5 12h13m-6-6 6 6-6 6";
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalArrow({ size = 16 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <span className="play-icon" aria-hidden="true">
      <span />
    </span>
  );
}

function WelcomeLogo({ dark = false }) {
  return (
    <span className={`welcome-logo ${dark ? "welcome-logo-dark" : ""}`}>
      <span className="welcome-symbol"><i /><i /></span>
      <span>Welcome</span>
    </span>
  );
}

function Button({ children, href = "#contact", variant = "outline", icon = true }) {
  return (
    <a className={`button button-${variant}`} href={href}>
      <span>{children}</span>
      {icon && <ExternalArrow size={15} />}
    </a>
  );
}

function Header({ isOpen, setIsOpen }) {
  return (
    <header className="hero" id="top">
      <div className="hero-gradient" />
      <nav className="top-nav page-width">
        <a className="nav-logo" href="#top" aria-label="Welcome home"><WelcomeLogo /></a>
        <div className="nav-center">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#events">Events</a>
          <a href="#about">About</a>
          <a href="#articles">Blog</a>
        </div>
        <div className="nav-actions">
          <a href="#support">Support</a>
          <a href="#login">Login</a>
          <Button href="#contact" variant="nav">Demo</Button>
        </div>
        <button className={`menu-toggle ${isOpen ? "is-open" : ""}`} type="button" aria-expanded={isOpen} aria-label="Toggle menu" onClick={() => setIsOpen((value) => !value)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className="hero-copy page-width">
        <p className="eyebrow">Signup for The Drip</p>
        <h1>Captivate &amp; Convert</h1>
        <p className="hero-description">A webinar platform designed for marketers to host jaw-dropping experiences that drive revenue.</p>
        <div className="hero-actions">
          <Button href="#contact" variant="primary">Demo</Button>
          <Button href="#how-it-works" variant="ghost">See how it works</Button>
        </div>
      </div>
      <div className="hero-product page-width">
        <img className="hero-laptop" src={asset("hero-mockup.png")} alt="Welcome webinar platform on a laptop" />
        <img className="hero-frame" src={asset("hero-frame.png")} alt="Welcome webinar launch video" />
      </div>
      <div className={`mobile-nav ${isOpen ? "is-open" : ""}`}>
        {[["Features", "#features"], ["Pricing", "#pricing"], ["Events", "#events"], ["About", "#about"], ["Blog", "#articles"], ["Support", "#support"], ["Login", "#login"]].map(([label, href]) => (
          <a key={label} href={href} onClick={() => setIsOpen(false)}>{label}<ExternalArrow size={17} /></a>
        ))}
        <Button href="#contact" variant="primary">Request a demo</Button>
      </div>
    </header>
  );
}

function TrustSection() {
  const logoColumns = [
    [
      <img src={asset("logo-adobe.png")} alt="Adobe" key="adobe" />,
      <img src={asset("logo-square.png")} alt="Square" key="square" />,
      <img src={asset("logo-onepassword.png")} alt="1Password" key="one-p" />,
      <img src={asset("logo-nba.png")} alt="NBA" key="nba" />,
      <img src={asset("logo-adobe-2.png")} alt="Adobe" key="adobe-2" />,
      <img src={asset("logo-motive.png")} alt="Motive" key="motive" />,
    ],
    [
      <img src={asset("logo-onepassword.png")} alt="1Password" key="one-p-2" />,
      <img src={asset("logo-checkr.png")} alt="Checkr" key="checkr" />,
      <img src={asset("logo-twilio.png")} alt="Twilio" key="twilio" />,
      <img src={asset("logo-broadcom.png")} alt="Broadcom" key="broadcom" />,
      <img src={asset("logo-sendoso.png")} alt="Sendoso" key="sendoso" />,
      <img src={asset("logo-brex.png")} alt="Brex" key="brex" />,
      <img src={asset("logo-univision.png")} alt="Univision" key="univision" />,
      <img src={asset("logo-zendesk.png")} alt="Zendesk" key="zendesk" />,
    ],
  ];
  return (
    <section className="trust-section dark-section" id="about">
      <div className="page-width trust-grid">
        <div className="trust-copy">
          <h2>World-class teams are upgrading to Welcome</h2>
          <p>Companies are ditching legacy platforms for the ability to deliver an engaging experience at every level.</p>
          <div className="trust-stat"><img className="trust-stat-icon" src={asset("trust-stat-arrow.png")} alt="" /><strong>66% attendance rate</strong><span>avg attendance for Welcome customers</span></div>
        </div>
        <div className="logo-columns" aria-label="Welcome customers">
          {logoColumns.map((column, index) => <div className={`logo-column logo-column-${index + 1}`} key={index}>{column.map((logo, logoIndex) => <span className="logo-slot" key={logoIndex}>{logo}</span>)}</div>)}
        </div>
      </div>
    </section>
  );
}

const experienceFeatures = [
  { title: "Interactive overlays", text: "Add custom branded graphics that lay over your live video to intro speakers, emphasize key points, and display clickable CTAs.", image: "experience-base.png", className: "experience-large copy-composite copy-base" },
  { title: "Interactive Polls", text: "Embed polls directly on stage and watch the results populate in real-time. Moderate audience questions, allow upvoting, and bring attendees on-stage.", image: "experience-overlays.png", className: "copy-composite copy-poll" },
  { title: "HD Video Quality", text: "Provide a better experience for your viewers with crystal clear HD video streaming.", image: "experience-video-image.png", className: "copy-card copy-video" },
  { title: "Q&A", text: "Moderate audience questions, allow upvoting, and bring attendees on-stage.", image: "experience-qa-card.png", className: "copy-card copy-qa" },
  { title: "Chat", text: "Chat is where engagement happens. With a slack-like experience, attendees can use emojis, reactions, and gifs to express themselves.", image: "experience-panel.png", className: "copy-card copy-chat" },
];

function FeatureMedia({ feature }) {
  return (
    <article className={`feature-media ${feature.className || ""}`}>
      <img src={asset(feature.image)} alt="" />
      <div className="feature-caption">
        <h3>{feature.title}</h3>
        <p>{feature.text}</p>
      </div>
    </article>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section light-section" id="features">
      <div className="page-width">
        <h2 className="display-heading">An unmatched attendee<br /><br /><span>Experience</span></h2>
        <div className="experience-grid">
          <FeatureMedia feature={experienceFeatures[0]} />
          <FeatureMedia feature={experienceFeatures[1]} />
          <FeatureMedia feature={experienceFeatures[2]} />
          <FeatureMedia feature={experienceFeatures[3]} />
          <FeatureMedia feature={experienceFeatures[4]} />
        </div>
        <Button href="#studio" variant="dark">See all features</Button>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="quote-section dark-section">
      <div className="quote-media" aria-hidden="true"><img src={asset("studio-background.png")} alt="" /></div>
      <div className="quote-content page-width">
        <blockquote>&quot;Makes other platforms<br />look like the 1990&apos;s&quot;</blockquote>
        <p>-Nate Skinner, CMO at Onfido</p>
        <Button href="#customer-stories" variant="dark">Read customer stories</Button>
      </div>
    </section>
  );
}

function StudioSection() {
  const items = [
    ["Drag-n-drop Agenda Builder", "Quickly rearrange your webinar's sequence of actions and instantly generate an agenda that auto-updates as you move actions around.", "studio-agenda.png"],
    ["Brand customization", "Brand the entire experience including registration pages, emails, backdrops, logo placements, fonts, overlays, and photo booth templates.", "studio-image-1.png"],
    ["Stage Kit", "Design branded overlays, lower thirds, and right-side gradients directly in the Welcome platform.", "studio-image-2.png"],
    ["Green Room", "Invite speakers to a private waiting room to meet and prep to go on stage.", "green-room.png"],
  ];
  return (
    <section className="studio-section dark-section" id="studio">
      <div className="page-width">
        <p className="powered-by">Powered by</p>
        <h2 className="studio-title">Welcome<br /><span>Studio</span></h2>
        <div className="studio-hero-media">
          <img src={asset("studio-agenda.png")} alt="Welcome Studio agenda builder" />
          <div className="studio-delete"><img src={asset("studio-delete.png")} alt="" /></div>
        </div>
        <div className="studio-features">
          {items.map(([title, text, image], index) => (
            <article className="studio-feature" key={title}>
              <div className="studio-feature-image"><img src={asset(image)} alt="" /></div>
              <div className="feature-step">0{index + 1}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <Button href="#how-it-works" variant="dark">See all features</Button>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="metrics-section light-section" id="pricing">
      <div className="page-width metrics-grid">
        <h2 className="display-heading compact">Drive<br /><span>Revenue</span></h2>
        <div className="metric-list">
          <div><strong>+87%</strong><span>increased attendee engagement</span><small>at Bitwise</small></div>
          <div><strong>$1.7M</strong><span>pipeline generated</span><small>at Everbridge</small></div>
          <div><strong>58%</strong><span>attendee conversion rate</span><small>at Interfolio</small></div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    ["Step 1", "Create", "Welcome Studio gives you all the tools you need to create and host virtual experiences that look awesome and put your brand centerstage.", "how-create.png"],
    ["Step 2", "Engage", "Cut through the yawns, grab your audience's attention, and turn passive attendees into active participants.", "how-engage.png"],
    ["Step 3", "Analyze", "Track the success of your events with deep insights and analytics measured across the entire attendee experience.", "how-analyze.png"],
  ];
  return (
    <section className="how-section dark-section" id="how-it-works">
      <div className="page-width how-header">
        <h2 className="display-heading">How it<br /><span>works</span></h2>
        <div><p>Manage your experience from start to finish, from integrations to registration and from interactive stage elements to post-event data, it&apos;s all here.</p><Button href="#contact" variant="dark">Learn more</Button></div>
      </div>
      <div className="page-width step-list">
        {steps.map(([eyebrow, title, text, image]) => (
          <article className="step-row" key={title}>
            <div className="step-copy"><span>{eyebrow}</span><h3>{title}</h3><p>{text}</p></div>
            <img src={asset(image)} alt="" />
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegrationsSection() {
  return (
    <section className="integrations-section light-section">
      <div className="page-width integrations-grid">
        <div className="integration-orbit" aria-hidden="true">
          <span className="integration-tile tile-office"><img src={asset("logo-office.png")} alt="" /></span>
          <span className="integration-tile tile-salesforce"><img src={asset("logo-salesforce.png")} alt="" /></span>
          <span className="integration-tile tile-hubspot"><img src={asset("logo-hubspot.png")} alt="" /></span>
          <span className="integration-tile tile-wordpress">W</span>
          <span className="integration-tile tile-slack">#</span>
        </div>
        <div className="integration-copy">
          <h2 className="display-heading">Integrate<br /><span>your data</span></h2>
          <p>Leverage your existing marketing platforms and sync the data seamlessly</p>
        </div>
      </div>
    </section>
  );
}

const stories = [
  { quote: "We chose Welcome because it's intuitive, beautifully designed, and made for attendee interaction, making it the perfect way to uplevel our experiences. The Slack-like chat, on-stage Q&A, and polling has increased audience engagement.", name: "Ally Masi", role: "Director of Industries Events Marketing\nSalesforce", avatar: "avatar-ally.png", logo: "salesforce-mark.png" },
  { quote: "Before Welcome, I had to get a switcher, use Ecamm, OBS and always needed this or that to make it all work. Now, one or two people can run our virtual events easily without any special equipment. With just one platform, we can do everything we want.", name: "Talisha Brantley", role: "VP of Events\nBitwise", avatar: "avatar-talisha.png", logo: null },
  { quote: "The Welcome experience has been 10 out of 10. When our sponsors like Facebook are considering sponsoring our events, Welcome is our secret weapon.", name: "Sarah Miller", role: "Director of Events\nDribbble", avatar: "avatar-screenshot.png", logo: null },
];

function CustomerStories() {
  const [activeStory, setActiveStory] = useState(0);
  const story = stories[activeStory];
  return (
    <section className="stories-section dark-section" id="customer-stories">
      <div className="page-width">
        <div className="stories-heading"><h2 className="display-heading">Loved &amp;<br /><span>trusted</span></h2><div className="story-controls"><button type="button" aria-label="Previous story" onClick={() => setActiveStory((activeStory + stories.length - 1) % stories.length)}><Arrow direction="left" size={30} /></button><button type="button" aria-label="Next story" onClick={() => setActiveStory((activeStory + 1) % stories.length)}><Arrow size={30} /></button></div></div>
        <div className="story-window"><div className="story-track" style={{ "--story-index": activeStory }}>{stories.map((item) => <StoryCard story={item} key={item.name} />)}</div></div>
      </div>
    </section>
  );
}

function StoryCard({ story }) {
  return (
    <article className="story-card">
      <p className="story-quote">&quot;{story.quote}&quot;</p>
      <div className="story-author"><img src={asset(story.avatar)} alt="" /><div><strong>{story.name}</strong><span>{story.role.split("\n").map((line) => <span key={line}>{line}</span>)}</span></div></div>
      {story.logo ? <img className="story-logo" src={asset(story.logo)} alt="Salesforce" /> : <strong className="story-wordmark">Bitwise</strong>}
    </article>
  );
}

function OpportunitiesSection() {
  const columns = [["Webinars", "Product Demos", "Community Events", "AMAs", "Multi-track"], ["Company Meetings", "Customer Training", "Fireside Chat", "Kick-offs", "Workshops"]];
  return (
    <section className="opportunities-section dark-section">
      <div className="page-width">
        <h2 className="opportunities-title"><span>One</span> platform<br /><em>Endless</em><strong>Opportunities</strong></h2>
        <div className="opportunity-columns">{columns.map((column) => <div key={column[0]}>{column.map((item) => <a href="#contact" key={item}>{item}<ExternalArrow size={14} /></a>)}</div>)}</div>
      </div>
    </section>
  );
}

const articles = [
  ["article-repurpose.png", "8 Creative Ways to Repurpose Your Webinar Content"],
  ["article-leadgen.png", "Why Webinars Are the #1 Lead Generation Marketing Strategy, You May Not Be Thinking About"],
  ["article-pipeline.png", "How to Drive Qualified Pipeline and Enable Sales After Your Webinar Wraps"],
];

function ArticlesSection() {
  return (
    <section className="articles-section light-section" id="articles">
      <div className="page-width">
        <h2 className="center-heading">Recent articles</h2>
        <div className="article-grid">{articles.map(([image, title]) => <article className="article-card" key={title}><img src={asset(image)} alt="" /><span>Inspiration</span><h3>{title}</h3><a href="#articles">Read <Arrow size={15} /></a></article>)}</div>
        <Button href="#articles" variant="dark">Read the blog</Button>
      </div>
    </section>
  );
}

function EventsSection() {
  return (
    <section className="events-section dark-section" id="events">
      <div className="page-width">
        <div className="events-heading"><h2 className="display-heading">Join us</h2><a href="#events">All events <ExternalArrow size={14} /></a></div>
        <article className="event-card"><div className="event-copy"><span>December 21, 2022</span><h3>Attention-Grabbing Marketing in a Noisy Market</h3><Button href="#contact" variant="primary">Register</Button></div><img src={asset("event-image.png")} alt="Event speakers" /></article>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [sent, setSent] = useState(false);
  return (
    <section className="newsletter-section dark-section" id="support">
      <div className="page-width newsletter-grid">
        <div><h2>Signup for the<br />newsletter</h2><p>Stay connected</p></div>
        <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>First name<input name="firstName" aria-label="First name" /></label><label>Email<div className="email-field"><input type="email" name="email" aria-label="Email" required /><button type="submit" aria-label="Submit email"><Arrow /></button></div></label>{sent && <span className="form-success">Thanks - you&apos;re on the list.</span>}</form>
      </div>
    </section>
  );
}

const mosaic = ["mosaic-01.png", "mosaic-02.png", "mosaic-03.png", "mosaic-04.png", "mosaic-05.png", "mosaic-06.png", "mosaic-07.png", "mosaic-08.png"];

function ClosingSection() {
  return (
    <section className="closing-section dark-section" id="contact">
       <div className="page-width closing-copy"><h2>Experience<br />Welcome</h2><p>A webinar platform designed for marketers to host jaw-dropping experiences that drive revenue.</p><Button href="#" variant="primary">Request a demo</Button></div>
      <div className="mosaic-grid page-width">{mosaic.map((file) => <img key={file} src={asset(file)} alt="" />)}</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer dark-section" id="login">
      <div className="page-width footer-main"><WelcomeLogo /><p>A webinar platform designed for marketers to host jaw-dropping experiences that drive revenue.</p><div className="footer-links"><div><span>Product</span><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#contact">Book a demo</a></div><div><span>Explore</span><a href="#events">Events</a><a href="#articles">Blog</a></div><div><span>Company</span><a href="#about">About us</a><a href="#contact">Contact us</a></div></div></div>
       <div className="page-width footer-bottom"><span>(c) 2022 Welcome. All right reserved.</span><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><div className="footer-social"><a href="#">in</a><a href="#">x</a><a href="#">@</a></div></div>
    </footer>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);
   return <div className="app" onClickCapture={(event) => { const anchor = event.target instanceof Element ? event.target.closest("a") : null; const href = anchor?.getAttribute("href") ?? ""; if (href === "#" || /^(?:\/|https?:|mailto:)/i.test(href)) event.preventDefault(); }}><Header isOpen={isOpen} setIsOpen={setIsOpen} /><main><TrustSection /><ExperienceSection /><QuoteSection /><StudioSection /><MetricsSection /><HowItWorksSection /><IntegrationsSection /><CustomerStories /><OpportunitiesSection /><ArticlesSection /><EventsSection /><NewsletterSection /><ClosingSection /></main><Footer /></div>;
}

createRoot(document.getElementById("root")).render(<App />);
