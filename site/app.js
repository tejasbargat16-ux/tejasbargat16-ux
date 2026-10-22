/**
 * TEJASFLIX — Interactive Experience Controller
 * Includes Web Audio API SFX (Netflix Ta-dum, click, hover),
 * interactive project simulators, contribution calendar analytics,
 * and dynamic search/filter features.
 */

// ==========================================================================
// 1. Audio Engine (Web Audio API - Zero External Audio Files)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Synthesizes the iconic Netflix "Ta-dum" intro chord
  playTaDum() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    // Deep boom base note (D2 ~ 73.4Hz)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(73.4, t);
    osc1.frequency.exponentialRampToValueAtTime(36.7, t + 1.2);

    gain1.gain.setValueAtTime(0.7, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(t);
    osc1.stop(t + 1.2);

    // Mid cinematic swell (A2 & D3 chord)
    const notes = [110, 146.8, 220];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, t + 0.1);
      osc.frequency.linearRampToValueAtTime(freq * 1.05, t + 1.4);

      // Lowpass filter for deep cinematic warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(350, t);
      filter.frequency.exponentialRampToValueAtTime(120, t + 1.4);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.25 - idx * 0.05, t + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t + 0.08);
      osc.stop(t + 1.4);
    });

    // Metallic hit shimmer
    const oscAnvil = this.ctx.createOscillator();
    const gainAnvil = this.ctx.createGain();
    oscAnvil.type = "triangle";
    oscAnvil.frequency.setValueAtTime(440, t + 0.12);
    oscAnvil.frequency.exponentialRampToValueAtTime(80, t + 0.7);

    gainAnvil.gain.setValueAtTime(0.3, t + 0.12);
    gainAnvil.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

    oscAnvil.connect(gainAnvil);
    gainAnvil.connect(this.ctx.destination);
    oscAnvil.start(t + 0.12);
    oscAnvil.stop(t + 0.7);
  }

  // Soft high-tech hover tick
  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, t);
    gain.gain.setValueAtTime(0.03, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  }

  // Snappy click confirmation
  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.08);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.08);
  }
}

const sfx = new SoundFX();

// ==========================================================================
// 2. DOM Initialization & Event Handlers
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();
  setupAudioToggle();
  setupToolkitFilter();
  setupSearch();
  setupModals();
  loadContributionData();
  setupSimulators();
  setupSoundHooks();
  setupAnimations();
});

// Sound hooks for interactive elements
function setupSoundHooks() {
  document.querySelectorAll(".top10-card, .episode-row, .tech-card, .journey-card, .btn-primary, .btn-secondary").forEach((el) => {
    el.addEventListener("mouseenter", () => sfx.playTick());
  });

  document.querySelectorAll("button, .nav-links a, .social-badge-btn, .brand-logo").forEach((el) => {
    el.addEventListener("click", () => sfx.playClick());
  });

  // Logo triggers Ta-Dum
  const logo = document.querySelector(".brand-logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      sfx.playTaDum();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// Navbar scroll effects and mobile menu
function setupNavbar() {
  const nav = document.querySelector(".netflix-nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isVisible = navLinks.style.display === "flex";
      navLinks.style.display = isVisible ? "none" : "flex";
      if (!isVisible) {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "68px";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.background = "rgba(20,20,20,0.98)";
        navLinks.style.padding = "20px 4%";
        navLinks.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
      }
    });

    // Close mobile menu when clicking outside the nav
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.style.display = "none";
      });
    });
  }
}

// Audio mute/unmute control
function setupAudioToggle() {
  const soundBtn = document.getElementById("soundToggleBtn");
  const soundIcon = document.getElementById("soundIcon");
  if (!soundBtn) return;

  soundBtn.addEventListener("click", () => {
    const isMuted = sfx.toggleMute();
    if (soundIcon) {
      soundIcon.textContent = isMuted ? "🔇" : "🔊";
    }
    soundBtn.title = isMuted ? "Unmute Sound FX" : "Mute Sound FX";
    if (!isMuted) sfx.playTaDum();
  });
}

