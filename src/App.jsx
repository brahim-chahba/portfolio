import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  about,
  certifications,
  education,
  experience,
  navItems,
  projects,
  site,
  skills,
  testimonials,
} from "./content";

const MotionPreferenceContext = createContext(false);
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function App() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <MotionPreferenceContext.Provider value={prefersReducedMotion}>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <div className="page-shell" id="top">
        <SiteNav />

        <main id="main-content">
          <HeroSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <StackSection />
          <CertificationsSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <footer className="site-footer">
          <div className="site-footer-inner">
            <p>© {new Date().getFullYear()} {site.name}</p>
            <p>Designed and built in Agadir, Morocco.</p>
          </div>
        </footer>
      </div>
    </MotionPreferenceContext.Provider>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveHash(`#${current.target.id}`);
      },
      { rootMargin: "-28% 0px -60%", threshold: [0.1, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a className="brand" href="#hero" aria-label={`${site.name}, home`}>
          <span className="brand-mark" aria-hidden="true">BC</span>
          <span className="brand-name">{site.name}</span>
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav id="primary-nav" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={activeHash === item.href ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero section-shell" id="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <Reveal>
          <p className="eyebrow"><span /> AI × BACKEND × CLOUD</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 id="hero-heading">I turn complex systems into <em>useful products.</em></h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="hero-intro">{site.intro}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="hero-actions">
            <a className="button button-primary" href="#experience">Explore my profile</a>
            <a className="button button-secondary" href={site.resume} target="_blank" rel="noopener noreferrer">View résumé</a>
          </div>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="hero-meta">
            <span>Based in {site.location}</span>
            <span className="availability"><i /> Available for opportunities</span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="hero-portrait" aria-label={`Portrait of ${site.name}`}>
          <div className="mosaic mosaic-a" aria-hidden="true" />
          <div className="mosaic mosaic-b" aria-hidden="true" />
          <div className="portrait-card">
            <p>FIG. 01 / BUILDER</p>
            <img src="/me-white-removebg-preview.png" alt={`Portrait of ${site.name}`} width="520" height="520" />
            <span>AGADIR / MOROCCO</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" number="01" label="Experience" title="Learning by building for real constraints.">
      <div className="timeline">
        {experience.map((item) => (
          <Reveal key={`${item.company}-${item.role}`}>
            <article className="timeline-card">
              <div className="timeline-date">{item.period}</div>
              <div>
                <p className="item-label">Professional experience</p>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <p className="item-summary">{item.summary}</p>
                <ul className="detail-list">
                  {item.bullets.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function EducationSection() {
  return (
    <Section id="education" number="02" label="Education" title="Engineering foundations shaped by applied work.">
      <div className="education-list">
        {education.map((item) => (
          <Reveal key={item.school}>
            <article className="education-row">
              <span className="education-period">{item.period}</span>
              <div>
                <p className="item-label">State engineering programme</p>
                <h3>{item.degree}</h3>
                <p className="company">{item.school}</p>
                <p className="item-summary">{item.details}</p>
              </div>
              <span className="education-index" aria-hidden="true">EDU / 01</span>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" number="03" label="Projects" title="Selected systems, built from problem to product.">
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.05}>
            <article className="project-card">
              <div className="project-cover">
                <img src={project.cover} alt="" width="640" height="360" />
                <span>{String(index + 1).padStart(2, "0")} / {project.year}</span>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul className="project-tech" aria-label={`${project.title} technologies`}>
                  {project.tech.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {project.github ? (
                  <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">View repository ↗</a>
                ) : (
                  <span className="project-status">{project.repositoryStatus}</span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function StackSection() {
  return (
    <Section id="stack" number="04" label="Core technologies" title="A focused stack for dependable delivery.">
      <p className="section-intro">Names stay more legible than mixed brand logos and better fit the editorial system. Each technology gets one consistent pixel marker.</p>
      <div className="stack-grid">
        {skills.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.04}>
            <article className="stack-card">
              <p className="stack-number">0{index + 1}</p>
              <h3>{group.label}</h3>
              <ul className="technology-list">
                {group.items.map((item) => <li key={item}><span aria-hidden="true" />{item}</li>)}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function CertificationsSection() {
  return (
    <Section id="certifications" number="05" label="Certifications" title="Structured learning, applied in practice.">
      <div className="cert-list">
        {certifications.map((cert, index) => (
          <Reveal key={cert.title} delay={index * 0.035}>
            <article className="cert-row">
              <span className="cert-index">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
              </div>
              <span className="cert-year">{cert.year}</span>
              <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">Verify ↗</a>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function AboutSection() {
  return (
    <Section id="about" number="06" label="About" title={about.heading}>
      <div className="about-layout">
        <div className="about-copy">
          {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="about-links">
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>
        <dl className="fact-list">
          {about.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <Section id="testimonials" number="07" label="Testimonials" title="Good work is built on trust.">
      {hasTestimonials ? (
        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <figure className="testimonial-card" key={`${item.name}-${index}`}>
              <blockquote>“{item.quote}”</blockquote>
              <figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="testimonial-empty">
          <span className="quote-mark">“</span>
          <div>
            <h3>References are being verified.</h3>
            <p>I only publish approved, attributable feedback—never placeholder endorsements.</p>
          </div>
          <span className="status-chip">Verification in progress</span>
        </div>
      )}
    </Section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section section-shell" id="contact" aria-labelledby="contact-heading">
      <p className="eyebrow eyebrow-light"><span /> 08 / Contact</p>
      <div className="contact-grid">
        <div>
          <h2 id="contact-heading">Have a problem worth solving?</h2>
          <p>Let’s turn it into something clear, reliable, and useful.</p>
        </div>
        <div className="contact-actions">
          <a className="button button-light" href={`mailto:${site.email}`}>Start a conversation</a>
          <a href={`mailto:${site.email}`} className="email-link">{site.email}</a>
        </div>
      </div>
    </section>
  );
}

function Section({ id, number, label, title, children }) {
  return (
    <section className="content-section section-shell" id={id} aria-labelledby={`${id}-heading`}>
      <Reveal>
        <header className="section-heading">
          <p className="eyebrow"><span /> {number} / {label}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
        </header>
      </Reveal>
      {children}
    </section>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const reducedMotion = useContext(MotionPreferenceContext);
  const [visible, setVisible] = useState(reducedMotion);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return <div ref={ref} className={`reveal${visible ? " is-visible" : ""}`} style={{ "--delay": `${delay}s` }}>{children}</div>;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default App;
