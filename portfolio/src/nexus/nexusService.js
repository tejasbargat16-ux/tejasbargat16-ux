/* ==========================================================================
   NEXUS AI — CONVERSATIONAL SERVICE & KNOWLEDGE ENGINE
   Integrates Cloud AI Backend with seamless, zero-latency Local Engine fallback
   Guarantees 100% availability on both GitHub Pages static and Full-stack hosts
   ========================================================================== */

import { TEJAS_PROFILE, NEXUS_SYSTEM_PROMPT } from "./knowledgeBase.js";

/* Configuration */
const BACKEND_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_NEXUS_API_URL) ||
  "/api/chat";

/**
 * Main entry point for sending a message to NEXUS AI
 * @param {string} userMessage - The visitor's message
 * @param {Array} history - Previous messages [{ role: "user"|"assistant", content: string }]
 * @returns {Promise<{ reply: string, actions?: Array, source: string }>}
 */
export async function askNexusAI(userMessage, history = []) {
  const cleanMsg = (userMessage || "").trim();
  if (!cleanMsg) {
    throw new Error("Message cannot be empty.");
  }

  // 1. If a backend endpoint is configured, attempt secure server-side AI request
  if (BACKEND_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: cleanMsg,
          history: history.slice(-8), // Send recent context window
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.reply) {
          return {
            reply: data.reply,
            actions: data.actions || extractActions(data.reply),
            source: "cloud-ai",
          };
        }
      }
    } catch (err) {
      console.info(
        "NEXUS AI: Backend unavailable or timed out. Falling back to Local Knowledge Engine.",
        err.message
      );
    }
  }

  // 2. Local Intelligent Knowledge Engine fallback
  // Provides instant, verified, zero-latency grounded responses
  const localResponse = generateLocalKnowledgeReply(cleanMsg);
  return {
    ...localResponse,
    source: "knowledge-engine",
  };
}

/**
 * Advanced rule-based semantic parser grounded in TEJAS_PROFILE
 */
