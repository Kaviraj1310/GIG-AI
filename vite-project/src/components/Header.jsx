import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

function Header({ theme, toggleTheme, setLanguage }) {

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (

    <header className="glassHeader">

      <div className="logo">GigCredit AI</div>

      <nav>

        <button onClick={() => scrollTo("loans")}>Loans</button>
        <button onClick={() => scrollTo("simulator")}>Simulator</button>
        <button onClick={() => scrollTo("tools")}>Tools</button>
        <button onClick={() => scrollTo("assistant")}>AI</button>

      </nav>

      <div className="actions">

        {/* LANGUAGE SELECTOR */}

        <select
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
        </select>

        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>

      </div>

    </header>

  );
}