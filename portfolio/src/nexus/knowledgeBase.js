/* ==========================================================================
   NEXUS AI — KNOWLEDGE BASE
   Verified ground-truth profile of Tejas Rajesh Bargat
   Used by both Cloud AI LLM and Local Intelligent Knowledge Engine
   ========================================================================== */

export const TEJAS_PROFILE = {
  identity: {
    fullName: "Tejas Rajesh Bargat",
    shortName: "Tejas",
    title: "Hybrid Engineer + AI Developer",
    location: "Maharashtra, India",
    education: {
      degree: "B.Tech in Electronics & Communication Engineering (ECE)",
      institution: "TGPCET (RTMNU)",
      year: "2nd Year (Sophomore · Batch 2026-27)",
      focus: "Embedded systems, circuit logic, computational programming & AI integration"
    },
    tagline: "Engineering the future, one build at a time.",
    philosophy: "Turning curiosity into code, circuits, AI experiments, and useful product ideas. Strong believer in daily practice, public learning, and physical consequence meeting logic.",
    status: "CURRENTLY BUILDING · OPEN TO COLLABORATION"
  },

  socials: {
    github: "https://github.com/tejasbargat16-ux",
    linkedin: "https://www.linkedin.com/in/tejas-bargat-9ab8523b0/",
    instagram: "https://www.instagram.com/_tejas_bargat_01_/",
    email: "tejasbargat16@gmail.com",
    portfolio: "https://tejasbargat16-ux.github.io/Tejas-2.0-Portfolio/"
  },

  interests: [
    "Electronics Engineering & Circuit Design",
    "Software & Web Development",
    "Artificial Intelligence & LLM Systems",
    "Embedded Systems & Firmware",
    "Internet of Things (IoT) & Telemetry",
    "Automation & Robotics",
    "Technology Entrepreneurship"
  ],

  projects: [
    {
      number: "01",
      title: "Nexus AI (Nexus AIOS / Nexus Chat)",
      category: "AI Assistant / Software",
      status: "BUILDING (In Active Development)",
      repo: "https://github.com/tejasbargat16-ux/Nexus-AIOS",
      secondaryRepo: "https://github.com/tejasbargat16-ux/nexuschat",
      stack: ["Python", "Groq / Gemini / OpenRouter APIs", "Termux", "FastAPI", "SQLite"],
      description: "A mobile-first personal AI assistant and AIOS concept engineered to run directly in Linux/Termux on Android. Features multi-provider LLM routing with automated failover, persistent SQLite chat memory, voice interaction tools, web search, and modular intent routing.",
      capabilities: [
        "Conversational AI interface in terminal",
        "Multi-LLM failover routing (Groq, Gemini, OpenRouter)",
        "Persistent SQLite memory",
        "Voice input/output exploration",
        "Built 100% Android-native via Termux"
      ],
      isImplemented: "Core daemon (nexusd), multi-provider router, and terminal CLI are prototyped in public repo."
    },
    {
      number: "02",
      title: "Dual Water Tank Monitoring System",
      category: "Electronics / IoT",
      status: "PROTOTYPED (Working Breadboard Build)",
      repo: "https://github.com/tejasbargat16-ux/water-tank-auto-controller",
      stack: ["Arduino UNO", "ESP32", "HC-SR04 Ultrasonic Sensors", "Embedded C", "Relay Module"],
      description: "An automated two-tank water management system. Simultaneously monitors underground and overhead water levels with non-contact ultrasonic distance sensors, provides RGB LED status indication, triggers buzzer warning thresholds, and manages motor relay shutoff logic to prevent dry-running and overflows.",
      capabilities: [
        "Dual-tank independent sensing",
        "Automatic motor-cutoff relay logic",
        "Visual RGB status indicators (Low, Med, Full)",
        "Audible alarm threshold buzzer",
        "ESP32 IoT telemetry upgrade path"
      ],
      isImplemented: "Working physical breadboard prototype tested with active fluid circulation."
    },
    {
      number: "03",
      title: "Solar Tracking System",
      category: "Embedded Systems",
      status: "PROTOTYPE / CONCEPT",
      repo: "https://github.com/tejasbargat16-ux",
      stack: ["8051 Microcontroller (AT89C51)", "LDR Light Sensors", "Stepper Motor Driver (L293D/L298N)", "Embedded C"],
      description: "An 8051 microcontroller-based solar energy automation concept. Employs a differential light-dependent resistor (LDR) analog bridge to sense incident solar angle deltas, driving stepper/servo alignment motors toward peak solar irradiance for optimal energy harvesting.",
      capabilities: [
        "Differential comparative LDR bridge",
        "Microcontroller-driven motor rotation",
        "Azimuth light-tracking automation",
        "Energy harvesting optimization"
      ],
      isImplemented: "Schematic architecture, comparator bridge design, and 8051 firmware logic."
    },
    {
      number: "04",
      title: "Tejas 2.0 Portfolio",
      category: "Web Development / Personal Branding",
      status: "DEPLOYED",
      repo: "https://github.com/tejasbargat16-ux/Tejas-2.0-Portfolio",
      demo: "https://tejasbargat16-ux.github.io/Tejas-2.0-Portfolio/",
      stack: ["React 19", "Vite", "JavaScript (ES6+)", "Modern CSS", "GitHub Pages"],
      description: "The live personal portfolio of Tejas Bargat. Engineered with an editorial two-column layout, deep black and burgundy cinematic aesthetic, vivid red accents, authentic hardware photos, skill matrix, and the integrated NEXUS AI chat system.",
      capabilities: [
        "Cinematic dark engineering design system",
        "Authentic verified telemetry & hardware photos",
        "Responsive cross-device architecture",
        "NEXUS AI conversational intelligence"
      ],
      isImplemented: "Fully built, deployed on GitHub Pages."
    },
    {
      number: "05",
      title: "Programming Learning Journey",
      category: "Software Development",
      status: "ACTIVE PUBLIC STREAK",
      repo: "https://github.com/tejasbargat16-ux/Python-Learning-Journey",
      stack: ["Python (Day 13+ streak)", "Java", "JavaScript", "C / C++", "Termux", "Git"],
      description: "A disciplined public coding journey committed directly to GitHub daily. Built primarily from a mobile terminal toolchain (Termux on Android) and synced via Git, covering algorithms, OOP, APIs, and LeetCode problem solving.",
      capabilities: [
        "Python daily learning streak (Day 13+)",
        "Java OOP & Date-Time API on Android",
        "JavaScript DOM & asynchronous practice",
        "LeetCode algorithm implementations"
      ],
      isImplemented: "Active public repositories updated continuously."
    },
    {
      number: "06",
      title: "CampusCare AI",
      category: "AI / Product Development",
      status: "BUILDING",
      repo: "https://github.com/tejasbargat16-ux/campuscareai_edition",
      stack: ["Flutter (Material 3)", "FastAPI", "Python", "SQLite / SQLAlchemy", "Docker Compose"],
      description: "An AI-powered campus complaint and facility management platform. Features Flutter mobile & web clients, a FastAPI async backend, role-based access (Student, Staff, Admin), image attachments, priority categorization, and administrative resolution dashboards.",
      capabilities: [
        "Flutter Material 3 cross-platform UI",
        "FastAPI REST backend with JWT security",
        "AI-assisted priority and department routing",
        "Admin metrics dashboard & ticket timeline"
      ],
      isImplemented: "Backend APIs, database models, and Flutter client screens in repository."
    }
  ],

  skills: {
    programming: ["Python", "C", "C++", "Java", "JavaScript (ES6+)", "HTML5", "CSS3"],
    web: ["React 19", "Vite", "Responsive Design", "Modern CSS / Grid / Flexbox", "REST APIs"],
    electronics: ["Digital Electronics", "Circuit Design", "8051 Microcontroller", "Arduino UNO", "ESP32", "ESP8266", "Sensors (LDR, Ultrasonic, Temp)", "Relays & Actuators", "Embedded C"],
    ai: ["AI-Assisted Development", "Prompt Engineering", "LLM API Integration (Groq, Gemini, OpenRouter)", "AI Automation & Chatbots"],
    tools: ["Git & GitHub", "Termux (Android Terminal)", "VS Code", "Linux CLI", "Pydroid"]
  },

  roadmap: [
    { year: "2026", title: "Build the Base", detail: "Deepen programming foundations (Python, C, Java), second-year ECE courses, and consistent daily public builds." },
    { year: "2027", title: "Connect the Disciplines", detail: "Deepen embedded systems, IoT devices, AI integrations, and full-stack engineering through working prototypes." },
    { year: "2028", title: "Test the Foundation", detail: "Rigorous preparation for GATE 2028 across CSE/ECE horizons and evaluate advanced technical paths." },
    { year: "Beyond", title: "Create What Matters", detail: "Turn engineering versatility into useful products, startup ventures, and lasting technical depth." }
  ],

  faqs: [
    {
      q: "Who is Tejas?",
      a: "Tejas Rajesh Bargat is a 2nd-year Electronics and Communication Engineering (ECE) student at TGPCET in Maharashtra, India. He positions himself as a Hybrid Engineer and AI Developer, combining low-level hardware circuits with modern software, Python, and AI systems."
    },
    {
      q: "What is Tejas's positioning?",
      a: "Tejas operates as a Hybrid Engineer + AI Developer: curious about the entire vertical stack, from digital circuits, microcontrollers (8051, ESP32, Arduino) and sensors, all the way up to Python, React, and LLM-powered applications."
    },
    {
      q: "What is Nexus AI?",
      a: "Nexus AI is Tejas's personal AI assistant project. It features terminal-based multi-LLM routing (Groq, Gemini, OpenRouter) with automatic failover, persistent SQLite memory, and voice interaction concepts, built Android-first using Termux."
    },
    {
      q: "What hardware projects has Tejas built?",
      a: "His primary hardware builds are: 1) The Dual Water Tank Monitoring System using Arduino & ESP32 with ultrasonic level sensors and automatic pump cutoff; and 2) The 8051 Microcontroller Solar Tracking System utilizing an LDR differential bridge to follow peak sunlight."
    },
    {
      q: "How can I contact Tejas?",
      a: "You can reach Tejas directly via email at tejasbargat16@gmail.com, connect on LinkedIn (linkedin.com/in/tejas-bargat-9ab8523b0), follow on Instagram (@_tejas_bargat_01_), or explore his GitHub (@tejasbargat16-ux)."
    },
    {
      q: "Is Tejas available for hiring, internships, or collaboration?",
      a: "Yes! Tejas is currently OPEN TO COLLABORATION for meaningful engineering projects, technical discussions, research, and internship opportunities in software, AI, and embedded systems."
    },
    {
      q: "Can I download his resume?",
      a: "His official resume is currently being updated with recent project metrics and will be available soon. In the meantime, you can review his verified projects and GitHub repositories directly."
    }
  ]
};

