import { describe, it, expect } from "vitest";
import { extractExplicitPort } from "./UrlParser";

describe("extractExplicitPort", () => {
  it("returns explicit port", () => {
    expect(extractExplicitPort("https://example.com:8080/test")).toBe("8080");
  });

  it("returns null when no explicit port exists", () => {
    expect(extractExplicitPort("https://example.com/test")).toBe(null);
  });

  it("handles ipv6", () => {
    expect(extractExplicitPort("http://[::1]:5173/path")).toBe("5173");
  });
});
