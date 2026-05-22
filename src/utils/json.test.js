import { describe, it, expect } from "vitest";

import { detectDuplicateKeys, formatJson, minifyJson } from "./json";
describe("formatJson", () => {
  it("formats valid json", () => {
    const input = '{"name":"john","age":25}';

    const result = formatJson(input);

    expect(result).toBe(`{
  "name": "john",
  "age": 25
}`);
  });

  it("throws on invalid json", () => {
    const input = '{"name":}';

    expect(() => formatJson(input)).toThrow();
  });
});
describe("minifyJson", () => {
  it("minifies valid json", () => {
    const input = `
    {
      "name": "john",
      "age": 25
    }
    `;

    const result = minifyJson(input);

    expect(result).toBe('{"name":"john","age":25}');
  });

  it("throws on invalid json", () => {
    const input = '{"name":}';

    expect(() => minifyJson(input)).toThrow();
  });
});
describe("detectDuplicateKeys", () => {
  it("detects duplicate keys", () => {
    const input = `
    {
      "name": "john",
      "name": "mike"
    }
    `;

    const result = detectDuplicateKeys(input);

    expect(result).toEqual(["name"]);
  });

  it("returns empty array when no duplicates exist", () => {
    const input = `
    {
      "name": "john",
      "age": 25
    }
    `;

    const result = detectDuplicateKeys(input);

    expect(result).toEqual([]);
  });

  it("detects nested duplicate keys", () => {
    const input = `
    {
      "user": {
        "id": 1,
        "id": 2
      }
    }
    `;

    const result = detectDuplicateKeys(input);

    expect(result).toEqual(["id"]);
  });

  it("does not return duplicate names twice", () => {
    const input = `
    {
      "id": 1,
      "id": 2,
      "nested": {
        "id": 3,
        "id": 4
      }
    }
    `;

    const result = detectDuplicateKeys(input);

    expect(result).toEqual(["id"]);
  });
});