import "./App.css";
import AiChatBoxModal from "./modules/ai-chat-box/AiChatBoxModal";
import GlobalContextProvider from "./modules/global-context/GlobalContextProvider";
import ControlButtons from "./modules/control-buttons/ControlButtons";
import Shanghai3DMap from "./modules/map/Shanghai3DMap";
import TimeSlider from "./modules/time-slider/TimeSlider";
import AreaInformationModal from "./modules/area-info/AreaInfoModal";

function App() {
  return (
    <GlobalContextProvider>
      <div className="relative w-full h-dvh bg-gray-900">
        <div className="w-full h-full">
          <Shanghai3DMap />
        </div>
        <ControlButtons />
        <TimeSlider className="absolute bottom-0 left-0 right-0 m-4" />
      </div>
      <AiChatBoxModal />
      <AreaInformationModal />
    </GlobalContextProvider>
  );
}

export default App;
