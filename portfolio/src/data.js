/* ==========================================================================
   TEJAS 2.0 PORTFOLIO — DATA STORE
   Authentic project telemetry, skill taxonomy, and journey milestones
   Owner: Tejas Rajesh Bargat (TGPCET ECE · Year 02)
   ========================================================================== */

import nexusAiImg from "./assets/projects/nexus-ai-overview.png";
import waterTankImg from "./assets/projects/water-tank-hardware.png";
import solarTrackerImg from "./assets/projects/solar-tracker.jpg";
import portfolioImg from "./assets/projects/tejas-portfolio.png";
import pythonJourneyImg from "./assets/projects/python-journey.png";
import campusCareImg from "./assets/projects/campuscare-ai.jpg";

export const github = "https://github.com/tejasbargat16-ux";
export const linkedin = "https://www.linkedin.com/in/tejas-bargat-9ab8523b0/";
export const instagram = "https://www.instagram.com/_tejas_bargat_01_/";
export const email = "tejasbargat16@gmail.com";
export const location = "Maharashtra, India";

/* ---- Featured Projects (Proof of Work) ---- */
export const projects = [
  {
    id: "nexus-ai",
    number: "01",
    title: "Nexus AI",
    subtitle: "Personal AI Assistant",
    category: "AI Assistant / Software",
    kicker: "01 · AI ASSISTANT / SOFTWARE",
    status: "BUILDING",
    image: nexusAiImg,
    badge: "TERMUX · MULTI-LLM",
    description:
      "A mobile-first personal AI assistant concept inspired by intelligent assistant systems, exploring conversational interaction, memory architecture, web search integration, and modular plugins.",
    capabilities: [
      "Conversational AI interface",
      "Voice interaction",
      "Web search integration",
      "Memory architecture",
      "Modular plugin architecture",
      "Mobile-first experience"
    ],
    tags: ["Python", "AI APIs", "Termux", "FastAPI", "SQLite"],
    repo: "https://github.com/tejasbargat16-ux/Nexus-AIOS",
    demo: null,
    tone: "ai",
    symbol: "N×"
  },
  {
    id: "water-tank",
    number: "02",
    title: "Dual Water Tank Monitoring System",
    subtitle: "Automated Fluid Level & Pump Control",
    category: "Electronics / IoT",
    kicker: "02 · ELECTRONICS / IOT",
    status: "PROTOTYPED",
    image: waterTankImg,
    badge: "ESP32 · HARDWARE PROTOTYPE",
    description:
      "Two-tank water monitoring and automatic motor control system with sensor-based level detection, visual RGB status indicators, and audible buzzer alerts with overflow protection.",
    capabilities: [
      "Two-tank water monitoring",
      "Real-time level sensing",
      "Visual RGB status indication",
      "Audible threshold alerts",
      "Automatic motor-cutoff relay logic"
    ],
    tags: ["Arduino UNO", "ESP32", "Sensors", "Embedded C", "Relay Control"],
    repo: "https://github.com/tejasbargat16-ux/water-tank-auto-controller",
    demo: null,
    tone: "water",
    symbol: "≈"
  },
  {
    id: "solar-tracker",
    number: "03",
    title: "Solar Tracking System",
    subtitle: "Light-Seeking Energy Automation",
    category: "Embedded Systems",
    kicker: "03 · EMBEDDED SYSTEMS",
    status: "PROTOTYPE",
    image: solarTrackerImg,
    badge: "8051 MCU · SCHEMATIC",
    description:
      "An 8051 microcontroller-based solar tracking concept utilizing light-dependent resistor (LDR) differential sensing and motor-driver control logic to follow peak sunlight.",
    capabilities: [
      "Solar tracking concept",
      "Differential LDR sensing",
      "Microcontroller-based motor control",
      "Energy harvesting optimization"
    ],
    tags: ["8051 MCU", "LDR Sensors", "Stepper Motor", "Embedded C", "Automation"],
    repo: "https://github.com/tejasbargat16-ux",
    demo: null,
    tone: "solar",
    symbol: "☼"
  },
  {
    id: "tejas-portfolio",
    number: "04",
    title: "Tejas 2.0 Portfolio",
    subtitle: "Engineering Brand & Technical Showcase",
    category: "Web Development / Personal Branding",
    kicker: "04 · WEB DEVELOPMENT / BRANDING",
    status: "DEPLOYED",
    image: portfolioImg,
    badge: "LIVE WEB APP · REACT 19",
    description:
      "A responsive personal engineering portfolio showcasing skills, hardware builds, AI experiments, public learning streaks, and architectural design language.",
    capabilities: [
      "Editorial two-column hero architecture",
      "Dark cinematic engineering aesthetic",
      "Authentic project telemetry",
      "Responsive cross-device layout"
    ],
    tags: ["React 19", "Vite", "JavaScript", "Modern CSS", "GitHub Pages"],
    repo: "https://github.com/tejasbargat16-ux/Tejas-2.0-Portfolio",
    demo: "https://tejasbargat16-ux.github.io/Tejas-2.0-Portfolio/",
    tone: "portfolio",
    symbol: "TB"
  },
  {
    id: "learning-journey",
    number: "05",
    title: "Programming Learning Journey",
    subtitle: "Daily Public Coding & Fundamentals",
    category: "Software Development",
    kicker: "05 · SOFTWARE DEVELOPMENT",
    status: "ACTIVE LEARNING",
    image: pythonJourneyImg,
    badge: "PUBLIC STREAK · DAILY BUILDS",
    description:
      "A disciplined day-by-day public learning journey covering Python, Java, JavaScript, and C fundamentals, LeetCode problem solving, and practical micro-builds committed to GitHub.",
    capabilities: [
      "Python Learning Journey (Day 13+)",
      "Java Learning Journey on Android/Termux",
      "JavaScript DOM & API practices",
      "LeetCode problem-solving practice"
    ],
    tags: ["Python", "Java", "JavaScript", "C", "Termux", "Git"],
    repo: "https://github.com/tejasbargat16-ux/Python-Learning-Journey",
    demo: null,
    tone: "python",
    symbol: "PY"
  },
  {
    id: "campuscare-ai",
    number: "06",
    title: "CampusCare AI",
    subtitle: "AI-Powered Complaint Management",
    category: "AI / Product Development",
    kicker: "06 · AI / PRODUCT DEVELOPMENT",
    status: "BUILDING",
    image: campusCareImg,
    badge: "FLUTTER + FASTAPI · UI",
    description:
      "An AI-powered campus complaint management platform combining Flutter mobile frontend with FastAPI backend, featuring role-based access, issue tracking, image uploads, priority analysis, and admin dashboards.",
    capabilities: [
      "Flutter mobile UI",
      "FastAPI asynchronous backend",
      "AI-assisted priority classification",
      "Role-based administrative dashboards",
      "Photo attachment & issue tracking"
    ],
    tags: ["Flutter", "FastAPI", "Python", "AI Priority Analysis", "REST APIs"],
    repo: "https://github.com/tejasbargat16-ux/campuscareai_edition",
    demo: null,
    tone: "ai",
    symbol: "CC"
  }
];

