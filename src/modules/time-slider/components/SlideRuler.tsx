import React, { useRef, useEffect } from "react";

interface SlideRulerProps {
  startValue: number;
  endValue: number;
  unitWidth: number;
}

const SlideRuler: React.FC<SlideRulerProps> = ({
  startValue,
  endValue,
  unitWidth,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalUnits = endValue - startValue;
  const rulerWidth = totalUnits * unitWidth;

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = rulerWidth / 2;
    }
  }, [rulerWidth]);

  const renderRuler = () => {
    const marks = [];

    for (let i = 0; i <= totalUnits; i++) {
      const value = startValue + i;
      const position = i * unitWidth;

      const isMainMark = i % 10 === 0;
      const isSecondaryMark = i % 5 === 0;

      marks.push(
        <div key={i} className="absolute bottom-0" style={{ left: position }}>
          <div
            className={`w-px bg-gray-600 ${
              isMainMark ? "h-6" : isSecondaryMark ? "h-4" : "h-2"
            }`}
          />
          {isMainMark && (
            <div className="absolute -translate-x-1/2 mt-1 text-xs text-gray-700">
              {value}
            </div>
          )}
        </div>
      );
    }

    return marks;
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-full overflow-x-auto scrollbar-hidden select-none"
    >
      <div className="flex h-full">
        <div className="w-1/2 flex-shrink-0" />
        <div className="flex-shrink-0 flex items-center">
          <div
            className="relative h-8 bg-gray-200 border-b border-gray-400"
            style={{ width: rulerWidth }}
          >
            {renderRuler()}
          </div>
        </div>
        <div className="w-1/2 flex-shrink-0" />
      </div>
    </div>
  );
};

export default SlideRuler;
