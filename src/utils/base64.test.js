import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64 } from "./base64.js";

// ─── encodeBase64 ────────────────────────────────────────────────────────────

describe("encodeBase64", () => {
  it("encodes a basic ASCII string", () => {
    expect(encodeBase64("Hello World")).toBe("SGVsbG8gV29ybGQ=");
  });

  it("returns an empty string for empty input", () => {
    expect(encodeBase64("")).toBe("");
  });

  it("encodes a Greek string (unicode)", () => {
    const result = encodeBase64("Γεια σου");
    // must be a non-empty base64 string
    expect(result).toMatch(/^[A-Za-z0-9+/]+=*$/);
    // and must round-trip back correctly
    expect(decodeBase64(result)).toBe("Γεια σου");
  });

  it("encodes emoji (unicode)", () => {
    const result = encodeBase64("Hello 🚀");
    expect(result).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(decodeBase64(result)).toBe("Hello 🚀");
  });

  it("encodes special characters", () => {
    const input = "hello & world = <test> \"quoted\"";
    const result = encodeBase64(input);
    expect(result).toMatch(/^[A-Za-z0-9+/]+=*$/);
    expect(decodeBase64(result)).toBe(input);
  });

  it("encodes newlines and tabs", () => {
    const input = "line1\nline2\ttabbed";
    const result = encodeBase64(input);
    expect(decodeBase64(result)).toBe(input);
  });

  it("encodes a URL-like string", () => {
    const input = "https://transformjs.com/search?q=hello world&page=2";
    const result = encodeBase64(input);
    expect(decodeBase64(result)).toBe(input);
  });
});

// ─── decodeBase64 ────────────────────────────────────────────────────────────

describe("decodeBase64", () => {
  it("decodes a basic base64 string", () => {
    expect(decodeBase64("SGVsbG8gV29ybGQ=")).toBe("Hello World");
  });

  it("returns an empty string for empty input", () => {
    expect(decodeBase64("")).toBe("");
  });

  it("decodes a unicode (Greek) base64 string", () => {
    const encoded = encodeBase64("Γεια σου");
    expect(decodeBase64(encoded)).toBe("Γεια σου");
  });

  it("decodes emoji base64", () => {
    const encoded = encodeBase64("🎉");
    expect(decodeBase64(encoded)).toBe("🎉");
  });

  it("throws on non-base64 / garbage input", () => {
    expect(() => decodeBase64("not!valid@base64#")).toThrow();
  });

  it("throws on a plain text string that is not base64", () => {
    expect(() => decodeBase64("Hello World")).toThrow();
  });
});