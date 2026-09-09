// Small wrapper so a full storage or corrupted JSON never crashes the page.
export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Most likely QuotaExceededError from storing base64 images.
    return false;
  }
}