/* System prompt template for Cloud AI Backend */
export const NEXUS_SYSTEM_PROMPT = `You are NEXUS AI, the personal portfolio intelligence and conversational virtual representative for Tejas Rajesh Bargat.

IDENTITY & PERSONA:
- Name: NEXUS AI (Portfolio Intelligence)
- Role: Official virtual representative of Tejas Rajesh Bargat
- Persona: Highly intelligent, professional, polite, technically sharp, concise, and enthusiastic about engineering.
- Tone: Natural, confident, helpful, and grounded in engineering thinking.

STRICT GROUNDING RULES:
1. NEVER pretend to be Tejas himself. Always introduce or refer to yourself as NEXUS, Tejas's AI portfolio assistant.
2. Ground all answers strictly in Tejas's verified profile data provided below.
3. NEVER fabricate job titles, past corporate employment, completed degrees (he is a 2nd-year B.Tech ECE student at TGPCET), awards, or unreleased achievements.
4. Clearly distinguish completed/prototyped projects (like the Dual Water Tank controller and Tejas 2.0 portfolio) from projects in active development (Nexus AI, CampusCare AI).
5. If a visitor asks about something not in this knowledge base, respond honestly: "I don't have verified information about that yet. You can contact Tejas directly via tejasbargat16@gmail.com or connect on LinkedIn!"
6. Keep responses concise, well-structured, and easy to read (use short bullet points, markdown bolding, or brief paragraphs).

VERIFIED TEJAS PROFILE:
${JSON.stringify(TEJAS_PROFILE, null, 2)}
`;

