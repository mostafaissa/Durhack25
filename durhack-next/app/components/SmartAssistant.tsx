"use client";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  who: "user" | "ai" | "ai-typing";
  text: string;
  time?: string;
};

export default function SmartAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      who: "ai",
      text: "Good morning! I've prepared your schedule for today.",
      time: formatTime(new Date()),
    },
    {
      who: "user",
      text: "Thank you, Donna. What's my first meeting?",
      time: formatTime(new Date()),
    },
    {
      who: "ai",
      text: "Your first meeting is with the Morrison case team at 10:30 AM in Conference Room A.",
      time: formatTime(new Date()),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    const el = chatBoxRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      who: "user",
      text,
      time: formatTime(new Date()),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Add typing indicator
    const typingMsg: Message = {
      who: "ai-typing",
      text: "Donna is typing...",
      time: formatTime(new Date()),
    };
    setMessages((m) => [...m, typingMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text }),
      });
      const payload = await res.json();
      const aiText =
        payload?.text ||
        payload?.message ||
        `I've received your message: '${text}'. (no backend)`;

      // Remove typing indicator and append AI response
      setMessages((m) => {
        const withoutTyping = m.filter((mm) => mm.who !== "ai-typing");
        return [
          ...withoutTyping,
          { who: "ai", text: String(aiText), time: formatTime(new Date()) },
        ];
      });
    } catch (err: any) {
      setMessages((m) => {
        const withoutTyping = m.filter((mm) => mm.who !== "ai-typing");
        return [
          ...withoutTyping,
          {
            who: "ai",
            text: "Error: " + (err?.message || String(err)),
            time: formatTime(new Date()),
          },
        ];
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="card full-height">
        <div className="card-header">
          <h3>Executive Assistant</h3>
          <span className="status-active">
            <span className="dot"></span> Active
          </span>
        </div>

        <div className="card-body chat-box" id="chat-box" ref={chatBoxRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-message ${
                m.who === "ai" ? "ai" : m.who === "user" ? "user" : "ai-typing"
              }`}
            >
              <p>{m.text}</p>
              <span className="timestamp">{m.time}</span>
            </div>
          ))}
        </div>

        <form
          className="chat-input-form"
          id="chat-form"
          onSubmit={handleSubmit}
        >
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            aria-label="Chat input"
          />
          <button type="submit" className="btn-send" aria-label="Send message">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
