import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What is TransformJS?",
    answer:
      "TransformJS is a free browser-based developer toolkit for formatting, converting, validating, and transforming data directly in your browser.",
  },
  {
    question: "Does TransformJS upload my data?",
    answer:
      "No. TransformJS runs locally in your browser without sending your input to external servers.",
  },
  {
    question: "Who is TransformJS for?",
    answer:
      "TransformJS is built for developers, students, engineers, and anyone working with APIs, JSON, encoding, text processing, or developer workflows.",
  },
  {
    question: "What tools does TransformJS include?",
    answer:
      "TransformJS includes JSON tools, encoders and decoders, JWT utilities, regex tools, SQL formatting, diff checking, URL utilities, and more.",
  },
  {
    question: "Is TransformJS free to use?",
    answer: "Yes. All tools are free to use.",
  },
  {
    question: "Is TransformJS safe to use?",
    answer:
      "Yes. The site is open-source, and serverless. No data leaves your machine.",
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
            Learn more about TransformJS, privacy, supported tools, and how the
            platform works.
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
