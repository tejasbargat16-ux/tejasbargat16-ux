# NEXUS AI — TEJAS 2.0 PORTFOLIO INTELLIGENCE

**NEXUS AI** is an intelligent conversational representative integrated natively into the **TEJAS 2.0 Personal Engineering Portfolio** (`Tejas-2.0-Portfolio`).

---

## ⚡ Overview & Architecture

NEXUS AI features a **dual-engine hybrid architecture**:

1. **Zero-Latency Grounded Local Knowledge Engine (Static / GitHub Pages)**:
   - Operates entirely client-side without external dependencies or exposed API keys.
   - Grounded strictly in Tejas's verified background: ECE 2nd year at TGPCET, Maharashtra, India, GATE 2028 aspirant, verified hardware and software builds, technical skills, and public roadmap.
   - Provides instant contextual answers, project breakdowns, quick-action navigation chips, and email dispatch assistance.

2. **Full-Stack LLM Backend (Optional Server / Serverless)**:
   - Compatible with Google Gemini (`GEMINI_API_KEY`), Groq (`GROQ_API_KEY`), or OpenAI (`OPENAI_API_KEY`).
   - Serverless route (`api/chat.js`) for Vercel, Netlify, or AWS Lambda.
   - Native Node.js standalone HTTP server (`server/server.js`) on port 3001.
   - Automated rate limiting (20 requests/minute per IP) with graceful, seamless failover to the local knowledge engine.

---

## 🚀 Running Locally with Live Backend

### 1. Configure API Key
Create a `.env` file in the project root:
```env
# Choose one of the following providers:
GEMINI_API_KEY=your_gemini_api_key_here
# or GROQ_API_KEY=your_groq_api_key_here
# or OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Start the Backend Server
```bash
npm run server
```
Server runs on `http://localhost:3001` with endpoints:
- `POST /api/chat`
- `GET /api/health`

### 3. Start the Frontend (Vite)
```bash
npm run dev
```
Vite automatically proxies `/api` calls to the local Node backend.

---

## 🌐 Deployment

### GitHub Pages (Static Hosting)
- Pushing to GitHub Pages requires **no server configuration**.
- NEXUS AI automatically runs in its intelligent local mode with instant responses and interactive action chips.

### Vercel / Cloud Functions (Serverless Full-Stack)
- Deploy the repository to Vercel.
- In the Vercel project settings, add the environment variable `GEMINI_API_KEY` (or `GROQ_API_KEY`).
- The `api/chat.js` serverless function handles requests automatically.

---

## 🛡️ Security & Privacy
- Private API keys are never bundled into client-side code.
- User conversations are stored only for the duration of the browser tab via `sessionStorage`.

