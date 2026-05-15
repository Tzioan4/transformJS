import "../../styles/tools/jwt.css";
import { useState, useEffect } from "react";
import useCopy from "../../hooks/useCopy";
import { decodeJWT, verifyJWT } from "../../utils/jwt";

const EXAMPLE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const EXAMPLE_SECRET = "your-256-bit-secret";

export default function JWTDebugger() {
  const [token, setToken] = useState(EXAMPLE_TOKEN);
  const [secret, setSecret] = useState(EXAMPLE_SECRET);
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  useEffect(() => {
    if (token) handleDecode();
  }, []);

  const isInvalidFormat =
    token && token.trim() !== "" && token.split(".").length !== 3;

  const handleDecode = () => {
    setError(null);
    setVerified(null);
    if (!token) return;

    try {
      const result = decodeJWT(token);
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
    } catch (err) {
      setError(
        "Invalid JWT format. Make sure it has 3 parts separated by dots.",
      );
      setHeader("");
      setPayload("");
    }
  };

  const handleVerify = async () => {
    setError(null);
    if (!token || isInvalidFormat) return;

    try {
      const isOk = await verifyJWT(token, secret);
      setVerified(isOk);
    } catch (err) {
      setVerified(false);
    }
  };

  const handleClear = () => {
    setToken("");
    setSecret("");
    setHeader("");
    setPayload("");
    setVerified(null);
    setError(null);
  };

  return (
    <div className="tool-container">
      <div className="tool-header">
        <h1>JWT Debugger</h1>
        <p>
          Decode JWT headers and payloads with instant signature verification
          status.
        </p>

        {/*error badge*/}
        {(error || isInvalidFormat || verified === false) && (
          <div className="error-badge">
            {isInvalidFormat
              ? "Action Blocked: Invalid JWT format. Make sure it has 3 parts separated by dots."
              : verified === false
                ? "Invalid Signature: The secret provided does not match this token's signature."
                : error}
          </div>
        )}

        {/*success*/}
        {verified === true && !isInvalidFormat && (
          <div className="status-badge status-success">
            Signature Verified
          </div>
        )}
      </div>

      <div className="jwt-grid-layout">
        <div className="jwt-field-group">
          <label className="jwt-label">JWT Token (Encoded)</label>
          <textarea
            className="jwt-input-main"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setVerified(null);
            }}
          />
        </div>

        <div className="jwt-field-group">
          <label className="jwt-label">Header (Decoded)</label>
          <textarea
            className="jwt-input-main"
            value={header}
            readOnly
            placeholder="{ ... }"
          />
        </div>

        <div className="jwt-field-group">
          <label className="jwt-label">Secret / Verify Key</label>
          <textarea
            className="jwt-input-main jwt-secret-field"
            value={secret}
            onChange={(e) => {
              setSecret(e.target.value);
              setVerified(null);
            }}
          />
        </div>

        <div className="jwt-field-group">
          <label className="jwt-label">Payload (Data)</label>
          <textarea
            className="jwt-input-main"
            value={payload}
            readOnly
            placeholder="{ ... }"
          />
        </div>
      </div>

      <div className="jwt-actions">
        <button onClick={handleDecode} className="btn btn-primary">
          Decode
        </button>
        <button onClick={handleVerify} className="btn btn-secondary">
          Verify Signature
        </button>
        <button
          onClick={() => copy(payload)}
          className={`btn ${copied ? "btn-success" : "btn-copy"}`}
          disabled={!payload}
        >
          {copied ? "Copied" : "Copy Payload"}
        </button>
        <button onClick={handleClear} className="btn btn-danger">
          Clear
        </button>
      </div>
    </div>
  );
}
