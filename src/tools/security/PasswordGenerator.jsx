import { useState } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";

const MIN_LENGTH = 12;
const MAX_LENGTH = 64;
const DEFAULT_LENGTH = 16;

const DEFAULT_OPTIONS = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
};

const CHARSET = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

const CHARSET_SIZES = {
  uppercase: 26,
  lowercase: 26,
  numbers: 10,
  symbols: 30,
};

function secureRandom(max) {
  const limit = Math.floor(0x100000000 / max) * max;
  let value;

  do {
    value = crypto.getRandomValues(new Uint32Array(1))[0];
  } while (value >= limit);

  return value % max;
}

function generateSecurePassword(length, options) {
  const activeEntries = Object.entries(CHARSET).filter(([key]) => options[key]);

  if (!activeEntries.length) return "";

  const availableChars = activeEntries.map(([, chars]) => chars).join("");

  const guaranteed = activeEntries.map(
    ([, chars]) => chars[secureRandom(chars.length)],
  );

  const rest = Array.from(
    { length: length - guaranteed.length },
    () => availableChars[secureRandom(availableChars.length)],
  );

  const all = [...guaranteed, ...rest];

  for (let i = all.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [all[i], all[j]] = [all[j], all[i]];
  }

  return all.join("");
}

function getEntropy(length, options) {
  const charsetSize = Object.entries(CHARSET_SIZES)
    .filter(([key]) => options[key])
    .reduce((sum, [, size]) => sum + size, 0);

  if (charsetSize === 0) return 0;

  return length * Math.log2(charsetSize);
}

function getStrength(entropy) {
  if (entropy === 0) return null;
  if (entropy < 40) return { label: "Weak", color: "#ef4444" };
  if (entropy < 60) return { label: "Medium", color: "#f59e0b" };
  if (entropy < 80) return { label: "Strong", color: "#22c55e" };

  return { label: "Very Strong", color: "#14b8a6" };
}

export default function PasswordGenerator({ tips, category }) {
  const [length, setLength] = useState(DEFAULT_LENGTH);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [password, setPassword] = useState(() =>
    generateSecurePassword(DEFAULT_LENGTH, DEFAULT_OPTIONS),
  );

  const { copied, copy } = useCopy();

  const hasOptions = Object.values(options).some(Boolean);
  const entropy = getEntropy(length, options);
  const strength = getStrength(entropy);

  function generate() {
    if (!hasOptions) {
      setPassword("");
      return;
    }

    setPassword(generateSecurePassword(length, options));
  }

  return (
    <ToolLayout
      category={category}
      header={
        <div>
          <h1>Password Generator</h1>

          <p>Generate secure, random passwords with custom requirements.</p>

          {hasOptions && strength ? (
            <div
              className="status-badge password-strength-badge"
              style={{
                backgroundColor: `${strength.color}15`,
                color: strength.color,
                borderColor: `${strength.color}30`,
              }}
            >
              STRENGTH: <strong>{strength.label}</strong>
              <span className="password-entropy-hint">
                ({Math.round(entropy)} bits)
              </span>
            </div>
          ) : (
            <div className="status-badge status-badge-pending">
              WAITING FOR SELECTION...
            </div>
          )}

          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <div className="password-controls">
          <div
            style={{
              opacity: hasOptions ? 1 : 0.4,
              pointerEvents: hasOptions ? "auto" : "none",
              transition: "0.3s",
            }}
          >
            <div className="label-row">
              <span>Password Length</span>
              <span className="length-value">{length}</span>
            </div>

            <input
              type="range"
              min={MIN_LENGTH}
              max={MAX_LENGTH}
              value={length}
              onChange={(e) => {
                const value = Number(e.target.value);
                const clamped = Math.max(
                  MIN_LENGTH,
                  Math.min(MAX_LENGTH, value),
                );

                setLength(clamped);
              }}
              className="custom-slider"
              disabled={!hasOptions}
            />

            <div className="slider-range-hints">
              <span>min {MIN_LENGTH}</span>
              <span>max {MAX_LENGTH}</span>
            </div>
          </div>

          <div className="options-grid">
            {Object.keys(options).map((key) => (
              <label key={key} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() =>
                    setOptions((prev) => ({
                      ...prev,
                      [key]: !prev[key],
                    }))
                  }
                />

                <span className="checkmark"></span>

                <span className="option-text">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {!hasOptions && (
            <p className="password-option-error">
              Please select at least one character type.
            </p>
          )}
        </div>
      }
      output={
        <textarea
          className="tool-textarea password-output-display"
          value={hasOptions ? password : "---"}
          readOnly
        />
      }
      actions={
        <>
          <button
            type="button"
            onClick={generate}
            className="btn btn-primary"
            disabled={!hasOptions}
          >
            Regenerate
          </button>

          <button
            type="button"
            onClick={() => copy(password)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!hasOptions || !password}
          >
            {copied ? "Copied" : "Copy Password"}

            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
        </>
      }
    />
  );
}
