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
    menuToggle.addEventListener("click", () => {
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

    projectCards.forEach((c) => {
      const text = c.textContent.toLowerCase();
      c.style.display = text.includes(query) ? "flex" : "none";
    });

    techCards.forEach((c) => {
      const text = c.textContent.toLowerCase();
      c.style.display = text.includes(query) ? "block" : "none";
    });
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
    if (activeEl) activeEl.textContent = `${active} / ${days.length}`;
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

  window.openModal = function (modalType) {
    sfx.playClick();
    if (!backdrop) return;

    // Hide all modal views
    document.querySelectorAll(".modal-view").forEach((v) => (v.style.display = "none"));

    const targetView = document.getElementById(`modal-${modalType}`);
    if (targetView) targetView.style.display = "block";

    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";

    if (modalType === "nexus") {
      const input = document.getElementById("terminalInput");
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

        // Append user query
        const userMsg = document.createElement("div");
        userMsg.className = "term-msg user";
        userMsg.textContent = `guest@nexus:~$ ${query}`;
        termScreen.appendChild(userMsg);

        // Simulated AI response
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
            reply = "[NEXUS AI Router]: Top projects in database: #1 NEXUS Chat (Terminal LLM), #2 Dual Water Tank Ultrasonic Monitor, #3 8051 Solar Tracker. Check them out on GitHub @tejasbargat16-ux!";
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

  // B. Dual Water Tank Ultrasonic Simulator
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

  // C. 8051 Solar Tracker Simulator
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

      // Simulate differential light sensor reading
      const ldr1 = Math.round(512 + Math.sin((angle * Math.PI) / 180) * 400);
      const ldr2 = Math.round(512 - Math.sin((angle * Math.PI) / 180) * 400);
      ldr1Val.textContent = `${ldr1} mV`;
      ldr2Val.textContent = `${ldr2} mV`;
    });
  }
}
