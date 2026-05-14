import React, { useRef } from "react";
import "@styles/components/hero.css";
import heroImg from "../assets/Programming-rafiki.png";
import { motion } from "framer-motion";

export default function Hero() {
  const dotLayerRef = useRef(null);

  const scrollToTools = () => {
    const section = document.getElementById("tools-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  //mouse following animation
  const handleMouseMove = (e) => {
    if (!dotLayerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = dotLayerRef.current.getBoundingClientRect();

    const x = clientX - left;
    const y = clientY - top;

    dotLayerRef.current.style.setProperty("--mouse-x", `${x}px`);
    dotLayerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>
      {/*layer that brightens dots while hovering*/}
      <div className="mouse-dot-mask" ref={dotLayerRef}></div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="hero-title">
            Fast Tools <br />
            <span className="highlight">For Busy Devs</span>
          </h1>

          <p className="hero-description">
            <strong>TransformJS</strong> is a lightweight toolkit designed to
            eliminate friction from your workflow. No distractions, just the
            tools you need.
          </p>
          <p className="hero-description">
            <strong>This App is still under developement</strong> 
          </p>

          <div className="hero-btns-group">
            {/*buttons hover scaling*/}
            <motion.button
              className="hero-btn primary"
              onClick={scrollToTools}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find your tool
            </motion.button>
            <motion.button
              className="hero-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://github.com/Tzioan4/transformJS", "_blank")
              }
            >
              View on GitHub
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
