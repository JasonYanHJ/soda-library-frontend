import { useGlobalContext } from "../global-context/useGlobalContext";
import AiChatBox from "./AiChatBox";
import Modal from "../ui/Modal";

const AiChatBoxModal = () => {
  const { aiChatBoxOpen, setAiChatBoxOpen } = useGlobalContext();

  return (
    <Modal
      title="沪上史者"
      style={{ minWidth: "90vw" }}
      open={aiChatBoxOpen}
      onCancel={() => setAiChatBoxOpen(false)}
      footer={null}
      forceRender
    >
      <AiChatBox />
    </Modal>
  );
};

export default AiChatBoxModal;
