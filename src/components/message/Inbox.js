import React, { useState } from "react";
import "./Inbox.css";
import Message from "./Message";
import MessageList from "./MessageList";

function Inbox({ messages }) {
  const [message, setMessage] = useState(messages[0]);

  const handleClick = (message) => {
    setMessage(message);
  };
  return (
    <div className="inbox">
      <MessageList messages={messages} onClick={handleClick} />
      <Message message={message} />
    </div>
  );
}

export default Inbox;
