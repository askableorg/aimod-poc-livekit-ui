import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatMessageInput } from "@/components/chat/ChatMessageInput";
import { ChatMessage as ComponentsChatMessage } from "@livekit/components-react";
import { useEffect, useMemo, useRef } from "react";

const inputHeight = 48;

export type ChatMessageType = {
  name: string;
  message: string;
  isSelf: boolean;
  timestamp: number;
};

type ChatTileProps = {
  messages: ChatMessageType[];
  accentColor: string;
  onSend?: (message: string) => Promise<ComponentsChatMessage>;
};

export const ChatTile = ({ messages, accentColor, onSend }: ChatTileProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [containerRef, messages]);

  return (
    <div className="h-full w-full relative">
      <div
        ref={containerRef}
        className="overflow-y-auto absolute h-full w-full bottom-0 pb-4"
      >
        <div className="flex flex-col min-h-full justify-start gap-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              name={message.name === messages[index - 1]?.name ? null : message.name}
              message={message.message}
              isSelf={message.isSelf}
              accentColor={accentColor}
            />
          ))}
        </div>
        {/* <ChatMessageInput
          height={inputHeight}
          placeholder="Type a message"
          accentColor={accentColor}
          onSend={onSend}
        /> */}
      </div>
    </div>
  );
};
