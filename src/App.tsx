import "./App.css";
import Shanghai3DMap from "./modules/map/Shanghai3DMap";
import TimeSlider from "./modules/time-slider/TimeSlider";

function App() {
  return (
    <div className="relative w-full h-dvh bg-gray-900">
      <div className="w-full h-full">
        <Shanghai3DMap />
      </div>
      <TimeSlider className="absolute bottom-0 left-0 right-0 m-4" />
    </div>
  );
}

export default App;
