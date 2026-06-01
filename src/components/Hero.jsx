import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  const scrollToTools = () => {
    document
      .getElementById("tools-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles = [];
    let rafId;

    function setSize() {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.25 + 0.08,
        opacity: Math.random() * 0.5 + 0.2,
        length: Math.random() * 2 + 1,
      };
    }

    function initParticles() {
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      particles = Array.from({ length: count }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;

        if (particle.y < 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = canvas.height;
        }

        ctx.fillStyle = `rgba(247, 223, 30, ${particle.opacity})`;
        ctx.fillRect(particle.x, particle.y, 1, particle.length);
      });

      rafId = requestAnimationFrame(draw);
    }

    function handleResize() {
      setSize();
      initParticles();
    }

    setSize();
    initParticles();
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="hero-section">
      <canvas ref={canvasRef} className="hero-particles" />

      <div className="hero-lines">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="hero-glow" />

      <div className="hero-container">
        <div className="hero-content animate-fade-up">
          <div className="hero-kickers">
            <span className="hero-kicker">Privacy First</span>
            <span className="hero-kicker">Open Source</span>
          </div>

          <h1 className="hero-title">
            Fast Tools <br />
            <span className="highlight">For Busy Devs</span>
          </h1>

          <p className="hero-description">
            Format, convert, debug and preview data directly in your browser.{" "}
            <br></br>
            No accounts. No tracking. No uploads.
          </p>

          <div className="hero-btns-group">
            <button className="hero-btn primary" onClick={scrollToTools}>
              Find your Tool
            </button>

            <button
              className="hero-btn secondary"
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
