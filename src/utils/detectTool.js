const MIN_SCORE = 50;

const DETECTORS = [
  {
    tool: "/json",
    label: "JSON",
    score: scoreJson,
  },
  {
    tool: "/jwt-debugger",
    label: "JWT",
    score: scoreJwt,
  },
  {
    tool: "/url-parser",
    label: "URL",
    score: scoreUrl,
  },
  {
    tool: "/html-preview",
    label: "HTML",
    score: scoreHtml,
  },
  {
    tool: "/uuid-generator",
    label: "UUID",
    score: scoreUuid,
  },
  {
    tool: "/color-converter",
    label: "Color",
    score: scoreColor,
  },
  {
    tool: "/sql-formatter",
    label: "SQL",
    score: scoreSql,
  },
  {
    tool: "/csv-to-json",
    label: "CSV",
    score: scoreCsv,
  },
  {
    tool: "/yaml-to-json",
    label: "YAML",
    score: scoreYaml,
  },
  {
    tool: "/markdown-preview",
    label: "Markdown",
    score: scoreMarkdown,
  },
  {
    tool: "/base64",
    label: "Base64",
    score: scoreBase64,
  },
];

export function detectTool(input) {
  const value = input.trim();

  if (!value) return null;

  const results = DETECTORS.map((detector) => ({
    tool: detector.tool,
    label: detector.label,
    confidence: detector.score(value),
  }))
    .filter((result) => result.confidence >= MIN_SCORE)
    .sort((a, b) => b.confidence - a.confidence);

  return results[0] || null;
}

function scoreJson(value) {
  if (!value.startsWith("{") && !value.startsWith("[")) return 0;

  try {
    JSON.parse(value);
    return 95;
  } catch {
    return 0;
  }
}

function scoreJwt(value) {
  const parts = value.split(".");

  if (parts.length !== 3) return 0;

  const validParts = parts.every((part) => /^[A-Za-z0-9_-]+$/.test(part));
  if (!validParts) return 0;

  return 95;
}

function scoreUrl(value) {
  try {
    const url = new URL(value);

    if (!url.protocol || !url.hostname) return 0;
    if (!/^https?:$/.test(url.protocol)) return 0;

    return 90;
  } catch {
    return 0;
  }
}

function scoreHtml(value) {
  let score = 0;

  if (/<!doctype html>/i.test(value)) score += 40;
  if (/<html[\s>]/i.test(value)) score += 30;
  if (/<body[\s>]/i.test(value)) score += 20;
  if (/<\/?[a-z][\s\S]*>/i.test(value)) score += 40;

  return Math.min(score, 95);
}

function scoreUuid(value) {
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidPattern.test(value) ? 90 : 0;
}

function scoreColor(value) {
  const isHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
  const isRgb =
    /^rgb\(\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*,\s*(25[0-5]|2[0-4]\d|1?\d?\d)\s*\)$/i.test(
      value,
    );
  const isHsl =
    /^hsl\(\s*(360|3[0-5]\d|[12]?\d?\d)\s*,\s*(100|[1-9]?\d)%\s*,\s*(100|[1-9]?\d)%\s*\)$/i.test(
      value,
    );

  if (isHex || isRgb || isHsl) return 85;

  return 0;
}

function scoreSql(value) {
  const normalized = value.toLowerCase();

  let score = 0;

  if (/\b(select|insert|update|delete|create|alter|drop)\b/i.test(value)) {
    score += 35;
  }

  if (/\b(from|where|join|values|set|table|into)\b/i.test(value)) {
    score += 30;
  }

  if (/[;]$/.test(value.trim())) {
    score += 10;
  }

  if (/\b(order by|group by|left join|right join|inner join)\b/i.test(value)) {
    score += 15;
  }

  if (scoreMarkdown(value) >= 70) {
    score -= 50;
  }

  if (normalized.startsWith("#")) {
    score -= 40;
  }

  return Math.max(0, Math.min(score, 90));
}

function scoreCsv(value) {
  if (scoreJson(value) > 0 || scoreHtml(value) > 60 || scoreSql(value) >= 70) {
    return 0;
  }

  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return 0;

  const delimiters = [",", ";", "\t"];
  let bestScore = 0;

  for (const delimiter of delimiters) {
    const rows = lines
      .slice(0, 10)
      .map((line) => splitDelimitedLine(line, delimiter));

    const columnCounts = rows.map((row) => row.length);
    const firstCount = columnCounts[0];

    if (firstCount < 2) continue;

    const consistentRows = columnCounts.filter(
      (count) => count === firstCount,
    ).length;

    const consistency = consistentRows / columnCounts.length;
    const delimiterHits = lines
      .slice(0, 10)
      .filter((line) => line.includes(delimiter)).length;

    let score = 0;

    if (consistency >= 0.8) score += 45;
    if (consistency === 1) score += 20;
    if (delimiterHits >= 2) score += 15;
    if (lines.length >= 3) score += 10;
    if (hasLikelyHeader(rows[0])) score += 10;

    bestScore = Math.max(bestScore, score);
  }

  return Math.min(bestScore, 90);
}

function splitDelimitedLine(line, delimiter) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i++;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === delimiter && !insideQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());

  return result;
}

function hasLikelyHeader(row) {
  if (!row || row.length < 2) return false;

  const textCells = row.filter((cell) => /^[a-zA-Z_ -]+$/.test(cell));
  return textCells.length >= Math.ceil(row.length / 2);
}

function scoreYaml(value) {
  if (scoreJson(value) > 0 || scoreHtml(value) > 60) return 0;

  const lines = value.split(/\r?\n/).filter(Boolean);
  const keyValueLines = lines.filter((line) =>
    /^\s*[\w-]+\s*:\s*(.+)?$/.test(line),
  );

  if (keyValueLines.length < 2) return 0;

  let score = 50;

  if (/\n\s+[\w-]+\s*:/m.test(value)) score += 20;
  if (/^\s*-\s+/m.test(value)) score += 10;
  if (!value.includes("{") && !value.includes("}")) score += 10;

  return Math.min(score, 85);
}

function scoreMarkdown(value) {
  if (scoreHtml(value) > 60) return 0;

  let score = 0;

  if (/^#{1,6}\s+/m.test(value)) score += 40;
  if (/\*\*.+\*\*/.test(value)) score += 15;
  if (/\[.+\]\(.+\)/.test(value)) score += 20;
  if (/^[-*]\s+/m.test(value)) score += 15;
  if (/```/.test(value)) score += 25;
  if (/^\|.+\|$/m.test(value)) score += 15;

  return Math.min(score, 85);
}

function scoreBase64(value) {
  if (value.length < 12) return 0;
  if (value.length % 4 !== 0) return 0;
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(value)) return 0;

  try {
    const decoded = atob(value);

    if (!decoded.length) return 0;

    return 70;
  } catch {
    return 0;
  }
}
