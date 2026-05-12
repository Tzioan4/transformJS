export default function Privacy() {
  return (
    <div className="policy-container">
      <h1>Privacy & Terms</h1>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>Last updated: May 2026</p>

      <section>
        <h2>The Deal</h2>
        <p style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          TransformJS is a collection of free tools built for developers and
          advanced users. You are welcome to use them for personal or commercial
          projects as much as you like. All I ask is that you use them fairly
          and don't attempt to automate or break the service.
        </p>
      </section>
      <section>
        <h2>Data & Privacy</h2>
        <p>
          No servers,databases,unecessary account creations and no data
          collection. Everything you process here happens{" "}
          <strong>locally in your browser</strong>. Once you close the tab, your
          data is gone forever.
        </p>
      </section>

      <section>
        <h2>No Cookies, No Tracking</h2>
        <p>
          This site uses <strong>zero cookies</strong>. No ads, no hidden
          trackers, and no analytics pixels. Your business is your own.
        </p>
      </section>

      <section>
        <h2>Disclaimer</h2>
        <p>
          The tools are provided "as-is". While I strive for 100% accuracy, I'm
          just one person building this in my free time. I am not responsible if
          a formatting error or a conversion bug ruins your day. Always
          double-check your code before hitting production!
        </p>
      </section>
      <section>
        <h2>License</h2>
        <p>
          This project is open-source and licensed under the{" "}
          <strong>MIT License</strong>. You are free to use, copy, modify, and
          distribute the software as you see fit.
        </p>
      </section>
    </div>
  );
}
