export const site = {
  name: "Brahim Chahba",
  role: "AI and Backend Engineering Student",
  email: "brahimchahba9@gmail.com",
  phone: "+212 6 59 52 29 99",
  location: "Agadir, Morocco",
  github: "https://github.com/brahim-chahba",
  linkedin: "https://www.linkedin.com/in/brahimchahba/",
  resume: "/Brahim_Chahba_CV.pdf",
  intro:
    "I build practical AI, backend, and cloud products with clean architecture and production-ready execution.",
};

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Certs", href: "#certifications" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "Fourth-year engineering student focused on practical AI and backend systems.",
  paragraphs: [
    "At ENSAH, I build software that combines AI features, backend services, and cloud delivery under real project constraints.",
    "I am currently open to internship and freelance collaborations where I can contribute architecture, implementation, and delivery end-to-end.",
  ],
  facts: [
    { label: "Base", value: "Agadir, Morocco" },
    { label: "Education", value: "ENSAH, fourth year (2022-2027)" },
    { label: "Focus", value: "AI features, backend architecture, cloud deployment" },
    { label: "Availability", value: "Internships and freelance projects" },
  ],
};

export const capabilities = [
  {
    title: "AI feature delivery",
    body: "From model experimentation to production inference APIs with measurable evaluation.",
    chips: ["NLP", "Transformers", "PyTorch", "Azure ML"],
    deliverables: ["Fine-tuned models", "Managed endpoints", "Evaluation pipelines"],
  },
  {
    title: "Backend and API systems",
    body: "Structured backend services with role boundaries, authentication, and maintainable API architecture.",
    chips: ["Spring Boot", "Spring MVC", "Laravel", "MySQL"],
    deliverables: ["API design", "Auth and RBAC", "Database normalization"],
  },
  {
    title: "Cloud and data pipelines",
    body: "Reproducible data and training workflows translated into deployable cloud artifacts.",
    chips: ["Azure ML", "Docker", "Python", "MLflow"],
    deliverables: ["Orchestrated pipelines", "Containerized workflows", "Deployment automation"],
  },
];

export const education = [
  {
    period: "2022 - 2027",
    school: "Ecole Nationale des Sciences Appliquees d'Al Hoceima (ENSAH)",
    degree: "State engineering degree in digital transformation and AI",
    details: "Specialization in software engineering, machine learning, and cloud delivery.",
  },
];

export const experience = [
  {
    period: "Jul 2025 - Aug 2025",
    role: "Full-stack developer intern",
    company: "CQPM Boujdour",
    summary:
      "Built an academic administration platform for trainee records, attendance, modules, and grading.",
    bullets: [
      "Delivered end-to-end workflows for trainee records, modules, attendance, and grading.",
      "Implemented Excel import-export and PDF document generation for administrative reporting.",
      "Handled backend architecture, database design, and user-facing UI under real delivery constraints.",
    ],
  },
];

export const projects = [
  {
    title: "Fake news detection with Azure ML",
    year: "2025 - 2026",
    tags: ["NLP", "Azure ML", "React"],
    summary:
      "Built an end-to-end NLP system that fine-tunes a transformer model and serves real-time predictions through an Azure-hosted inference workflow.",
    tech: [
      "Python",
      "PyTorch",
      "Transformers",
      "Azure ML",
      "MLflow",
      "React",
      "Vite",
      "Tailwind",
    ],
    accent: "blue",
    cover: "/covers/fake-news-azure.svg",
    github: "https://github.com/brahim-chahba/Fake-news-detection-azure",
    repositoryStatus: "Public repository",
  },
  {
    title: "Medical consultation platform",
    year: "2024 - 2025",
    tags: ["Laravel", "Full-stack", "Healthcare"],
    summary:
      "Delivered a secure clinic platform for appointments, patient records, and role-based workflows with operational reporting features.",
    tech: ["Laravel", "MySQL", "JavaScript", "Bootstrap", "DomPDF"],
    accent: "green",
    cover: "/covers/medical-consultation.svg",
    github: null,
    repositoryStatus: "Repository available on request",
  },
  {
    title: "PFE matcher",
    year: "2025",
    tags: ["Spring MVC", "Java", "Backend"],
    summary:
      "Implemented a constraint-aware matching engine that assigns final-year students to projects using preference and capacity rules.",
    tech: ["Spring MVC", "Java", "MySQL", "Hibernate", "Maven"],
    accent: "amber",
    cover: "/covers/pfe-matcher.svg",
    github: null,
    repositoryStatus: "Repository available on request",
  },
];

// Add only approved, attributable quotes here. The UI intentionally renders a
// verification state while this list is empty so no endorsement is fabricated.
export const testimonials = [];

export const skills = [
  {
    label: "Backend and software engineering",
    items: ["Java", "Spring Boot", "Spring MVC", "Laravel", "REST APIs", "Hibernate", "Maven"],
  },
  {
    label: "Frontend",
    items: ["React", "JavaScript", "HTML/CSS", "Vite", "Tailwind CSS", "Bootstrap"],
  },
  {
    label: "AI and data",
    items: ["Python", "PyTorch", "Transformers", "TensorFlow", "Scikit-learn", "pandas", "NLP"],
  },
  {
    label: "Cloud and DevOps",
    items: ["Azure ML", "AWS", "Docker", "Git/GitHub", "MLflow", "CI/CD", "Model deployment"],
  },
];

export const certifications = [
  {
    title: "Advanced learning algorithms",
    issuer: "DeepLearning.AI / Coursera",
    year: "2025",
    credentialUrl: "https://www.linkedin.com/in/brahimchahba/",
  },
  {
    title: "Supervised machine learning: regression and classification",
    issuer: "Stanford Online / Coursera",
    year: "2025",
    credentialUrl: "https://www.linkedin.com/in/brahimchahba/",
  },
  {
    title: "Fraud detection on financial transactions with ML",
    issuer: "Google Cloud",
    year: "2025",
    credentialUrl: "https://www.linkedin.com/in/brahimchahba/",
  },
  {
    title: "Develop clustering models with Azure ML Designer",
    issuer: "Microsoft Azure",
    year: "2025",
    credentialUrl: "https://www.linkedin.com/in/brahimchahba/",
  },
];
