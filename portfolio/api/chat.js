/* ==========================================================================
   NEXUS AI — SERVERLESS API ENDPOINT (api/chat.js)
   Compatible with Vercel, Netlify, and Cloud Functions runtimes
   Powered by official @google/genai SDK
   ========================================================================== */

import { GoogleGenAI } from "@google/genai";
import { NEXUS_SYSTEM_PROMPT } from "../src/nexus/knowledgeBase.js";

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 30;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

  if (now > entry.resetTime) {
    entry.count = 1;
    entry.resetTime = now + RATE_LIMIT_WINDOW;
  } else {
    entry.count += 1;
  }

  rateLimitMap.set(ip, entry);
  return entry.count <= MAX_REQUESTS;
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const clientIp = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "anonymous";
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: "Rate limit exceeded. Please wait a moment before sending more messages.",
    });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message must be a non-empty string." });
  }

  const cleanMessage = message.trim();
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    return res.status(503).json({
      error: "GEMINI_API_KEY is not configured on the server. Falling back to local knowledge engine.",
      fallback: true,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: geminiKey });

    const contents = [
      {
        role: "user",
        parts: [{ text: `${NEXUS_SYSTEM_PROMPT}\n\nPlease acknowledge and adhere strictly to these guidelines as NEXUS AI.` }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am NEXUS, Tejas's AI portfolio assistant. I will provide accurate answers grounded strictly in his verified background." }],
      },
    ];

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

    contents.push({
      role: "user",
      parts: [{ text: cleanMessage }],
    });

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
      });
    } catch {
      response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents,
      });
    }

    const reply =
      response.text ||
      (response.candidates && response.candidates[0]?.content?.parts?.[0]?.text) ||
      "";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("NEXUS Serverless Error:", err);
    return res.status(500).json({
      error: "Failed to generate AI response: " + (err.message || "Unknown error"),
      fallback: true,
    });
  }
}
