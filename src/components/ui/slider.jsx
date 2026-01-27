import * as React from "react";

const Slider = React.forwardRef(
  ({ className, min = 0, max = 100, step = 1, value = [50], onValueChange, ...props }, ref) => {
    const handleChange = (e) => {
      const newValue = [Number(e.target.value)];
      onValueChange?.(newValue);
    };

    return (
      <div className={`relative flex w-full touch-none select-none items-center ${className || ""}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={handleChange}
          className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer slider-thumb"
          ref={ref}
          {...props}
        />
        <style jsx>{`
          .slider-thumb::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #059669;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s;
          }
          .slider-thumb::-webkit-slider-thumb:hover {
            background: #047857;
            transform: scale(1.1);
          }
          .slider-thumb::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #059669;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s;
          }
          .slider-thumb::-moz-range-thumb:hover {
            background: #047857;
            transform: scale(1.1);
          }
        `}</style>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
