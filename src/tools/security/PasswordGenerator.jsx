import { useState, useEffect, useCallback } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";

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
  //rejection sampling
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

export default function PasswordGenerator({ tips }) {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const { copied, copy } = useCopy();

  const hasOptions = Object.values(options).some(Boolean);

  const generate = useCallback(() => {
    if (!hasOptions) {
      setPassword("");
      return;
    }
    setPassword(generateSecurePassword(length, options));
  }, [length, options, hasOptions]);

  useEffect(() => {
    generate();
  }, [generate]);

  const entropy = getEntropy(length, options);
  const strength = getStrength(entropy);

  return (
    <ToolLayout
      header={
        <div>
          <h1>Password Generator</h1>
          <p>Generate secure, random passwords with custom requirements.</p>

          {hasOptions && strength ? (
            <div
              className="status-badge"
              style={{
                marginTop: "12px",
                backgroundColor: `${strength.color}15`,
                color: strength.color,
                borderColor: `${strength.color}30`,
                fontSize: "11px",
                padding: "2px 8px",
                display: "inline-block",
              }}
            >
              STRENGTH: <strong>{strength.label}</strong>
              <span
                style={{
                  color: "#555",
                  marginLeft: "8px",
                  fontWeight: "normal",
                }}
              >
                ({Math.round(entropy)} bits)
              </span>
            </div>
          ) : (
            <div
              className="status-badge"
              style={{
                marginTop: "12px",
                color: "#888",
                fontSize: "11px",
                border: "1px dashed #444",
                display: "inline-block",
                padding: "2px 8px",
              }}
            >
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
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="custom-slider"
              disabled={!hasOptions}
            />
          </div>

          <div className="options-grid">
            {Object.keys(options).map((key) => (
              <label key={key} className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={() =>
                    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
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
            <p
              style={{
                color: "#ef4444",
                fontSize: "0.75rem",
                marginTop: "15px",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Please select at least one character type.
            </p>
          )}
        </div>
      }
      output={
        <textarea
          className="tool-textarea"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "18px",
            textAlign: "center",
            paddingTop: "60px",
            height: "100%",
            transition: "0.3s",
          }}
          value={hasOptions ? password : "---"}
          readOnly
        />
      }
      actions={
        <div className="tool-actions">
          <button
            onClick={generate}
            className="btn btn-primary"
            disabled={!hasOptions}
          >
            Regenerate
          </button>
          <button
            onClick={() => copy(password)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!hasOptions || !password}
          >
            {copied ? "Copied" : "Copy Password"}
            <span className="btn-hint">Ctrl+Shift+C</span>
          </button>
        </div>
      }
    />
  );
}
