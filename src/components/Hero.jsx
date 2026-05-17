import { useRef, useCallback } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const dotLayerRef = useRef(null);
  const rafRef = useRef(null);

  const scrollToTools = () => {
    document
      .getElementById("tools-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // requestAnimationFrame
  const handleMouseMove = useCallback((e) => {
    if (!dotLayerRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const { left, top } = dotLayerRef.current.getBoundingClientRect();
      dotLayerRef.current.style.setProperty(
        "--mouse-x",
        `${e.clientX - left}px`,
      );
      dotLayerRef.current.style.setProperty(
        "--mouse-y",
        `${e.clientY - top}px`,
      );
    });
  }, []);

  return (
    <section className="hero-section" onMouseMove={handleMouseMove}>
      <div className="mouse-dot-mask" ref={dotLayerRef} />

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
            TransformJS is a lightweight toolkit designed to eliminate friction
            from your workflow. No distractions, just the tools you need.
          </p>

          <p className="hero-description">
            <strong>This app is still under development.</strong>
          </p>

          <div className="hero-btns-group">
            <motion.button
              className="hero-btn primary"
              onClick={scrollToTools}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find your Tool
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