/* ---- Technical Skills (Taxonomy & Categories) ---- */
export const skillCategories = [
  {
    id: "all",
    label: "ALL AREAS",
    count: 36
  },
  {
    id: "programming",
    label: "PROGRAMMING",
    count: 7
  },
  {
    id: "web",
    label: "WEB DEVELOPMENT",
    count: 6
  },
  {
    id: "embedded",
    label: "ELECTRONICS & EMBEDDED",
    count: 12
  },
  {
    id: "ai",
    label: "AI & TECHNOLOGY",
    count: 5
  },
  {
    id: "tools",
    label: "DEV ENVIRONMENT",
    count: 6
  },
  {
    id: "professional",
    label: "PROFESSIONAL",
    count: 5
  }
];

export const skillsData = [
  /* A. Programming */
  { name: "C", category: "programming", status: "ACTIVE PRACTICE", detail: "Syntax, pointers & memory concepts in Termux" },
  { name: "C++", category: "programming", status: "BUILDING", detail: "OOP principles, logic & problem solving" },
  { name: "Python", category: "programming", status: "DAILY PRACTICE", detail: "Day 13+ streak, automation & scripting" },
  { name: "Java", category: "programming", status: "ACTIVE PRACTICE", detail: "Core Java, OOP & Date-Time API on Termux" },
  { name: "JavaScript", category: "programming", status: "BUILDING", detail: "ES6+, asynchronous logic & DOM manipulation" },
  { name: "HTML", category: "programming", status: "FOUNDATION", detail: "Semantic document structure & accessibility" },
  { name: "CSS", category: "programming", status: "FOUNDATION", detail: "Layouts, flexbox, grid & modern styling" },

  /* B. Web Development */
  { name: "HTML5", category: "web", status: "FOUNDATION", detail: "Modern semantic markup & media elements" },
  { name: "CSS3", category: "web", status: "BUILDING", detail: "Custom properties, animations & responsive styling" },
  { name: "JavaScript (DOM)", category: "web", status: "BUILDING", detail: "Interactive UI logic & event handling" },
  { name: "Responsive Design", category: "web", status: "BUILDING", detail: "Fluid layouts across mobile, tablet & desktop" },
  { name: "Frontend Development", category: "web", status: "BUILDING", detail: "Component architecture & clean UI systems" },
  { name: "Git and GitHub", category: "web", status: "ACTIVE PRACTICE", detail: "Version control, branching & public repository logs" },

  /* C. Electronics & Embedded Systems */
  { name: "Digital Electronics", category: "embedded", status: "CORE STUDY", detail: "Logic gates, flip-flops, boolean algebra & registers" },
  { name: "Digital Circuit Design", category: "embedded", status: "CORE STUDY", detail: "Combinational & sequential circuit architecture" },
  { name: "Microcontrollers", category: "embedded", status: "BUILDING", detail: "Internal architecture, registers & I/O interfacing" },
  { name: "8051 Microcontroller", category: "embedded", status: "BUILDING", detail: "Assembly & Embedded C, timers, counters & interrupts" },
  { name: "Arduino UNO", category: "embedded", status: "PRACTICE", detail: "Prototyping, sensor integration & actuator control" },
  { name: "ESP32", category: "embedded", status: "BUILDING", detail: "Dual-core processing, Wi-Fi & Bluetooth applications" },
  { name: "ESP8266", category: "embedded", status: "BUILDING", detail: "Wi-Fi client/server communication & IoT nodes" },
  { name: "Sensors & Interfacing", category: "embedded", status: "PRACTICE", detail: "LDR, ultrasonic, temperature & moisture sensors" },
  { name: "Internet of Things (IoT)", category: "embedded", status: "EXPLORING", detail: "Telemetry transmission & remote device monitoring" },
  { name: "Embedded C", category: "embedded", status: "BUILDING", detail: "Hardware register manipulation & firmware logic" },
  { name: "Basic Circuit Design", category: "embedded", status: "PRACTICE", detail: "Schematic reading, breadboarding & power regulation" },
  { name: "Automation Systems", category: "embedded", status: "BUILDING", detail: "Sensor-actuator closed loop control mechanisms" },

  /* D. AI & Technology */
  { name: "AI-assisted development", category: "ai", status: "ACTIVE PRACTICE", detail: "Accelerating debugging, ideation & system design" },
  { name: "Prompt Engineering", category: "ai", status: "PRACTICE", detail: "Structured prompting, context windows & system prompts" },
  { name: "AI Application Dev", category: "ai", status: "EXPLORING", detail: "API integration (Groq, Gemini, OpenRouter)" },
  { name: "AI Automation", category: "ai", status: "EXPLORING", detail: "Intelligent background workflows & CLI assistants" },
  { name: "AI Product Prototyping", category: "ai", status: "BUILDING", detail: "Turning concept models into functional prototypes" },

  /* E. Development Environment */
  { name: "VS Code", category: "tools", status: "PRIMARY IDE", detail: "Extensions, linting & remote server workflows" },
  { name: "Git", category: "tools", status: "DAILY USE", detail: "Command-line version control & sync management" },
  { name: "GitHub", category: "tools", status: "DAILY USE", detail: "Open-source tracking, portfolio & documentation" },
  { name: "Termux", category: "tools", status: "CORE WORKFLOW", detail: "Linux environment on Android for full terminal dev" },
  { name: "Pydroid", category: "tools", status: "PRACTICE", detail: "Mobile Python testing & rapid script prototyping" },
  { name: "Android Dev Environment", category: "tools", status: "CORE WORKFLOW", detail: "Mobile-first coding, compiling & syncing to laptop" },

  /* F. Professional Development */
  { name: "Communication", category: "professional", status: "DEVELOPING", detail: "Explaining technical concepts with clarity and honesty" },
  { name: "Problem Solving", category: "professional", status: "DEVELOPING", detail: "Deconstructing complex problems into discrete steps" },
  { name: "Technical Presentation", category: "professional", status: "DEVELOPING", detail: "Presenting hardware and software builds effectively" },
  { name: "Entrepreneurship", category: "professional", status: "ACTIVE INTEREST", detail: "Identifying real-world friction and market utility" },
  { name: "Product Thinking", category: "professional", status: "DEVELOPING", detail: "Focusing on user benefit rather than vanity features" }
];

