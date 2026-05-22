import { describe, it, expect } from "vitest";

import { decodeJWT, verifyJWT } from "./jwt";

//helper
async function createSignedJWT(secret = "test-secret") {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    userId: 1,
    name: "john",
  };

  const headerB64 = btoa(JSON.stringify(header))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const payloadB64 = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const data = `${headerB64}.${payloadB64}`;

  const enc = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(data));

  const signature = btoa(String.fromCharCode(...new Uint8Array(sigBuffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return {
    token: `${headerB64}.${payloadB64}.${signature}`,
    secret,
  };
}

//tests decodeJWT
describe("decodeJWT", () => {
  it("decodes valid jwt", () => {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = {
      userId: 1,
      name: "john",
    };

    const headerB64 = btoa(JSON.stringify(header));
    const payloadB64 = btoa(JSON.stringify(payload));

    const token = `${headerB64}.${payloadB64}.signature`;

    const result = decodeJWT(token);

    expect(result.header).toEqual(header);
    expect(result.payload).toEqual(payload);
    expect(result.signature).toBe("signature");
  });
});

//tests verifyJWT
describe("verifyJWT", () => {
  it("verifies valid jwt", async () => {
    const { token, secret } = await createSignedJWT();

    const result = await verifyJWT(token, secret);

    expect(result).toBe(true);
  });

  it("fails with wrong secret", async () => {
    const { token } = await createSignedJWT();

    const result = await verifyJWT(token, "wrong-secret");

    expect(result).toBe(false);
  });

  it("fails when payload changes", async () => {
    const { token, secret } = await createSignedJWT();

    const parts = token.split(".");

    const fakePayload = btoa(
      JSON.stringify({
        userId: 999,
      }),
    )
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const modifiedToken = `${parts[0]}.${fakePayload}.${parts[2]}`;

    const result = await verifyJWT(modifiedToken, secret);

    expect(result).toBe(false);
  });
});