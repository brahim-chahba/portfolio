# Design System: Brahim Chahba Engineering Portfolio

## 0. Brand positioning

**Role:** Engineering student specialized in software engineering, AI/data, and cloud-based intelligent systems.

**Headline:** Engineering Student | AI & Full-Stack Developer | Building intelligent web, data, and cloud solutions

**Value proposition:** I build practical AI, data, and full-stack solutions — from intelligent chatbots and ML pipelines to Java web applications and cloud-deployed systems.

**Target audience:** Recruiters, hiring managers for internships/junior roles, freelance clients, tech leads evaluating contractor availability.

**Tone:** Confident but realistic. Credible engineer who has shipped real projects, not an overclaimed generalist. Clear about learning capacity and hands-on delivery.

---

## 1. Visual theme and atmosphere
A restrained editorial engineering interface with warm-neutral surfaces, strict structural lines, and subtle kinetic depth.

- Density: 4 (airy but informative)
- Variance: 8 (asymmetric section composition with strict mobile collapse)
- Motion: 6 (fluid and calm, never noisy)

The site should feel technical, credible, and intentional rather than decorative.

## 2. Color palette and roles
- Canvas (`#FAFAF7`): global page background
- Canvas Soft (`#F4F4EF`): low-emphasis surface support
- Surface (`#FFFFFF`): primary cards and containers
- Ink (`#1F252C`): primary text
- Ink Soft (`#3D4852`): body text and secondary copy
- Ink Muted (`#69727A`): metadata, labels, tertiary text
- Border (`#E3E6E4`): standard 1px structural line
- Border Strong (`#C7CECC`): stronger separators
- Accent (`#3F6874`): only accent color for focus and interaction
- Accent Soft (`#E8F0F2`): low-contrast accent backing

Project tint system:
- Project A (`#DEE9ED`)
- Project B (`#E8EDE2`)
- Project C (`#EBE8DE`)

## 3. Typography rules
- Display: `Instrument Serif` for hero and section headings
- Body/UI: `Plus Jakarta Sans`
- Mono/Metadata: `JetBrains Mono`

Rules:
- Headings use tight tracking and short line-height
- Paragraphs remain readable at 55ch-65ch
- Metadata and small labels use mono + uppercase tracking
- Never use Inter, Roboto, Open Sans, Arial, or pure system-default styling

## 4. Component styling
Buttons:
- Primary: ink fill with white text
- Secondary: accent-soft with accent border
- Ghost: neutral outline
- Press feedback: `scale(0.97)`

Cards and panels:
- 1px border
- crisp rounded corners (6px-12px)
- ultra-diffuse shadow only
- hover lift no more than 2px

Tags and chips:
- rounded chip form
- subdued neutral backgrounds
- mono micro-label rhythm

Navigation:
- sticky floating bar
- subtle blur on scroll
- active route with restrained underline accent

## 5. Layout principles
- Max layout width: `1200px`
- Section rhythm: `clamp(5rem, 10vw, 9rem)`
- Hero: asymmetric split (content + portrait)
- Capabilities: asymmetrical 12-column composition (5/3/4)
- Projects: asymmetrical 12-column composition (7/5/6 patterns)
- Engineering: asymmetrical 7/5 split

Mobile rules:
- all multi-column structures collapse to single column below `1140px`
- no horizontal overflow
- touch targets remain >= 44px

## 6. Motion and interaction
Default motion:
- Reveal from `opacity: 0`, `translateY(12px)`
- Duration ~560ms
- Easing: `cubic-bezier(0.23, 1, 0.32, 1)`

Interaction motion:
- Hover translation <= 2px
- Press feedback on all pressable controls
- Animated details are transform/opacity only

Ambient motion:
- fixed background grid + drifting blurred orbs
- one marquee strip for capability chips
- reduced-motion mode disables non-essential loops

## 7. Content and credibility rules

### Hero section rules
- Lead with strongest value prop: practical delivery, real projects, technical credibility
- Include short headline (≤12 words)
- Include role clarity (what I do, not generic titles)
- Include value statement (what problems I solve, not ego)
- CTA buttons: View Projects, Contact Me, Download CV
- Optional: abstract visual (code snippet, grid, or project teaser—not portrait photo unless exceptional)
- Communicate immediately: "This student ships real code, not theory."