/* ---- About Me: 4 Information Blocks ---- */
export const aboutBlocks = [
  {
    code: "01",
    title: "ENGINEERING",
    desc: "Electronics, digital systems, and embedded technology."
  },
  {
    code: "02",
    title: "SOFTWARE",
    desc: "Programming, web development, and software engineering."
  },
  {
    code: "03",
    title: "INTELLIGENCE",
    desc: "AI experiments, automation, and intelligent applications."
  },
  {
    code: "04",
    title: "ENTREPRENEURSHIP",
    desc: "Product thinking, innovation, and turning ideas into practical solutions."
  }
];

/* ---- Build Journey: 5 Chronological Phases ---- */
export const journeyPhases = [
  {
    phase: "PHASE 01",
    title: "FOUNDATION",
    subtitle: "First Principles & Circuit Theory",
    description:
      "Grounding in engineering fundamentals: basic electronics, semiconductor devices, digital circuit logic, boolean reduction, and developing structured problem-solving habits.",
    points: [
      "Engineering fundamentals",
      "Electronics and digital circuits",
      "Programming fundamentals",
      "Learning problem-solving"
    ],
    status: "COMPLETE"
  },
  {
    phase: "PHASE 02",
    title: "SOFTWARE DEVELOPMENT",
    subtitle: "Languages, Syntax & Public Commits",
    description:
      "Deepening practical programming across languages—building discipline with daily Python streaks, Java on Termux, web technologies, and managing repositories with Git and GitHub.",
    points: [
      "Python daily practice (Streak 13+)",
      "C++ logic and memory structures",
      "Java on mobile/terminal (Termux)",
      "JavaScript, HTML & CSS web foundations",
      "Git and GitHub version control"
    ],
    status: "ACTIVE"
  },
  {
    phase: "PHASE 03",
    title: "HARDWARE & EMBEDDED",
    subtitle: "Microcontrollers, Sensors & Actuators",
    description:
      "Bridging logic with physical consequence through 8051 assembly and Embedded C, Arduino UNO sensor integrations, ESP32/ESP8266 Wi-Fi connectivity, and hardware breadboarding.",
    points: [
      "Arduino UNO level sensing & alerts",
      "8051 Microcontroller solar tracking",
      "ESP32 & ESP8266 IoT connectivity",
      "Sensors and physical interfacing",
      "Hardware circuit prototyping"
    ],
    status: "BUILDING"
  },
  {
    phase: "PHASE 04",
    title: "AI & PRODUCT DEVELOPMENT",
    subtitle: "Intelligent Interfaces & Real Utility",
    description:
      "Exploring applied artificial intelligence through the Nexus AI concept, CampusCare AI campus management system, prompt engineering, API routing, and product-focused problem solving.",
    points: [
      "Nexus AI assistant architecture",
      "CampusCare AI complaint platform",
      "AI-assisted application development",
      "Prompt engineering & API routing",
      "Product development & user empathy"
    ],
    status: "IN PROGRESS"
  },
  {
    phase: "PHASE 05",
    title: "NEXT CHAPTER",
    subtitle: "Depth, GATE 2028 & Entrepreneurship",
    description:
      "Preparing seriously for GATE 2028 across CSE/ECE domains while synthesizing embedded intelligence, full-stack ability, and entrepreneurial initiatives into tangible technology ventures.",
    points: [
      "Advanced engineering & GATE 2028",
      "Applied AI & machine learning depth",
      "Full-stack software engineering",
      "Embedded intelligence & edge AI",
      "Technological entrepreneurship"
    ],
    status: "ON HORIZON"
  }
];

