self.onmessage = function (e) {
  const { pattern, flags, text } = e.data;

  try {
    const safeFlags = flags.includes("g") ? flags : flags + "g";
    const regex = new RegExp(pattern, safeFlags);
    const allMatches = [];

    for (const match of text.matchAll(regex)) {
      allMatches.push({
        value: match[0],
        index: match.index,
        groups: match.slice(1).map((g) => (g === undefined ? null : g)),
      });
    }

    self.postMessage({ type: "success", matches: allMatches });
  } catch (err) {
    self.postMessage({ type: "error", message: err.message });
  }
};