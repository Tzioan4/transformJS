import { describe, it, expect } from "vitest";
import { toWords } from "./CaseConverter";

describe("toWords", () => {
  it("splits normal words", () => {
    expect(toWords("hello world")).toEqual(["hello", "world"]);
  });

  it("splits camelCase", () => {
    expect(toWords("helloWorldTest")).toEqual(["hello", "world", "test"]);
  });

  it("splits snake and kebab case", () => {
    expect(toWords("hello_world-test")).toEqual(["hello", "world", "test"]);
  });

  it("removes special symbols", () => {
    expect(toWords("hello@#$ world!")).toEqual(["hello", "world"]);
  });

  it("returns empty array for invalid-only input", () => {
    expect(toWords("@#$%")).toEqual([]);
  });
});
