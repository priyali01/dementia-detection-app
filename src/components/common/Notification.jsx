// src/components/common/Notification.jsx
import PropTypes from "prop-types";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

const typeStyles = {
  success: {
    container: "bg-emerald-900/90 border-emerald-500",
    icon: "text-emerald-300",
  },
  error: {
    container: "bg-rose-900/90 border-rose-500",
    icon: "text-rose-300",
  },
  warning: {
    container: "bg-amber-900/90 border-amber-500",
    icon: "text-amber-300",
  },
  info: {
    container: "bg-slate-900/90 border-sky-500",
    icon: "text-sky-300",
  },
};

const getIcon = (type) => {
  switch (type) {
    case "success":
      return CheckCircle2;
    case "error":
      return AlertCircle;
    case "warning":
      return AlertCircle;
    default:
      return Info;
  }
};

const Notification = ({ notifications, onClose }) => {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center space-y-2 px-4 sm:items-end sm:space-y-3 sm:px-6">
      {notifications.map((n) => {
        const styles = typeStyles[n.type] || typeStyles.info;
        const Icon = getIcon(n.type);

        return (
          <div
            key={n.id}
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-3 py-3 shadow-lg sm:px-4 ${styles.container}`}
          >
            <div className={`mt-0.5 flex-shrink-0 ${styles.icon}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 text-sm text-slate-50">
              {n.message}
            </div>
            <button
              type="button"
              onClick={() => onClose?.(n.id)}
              className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-slate-800 hover:text-slate-100"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["success", "error", "warning", "info"]),
    })
  ),
  onClose: PropTypes.func,
};

export default Notification;
