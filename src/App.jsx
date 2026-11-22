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
          <p className="eyebrow"><span /> AI × NLP × LLMs × MLOps</p>
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
            <span className="availability"><i /> Looking for a PFE internship</span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="hero-portrait" aria-label={`Fourier builder visualization for ${site.name}`}>
          <div className="mosaic mosaic-a" aria-hidden="true" />
          <div className="mosaic mosaic-b" aria-hidden="true" />
          <div className="portrait-card portrait-card-fourier">
            <p>FIG. 01 / FOURIER BUILDER</p>
            <FourierBuilder />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FourierBuilder() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useContext(MotionPreferenceContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    const point = (x, y) => ({ x, y });
    const directions = [
      point(-1, 0), point(-1, -1), point(0, -1), point(1, -1),
      point(1, 0), point(1, 1), point(0, 1), point(-1, 1),
    ];
    let samples = [];
    let harmonics = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let visible = true;
    let disposed = false;
    let cycleStartedAt = null;
    let previousCycle = -1;
    let trace = [];

    const makePortraitPath = (image) => {
      const resolution = 180;
      const source = document.createElement("canvas");
      source.width = resolution;
      source.height = resolution;
      const sourceContext = source.getContext("2d", { willReadFrequently: true });
      sourceContext.drawImage(image, 0, 0, resolution, resolution);
      const pixels = sourceContext.getImageData(0, 0, resolution, resolution).data;
      const mask = new Uint8Array(resolution * resolution);
      for (let index = 0; index < mask.length; index += 1) {
        mask[index] = pixels[index * 4 + 3] > 36 ? 1 : 0;
      }

      const seen = new Uint8Array(mask.length);
      let largestComponent = [];
      for (let index = 0; index < mask.length; index += 1) {
        if (!mask[index] || seen[index]) continue;
        const component = [];
        const queue = [index];
        seen[index] = 1;
        for (let cursor = 0; cursor < queue.length; cursor += 1) {
          const current = queue[cursor];
          component.push(current);
          const x = current % resolution;
          const y = Math.floor(current / resolution);
          directions.forEach(({ x: offsetX, y: offsetY }) => {
            const nextX = x + offsetX;
            const nextY = y + offsetY;
            if (nextX < 0 || nextY < 0 || nextX >= resolution || nextY >= resolution) return;
            const next = nextY * resolution + nextX;
            if (mask[next] && !seen[next]) {
              seen[next] = 1;
              queue.push(next);
            }
          });
        }
        if (component.length > largestComponent.length) largestComponent = component;
      }

      const componentMask = new Uint8Array(mask.length);
      largestComponent.forEach((index) => { componentMask[index] = 1; });
      const isFilled = (x, y) => (
        x >= 0 && y >= 0 && x < resolution && y < resolution
        && componentMask[y * resolution + x]
      );
      const startIndex = largestComponent
        .filter((index) => {
          const x = index % resolution;
          const y = Math.floor(index / resolution);
          return directions.some(({ x: dx, y: dy }) => !isFilled(x + dx, y + dy));
        })
        .sort((a, b) => a - b)[0];
      if (startIndex === undefined) return [];

      const start = point(startIndex % resolution, Math.floor(startIndex / resolution));
      const outline = [start];
      let current = start;
      let backtrack = point(start.x - 1, start.y);
      const startBacktrack = backtrack;
      const maxSteps = resolution * resolution * 2;

      for (let step = 0; step < maxSteps; step += 1) {
        const relativeX = backtrack.x - current.x;
        const relativeY = backtrack.y - current.y;
        let directionIndex = directions.findIndex(({ x, y }) => x === relativeX && y === relativeY);
        if (directionIndex < 0) directionIndex = 0;
        let next = null;
        let nextBacktrack = null;
        for (let offset = 1; offset <= directions.length; offset += 1) {
          const candidateIndex = (directionIndex + offset) % directions.length;
          const candidateDirection = directions[candidateIndex];
          const candidate = point(current.x + candidateDirection.x, current.y + candidateDirection.y);
          if (isFilled(candidate.x, candidate.y)) {
            const precedingDirection = directions[(candidateIndex + directions.length - 1) % directions.length];
            next = candidate;
            nextBacktrack = point(current.x + precedingDirection.x, current.y + precedingDirection.y);
            break;
          }
        }
        if (!next) break;
        current = next;
        backtrack = nextBacktrack;
        if (
          current.x === start.x && current.y === start.y
          && backtrack.x === startBacktrack.x && backtrack.y === startBacktrack.y
        ) break;
        outline.push(current);
      }

      if (outline.length < 32) return [];
      const lengths = [0];
      for (let index = 1; index <= outline.length; index += 1) {
        const previous = outline[index - 1];
        const currentPoint = outline[index % outline.length];
        lengths.push(lengths[index - 1] + Math.hypot(currentPoint.x - previous.x, currentPoint.y - previous.y));
      }
      const totalLength = lengths[lengths.length - 1];
      const sampleCount = 721;
      const resampled = [];
      let segment = 1;
      for (let index = 0; index < sampleCount; index += 1) {
        const target = (index / sampleCount) * totalLength;
        while (segment < lengths.length - 1 && lengths[segment] < target) segment += 1;
        const previous = outline[(segment - 1) % outline.length];
        const currentPoint = outline[segment % outline.length];
        const segmentLength = lengths[segment] - lengths[segment - 1] || 1;
        const amount = (target - lengths[segment - 1]) / segmentLength;
        resampled.push(point(
          previous.x + (currentPoint.x - previous.x) * amount,
          previous.y + (currentPoint.y - previous.y) * amount,
        ));
      }

      const minX = Math.min(...resampled.map(({ x }) => x));
      const maxX = Math.max(...resampled.map(({ x }) => x));
      const minY = Math.min(...resampled.map(({ y }) => y));
      const maxY = Math.max(...resampled.map(({ y }) => y));
      const centerX = (minX + maxX) / 2;
      const centerY = (minY + maxY) / 2;
      const normalizer = Math.max(maxX - minX, maxY - minY) / 2;
      return resampled.map(({ x, y }) => point((x - centerX) / normalizer, (y - centerY) / normalizer));
    };

    const makeHarmonics = (path, targetAccuracy = 0.955, recordMetrics = false) => {
      const maximumFrequency = Math.floor(path.length / 2);
      const coefficients = [];
      for (let frequency = -maximumFrequency; frequency <= maximumFrequency; frequency += 1) {
        let real = 0;
        let imaginary = 0;
        path.forEach((sample, sampleIndex) => {
          const angle = (-2 * Math.PI * frequency * sampleIndex) / path.length;
          real += sample.x * Math.cos(angle) - sample.y * Math.sin(angle);
          imaginary += sample.x * Math.sin(angle) + sample.y * Math.cos(angle);
        });
        real /= path.length;
        imaginary /= path.length;
        coefficients.push({
          frequency,
          amplitude: Math.hypot(real, imaginary),
          phase: Math.atan2(imaginary, real),
        });
      }

      const totalEnergy = coefficients.reduce((sum, coefficient) => (
        sum + coefficient.amplitude ** 2
      ), 0);
      let frequencyLimit = maximumFrequency;
      let accuracy = 1;
      for (let limit = 1; limit <= maximumFrequency; limit += 1) {
        const retainedEnergy = coefficients.reduce((sum, coefficient) => (
          Math.abs(coefficient.frequency) <= limit
            ? sum + coefficient.amplitude ** 2
            : sum
        ), 0);
        accuracy = 1 - Math.sqrt(Math.max(0, totalEnergy - retainedEnergy) / totalEnergy);
        if (accuracy >= targetAccuracy) {
          frequencyLimit = limit;
          break;
        }
      }
      const retained = coefficients
        .filter(({ frequency }) => Math.abs(frequency) <= frequencyLimit)
        .sort((a, b) => b.amplitude - a.amplitude);
      const squaredSignal = path.reduce((sum, sample) => (
        sum + sample.x ** 2 + sample.y ** 2
      ), 0);
      const squaredError = path.reduce((sum, sample, sampleIndex) => {
        const phase = (sampleIndex / path.length) * Math.PI * 2;
        const reconstruction = retained.reduce((position, coefficient) => {
          const angle = coefficient.frequency * phase + coefficient.phase;
          return point(
            position.x + coefficient.amplitude * Math.cos(angle),
            position.y + coefficient.amplitude * Math.sin(angle),
          );
        }, point(0, 0));
        return sum + (sample.x - reconstruction.x) ** 2 + (sample.y - reconstruction.y) ** 2;
      }, 0);
      accuracy = 1 - Math.sqrt(squaredError / squaredSignal);
      if (recordMetrics) {
        canvas.dataset.fourierAccuracy = accuracy.toFixed(4);
        canvas.dataset.fourierSamples = String(path.length);
        canvas.dataset.fourierTerms = String(retained.length);
      }
      return retained;
    };

    const reconstructSeriesAt = (series, phase) => series.reduce((position, coefficient) => {
      const angle = coefficient.frequency * phase + coefficient.phase;
      return point(
        position.x + coefficient.amplitude * Math.cos(angle),
        position.y + coefficient.amplitude * Math.sin(angle),
      );
    }, point(0, 0));
    const reconstructAt = (phase) => reconstructSeriesAt(harmonics, phase);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      trace = [];
    };

    const drawGrid = () => {
      context.fillStyle = "#050609";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(255,255,255,.055)";
      context.lineWidth = 1;
      for (let x = 0; x < width; x += 16) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }
      for (let y = 0; y < height; y += 16) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    const draw = (time) => {
      drawGrid();
      if (!samples.length || !harmonics.length) {
        if (!prefersReducedMotion && visible) animationFrame = requestAnimationFrame(draw);
        return;
      }

      const duration = 16000;
      if (cycleStartedAt === null) cycleStartedAt = time;
      const elapsed = Math.max(0, time - cycleStartedAt);
      const cycle = prefersReducedMotion ? 0 : Math.floor(elapsed / duration);
      const cycleProgress = prefersReducedMotion ? 1 : (elapsed % duration) / duration;
      const portraitProgress = cycleProgress;
      const phase = portraitProgress * Math.PI * 2;
      if (cycle !== previousCycle) {
        trace = [];
        previousCycle = cycle;
      }

      const scale = Math.min(width, height) * 0.43;
      const originX = width * 0.5;
      const originY = height * 0.48;

      let x = originX;
      let y = originY;
      harmonics.forEach((coefficient) => {
        const previousX = x;
        const previousY = y;
        const angle = coefficient.frequency * phase + coefficient.phase;
        const radius = coefficient.amplitude * scale;
        x += radius * Math.cos(angle);
        y += radius * Math.sin(angle);

        if (radius > 1.25) {
          context.beginPath();
          context.arc(previousX, previousY, radius, 0, Math.PI * 2);
          context.strokeStyle = "rgba(245,241,232,.18)";
          context.lineWidth = 1;
          context.stroke();
        }
        context.beginPath();
        context.moveTo(previousX, previousY);
        context.lineTo(x, y);
        context.strokeStyle = "rgba(245,241,232,.86)";
        context.lineWidth = 1.2;
        context.stroke();
      });

      const visiblePortraitSamples = Math.max(1, Math.ceil(samples.length * portraitProgress));
      trace = samples.slice(0, visiblePortraitSamples).map((_, sampleIndex) => {
        const reconstruction = reconstructAt((sampleIndex / samples.length) * Math.PI * 2);
        return {
          x: originX + reconstruction.x * scale,
          y: originY + reconstruction.y * scale,
        };
      });

      if (trace.length > 1) {
        context.beginPath();
        context.moveTo(trace[0].x, trace[0].y);
        trace.slice(1).forEach((tracePoint) => context.lineTo(tracePoint.x, tracePoint.y));
        context.strokeStyle = "#4380ff";
        context.lineWidth = 2.8;
        context.shadowColor = "rgba(23,104,255,.7)";
        context.shadowBlur = 9;
        context.stroke();
        context.shadowBlur = 0;
      }

      context.beginPath();
      context.arc(x, y, 3.5, 0, Math.PI * 2);
      context.fillStyle = "#f5f1e8";
      context.fill();

      if (!prefersReducedMotion && visible) animationFrame = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) draw(0);
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(animationFrame);
      if (visible) animationFrame = requestAnimationFrame(draw);
    }, { rootMargin: "120px" });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();

    const portrait = new Image();
    portrait.onload = () => {
      if (disposed) return;
      samples = makePortraitPath(portrait);
      harmonics = makeHarmonics(samples, 0.955, true);
      trace = [];
      cycleStartedAt = null;
      previousCycle = -1;
      cancelAnimationFrame(animationFrame);
      if (prefersReducedMotion) draw(0);
      else if (visible) animationFrame = requestAnimationFrame(draw);
    };
    portrait.src = "/me-white-removebg-preview.png";
    if (prefersReducedMotion) draw(0);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fourier-builder"
      role="img"
      aria-label="Animated Fourier epicycles constructing Brahim Chahba's portrait from an empty canvas"
    />
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
                <div className="experience-stack" aria-label={`${item.company} technology stack`}>
                  <span>Stack</span>
                  <ul>
                    {item.tech.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
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
              <div className={`project-cover${project.cover ? "" : " project-cover-type"}`}>
                {project.cover ? (
                  <img src={project.cover} alt="" width="640" height="360" />
                ) : (
                  <p aria-hidden="true">{project.title}</p>
                )}
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
                <div className="project-links">
                  {project.github ? (
                    <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">View repository ↗</a>
                  ) : (
                    <span className="project-status">{project.repositoryStatus}</span>
                  )}
                  {project.liveUrl && (
                    <a className="project-link" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live project ↗</a>
                  )}
                </div>
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
              <div className="cert-actions">
                {cert.documentUrl && (
                  <a href={cert.documentUrl} target="_blank" rel="noopener noreferrer">View ↗</a>
                )}
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">Verify ↗</a>
                )}
                {!cert.documentUrl && !cert.credentialUrl && (
                  <span className="cert-status" aria-label="No public credential link">—</span>
                )}
              </div>
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
