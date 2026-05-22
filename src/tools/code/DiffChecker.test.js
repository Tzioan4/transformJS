import { describe, it, expect } from "vitest";
import { computeDiff } from "./DiffChecker";

describe("computeDiff", () => {
  it("detects identical lines", () => {
    expect(computeDiff("a\nb", "a\nb")).toEqual([
      { type: "same", text: "a" },
      { type: "same", text: "b" },
    ]);
  });

  it("detects added lines", () => {
    expect(computeDiff("a", "a\nb")).toEqual([
      { type: "same", text: "a" },
      { type: "added", text: "b" },
    ]);
  });

  it("detects removed lines", () => {
    expect(computeDiff("a\nb", "a")).toEqual([
      { type: "same", text: "a" },
      { type: "removed", text: "b" },
    ]);
  });
});
