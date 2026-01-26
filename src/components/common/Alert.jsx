import PropTypes from "prop-types";

const typeClasses = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-rose-50 border-rose-200 text-rose-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-sky-50 border-sky-200 text-sky-800",
};

const Alert = ({ type = "info", className = "", children }) => {
  const styles = typeClasses[type] || typeClasses.info;
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${styles} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Alert;