### About section rules
- State: 4th-year engineering student at ENSAH
- Explain: Work across software engineering, AI/data, cloud, and cybersecurity
- Clarify: Currently open to internship and freelance opportunities
- weak project descriptions
- overclaimed skill levels
- generic "I'm passionate about tech" copy
- resume-dump format (just list, no storytelling)

## 9. Ongoing quality checklist

**First impression (0-2 seconds):**
- Is the headline instantly clear? (Role + value, not ego)
- Is there a strong CTA visible?
- Does the visual feel professional and intentional, not generic?

**Navigation and flow (2-10 seconds):**
- Can I find projects easily?
- Is the navigation clear and sticky?
- Does each section have a clear purpose?
- Is there no cognitive load (not too much text at once)?

**Project credibility (10-30 seconds reading):**
- Does each project explain what problem it solves?
- Can I see real GitHub links or demo links?
- Do the technologies sound realistic for an engineering student?
- Does it feel like the student actually shipped these, not just studied them?

**Technical depth (30-60 seconds deeper reading):**
- Are the skills organized logically?
- Do the technologies match the projects (no random skills)?
- Are certifications relevant and credible?
- Do I understand what the student is strongest at?

**Recruiter confidence (full visit):**
- Would I consider this student for an internship? (Honest yes/no)
- Could I estimate their learning capacity?
- Are they open to the right opportunities?
- Is there a clear way to contact them?
- Does the code/layout suggest attention to detail?

**Technical hiring confidence:**
- Are the projects real, or do they sound made up?
- Is the positioning realistic (not overclaimed)?
- Would I trust them to own a feature?
- Do I see evidence of learning, not just completionaddress?
**Solution (Implementation):** What specifically did you build? What's the user-facing result?
**Tech (Architecture):** What technologies, libraries, patterns, and delivery mechanisms?
**Impact (Credibility):** What does this demonstrate about your skill level and work ethic?

**Example format:**
> Built an end-to-end fake news detection system using transformer-based NLP, fine-tuned on news datasets, deployed via Azure ML managed endpoints, and exposed through a React interface for real-time article scoring.

For each project, include:
- Clear title (not generic)
- Year or timeline
- Technology tags (backend, frontend, data, DevOps)
- 1-2 sentence summary
- Problem/context
- Outcome/delivery proof
- Technology stack
- GitHub/demo link
- Repository status (public, on request, etc.)

### Skills section rules
- Organize by technical domain, not random list
- Categories: Backend & Software Engineering, Frontend, AI/Data, Cloud/DevOps, Databases, Cybersecurity
- Be honest about skill level (do not present all as advanced if you're still learning)
- Prefer concrete tech names over vague keywords
- No "soft skills" padding (communication, teamwork assumed)
- No emoji, no redundant tags

### Capabilities/Services section rules
Position "what I can help with" as:
1. AI feature delivery (model to inference to product)
2. Backend and API systems (architecture, role boundaries, maintainability)
3. Cloud and data pipelines (orchestration, deployment, tracking)

Keep descriptions concrete, outcome-focused, not flowery.

### Avoid at all costs
- Senior-level overclaims ("expert", "master", "10x", "world-class")
- Generic AI-generated tone
- Fake testimonials or synthetic credibility
- Placeholder project names
- Vague mission statements
- "I'm passionate about..." filler
- Too many buzzwords
- Inconsistent technical depth (some projects sound junior, some sound senior)
- Dead links or missing GitHub repos
- Typos or grammar errors
- Excessive color or animation
- Unclear CTAs

## 8. Anti-patterns (banned)
- neon glows and loud gradient text
- mixed warm/cool gray systems in one page
- generic 3-column equal feature layouts
- typography defaults that resemble boilerplate AI output
- excessive motion or decorative effects without informational purpose
- dead CTA links
- emojis in UI copy

## 9. Ongoing quality checklist
- Is the first screen instantly clear about role and value?
- Is section spacing consistent and calm?
- Are motion timings under control and non-distracting?
- Is every card and button behavior consistent?
- Does mobile retain hierarchy and readability?
- Does the portfolio read as credible and recruiter-friendly?
