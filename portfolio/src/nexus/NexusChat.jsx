/* ==========================================================================
   NEXUS AI — CONVERSATIONAL PORTFOLIO CHATBOT
   Component: NexusChat.jsx
   Autonomous, interactive conversational AI representing Tejas Rajesh Bargat
   ========================================================================== */

import { useState, useEffect, useRef } from "react";
import { askNexusAI } from "./nexusService";
import "./nexus.css";

const INITIAL_WELCOME = {
  id: "welcome-msg",
  sender: "nexus",
  text: "Hey! I'm NEXUS, Tejas's AI portfolio assistant.\n\nI can help you explore his engineering background, technical skills, projects, learning journey and professional profiles.\n\nWhat would you like to discover?",
  timestamp: "Just now",
  actions: [
    { label: "Who is Tejas?", query: "Who is Tejas?" },
    { label: "What projects has he built?", query: "What projects has he built?" },
    { label: "What are his technical skills?", query: "What are his technical skills?" },
    { label: "Tell me about Nexus AI.", query: "Tell me about Nexus AI" },
    { label: "Explore his GitHub.", url: "https://github.com/tejasbargat16-ux" },
    { label: "How can I contact him?", query: "How can I contact him?" },
  ],
};

const SUGGESTED_QUICK_PROMPTS = [
  "Who is Tejas?",
  "What projects has he built?",
  "What are his technical skills?",
  "Tell me about Nexus AI",
  "Explore his GitHub",
  "How can I contact him?",
];

