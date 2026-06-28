import { useEffect, useRef } from "react";
import Message from "./Message";

function ChatBox({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      className="card-body"
      style={{
        height: "500px",
        overflowY: "auto",
        background: "#f5f5f5",
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          sender={message.sender}
          text={message.text}
        />
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatBox;