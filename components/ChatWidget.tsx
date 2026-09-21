"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "Hi! I can answer questions about Bloom's services, prices, and durations. How can I help?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only send role/content — the API only needs the conversation so far.
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-[28rem] w-[20rem] flex-col overflow-hidden rounded-lg border border-clay bg-paper shadow-xl sm:w-[22rem]"
          >
            <div className="border-b border-clay px-4 py-3">
              <p className="font-display text-lg">Bloom assistant</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-md px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "ml-auto bg-rose text-paper"
                      : "bg-clay/60 text-ink"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="max-w-[85%] rounded-md bg-clay/60 px-3 py-2 text-sm text-ink/60">
                  Typing…
                </div>
              )}
              {error && (
                <div className="rounded-md bg-rose/10 px-3 py-2 text-sm text-rose">
                  {error}
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-clay p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about a service…"
                className="flex-1 rounded-md border border-clay bg-paper px-3 py-2 text-sm outline-none focus-visible:border-rose"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="rounded-md bg-rose px-3 py-2 text-sm font-medium text-paper transition-colors hover:bg-rose/90 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-rose text-paper shadow-lg"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? "×" : "Chat"}
      </motion.button>
    </div>
  );
}