export default function NexusChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem("nexus_chat_history");
      return saved ? JSON.parse(saved) : [INITIAL_WELCOME];
    } catch {
      return [INITIAL_WELCOME];
    }
  });
  const [hasUnread, setHasUnread] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Check speech recognition capability
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      } catch (e) {
        console.warn("Speech recognition init failed:", e);
      }
    }
  }, []);

  // Save session messages
  useEffect(() => {
    try {
      sessionStorage.setItem("nexus_chat_history", JSON.stringify(messages));
    } catch (e) {
      console.warn("Session storage failed:", e);
    }
  }, [messages]);

  // Scroll to bottom on message change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
      setHasUnread(false);
    }
  }, [isOpen, isMinimized]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleToggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  const handleResetConversation = () => {
    setMessages([INITIAL_WELCOME]);
    sessionStorage.removeItem("nexus_chat_history");
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Speech start error:", err);
      }
    }
  };

  const handleSend = async (messageText = null) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build history for context
      const historyContext = messages
        .filter((m) => m.id !== "welcome-msg")
        .map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));

      const response = await askNexusAI(textToSend, historyContext);

      const nexusMsg = {
        id: `nexus-${Date.now()}`,
        sender: "nexus",
        text: response.reply,
        actions: response.actions,
        source: response.source,
        timestamp: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, nexusMsg]);

      if (!isOpen) {
        setHasUnread(true);
      }
    } catch (err) {
      const errorMsg = {
        id: `err-${Date.now()}`,
        sender: "nexus",
        isError: true,
        text: "I encountered an issue processing your request. Please try again or reach out to Tejas directly at tejasbargat16@gmail.com.",
        timestamp: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="nexus-chat-root">
      {/* 1. Floating Launcher Button */}
      {!isOpen && (
        <button
          className="nexus-launcher"
          onClick={handleOpen}
          aria-label="Open NEXUS — AI Portfolio Assistant"
          aria-expanded={isOpen}
        >
          <div className="nexus-launcher-glow" />
          <div className="nexus-launcher-badge">
            <span className="nexus-online-dot" />
            <span className="nexus-launcher-text">NEXUS AI</span>
          </div>
          <div className="nexus-launcher-icon">
            <NexusSparkleIcon />
          </div>
          {hasUnread && <span className="nexus-unread-dot" />}
        </button>
      )}

      {/* 2. Interactive Chat Panel */}
      {isOpen && (
        <div
          className={`nexus-panel ${isMinimized ? "minimized" : ""}`}
          role="dialog"
          aria-label="NEXUS AI Portfolio Intelligence"
        >
          {/* Header */}
          <div className="nexus-header">
            <div className="nexus-header-brand" onClick={handleToggleMinimize}>
              <div className="nexus-avatar">
                <NexusSparkleIcon />
                <span className="nexus-status-indicator" />
              </div>
              <div className="nexus-header-text">
                <div className="nexus-title-row">
                  <span className="nexus-title">NEXUS</span>
                  <span className="nexus-online-tag">ONLINE</span>
                </div>
                <span className="nexus-subtitle">AI PORTFOLIO ASSISTANT</span>
              </div>
            </div>

            <div className="nexus-header-controls">
              <button
                type="button"
                className="nexus-control-btn"
                onClick={handleResetConversation}
                title="New Conversation"
                aria-label="Start new conversation"
              >
                <ReloadIcon />
              </button>
              <button
                type="button"
                className="nexus-control-btn"
                onClick={handleToggleMinimize}
                title={isMinimized ? "Expand" : "Minimize"}
                aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
              >
                {isMinimized ? "▢" : "—"}
              </button>
              <button
                type="button"
                className="nexus-control-btn close"
                onClick={handleClose}
                title="Close"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body (Hidden if Minimized) */}
          {!isMinimized && (
            <>
              {/* Messages Stream */}
              <div className="nexus-messages-stream">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`nexus-message-row ${
                      msg.sender === "user" ? "user-row" : "nexus-row"
                    }`}
                  >
                    {msg.sender === "nexus" && (
                      <div className="nexus-msg-avatar" aria-hidden="true">
                        N×
                      </div>
                    )}

                    <div className="nexus-message-bubble-wrap">
                      <div
                        className={`nexus-bubble ${
                          msg.sender === "user" ? "user-bubble" : "nexus-bubble-ai"
                        } ${msg.isError ? "error-bubble" : ""}`}
                      >
                        <FormattedMessage text={msg.text} />

                        {/* Interactive Action Buttons */}
                        {msg.actions && msg.actions.length > 0 && (
                          <div className="nexus-message-actions">
                            {msg.actions.map((act, i) =>
                              act.url ? (
                                <a
                                  key={i}
                                  href={act.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="nexus-action-btn link"
                                >
                                  {act.label} ↗
                                </a>
                              ) : (
                                <button
                                  key={i}
                                  type="button"
                                  className="nexus-action-btn"
                                  onClick={() => handleSend(act.query || act.label)}
                                >
                                  {act.label}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>

                      <div className="nexus-message-meta">
                        <span className="nexus-msg-time">{msg.timestamp}</span>
                        {msg.sender === "nexus" && !msg.isError && (
                          <button
                            type="button"
                            className="nexus-copy-btn"
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            title="Copy response"
                          >
                            {copiedId === msg.id ? "Copied ✓" : "Copy"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading / Typing Indicator */}
                {isLoading && (
                  <div className="nexus-message-row nexus-row">
                    <div className="nexus-msg-avatar" aria-hidden="true">
                      N×
                    </div>
                    <div className="nexus-typing-bubble">
                      <span className="nexus-dot" />
                      <span className="nexus-dot" />
                      <span className="nexus-dot" />
                      <span className="nexus-typing-label">NEXUS is thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Carousel */}
              <div className="nexus-suggestions-tray">
                <span className="nexus-tray-hint">SUGGESTED:</span>
                <div className="nexus-suggestions-scroll">
                  {SUGGESTED_QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="nexus-suggestion-pill"
                      onClick={() => handleSend(prompt)}
                      disabled={isLoading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="nexus-input-area">
                <textarea
                  ref={inputRef}
                  className="nexus-input-field"
                  rows="1"
                  placeholder="Ask NEXUS anything about Tejas..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                />

                <div className="nexus-input-controls">
                  {speechSupported && (
                    <button
                      type="button"
                      className={`nexus-icon-btn ${isListening ? "active-mic" : ""}`}
                      onClick={toggleSpeechRecognition}
                      title={isListening ? "Stop listening" : "Voice input"}
                      aria-label="Voice input"
                    >
                      <MicrophoneIcon />
                    </button>
                  )}

                  <button
                    type="button"
                    className="nexus-send-btn"
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Message text renderer with basic markdown parser for bold, bullet points, code & links
 */
function FormattedMessage({ text }) {
  if (!text) return null;

  const lines = text.split("\n");
  return (
    <div className="nexus-formatted-text">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="nexus-line-break" />;
        }

        // Bullet point
        if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("* ")) {
          const content = trimmed.replace(/^[•\-\*]\s*/, "");
          return (
            <div key={idx} className="nexus-bullet-point">
              <span className="bullet-sym">•</span>
              <span>{parseInlineMarkdown(content)}</span>
            </div>
          );
        }

        return <p key={idx}>{parseInlineMarkdown(line)}</p>;
      })}
    </div>
  );
}

function parseInlineMarkdown(text) {
  // Regex parsing for bold **text**, links [text](url), and inline code `code`
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("[") && token.includes("](")) {
      const splitIdx = token.indexOf("](");
      const linkText = token.slice(1, splitIdx);
      const linkUrl = token.slice(splitIdx + 2, -1);
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="nexus-inline-link"
        >
          {linkText}
        </a>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      parts.push(<code key={match.index}>{token.slice(1, -1)}</code>);
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ---- Minimal Inline SVG Icons ---- */
function NexusSparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function ReloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

