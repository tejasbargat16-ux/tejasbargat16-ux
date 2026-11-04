import NexusChat from "./nexus/NexusChat";
import { useEffect, useState, useRef, useCallback } from "react";
import profile from "./assets/tejas-profile.png";
import {
  github,
  linkedin,
  instagram,
  email,
  location,
  professionalInterests,
  socialCards,
  socialLinks,
  projects,
  skillCategories,
  skillsData,
  aboutBlocks,
  journeyPhases,
  labExperiments,
  roadmap,
  stats
} from "./data";

/* ---- Cursor Glow ---- */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return <div className="cursor-glow" ref={ref} />;
}

/* ---- Floating Particles ---- */
function Particles() {
  const particles = useRef(
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 25,
      duration: 18 + Math.random() * 30,
      size: 1 + Math.random() * 2,
      opacity: 0.08 + Math.random() * 0.2,
    }))
  ).current;

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ---- Preloader ---- */
function Preloader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("tejas-intro") === "1") {
      setShow(false);
      return;
    }
    sessionStorage.setItem("tejas-intro", "1");
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="preloader">
      <div className="preloader-name">
        TEJAS <span>2.0</span>
      </div>
      <div className="loader-line"><i /></div>
      <small>ENGINEERING THE FUTURE</small>
    </div>
  );
}

/* ---- Navigation ---- */
function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    ["ABOUT", "about"],
    ["SKILLS", "skills"],
    ["PROJECTS", "projects"],
    ["JOURNEY", "journey"],
    ["ROADMAP", "roadmap"],
    ["CONTACT", "contact"],
  ];
  return (
    <header className="nav">
      <a href="#top" className="brand">
        TB <span>/ 2.0</span>
      </a>
      <nav className={open ? "nav-links open" : "nav-links"}>
        {items.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="build-status">
        <b /> CURRENTLY BUILDING
      </div>
      <button
        className="menu"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        {open ? "✕" : "☰"}
      </button>
    </header>
  );
}

/* ---- Reveal on Scroll ---- */
function Reveal({ children, className = "", id }) {
  return (
    <section className={`reveal ${className}`} id={id}>
      {children}
    </section>
  );
}

/* ---- Animated Counter ---- */
function Counter({ end }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1400;
          const startTime = performance.now();
          function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{String(count).padStart(2, "0")}</span>;
}

