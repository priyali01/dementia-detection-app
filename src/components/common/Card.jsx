import PropTypes from "prop-types";

const Card = ({
  title = "",
  subtitle = "",
  children,
  actions = null,
  hoverable = false,
  onClick,
}) => {
  const hoverClasses = hoverable
    ? "hover:shadow-lg hover:-translate-y-0.5"
    : "";

  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl border border-emerald-900/40 bg-slate-900/70 
        p-5 text-slate-50 shadow-sm
        transition-transform transition-shadow duration-200 ease-out
        ${hoverClasses} ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {title && (
            <h3 className="text-base font-semibold text-emerald-100 md:text-lg">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-xs text-slate-300 md:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div>{children}</div>

      {actions && <div className="mt-4 flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  hoverable: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
