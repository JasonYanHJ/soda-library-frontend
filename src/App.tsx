import "./App.css";
import Shanghai3DMap from "./modules/map/Shanghai3DMap";
import SlideRuler from "./modules/time-slider/components/SlideRuler";

function App() {
  return (
    <div className="w-full h-dvh flex flex-col">
      <div className="flex-1">
        <Shanghai3DMap />
      </div>
      <div className="h-20 bg-gray-100">
        <SlideRuler startValue={1840} endValue={2020} unitWidth={8} />
      </div>
    </div>
  );
}

export default App;
