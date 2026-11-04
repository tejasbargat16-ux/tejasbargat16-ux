/* ==========================================================================
   NEXUS AI — EXPRESS BACKEND SERVER (server/server.js)
   Node.js + Express backend powered by official @google/genai SDK
   Environment: GEMINI_API_KEY
   Features: Rate limiting, input validation, CORS restrictions, error handling
   ========================================================================== */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { NEXUS_SYSTEM_PROMPT } from "../src/nexus/knowledgeBase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Allowed CORS origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["*"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Request origin blocked by CORS policy."));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50kb" }));

// In-memory sliding window rate limiter per client IP
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 30; // Max 30 requests per minute

function rateLimiter(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "anonymous";
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + RATE_LIMIT_WINDOW;
  } else {
    entry.count += 1;
  }

  rateLimitMap.set(ip, entry);

  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: "Rate limit exceeded. Please wait a moment before sending more messages.",
    });
  }
  next();
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "NEXUS — AI Portfolio Assistant Backend",
    engine: "Google Gen AI (@google/genai)",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint
app.post("/api/chat", rateLimiter, async (req, res) => {
  const { message, history } = req.body || {};

  // Request validation
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message must be a non-empty string." });
  }

  const cleanMessage = message.trim();
  if (cleanMessage.length > 2000) {
    return res.status(400).json({
      error: "Message exceeds maximum allowed character length (2000 characters).",
    });
  }

  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    return res.status(503).json({
      error: "GEMINI_API_KEY is not configured on the backend server. Falling back to local knowledge engine.",
      fallback: true,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    // Prepare contents array adhering to Google Gen AI schemas
    const contents = [];

    // System prompt grounding
    contents.push({
      role: "user",
      parts: [
        {
          text: `${NEXUS_SYSTEM_PROMPT}\n\nPlease acknowledge and adhere strictly to these instructions as NEXUS AI.`,
        },
      ],
    });

    contents.push({
      role: "model",
      parts: [
        {
          text: "Understood. I am NEXUS, Tejas Rajesh Bargat's AI portfolio assistant. I am ready to assist visitors accurately based solely on his verified engineering projects, skills, education, and roadmap.",
        },
      ],
    });

    // Add recent conversational context
    if (Array.isArray(history)) {
      history.slice(-8).forEach((item) => {
        if (item && item.content) {
          contents.push({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: String(item.content) }],
          });
        }
      });
    }

    // Append current user message
    contents.push({
      role: "user",
      parts: [{ text: cleanMessage }],
    });

    // Call @google/genai SDK with modern flash model and fallback
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });
    } catch (modelErr) {
      console.warn("Primary model failed, attempting gemini-1.5-flash fallback:", modelErr.message);
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents,
      });
    }

    const replyText =
      response.text ||
      (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) ||
      "";

    if (!replyText) {
      throw new Error("Empty response received from Gemini API.");
    }

    return res.json({ reply: replyText });
  } catch (err) {
    console.error("NEXUS Backend Error (Gemini):", err);
    return res.status(500).json({
      error: "Gemini API error: " + (err.message || "Unknown error"),
      fallback: true,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start Express server
const server = app.listen(PORT, () => {
  console.log(`[NEXUS AI] Express server active at http://localhost:${PORT}`);
  console.log(`[NEXUS AI] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[NEXUS AI] Gemini API Key present: ${Boolean(process.env.GEMINI_API_KEY)}`);
});

export default app;
