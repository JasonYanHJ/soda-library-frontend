import { Modal } from "antd";
import { useGlobalContext } from "../global-context/useGlobalContext";
import styled from "styled-components";
import AiChatBox from "./AiChatBox";

const StyledModal = styled(Modal)`
  top: 8dvh;
  min-width: 90vw;
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 80dvh;
    padding: 0 16px 16px 16px;
    @media (width >= 40rem /* 640px */) {
      padding: 0 24px 36px 24px !important;
    }
    .ant-modal-close {
      top: 8px;
      right: 16px;
      @media (width >= 48rem /* 768px */) {
        top: 16px;
        right: 24px;
      }
    }
    .ant-modal-header {
      .ant-modal-title {
        color: #000000c9;
        font-size: large;
        line-height: 3rem;
        @media (width >= 48rem /* 768px */) {
          font-size: 20px;
          line-height: 4rem;
        }
      }
      margin-bottom: 0;
    }
    .ant-modal-body {
      flex: 1;
      overflow: hidden;
    }
  }
`;

const AiChatBoxModal = () => {
  const { aiChatBoxOpen, setAiChatBoxOpen } = useGlobalContext();

  return (
    <StyledModal
      title="沪上史者"
      open={aiChatBoxOpen}
      onCancel={() => setAiChatBoxOpen(false)}
      footer={null}
      forceRender
    >
      <AiChatBox />
    </StyledModal>
  );
};

export default AiChatBoxModal;
