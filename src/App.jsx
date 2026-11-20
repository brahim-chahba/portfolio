import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import LightRays from "./components/LightRays";
import {
  about,
  capabilities,
  certifications,
  education,
  experience,
  navItems,
  projects,
  site,
  skills,
} from "./content";

const REVEAL_DURATION = 0.54;
const MotionPreferenceContext = createContext(false);
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;
const revealCallbacks = new Map();
let revealObserver;

function getRevealObserver() {
  if (revealObserver) return revealObserver;
  if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") return null;

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        const onVisible = revealCallbacks.get(target);
        if (onVisible) onVisible();

        revealCallbacks.delete(target);
        revealObserver?.unobserve(target);

        if (revealCallbacks.size === 0 && revealObserver) {
          revealObserver.disconnect();
          revealObserver = undefined;
        }
      });
    },
    { threshold: 0.2 },
  );

  return revealObserver;
}

function observeRevealNode(node, onVisible) {
  const observer = getRevealObserver();
  if (!observer) {
    onVisible();
    return () => {};
  }

  revealCallbacks.set(node, onVisible);
  observer.observe(node);

  return () => {
    revealCallbacks.delete(node);
    observer.unobserve(node);

    if (revealCallbacks.size === 0 && revealObserver) {
      revealObserver.disconnect();
      revealObserver = undefined;
    }
  };
}

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <MotionPreferenceContext.Provider value={prefersReducedMotion}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="page-shell" id="top">
        <SiteNav />

        <main className="site-main" id="main-content">
          <HeroSection />
          <ProjectsSection />
          <CapabilitiesSection />
          <ExperienceSection />
          <StackSection />
          <CertificationsSection />
          <AboutSection />
          <ContactSection />
        </main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <p>(c) {new Date().getFullYear()} {site.name}</p>
            <nav className="footer-links" aria-label="Footer links">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </MotionPreferenceContext.Provider>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const navToggleRef = useRef(null);
  const navPanelRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let lastProgress = -1;

    const updateFromScroll = () => {
      const scrollTop = window.scrollY || root.scrollTop;
      const maxScroll = root.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;
      const rounded = Math.round(progress * 1000) / 1000;

      if (rounded !== lastProgress) {
        root.style.setProperty("--scroll-progress", rounded.toFixed(3));
        lastProgress = rounded;
      }

      setScrolled((previous) => {
        const next = scrollTop > 20;
        return previous === next ? previous : next;
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateFromScroll();
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      root.style.setProperty("--scroll-progress", "0");
    };
  }, []);

  useEffect(() => {
    const ids = navItems.map((item) => item.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section) => section instanceof HTMLElement);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const currentId = visibleEntries[0].target.id;
          setActiveHash(`#${currentId}`);
        }
      },
      {
        threshold: [0.2, 0.35, 0.55],
        rootMargin: "-34% 0px -52% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth > 760) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const getFocusableNodes = () => {
      const toggle = navToggleRef.current;
      const links = Array.from(navPanelRef.current?.querySelectorAll("a[href]") ?? []);
      return [toggle, ...links].filter((node) => node instanceof HTMLElement);
    };

    const onEscape = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      navToggleRef.current?.focus();
    };

    const onKeydown = (event) => {
      if (event.key === "Escape") {
        onEscape(event);
        return;
      }

      if (event.key !== "Tab" || window.innerWidth > 760) return;

      const focusable = getFocusableNodes();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeydown);

    const firstLink = navPanelRef.current?.querySelector("a");
    firstLink?.focus() ?? navToggleRef.current?.focus();

    return () => window.removeEventListener("keydown", onKeydown);
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    if (menuOpen && window.innerWidth <= 760) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " site-header-scrolled" : ""}${menuOpen ? " site-header-menu-open" : ""}`}>
      <div className="site-header-inner">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">
            <img src="/bc-logo.png" alt={`${site.name} logo`} loading="eager" />
          </span>
          <span className="brand-copy">
            <strong>{site.name}</strong>
            <span>{site.role}</span>
          </span>
        </a>

        <button
          ref={navToggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav
          ref={navPanelRef}
          className={`site-nav${menuOpen ? " is-open" : ""}`}
          id="primary-nav"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={activeHash === item.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`nav-backdrop${menuOpen ? " is-open" : ""}`}
          tabIndex={-1}
          aria-label="Close navigation menu"
          onClick={() => {
            setMenuOpen(false);
            navToggleRef.current?.focus();
          }}
        />
      </div>
    </header>
  );
}

function HeroSection() {
  const heroSignals = [
    { label: "Projects", value: `${projects.length}+ shipped case studies` },
    { label: "Primary focus", value: "AI systems + backend APIs" },
    { label: "Open for", value: "Internship and freelance collaboration" },
  ];

  return (
    <section className="section hero" id="hero" aria-labelledby="hero-heading">
      <div className="hero-content">
        <Reveal>
          <p className="hero-kicker">Portfolio</p>
        </Reveal>

        <Reveal delay={0.035} duration={0.62} distance={14}>
          <h1 className="hero-title" id="hero-heading">
            Practical AI products, resilient backend systems, and clean delivery.
          </h1>
        </Reveal>

        <Reveal delay={0.085} duration={0.62} distance={14}>
          <p className="hero-description">{site.intro}</p>
        </Reveal>

        <Reveal delay={0.11} duration={0.56}>
          <p className="hero-meta-line">
            {site.role} / {site.location}
          </p>
        </Reveal>

        <Reveal delay={0.13} duration={0.56}>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View work
            </a>
            <a className="button-link" href={site.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} duration={0.56}>
          <div className="hero-links-row" aria-label="Profile links">
            <a className="hero-inline-link" href={`mailto:${site.email}`}>
              Email
            </a>
            <a className="hero-inline-link" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="hero-inline-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.19} duration={0.6} distance={10}>
          <ul className="hero-proof-grid" aria-label="Quick profile highlights">
            {heroSignals.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.14} duration={0.66} distance={16}>
        <div className="hero-visual">
          <div className="hero-ray-shell" aria-hidden="true">
            <div style={{ width: "1080px", height: "1080px", position: "relative" }}>
              <LightRays
                raysOrigin="top-center"
                raysColor="#ffdf00"
                raysSpeed={1}
                lightSpread={1}
                rayLength={2.7}
                pulsating={false}
                fadeDistance={1}
                saturation={1}
                followMouse
                mouseInfluence={0.25}
                noiseAmount={0}
                distortion={0}
              />
            </div>
          </div>
          <div className="portrait-stage">
            <img
              src="/me-white-removebg-preview.png"
              alt={`Portrait of ${site.name}`}
              width="520"
              height="520"
              loading="eager"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ProjectsSection() {
  const isEmpty = projects.length === 0;

  return (
    <section className="section" id="work" aria-labelledby="work-heading">
      <Reveal>
        <SectionHeader
          index="01"
          id="work-heading"
          kicker="Selected work"
          title="Engineering case studies with clear architecture and delivery outcomes."
        />
      </Reveal>

      {isEmpty ? (
        <Reveal delay={0.06}>
          <div className="empty-state" role="status" aria-live="polite">
            <h3>Projects are being prepared.</h3>
            <p>Case studies will be added soon.</p>
          </div>
        </Reveal>
      ) : (
        <div className="projects-grid">
          {projects.map((project, index) => {
            const previewTech = project.tech.slice(0, 3).join(" / ");
            const previewTags = project.tags.slice(0, 2).join(" / ");
            const previewMeta = `${previewTags} / ${project.year}`;
            const motionDelay = 0.04 + index * 0.06;
            const projectCover = project.cover ?? "/covers/fake-news-azure.svg";
            const reverseLayout = index % 2 !== 0;

            return (
              <Reveal key={project.title} delay={motionDelay} duration={0.6} distance={12}>
                <article className={`project-card accent-${project.accent}${reverseLayout ? " is-reverse" : ""}`}>
                  <div className="project-thumbnail">
                    <img
                      src={projectCover}
                      alt={`${project.title} visual cover`}
                      loading="lazy"
                      className="project-cover-image"
                    />
                  </div>

                  <div className="project-body">
                    <div className="project-meta-row">
                      <p className="project-meta-line">{previewMeta}</p>
                    </div>

                    <div className="project-head">
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>

                    <div className="project-footer">
                      <p className="project-tech-line">{previewTech}</p>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} repository`}
                        >
                          View repository
                        </a>
                      )}
                      {!project.github && project.repositoryStatus && (
                        <p className="project-repo-note" aria-label={`Repository status: ${project.repositoryStatus}`}>
                          {project.repositoryStatus}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      )}
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about" id="about" aria-labelledby="about-heading">
      <div className="about-layout">
        <Reveal>
          <div className="about-main">
            <p className="kicker">
              <span className="section-index">06</span> About
            </p>
            <h2 id="about-heading">{about.heading}</h2>
            <div className="about-copy">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="about-facts" aria-label="Profile facts">
            {about.facts.map((fact) => (
              <li key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section className="section" id="capabilities" aria-labelledby="capabilities-heading">
      <Reveal>
        <SectionHeader
          index="02"
          id="capabilities-heading"
          kicker="Services"
          title="What I can design, build, and deliver end-to-end."
          body="Three focused collaboration tracks built for practical engineering outcomes."
        />
      </Reveal>

      <div className="capability-grid">
        {capabilities.map((item, index) => (
          <Reveal key={item.title} delay={0.04 + index * 0.05} duration={0.58} distance={10}>
            <article className="capability-card">
              <p className="meta-label">{`0${index + 1}`}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <p className="capability-line">{item.chips.join(" / ")}</p>
              {item.deliverables?.length > 0 && (
                <ul className="capability-deliverables" aria-label={`${item.title} deliverables`}>
                  {item.deliverables.slice(0, 2).map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const experienceHighlights = experience.flatMap((item) => item.bullets).slice(0, 3);

  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <Reveal>
        <SectionHeader
          index="03"
          id="experience-heading"
          kicker="Experience"
          title="Professional delivery experience with clear execution ownership."
        />
      </Reveal>

      <div className="engineering-flow">
        <Reveal delay={0.04}>
          <article className="engineering-unit">
            <h3>Internship</h3>
            <div className="timeline-list">
              {experience.map((item) => (
                <article key={`${item.company}-${item.role}`} className="timeline-item">
                  <p className="meta-label">{item.period}</p>
                  <h4>
                    {item.role} <span>@ {item.company}</span>
                  </h4>
                  <p>{item.summary}</p>
                  <ul>
                    {item.bullets.slice(0, 2).map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </article>
        </Reveal>

        <div className="engineering-secondary">
          <Reveal delay={0.08}>
            <article className="engineering-unit">
              <h3>Education</h3>
              <div className="timeline-list">
                {education.map((item) => (
                  <article key={item.school} className="timeline-item">
                    <p className="meta-label">{item.period}</p>
                    <h4>{item.degree}</h4>
                    <p>{item.school}</p>
                    <p>{item.details}</p>
                  </article>
                ))}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="engineering-unit">
              <h3>Delivery highlights</h3>
              <ul className="highlight-list">
                {experienceHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  const stackSummary = skills
    .slice(0, 4)
    .map((group) => `${group.label}: ${group.items.slice(0, 4).join(", ")}`);

  return (
    <section className="section" id="stack" aria-labelledby="stack-heading">
      <Reveal>
        <SectionHeader
          index="04"
          id="stack-heading"
          kicker="Technical Stack"
          title="Core technologies used across backend, AI, and cloud implementation."
        />
      </Reveal>

      <div className="stack-flow">
        {stackSummary.map((line, index) => (
          <Reveal key={line} delay={0.04 + index * 0.04}>
            <article className="engineering-unit">
              <p className="stack-summary-line">{line}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  const visibleCertifications = certifications.slice(0, 4);

  return (
    <section className="section" id="certifications" aria-labelledby="certifications-heading">
      <Reveal>
        <SectionHeader
          index="05"
          id="certifications-heading"
          kicker="Certifications"
          title="Recent learning credentials aligned with applied AI and cloud workflows."
        />
      </Reveal>

      <div className="cert-grid">
        <Reveal delay={0.04}>
          <article className="engineering-unit">
            <div className="cert-list">
              {visibleCertifications.map((cert) => (
                <article key={cert.title} className="cert-item">
                  <p className="meta-label">{cert.year}</p>
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer}</p>
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="cert-link">
                    Verify
                  </a>
                </article>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <Reveal>
        <article className="contact-card">
          <div className="contact-grid">
            <div className="contact-main">
              <p className="kicker">
                <span className="section-index">07</span> Contact
              </p>
              <h2 id="contact-heading">Open to internship and freelance collaboration.</h2>
            </div>

            <div className="contact-side">
              <ul className="contact-list">
                <li>
                  <span>Email</span>
                  <strong>
                    <a
                      href={`mailto:${site.email}`}
                      className="contact-value-link"
                      aria-label={`Send email to ${site.email}`}
                    >
                      {site.email}
                    </a>
                  </strong>
                </li>
                <li>
                  <span>Phone</span>
                  <strong>
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, "")}`}
                      className="contact-value-link"
                      aria-label={`Call ${site.phone}`}
                    >
                      {site.phone}
                    </a>
                  </strong>
                </li>
                <li>
                  <span>Location</span>
                  <strong>{site.location}</strong>
                </li>
              </ul>

              <div className="contact-actions">
                <a className="button button-primary" href={`mailto:${site.email}`}>
                  Email me
                </a>
                <a className="contact-inline-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a className="contact-inline-link" href={site.resume} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </div>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

function SectionHeader({ id, index, kicker, title, body }) {
  return (
    <div className="section-header">
      <p className="kicker">
        {index && <span className="section-index">{index}</span>} {kicker}
      </p>
      <h2 id={id}>{title}</h2>
      {body && <p className="section-body">{body}</p>}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  return prefersReducedMotion;
}

function Reveal({ children, delay = 0, distance = 10, duration = REVEAL_DURATION }) {
  const revealRef = useRef(null);
  const prefersReducedMotion = useContext(MotionPreferenceContext);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion || isVisible) {
      setIsVisible(true);
      return undefined;
    }

    const node = revealRef.current;
    if (!node) return undefined;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const rect = node.getBoundingClientRect();
    const likelyInView = rect.top < viewportHeight * 0.92 && rect.bottom > 0;

    if (likelyInView) {
      setIsVisible(true);
      return undefined;
    }

    return observeRevealNode(node, () => setIsVisible(true));
  }, [prefersReducedMotion, isVisible]);

  return (
    <div
      ref={revealRef}
      className={`reveal${isVisible ? " is-visible" : ""}${prefersReducedMotion ? " is-reduced" : ""}`}
      style={{
        "--reveal-delay": `${delay}s`,
        "--reveal-distance": `${distance}px`,
        "--reveal-duration": `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}

export default App;