// Toolkit category filtering
function setupToolkitFilter() {
  const tabs = document.querySelectorAll(".toolkit-tab-btn");
  const cards = document.querySelectorAll(".tech-card");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-cat");

      cards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-cat") === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Real-time search across projects and tools
function setupSearch() {
  const searchBtn = document.querySelector(".search-icon-btn");
  const searchContainer = document.querySelector(".search-container");
  const searchInput = document.getElementById("navSearchInput");
  const emptyState = document.getElementById("searchEmptyState");

  if (!searchBtn || !searchContainer || !searchInput) return;

  searchBtn.addEventListener("click", () => {
    searchContainer.classList.toggle("active");
    if (searchContainer.classList.contains("active")) {
      searchInput.focus();
    }
  });

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const projectCards = document.querySelectorAll(".top10-card");
    const techCards = document.querySelectorAll(".tech-card");

    let visibleProjects = 0;
    projectCards.forEach((c) => {
      const text = c.textContent.toLowerCase();
      const match = text.includes(query);
      c.style.display = match ? "flex" : "none";
      if (match) visibleProjects++;
    });

    techCards.forEach((c) => {
      const text = c.textContent.toLowerCase();
      c.style.display = text.includes(query) ? "block" : "none";
    });

    if (emptyState) {
      emptyState.style.display = (query !== "" && visibleProjects === 0) ? "block" : "none";
    }
  });
}

// ==========================================================================
// 3. Contribution Heatmap Live Loader & Analytics
// ==========================================================================
async function loadContributionData() {
  try {
    const res = await fetch("data/contributions.json");
    if (!res.ok) throw new Error("Could not load data/contributions.json");
    const data = await res.json();
    const days = data.days || [];

    let total = 0;
    let active = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let peakDay = { count: 0, date: "" };

    days.forEach((d) => {
      total += d.count;
      if (d.count > 0) {
        active++;
        currentStreak++;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
        if (d.count > peakDay.count) peakDay = d;
      } else {
        currentStreak = 0;
      }
    });

    const totalEl = document.getElementById("statTotalContribs");
    const activeEl = document.getElementById("statActiveDays");
    const streakEl = document.getElementById("statLongestStreak");
    const peakEl = document.getElementById("statPeakDay");

    if (totalEl) totalEl.textContent = total.toLocaleString();
    if (activeEl) activeEl.textContent = `${active} / ${days.length || 371}`;
    if (streakEl) streakEl.textContent = `${longestStreak} days`;
    if (peakEl && peakDay.date) {
      peakEl.textContent = `${peakDay.count} on ${peakDay.date}`;
    }
  } catch (err) {
    console.warn("Heatmap data loading:", err.message);
  }
}

// ==========================================================================
// 4. Modals Controller
// ==========================================================================
function setupModals() {
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalCloseBtn");
  const titleEl = document.getElementById("modalTitle");

  const titles = {
    nexus: "NEXUS Chat — Terminal AI Gateway",
    tank: "Dual Water Tank — Ultrasonic IoT Monitor",
    solar: "8051 MCU — Dual-Axis Solar Tracker",
    about: "Behind the Scenes — Tejas Bargat",
    banner: "Visual Blueprint — Cyberpunk Architecture",
    termux: "Termux Station — Android CLI Workstation",
    irrigation: "Smart Irrigation — Soil Moisture Controller",
    js: "JavaScript Journey — Season 1",
    java: "Java Journey — Season 1",
    api: "Flask LLM Gateway — API Architecture",
    counter: "8051 MCU — Precision Event Counter",
    dotfiles: "Mobile DevOps — Android Toolchain",
  };

  window.openModal = function (modalType) {
    sfx.playClick();
    if (!backdrop) return;

    if (titleEl && titles[modalType]) {
      titleEl.textContent = titles[modalType];
    }

    // Hide all modal views
    document.querySelectorAll(".modal-view").forEach((v) => (v.style.display = "none"));

    const targetView = document.getElementById(`modal-${modalType}`);
    if (targetView) targetView.style.display = "block";

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";

    if (modalType === "nexus") {
      const input = document.getElementById("terminalInput");
      if (input) setTimeout(() => input.focus(), 150);
    } else if (modalType === "termux") {
      const input = document.getElementById("termuxInput");
      if (input) setTimeout(() => input.focus(), 150);
    }
  };

  window.closeModal = function () {
    sfx.playClick();
    if (!backdrop) return;
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", window.closeModal);
  if (backdrop) {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) window.closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop && backdrop.classList.contains("open")) {
      window.closeModal();
    }
  });
}