/* ---- Project Card Component ---- */
function ProjectCard({ p }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) scale(1.01) perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  }, []);

  return (
    <article
      className={`project-card ${p.tone}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-visual">
        {p.image && (
          <img
            src={p.image}
            alt={`${p.title} preview`}
            className="project-visual-img"
            loading="lazy"
          />
        )}
        <div className="project-visual-overlay" />
        <div className="project-visual-header">
          <div className="project-code">{p.number}</div>
          {p.badge && <span className="project-badge">{p.badge}</span>}
        </div>
        <div className="visual-symbol" aria-hidden="true">{p.symbol}</div>
        <span className="scan" />
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{p.kicker}</span>
          <b>{p.status}</b>
        </div>
        <h3>{p.title}</h3>
        {p.subtitle && <span className="project-subtitle">{p.subtitle}</span>}
        <p>{p.description}</p>

        {p.capabilities && (
          <ul className="project-capabilities">
            {p.capabilities.map((cap) => (
              <li key={cap}>{cap}</li>
            ))}
          </ul>
        )}

        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>

        <div className="project-actions">
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-repo"
            >
              VIEW REPOSITORY ↗
            </a>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-demo"
            >
              LIVE DEMO ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---- Platform Icons ---- */
function IconGithub({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function IconLinkedin({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconInstagram({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconMail({ className = "" }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconMapPin({ className = "" }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function getPlatformIcon(platform) {
  switch (platform) {
    case "github": return <IconGithub />;
    case "linkedin": return <IconLinkedin />;
    case "instagram": return <IconInstagram />;
    case "email": return <IconMail />;
    default: return null;
  }
}

/* ---- Contact Form Component ---- */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      nextErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      nextErrors.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 8) {
      nextErrors.message = "Please include at least 8 characters";
    }
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject.trim()}`);
    const encodedBody = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
    );
    const mailtoUrl = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
      setSubmitted(true);
      setIsSubmitting(false);
    }, 450);
  };

  const handleCopy = () => {
    const text = `To: ${email}\nSubject: [Portfolio Inquiry] ${formData.subject}\nFrom: ${formData.name} <${formData.email}>\n\n${formData.message}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="contact-form-wrap">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="form-name">
            FULL NAME <span className="req">*</span>
          </label>
          <input
            id="form-name"
            name="name"
            type="text"
            placeholder="e.g. John Doe"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? "has-error" : ""}
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="form-email">
            EMAIL ADDRESS <span className="req">*</span>
          </label>
          <input
            id="form-email"
            name="email"
            type="email"
            placeholder="e.g. your.email@domain.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "has-error" : ""}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="form-subject">
            SUBJECT <span className="req">*</span>
          </label>
          <input
            id="form-subject"
            name="subject"
            type="text"
            placeholder="e.g. Project Collaboration / Embedded Systems Query"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? "has-error" : ""}
          />
          {errors.subject && <span className="form-error">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="form-message">
            MESSAGE <span className="req">*</span>
          </label>
          <textarea
            id="form-message"
            name="message"
            rows="5"
            placeholder="Write your message, project idea or question here..."
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "has-error" : ""}
          />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </div>

        <button
          type="submit"
          className={`btn primary submit-btn ${isSubmitting ? "is-submitting" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="submit-spinner" aria-hidden="true" />
              <span>PREPARING DISPATCH...</span>
            </>
          ) : (
            <span>SEND MESSAGE ↗</span>
          )}
        </button>
      </form>

      {submitted && (
        <div className="form-notice">
          <div className="form-notice-header">
            <span className="live-dot" />
            <span>DISPATCHING VIA EMAIL CLIENT...</span>
          </div>
          <p>
            Your email client was opened with your message addressed to <code>{email}</code>.
            If your browser does not have a default mail client registered, you can copy your message details below:
          </p>
          <div className="form-notice-actions">
            <button
              type="button"
              className="btn ghost btn-sm"
              onClick={handleCopy}
            >
              {copied ? "COPIED TO CLIPBOARD ✓" : "COPY MESSAGE DETAILS"}
            </button>
            <a href={`mailto:${email}`} className="btn ghost btn-sm">
              COMPOSE IN GMAIL / CLIENT ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- Main App ---- */
export default function App() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("all");

  useEffect(() => {
    /* scroll progress bar */
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty(
        "--scroll",
        `${max ? (scrollY / max) * 100 : 0}`
      );
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* intersection observer for reveals */
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            if (e.target.classList.contains("timeline")) {
              e.target.classList.add("animated");
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    document
      .querySelectorAll(
        ".reveal, .timeline-item, .roadmap-item, .timeline, .journey-phase-card"
      )
      .forEach((el) => obs.observe(el));

    return () => {
      removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const filteredSkills =
    selectedSkillCategory === "all"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedSkillCategory);

  return (
    <>
      <Preloader />
      <div className="progress-bar" />
      <Nav />

      <main id="top">
        {/* ---- Hero Section (Exact Master Reference Screenshot 1) ---- */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow">
              ECE · SOFTWARE · AI · EMBEDDED · ENTREPRENEURSHIP
            </div>
            <p className="hero-kicker">MAHARASHTRA, INDIA · 2026</p>
            <h1>
              ENGINEERING
              <br />
              THE FUTURE,
              <br />
              <em>ONE BUILD</em>
              <br />
              AT A TIME.
            </h1>
            <p className="hero-desc">
              Second-year ECE student turning curiosity into code, circuits, AI
              experiments and useful product ideas.
            </p>
            <div className="actions">
              <a className="btn primary" href="#projects">
                EXPLORE MY WORK ↓
              </a>
              <a
                className="btn ghost"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                GITHUB ↗
              </a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <img src={profile} className="hero-photo" alt="Tejas Rajesh Bargat" />
            <div className="photo-label">TEJAS / 01</div>
          </div>
        </section>

        {/* ---- About Section ---- */}
        <Reveal id="about" className="about section">
          <div className="section-no">01 / THE BUILDER</div>
          <div className="two-col">
            <h2>
              NOT JUST LEARNING TECHNOLOGY.
              <br />
              <span>BUILDING WITH IT.</span>
            </h2>
            <div>
              <p>
                I'm Tejas Rajesh Bargat, a second-year Electronics and
                Communication Engineering student interested in connecting
                hardware, software and artificial intelligence.
              </p>
              <p>
                I enjoy understanding how systems work, experimenting with new
                technologies, developing software and building practical
                engineering projects.
              </p>
              <p>
                My journey combines electronics, programming, embedded systems,
                AI, automation and entrepreneurship. I believe engineering is
                not just about understanding technology. It's about using it to
                solve meaningful problems.
              </p>
              <div className="facts">
                <span>ECE · YEAR 02 · TGPCET</span>
                <span>MAHARASHTRA, INDIA</span>
                <span>GATE 2028 ASPIRANT</span>
                <span>BUILDING IN PUBLIC</span>
              </div>
            </div>
          </div>

          {/* 4 Editorial Information Blocks */}
          <div className="about-blocks-grid">
            {aboutBlocks.map((b) => (
              <div className="about-block-card" key={b.code}>
                <span className="about-block-code">{b.code} — {b.title}</span>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---- Stats Row ---- */}
        <div className="stats-row reveal">
          {stats.map((s) => (
            <div className="stat-card" key={s.label}>
              <div className="stat-value">
                <Counter end={s.value} />
              </div>
              <span className="stat-label">{s.label}</span>
              <span className="stat-detail">{s.detail}</span>
            </div>
          ))}
        </div>

        {/* ---- Technical Skills Section ---- */}
        <Reveal id="skills" className="section">
          <div className="section-no">02 / CAPABILITY MAP</div>
          <h2>
            THE TOOLS <span>BEHIND THE BUILDS.</span>
          </h2>
          <p className="muted">
            Organized into learning areas and developing skills across the
            engineering stack—focusing on practical application, active builds,
            and honest progress.
          </p>

          {/* Category Filter Tabs */}
          <div className="skills-filter">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                className={selectedSkillCategory === cat.id ? "active" : ""}
                onClick={() => setSelectedSkillCategory(cat.id)}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Technical Skills Cards Grid */}
          <div className="skills-cards-grid">
            {filteredSkills.map((s) => (
              <div className="skill-card" key={s.name}>
                <div className="skill-card-top">
                  <h3>{s.name}</h3>
                  <span className="skill-badge">{s.status}</span>
                </div>
                <p>{s.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---- Featured Projects Section ---- */}
        <Reveal id="projects" className="section projects">
          <div className="section-no">03 / FEATURED WORK</div>
          <h2>
            IDEAS INTO <span>ENGINEERED SYSTEMS.</span>
          </h2>
          <p className="muted">
            Physical hardware prototypes, AI assistant concepts, campus
            management systems, and disciplined public code logs built to solve
            real friction.
          </p>
          <div className="project-grid">
            {projects.map((p) => (
              <ProjectCard p={p} key={p.id} />
            ))}
          </div>
        </Reveal>

        {/* ---- Build Journey Section ---- */}
        <Reveal id="journey" className="section journey">
          <div className="section-no">04 / BUILD JOURNEY</div>
          <div className="two-col">
            <div>
              <div className="eyebrow">CHRONOLOGICAL DEVELOPMENT TIMELINE</div>
              <h2>
                EVERY BUILD <span>HAS A STORY.</span>
              </h2>
              <p className="muted">
                An evolving journey from first-principles circuit theory and
                electronics to embedded firmware, terminal workflows, and
                intelligent software architectures.
              </p>
              <a
                className="text-link"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                EXPLORE ALL REPOSITORIES ON GITHUB ↗
              </a>
            </div>
            <div className="journey-phases-list">
              {journeyPhases.map((phase) => (
                <div className="journey-phase-card" key={phase.phase}>
                  <div className="journey-phase-header">
                    <strong>{phase.phase} — {phase.title}</strong>
                    <span className="journey-phase-status">{phase.status}</span>
                  </div>
                  <h3>{phase.title}</h3>
                  <span className="journey-subtitle">{phase.subtitle}</span>
                  <p>{phase.description}</p>
                  <div className="journey-phase-points">
                    {phase.points.map((pt) => (
                      <span key={pt}>{pt}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Engineering Lab Section ---- */}
        <Reveal id="lab" className="section lab">
          <div className="section-no">05 / ENGINEERING LAB</div>
          <h2>
            EXPERIMENT. TEST. <span>BUILD. REPEAT.</span>
          </h2>
          <p className="muted">
            Hardware breadboards, microcontroller tests, and computational
            experiments where logic meets physical consequence.
          </p>
          <div className="lab-grid">
            {labExperiments.map((exp) => (
              <article key={exp.code}>
                <div className="lab-card-top">
                  <small>{exp.code} · {exp.tag}</small>
                  <span
                    className={`lab-card-status ${
                      exp.status === "ACTIVE"
                        ? "lab-status-active"
                        : exp.status === "PROTOTYPED"
                        ? "lab-status-prototyped"
                        : exp.status === "IN PROGRESS"
                        ? "lab-status-in-progress"
                        : "lab-status-planned"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ---- Career Roadmap Section ---- */}
        <Reveal id="roadmap" className="section roadmap">
          <div className="section-no">06 / CAREER ROADMAP</div>
          <h2>
            2026 → <span>2028+</span>
          </h2>
          <div className="roadmap-list">
            {roadmap.map((item) => (
              <article className="roadmap-item" key={item.year}>
                <strong>{item.year}</strong>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ---- GitHub Proof of Work ---- */}
        <Reveal className="section github-panel">
          <div className="section-no">07 / PROOF OF WORK</div>
          <div className="github-box">
            <div>
              <span className="live-dot" /> GITHUB / ACTIVE LEARNING
            </div>
            <h2>
              THE WORK IS <span>IN PROGRESS.</span>
            </h2>
            <p>
              Follow the code, experiments and learning journey instead of
              taking a polished headline on faith. Every line committed in
              public.
            </p>
            <a
              className="btn primary"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              OPEN GITHUB ↗
            </a>
          </div>
        </Reveal>

        {/* ---- Section 08 / Contact ---- */}
        <Reveal id="contact" className="section contact-section">
          <div className="section-no">08 / CONTACT</div>

          {/* Availability Status */}
          <div className="availability-card">
            <div className="availability-status">
              <span className="status-dot green" />
              <span>OPEN TO COLLABORATION</span>
            </div>
            <p className="availability-desc">
              Interested in meaningful engineering projects, technical discussions and innovative ideas.
            </p>
          </div>

          {/* Final CTA */}
          <div className="contact-headline-wrap">
            <h2>
              LET'S TURN IDEAS <span>INTO REALITY.</span>
            </h2>
            <p className="contact-subtitle">
              Have an interesting project, technical question or creative idea? Let's connect.
            </p>
            <div className="contact-cta-buttons">
              <a href={`mailto:${email}`} className="btn primary">
                SEND AN EMAIL
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost"
                aria-label="Connect on LinkedIn"
              >
                CONNECT ON LINKEDIN ↗
              </a>
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn ghost"
                aria-label="Follow on Instagram"
              >
                FOLLOW ON INSTAGRAM ↗
              </a>
            </div>
          </div>

          {/* Contact Main 2-Column Grid */}
          <div className="contact-main-grid">
            {/* Left Column: Direct Info & Professional Interests */}
            <div className="contact-info-col">
              <div className="contact-info-card">
                <h3>DIRECT CONTACT</h3>

                <div className="info-item">
                  <div className="info-label">
                    <IconMail /> EMAIL
                  </div>
                  <a href={`mailto:${email}`} className="info-value email-link">
                    {email}
                  </a>
                  <a
                    href={`mailto:${email}`}
                    className="btn ghost btn-sm info-btn"
                  >
                    COMPOSE EMAIL ↗
                  </a>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <IconMapPin /> LOCATION
                  </div>
                  <div className="info-value">{location}</div>
                </div>
              </div>

              <div className="contact-interests-card">
                <h3>PROFESSIONAL INTERESTS</h3>
                <p className="interests-sub">
                  Active engineering domains & technical focus areas:
                </p>
                <div className="interests-pills">
                  {professionalInterests.map((interest) => (
                    <span key={interest} className="interest-pill">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <div className="form-card-header">
                  <h3>SEND A MESSAGE</h3>
                  <span className="form-card-badge">DIRECT ROUTING</span>
                </div>
                <p className="form-card-intro">
                  Send a message directly to <code>{email}</code>.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* 4 Social Connection Cards */}
          <div className="social-cards-section">
            <div className="social-cards-header">
              <small>04 CHANNELS · VERIFIED NETWORKS</small>
              <h3>CONNECT ACROSS PLATFORMS</h3>
            </div>

            <div className="social-cards-grid">
              {socialCards.map((card) => (
                <article className="social-card" key={card.number}>
                  <div className="social-card-top">
                    <span className="social-card-num">{card.number}</span>
                    <div className="social-card-icon">
                      {getPlatformIcon(card.platform)}
                    </div>
                  </div>
                  <h4 className="social-card-label">{card.label}</h4>
                  <p className="social-card-desc">{card.description}</p>
                  <a
                    href={card.href}
                    target={card.isExternal ? "_blank" : undefined}
                    rel={card.isExternal ? "noopener noreferrer" : undefined}
                    className="social-card-btn"
                    aria-label={`${card.buttonText} - ${card.label}`}
                  >
                    {card.buttonText}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Global Editorial Footer ---- */}
        <footer className="footer-main">
          <div className="footer-container">
            <div className="footer-brand-row">
              <div className="footer-brand">
                <a href="#top" className="brand">
                  TB <span>/ 2.0</span>
                </a>
                <div className="footer-name">TEJAS RAJESH BARGAT</div>
                <p className="footer-tagline">
                  ENGINEERING THE FUTURE, ONE BUILD AT A TIME.
                </p>
              </div>

              <div className="footer-nav-col">
                <span className="footer-col-title">NAVIGATION</span>
                <div className="footer-nav-links">
                  <a href="#about">ABOUT</a>
                  <a href="#skills">SKILLS</a>
                  <a href="#projects">PROJECTS</a>
                  <a href="#journey">JOURNEY</a>
                  <a href="#roadmap">ROADMAP</a>
                  <a href="#contact">CONTACT</a>
                </div>
              </div>

              <div className="footer-social-col">
                <span className="footer-col-title">VERIFIED PROFILES</span>
                <div className="footer-social-links">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.isExternal ? "_blank" : undefined}
                      rel={s.isExternal ? "noopener noreferrer" : undefined}
                      className="footer-social-link"
                      aria-label={`Open Tejas's ${s.label} profile`}
                    >
                      {getPlatformIcon(s.platform)}
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-bottom-row">
              <div className="footer-copyright">
                © 2026 Tejas Rajesh Bargat. All rights reserved.
              </div>
              <div className="footer-location-tag">
                MAHARASHTRA, INDIA · TGPCET ECE
              </div>
              <a href="#top" className="footer-back-to-top">
                BACK TO TOP ↑
              </a>
            </div>
          </div>
        </footer>
      </main>
      <NexusChat />
    </>
  );
}
