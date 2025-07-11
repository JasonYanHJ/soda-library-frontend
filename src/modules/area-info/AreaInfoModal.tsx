import { useGlobalContext } from "../global-context/useGlobalContext";
import Modal from "../ui/Modal";
import AreaInfo from "./AreaInfo";

const AreaInfoModal = () => {
  const { areaInfoOpen, setAreaInfoOpen, selectedArea, setSelectedArea } =
    useGlobalContext();

  return (
    <Modal
      title={selectedArea}
      style={{ minWidth: "40vw" }}
      open={areaInfoOpen}
      onCancel={() => setAreaInfoOpen(false)}
      afterClose={() => setSelectedArea(null)}
      footer={null}
      forceRender
    >
      {selectedArea && <AreaInfo area={selectedArea} />}
    </Modal>
  );
};

export default AreaInfoModal;
