export default function About() {
  return (
    <div className="policy-container">
      <h1>About the Project</h1>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Last updated: May 2026</p>

      <section>
        <h2>About me</h2>
        <p>
          Im Giannis Tziotis, an aspiring developer who loves spending my free
          time building digital tools that solve real-world problems.
          TransformJS is a project born out of that curiosity.
        </p>
      </section>

      <section>
        <h2>The Purpose</h2>
        <p>
          I created this platform as a learning project to understand modern web
          technologies like React, Vite, and client-side data processing. It serves as a central hub for the tools I found myself
          needing daily, built to be clean, fast, and ad-free.
        </p>
      </section>

      <section>
        <h2>Why TransformJS?</h2>
        <p>
          This project is a key part of my portfolio, showcasing my focus on
          performance, clean UI, and user privacy. By building everything to run{" "}
          <strong>100% on the client-side</strong>, I wanted to ensure that your
          snippets and configs never leave your machine.
        </p>
      </section>

      <section>
        <h2>The Tech Stack</h2>
        <p>Building this allowed me to dive deep into:</p>
        <ul style={{ lineHeight: "1.8", marginLeft: "20px" }}>
          <li>
            <strong>React & Hooks</strong> for state management and modular
            architecture.
          </li>
          <li>
            <strong>Vite</strong> for lightning-fast bundling and development.
          </li>
          <li>
            <strong>Client-side Processing</strong> using libraries
            for SQL, YAML, and Markdown.
          </li>
        </ul>
      </section>

      <section>
        <h2>Let's Connect</h2>
        <p>
          I'm always looking for new challenges and opportunities to grow. If
          you're interested in my work, feel free to check out my{" "}
          <a
            href="https://github.com/Tzioan4"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#F7DF1E", 
              fontWeight: "500",
            }}
          >
            GitHub
          </a>{" "}
          or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/giannistziotis/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "#F7DF1E",
              fontWeight: "500",
            }}
          >
            LinkedIn
          </a>
          .
        </p>
      </section>
    </div>
  );
}
