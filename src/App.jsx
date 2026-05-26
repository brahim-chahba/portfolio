import React, { useEffect, useRef, useState } from "react";
import {
  about,
  certifications,
  education,
  experience,
  heroRotatingPhrases,
  navItems,
  projects,
  site,
  skills,
} from "./content";

function App() {
  return (
    <div className="page-shell">
      <AmbientBackdrop />
      <SiteNav />
      <main className="site-main">
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <p>(c) {new Date().getFullYear()} {site.name}</p>
      </footer>
    </div>
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">{site.initials || "BC"}</span>
          <span className="brand-copy">
            <strong>{site.name}</strong>
            <span>{site.role}</span>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setPhraseIndex((current) => (current + 1) % heroRotatingPhrases.length);
        setIsTransitioning(false);
      }, 150);
    }, 2600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero section" id="top">
      <div className="hero-content">
        <Reveal>
          <p className="hero-eyebrow">ENSAH | Digital Transformation and AI Track</p>
        </Reveal>

        <Reveal delay={0.04}>
          <h1 className="hero-title">
            Building reliable{" "}
            <span
              className="accent-phrase"
              style={{
                opacity: isTransitioning ? 0 : 1,
                filter: isTransitioning ? "blur(4px)" : "blur(0px)",
                transition:
                  "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1), filter 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              {heroRotatingPhrases[phraseIndex]}
            </span>{" "}
            for real teams.
          </h1>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="hero-body">{site.intro}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              View projects
            </a>
            <a className="button button-secondary" href="#contact">
              Contact me
            </a>
            <a
              className="button button-ghost"
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="hero-socials">
            <SocialLink href={site.github} label="GitHub" type="github" />
            <SocialLink href={site.linkedin} label="LinkedIn" type="linkedin" />
            <SocialLink href={`mailto:${site.email}`} label="Email" type="email" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="hero-visual">
          <img
            src="/me-white-removebg-preview.png"
            alt={`Portrait illustration of ${site.name}`}
            width="460"
            height="460"
            loading="eager"
          />
        </div>
      </Reveal>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section" id="about">
      <Reveal>
        <SectionHeading
          kicker="About"
          title="A practical builder focused on impact and technical quality."
        />
      </Reveal>
      <div className="about-content">
        {about.paragraphs.map((paragraph, index) => (
          <Reveal key={paragraph} delay={index * 0.06}>
            <p className="about-paragraph">{paragraph}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className="section section-projects" id="projects">
      <Reveal>
        <SectionHeading
          kicker="Projects"
          title="Selected work spanning AI engineering and full-stack delivery."
        />
      </Reveal>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <Reveal key={project.title} delay={index * 0.06}>
            <article className={`project-card paper-card accent-${project.accent}`}>
              <div className="project-placeholder">
                <small>Case study</small>
                <span>{project.year}</span>
              </div>
              <div className="project-copy">
                <div className="project-meta">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <Reveal>
        <SectionHeading
          kicker="Experience"
          title="Hands-on internship and project experience from my CV."
        />
      </Reveal>

      <div className="list-stack">
        {experience.map((item, index) => (
          <Reveal key={`${item.company}-${item.role}`} delay={index * 0.06}>
            <article className="experience-card">
              <div className="experience-period">{item.period}</div>
              <div className="experience-copy">
                <h3>
                  {item.role} <span>@ {item.company}</span>
                </h3>
                <p>{item.summary}</p>
                <ul className="experience-list">
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="experience-tech">
                  {item.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section className="section" id="education">
      <Reveal>
        <SectionHeading
          kicker="Education"
          title="Current engineering path in digital transformation and AI."
        />
      </Reveal>

      <div className="education-grid">
        {education.map((item, index) => (
          <Reveal key={item.school} delay={index * 0.06}>
            <article className="paper-card education-card">
              <p className="education-period">{item.period}</p>
              <h3>{item.degree}</h3>
              <p className="education-school">{item.school}</p>
              <p className="education-details">{item.details}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section className="section section-skills" id="skills">
      <Reveal>
        <SectionHeading
          kicker="Skills"
          title="Every skill now includes a visual icon for faster scanning."
        />
      </Reveal>

      <div className="skills-grid">
        {skills.map((group, index) => (
          <Reveal key={group.label} delay={index * 0.05}>
            <article className="skill-card paper-card">
              <p className="skill-label">{group.label}</p>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <div className="skill-pill" key={`${group.label}-${item.name}`}>
                    <LogoImage src={item.icon} label={item.name} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CertificationsSection() {
  return (
    <section className="section section-certs" id="certifications">
      <Reveal>
        <SectionHeading
          kicker="Certifications"
          title="Credential cards with image, issuer, and LinkedIn reference."
        />
      </Reveal>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <Reveal key={cert.title} delay={index * 0.04}>
            <article className="cert-card paper-card">
              <div className="cert-logo">
                <LogoImage src={cert.image} label={cert.issuer} />
              </div>
              <div className="cert-card-text">
                <p className="cert-year">{cert.year}</p>
                <h3>{cert.title}</h3>
                <p>{cert.issuer}</p>
                <p className="cert-id">{cert.credentialId}</p>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify"
                >
                  Verify on LinkedIn
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <Reveal>
        <div className="contact-card paper-card">
          <p className="kicker">Contact</p>
          <h2>Open to internship and freelance opportunities.</h2>
          <p>
            If your team is building in AI, full-stack systems, or cloud platforms, I would
            love to connect.
          </p>
          <ul className="contact-list">
            <li>{site.email}</li>
            <li>{site.phone}</li>
            <li>{site.location}</li>
          </ul>
          <div className="contact-actions">
            <a className="button button-primary" href={`mailto:${site.email}`}>
              Email me
            </a>
            <a
              className="button button-secondary"
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="button button-ghost"
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SocialLink({ href, label, type }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="social-link"
      aria-label={label}
    >
      {type === "github" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.24c-3.34.73-4.04-1.42-4.04-1.42a3.18 3.18 0 0 0-1.33-1.76c-1.1-.74.08-.73.08-.73a2.53 2.53 0 0 1 1.85 1.24 2.6 2.6 0 0 0 3.55 1 2.6 2.6 0 0 1 .78-1.63c-2.67-.3-5.47-1.34-5.47-5.96a4.67 4.67 0 0 1 1.24-3.25 4.33 4.33 0 0 1 .12-3.2s1-.32 3.3 1.24a11.36 11.36 0 0 1 6 0c2.28-1.56 3.3-1.24 3.3-1.24a4.33 4.33 0 0 1 .12 3.2 4.67 4.67 0 0 1 1.24 3.25c0 4.63-2.81 5.66-5.49 5.95a2.9 2.9 0 0 1 .82 2.24v3.32c0 .32.22.7.83.58A12 12 0 0 0 12 0Z" />
        </svg>
      )}
      {type === "linkedin" && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46A1.77 1.77 0 0 0 24 22.23V1.77A1.77 1.77 0 0 0 22.23 0ZM7.12 20.45H3.56V9h3.56Zm-1.78-13a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46Z" />
        </svg>
      )}
      {type === "email" && (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 7L2 7" />
        </svg>
      )}
      <span>{label}</span>
    </a>
  );
}

function LogoImage({ src, label }) {
  const [failed, setFailed] = useState(false);
  const initials = label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (!src || failed) {
    return <span className="logo-fallback">{initials}</span>;
  }

  return (
    <img
      src={src}
      alt={`${label} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="logo-image"
    />
  );
}

function SectionHeading({ kicker, title }) {
  return (
    <div className="section-heading">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
    </div>
  );
}

function AmbientBackdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-orb backdrop-orb-one" />
      <div className="backdrop-orb backdrop-orb-two" />
      <div className="backdrop-scribble backdrop-scribble-one" />
      <div className="backdrop-scribble backdrop-scribble-two" />
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "-24px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default App;
