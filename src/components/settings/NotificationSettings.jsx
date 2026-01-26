// src/components/settings/NotificationSettings.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

const NotificationSettings = ({ onChange }) => {
  const [channels, setChannels] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const [events, setEvents] = useState({
    assessmentCompleted: true,
    followUpReminder: true,
    weeklySummary: true,
    productUpdates: false,
  });

  const update = (nextChannels, nextEvents) => {
    const payload = {
      channels: nextChannels ?? channels,
      events: nextEvents ?? events,
    };
    if (onChange) onChange(payload);
  };

  const toggleChannel = (key) => {
    setChannels((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      update(next, null);
      return next;
    });
  };

  const toggleEvent = (key) => {
    setEvents((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      update(null, next);
      return next;
    });
  };

  const renderSwitch = (checked, onClick, label, description) => (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-medium text-emerald-50">{label}</p>
        {description && (
          <p className="text-xs text-slate-400">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClick}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border transition-colors ${
          checked
            ? "border-emerald-400 bg-emerald-500"
            : "border-slate-500 bg-slate-700"
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="rounded-xl border border-emerald-900/50 bg-slate-950/60 p-4 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-emerald-50 md:text-xl">
          Notifications
        </h2>
        <p className="text-xs text-slate-400 md:text-sm">
          Choose how you want to be notified about assessments and follow‑up
          reminders.
        </p>
      </div>

      {/* Channels */}
      <div className="mb-5 space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Channels
        </h3>
        {renderSwitch(
          channels.email,
          () => toggleChannel("email"),
          "Email",
          "Summaries and reminders delivered to your inbox."
        )}
        {renderSwitch(
          channels.push,
          () => toggleChannel("push"),
          "In‑app notifications",
          "Alerts inside the application while you are signed in."
        )}
        {renderSwitch(
          channels.sms,
          () => toggleChannel("sms"),
          "SMS (coming soon)",
          "Text messages for time‑sensitive reminders."
        )}
      </div>

      {/* Events */}
      <div className="space-y-3 border-t border-emerald-900/60 pt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          What you receive
        </h3>
        {renderSwitch(
          events.assessmentCompleted,
          () => toggleEvent("assessmentCompleted"),
          "Assessment results",
          "Notification when a new assessment has finished processing."
        )}
        {renderSwitch(
          events.followUpReminder,
          () => toggleEvent("followUpReminder"),
          "Follow‑up reminders",
          "Reminders to repeat assessments or share results."
        )}
        {renderSwitch(
          events.weeklySummary,
          () => toggleEvent("weeklySummary"),
          "Weekly summary",
          "Overview of recent assessments and trends."
        )}
        {renderSwitch(
          events.productUpdates,
          () => toggleEvent("productUpdates"),
          "Product updates",
          "Occasional news about new features and research."
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            const resetChannels = { email: true, push: true, sms: false };
            const resetEvents = {
              assessmentCompleted: true,
              followUpReminder: true,
              weeklySummary: true,
              productUpdates: false,
            };
            setChannels(resetChannels);
            setEvents(resetEvents);
            update(resetChannels, resetEvents);
          }}
        >
          Reset to defaults
        </Button>
      </div>
    </div>
  );
};

NotificationSettings.propTypes = {
  onChange: PropTypes.func,
};

export default NotificationSettings;
