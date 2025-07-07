import React, { useRef, useEffect, useState, useMemo } from "react";
import CursorIcon from "./CursorIcon";

interface SlideRulerProps {
  startValue: number;
  endValue: number;
  unitWidth: number;
}

const calculateMarkHeight = (
  position: number,
  currentScrollLeft: number,
  isMainMark: boolean,
  isSecondaryMark: boolean
) => {
  // 计算到中心的距离
  const distanceFromCenter = Math.abs(position - currentScrollLeft);

  // 定义基础高度
  const baseHeight = isMainMark ? 24 : isSecondaryMark ? 20 : 16; // 24px, 20px, 16px

  // 计算高度衰减因子 (距离越远，系数越小)
  const maxDistance = 180; // 设定影响范围180px
  const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
  const heightFactor = 1 - normalizedDistance; // 线性衰减到0

  // 最终高度
  return Math.round(baseHeight * heightFactor);
};

const SlideRuler: React.FC<SlideRulerProps> = ({
  startValue,
  endValue,
  unitWidth,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [, setIsScrolling] = useState(false);
  const [currentScrollLeft, setCurrentScrollLeft] = useState(0);
  const scrollTimeoutRef = useRef<number>();
  const totalUnits = endValue - startValue;
  const rulerWidth = totalUnits * unitWidth;

  // 计算当前值
  const currentValue = useMemo(() => {
    const currentIndex = Math.round(currentScrollLeft / unitWidth);
    const value = startValue + currentIndex;
    return value;
  }, [currentScrollLeft, startValue, unitWidth]);

  const updateScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    setCurrentScrollLeft(container.scrollLeft);
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = rulerWidth / 2;
      // 初始化时更新scrollLeft状态
      setTimeout(() => {
        updateScrollLeft();
      }, 0);
    }
  }, [rulerWidth]);

  const snapToNearestScale = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;

    // 找到最近的刻度位置
    const nearestScaleIndex = Math.round(scrollLeft / unitWidth);
    const targetScrollLeft = nearestScaleIndex * unitWidth;

    // 平滑滚动到目标位置
    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    setIsScrolling(true);
    updateScrollLeft();

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 设置新的定时器，滚动结束后执行对齐
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      snapToNearestScale();
      updateScrollLeft(); // 对齐后再次更新滚动位置
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const renderRuler = () => {
    const marks = [];

    for (let i = 0; i <= totalUnits; i++) {
      const value = startValue + i;
      const position = i * unitWidth;

      const isMainMark = i % 10 === 0;
      const isSecondaryMark = i % 5 === 0;

      // 计算刻度线高度
      const height = calculateMarkHeight(
        position,
        currentScrollLeft,
        isMainMark,
        isSecondaryMark
      );

      marks.push(
        <div
          key={i}
          className="absolute bottom-0"
          style={{ left: position - 1 }}
        >
          <div className="w-[2px] bg-gray-600" style={{ height }} />
          {isMainMark && (
            <div className="absolute -translate-x-1/2 mt-2 text-xs text-gray-700">
              {value}
            </div>
          )}
        </div>
      );
    }

    return marks;
  };

  return (
    <div className="relative w-full h-full">
      {/* 展示标签 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-[calc(-40px))] z-10 pointer-events-none">
        <div className="flex flex-col items-center text-gray-700">
          {currentValue}
        </div>
      </div>

      {/* 游标指示器 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 translate-y-1/2 z-10 pointer-events-none">
        <div className="flex flex-col items-center text-gray-700">
          <CursorIcon />
        </div>
      </div>

      {/* 滚动容器 */}
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto scrollbar-hidden select-none"
        onScroll={handleScroll}
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
    </div>
  );
};

export default SlideRuler;
