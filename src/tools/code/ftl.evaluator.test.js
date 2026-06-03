import { describe, expect, it } from "vitest";
import { tokenize, parse, evalExpr, render, processFTL } from "./ftl.evaluator";

describe("tokenize", () => {
  it("returns plain text token", () => {
    expect(tokenize("hello")).toEqual([
      {
        type: "text",
        value: "hello",
      },
    ]);
  });

  it("returns interpolation token", () => {
    expect(tokenize("${name}")).toEqual([
      {
        type: "interpolation",
        expr: "name",
      },
    ]);
  });

  it("returns directive token", () => {
    expect(tokenize("<#if x>")).toEqual([
      {
        type: "directive",
        raw: "<#if x>",
      },
    ]);
  });

  it("skips comments", () => {
    expect(tokenize("<#-- comment -->text")).toEqual([
      {
        type: "text",
        value: "text",
      },
    ]);
  });

  it("handles mixed text, interpolation and directives", () => {
    expect(tokenize("Hello ${name}<#if active>!</#if>")).toEqual([
      {
        type: "text",
        value: "Hello ",
      },
      {
        type: "interpolation",
        expr: "name",
      },
      {
        type: "directive",
        raw: "<#if active>",
      },
      {
        type: "text",
        value: "!",
      },
      {
        type: "directive",
        raw: "</#if>",
      },
    ]);
  });
});

describe("parse", () => {
  it("creates an if node with consequent content", () => {
    const tokens = tokenize("<#if active>Hello</#if>");

    expect(parse(tokens)).toEqual([
      {
        type: "if",
        condition: "active",
        consequent: [
          {
            type: "text",
            value: "Hello",
          },
        ],
        alternate: null,
      },
    ]);
  });
});

describe("evalExpr", () => {
  it("returns string literal", () => {
    expect(evalExpr('"hello"', {})).toBe("hello");
  });

  it("returns number literal", () => {
    expect(evalExpr("42", {})).toBe(42);
  });

  it("returns boolean", () => {
    expect(evalExpr("true", {})).toBe(true);
  });

  it("resolves dot path", () => {
    expect(
      evalExpr("user.name", {
        user: {
          name: "John",
        },
      }),
    ).toBe("John");
  });

  it("returns undefined for missing path", () => {
    expect(
      evalExpr("user.missing", {
        user: {},
      }),
    ).toBeUndefined();
  });

  it("returns false for empty string with has_content", () => {
    expect(
      evalExpr("value?has_content", {
        value: "",
      }),
    ).toBe(false);
  });

  it("returns true for non-empty string with has_content", () => {
    expect(
      evalExpr("value?has_content", {
        value: "hello",
      }),
    ).toBe(true);
  });

  it("returns false for empty array with has_content", () => {
    expect(
      evalExpr("items?has_content", {
        items: [],
      }),
    ).toBe(false);
  });

  it("converts text to uppercase", () => {
    expect(
      evalExpr("value?upper_case", {
        value: "hello",
      }),
    ).toBe("HELLO");
  });

  it("converts text to lowercase", () => {
    expect(
      evalExpr("value?lower_case", {
        value: "HELLO",
      }),
    ).toBe("hello");
  });

  it("returns fallback when variable is missing", () => {
    expect(evalExpr('value!"fallback"', {})).toBe("fallback");
  });

  it("returns variable when fallback is not needed", () => {
    expect(
      evalExpr('value!"fallback"', {
        value: "existing",
      }),
    ).toBe("existing");
  });

  it("concatenates strings", () => {
    expect(
      evalExpr('"Hello " + name', {
        name: "John",
      }),
    ).toBe("Hello John");
  });
});

describe("processFTL", () => {
  it("renders simple variable", () => {
    expect(
      processFTL("Hello ${name}!", {
        name: "World",
      }),
    ).toBe("Hello World!");
  });

  it("renders true if branch", () => {
    expect(
      processFTL("<#if active>Visible</#if>", {
        active: true,
      }),
    ).toBe("Visible");
  });

  it("renders else branch", () => {
    expect(
      processFTL("<#if active>Visible<#else>Hidden</#if>", {
        active: false,
      }),
    ).toBe("Hidden");
  });

  it("renders list items", () => {
    expect(
      processFTL("<#list items as item>${item}</#list>", {
        items: ["A", "B", "C"],
      }),
    ).toBe("ABC");
  });

  it("assigns variable and uses it later", () => {
    expect(processFTL('<#assign name="John">Hello ${name}', {})).toBe(
      "Hello John",
    );
  });

  it("shows marker for undefined variable", () => {
    expect(processFTL("Hello ${missing}", {})).toContain(
      "[UNDEFINED: missing]",
    );
  });
});

describe("render", () => {
  it("shows marker instead of crashing on nested render error", () => {
    const nodes = [
      {
        type: "if",
        condition: null,
        consequent: [],
        alternate: null,
      },
    ];

    expect(() => render(nodes, {})).not.toThrow();

    expect(render(nodes, {})).toContain("[RENDER ERROR: if]");
  });
});
