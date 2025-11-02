"use client";
import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  who: "user" | "ai";
  text: string;
  time?: string;
};

const donnaMessages = [
  "I’ve already prepared your schedule. You’re welcome. 💅",
  "Focus, Harvey. You can’t do everything at once. 🙄",
  "Not everything is about winning, sometimes it’s about surviving. 🤝",
  "I know exactly what you need before you even ask. ✨",
  "Don’t worry, I’ve got your back. Always. 🛡️",
  "I'm Donna. I know everything. 🤫",
  "The only person who should be telling me I can’t do something is me. Period. 👑",
  "If I were doing my job, you'd already have that. But I am, so you do. 😉",
  "Trust me, I'm already three steps ahead of this disaster. 👠",
  "You're not that good unless you have The Donna. You know it. I know it. 😌",
];

export default function SmartAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      who: "ai",
      text: "Good morning! I've prepared your schedule for today.",
      time: formatTime(new Date()),
    },
  ]);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    const el = chatBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }

  function handleSubmit(e: FormEvent) {
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

    // Simulate Donna response
    const randomIndex = Math.floor(Math.random() * donnaMessages.length);
    const aiMsg: Message = {
      who: "ai",
      text: donnaMessages[randomIndex],
      time: formatTime(new Date()),
    };
    setMessages((m) => [...m, aiMsg]);
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

        <div className="card-body chat-box" ref={chatBoxRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`chat-message ${m.who === "ai" ? "ai" : "user"}`}
            >
              <p>{m.text}</p>
              <span className="timestamp">{m.time}</span>
            </div>
          ))}
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <input
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
