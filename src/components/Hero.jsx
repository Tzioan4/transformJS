import { useRef, useCallback } from "react";

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
        <div className="hero-content animate-fade-up">
          <h1 className="hero-title">
            Fast Tools <br />
            <span className="highlight">For Busy Devs</span>
          </h1>

          <p className="hero-description">
            TransformJS is a free and open-source developer toolkit built for
            everyday workflows. Format, convert, debug and preview - all locally
            in your browser. No accounts, no tracking, no data leaving your
            machine.
          </p>

          <p className="hero-description">
            This app is still under development.
          </p>

          <div className="hero-btns-group">
            <button
              className="hero-btn primary scale-hover"
              onClick={scrollToTools}
            >
              Find your Tool
            </button>

            <button
              className="hero-btn secondary scale-hover"
              onClick={() =>
                window.open("https://github.com/Tzioan4/transformJS", "_blank")
              }
            >
              View on GitHub
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
