import { describe, it, expect } from "vitest";
import { detectDestructiveKeywords } from "./SqlFormatter";

describe("detectDestructiveKeywords", () => {
  it("detects DROP keyword", () => {
    expect(detectDestructiveKeywords("DROP TABLE users;")).toEqual(["DROP"]);
  });

  it("detects multiple destructive keywords", () => {
    expect(
      detectDestructiveKeywords("DELETE FROM users; ALTER TABLE users;"),
    ).toEqual(["DELETE", "ALTER"]);
  });

  it("returns empty array for safe sql", () => {
    expect(detectDestructiveKeywords("SELECT * FROM users")).toEqual([]);
  });
});
