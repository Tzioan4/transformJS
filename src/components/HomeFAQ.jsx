import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What is TransformJS?",
    answer:
      "TransformJS is a free, privacy-first, browser-based developer toolkit for formatting, converting, validating, parsing, previewing, and transforming data directly in your browser.",
  },
  {
    question: "Does TransformJS upload my data?",
    answer:
      "No. TransformJS processes tool input locally in your browser whenever possible. Your text, tokens, queries, configs, and other tool data are not uploaded for server-side processing.",
  },
  {
    question: "Is TransformJS privacy-first?",
    answer:
      "Yes. Privacy is a core part of TransformJS. The platform is built around local browser processing, no accounts, no tracking, no cookies, and no unnecessary collection of user data.",
  },
  {
    question: "Does TransformJS use cookies, analytics, or trackers?",
    answer:
      "No. TransformJS does not use cookies for tracking, does not rely on invasive analytics, and does not include third-party trackers that monitor your tool input or developer workflows.",
  },
  {
    question: "Do I need an account to use TransformJS?",
    answer:
      "No. You can use all TransformJS tools instantly without sign-up, login, or account creation.",
  },
  {
    question: "Who is TransformJS for?",
    answer:
      "TransformJS is built for developers, students, QA engineers, DevOps users, and technical teams who need fast browser-based tools for JSON, JWT, regex, encoding, formatting, text transformation, and related workflows.",
  },
  {
    question: "What tools does TransformJS include?",
    answer:
      "TransformJS includes developer tools for JSON formatting, Base64 encoding and decoding, URL encoding and decoding, HTML preview, Markdown preview, JWT debugging, YAML to JSON conversion, SQL formatting, hash generation, password generation, CSV to JSON conversion, regex testing, FreeMarker template previewing, case conversion, UUID generation, URL parsing, diff checking, color conversion and more.",
  },
  {
    question: "Is TransformJS free to use?",
    answer:
      "Yes. TransformJS is free to use.",
  },
  {
    question: "Is TransformJS safe to use?",
    answer:
      "TransformJS is designed to be safe for everyday developer use because processing happens locally in the browser. For highly sensitive, regulated, or production-critical secrets, you should still follow your own security policies and best practices.",
  },
  {
    question: "Does my input stay on my device?",
    answer:
      "Yes, your input and output stay on your device and inside your browser session rather than being sent to a remote processing server.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. TransformJS works directly in the browser with no installation, setup, or local app required.",
  },
  {
    question: "What makes TransformJS different from other online developer tools?",
    answer:
      "TransformJS is built around fast tools, a clean interface, zero clutter, and privacy-first defaults. It gives developers quick access to practical browser-based utilities without accounts, tracking, or unnecessary complexity.",
  },
  {
    question: "Is TransformJS open source?",
    answer:
      "Yes. TransformJS is open source, making its implementation, architecture, and privacy-first approach transparent and inspectable.",
  },
  {
    question: "Can I use TransformJS for JSON, JWT, regex, SQL, and encoding tasks?",
    answer:
      "Yes. TransformJS is designed for common developer tasks such as JSON formatting, JWT inspection, regex testing, SQL formatting, URL parsing, Base64 conversion, hashing, password generation, and other browser-based transformations.",
  },
  {
    question: "Will more tools be added to TransformJS?",
    answer:
      "Yes. TransformJS continues to grow with new developer tools and improvements while staying focused on speed, simplicity, performance, and privacy.",
  },
];

export default function HomeFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="home-faq">
      <div className="home-faq-content">
        <div className="home-faq-header">
          <h2>FAQ</h2>
          <p>
            Learn more about TransformJS, privacy, supported tools, developer
            workflows, and how the platform works.
          </p>
        </div>

        <div className="home-faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="home-faq-item">
                <button
                  type="button"
                  className="home-faq-question"
                  onClick={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span>{isOpen ? "-" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="home-faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}