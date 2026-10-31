import { useEffect, useState, useRef, useCallback } from "react";
import profile from "./assets/tejas-profile.jpg";
import { projects, skills, learning, roadmap, stats, labItems } from "./data";

const github = "https://github.com/tejasbargat16-ux";

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
    const t = setTimeout(() => setShow(false), 1800);
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

/* ---- Project Card ---- */
function ProjectCard({ p, i }) {
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
        <div className="project-code">{String(i + 1).padStart(2, "0")}</div>
        <div className="visual-symbol">
          {p.tone === "ai"
            ? "N×"
            : p.tone === "solar"
            ? "☼"
            : p.tone === "water"
            ? "≈"
            : "PY"}
        </div>
        <span className="scan" />
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{p.kicker}</span>
          <b>{p.status}</b>
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {p.title === "Python Learning Journey" && (
          <a href={github} target="_blank" rel="noreferrer">
            VIEW GITHUB ↗
          </a>
        )}
      </div>
    </article>
  );
}

/* ---- Main App ---- */
export default function App() {
  const [profileMode, setProfileMode] = useState("Builder");

  useEffect(() => {
    /* scroll progress */
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
            /* animate timeline connector */
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
        ".reveal, .skill-row, .timeline-item, .roadmap-item, .timeline"
      )
      .forEach((el) => obs.observe(el));

    return () => {
      removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  const identityContent = {
    Builder: {
      heading: "Ideas become circuits, code and prototypes.",
      text: "I learn by making: from water-level sensing and solar tracking to the Nexus AI assistant concept.",
    },
    Student: {
      heading: "Second-year ECE, still expanding the map.",
      text: "I study Electronics & Communication Engineering at TGPCET while building software foundations and preparing for deeper CSE/ECE study.",
    },
    Explorer: {
      heading: "Engineering range with an honest learning curve.",
      text: "AI, embedded systems, defensive cybersecurity and product thinking are active explorations—not finished mastery claims.",
    },
  };

  return (
    <>
      <Preloader />
      <CursorGlow />
      <Particles />
      <div className="progress-bar" />
      <Nav />

      <main id="top">
        {/* ---- Hero ---- */}
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
            <img src={profile} className="hero-photo" alt="Tejas Bargat" />
            <div className="photo-label">TEJAS / 01</div>
          </div>
          <div className="hero-bottom">
            <span>SCROLL TO EXPLORE</span>
            <span>02 / ECE · TGPCET</span>
          </div>
        </section>

        {/* ---- Identity ---- */}
        <Reveal className="identity">
          <div className="section-no">00 / IDENTITY</div>
          <h2>
            WHO IS <span>TEJAS?</span>
          </h2>
          <div className="identity-tabs">
            {["Builder", "Student", "Explorer"].map((x) => (
              <button
                className={profileMode === x ? "active" : ""}
                onClick={() => setProfileMode(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          <div className="identity-panel">
            <strong>
              0{["Builder", "Student", "Explorer"].indexOf(profileMode) + 1}
            </strong>
            <div>
              <h3>{identityContent[profileMode].heading}</h3>
              <p>{identityContent[profileMode].text}</p>
            </div>
          </div>
        </Reveal>

        {/* ---- About ---- */}
        <Reveal id="about" className="about section">
          <div className="section-no">01 / THE BUILDER</div>
          <div className="two-col">
            <h2>
              I'M LEARNING TO CONNECT{" "}
              <span>SOFTWARE WITH THE PHYSICAL WORLD.</span>
            </h2>
            <div>
              <p>
                I'm Tejas, a second-year B.Tech student in Electronics &
                Communication Engineering at TGPCET autonomous college. My work
                sits where logic, hardware and product ideas meet.
              </p>
              <p>
                I'm not presenting a finished story. I'm building the
                fundamentals in public—one Python day, one circuit and one useful
                prototype at a time—with GATE 2028 and higher technical
                education on the horizon.
              </p>
              <div className="facts">
                <span>ECE · YEAR 02</span>
                <span>SSC 74%</span>
                <span>HSC 47%</span>
                <span>MHT-CET 41.7471281</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ---- Stats ---- */}
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

        {/* ---- Skills ---- */}
        <Reveal id="skills" className="section">
          <div className="section-no">02 / CAPABILITY MAP</div>
          <h2>
            PROGRESS, <span>NOT POSTURING.</span>
          </h2>
          <p className="muted">
            Signals show where I'm actively building and where I'm still
            exploring.
          </p>
          <div className="skills-grid">
            {skills.map(([name, level, status, detail]) => (
              <div className="skill-row" key={name}>
                <div>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                </div>
                <b>{status}</b>
                <div className="skill-track">
                  <i style={{ width: `${level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---- Projects ---- */}
        <Reveal id="projects" className="section projects">
          <div className="section-no">03 / FEATURED WORK</div>
          <h2>
            BUILT TO LEARN.
            <br />
            <span>DESIGNED TO BECOME USEFUL.</span>
          </h2>
          <div className="project-grid">
            {projects.map((p, i) => (
              <ProjectCard p={p} i={i} key={p.title} />
            ))}
          </div>
        </Reveal>

        {/* ---- Journey ---- */}
        <Reveal id="journey" className="section journey">
          <div className="section-no">04 / LEARNING IN PUBLIC</div>
          <div className="two-col">
            <div>
              <div className="eyebrow">PYTHON LEARNING JOURNEY</div>
              <h2>
                DAY 01 → <span>DAY 13</span>
              </h2>
              <p className="muted">
                A public record of consistency: foundations first, practice every
                day and honest progress committed to GitHub.
              </p>
              <a
                className="text-link"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                OPEN GITHUB PROFILE ↗
              </a>
            </div>
            <div className="timeline">
              {learning.map(([day, topic], i) => (
                <div className="timeline-item" key={day}>
                  <span>{day}</span>
                  <p>{topic}</p>
                  {i === learning.length - 1 && <b>NOW</b>}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Electronics Lab ---- */}
        <Reveal className="section lab">
          <div className="section-no">05 / ELECTRONICS LAB</div>
          <h2>
            HARDWARE IS WHERE <span>LOGIC MEETS CONSEQUENCE.</span>
          </h2>
          <div className="lab-grid">
            {labItems.map(([code, title, desc]) => (
              <article key={code}>
                <small>{code}</small>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ---- Roadmap ---- */}
        <Reveal id="roadmap" className="section roadmap">
          <div className="section-no">06 / CAREER ROADMAP</div>
          <h2>
            2026 → <span>2028+</span>
          </h2>
          <div className="roadmap-list">
            {roadmap.map(([year, title, desc]) => (
              <article className="roadmap-item" key={year}>
                <strong>{year}</strong>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* ---- GitHub ---- */}
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
              taking a polished headline on faith.
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

        {/* ---- Footer / Contact ---- */}
        <footer id="contact" className="footer">
          <div className="section-no">08 / CONTACT</div>
          <h2>
            LET'S BUILD THE
            <br />
            <span>NEXT USEFUL THING.</span>
          </h2>
          <div className="actions">
            <a
              className="btn primary"
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB ↗
            </a>
            <button className="btn ghost" disabled>
              RESUME · COMING SOON
            </button>
          </div>
          <div className="footer-meta">
            <span>MAHARASHTRA, INDIA</span>
            <span>ECE STUDENT · DEVELOPER · BUILDER</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </main>
    </>
  );
}