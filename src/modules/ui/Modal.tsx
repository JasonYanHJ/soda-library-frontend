import { Modal as AntdModal } from "antd";
import styled from "styled-components";

const Modal = styled(AntdModal)`
  top: 8dvh;
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

export default Modal;
