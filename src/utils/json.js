export function detectDuplicateKeys(jsonStr) {
  const duplicates = [];
  let i = 0;

  function skipWhitespace() {
    while (i < jsonStr.length && /\s/.test(jsonStr[i])) i++;
  }

  function parseString() {
    i++; // skip opening "
    let str = '';
    while (i < jsonStr.length) {
      if (jsonStr[i] === '\\') { i += 2; continue; }
      if (jsonStr[i] === '"') { i++; return str; }
      str += jsonStr[i++];
    }
    return str;
  }

  function parseValue() {
    skipWhitespace();
    if (i >= jsonStr.length) return;
    const ch = jsonStr[i];
    if (ch === '{') parseObject();
    else if (ch === '[') parseArray();
    else if (ch === '"') parseString();
    else {
      while (i < jsonStr.length && !/[,}\]]/.test(jsonStr[i])) i++;
    }
  }

  function parseArray() {
    i++; // skip [
    skipWhitespace();
    while (i < jsonStr.length && jsonStr[i] !== ']') {
      parseValue();
      skipWhitespace();
      if (jsonStr[i] === ',') i++;
      skipWhitespace();
    }
    i++; // skip ]
  }

  function parseObject() {
    i++; // skip {
    skipWhitespace();
    const seen = new Set();

    while (i < jsonStr.length && jsonStr[i] !== '}') {
      skipWhitespace();
      if (jsonStr[i] !== '"') break;

      const key = parseString();
      if (seen.has(key)) duplicates.push(key);
      seen.add(key);

      skipWhitespace();
      if (jsonStr[i] === ':') i++;
      parseValue();
      skipWhitespace();
      if (jsonStr[i] === ',') i++;
      skipWhitespace();
    }
    i++; // skip }
  }

  try {
    skipWhitespace();
    parseValue();
  } catch (e) {
    // silent JSON errors caught elsewhere
  }

  return [...new Set(duplicates)];
}

export function formatJson(input) {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
}

export function minifyJson(input) {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}