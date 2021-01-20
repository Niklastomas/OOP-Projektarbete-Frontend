import React from "react";
import ReactTimeago from "react-timeago";
import "./MessageList.css";

function MessageList({ messages, onClick }) {
  return (
    <div className="messageList">
      {messages &&
        messages.map((message) => (
          <div
            onClick={() => onClick(message)}
            key={message.id}
            className={message.read ? "message__read" : "message__notRead"}
          >
            <h3>From: {message.from}</h3>
            <small>
              Sent <ReactTimeago date={new Date(message.sent).toUTCString()} />
            </small>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default MessageList;
