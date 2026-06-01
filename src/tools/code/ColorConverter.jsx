import { useState, useRef, useEffect } from "react";
import ToolInfo from "../../components/ToolInfo";
import "@styles/tools/color.css";

const DEFAULT_HUE = 217;
const DEFAULT_SAT = 0.76;
const DEFAULT_VAL = 0.96;
const DEFAULT_HEX = rgbToHex(hsvToRgb(DEFAULT_HUE, DEFAULT_SAT, DEFAULT_VAL));

//conversion utils

function hexToRgb(hex) {
  const h = hex.replace("#", "");

  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;

  const n = parseInt(full, 16);

  if (isNaN(n)) return null;

  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

function rgbToHex({ r, g, b }) {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function rgbToHsl({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);

  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h;
  switch (max) {
    case rn:
      h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      break;
    case gn:
      h = ((bn - rn) / d + 2) / 6;
      break;
    default:
      h = ((rn - gn) / d + 4) / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }) {
  const sn = s / 100;
  const ln = l / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = c;
    g = x;
  } else if (h < 120) {
    r = x;
    g = c;
  } else if (h < 180) {
    g = c;
    b = x;
  } else if (h < 240) {
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r;
  let g;
  let b;

  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

function rgbToHsv({ r, g, b }) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;

  let h = 0;
  if (d !== 0) {
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      default:
        h = ((rn - gn) / d + 4) / 6;
    }
  }

  return { h: h * 360, s, v };
}

function isValidHex(v) {
  return /^#?[0-9a-fA-F]{3}$|^#?[0-9a-fA-F]{6}$/.test(v);
}

//detects whether the user has typed enough chars to "expect" a valid HEX
//(prevents showing error while user is still typing the first chars)
function isCompleteHexAttempt(v) {
  const clean = v.startsWith("#") ? v.slice(1) : v;
  //a complete HEX attempt has exactly 3 or 6 chars (after stripping #)
  return clean.length === 3 || clean.length === 6;
}

//drag helper

function startDrag(e, ref, onMove) {
  e.preventDefault();

  const rect = ref.current.getBoundingClientRect();

  const calc = (ev) => {
    const src = ev.touches ? ev.touches[0] : ev;
    onMove(src.clientX, src.clientY, rect);
  };

  calc(e);

  const move = (ev) => calc(ev);
  const stop = () => {
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mouseup", stop);
    window.removeEventListener("touchmove", move);
    window.removeEventListener("touchend", stop);
  };

  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", stop);
  window.addEventListener("touchmove", move, { passive: false });
  window.addEventListener("touchend", stop);
}

//component

export default function ColorConverter({ tips }) {
  const [hue, setHue] = useState(DEFAULT_HUE);
  const [sat, setSat] = useState(DEFAULT_SAT);
  const [val, setVal] = useState(DEFAULT_VAL);
  const [hexInput, setHexInput] = useState(DEFAULT_HEX);
  
  const [hexError, setHexError] = useState(false);

  const [copied, setCopied] = useState(null);

  const pickerRef = useRef(null);
  const hueRef = useRef(null);

  const rgb = hsvToRgb(hue, sat, val);
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb);
  useEffect(() => {
    setHexInput(hex);
    setHexError(false);
  }, [hex]);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const pureHue = rgbToHex(hsvToRgb(hue, 1, 1));

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    });
  };

  const onPickerDown = (e) => {
    startDrag(e, pickerRef, (cx, cy, rect) => {
      setSat(Math.max(0, Math.min(1, (cx - rect.left) / rect.width)));
      setVal(Math.max(0, Math.min(1, 1 - (cy - rect.top) / rect.height)));
    });
  };

  const onHueDown = (e) => {
    startDrag(e, hueRef, (cx, _cy, rect) => {
      const percent = Math.max(0, Math.min(1, (cx - rect.left) / rect.width));
      setHue(percent * 359);
    });
  };

  const handleHexChange = (v) => {
    setHexInput(v);
    setHexError(false);

    //empty input is not an error, just neutral
    if (v === "" || v === "#") {
      setHexError(false);
      return;
    }

    const clean = v.startsWith("#") ? v : "#" + v;

    if (isValidHex(clean)) {
      //valid HEX → update color, clear error
      setHexError(false);
      const r = hexToRgb(clean);
      if (!r) return;

      const hsv = rgbToHsv(r);
      if (hsv.s > 0.01) setHue(hsv.h);
      setSat(hsv.s);
      setVal(hsv.v);
    } else {
      //only show error when the user has typed a "complete" attempt
      //(3 or 6 chars after #). While typing partial input, stay silent.
      if (isCompleteHexAttempt(v)) {
        setHexError(true);
      } else {
        setHexError(false);
      }
    }
  };

  const handleRgb = (field, raw) => {
    const next = {
      ...rgb,
      [field]: Math.min(255, Math.max(0, parseInt(raw) || 0)),
    };

    const hsv = rgbToHsv(next);
    if (hsv.s > 0.01) setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
  };

  const handleHsl = (field, raw) => {
    const max = field === "h" ? 360 : 100;
    const next = {
      ...hsl,
      [field]: Math.min(max, Math.max(0, parseInt(raw) || 0)),
    };

    const r = hslToRgb(next);
    const hsv = rgbToHsv(r);
    if (hsv.s > 0.01) setHue(hsv.h);
    setSat(hsv.s);
    setVal(hsv.v);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <span className="tool-category-badge">Code</span>
        <h1>Color Converter</h1>
        <p>Pick or convert colors between HEX, RGB, and HSL formats.</p>
        {tips && <ToolInfo tips={tips} />}
      </div>

      <div className="cp-wrapper">
        {/*picker */}
        <div
          ref={pickerRef}
          className="cp-canvas"
          style={{ background: pureHue }}
          onMouseDown={onPickerDown}
          onTouchStart={onPickerDown}
        >
          <div className="cp-canvas-white" />
          <div className="cp-canvas-black" />
          <div
            className="cp-cursor"
            style={{
              left: `${sat * 100}%`,
              top: `${(1 - val) * 100}%`,
              background: hex,
              boxShadow: `0 0 0 2px ${val > 0.4 ? "#000" : "#fff"}`,
            }}
          />
        </div>

        {/*hue */}
        <div
          ref={hueRef}
          className="cp-hue"
          onMouseDown={onHueDown}
          onTouchStart={onHueDown}
        >
          <div
            className="cp-hue-thumb"
            style={{ left: `${(hue / 359) * 100}%` }}
          />
        </div>

        {/*preview */}
        <div className="cp-swatch" style={{ background: hex }} />
      </div>

      {/* inputs */}
      <div className="color-inputs">
        {/*hex */}
        <div className="color-group">
          <span className="color-label">HEX</span>

          <div className="color-row">
            <input
              className="color-input"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              spellCheck={false}
              placeholder="#000000"
              style={
                hexError
                  ? {
                      borderColor: "#ef4444",
                      boxShadow: "0 0 0 1px rgba(239, 68, 68, 0.2)",
                    }
                  : {}
              }
            />

            <button
              className={`btn ${copied === "hex" ? "btn-success" : "btn-copy"}`}
              onClick={() => copy(hex, "hex")}
            >
              {copied === "hex" ? "Copied" : "Copy"}
            </button>
          </div>

          {hexError && (
            <div
              style={{
                color: "#f87171",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                marginTop: "2px",
              }}
            >
              Invalid HEX format. Use #RGB or #RRGGBB
            </div>
          )}
        </div>

        {/* RGB */}
        <div className="color-group">
          <span className="color-label">RGB</span>

          <div className="color-row">
            {["r", "g", "b"].map((f) => (
              <div key={f} className="color-channel">
                <span className="color-channel-label">{f.toUpperCase()}</span>
                <input
                  className="color-input color-input--sm"
                  type="number"
                  min={0}
                  max={255}
                  value={rgb[f]}
                  onChange={(e) => handleRgb(f, e.target.value)}
                />
              </div>
            ))}

            <button
              className={`btn ${copied === "rgb" ? "btn-success" : "btn-copy"}`}
              onClick={() => copy(rgbStr, "rgb")}
            >
              {copied === "rgb" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* HSL */}
        <div className="color-group">
          <span className="color-label">HSL</span>

          <div className="color-row">
            {[
              ["h", 360],
              ["s", 100],
              ["l", 100],
            ].map(([f, max]) => (
              <div key={f} className="color-channel">
                <span className="color-channel-label">{f.toUpperCase()}</span>
                <input
                  className="color-input color-input--sm"
                  type="number"
                  min={0}
                  max={max}
                  value={hsl[f]}
                  onChange={(e) => handleHsl(f, e.target.value)}
                />
              </div>
            ))}

            <button
              className={`btn ${copied === "hsl" ? "btn-success" : "btn-copy"}`}
              onClick={() => copy(hslStr, "hsl")}
            >
              {copied === "hsl" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* output cards */}
      <div className="color-outputs">
        {[
          { key: "hex-c", label: "HEX", val: hex },
          { key: "rgb-c", label: "RGB", val: rgbStr },
          { key: "hsl-c", label: "HSL", val: hslStr },
        ].map(({ key, label, val: v }) => (
          <div
            key={key}
            className="color-output-card"
            onClick={() => copy(v, key)}
          >
            <span className="color-output-label">{label}</span>
            <span className="color-output-value">{v}</span>
            <span className="color-output-hint">
              {copied === key ? "✓ copied" : "click to copy"}
            </span>
          </div>
        ))}
      </div>

      <div className="tool-actions">
        <button
          className="btn btn-danger"
          onClick={() => {
            setHue(0);
            setSat(0);
            setVal(0);
            setHexInput("#000000");
            setHexError(false);
          }}
        >
          Reset <span className="btn-hint">Esc</span>
        </button>
      </div>
    </div>
  );
}
