import "../../styles/tools/jwt.css";
import { useState } from "react";
import useCopy from "../../hooks/useCopy";
import { decodeJWT, verifyJWT } from "../../utils/jwt";

export default function JWTDebugger() {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState(null);

  const { copied, copy } = useCopy();

  const handleDecode = () => {
    if (!token) {
      setError("Please paste a token first.");
      return;
    }
    try {
      const result = decodeJWT(token);
      setHeader(JSON.stringify(result.header, null, 2));
      setPayload(JSON.stringify(result.payload, null, 2));
      setError(null);
      setVerified(null); // Reset verification status
    } catch (err) {
      setError(
        "Invalid JWT format. Make sure it has 3 parts separated by dots.",
      );
      setHeader("");
      setPayload("");
    }
  };

  const handleVerify = async () => {
    if (!token) {
      setError("Paste a token to verify.");
      return;
    }
    try {
      const isOk = await verifyJWT(token, secret);
      setVerified(isOk);
      setError(null);
    } catch (err) {
      setVerified(false);
      setError("Verification failed.");
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
        <p>Decode and verify JSON Web Tokens (HS256)</p>

        {/* Error Messages */}
        {error && (
          <div
            className="status-badge status-error"
            style={{ marginBottom: "1rem" }}
          >
            {error}
          </div>
        )}

        {/* success/fail Badges */}
        {verified !== null && (
          <div
            className={`status-badge ${verified ? "status-success" : "status-error"}`}
          >
            {verified ? "Signature Verified" : "Invalid Signature"}
          </div>
        )}
      </div>

      <div className="jwt-grid-layout">
        {/* top left*/}
        <div className="jwt-field-group">
          <label className="jwt-label">JWT Token (Encoded)</label>
          <textarea
            className="jwt-input-main"
            placeholder="eyJhbGci..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>

        {/*top rifght */}
        <div className="jwt-field-group">
          <label className="jwt-label">Header (Decoded)</label>
          <textarea
            className="jwt-input-main"
            value={header}
            readOnly
            placeholder="{ ... }"
          />
        </div>

        {/*bottom left */}
        <div className="jwt-field-group">
          <label className="jwt-label">Secret / Verify Key</label>
          <textarea
            className="jwt-input-main jwt-secret-field"
            placeholder="Enter your secret here..."
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>

        {/*bottom right */}
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

      {/* actions */}
      <div className="jwt-actions">
        <button onClick={handleDecode} className="btn btn-primary">
          Decode
        </button>

        <button onClick={handleVerify} className="btn btn-secondary">
          Verify
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
