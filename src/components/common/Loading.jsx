import PropTypes from "prop-types";

const Loading = ({ size = "md", text = "Processing…", fullScreen = false }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-emerald-900/40" />
        <div className="absolute inset-1 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin-slow" />
      </div>
      {text && (
        <p className="text-xs font-medium text-slate-200 md:text-sm">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-6">{spinner}</div>;
};

Loading.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loading;
