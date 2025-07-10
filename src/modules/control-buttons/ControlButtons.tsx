import {
  MessageOutlined,
  ProductOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { FloatButton } from "antd";
import styled from "styled-components";
import { useGlobalContext } from "../context/useGlobalContext";

const StyledFloatButton = styled(FloatButton)`
  inset-inline-start: 16px;
`;
const baseBottom = 128;
const offset = 56;

const ControlButtons = () => {
  const { setAiChatBoxOpen } = useGlobalContext();

  return (
    <div>
      <StyledFloatButton
        style={{ bottom: baseBottom }}
        icon={<VideoCameraOutlined />}
      />
      <StyledFloatButton
        style={{ bottom: baseBottom + offset }}
        icon={<MessageOutlined />}
        onClick={() => setAiChatBoxOpen(true)}
      />
      <StyledFloatButton
        style={{ bottom: baseBottom + offset * 2 }}
        icon={<ProductOutlined />}
      />
    </div>
  );
};

export default ControlButtons;
