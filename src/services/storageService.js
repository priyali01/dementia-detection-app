// src/services/storageService.js

const isBrowser = typeof window !== "undefined";

export const storage = {
  get(key, defaultValue = null) {
    if (!isBrowser) return defaultValue;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.error("storage.get error:", err);
      return defaultValue;
    }
  },

  set(key, value) {
    if (!isBrowser) return;
    try {
      const serialized = JSON.stringify(value);
      window.localStorage.setItem(key, serialized);
    } catch (err) {
      console.error("storage.set error:", err);
    }
  },

  remove(key) {
    if (!isBrowser) return;
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.error("storage.remove error:", err);
    }
  },

  clear() {
    if (!isBrowser) return;
    try {
      window.localStorage.clear();
    } catch (err) {
      console.error("storage.clear error:", err);
    }
  },
};

export default storage;