/* ---- Engineering Lab: Experiments & Tests ---- */
export const labExperiments = [
  {
    code: "LAB-01",
    tag: "MCU-8051",
    title: "8051 Microcontroller Systems",
    desc: "Microcontroller fundamentals, timer/counter configuration, port interfacing, and motor control logic for automated light-seeking.",
    status: "PROTOTYPED"
  },
  {
    code: "LAB-02",
    tag: "IOT-ESP32",
    title: "Connected IoT Automation",
    desc: "ESP8266 and ESP32 wireless telemetry broadcasting, REST communication, and sensor data acquisition for smart utilities.",
    status: "IN PROGRESS"
  },
  {
    code: "LAB-03",
    tag: "DEV-TERMUX",
    title: "Mobile Terminal Toolchain",
    desc: "VS Code server, Termux, Git, and Pydroid workflows for productive compiling, testing, and Git synchronization directly on Android.",
    status: "ACTIVE"
  },
  {
    code: "LAB-04",
    tag: "AI-AGENTS",
    title: "AI Chatbot & Intent Routing",
    desc: "Terminal-based AI chatbot with multi-provider routing (Groq, Gemini, OpenRouter), intent detection, and persistent SQLite history.",
    status: "IN PROGRESS"
  },
  {
    code: "LAB-05",
    tag: "CIR-RELAY",
    title: "Water Tank Cutoff Relay Circuit",
    desc: "Level-sensing voltage divider with transistor-driven buzzer warning and relay-based AC pump automatic motor cutoff.",
    status: "PROTOTYPED"
  },
  {
    code: "LAB-06",
    tag: "SOL-AZIMUTH",
    title: "Solar Azimuth LDR Differential Bridge",
    desc: "Comparative analog sensing circuit measuring incident illumination delta to drive single/dual-axis alignment motors.",
    status: "PLANNED"
  }
];

