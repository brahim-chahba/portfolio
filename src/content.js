export const site = {
  name: "Brahim Chahba",
  role: "AI / Machine Learning Engineer",
  email: "brahimchahba9@gmail.com",
  phone: "+212 6 59 52 29 99",
  location: "Sidi Ifni, Morocco",
  github: "https://github.com/brahim-chahba",
  linkedin: "https://www.linkedin.com/in/brahimchahba/",
  resume: "/Brahim_Chahba_CV.pdf",
  intro:
    "I develop and deploy machine-learning and NLP systems, from semantic recommendation engines and transformer fine-tuning to RAG applications and production APIs.",
};

export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Certs", href: "#certifications" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "Final-year engineering student building practical AI systems from model to product.",
  paragraphs: [
    "At ENSAH, I focus on AI and digital transformation while building production-oriented NLP, LLM, recommendation, and data systems.",
    "My work spans model fine-tuning, semantic search, RAG, FastAPI services, vector databases, cloud deployment, and the data pipelines that keep these products reliable.",
  ],
  facts: [
    { label: "Base", value: "Sidi Ifni, Morocco" },
    { label: "Education", value: "ENSAH, State Engineering Degree (expected 2027)" },
    { label: "Focus", value: "NLP, LLMs, RAG, recommendation systems, and MLOps" },
    { label: "Languages", value: "Arabic, English, French, and basic Spanish" },
  ],
};

export const education = [
  {
    period: "2022 — 2027 (expected)",
    school: "National School of Applied Sciences of Al Hoceima (ENSAH)",
    degree: "State Engineering Degree — Digital Transformation & Artificial Intelligence",
    details: "Al Hoceima, Morocco",
  },
];

export const experience = [
  {
    period: "Jul — Aug 2026",
    role: "AI Engineering Intern",
    company: "JobAiro",
    summary:
      "Built and integrated an NLP-powered candidate-to-job recommendation system for a SaaS platform.",
    bullets: [
      "Developed an NLP pipeline to extract and structure skills, experience, and qualifications from candidate profiles and job descriptions.",
      "Engineered a hybrid recommendation system combining Sentence Transformers, semantic embeddings, and keyword retrieval to rank candidate-job matches.",
      "Deployed the recommendation engine through FastAPI REST APIs backed by PostgreSQL and pgvector.",
    ],
    tech: ["Python", "FastAPI", "Sentence Transformers", "PostgreSQL", "pgvector", "REST APIs"],
  },
  {
    period: "Jul — Aug 2025",
    role: "Software Engineering Intern",
    company: "Ministry of Agriculture and Maritime Fisheries",
    summary:
      "Digitized administrative workflows for more than 200 trainees with a Laravel and MySQL management platform.",
    bullets: [
      "Developed attendance tracking, grade management, and data-export workflows for 200+ trainees.",
      "Reduced manual data-entry time by 80% through workflow digitization.",
      "Contributed to database design, testing, and deployment.",
    ],
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "HTML", "CSS"],
  },
];

export const projects = [
  {
    title: "AtlasLegalAI",
    year: "2026",
    tags: ["LLM fine-tuning", "RAG", "Legal AI"],
    summary:
      "A multilingual French and Arabic Moroccan legal assistant grounded in legal sources and adapted to Moroccan terminology.",
    tech: ["Python", "PyTorch", "Qwen2.5-3B", "LoRA/QLoRA", "Unsloth", "Hugging Face", "FAISS"],
    cover: "/covers/atlas-legal-ai.svg",
    github: "https://github.com/brahim-chahba/moroccan-legal-chatbot",
    liveUrl: null,
    repositoryStatus: "Public repository",
  },
  {
    title: "Fake News Detection",
    year: "2025 — 2026",
    tags: ["NLP", "Azure ML", "MLOps"],
    summary:
      "Fine-tuned DistilBERT on the LIAR dataset, reaching 63.8% validation accuracy and 0.631 weighted F1 before deployment to an Azure ML managed endpoint.",
    tech: ["Python", "PyTorch", "DistilBERT", "Hugging Face", "Azure ML", "MLflow"],
    cover: "/covers/fake-news-azure.svg",
    github: "https://github.com/brahim-chahba/Fake-news-detection-azure",
    liveUrl: "https://tbpress.vercel.app/",
    repositoryStatus: "Public repository",
  },
  {
    title: "Smart HIRE",
    year: "Hackathon",
    tags: ["Multi-agent AI", "Recruitment", "Matching"],
    summary:
      "A multi-agent recruitment system with a Matcher Agent, composite candidate-job scores, Groq-powered LLM workflows, and persistent matching results.",
    tech: ["Python", "Groq API", "PostgreSQL", "Agentic AI"],
    cover: "/covers/smart-hire.svg",
    github: null,
    liveUrl: null,
    repositoryStatus: "Hackathon project",
  },
  {
    title: "Job Intelligence Platform",
    year: "2026",
    tags: ["Data engineering", "Analytics API", "ETL"],
    summary:
      "An automated pipeline that collects, cleans, and deduplicates job listings from Morocco and France and exposes search, market, salary, and monitoring APIs.",
    tech: ["Python", "Apache Airflow", "PostgreSQL", "MinIO", "FastAPI", "Docker", "SQL"],
    cover: "/covers/job-intelligence.svg",
    github: "https://github.com/brahim-chahba/Job-recommendation-pipeline",
    liveUrl: null,
    repositoryStatus: "Public repository",
  },
  {
    title: "Azure ML Clustering",
    year: "2025",
    tags: ["Unsupervised learning", "Cloud ML", "Segmentation"],
    summary:
      "A customer-segmentation workflow built in Azure ML Designer, covering preprocessing, K-Means training, evaluation, and cloud deployment.",
    tech: ["Azure ML Designer", "K-Means", "Data preprocessing", "Model evaluation"],
    cover: "/covers/azure-clustering.svg",
    github: "https://github.com/brahim-chahba/azure-ml-clustering-model",
    liveUrl: null,
    repositoryStatus: "Public repository",
  },
  {
    title: "Backend from Scratch",
    year: "2026",
    tags: ["Systems", "Networking", "Backend"],
    summary:
      "A compact Python backend experiment that implements a TCP server directly to explore sockets, request handling, and the foundations behind web frameworks.",
    tech: ["Python", "TCP sockets", "HTTP fundamentals", "Server architecture"],
    cover: "/covers/backend-scratch.svg",
    github: "https://github.com/brahim-chahba/Backend-from-Scratch",
    liveUrl: null,
    repositoryStatus: "Public repository",
  },
  {
    title: "Spring MVC Product Manager",
    year: "2026",
    tags: ["Java", "Web application", "MVC"],
    summary:
      "A layered product-management application with Spring MVC controllers, service and DAO layers, JSP views, and database-backed CRUD workflows.",
    tech: ["Java", "Spring MVC", "JSP", "JPA/Hibernate", "Maven"],
    cover: "/covers/spring-mvc.svg",
    github: "https://github.com/brahim-chahba/TP6-Spring-MVC",
    liveUrl: null,
    repositoryStatus: "Public repository",
  },
];

