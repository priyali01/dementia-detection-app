import { createContext, useState, useEffect } from "react";

const defaultSettings = {
  notifications: {
    channels: { email: true, push: true, sms: false },
    events: {
      assessmentCompleted: true,
      followUpReminder: true,
      weeklySummary: true,
      productUpdates: false,
    },
  },
  accessibility: {
    fontSize: 100,
    highContrast: false,
    reducedMotion: false,
  },
};

export const SettingsContext = createContext({
  settings: defaultSettings,
  updateNotifications: () => {},
  updateAccessibility: () => {},
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem("app_settings");
    if (stored) {
      try {
        setSettings((prev) => ({ ...prev, ...JSON.parse(stored) }));
      } catch {
        localStorage.removeItem("app_settings");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("app_settings", JSON.stringify(settings));
  }, [settings]);

  const updateNotifications = (payload) => {
    setSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...payload },
    }));
  };

  const updateAccessibility = (payload) => {
    setSettings((prev) => ({
      ...prev,
      accessibility: { ...prev.accessibility, ...payload },
    }));
  };

  const value = {
    settings,
    updateNotifications,
    updateAccessibility,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
