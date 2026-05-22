import { describe, it, expect } from "vitest";
import { encodeUrl, decodeUrl } from "./url.js";

// ─── encodeUrl ───────────────────────────────────────────────────────────────

describe("encodeUrl", () => {
  it("encodes spaces as %20", () => {
    expect(encodeUrl("hello world")).toBe("hello%20world");
  });

  it("encodes & and = (common query string chars)", () => {
    expect(encodeUrl("a=1&b=2")).toBe("a%3D1%26b%3D2");
  });

  it("returns an empty string for empty input", () => {
    expect(encodeUrl("")).toBe("");
  });

  it("encodes a full URL (special chars in path/query)", () => {
    const input = "https://transformjs.com/search?q=hello world&page=2";
    const encoded = encodeUrl(input);
    // colons and slashes are encoded by encodeURIComponent
    expect(encoded).toContain("%20");
    expect(encoded).not.toContain(" ");
    // must round-trip
    expect(decodeUrl(encoded)).toBe(input);
  });

  it("encodes unicode characters (Greek)", () => {
    const encoded = encodeUrl("Γεια");
    expect(encoded).toMatch(/^(%[0-9A-F]{2})+$/i);
    expect(decodeUrl(encoded)).toBe("Γεια");
  });

  it("encodes emoji", () => {
    const encoded = encodeUrl("🚀");
    expect(encoded).not.toBe("🚀");
    expect(decodeUrl(encoded)).toBe("🚀");
  });

  it("does not encode unreserved characters (letters, digits, - _ . ~)", () => {
    expect(encodeUrl("hello-world_test.ok~")).toBe("hello-world_test.ok~");
  });

  it("passing an already-encoded string double-encodes it", () => {
    // encodeUrl is a thin wrapper; callers are responsible for not double-encoding
    const alreadyEncoded = "hello%20world";
    expect(encodeUrl(alreadyEncoded)).toBe("hello%2520world");
  });
});

// ─── decodeUrl ───────────────────────────────────────────────────────────────

describe("decodeUrl", () => {
  it("decodes %20 back to a space", () => {
    expect(decodeUrl("hello%20world")).toBe("hello world");
  });

  it("decodes %3D and %26 (= and &)", () => {
    expect(decodeUrl("a%3D1%26b%3D2")).toBe("a=1&b=2");
  });

  it("returns an empty string for empty input", () => {
    expect(decodeUrl("")).toBe("");
  });

  it("decodes a fully encoded URL back to the original", () => {
    const original = "https://transformjs.com/search?q=hello world&page=2";
    expect(decodeUrl(encodeUrl(original))).toBe(original);
  });

  it("decodes unicode percent sequences (Greek)", () => {
    const encoded = encodeUrl("Γεια");
    expect(decodeUrl(encoded)).toBe("Γεια");
  });

  it("decodes emoji percent sequences", () => {
    const encoded = encodeUrl("🎉");
    expect(decodeUrl(encoded)).toBe("🎉");
  });

  it("passes through a plain string with no encoded chars unchanged", () => {
    expect(decodeUrl("hello-world")).toBe("hello-world");
  });

  it("throws on a malformed percent sequence", () => {
    expect(() => decodeUrl("%GG")).toThrow();
  });

  it("throws on a truncated percent sequence", () => {
    expect(() => decodeUrl("hello%2")).toThrow();
  });
});