import React from "react";
export default function Header({ theme, toggleTheme }) {

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="glassHeader">

      <div className="logo">Gig Credit AI</div>

      <nav className="navMenu">
        <button onClick={() => scrollTo("loans")}>Loans</button>
        <button onClick={() => scrollTo("simulator")}>Simulator</button>
        <button onClick={() => scrollTo("tools")}>Tools</button>
        <button onClick={() => scrollTo("ai")}>AI</button>
      </nav>

      <button className="themeBtn" onClick={toggleTheme}>
        {theme === "dark" ? "☀ Light" : "🌙 Dark"}
      </button>

    </header>
  );
}