export function decodeJWT(token) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT");

  const header = JSON.parse(atob(parts[0]));
  const payload = JSON.parse(atob(parts[1]));

  return {
    header,
    payload,
    signature: parts[2],
  };
}

export async function verifyJWT(token, secret) {
  const [headerB64, payloadB64, signature] = token.split(".");

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

  const expectedSignature = btoa(
    String.fromCharCode(...new Uint8Array(sigBuffer)),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return expectedSignature === signature;
}
