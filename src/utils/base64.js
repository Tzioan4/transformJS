export function encodeBase64(input) {
  return btoa(unescape(encodeURIComponent(input)));
}

export function decodeBase64(input) {
  return decodeURIComponent(escape(atob(input)));
}
