importScripts("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js");

const MAX_OUTPUT_SIZE = 500_000; // 500KB

self.onmessage = function (e) {
  const { input } = e.data;

  try {
    const obj = jsyaml.load(input, { maxAliasCount: 50 });
    const json = JSON.stringify(obj, null, 2);

    if (json.length > MAX_OUTPUT_SIZE) {
      self.postMessage({
        type: "error",
        message: "YAML expansion too large! possible YAML Bomb detected.",
      });
      return;
    }

    self.postMessage({ type: "success", json });
  } catch (e) {
    self.postMessage({ type: "error", message: "Invalid YAML: " + e.message });
  }
};