// Add only approved, attributable quotes here. The UI intentionally renders a
// verification state while this list is empty so no endorsement is fabricated.
export const testimonials = [];

export const skills = [
  {
    label: "Machine learning & deep learning",
    items: ["Python", "PyTorch", "Scikit-learn", "Hugging Face", "Sentence Transformers", "LoRA/QLoRA", "Pandas", "NumPy"],
  },
  {
    label: "LLMs & NLP",
    items: ["RAG", "LangChain", "FAISS", "spaCy", "Qwen2.5", "DistilBERT", "Semantic search", "Embeddings", "Prompt engineering"],
  },
  {
    label: "MLOps & cloud",
    items: ["Azure ML", "MLflow", "AWS EC2/S3", "Docker", "CI/CD", "Git", "Linux"],
  },
  {
    label: "Backend & databases",
    items: ["FastAPI", "Flask", "PostgreSQL", "pgvector", "MySQL", "REST APIs", "Java", "JavaScript/TypeScript"],
  },
  {
    label: "Data engineering & analytics",
    items: ["Apache Airflow", "ETL pipelines", "MinIO", "SQL", "Power BI"],
  },
];

export const certifications = [
  {
    title: "Introduction à Docker",
    issuer: "Certificate of completion",
    year: "Jun 2026",
    documentUrl: "/certificates/introduction-to-docker.pdf",
    credentialUrl: null,
  },
  {
    title: "JavaScript Foundations and Essential Concepts",
    issuer: "Packt / Coursera",
    year: "Dec 2025",
    documentUrl: "/certificates/javascript-foundations.pdf",
    credentialUrl: "https://coursera.org/verify/71AYG8AHLBMU",
  },
  {
    title: "Develop Clustering Models with Azure ML Designer",
    issuer: "Microsoft / Coursera",
    year: "Nov 2025",
    documentUrl: "/certificates/azure-ml-clustering.pdf",
    credentialUrl: "https://coursera.org/verify/5E13L5P5EJ1C",
  },
  {
    title: "Fraud Detection on Financial Transactions with Machine Learning on Google Cloud",
    issuer: "Google Cloud / Coursera",
    year: "Oct 2025",
    documentUrl: "/certificates/fraud-detection-google-cloud.pdf",
    credentialUrl: "https://coursera.org/verify/XM0OUCAVMEFP",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "Stanford University / DeepLearning.AI / Coursera",
    year: "Oct 2025",
    documentUrl: "/certificates/supervised-machine-learning.pdf",
    credentialUrl: "https://coursera.org/verify/YOSSUJY7KFGW",
  },
  {
    title: "Udemy Certificate of Completion",
    issuer: "Udemy",
    year: "Apr 2025",
    documentUrl: "/certificates/udemy-certificate.pdf",
    credentialUrl: "https://www.udemy.com/certificate/UC-27a94ebc-b4f2-47bc-832e-82ceb3eb1177/",
  },
  {
    title: "Building with the Claude API",
    issuer: "Anthropic Academy",
    year: "Completed",
    documentUrl: null,
    credentialUrl: null,
  },
  {
    title: "Build High-Performance Multi-Agent Systems",
    issuer: "Google Skills",
    year: "In progress",
    documentUrl: null,
    credentialUrl: null,
  },
];
