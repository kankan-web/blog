function joinUrl(...parts) {
  const url = parts.join("/");
  return url.replace(/\/+/g, "/");
}

export function url(path) {
  return joinUrl("", import.meta.env.BASE_URL, path);
}
