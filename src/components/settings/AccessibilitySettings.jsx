// src/components/settings/AccessibilitySettings.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../common/Button";

const AccessibilitySettings = ({ onChange }) => {
  const [fontSize, setFontSize] = useState(100); // %
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Apply settings to document / notify parent
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.body.classList.toggle("high-contrast", highContrast);
    document.body.classList.toggle("reduced-motion", reducedMotion);

    if (onChange) {
      onChange({ fontSize, highContrast, reducedMotion });
    }
  }, [fontSize, highContrast, reducedMotion, onChange]); 

  const adjustFontSize = (delta) => {
    setFontSize((prev) => {
      const next = Math.min(140, Math.max(80, prev + delta));
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-emerald-900/50 bg-slate-950/60 p-4 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-emerald-50 md:text-xl">
          Accessibility
        </h2>
        <p className="text-xs text-slate-400 md:text-sm">
          Personalize how the interface looks and feels to reduce strain and
          improve readability.
        </p>
      </div>

      {/* Font size */}
      <div className="mb-5 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-emerald-50">Text size</p>
          <span className="text-xs text-slate-400">{fontSize}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => adjustFontSize(-10)}
          >
            A-
          </Button>
          <div className="flex-1 h-1 rounded-full bg-slate-800">
            <div
              className="h-1 rounded-full bg-emerald-400 transition-all"
              style={{ width: `${((fontSize - 80) / 60) * 100}%` }}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => adjustFontSize(10)}
          >
            A+
          </Button>
        </div>
        <p className="text-xs text-slate-500">
          Larger text can help when reviewing transcripts and assessment
          results.
        </p>
      </div>

      {/* High contrast */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-emerald-50">High contrast</p>
          <p className="text-xs text-slate-400">
            Increases contrast between text and background for better
            visibility.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setHighContrast((v) => !v)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border transition-colors ${
            highContrast
              ? "border-emerald-400 bg-emerald-500"
              : "border-slate-500 bg-slate-700"
          }`}
          role="switch"
          aria-checked={highContrast}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              highContrast ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Reduced motion */}
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-emerald-50">Reduce motion</p>
          <p className="text-xs text-slate-400">
            Minimizes animations and transitions, which can help with motion
            sensitivity.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setReducedMotion((v) => !v)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border transition-colors ${
            reducedMotion
              ? "border-emerald-400 bg-emerald-500"
              : "border-slate-500 bg-slate-700"
          }`}
          role="switch"
          aria-checked={reducedMotion}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              reducedMotion ? "translate-x-5" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        You can combine these settings with your system preferences for dark
        mode and contrast.
      </p>
    </div>
  );
};

AccessibilitySettings.propTypes = {
  onChange: PropTypes.func,
};

export default AccessibilitySettings;
