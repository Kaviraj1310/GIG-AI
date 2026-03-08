import React, { useState } from "react";

export default function FloatingAIAssistant() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I help gig workers understand loan eligibility." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };

    setMessages(prev => [...prev, userMessage]);

    setInput("");

    const response = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage.text })
    });

    const data = await response.json();

    setMessages(prev => [...prev, { role: "ai", text: data.reply }]);

  };

  return (
    <>

      {/* Floating Button */}
      <div className="ai-fab" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Chat Window */}
      {open && (
        <div className="ai-chat">

          <div className="ai-header">
            AI Financial Assistant
            <span onClick={() => setOpen(false)}>✕</span>
          </div>

          <div className="ai-messages">

            {messages.map((msg, i) => (
              <div key={i} className={msg.role}>
                {msg.text}
              </div>
            ))}

          </div>

          <div className="ai-input">

            <input
              placeholder="Ask about loans..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>
      )}

    </>
  );
}