import "./App.css";
import Shanghai3DMap from "./modules/map/Shanghai3DMap";
import SlideRuler from "./modules/time-slider/components/SlideRuler";

function App() {
  return (
    <div className="relative w-full h-dvh bg-gray-900">
      <div className="w-full h-full">
        <Shanghai3DMap />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-md m-4 rounded-2xl overflow-hidden">
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
    </div>
  );
}

export default App;
