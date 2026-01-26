import PropTypes from "prop-types";
import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md md:max-w-lg",
    lg: "max-w-lg md:max-w-2xl",
    xl: "max-w-xl md:max-w-4xl",
    full: "max-w-full mx-4",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-[1px]"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={`
          relative z-10 w-full ${sizeClasses[size]}
          max-h-[90vh] flex flex-col
          rounded-2xl border border-emerald-900/50
          bg-slate-900 text-slate-50 shadow-2xl
          animate-modal-in
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 px-4 py-3 md:px-6 md:py-4">
          <h2 className="text-base font-semibold md:text-lg text-emerald-100">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-emerald-200"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 md:px-6 md:py-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-emerald-900/60 px-4 py-3 md:px-6 md:py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  closeOnOverlayClick: PropTypes.bool,
};

export default Modal;