// ==========================================================================
// 5. Interactive Hardware & AI Simulators
// ==========================================================================
function setupSimulators() {
  // A. NexusChat AI Terminal Simulation
  const termScreen = document.getElementById("termScreen");
  const termInput = document.getElementById("terminalInput");

  if (termInput && termScreen) {
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && termInput.value.trim() !== "") {
        const query = termInput.value.trim();
        termInput.value = "";

        const userMsg = document.createElement("div");
        userMsg.className = "term-msg user";
        userMsg.textContent = `guest@nexus:~$ ${query}`;
        termScreen.appendChild(userMsg);

        setTimeout(() => {
          const aiMsg = document.createElement("div");
          aiMsg.className = "term-msg ai";

          let reply = "";
          const lower = query.toLowerCase();
          if (lower.includes("hello") || lower.includes("hi")) {
            reply = "[NEXUS AI Router]: Greetings! I am NEXUS Chat, built by Tejas Bargat using Flask, SQLite, and multi-provider LLMs. How can I assist your engineering workflow today?";
          } else if (lower.includes("tech") || lower.includes("stack")) {
            reply = "[NEXUS AI Router]: Tejas's core stack includes Python, Java, C/C++, JavaScript, Arduino, 8051 MCU, Flask, LLM APIs, and SQLite — built Android-first on Termux.";
          } else if (lower.includes("projects") || lower.includes("work")) {
            reply = "[NEXUS AI Router]: Top projects in database: #1 NEXUS Chat, #2 Dual Water Tank, #3 8051 Solar Tracker, #7 Smart Irrigation. Check them out on GitHub @tejasbargat16-ux!";
          } else if (lower.includes("clear")) {
            termScreen.innerHTML = "";
            return;
          } else {
            reply = `[NEXUS AI Router]: Processed "${query}". Query routed to active LLM engine. All systems operational. To exit or inspect source, visit https://github.com/tejasbargat16-ux/nexuschat`;
          }

          aiMsg.textContent = reply;
          termScreen.appendChild(aiMsg);
          termScreen.scrollTop = termScreen.scrollHeight;
          sfx.playTick();
        }, 300);
      }
    });
  }

  // B. Termux Mobile Station Simulation
  const termuxScreen = document.getElementById("termuxScreen");
  const termuxInput = document.getElementById("termuxInput");

  if (termuxInput && termuxScreen) {
    termuxInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && termuxInput.value.trim() !== "") {
        const cmd = termuxInput.value.trim();
        termuxInput.value = "";

        const userMsg = document.createElement("div");
        userMsg.className = "term-msg user";
        userMsg.textContent = `u0_a248@localhost:~$ ${cmd}`;
        termuxScreen.appendChild(userMsg);

        setTimeout(() => {
          const outMsg = document.createElement("div");
          outMsg.className = "term-msg sys";

          let reply = "";
          const lower = cmd.toLowerCase();
          if (lower === "help") {
            reply = "Available commands: git status, neofetch, uname, pkg list, python main.py, projects, clear";
          } else if (lower.includes("git")) {
            reply = "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean";
          } else if (lower.includes("uname")) {
            reply = "Linux localhost 6.1.0-android14-arm64 #1 SMP PREEMPT aarch64 Android";
          } else if (lower.includes("neofetch")) {
            reply = "OS: Termux (Android 14 ARM64)\nHost: Mobile Dev Station (Wardha, IN)\nKernel: 6.1.0-android-aarch64\nShell: bash 5.2.26\nEditor: Micro / NeoVim\nTooling: Git, Python 3.12, Node 22";
          } else if (lower.includes("pkg")) {
            reply = "Listing installed: git (2.44.0), python (3.12.3), nodejs (22.2.0), clang (18.1.4), sqlite (3.45.1), openssh (9.7p1)";
          } else if (lower.includes("python")) {
            reply = ">>> Python 3.12.3 [Clang 18.1.4 on linux]\n[SUCCESS] Running hardware simulation pipeline... OK (0.04s)";
          } else if (lower.includes("clear")) {
            termuxScreen.innerHTML = "";
            return;
          } else {
            reply = `bash: ${cmd}: command executed successfully. Type 'help' for full terminal command menu.`;
          }

          outMsg.textContent = reply;
          termuxScreen.appendChild(outMsg);
          termuxScreen.scrollTop = termuxScreen.scrollHeight;
          sfx.playTick();
        }, 250);
      }
    });
  }

  // C. Dual Water Tank Ultrasonic Simulator
  const tankSlider = document.getElementById("waterLevelSlider");
  const waterLevel = document.getElementById("tankWaterLevel");
  const sensorDist = document.getElementById("sensorDist");
  const pumpStatus = document.getElementById("pumpStatus");

  if (tankSlider && waterLevel && sensorDist && pumpStatus) {
    tankSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      waterLevel.style.height = `${val}%`;
      const distanceCm = Math.round(50 - (val / 100) * 45);
      sensorDist.textContent = `${distanceCm} cm`;

      if (val < 25) {
        pumpStatus.textContent = "PUMP ACTIVE (Filling Tank...)";
        pumpStatus.style.color = "#46D369";
      } else if (val > 85) {
        pumpStatus.textContent = "PUMP STOPPED (Full Tank Threshold)";
        pumpStatus.style.color = "#E50914";
      } else {
        pumpStatus.textContent = "PUMP STANDBY (Normal Level)";
        pumpStatus.style.color = "#FFD700";
      }
    });
  }

  // D. 8051 Solar Tracker Simulator
  const sunSlider = document.getElementById("sunAngleSlider");
  const solarPanel = document.getElementById("solarPanelSim");
  const ldr1Val = document.getElementById("ldr1Val");
  const ldr2Val = document.getElementById("ldr2Val");
  const motorAngle = document.getElementById("motorAngle");

  if (sunSlider && solarPanel && ldr1Val && ldr2Val && motorAngle) {
    sunSlider.addEventListener("input", (e) => {
      const angle = parseInt(e.target.value, 10);
      solarPanel.style.transform = `rotate(${angle}deg)`;
      motorAngle.textContent = `${angle}°`;

      const ldr1 = Math.round(512 + Math.sin((angle * Math.PI) / 180) * 400);
      const ldr2 = Math.round(512 - Math.sin((angle * Math.PI) / 180) * 400);
      ldr1Val.textContent = `${ldr1} mV`;
      ldr2Val.textContent = `${ldr2} mV`;
    });
  }

  // E. Smart Irrigation & Soil Moisture Simulator
  const moistureSlider = document.getElementById("soilMoistureSlider");
  const moisturePct = document.getElementById("moisturePct");
  const moistureEmoji = document.getElementById("moistureEmoji");
  const soilAdc = document.getElementById("soilAdc");
  const valveStatus = document.getElementById("valveStatus");

  if (moistureSlider && moisturePct && moistureEmoji && soilAdc && valveStatus) {
    moistureSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      moisturePct.textContent = `${val}%`;

      if (val < 25) {
        moistureEmoji.textContent = "🌵";
        moisturePct.style.color = "#E50914";
        valveStatus.textContent = "VALVE ACTIVE (Watering Soil — Low Moisture Detected)";
        valveStatus.style.color = "#E50914";
      } else if (val > 70) {
        moistureEmoji.textContent = "💧";
        moisturePct.style.color = "#00b4d8";
        valveStatus.textContent = "VALVE CLOSED (Soil Saturated)";
        valveStatus.style.color = "#00b4d8";
      } else {
        moistureEmoji.textContent = "🌱";
        moisturePct.style.color = "#46D369";
        valveStatus.textContent = "VALVE CLOSED (Soil Moisture Adequate)";
        valveStatus.style.color = "#46D369";
      }

      const voltage = (val * 0.05).toFixed(2);
      const adcVal = Math.round(val * 10.23);
      soilAdc.textContent = `${voltage} V (ADC: ${adcVal})`;
    });
  }
}

