import "../styles/pages/legal.css";
export default function Privacy() {
  return (
    <div className="policy-container">
      <h1>Privacy & Terms</h1>
      <p className="policy-updated">Last updated: May 2026</p>

      <section>
        <h2>The App</h2>
        <p>
          TransformJS is a collection of free tools built for developers and
          advanced users. You are welcome to use them for personal or commercial
          projects as much as you like. All I ask is that you use them fairly
          and don't attempt to scrape or misrepresent the service as your own.
        </p>
      </section>
      <section>
        <h2>Data & Privacy</h2>
        <p>
          <strong>
            No servers, databases, unnecessary account creations and data
            collection.
          </strong>{" "}
          Everything you process here happens{" "}
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
          double-check your code before hitting production!{" "}
          <p>
            "This site may contain links to third-party websites. I am not
            responsible for their content or privacy practices."
          </p>
        </p>
      </section>
      <section>
        <h2>License</h2>
        <p>
          This project is open-source and licensed under the{" "}
          <strong>MIT License</strong>.
        </p>

        <div className="license-block">
          <p className="license-title">
            MIT License — Copyright (c) 2026 Tziotis Ioannis
          </p>
          <p className="license-text">
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
          </p>
          <p className="license-text">
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
          </p>
          <p className="license-text uppercase">
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
          </p>
        </div>
      </section>
    </div>
  );
}
