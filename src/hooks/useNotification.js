// src/hooks/useNotification.js
import { useState, useCallback } from "react";

let idCounter = 0;

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, options = {}) => {
    const id = ++idCounter;
    const {
      type = "info", // "success" | "error" | "warning" | "info"
      duration = 4000,
    } = options;

    const notif = { id, message, type };
    setNotifications((prev) => [...prev, notif]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    }

    return id;
  }, []);

  const hideNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    hideNotification,
    clearNotifications,
  };
};

export default useNotification;
