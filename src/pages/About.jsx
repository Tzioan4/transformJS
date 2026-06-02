export default function About() {
  return (
    <div className="policy-container">
      <h1>About the Project</h1>
      <p className="policy-updated">Last updated: May 2026</p>

      <section>
        <h2>About me</h2>
        <p>
          I'm Giannis Tziotis, currently working in tech while actively
          transitioning into web development. TransformJS is one of the projects
          I've built out of genuine passion, not just to learn, but because I
          actually wanted it to exist.
        </p>
      </section>

      <section>
        <h2>The Purpose</h2>
        <p>
          TransformJS started as a personal toolkit and grew into something I'm
          proud to share. Every tool here is something I've needed at some
          point.
        </p>
        <p>
          TransformJS is also fully open-source. If you find a bug, want to
          contribute, or just want to see how it's built, the code is there.
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
        <p>
          Built with the fundamentals - no over-engineering, no unnecessary
          abstractions:
        </p>
        <ul className="policy-list">
          <li>
            <strong>React</strong> - component architecture and state management
          </li>
          <li>
            <strong>Vite</strong> - fast bundling and development experience
          </li>
          <li>
            <strong>Vanilla CSS</strong> -custom design system with CSS
            variables, no UI frameworks
          </li>
          <li>
            <strong>Web APIs</strong> - Web Crypto for hashing, sandbox iframes
            for safe previews, native browser APIs wherever possible
          </li>
        </ul>
      </section>

      <section>
        <h2>Let's Connect</h2>
        <p>
          I'm actively looking for opportunities to grow as a developer. If
          you'd like to see more of my work or just say hi, you can find me on{" "}
          <a
            href="https://github.com/Tzioan4"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/giannistziotis/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </section>
    </div>
  );
}
