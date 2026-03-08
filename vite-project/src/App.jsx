import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import EligibilityAnalyzer from "./components/EligibilityAnalyzer";
import CollateralEstimator from "./components/CollateralEstimator";
import ExpenseTracker from "./components/ExpenseTracker";
import DocumentChecklist from "./components/DocumentChecklist";
import Header from "./components/Header";

/*----------------- HEADER ---------------- */



/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="hero">
      <h1>AI Micro-Loans for India's Gig Workers</h1>

      <p>
        Designed for Swiggy delivery partners, Uber drivers, Rapido riders
        and freelancers. No salary slips required — our AI evaluates
        digital income patterns and financial behaviour.
      </p>
    </section>
  );
}

/* ---------------- LOAN MATCHER ---------------- */

function LoanMatcher() {

  const loans = [
    { 
      name: "MUDRA Micro Loan", 
      max: 50000, 
      rate: "7.5%", 
      emi: 2100,
      link: "https://www.mudra.org.in/"
    },
    { 
      name: "KreditBee Instant Loan", 
      max: 100000, 
      rate: "12%", 
      emi: 3200,
      link: "https://www.kreditbee.in/"
    },
    { 
      name: "MoneyTap Credit Line", 
      max: 200000, 
      rate: "13%", 
      emi: 4500,
      link: "https://web.moneytap.com/"
    }
  ];

  return (
    <section id="loans" className="section">

      <h2>Loan Products Matcher</h2>

      <div className="grid">

        {loans.map((loan, index) => (
          <div key={index} className="card">

            <h3>{loan.name}</h3>

            <p>Maximum Loan: ₹{loan.max.toLocaleString()}</p>
            <p>Interest Rate: {loan.rate}</p>
            <p>Estimated EMI: ₹{loan.emi}/month</p>

            <button
              onClick={() => window.open(loan.link, "_blank")}
            >
              Apply Now
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}
/* ---------------- SIMULATOR ---------------- */

function Simulator() {

  const [income, setIncome] = useState(30000);
  const [expenses, setExpenses] = useState(15000);
  const [emi, setEmi] = useState(2000);
  const [transactions, setTransactions] = useState(80);

  const incomeScore = Math.min(100, (income / 50000) * 100);

  const expenseRatio = expenses / income;
  const expenseScore = Math.max(0, 100 - expenseRatio * 100);

  const emiRatio = emi / income;
  const emiScore = Math.max(0, 100 - emiRatio * 100);

  const digitalScore = Math.min(100, transactions);

  const reliabilityScore = Math.round(
    incomeScore * 0.35 +
    expenseScore * 0.25 +
    emiScore * 0.20 +
    digitalScore * 0.20
  );

  return (
    <section id="simulator" className="section">

      <h2>Loan Eligibility Simulator</h2>

      <div className="card simulatorCard">

        <div className="score">{reliabilityScore}</div>
        <p className="scoreLabel">Predicted Reliability Score</p>

        <div className="sliderGroup">

          <label>Monthly Income ₹{income}</label>
          <input
            type="range"
            min="10000"
            max="100000"
            value={income}
            onChange={(e)=>setIncome(Number(e.target.value))}
          />

          <label>Monthly Expenses ₹{expenses}</label>
          <input
            type="range"
            min="5000"
            max="60000"
            value={expenses}
            onChange={(e)=>setExpenses(Number(e.target.value))}
          />

          <label>Existing EMI ₹{emi}</label>
          <input
            type="range"
            min="0"
            max="20000"
            value={emi}
            onChange={(e)=>setEmi(Number(e.target.value))}
          />

          <label>Monthly Digital Transactions {transactions}</label>
          <input
            type="range"
            min="0"
            max="150"
            value={transactions}
            onChange={(e)=>setTransactions(Number(e.target.value))}
          />

        </div>

        <div className="scoreBreakdown">

          <h4>Score Factors</h4>

          <ul>
            <li>Income Stability (35%) → {Math.round(incomeScore)}</li>
            <li>Expense Ratio (25%) → {Math.round(expenseScore)}</li>
            <li>EMI Load (20%) → {Math.round(emiScore)}</li>
            <li>Digital Activity (20%) → {Math.round(digitalScore)}</li>
          </ul>

        </div>

      </div>

    </section>
  );
}

/* ---------------- TOOLS ---------------- */

function Tools() {

  const [activeTool, setActiveTool] = useState("");
  const [asset, setAsset] = useState("");

  const estimatedLoan = asset ? Math.floor(asset * 0.5) : 0;

  const tools = [
    "Document Readiness Checklist",
    "Fraud Detection",
    "Expense Tracker",
    "Collateral Estimator"
  ];

  return (
    <section id="tools" className="section">

      <h2>Smart Financial Tools</h2>

      <div className="grid">

        {tools.map((tool, i) => (
          <div key={i} className="card">

            <h3>{tool}</h3>

            <button onClick={() => setActiveTool(tool)}>
              Open Tool
            </button>

          </div>
        ))}

      </div>

      {/* TOOL OUTPUT PANEL */}

      {activeTool && (
        <div className="card toolOutput">

          <h2>{activeTool}</h2>

          {/* DOCUMENT CHECKLIST */}
          {activeTool === "Document Readiness Checklist" && (
            <DocumentChecklist />
          )}

          {/* FRAUD DETECTION */}
          {activeTool === "Fraud Detection" && (
            <FraudDetection />
   )}

          {/* EXPENSE TRACKER */}
          {activeTool === "Expense Tracker" && (
            <ExpenseTracker />
          )}

          {/* COLLATERAL ESTIMATOR */}
          {activeTool === "Collateral Estimator" && (
            <CollateralEstimator />
          )}

        </div>
      )}

    </section>
  );
}

/* ---------------- AI CHATBOT ---------------- */
function Applicant() {

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
    <div className="appContainer">

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
}function Assistant() {

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
    <div className="appContainer">

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


/* ---------------- APP ---------------- */

export default function App() {

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="app">

      <Hero />

<LoanMatcher />

<Simulator />

<section id="eligibility" className="section">
  <h2>Loan Eligibility Analyzer</h2>
  <EligibilityAnalyzer />
</section>

<Tools />

<Assistant />
    </div>
  );
}