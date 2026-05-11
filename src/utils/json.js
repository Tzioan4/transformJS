export function formatJson(input) {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, 2);
}

export function minifyJson(input) {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}
