import { useState, useMemo, useCallback } from "react";
import ToolLayout from "../../layouts/ToolLayout";
import ToolInfo from "../../components/ToolInfo";
import useCopy from "../../hooks/useCopy";

const ALGORITHMS = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

const WEAK_ALGOS = new Set(["MD5", "SHA-1"]);

//web Crypto only supports SHA-1, SHA-256, SHA-512
//MD5 is not supported natively
function md5(input) {
  //RFC1321 compliant MD5
  function safeAdd(x, y) {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
  }
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function md5blks(s) {
    const nblk = ((s.length + 8) >> 6) + 1;
    const blks = new Array(nblk * 16).fill(0);
    for (let i = 0; i < s.length; i++)
      blks[i >> 2] |= s.charCodeAt(i) << ((i % 4) * 8);
    blks[s.length >> 2] |= 0x80 << ((s.length % 4) * 8);
    blks[nblk * 16 - 2] = s.length * 8;
    return blks;
  }

  const m = md5blks(input);
  let a = 1732584193,
    b = -271733879,
    c = -1732584194,
    d = 271733878;

  for (let i = 0; i < m.length; i += 16) {
    const [oa, ob, oc, od] = [a, b, c, d];
    a = md5ff(a, b, c, d, m[i + 0], 7, -680876936);
    b = md5ff(d, a, b, c, m[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, m[i + 2], 17, 606105819);
    d = md5ff(b, c, d, a, m[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, m[i + 4], 7, -176418897);
    b = md5ff(d, a, b, c, m[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, m[i + 6], 17, -1473231341);
    d = md5ff(b, c, d, a, m[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, m[i + 8], 7, 1770035416);
    b = md5ff(d, a, b, c, m[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, m[i + 10], 17, -42063);
    d = md5ff(b, c, d, a, m[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, m[i + 12], 7, 1804603682);
    b = md5ff(d, a, b, c, m[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, m[i + 14], 17, -1502002290);
    d = md5ff(b, c, d, a, m[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, m[i + 1], 5, -165796510);
    b = md5gg(d, a, b, c, m[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, m[i + 11], 14, 643717713);
    d = md5gg(b, c, d, a, m[i + 0], 20, -373897302);
    a = md5gg(a, b, c, d, m[i + 5], 5, -701558691);
    b = md5gg(d, a, b, c, m[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, m[i + 15], 14, -660478335);
    d = md5gg(b, c, d, a, m[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, m[i + 9], 5, 568446438);
    b = md5gg(d, a, b, c, m[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, m[i + 3], 14, -187363961);
    d = md5gg(b, c, d, a, m[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, m[i + 13], 5, -1444681467);
    b = md5gg(d, a, b, c, m[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, m[i + 7], 14, 1735328473);
    d = md5gg(b, c, d, a, m[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, m[i + 5], 4, -378558);
    b = md5hh(d, a, b, c, m[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, m[i + 11], 16, 1839030562);
    d = md5hh(b, c, d, a, m[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, m[i + 1], 4, -1530992060);
    b = md5hh(d, a, b, c, m[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, m[i + 7], 16, -155497632);
    d = md5hh(b, c, d, a, m[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, m[i + 13], 4, 681279174);
    b = md5hh(d, a, b, c, m[i + 0], 11, -358537222);
    c = md5hh(c, d, a, b, m[i + 3], 16, -722521979);
    d = md5hh(b, c, d, a, m[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, m[i + 9], 4, -640364487);
    b = md5hh(d, a, b, c, m[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, m[i + 15], 16, 530742520);
    d = md5hh(b, c, d, a, m[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, m[i + 0], 6, -198630844);
    b = md5ii(d, a, b, c, m[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, m[i + 14], 15, -1416354905);
    d = md5ii(b, c, d, a, m[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, m[i + 12], 6, 1700485571);
    b = md5ii(d, a, b, c, m[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, m[i + 10], 15, -1051523);
    d = md5ii(b, c, d, a, m[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, m[i + 8], 6, 1873313359);
    b = md5ii(d, a, b, c, m[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, m[i + 6], 15, -1560198380);
    d = md5ii(b, c, d, a, m[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, m[i + 4], 6, -145523070);
    b = md5ii(d, a, b, c, m[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, m[i + 2], 15, 718787259);
    d = md5ii(b, c, d, a, m[i + 9], 21, -343485551);
    a = safeAdd(a, oa);
    b = safeAdd(b, ob);
    c = safeAdd(c, oc);
    d = safeAdd(d, od);
  }

  return [a, b, c, d]
    .map((n) =>
      Array.from({ length: 4 }, (_, i) =>
        ((n >> (i * 8)) & 0xff).toString(16).padStart(2, "0"),
      ).join(""),
    )
    .join("");
}

async function computeHash(algo, input) {
  if (algo === "MD5") return md5(input);

  const algoMap = {
    "SHA-1": "SHA-1",
    "SHA-256": "SHA-256",
    "SHA-512": "SHA-512",
  };
  const buffer = await crypto.subtle.digest(
    algoMap[algo],
    new TextEncoder().encode(input),
  );
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function HashGenerator({ tips }) {
  const [input, setInput] = useState("");
  const [algo, setAlgo] = useState("SHA-256");
  const [output, setOutput] = useState("");
  const { copied, copy } = useCopy();

  //async
  const handleHash = useCallback(async (value, algorithm) => {
    if (!value) {
      setOutput("");
      return;
    }
    try {
      const hash = await computeHash(algorithm, value);
      setOutput(hash);
    } catch {
      setOutput("Error generating hash");
    }
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    handleHash(val, algo);
  };

  const handleAlgoChange = (a) => {
    setAlgo(a);
    handleHash(input, a);
  };

  return (
    <ToolLayout
      header={
        <div>
          <h1>Hash Generator</h1>
          <p>
            Generate cryptographic hashes using the browser's native Web Crypto
            API.
          </p>

          <div className="mode-indicator encode" style={{ marginTop: "10px" }}>
            ALGORITHM: <strong>{algo}</strong>
          </div>

          {WEAK_ALGOS.has(algo) && (
            <div className="error-badge" style={{ marginTop: "8px" }}>
              {algo} is cryptographically broken. Do not use for passwords or
              signatures.
            </div>
          )}
          {tips && <ToolInfo tips={tips} />}
        </div>
      }
      input={
        <textarea
          className="tool-textarea"
          placeholder="Type or paste text to hash..."
          value={input}
          onChange={handleInputChange}
        />
      }
      output={
        <textarea
          className="tool-textarea"
          placeholder="Hash output will appear here..."
          value={output}
          readOnly
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
          }}
        />
      }
      actions={
        <div className="tool-actions">
          {ALGORITHMS.map((a) => (
            <button
              key={a}
              onClick={() => handleAlgoChange(a)}
              className={`btn ${algo === a ? "btn-primary" : "btn-secondary"}`}
            >
              {a}
            </button>
          ))}
          <button
            onClick={() => copy(output)}
            className={`btn ${copied ? "btn-success" : "btn-copy"}`}
            disabled={!output}
          >
            {copied ? "Copied" : "Copy Hash"}
          </button>
          <button
            onClick={() => {
              setInput("");
              setOutput("");
            }}
            className="btn btn-danger"
          >
            Clear
          </button>
        </div>
      }
    />
  );
}
