import PropTypes from "prop-types";
import { useState, forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder = "",
      error = "",
      required = false,
      icon = null,
      onChange: customOnChange,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    const handleChange = (e) => {
      if (rest.onChange) rest.onChange(e);
      if (customOnChange) customOnChange(e.target.value);
    };

    return (
      <div className="w-full">
        <label className="mb-1 block text-sm font-medium text-slate-100">
          {label}
          {required && <span className="ml-1 text-rose-400">*</span>}
        </label>

        <div className="relative">
          {icon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </span>
          )}

          <input
            ref={ref}   // ✅ IMPORTANT
            type={inputType}
            placeholder={placeholder}
            {...rest}
            onChange={handleChange}
            className={`
              w-full rounded-lg border bg-slate-900/60 text-slate-50 
              placeholder:text-slate-400 shadow-sm
              transition-colors duration-150 ease-out
              ${icon ? "pl-10 pr-10" : "px-4"}
              py-3 text-sm md:text-base
              ${
                error
                  ? "border-rose-400 focus:border-rose-400 focus:ring-rose-400/60"
                  : "border-emerald-700 focus:border-emerald-400 focus:ring-emerald-400/60"
              }
              focus:outline-none focus:ring-2
            `}
          />

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-300 hover:text-emerald-200 transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-rose-300 md:text-sm">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input"; // ✅ optional but recommended

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
};

export default Input;
