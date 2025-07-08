import clsx from "clsx";
import SlideRuler from "./components/SlideRuler";

const TimeSlider = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "h-24 backdrop-blur-md rounded-2xl overflow-hidden",
        className
      )}
    >
      <SlideRuler
        startValue={1840}
        endValue={2020}
        unitWidth={8}
        color="#eee"
        scaleColor="#aaa"
      />
      {/* 左侧渐变虚化效果 */}
      <div className="absolute left-0 top-0 w-2/5 h-full bg-gradient-to-r from-gray-800/70 to-transparent pointer-events-none z-10" />
      {/* 右侧渐变虚化效果 */}
      <div className="absolute right-0 top-0 w-2/5 h-full bg-gradient-to-l from-gray-800/70 to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default TimeSlider;
