importScripts("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js");

const MAX_OUTPUT_SIZE = 500_000;
const MAX_NODES = 1000;

function countNodes(obj) {
  let count = 0;
  function traverse(val) {
    if (count > MAX_NODES) return; // early exit
    count++;
    if (Array.isArray(val)) {
      for (const item of val) traverse(item);
    } else if (val !== null && typeof val === "object") {
      for (const key of Object.keys(val)) traverse(val[key]);
    }
  }
  traverse(obj);
  return count;
}

self.onmessage = function (e) {
  const { input } = e.data;

  try {
    const obj = jsyaml.load(input, { maxAliasCount: 20 });

    //counting nodes before stringify
    const nodeCount = countNodes(obj);
    if (nodeCount > MAX_NODES) {
      self.postMessage({
        type: "error",
        message: "YAML expansion too large! possible YAML Bomb detected.",
      });
      return;
    }

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