// ==========================================================================
// 6. Animation Engine - Scroll Reveal, Splash, Particles & Counters
// ==========================================================================
function setupAnimations() {
  // Splash Screen
  const splash = document.getElementById("tejasflixSplash");
  if (splash) {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      splash.classList.add("splash-exit");
      setTimeout(() => {
        splash.style.display = "none";
        document.body.style.overflow = "";
      }, 500);
    }, 2200);
  }

  // Scroll Progress Bar
  const progressBar = document.getElementById("scrollProgressBar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    }, { passive: true });
  }

  // IntersectionObserver: Reveal, Left, Scale, Stagger
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        const bar = entry.target.querySelector(".section-bar");
        if (bar) bar.classList.add("animate-bar");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal, .reveal-left, .reveal-scale, .reveal-stagger").forEach((el) => {
    revealObserver.observe(el);
  });

  // Episode Rows Stagger Reveal
  const epObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const rows = entry.target.querySelectorAll(".episode-row");
        rows.forEach((row, i) => {
          setTimeout(() => row.classList.add("ep-visible"), i * 120);
        });
        epObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  const epList = document.querySelector(".episodes-list");
  if (epList) epObserver.observe(epList);

  // Heatmap Stats Stagger + Counter
  const hmObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".hm-stat-value").forEach((el, i) => {
          const finalText = el.textContent.trim();
          const numMatch = finalText.match(/[\d.,]+/);
          if (numMatch) {
            const num = parseFloat(numMatch[0].replace(/,/g, ""));
            if (!isNaN(num) && num > 0) {
              setTimeout(() => animateCounter(el, 0, num, finalText, 1100), i * 200);
            }
          }
        });
        hmObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const hmBanner = document.querySelector(".heatmap-stats-banner");
  if (hmBanner) hmObserver.observe(hmBanner);

  // Journey Progress Bars Animate on Reveal
  const jpObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".journey-progress-fill").forEach((fill) => {
          const target = fill.style.width;
          fill.style.width = "0";
          requestAnimationFrame(() => {
            requestAnimationFrame(() => { fill.style.width = target; });
          });
        });
        jpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  const jGrid = document.querySelector(".journey-grid");
  if (jGrid) jpObserver.observe(jGrid);

  // Footer Quote Typewriter
  const footerObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("type-animate");
        footerObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const footerQuote = document.querySelector(".footer-quote");
  if (footerQuote) footerObs.observe(footerQuote);

  // Particle Canvas (Hero)
  setupParticles();

  // Toolkit Tab Pop on Click
  document.querySelectorAll(".toolkit-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.remove("active");
      void btn.offsetWidth;
      btn.classList.add("active");
    });
  });
}

