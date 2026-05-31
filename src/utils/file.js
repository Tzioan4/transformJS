export const TEXT_FILE_LIMIT = 2 * 1024 * 1024;

export async function readTextFile(file, options = {}) {
  const { allowedExtensions = [], maxSize = TEXT_FILE_LIMIT } = options;

  if (!file) {
    throw new Error("No file selected.");
  }

  const extension = "." + file.name.split(".").pop().toLowerCase();

  if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
    throw new Error(
      `Unsupported file type. Allowed: ${allowedExtensions.join(", ")}`,
    );
  }

  if (file.size > maxSize) {
    throw new Error(
      `File is too large. Max size is ${Math.round(maxSize / 1024 / 1024)}MB.`,
    );
  }

  return file.text();
}
