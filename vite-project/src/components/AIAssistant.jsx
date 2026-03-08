import React, { useState, useRef, useEffect } from "react";

function Assistant() {

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: "system",
      content: `
You are an AI financial assistant for gig workers in India.

Only answer questions related to:
- loans
- EMI
- credit score
- bank statements
- loan eligibility
- gig income
- financial planning

If a question is unrelated, politely refuse.
`
    },
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Loan Assistant. Ask me about loan eligibility, EMI, income analysis, or financial documents."
    }
  ]);

  // FINTECH KEYWORD FILTER
  const allowedKeywords = [
    "loan","emi","credit","bank","income","earnings","eligibility",
    "statement","finance","financial","gig","driver","uber","swiggy",
    "zomato","vehicle","rc","repayment","interest","borrow",
    "credit score","cibil","loan amount","apply","application",
    "deposit","withdrawal","transaction","account","money",
    "budget","debt","asset","liability"
  ];

  const isRelevant = (message) => {
    const msg = message.toLowerCase();
    return allowedKeywords.some(word => msg.includes(word));
  };

  // SPEECH RECOGNITION
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    // INTENT FILTER
    if (!isRelevant(input)) {

      setMessages(prev => [
        ...prev,
        userMessage,
        {
          role: "assistant",
          content:
            "I can only assist with financial topics such as loan eligibility, EMI, credit score, and gig worker income."
        }
      ]);

      setInput("");
      return;
    }

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");

    try {

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: updatedMessages,
            temperature: 0.3
          })
        }
      );

      const data = await response.json();

      const reply = data.choices[0].message;

      setMessages(prev => [...prev, reply]);

    } catch {

      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again."
        }
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>

      {/* Floating Button */}
      <div
        className="chatToggle"
        onClick={() => setOpen(!open)}
      >
        💬
      </div>

      {open && (

        <div className="chatWindow">

          <div className="chatHeader">
            AI Loan Assistant
          </div>

          <div className="chatMessages">

            {messages
              .filter(m => m.role !== "system")
              .map((msg, i) => (

                <div
                  key={i}
                  className={msg.role === "user" ? "userMsg" : "aiMsg"}
                >
                  {msg.content}
                </div>

              ))}

            <div ref={chatEndRef}></div>

          </div>

          <div className="chatControls">

            <input
              type="text"
              placeholder="Ask about loans or eligibility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button onClick={sendMessage}>
              Send
            </button>

            {/* Voice Button */}
            <button
              onClick={startListening}
              style={{
                marginLeft: "6px",
                background: listening ? "#ff5f5f" : "#22d3ee"
              }}
            >
              🎤
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Assistant;