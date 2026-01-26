import PropTypes from "prop-types";

const Button = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  icon = null,
  children,
  className = "",
  onClick,
  type = "button",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border border-emerald-200",
    outline:
      "border border-emerald-500 text-emerald-100 hover:bg-emerald-900/60",
    danger: "bg-red-600 text-white hover:bg-red-500",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base min-h-[48px]",
    xl: "px-8 py-3.5 text-base min-h-[56px]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${
        sizeClasses[size]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {loading ? (
        <span className="text-xs">Loading...</span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Button;
