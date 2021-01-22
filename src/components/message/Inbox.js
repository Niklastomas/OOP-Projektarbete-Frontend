import React, { useState } from "react";
import "./Inbox.css";
import Message from "./Message";
import MessageList from "./MessageList";
import { useDispatch } from "react-redux";
import { markMessageAsRead } from "../../redux/messageSlice";

function Inbox({ messages }) {
  const [message, setMessage] = useState(messages[0]);
  const dispatch = useDispatch();

  const handleClick = async (message) => {
    dispatch(markMessageAsRead(message.id));
    setMessage(message);
  };
  return (
    <div className="inbox">
      {messages ? (
        <>
          <MessageList messages={messages} onClick={handleClick} />
          <Message message={message} />
        </>
      ) : (
        <h1>Inbox Empty</h1>
      )}
    </div>
  );
}

export default Inbox;