/* ---- Career Roadmap ---- */
export const roadmap = [
  {
    year: "2026",
    title: "Build the Base",
    desc: "Strengthen programming fundamentals, second-year ECE courses, and consistent daily project building in public."
  },
  {
    year: "2027",
    title: "Connect the Disciplines",
    desc: "Deepen embedded systems, AI integrations, and full-stack engineering through practical, working prototypes."
  },
  {
    year: "2028",
    title: "Test the Foundation",
    desc: "Prepare rigorously for GATE 2028 across CSE/ECE interests and evaluate advanced technical horizons."
  },
  {
    year: "NEXT",
    title: "Create What Matters",
    desc: "Turn engineering range into useful products, startup experiments, and lasting technical depth."
  }
];

/* ---- Key Metrics / Quick Facts ---- */
export const stats = [
  { value: 2, label: "YEAR", detail: "B.Tech ECE · TGPCET" },
  { value: 6, label: "PROJECTS", detail: "Built & Building" },
  { value: 13, label: "DAYS+", detail: "Python Streak Log" },
  { value: 36, label: "SKILLS", detail: "Learning Areas" }
];

/* ---- Professional Interests ---- */
export const professionalInterests = [
  "Software Development",
  "Artificial Intelligence",
  "Electronics Engineering",
  "Embedded Systems",
  "IoT",
  "Entrepreneurship",
  "Technology Innovation"
];

/* ---- Social Connection Cards ---- */
export const socialCards = [
  {
    number: "01",
    label: "GITHUB",
    description: "Explore my repositories, programming practice and engineering projects.",
    buttonText: "EXPLORE GITHUB ↗",
    href: "https://github.com/tejasbargat16-ux",
    isExternal: true,
    platform: "github"
  },
  {
    number: "02",
    label: "LINKEDIN",
    description: "Connect with me professionally and explore my engineering journey.",
    buttonText: "CONNECT ON LINKEDIN ↗",
    href: "https://www.linkedin.com/in/tejas-bargat-9ab8523b0/",
    isExternal: true,
    platform: "linkedin"
  },
  {
    number: "03",
    label: "INSTAGRAM",
    description: "Follow my personal updates, creative work and activities.",
    buttonText: "FOLLOW ON INSTAGRAM ↗",
    href: "https://www.instagram.com/_tejas_bargat_01_/",
    isExternal: true,
    platform: "instagram"
  },
  {
    number: "04",
    label: "EMAIL",
    description: "Contact me for technical discussions, collaborations and interesting ideas.",
    buttonText: "SEND AN EMAIL ↗",
    href: "mailto:tejasbargat16@gmail.com",
    isExternal: false,
    platform: "email"
  }
];

/* ---- Verified Social Profiles ---- */
export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/tejasbargat16-ux",
    isExternal: true,
    platform: "github"
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tejas-bargat-9ab8523b0/",
    isExternal: true,
    platform: "linkedin"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_tejas_bargat_01_/",
    isExternal: true,
    platform: "instagram"
  },
  {
    label: "Email",
    href: "mailto:tejasbargat16@gmail.com",
    isExternal: false,
    platform: "email"
  }
];
