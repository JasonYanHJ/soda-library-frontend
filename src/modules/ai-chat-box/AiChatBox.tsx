import { Button, Grid, Input, Space } from "antd";
import { useCallback, useRef, useState } from "react";
import AiChatMessage, {
  AiMessageInput,
  UserMessageInput,
} from "./AiChatMessage";
import useResizeObserver from "use-resize-observer";

const AiChatBox = () => {
  const screen = Grid.useBreakpoint();
  const [messages, setMessages] = useState<
    (AiMessageInput | UserMessageInput)[]
  >([]);

  const [input, setInput] = useState<string>("");
  const handleSend = useCallback((input: string) => {
    if (!input) return;
    setMessages((msgs) => [...msgs, { type: "user", content: input }]);
    setTimeout(
      () => setMessages((msgs) => [...msgs, { type: "ai", prompt: input }]),
      500
    );
    setInput("");
  }, []);

  // 聊天区域高度发生变化时，滚动至底部
  const bottomRef = useRef<HTMLDivElement>(null);
  const { ref: messagesRef } = useResizeObserver({
    onResize: () => {
      if (!bottomRef.current) return;
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    },
  });

  return (
    <div
      className={`relative h-full w-full bg-[url(https://jlm-1321383016.cos.ap-shanghai.myqcloud.com/map/%E6%B0%91%E5%9B%BD%E4%B8%8A%E6%B5%B7.jpg)] bg-cover bg-center rounded-lg`}
    >
      <div className="h-full pb-10 md:pb-20 overflow-y-auto">
        <div ref={messagesRef}>
          {messages.map((message, index) => (
            <AiChatMessage key={index} {...message} />
          ))}
        </div>
        <div ref={bottomRef} />
      </div>
      <Space.Compact
        size={screen.md ? "large" : "middle"}
        className="absolute w-full bottom-0 p-2 sm:p-4"
      >
        <Input
          placeholder="向沪上史者提问..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="primary" onClick={() => handleSend(input)}>
          发送
        </Button>
      </Space.Compact>
    </div>
  );
};

export default AiChatBox;
