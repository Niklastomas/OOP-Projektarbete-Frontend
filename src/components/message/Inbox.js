import React, { useState } from "react";
import "./Inbox.css";
import Message from "./Message";
import MessageList from "./MessageList";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";

function Inbox({ messages }) {
  const [message, setMessage] = useState(messages[0]);
  const { user } = useSelector((state) => state.user);

  const handleClick = async (message) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    if (!message.read) {
      await axios.post(`api/User/MarkMessageAsRead/${message.id}`, {}, config);
    }
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