// Helper: animated number counter roll-up
function animateCounter(el, from, to, originalText, duration) {
  const prefix = originalText.match(/^[^\d]*/)[0] || "";
  const suffix = originalText.replace(/^[^\d]*[\d.,]+/, "").trim();
  const isFloat = String(to).includes(".");
  const start = performance.now();

  el.classList.add("counting");
  setTimeout(() => el.classList.remove("counting"), 400);

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 5);
    const value = from + (to - from) * ease;
    const display = isFloat ? value.toFixed(1) : Math.round(value).toLocaleString();
    el.textContent = prefix + display + (suffix ? " " + suffix : "");
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = originalText;
  }
  requestAnimationFrame(tick);
}

// Floating particles for the hero section
function setupParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const hero = canvas.parentElement;
  let W, H;
  const PARTICLE_COUNT = 55;
  const particles = [];

  function resize() {
    W = canvas.width = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  function Particle() {
    this.reset = function(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = 1 + Math.random() * 2.5;
      this.speedY = -(0.18 + Math.random() * 0.45);
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.opacity = 0.1 + Math.random() * 0.5;
      this.type = Math.random() < 0.6 ? "dot" : Math.random() < 0.5 ? "cross" : "diamond";
      this.color = Math.random() < 0.6 ? "229,9,20" : "255,255,255";
      this.pulse = Math.random() * Math.PI * 2;
    };
    this.update = function() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.pulse += 0.025;
      this.opacity = 0.15 + Math.abs(Math.sin(this.pulse)) * 0.45;
      if (this.y < -10) this.reset(false);
    };
    this.draw = function() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = "rgba(" + this.color + ",1)";
      ctx.strokeStyle = "rgba(" + this.color + ",0.8)";
      ctx.lineWidth = 1;
      if (this.type === "dot") {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === "cross") {
        const s = this.size * 2.5;
        ctx.beginPath();
        ctx.moveTo(this.x - s, this.y); ctx.lineTo(this.x + s, this.y);
        ctx.moveTo(this.x, this.y - s); ctx.lineTo(this.x, this.y + s);
        ctx.stroke();
      } else {
        const s = this.size * 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - s);
        ctx.lineTo(this.x + s, this.y);
        ctx.lineTo(this.x, this.y + s);
        ctx.lineTo(this.x - s, this.y);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };
    this.reset(true);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  let animId = null;
  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => { p.update(); p.draw(); });
    animId = requestAnimationFrame(loop);
  }
  loop();

  const heroObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      if (!animId) loop();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });
  heroObs.observe(hero);
}
