import React from "react";
import "@styles/components/hero.css";
import heroImg from "../assets/Programming-rafiki.png";

export default function Hero() {
  const scrollToTools = () => {
    const section = document.getElementById("tools-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* left side */}
        <div className="hero-image-wrapper">
          <div className="hero-illustration-box">
            <img
              src={heroImg}
              alt="Developer Illustration"
              className="hero-img"
            />
          </div>
        </div>

        {/* right side */}
        <div className="hero-content">
          <h1 className="hero-title">
            Fast Tools for <br />
            <span className="highlight">Busy Devs</span>
          </h1>
          <p className="hero-description">
            <strong> transformJS</strong> is a lightweight,
            open-source toolkit designed to eliminate friction from your
            workflow. No ads, no tracking, just the tools you need.
          </p>
          <button className="hero-btn" onClick={scrollToTools}>
            Find your tool
          </button>
        </div>
      </div>
    </section>
  );
}