function generateLocalKnowledgeReply(query) {
  const q = query.toLowerCase().trim();

  // Greetings & Identity
  if (
    matches(q, [
      "hi",
      "hello",
      "hey",
      "who are you",
      "what is nexus",
      "what are you",
      "greetings",
      "start",
    ]) &&
    q.length < 30
  ) {
    return {
      reply: `Hello! I'm **NEXUS AI**, the personal portfolio assistant for **${TEJAS_PROFILE.identity.fullName}**.\n\nI can help you explore his engineering background, hardware builds, software projects, skill taxonomy, and contact info.\n\nWhat would you like to know about Tejas?`,
      actions: [
        { label: "Who is Tejas?", query: "Who is Tejas?" },
        { label: "View Projects", query: "What projects has he built?" },
        { label: "Technical Skills", query: "What are his technical skills?" },
        { label: "Contact Info", query: "How can I contact him?" },
      ],
    };
  }

  // Who is Tejas / Background
  if (
    matches(q, [
      "who is tejas",
      "about tejas",
      "bio",
      "background",
      "education",
      "college",
      "tgpcet",
      "degree",
      "student",
      "who is he",
      "tell me about him",
    ])
  ) {
    const id = TEJAS_PROFILE.identity;
    return {
      reply: `**${id.fullName}** is a **${id.title}** based in ${id.location}.\n\n🎓 **Academic Focus:**\nHe is currently a **2nd-year B.Tech student in Electronics & Communication Engineering (ECE)** at **TGPCET**.\n\n⚙️ **Core Philosophy:**\n*"${id.philosophy}"*\n\nHe operates across the entire technical vertical — from digital circuit logic and microcontrollers (8051, ESP32, Arduino) up to Python automation, React full-stack web, and AI system design.`,
      actions: [
        { label: "Featured Projects", query: "What projects has he built?" },
        { label: "Explore Skills", query: "What are his technical skills?" },
        { label: "Connect on LinkedIn", url: TEJAS_PROFILE.socials.linkedin },
      ],
    };
  }

  // Specific Project: Nexus AI / Nexus Chat
  if (
    matches(q, [
      "nexus",
      "nexus ai",
      "nexus chat",
      "nexusaios",
      "nexus-ai",
      "assistant project",
    ])
  ) {
    const p = TEJAS_PROFILE.projects[0];
    return {
      reply: `🧠 **${p.title}**\n*Category: ${p.category} · Status: ${p.status}*\n\n${p.description}\n\n**Key Capabilities:**\n${p.capabilities.map((c) => `• ${c}`).join("\n")}\n\n**Stack:** ${p.stack.join(" · ")}\n\n*(Implementation note: ${p.isImplemented})*`,
      actions: [
        { label: "View Nexus Repo ↗", url: p.repo },
        { label: "Other Projects", query: "What other projects has he built?" },
      ],
    };
  }

  // Specific Project: Dual Water Tank
  if (
    matches(q, [
      "water",
      "tank",
      "dual water",
      "water tank",
      "pump",
      "ultrasonic",
      "level monitor",
    ])
  ) {
    const p = TEJAS_PROFILE.projects[1];
    return {
      reply: `💧 **${p.title}**\n*Category: ${p.category} · Status: ${p.status}*\n\n${p.description}\n\n**Key Capabilities:**\n${p.capabilities.map((c) => `• ${c}`).join("\n")}\n\n**Stack:** ${p.stack.join(" · ")}\n\n*(Implementation note: ${p.isImplemented})*`,
      actions: [
        { label: "View Controller Repo ↗", url: p.repo },
        { label: "Solar Tracking Project", query: "Tell me about the solar tracking system" },
      ],
    };
  }

  // Specific Project: Solar Tracker
  if (
    matches(q, [
      "solar",
      "tracker",
      "solar tracking",
      "8051",
      "sun",
      "ldr",
      "azimuth",
    ])
  ) {
    const p = TEJAS_PROFILE.projects[2];
    return {
      reply: `☼ **${p.title}**\n*Category: ${p.category} · Status: ${p.status}*\n\n${p.description}\n\n**Key Capabilities:**\n${p.capabilities.map((c) => `• ${c}`).join("\n")}\n\n**Stack:** ${p.stack.join(" · ")}\n\n*(Implementation note: ${p.isImplemented})*`,
      actions: [
        { label: "Explore Tejas's GitHub ↗", url: p.repo },
        { label: "View All Projects", query: "List all projects" },
      ],
    };
  }

  // Specific Project: CampusCare AI
  if (matches(q, ["campuscare", "complaint", "flutter", "fastapi"])) {
    const p = TEJAS_PROFILE.projects[5];
    return {
      reply: `🏛️ **${p.title}**\n*Category: ${p.category} · Status: ${p.status}*\n\n${p.description}\n\n**Key Capabilities:**\n${p.capabilities.map((c) => `• ${c}`).join("\n")}\n\n**Stack:** ${p.stack.join(" · ")}\n\n*(Implementation note: ${p.isImplemented})*`,
      actions: [
        { label: "View CampusCare Repo ↗", url: p.repo },
        { label: "All Projects", query: "What projects has he built?" },
      ],
    };
  }

  // Specific Project: Learning Journey
  if (
    matches(q, [
      "learning journey",
      "streak",
      "termux",
      "python streak",
      "daily coding",
      "leetcode",
      "public streak",
    ])
  ) {
    const p = TEJAS_PROFILE.projects[4];
    return {
      reply: `📈 **${p.title}**\n*Category: ${p.category} · Status: ${p.status}*\n\n${p.description}\n\n**Highlights:**\n${p.capabilities.map((c) => `• ${c}`).join("\n")}\n\nTejas practices public accountability by committing code daily directly from an Android phone (using Termux + Git toolchain) as well as his PC!`,
      actions: [
        { label: "View Learning Journey ↗", url: p.repo },
        { label: "Technical Skills", query: "What programming languages does he know?" },
      ],
    };
  }

  // All Projects
  if (
    matches(q, [
      "projects",
      "built",
      "builds",
      "what did he build",
      "featured",
      "work",
      "portfolio items",
    ])
  ) {
    const list = TEJAS_PROFILE.projects
      .map(
        (p) =>
          `**${p.number}. ${p.title}** (${p.status})\n• *${p.category}*: ${p.description.slice(0, 110)}...`
      )
      .join("\n\n");

    return {
      reply: `Here are the 6 featured projects in Tejas's portfolio:\n\n${list}\n\nWhich project would you like to explore in detail?`,
      actions: [
        { label: "Nexus AI", query: "Tell me about Nexus AI" },
        { label: "Water Tank Controller", query: "Tell me about the Water Tank project" },
        { label: "Solar Tracker", query: "Tell me about the Solar Tracking System" },
        { label: "CampusCare AI", query: "Tell me about CampusCare AI" },
      ],
    };
  }

  // Skills & Tech Stack
  if (
    matches(q, [
      "skills",
      "tech stack",
      "languages",
      "technologies",
      "tools",
      "what does he know",
      "programming",
      "hardware",
      "electronics",
    ])
  ) {
    const s = TEJAS_PROFILE.skills;
    return {
      reply: `Tejas possesses a balanced hybrid skill set spanning both hardware and software:\n\n💻 **Programming Languages:**\n${s.programming.join(", ")}\n\n🌐 **Web & Frontend:**\n${s.web.join(", ")}\n\n⚡ **Electronics & Embedded Systems:**\n${s.electronics.join(", ")}\n\n🤖 **AI & Modern Tech:**\n${s.ai.join(", ")}\n\n🛠️ **Dev Environment:**\n${s.tools.join(", ")}`,
      actions: [
        { label: "View Projects", query: "What projects has he built?" },
        { label: "Explore GitHub ↗", url: TEJAS_PROFILE.socials.github },
        { label: "Contact Tejas", query: "How can I contact him?" },
      ],
    };
  }

  // Contact / Socials
  if (
    matches(q, [
      "contact",
      "email",
      "reach",
      "linkedin",
      "github",
      "instagram",
      "social",
      "connect",
      "location",
      "where is he",
    ])
  ) {
    const soc = TEJAS_PROFILE.socials;
    return {
      reply: `You can reach and connect with **Tejas Rajesh Bargat** through any of these verified channels:\n\n📧 **Email:** [${soc.email}](mailto:${soc.email})\n💼 **LinkedIn:** [Tejas Bargat](${soc.linkedin})\n🐙 **GitHub:** [@tejasbargat16-ux](${soc.github})\n📸 **Instagram:** [@_tejas_bargat_01_](${soc.instagram})\n📍 **Location:** ${TEJAS_PROFILE.identity.location}\n\nHe is actively open to engineering discussions, technical projects, and innovative ideas!`,
      actions: [
        { label: "Send Email ↗", url: `mailto:${soc.email}` },
        { label: "LinkedIn Profile ↗", url: soc.linkedin },
        { label: "GitHub Profile ↗", url: soc.github },
        { label: "Instagram ↗", url: soc.instagram },
      ],
    };
  }

  // Collaboration / Hiring / Freelance
  if (
    matches(q, [
      "hire",
      "hiring",
      "internship",
      "collaborate",
      "collaboration",
      "freelance",
      "job",
      "opportunity",
      "available",
    ])
  ) {
    return {
      reply: `🟢 **Status: OPEN TO COLLABORATION**\n\nTejas is actively interested in:\n• Meaningful engineering projects & practical prototypes\n• Technical internships in software, AI, or embedded systems\n• Hardware/IoT research and collaborative experiments\n• Technology innovation and startup discussions\n\nFeel free to send him a direct proposal or connect professionally!`,
      actions: [
        { label: "Send an Email ↗", url: `mailto:${TEJAS_PROFILE.socials.email}` },
        { label: "Connect on LinkedIn ↗", url: TEJAS_PROFILE.socials.linkedin },
      ],
    };
  }

  // Resume / CV
  if (matches(q, ["resume", "cv", "curriculum vitae", "download resume"])) {
    return {
      reply: `📄 **Resume Status:**\nTejas's official resume is currently being updated to incorporate recent telemetry metrics, public streaks, and hardware build logs.\n\nIn the meantime, his public repositories on GitHub and this portfolio showcase his verified proof of work in full public transparency.`,
      actions: [
        { label: "Explore GitHub Repos ↗", url: TEJAS_PROFILE.socials.github },
        { label: "Request via Email ↗", url: `mailto:${TEJAS_PROFILE.socials.email}?subject=Resume%20Inquiry%20-%20Tejas%20Bargat` },
      ],
    };
  }

  // Career Roadmap / Future Plans
  if (matches(q, ["roadmap", "future", "goals", "gate", "plans", "vision"])) {
    const rm = TEJAS_PROFILE.roadmap
      .map((r) => `• **${r.year} · ${r.title}**: ${r.detail}`)
      .join("\n");
    return {
      reply: `🗺️ **Tejas's Multi-Year Engineering Roadmap:**\n\n${rm}\n\nHis goal is to cultivate deep technical range that bridges the physical reality of circuits with scalable intelligent software.`,
      actions: [
        { label: "View Technical Skills", query: "What are his technical skills?" },
        { label: "Contact Tejas", query: "How can I contact him?" },
      ],
    };
  }

  // Fallback for general or out-of-scope inquiries
  return {
    reply: `I don't have verified portfolio records regarding that specific question.\n\nAs Tejas's AI representative, I specialize in his **engineering background**, **featured hardware/software projects**, **skills**, and **verified contact links**.\n\nWould you like to explore any of these areas, or contact Tejas directly?`,
    actions: [
      { label: "Who is Tejas?", query: "Who is Tejas?" },
      { label: "What projects has he built?", query: "What projects has he built?" },
      { label: "Contact Tejas directly ↗", url: `mailto:${TEJAS_PROFILE.socials.email}` },
    ],
  };
}

/**
 * Utility: Checks if query contains any of the search phrases
 */
function matches(query, phrases) {
  return phrases.some((p) => query.includes(p));
}

/**
 * Utility: Extracts clickable markdown URLs as structured action buttons
 */
function extractActions(replyText) {
  const actions = [];
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g;
  let match;
  while ((match = linkRegex.exec(replyText)) !== null) {
    actions.push({
      label: match[1],
      url: match[2],
    });
  }
  return actions.slice(0, 4);
}

