import { useEffect, useState } from "react";
import { requestAiChat } from "./api";
import useFluentStream from "./useFluentStream";

export type UserMessageInput = {
  type: "user";
  content: string;
};

export type AiMessageInput = {
  type: "ai";
  prompt: string;
};

const UserMessage = ({ content }: UserMessageInput) => {
  return (
    <div className="flex m-4 flex-row-reverse">
      <div className="py-2 px-3 md:text-base rounded-3xl rounded-br-sm text-white bg-blue-500/90">
        {content}
      </div>
    </div>
  );
};

const AiMessage = ({ prompt }: AiMessageInput) => {
  const [dotCnt, setDotCnt] = useState(0);
  const { fluentOutput, setOutput } = useFluentStream();

  // "思考中..."的省略号动态效果
  useEffect(() => {
    if (fluentOutput) return;
    setTimeout(() => setDotCnt((dotCnt + 1) % 4), 300);
  }, [fluentOutput, dotCnt]);
  const dots = ".".repeat(dotCnt) + " ".repeat(3 - dotCnt);

  useEffect(() => {
    const controller = new AbortController();
    requestAiChat(prompt, setOutput, controller.signal);
    return () => controller.abort();
  }, [prompt, setOutput]);

  return (
    <div className="flex m-4">
      <div className="py-2 px-3 md:text-base rounded-3xl rounded-bl-sm text-gray-900 bg-orange-200/90">
        {fluentOutput || <div className="min-w-16">{"思考中" + dots}</div>}
      </div>
    </div>
  );
};

const AiChatMessage = (props: UserMessageInput | AiMessageInput) => {
  return props.type === "ai" ? (
    <AiMessage {...props} />
  ) : (
    <UserMessage {...props} />
  );
};

export default AiChatMessage;
